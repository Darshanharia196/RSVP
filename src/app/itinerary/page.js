import Link from 'next/link';
import { getItinerary, getAllConfig } from '@/lib/googleSheets';
import './itinerary.css';

export const metadata = {
    title: 'Itinerary — The Wedding',
    description: 'Full schedule of events for the wedding celebrations.',
};

// Day labels to dates mapping — update as needed
const DAY_DATES = {
    'Day 1': 'March 4, 2026',
    'Day 2': 'March 5, 2026',
};

export default async function ItineraryPage() {
    let itinerary = {};
    let config = {};

    try {
        [itinerary, config] = await Promise.all([getItinerary(), getAllConfig()]);
    } catch (e) {
        console.error('Error loading itinerary:', e);
    }

    const brideName = config?.bride_name || 'Riddhi';
    const groomName = config?.groom_name || 'Darshan';
    const days = Object.keys(itinerary).sort();

    return (
        <div className="itinerary-page">

            {/* ── Navigation ── */}
            <nav className="landing-nav">
                <Link href="/" className="nav-logo">
                    {groomName} &amp; {brideName}
                </Link>
                <ul className="nav-links">
                    <li><Link href="/itinerary" className="active">Itinerary</Link></li>
                    <li><Link href="/wardrobe">Wardrobe</Link></li>
                    <li><Link href="/how-to-reach">Reach</Link></li>
                </ul>
            </nav>

            {/* ── Page Header ── */}
            <header className="itinerary-header">
                <span className="itinerary-header-label">The Celebrations</span>
                <h1 className="itinerary-header-title">
                    Full <em>Itinerary</em>
                </h1>

                {(config?.check_in_info || config?.check_out_info) && (
                    <div className="itinerary-info-bar">
                        {config.check_in_info && (
                            <div className="itinerary-info-item">
                                <span className="info-label">Check-in</span>
                                <span className="info-value">{config.check_in_info}</span>
                            </div>
                        )}
                        {config.check_out_info && (
                            <div className="itinerary-info-item">
                                <span className="info-label">Check-out</span>
                                <span className="info-value">{config.check_out_info}</span>
                            </div>
                        )}
                    </div>
                )}
            </header>

            {/* ── Content ── */}
            <main className="itinerary-content">
                {days.length === 0 ? (
                    <div className="itinerary-empty">Itinerary coming soon…</div>
                ) : (
                    days.map(day => (
                        <section key={day} className="itinerary-day">
                            {/* Day Header */}
                            <div className="itinerary-day-header">
                                <h2 className="itinerary-day-label">{day}</h2>
                                {DAY_DATES[day] && (
                                    <span className="itinerary-day-date">{DAY_DATES[day]}</span>
                                )}
                            </div>

                            {/* Timeline */}
                            <div className="itinerary-timeline">
                                {itinerary[day].map((item, index) => (
                                    <div
                                        key={index}
                                        className={`itinerary-item type-${item.type || 'break'}`}
                                    >
                                        <div className="itinerary-item-time">{item.time}</div>
                                        <div className="itinerary-item-body">
                                            <h3 className="itinerary-item-title">{item.title}</h3>

                                            {item.location && (
                                                <div className="itinerary-item-location">
                                                    <span className="location-icon">📍</span> {item.location}
                                                </div>
                                            )}

                                            {item.description && (
                                                <p className="itinerary-item-description">
                                                    {item.description}
                                                </p>
                                            )}
                                            {item.type && item.type !== 'event' && (
                                                <span className="itinerary-item-type">{item.type}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))
                )}
            </main>

            {/* ── Footer ── */}
            <footer className="itinerary-footer">
                <p>{groomName} &amp; {brideName} · March 2026</p>
            </footer>

        </div>
    );
}
