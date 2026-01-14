import { saveRSVPResponse, getFamilyById, getEventsForFamily } from '@/lib/googleSheets';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { family_id: familyId, family_name: familyName, selections, invited_days } = body;

        if (!familyId || !selections || !invited_days) {
            return NextResponse.json(
                { error: 'Family ID, selections, and invited_days are required' },
                { status: 400 }
            );
        }

        console.log(`Processing RSVP for family: ${familyId} across days: ${invited_days.join(', ')}`);

        // Selections structure: { [memberName]: 'attending' | 'not_attending' }
        for (const [member, status] of Object.entries(selections)) {
            const isAttending = status === 'attending';

            // Save response for EACH day the family is invited to
            for (const day of invited_days) {
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
