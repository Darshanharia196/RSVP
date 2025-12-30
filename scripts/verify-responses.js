import { getSheetData } from '../src/lib/googleSheets.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function verifyResponses() {
    console.log('🔍 Verifying RSVP Responses...');
    try {
        const responses = await getSheetData('Responses');

        if (responses.length > 1) {
            console.log(`   ✅ Found ${responses.length - 1} response(s)!`);

            const headers = responses[0];
            const lastResponse = responses[responses.length - 1];

            console.log('\n   Last Response Details:');
            headers.forEach((header, index) => {
                console.log(`   - ${header}: ${lastResponse[index]}`);
            });

            // Check if notes match "Vegetarian"
            const notesIndex = headers.indexOf('notes');
            if (lastResponse[notesIndex] === 'Vegetarian') {
                console.log('\n   ✅ Notes match: "Vegetarian"');
            } else {
                console.log(`\n   ❌ Notes mismatch: Expected "Vegetarian", got "${lastResponse[notesIndex]}"`);
            }

        } else {
            console.log('   ❌ No responses found (only headers)');
        }
    } catch (error) {
        console.error('   ❌ Error fetching responses:', error);
    }
}

verifyResponses();
