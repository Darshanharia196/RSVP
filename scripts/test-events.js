import dotenv from 'dotenv';
import { getAllEvents } from '../src/lib/googleSheets.js';

dotenv.config({ path: '.env.local' });


async function testEvents() {
    console.log('🎭 Testing Events from Google Sheets\n');

    try {
        const events = await getAllEvents();
        console.log(`✅ Found ${events.length} events:\n`);

        events.forEach((event, index) => {
            console.log(`Event ${index + 1}:`);
            console.log(`  ID: ${event.event_id}`);
            console.log(`  Name: ${event.event_name}`);
            console.log(`  Date: ${event.event_date}`);
            console.log(`  Time: ${event.event_timing}`);
            console.log(`  Venue: ${event.venue}`);
            console.log(`  Wardrobe: ${event.wardrobe}`);
            console.log(`  Display Order: ${event.display_order}`);
            console.log('');
        });
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testEvents();
