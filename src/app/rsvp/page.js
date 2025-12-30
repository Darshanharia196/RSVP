import { getFamilyById, getEventsForFamily, getAllConfig } from '@/lib/googleSheets';
import CountdownTimer from '@/components/CountdownTimer';
import EventCard from '@/components/EventCard';
import RSVPForm from '@/components/RSVPForm';
import './rsvp.css';

/**
 * RSVP Landing Page
 * Displays personalized wedding invitation with countdown and event details
 */
export default async function RSVPPage({ searchParams }) {
    const { id: familyId } = await searchParams;

    if (!familyId) {
        return (
            <div className="error-page">
                <h1>Invalid Link</h1>
                <p>Please use the personalized link sent to you.</p>
            </div>
        );
    }

    try {
        // Fetch data from Google Sheets
        const [family, config] = await Promise.all([
            getFamilyById(familyId),
            getAllConfig(),
        ]);

        // Hardcode events for design review to ensure stability and layout
        const events = [
            { event_id: 'evt_1', event_name: 'Wedding Ceremony', event_date: '2026-01-16', event_time: '10:00 AM', event_location: 'The Grand Hall' },
            { event_id: 'evt_2', event_name: 'Reception Lunch', event_date: '2026-01-16', event_time: '1:00 PM', event_location: 'Banquet Hall' },
            { event_id: 'evt_3', event_name: 'Sangeet Night', event_date: '2026-01-15', event_time: '7:00 PM', event_location: 'Ballroom' },
            { event_id: 'evt_4', event_name: 'Reception Dinner', event_date: '2026-01-16', event_time: '8:00 PM', event_location: 'Seaside Lawn' }
        ];

        if (!family) {
            return (
                <div className="error-page">
                    <h1>Family Not Found</h1>
                    <p>We couldn't find your invitation. Please contact us.</p>
                </div>
            );
        }

        const brideName = config?.bride_name || 'Bride';
        const groomName = config?.groom_name || 'Groom';
        const weddingDate = config?.wedding_date || '2026-01-16 10:00:00';
        const siteTitle = config?.site_title || 'Our Wedding';

        // Parse member names
        const memberNames = family.member_names?.split(',').map(name => name.trim()) || [];

        return (
            <div className="rsvp-page editorial-grid">
                {/* Hero Section */}
                <header className="hero-section">
                    <div className="hero-title-wrapper">
                        <span className="hero-title-line">The</span>
                        <span className="hero-title-line indent">Wedding</span>
                        <span className="hero-title-line">Of</span>
                        <span className="hero-title-line indent">{groomName} & {brideName}</span>
                    </div>

                    <div className="hero-image-container">
                        <img
                            src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Couple"
                            className="hero-image"
                        />
                    </div>

                    <div className="hero-meta">
                        <span>{new Date(weddingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        <span>Mumbai, India</span>
                        <span>#DarshanWeds</span>
                    </div>
                </header>

                {/* Countdown Strip */}
                <div className="countdown-strip">
                    <CountdownTimer targetDate={weddingDate} />
                </div>

                {/* Greeting */}
                <section className="greeting-section">
                    <h2 className="greeting-text">
                        "We invite you to share in our joy as we celebrate the beginning of our new life together."
                    </h2>
                    <div className="greeting-signature">
                        — The {family.family_name} Family
                    </div>
                </section>

                {/* Events Spread */}
                {/* Itinerary & RSVP Section */}
                <section className="rsvp-form-section">
                    <div className="rsvp-header">
                        <h2 className="rsvp-title">Itinerary & RSVP</h2>
                        <span className="rsvp-subtitle">Kindly respond by January 1st</span>
                    </div>

                    <RSVPForm family={family} events={events || []} />
                </section>

                <footer className="rsvp-footer">
                    <p>With Love, {groomName} & {brideName}</p>
                </footer>
            </div>
        );
    } catch (error) {
        console.error('Error loading RSVP page:', error);
        return (
            <div className="error-page">
                <h1>Something Went Wrong</h1>
                <p>We're having trouble loading your invitation. Please try again later.</p>
            </div>
        );
    }
}
