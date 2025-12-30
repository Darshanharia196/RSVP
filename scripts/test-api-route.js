
async function testApiRoute() {
    console.log('🧪 Testing API Route...');
    try {
        const formData = new FormData();
        formData.append('family_id', 'FAMILY_001');
        formData.append('family_name', 'Sharma Family');
        formData.append('notes', 'API Test Submission');
        formData.append('event_EVENT_001', 'on');

        console.log('   Sending POST request to http://localhost:3000/api/rsvp...');

        const response = await fetch('http://localhost:3000/api/rsvp', {
            method: 'POST',
            body: formData
        });

        console.log(`   Status: ${response.status} ${response.statusText}`);
        console.log(`   Redirected: ${response.redirected}`);
        console.log(`   URL: ${response.url}`);

        if (response.ok) {
            console.log('   ✅ Request successful!');
        } else {
            console.log('   ❌ Request failed!');
            const text = await response.text();
            console.log('   Response:', text);
        }

    } catch (error) {
        console.error('   ❌ Error:', error);
    }
}

testApiRoute();
