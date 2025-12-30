/**
 * Script to set up Google Sheets with headers and initial data
 * Run this once to populate your Wedding RSVP Master sheet
 */

import { google } from 'googleapis';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function setupSheets() {
    try {
        console.log('🚀 Starting Google Sheets setup...\n');

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

        // 1. Set up Families sheet
        console.log('📋 Setting up Families sheet...');
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'Families!A1:G1',
            valueInputOption: 'RAW',
            requestBody: {
                values: [[
                    'family_id',
                    'family_name',
                    'member_names',
                    'contact_number',
                    'events_invited',
                    'qr_url',
                    'created_at'
                ]]
            }
        });
        console.log('✅ Families headers added\n');

        // 2. Set up Events sheet
        console.log('📋 Setting up Events sheet...');
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'Events!A1:G1',
            valueInputOption: 'RAW',
            requestBody: {
                values: [[
                    'event_id',
                    'event_name',
                    'event_date',
                    'event_timing',
                    'wardrobe',
                    'venue',
                    'display_order'
                ]]
            }
        });

        // Add sample events
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Events!A:G',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [
                        'EVENT_001',
                        'Mehendi Ceremony',
                        '2026-01-15 16:00:00',
                        '4:00 PM - 7:00 PM',
                        'Traditional Indian - Bright colors, Yellow/Green preferred',
                        'Grand Ballroom, Hotel Taj',
                        '1'
                    ],
                    [
                        'EVENT_002',
                        'Sangeet Night',
                        '2026-01-15 19:00:00',
                        '7:00 PM - 11:00 PM',
                        'Indo-Western, Cocktail attire',
                        'Garden Lawn, Hotel Taj',
                        '2'
                    ],
                    [
                        'EVENT_003',
                        'Wedding Ceremony',
                        '2026-01-16 10:00:00',
                        '10:00 AM - 1:00 PM',
                        'Traditional Indian - Formal attire',
                        'Temple Hall',
                        '3'
                    ],
                    [
                        'EVENT_004',
                        'Reception',
                        '2026-01-16 19:00:00',
                        '7:00 PM - 11:00 PM',
                        'Formal Evening Wear',
                        'Grand Ballroom, Hotel Taj',
                        '4'
                    ]
                ]
            }
        });
        console.log('✅ Events headers and sample data added\n');

        // 3. Set up Responses sheet
        console.log('📋 Setting up Responses sheet...');
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'Responses!A1:I1',
            valueInputOption: 'RAW',
            requestBody: {
                values: [[
                    'response_id',
                    'family_id',
                    'family_name',
                    'event_id',
                    'event_name',
                    'attending_count',
                    'member_responses',
                    'notes',
                    'submitted_at'
                ]]
            }
        });
        console.log('✅ Responses headers added\n');

        // 4. Set up Config sheet
        console.log('📋 Setting up Config sheet...');
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'Config!A1:C1',
            valueInputOption: 'RAW',
            requestBody: {
                values: [[
                    'key',
                    'value',
                    'description'
                ]]
            }
        });

        // Add config data
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Config!A:C',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    ['wedding_date', '2026-01-16 10:00:00', 'Main wedding ceremony date for countdown'],
                    ['bride_name', 'Bride Name', "Bride's name"],
                    ['groom_name', 'Groom Name', "Groom's name"],
                    ['background_media_url', '', 'URL to background image/video'],
                    ['site_title', 'Our Wedding', 'Page title']
                ]
            }
        });
        console.log('✅ Config headers and data added\n');

        console.log('🎉 Google Sheets setup complete!\n');
        console.log('Next steps:');
        console.log('1. Update the Config sheet with your actual bride/groom names and wedding date');
        console.log('2. Add your family data to the Families sheet');
        console.log('3. Customize the Events as needed\n');

    } catch (error) {
        console.error('❌ Error setting up sheets:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
        process.exit(1);
    }
}

// Run the setup
setupSheets();
