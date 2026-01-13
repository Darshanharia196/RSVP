import { getSheetData } from '../src/lib/googleSheets.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function checkResponses() {
    console.log('🔍 Checking Responses Sheet...');
    try {
        const rows = await getSheetData('Responses');
        const lastRows = rows.slice(-5); // Get last 5 rows

        console.log(`Total rows: ${rows.length}`);
        console.log('Last 5 rows:');
        lastRows.forEach(row => console.log(row));

    } catch (error) {
        console.error('Error:', error);
    }
}

checkResponses();
