/**
 * Diagnostic script to test Google Sheets connection
 * This will help identify what's wrong with the API connection
 */

import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function diagnose() {
    console.log('🔍 Google Sheets Connection Diagnostic\n');
    console.log('='.repeat(50));

    // Step 1: Check environment variables
    console.log('\n📋 Step 1: Checking Environment Variables...');
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    console.log(`   Private Key: ${privateKey ? '✅ Found' : '❌ Missing'}`);
    console.log(`   Client Email: ${clientEmail ? '✅ ' + clientEmail : '❌ Missing'}`);
    console.log(`   Sheet ID: ${spreadsheetId ? '✅ ' + spreadsheetId : '❌ Missing'}`);

    if (!privateKey || !clientEmail || !spreadsheetId) {
        console.log('\n❌ Missing required environment variables!');
        console.log('   Please check your .env.local file.');
        process.exit(1);
    }

    // Step 2: Test authentication
    console.log('\n🔐 Step 2: Testing Authentication...');
    try {
        const auth = new google.auth.JWT({
            email: clientEmail,
            key: privateKey,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        await auth.authorize();
        console.log('   ✅ Authentication successful!');
    } catch (error) {
        console.log('   ❌ Authentication failed!');
        console.log(`   Error: ${error.message}`);
        process.exit(1);
    }

    // Step 3: Test Google Sheets API access
    console.log('\n📊 Step 3: Testing Google Sheets API Access...');
    try {
        const auth = new google.auth.JWT({
            email: clientEmail,
            key: privateKey,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Try to get spreadsheet metadata
        const metadata = await sheets.spreadsheets.get({
            spreadsheetId,
        });

        console.log('   ✅ Successfully connected to Google Sheets!');
        console.log(`   Sheet Title: ${metadata.data.properties.title}`);
        console.log(`   Sheet URL: https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`);

        // List all sheets
        console.log('\n   📑 Available Sheets:');
        metadata.data.sheets.forEach((sheet, index) => {
            console.log(`      ${index + 1}. ${sheet.properties.title}`);
        });

    } catch (error) {
        console.log('   ❌ Failed to access Google Sheets!');
        console.log(`   Error: ${error.message}`);

        if (error.message.includes('PERMISSION_DENIED') || error.message.includes('403')) {
            console.log('\n   💡 This usually means:');
            console.log('      1. The sheet is not shared with the service account');
            console.log(`      2. Share the sheet with: ${clientEmail}`);
            console.log('      3. Give it "Editor" permissions');
        } else if (error.message.includes('UNAUTHENTICATED') || error.message.includes('401')) {
            console.log('\n   💡 This usually means:');
            console.log('      1. The Google Sheets API is not enabled');
            console.log('      2. Go to: https://console.cloud.google.com/apis/library/sheets.googleapis.com');
            console.log('      3. Enable the Google Sheets API');
        }

        process.exit(1);
    }

    // Step 4: Test reading from Families sheet
    console.log('\n👨‍👩‍👧‍👦 Step 4: Testing Families Sheet...');
    try {
        const auth = new google.auth.JWT({
            email: clientEmail,
            key: privateKey,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Families!A1:G10',
        });

        const rows = response.data.values || [];
        console.log(`   ✅ Successfully read Families sheet!`);
        console.log(`   Rows found: ${rows.length}`);

        if (rows.length > 0) {
            console.log(`   Headers: ${rows[0].join(', ')}`);
            if (rows.length > 1) {
                console.log(`   Data rows: ${rows.length - 1}`);
                console.log('\n   Sample data:');
                rows.slice(1, 3).forEach((row, index) => {
                    console.log(`      Row ${index + 2}: ${row.join(' | ')}`);
                });
            } else {
                console.log('   ⚠️  No data rows found (only headers)');
                console.log('   Add family data to test the RSVP page!');
            }
        } else {
            console.log('   ⚠️  Sheet is empty!');
        }

    } catch (error) {
        console.log('   ❌ Failed to read Families sheet!');
        console.log(`   Error: ${error.message}`);
        process.exit(1);
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ All diagnostic checks passed!');
    console.log('\nIf the RSVP page still shows "Invalid Link":');
    console.log('1. Make sure you added family data to the Families sheet');
    console.log('2. Refresh the page: http://localhost:3000/rsvp?id=FAMILY_001');
    console.log('3. Check that the family_id in the sheet matches FAMILY_001');
}

diagnose();
