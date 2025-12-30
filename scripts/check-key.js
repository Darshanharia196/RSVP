import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

console.log('Private Key Check:');
console.log('==================');

const pk = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

if (!pk) {
    console.log('❌ Private key not found!');
} else {
    console.log('✅ Private key found');
    console.log(`Length: ${pk.length} characters`);
    console.log(`Starts with: ${pk.substring(0, 50)}...`);
    console.log(`Contains \\\\n: ${pk.includes('\\n')}`);
    console.log(`Contains actual newlines: ${pk.includes('\n')}`);

    // Try to extract just the key part
    const match = pk.match(/-----BEGIN PRIVATE KEY-----(.*?)-----END PRIVATE KEY-----/s);
    if (match) {
        console.log('✅ Key structure looks valid');
    } else {
        console.log('❌ Key structure invalid');
    }
}
