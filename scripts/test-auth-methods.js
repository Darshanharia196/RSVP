import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

console.log('🔍 Testing JWT Authentication Methods\n');

const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;

console.log('Environment Check:');
console.log(`  Private Key Length: ${privateKey?.length || 0}`);
console.log(`  Client Email: ${clientEmail}`);
console.log(`  Has BEGIN marker: ${privateKey?.includes('BEGIN PRIVATE KEY')}`);
console.log(`  Has END marker: ${privateKey?.includes('END PRIVATE KEY')}`);
console.log('');

// Method 1: Positional parameters
console.log('Method 1: Positional Parameters (email, keyFile, key, scopes)');
try {
    const auth1 = new google.auth.JWT(
        clientEmail,
        null,
        privateKey,
        ['https://www.googleapis.com/auth/spreadsheets']
    );
    console.log('  ✅ JWT object created');

    await auth1.authorize();
    console.log('  ✅ Authorization successful!');
} catch (error) {
    console.log(`  ❌ Failed: ${error.message}`);
}

console.log('');

// Method 2: Object-based with 'key'
console.log('Method 2: Object-based with "key" property');
try {
    const auth2 = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    console.log('  ✅ JWT object created');

    await auth2.authorize();
    console.log('  ✅ Authorization successful!');
} catch (error) {
    console.log(`  ❌ Failed: ${error.message}`);
}

console.log('');

// Method 3: Using fromJSON
console.log('Method 3: Using fromJSON');
try {
    const credentials = {
        type: 'service_account',
        client_email: clientEmail,
        private_key: privateKey,
    };

    const auth3 = google.auth.fromJSON(credentials);
    auth3.scopes = ['https://www.googleapis.com/auth/spreadsheets'];
    console.log('  ✅ JWT object created');

    await auth3.authorize();
    console.log('  ✅ Authorization successful!');
} catch (error) {
    console.log(`  ❌ Failed: ${error.message}`);
}
