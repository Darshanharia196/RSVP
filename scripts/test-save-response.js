
import { saveRSVPResponse } from '../src/lib/googleSheets.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testSaveResponse() {
    console.log('🧪 Testing saveRSVPResponse...');
    try {
        const response = {
            family_id: 'FAMILY_001',
            family_name: 'Sharma Family',
            event_id: 'EVENT_001',
            event_name: 'Mehendi Ceremony',
            attending_count: 1,
            member_responses: 'Test User',
            notes: 'Direct Test Submission'
        };

        console.log('   Saving response:', JSON.stringify(response, null, 2));
        const result = await saveRSVPResponse(response);

        console.log('   ✅ Save successful!');
        console.log('   Result:', JSON.stringify(result, null, 2));

    } catch (error) {
        console.error('   ❌ Save failed:', error);
        if (error.response) {
            console.error('   Response data:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

testSaveResponse();
