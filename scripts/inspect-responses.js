import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function inspectResponsesHeader() {
    console.log('🔍 Inspecting Responses Sheet Headers...');

    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        key: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Responses!A1:Z1',
    });

    console.log('Current Headers:', response.data.values?.[0] || 'No headers found');
}

inspectResponsesHeader();
