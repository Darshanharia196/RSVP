/**
 * Script to create the Wardrobe tab in Google Sheets with sample data
 * Run: node scripts/setup-wardrobe-sheet.js
 */

import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function setupWardrobeSheet() {
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const auth = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    console.log('🔍 Checking if Wardrobe sheet exists...');

    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const existingSheets = meta.data.sheets.map(s => s.properties.title);
    console.log('Existing sheets:', existingSheets.join(', '));

    if (existingSheets.includes('Wardrobe')) {
        console.log('✅ Wardrobe sheet already exists. Skipping creation.');
    } else {
        console.log('📋 Creating Wardrobe sheet...');
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
                requests: [{
                    addSheet: {
                        properties: { title: 'Wardrobe' }
                    }
                }]
            }
        });
        console.log('✅ Wardrobe sheet created!');
    }

    console.log('📝 Writing headers and sample data...');
    const values = [
        // Headers
        ['day', 'event_name', 'dress_code', 'colors', 'notes', 'display_order'],
        // Day 1
        ['Day 1', 'Haldi Ceremony', 'Yellow & White', 'Yellow, White, Ivory', 'Wear clothes you don\'t mind getting turmeric on!', '1'],
        ['Day 1', 'Mehendi Ceremony', 'Pastels & Florals', 'Blush, Mint, Lilac, Peach', 'Light, flowy outfits recommended', '2'],
        ['Day 1', 'Garba Night', 'Traditional Chaniya Choli / Kurta Pyjama', 'All vibrant colours welcome', 'Comfortable footwear for dancing', '3'],
        // Day 2
        ['Day 2', 'Wedding Ceremony', 'Formal Indian Wear', 'Jewel tones — Maroon, Royal Blue, Emerald, Gold', 'No white or black please', '4'],
        ['Day 2', 'Wedding Lunch', 'Smart Casual Indian', 'Pastels or Earthy tones', 'You may change into something lighter for lunch', '5'],
    ];

    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Wardrobe!A1',
        valueInputOption: 'USER_ENTERED',
        requestBody: { values },
    });

    console.log('✅ Sample data written to Wardrobe sheet!');
    console.log('\n📌 Columns:');
    console.log('  day           → "Day 1" or "Day 2"');
    console.log('  event_name    → Name of the event');
    console.log('  dress_code    → Short dress code label');
    console.log('  colors        → Suggested colour palette');
    console.log('  notes         → Any extra tips or notes');
    console.log('  display_order → Number for sorting');
    console.log('\n🎉 Done! Open your Google Sheet to edit the data.');
}

setupWardrobeSheet().catch(console.error);
