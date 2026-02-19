/**
 * Script to create the Itinerary tab in Google Sheets with sample data
 * Run: node scripts/setup-itinerary-sheet.js
 */

import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function setupItinerarySheet() {
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const auth = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    console.log('🔍 Checking if Itinerary sheet exists...');

    // Get existing sheets
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const existingSheets = meta.data.sheets.map(s => s.properties.title);
    console.log('Existing sheets:', existingSheets.join(', '));

    if (existingSheets.includes('Itinerary')) {
        console.log('✅ Itinerary sheet already exists. Skipping creation.');
    } else {
        console.log('📋 Creating Itinerary sheet...');
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
                requests: [{
                    addSheet: {
                        properties: { title: 'Itinerary' }
                    }
                }]
            }
        });
        console.log('✅ Itinerary sheet created!');
    }

    // Write headers + sample data
    console.log('📝 Writing headers and sample data...');
    const values = [
        // Headers
        ['day', 'time', 'title', 'description', 'type', 'display_order'],
        // Day 1 sample data
        ['Day 1', '09:00 AM', 'Guests Arrive', 'Guests check in and freshen up at the resort', 'arrival', '1'],
        ['Day 1', '10:00 AM', 'Haldi Ceremony', 'A joyful turmeric ceremony with family and close friends', 'event', '2'],
        ['Day 1', '12:00 PM', 'Lunch Break', 'Traditional Gujarati thali served at the dining hall', 'break', '3'],
        ['Day 1', '02:00 PM', 'Mehendi Ceremony', 'Intricate mehendi designs for the bride and guests', 'event', '4'],
        ['Day 1', '04:30 PM', 'Tea & Snacks', 'Evening refreshments by the poolside', 'break', '5'],
        ['Day 1', '07:00 PM', 'Garba Night', 'A vibrant evening of traditional Garba and Dandiya', 'event', '6'],
        ['Day 1', '10:30 PM', 'Dinner', 'Grand dinner buffet with live music', 'break', '7'],
        // Day 2 sample data
        ['Day 2', '08:00 AM', 'Morning Breakfast', 'Breakfast served at the resort restaurant', 'break', '8'],
        ['Day 2', '10:00 AM', 'Baraat Procession', 'The groom arrives in a grand procession', 'event', '9'],
        ['Day 2', '11:00 AM', 'Wedding Ceremony', 'The sacred wedding rituals and pheras', 'event', '10'],
        ['Day 2', '01:30 PM', 'Wedding Lunch', 'Celebratory lunch for all guests', 'break', '11'],
        ['Day 2', '03:00 PM', 'Vidaai', 'The emotional farewell ceremony', 'event', '12'],
    ];

    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Itinerary!A1',
        valueInputOption: 'USER_ENTERED',
        requestBody: { values },
    });

    console.log('✅ Sample data written to Itinerary sheet!');
    console.log('\n📌 Columns:');
    console.log('  day          → "Day 1" or "Day 2"');
    console.log('  time         → e.g. "10:00 AM"');
    console.log('  title        → Name of the event/activity');
    console.log('  description  → Optional details');
    console.log('  type         → event / break / arrival / travel');
    console.log('  display_order → Number for sorting');
    console.log('\n🎉 Done! Open your Google Sheet to edit the data.');
}

setupItinerarySheet().catch(console.error);
