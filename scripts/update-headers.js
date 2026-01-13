import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function updateResponseHeaders() {
    console.log('📝 Updating Responses Sheet Headers...');

    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        key: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const newHeaders = [
        'response_id',
        'family_id',
        'family_name',
        'member_name',
        'day',
        'attending',
        'submitted_at'
    ];

    try {
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'Responses!A1:G1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [newHeaders]
            }
        });
        console.log('✅ Headers updated successfully!');
        console.log('New Headers:', newHeaders);
    } catch (error) {
        console.error('❌ Error updating headers:', error);
    }
}

updateResponseHeaders();
