'use client';

import { useState } from 'react';
import EventRow from './EventRow';
import { useRouter } from 'next/navigation';

export default function RSVPForm({ family, events }) {
    const router = useRouter();
    const [selections, setSelections] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const memberNames = family.member_names?.split(',').map(name => name.trim()) || [];

    // Initialize selections state structure if needed, or just handle dynamically
    // Structure: { [eventId]: { [memberName]: 'attending' | 'not_attending' } }

    const handleSelectionChange = (eventId, memberName, status) => {
        setSelections(prev => ({
            ...prev,
            [eventId]: {
                ...prev[eventId],
                [memberName]: status
            }
        }));
    };

    // Validate that every member has a selection for every event
    const isFormValid = () => {
        if (events.length === 0) return false;

        for (const event of events) {
            for (const member of memberNames) {
                if (!selections[event.event_id]?.[member]) {
                    return false;
                }
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting RSVP form...', selections);
        if (!isFormValid()) {
            console.log('Form is invalid');
            return;
        }

        setIsSubmitting(true);

        try {
            console.log('Sending request to /api/rsvp');
            const response = await fetch('/api/rsvp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    family_id: family.family_id,
                    family_name: family.family_name,
                    selections: selections
                }),
            });

            console.log('API Response status:', response.status);

            if (response.ok) {
                console.log('Response OK, redirecting...');
                router.push(`/rsvp/success?id=${family.family_id}`);
            } else {
                console.error('Failed to submit RSVP');
                const errorData = await response.json();
                console.error('Error details:', errorData);
                alert('Something went wrong. Please try again.');
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error submitting RSVP:', error);
            alert('Something went wrong. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="rsvp-form-container-merged">
            <div className="events-list-merged">
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <EventRow
                            key={event.event_id}
                            event={event}
                            index={index}
                            memberNames={memberNames}
                            selections={selections}
                            onSelectionChange={handleSelectionChange}
                        />
                    ))
                ) : (
                    <p className="no-events">No events available for your invitation.</p>
                )}
            </div>

            <div className="submit-section">
                <button
                    type="submit"
                    className="submit-button"
                    disabled={!isFormValid() || isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit RSVP ✨'}
                </button>
                {!isFormValid() && (
                    <p className="validation-message">Please select an option for every family member for all events.</p>
                )}
            </div>
        </form>
    );
}
