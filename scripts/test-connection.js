/**
 * Test script to verify Google Sheets connection and data
 */

import { google } from 'googleapis';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testConnection() {
    try {
        console.log('🔍 Testing Google Sheets connection...\n');

        // Initialize Google Sheets API
        const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
        const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;

        if (!privateKey || !clientEmail || !spreadsheetId) {
            throw new Error('Missing required environment variables. Check your .env.local file.');
        }

        const auth = new google.auth.JWT(
            clientEmail,
            null,
            privateKey,
            ['https://www.googleapis.com/auth/spreadsheets']
        );

        const sheets = google.sheets({ version: 'v4', auth });

        console.log('✅ Connected to Google Sheets API\n');
        console.log(`📊 Sheet ID: ${spreadsheetId}\n`);

        // Test reading from each sheet
        const sheetNames = ['Families', 'Events', 'Responses', 'Config'];

        for (const sheetName of sheetNames) {
            console.log(`📋 Reading ${sheetName} sheet...`);
            try {
                const response = await sheets.spreadsheets.values.get({
                    spreadsheetId,
                    range: `${sheetName}!A1:Z100`,
                });

                const rows = response.data.values || [];
                console.log(`   ✅ Found ${rows.length} rows`);

                if (rows.length > 0) {
                    console.log(`   📝 Headers: ${rows[0].join(', ')}`);
                    if (rows.length > 1) {
                        console.log(`   📊 Data rows: ${rows.length - 1}`);
                    }
                }
                console.log('');
            } catch (error) {
                console.log(`   ❌ Error reading ${sheetName}: ${error.message}\n`);
            }
        }

        // Display Config values
        console.log('⚙️  Configuration:');
        const configResponse = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Config!A:C',
        });

        const configRows = configResponse.data.values || [];
        if (configRows.length > 1) {
            for (let i = 1; i < configRows.length; i++) {
                const [key, value] = configRows[i];
                console.log(`   ${key}: ${value || '(empty)'}`);
            }
        }

        console.log('\n🎉 Google Sheets connection test successful!\n');

    } catch (error) {
        console.error('❌ Error testing connection:', error.message);
        if (error.response) {
            console.error('Response data:', JSON.stringify(error.response.data, null, 2));
        }
        process.exit(1);
    }
}

// Run the test
testConnection();
