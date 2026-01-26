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
            {/* Left Column: Event Name & Date */}
            <div className="event-left-col">
                <h3 className="event-name-large">
                    {event.event_name.split(' (').map((part, i) => (
                        <span key={i}>
                            {i > 0 && <br />}
                            {i > 0 ? `(${part}` : part}
                        </span>
                    ))}
                </h3>
                <div className="event-date-clean">
                    <p>{formatDate(event.event_date)}</p>
                </div>
            </div>

            {/* Right Column: Venue, Timing & Wardrobe */}
            <div className="event-right-col">
                <div className="event-details-block">
                    <div className="event-meta-clean">
                        <div className="meta-item">
                            <p className="meta-label">TIMING</p>
                            <p className="meta-value">{event.event_timing}</p>
                        </div>
                        <div className="meta-item">
                            <p className="meta-label">VENUE</p>
                            <p className="meta-value">{event.venue}</p>
                        </div>
                        {event.wardrobe && (
                            <div className="event-wardrobe-block">
                                <p className="meta-label">WARDROBE GUIDE</p>
                                <div className="wardrobe-content">
                                    <FormattedText text={event.wardrobe} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
