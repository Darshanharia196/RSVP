import { getAllConfig } from '../src/lib/googleSheets.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function checkConfig() {
    console.log('🔍 Checking Config Sheet...');
    try {
        const config = await getAllConfig();
        console.log('Current Config Values:', config);

        const requiredKeys = [
            'bride_name', 'groom_name', 'wedding_date', 'site_title',
            'location', 'hashtag', 'greeting_text', 'rsvp_deadline'
        ];

        const missing = requiredKeys.filter(key => !config[key]);

        if (missing.length > 0) {
            console.log('\n⚠️ Missing Config Keys (using defaults):');
            missing.forEach(key => console.log(`- ${key}`));
        } else {
            console.log('\n✅ All config keys present!');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

checkConfig();
