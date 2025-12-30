'use client';

/**
 * Event Card Component
 * Displays event details with timing and wardrobe information
 */
export default function EventCard({ event }) {
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
        <div className="event-card">
            <div className="event-header">
                <h3 className="event-name">{event.event_name}</h3>
                <div className="event-date">{formatDate(event.event_date)}</div>
            </div>

            <div className="event-details">
                <div className="event-detail-item">
                    <span className="detail-icon">🕐</span>
                    <div>
                        <div className="detail-label">Timing</div>
                        <div className="detail-value">{event.event_timing}</div>
                    </div>
                </div>

                <div className="event-detail-item">
                    <span className="detail-icon">👔</span>
                    <div>
                        <div className="detail-label">Dress Code</div>
                        <div className="detail-value">{event.wardrobe}</div>
                    </div>
                </div>

                {event.venue && (
                    <div className="event-detail-item">
                        <span className="detail-icon">📍</span>
                        <div>
                            <div className="detail-label">Venue</div>
                            <div className="detail-value">{event.venue}</div>
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
}
