import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function generateFamilyIds() {
    console.log('🚀 Starting Family ID Generation...');

    try {
        // 1. Initialize Auth
        const auth = new google.auth.JWT({
            email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
            key: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;

        // 2. Read Families Data
        console.log('📖 Reading Families sheet...');
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Families!A2:B1000', // Read A (ID) and B (Name)
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log('⚠️ No data found in Families sheet.');
            return;
        }

        console.log(`Found ${rows.length} rows.`);

        // 3. Scan for existing IDs and map them
        const familyMap = new Map();
        let maxId = 0;

        rows.forEach(row => {
            const currentId = row[0];
            const familyName = row[1];

            if (currentId && currentId.startsWith('FAMILY_')) {
                const idNum = parseInt(currentId.split('_')[1]);
                if (!isNaN(idNum)) {
                    maxId = Math.max(maxId, idNum);
                    if (familyName && !familyMap.has(familyName)) {
                        familyMap.set(familyName, currentId);
                    }
                }
            }
        });

        console.log(`Highest existing ID: FAMILY_${String(maxId).padStart(3, '0')}`);

        // 4. Generate new IDs for missing ones
        let counter = maxId + 1;
        const newColumnData = rows.map((row, index) => {
            const currentId = row[0];
            const familyName = row[1];

            if (!familyName) return [currentId || '']; // Keep existing or empty if no name

            let assignedId = familyMap.get(familyName);

            if (!assignedId) {
                if (currentId && currentId.startsWith('FAMILY_')) {
                    // Already has an ID but wasn't in map (shouldn't happen with step 3 but safe)
                    assignedId = currentId;
                    familyMap.set(familyName, assignedId);
                } else {
                    // Generate new ID
                    assignedId = `FAMILY_${String(counter).padStart(3, '0')}`;
                    familyMap.set(familyName, assignedId);
                    counter++;
                }
            }

            return [assignedId];
        });

        // 5. Check if updates are needed
        const hasChanges = newColumnData.some((row, index) => row[0] !== (rows[index][0] || ''));

        if (!hasChanges) {
            console.log('✅ All families already have correct IDs. No updates needed.');
            return;
        }

        console.log(`📝 Updating rows with new IDs...`);

        // 6. Perform Batch Update
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `Families!A2:A${rows.length + 1}`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: newColumnData
            }
        });

        console.log('✅ Successfully updated family IDs!');

        // Log the new mappings
        console.log('\nFinal Mappings:');
        familyMap.forEach((id, name) => {
            console.log(`${id} -> ${name}`);
        });

    } catch (error) {
        console.error('❌ Error generating IDs:', error);
    }
}

generateFamilyIds();
