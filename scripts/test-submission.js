import fetch from 'node-fetch';

async function testSubmission() {
    console.log('🚀 Testing RSVP Submission...');

    const payload = {
        family_id: 'FAMILY_001',
        family_name: 'Vasant Chheda',
        selections: {
            '1': {
                'Vasant Chheda': 'attending',
                'Sushila Chheda': 'not_attending'
            }
        }
    };

    try {
        const response = await fetch('http://localhost:3001/api/rsvp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', data);

        if (response.ok) {
            console.log('✅ Submission successful!');
        } else {
            console.error('❌ Submission failed!');
        }

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

testSubmission();
