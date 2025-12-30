'use client';

/**
 * EventRow Component
 * Displays a single event's details, RSVP form, and image in a unified row.
 */
export default function EventRow({ event, index, memberNames, selections, onSelectionChange }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="event-row-merged">
            {/* Left Column: Details + RSVP */}
            <div className="event-left-col">
                {/* Event Details */}
                <div className="event-details-block">
                    <h3 className="event-name-large">{event.event_name}</h3>
                    <div className="event-meta-clean">
                        <p>{formatDate(event.event_date)}</p>
                        <p>{event.event_time}</p>
                        <p>{event.event_location}</p>
                        {event.wardrobe && <p className="event-wardrobe">Dress Code: {event.wardrobe}</p>}
                    </div>
                </div>

                {/* RSVP Section for this Event */}
                <div className="event-rsvp-block">
                    <h4 className="rsvp-block-title">Who is attending?</h4>
                    <div className="member-list-horizontal">
                        {memberNames.map((member) => {
                            const status = selections[event.event_id]?.[member];
                            return (
                                <div key={member} className="member-row-clean">
                                    <span className="member-name-clean">{member}</span>
                                    <div className="rsvp-options-clean">
                                        <button
                                            type="button"
                                            className={`option-btn-clean ${status === 'attending' ? 'selected' : ''}`}
                                            onClick={() => onSelectionChange(event.event_id, member, 'attending')}
                                        >
                                            YES
                                        </button>
                                        <span className="divider-clean">/</span>
                                        <button
                                            type="button"
                                            className={`option-btn-clean ${status === 'not_attending' ? 'selected' : ''}`}
                                            onClick={() => onSelectionChange(event.event_id, member, 'not_attending')}
                                        >
                                            NO
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Right Column: Image */}
            <div className="event-right-col">
                <div className="event-image-container-large">
                    <img
                        src={`/events/event-${index + 1}.jpg`}
                        alt={event.event_name}
                        className="event-image-large"
                    />
                </div>
            </div>
        </div>
    );
}
