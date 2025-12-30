import { google } from 'googleapis';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const pk = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
const email = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;

console.log('Testing JWT creation...\n');

// Write key to temp file to test
const tempKeyFile = '/tmp/google-key.pem';
fs.writeFileSync(tempKeyFile, pk);

console.log('Approach 1: Using key string directly');
try {
    const auth1 = new google.auth.JWT({
        email: email,
        key: pk,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    await auth1.authorize();
    console.log('✅ Success with key string!\n');
} catch (error) {
    console.log(`❌ Failed: ${error.message}\n`);
}

console.log('Approach 2: Using keyFile');
try {
    const auth2 = new google.auth.JWT({
        email: email,
        keyFile: tempKeyFile,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    await auth2.authorize();
    console.log('✅ Success with keyFile!\n');
} catch (error) {
    console.log(`❌ Failed: ${error.message}\n`);
}

console.log('Approach 3: Using positional arguments');
try {
    const auth3 = new google.auth.JWT(
        email,
        tempKeyFile,
        null,
        ['https://www.googleapis.com/auth/spreadsheets']
    );
    await auth3.authorize();
    console.log('✅ Success with positional args + keyFile!\n');
} catch (error) {
    console.log(`❌ Failed: ${error.message}\n`);
}

// Clean up
fs.unlinkSync(tempKeyFile);
