import { saveRSVPResponse, getFamilyById, getEventsForFamily } from '@/lib/googleSheets';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { family_id: familyId, family_name: familyName, selections } = body;

        if (!familyId || !selections) {
            return NextResponse.json(
                { error: 'Family ID and selections are required' },
                { status: 400 }
            );
        }

        console.log(`Processing RSVP for family: ${familyId}`);

        // Selections structure: { [day]: { [memberName]: 'attending' | 'not_attending' } }
        for (const [day, memberSelections] of Object.entries(selections)) {
            for (const [member, status] of Object.entries(memberSelections)) {

                const isAttending = status === 'attending';

                console.log(`Saving RSVP for ${member} on ${day}: ${isAttending ? 'YES' : 'NO'}`);

                await saveRSVPResponse({
                    family_id: familyId,
                    family_name: familyName,
                    member_name: member,
                    day: day,
                    attending: isAttending
                });
            }
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error processing RSVP:', error);
        return NextResponse.json(
            { error: 'Failed to process RSVP' },
            { status: 500 }
        );
    }
}
