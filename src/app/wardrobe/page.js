import Link from 'next/link';
import { getWardrobe, getAllConfig } from '@/lib/googleSheets';
import './wardrobe.css';

export const metadata = {
    title: 'Wardrobe — The Wedding',
    description: 'Dress code guide for the wedding celebrations.',
};

export const revalidate = 0;

const DAY_DATES = {
    'Day 1': 'March 4, 2026',
    'Day 2': 'March 5, 2026',
};

export default async function WardrobePage() {
    let wardrobe = {};
    let config = {};

    try {
        [wardrobe, config] = await Promise.all([getWardrobe(), getAllConfig()]);
    } catch (e) {
        console.error('Error loading wardrobe:', e);
    }

    const brideName = config?.bride_name || 'Riddhi';
    const groomName = config?.groom_name || 'Darshan';
    const days = Object.keys(wardrobe).sort();

    return (
        <div className="wardrobe-page">

            {/* ── Navigation ── */}
            <nav className="landing-nav">
                <Link href="/" className="nav-logo">
                    {groomName} &amp; {brideName}
                </Link>
                <ul className="nav-links">
                    <li><Link href="/itinerary">Itinerary</Link></li>
                    <li><Link href="/wardrobe" className="active">Wardrobe</Link></li>
                    <li><Link href="/how-to-reach">Location</Link></li>
                </ul>
            </nav>

            {/* ── Page Header ── */}
            <header className="wardrobe-header">
                <span className="wardrobe-header-label">Style Guide</span>
                <h1 className="wardrobe-header-title">
                    Dress <em>Code</em>
                </h1>
            </header>

            {/* ── Content ── */}
            <main className="wardrobe-content">
                {days.length === 0 ? (
                    <div className="wardrobe-empty">Wardrobe guide coming soon…</div>
                ) : (
                    days.map(day => (
                        <section key={day} className="wardrobe-day">
                            {/* Day Header */}
                            <div className="wardrobe-day-header">
                                <h2 className="wardrobe-day-label">{day}</h2>
                                {DAY_DATES[day] && (
                                    <span className="wardrobe-day-date">{DAY_DATES[day]}</span>
                                )}
                            </div>

                            {/* Events List */}
                            <div className="wardrobe-list">
                                {wardrobe[day].map((item, index) => (
                                    <div key={index} className="wardrobe-item">
                                        <div className="wardrobe-item-main">
                                            <h3 className="wardrobe-item-name">{item.event_name}</h3>
                                            <p className="wardrobe-item-date">{DAY_DATES[day]}</p>
                                        </div>

                                        <div className="wardrobe-item-meta">
                                            <div className="wardrobe-meta-block">
                                                <span className="wardrobe-meta-label">Dress Code</span>
                                                <span className="wardrobe-meta-value">{item.dress_code}</span>
                                            </div>

                                            {item.colors && (
                                                <div className="wardrobe-meta-block">
                                                    <span className="wardrobe-meta-label">Colour Palette</span>
                                                    <span className="wardrobe-meta-value">{item.colors}</span>
                                                </div>
                                            )}

                                            {item.notes && (
                                                <div className="wardrobe-meta-block">
                                                    <span className="wardrobe-meta-label">Guide</span>
                                                    <span className="wardrobe-meta-value">{item.notes}</span>
                                                </div>
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
            <footer className="wardrobe-footer">
                <p>{groomName} &amp; {brideName} · March 2026</p>
            </footer>

        </div>
    );
}
