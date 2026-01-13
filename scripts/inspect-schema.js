import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function inspectSheets() {
    console.log('🔍 Inspecting Sheet Headers and Data\n');

    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        key: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Check Families Sheet
    console.log('--- FAMILIES SHEET ---');
    const families = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Families!A1:Z5',
    });

    if (families.data.values) {
        console.log('Headers:', families.data.values[0]);
        console.log('Row 1:', families.data.values[1]);
        console.log('Row 2:', families.data.values[2]);
    } else {
        console.log('No data found in Families sheet');
    }

    console.log('\n--- EVENTS SHEET ---');
    const events = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Events!A1:Z5',
    });

    if (events.data.values) {
        console.log('Headers:', events.data.values[0]);
        console.log('Row 1:', events.data.values[1]);
    } else {
        console.log('No data found in Events sheet');
    }
}

inspectSheets().catch(console.error);
