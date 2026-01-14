import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function generateLinks() {
    console.log('🔗 Generating RSVP Links...');

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
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Families!A2:B1000',
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log('⚠️ No data found in Families sheet.');
            return;
        }

        // 3. Extract unique families and their IDs
        const uniqueFamilies = new Map();
        rows.forEach(row => {
            const id = row[0];
            const name = row[1];
            if (id && name && !uniqueFamilies.has(id)) {
                uniqueFamilies.set(id, name);
            }
        });

        // 4. Prepare data for "Invite links" tab
        const baseUrl = (process.env.BASE_URL || 'http://localhost:3001').replace(/\/$/, '') + '/rsvp?id=';
        const linkData = [['Family Name', 'RSVP Link']]; // Header

        uniqueFamilies.forEach((name, id) => {
            linkData.push([name, `${baseUrl}${id}`]);
        });

        // 5. Write to "Invite links" tab
        console.log('📝 Writing links to "Invite links" tab...');

        // Clear existing content first (optional but safer for clean refresh)
        await sheets.spreadsheets.values.clear({
            spreadsheetId,
            range: 'Invite links!A1:B1000',
        });

        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'Invite links!A1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: linkData
            }
        });

        console.log('✅ Successfully updated "Invite links" tab!');

        // Also log to console for quick reference
        console.log('\n--- RSVP LINKS ---');
        linkData.slice(1).forEach(row => {
            console.log(`${row[0].padEnd(25)} | ${row[1]}`);
        });
        console.log('------------------\n');

    } catch (error) {
        console.error('❌ Error generating links:', error);
    }
}

generateLinks();
