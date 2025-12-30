
import { getFamilyById } from '../src/lib/googleSheets.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function verifyFamilyData() {
    console.log('🔍 Verifying Family Data Fetching...');
    try {
        const familyId = 'FAMILY_001';
        console.log(`   Fetching family: ${familyId}`);

        const family = await getFamilyById(familyId);

        if (family) {
            console.log('   ✅ Family found!');
            console.log('   Data:', JSON.stringify(family, null, 2));
        } else {
            console.log('   ❌ Family not found (returned null)');
        }
    } catch (error) {
        console.error('   ❌ Error fetching family:', error);
    }
}

verifyFamilyData();
