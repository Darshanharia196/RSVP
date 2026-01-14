'use client';

import { useState, useMemo } from 'react';
import EventRow from './EventRow';
import { useRouter } from 'next/navigation';

export default function RSVPForm({ family, events, hasResponded = false }) {
    const router = useRouter();
    const [selections, setSelections] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Parse member names from the family object
    // The backend now returns member_names as a comma-separated string
    const memberNames = useMemo(() => {
        return family.member_names?.split(',').map(name => name.trim()) || [];
    }, [family.member_names]);

    // Group events by Day
    const eventsByDay = useMemo(() => {
        const grouped = {};
        events.forEach(event => {
            const day = event.day || 'Other Events';
            if (!grouped[day]) {
                grouped[day] = [];
            }
            grouped[day].push(event);
        });
        return grouped;
    }, [events]);

    // Handle selection change: Day -> Member -> Status
    const handleSelectionChange = (day, memberName, status) => {
        setSelections(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                [memberName]: status
            }
        }));
    };

    // Validate that every member has a selection for every day
    const isFormValid = () => {
        const days = Object.keys(eventsByDay);
        if (days.length === 0) return false;

        for (const day of days) {
            for (const member of memberNames) {
                if (!selections[day]?.[member]) {
                    return false;
                }
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) return;

        setIsSubmitting(true);

        try {
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

            if (response.ok) {
                router.push(`/rsvp/success?id=${family.family_id}`);
            } else {
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
            {Object.entries(eventsByDay).map(([day, dayEvents]) => (
                <div key={day} className="day-section">
                    {/* Day Header */}
                    <div className="day-header-container">
                        <h2 className="day-header-title">Day {day}</h2>
                    </div>

                    {/* Events for this Day */}
                    <div className="day-events-list">
                        {dayEvents.map((event) => {
                            // Find global index to ensure correct image mapping
                            const globalIndex = events.findIndex(e => e.event_id === event.event_id);
                            return (
                                <EventRow
                                    key={event.event_id}
                                    event={event}
                                    index={globalIndex}
                                />
                            );
                        })}
                    </div>

                    {!hasResponded && (
                        <>
                            {/* Divider before RSVP */}
                            <div className="rsvp-section-divider"></div>

                            {/* RSVP Block for this Day */}
                            <div className="day-rsvp-block">
                                <h3 className="day-rsvp-header">RSVP - DAY {day}</h3>

                                <div className="member-list-horizontal">
                                    {memberNames.map((member) => {
                                        const status = selections[day]?.[member];
                                        return (
                                            <div key={member} className="member-row-clean">
                                                <span className="member-name-clean">{member}</span>
                                                <div className="rsvp-options-clean">
                                                    <button
                                                        type="button"
                                                        className={`option-btn-clean ${status === 'attending' ? 'selected' : ''}`}
                                                        onClick={() => handleSelectionChange(day, member, 'attending')}
                                                    >
                                                        YES
                                                    </button>
                                                    <span className="divider-clean">/</span>
                                                    <button
                                                        type="button"
                                                        className={`option-btn-clean ${status === 'not_attending' ? 'selected' : ''}`}
                                                        onClick={() => handleSelectionChange(day, member, 'not_attending')}
                                                    >
                                                        NO
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Divider between days */}
                    <div className="day-divider"></div>
                </div>
            ))}

            {!hasResponded ? (
                <div className="submit-section">
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={!isFormValid() || isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit RSVP ✨'}
                    </button>
                    {!isFormValid() && (
                        <p className="validation-message">Please select an option for every family member for all days.</p>
                    )}
                </div>
            ) : (
                <div className="thank-you-message">
                    <h3>Thank You!</h3>
                    <p>Your RSVP has been recorded. We look forward to seeing you!</p>
                </div>
            )}
        </form>
    );
}
