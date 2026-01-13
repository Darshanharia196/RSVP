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

        // 3. Generate IDs
        const familyMap = new Map();
        let counter = 1;
        const updates = [];

        rows.forEach((row, index) => {
            const currentId = row[0];
            const familyName = row[1];

            if (!familyName) return; // Skip empty names

            let assignedId = familyMap.get(familyName);

            if (!assignedId) {
                // Generate new ID
                assignedId = `FAMILY_${String(counter).padStart(3, '0')}`;
                familyMap.set(familyName, assignedId);
                counter++;
            }

            // If ID is missing or different, we update it
            if (currentId !== assignedId) {
                updates.push({
                    range: `Families!A${index + 2}`, // +2 because 1-based and header row
                    values: [[assignedId]]
                });
            }
        });

        if (updates.length === 0) {
            console.log('✅ All families already have correct IDs. No updates needed.');
            return;
        }

        console.log(`📝 Updating ${updates.length} rows with new IDs...`);

        // 4. Perform Batch Update
        // We can't use values.batchUpdate for disjoint ranges easily with simple values API in one go unless we write the whole column.
        // Writing the whole column is safer and more efficient.

        const newColumnData = rows.map(row => {
            const familyName = row[1];
            if (!familyName) return [''];
            return [familyMap.get(familyName)];
        });

        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `Families!A2:A${rows.length + 1}`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: newColumnData
            }
        });

        console.log('✅ Successfully updated family IDs!');

        // Log the mapping for the user
        console.log('\nGenerated Mappings:');
        familyMap.forEach((id, name) => {
            console.log(`${id} -> ${name}`);
        });

    } catch (error) {
        console.error('❌ Error generating IDs:', error);
    }
}

generateFamilyIds();
