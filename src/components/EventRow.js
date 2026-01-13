'use client';
import FormattedText from './FormattedText';

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
            {/* Left Column: Details */}
            <div className="event-left-col">
                {/* Event Details */}
                <div className="event-details-block">
                    <h3 className="event-name-large">{event.event_name}</h3>
                    <div className="event-meta-clean">
                        <p>{formatDate(event.event_date)}</p>
                        <p>{event.event_timing}</p>
                        <p>{event.venue}</p>
                        {event.wardrobe && (
                            <div className="event-wardrobe-block">
                                <p className="wardrobe-label">WARDROBE GUIDE</p>
                                <div className="wardrobe-content">
                                    <FormattedText text={event.wardrobe} />
                                </div>
                            </div>
                        )}
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
