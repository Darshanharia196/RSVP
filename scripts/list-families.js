import { getAllFamilies } from '../src/lib/googleSheets.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function findFamilies() {
    console.log('🔍 Searching for families with IDs...');
    try {
        const families = await getAllFamilies();
        console.log(`Found ${families.length} families with IDs.`);

        families.forEach(f => {
            console.log(`- ID: ${f.family_id}, Name: ${f.family_name}, Members: ${f.members.length}`);
        });

        if (families.length === 0) {
            console.log('⚠️ No families found with IDs! Please check the Google Sheet.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

findFamilies();
