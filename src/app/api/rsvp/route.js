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

        // Get all events for this family
        const events = await getEventsForFamily(familyId);

        for (const event of events) {
            const eventSelections = selections[event.event_id];

            if (!eventSelections) {
                console.log(`No selections found for event ${event.event_id}, skipping`);
                continue;
            }

            // Calculate attending count
            let attendingCount = 0;
            const memberResponseParts = [];

            for (const [member, status] of Object.entries(eventSelections)) {
                const isAttending = status === 'attending';
                if (isAttending) attendingCount++;
                memberResponseParts.push(`${member}: ${isAttending ? 'Yes' : 'No'}`);
            }

            const memberResponsesStr = memberResponseParts.join(', ');

            console.log(`Saving RSVP for event ${event.event_id}: ${attendingCount} attending. Details: ${memberResponsesStr}`);

            // Save individual response row for this event
            await saveRSVPResponse({
                family_id: familyId,
                family_name: familyName,
                event_id: event.event_id,
                event_name: event.event_name,
                attending_count: attendingCount,
                member_responses: memberResponsesStr,
                notes: '' // Notes field removed
            });
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
