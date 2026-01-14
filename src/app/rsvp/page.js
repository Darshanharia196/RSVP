import { getFamilyById, getEventsForFamily, getAllConfig, hasFamilyResponded } from '@/lib/googleSheets';
import CountdownTimer from '@/components/CountdownTimer';
import EventCard from '@/components/EventCard';
import RSVPForm from '@/components/RSVPForm';
import FormattedText from '@/components/FormattedText';
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
        const [family, events, config, hasResponded] = await Promise.all([
            getFamilyById(familyId),
            getEventsForFamily(familyId),
            getAllConfig(),
            hasFamilyResponded(familyId),
        ]);

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
        const location = config?.location || 'Mumbai, India';
        const hashtag = config?.hashtag || '#DarshanWeds';
        const greetingText = config?.greeting_text || '"We invite you to share in our joy as we celebrate the beginning of our new life together."';
        const rsvpDeadline = config?.rsvp_deadline || 'January 1st';

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

                    <div className="hero-right-col">
                        <div className="hero-image-container">
                            <img
                                src="/hero.jpg"
                                alt="Couple"
                                className="hero-image"
                            />
                        </div>

                        <div className="hero-meta">
                            <div className="meta-line-primary">
                                <span>{new Date(weddingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                <span className="meta-separator">•</span>
                                <span>{location}</span>
                            </div>
                            <div className="meta-line-secondary">
                                <span>{hashtag}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Countdown Strip */}
                <div className="countdown-strip">
                    <CountdownTimer targetDate={weddingDate} />
                </div>

                {/* Greeting */}
                <section className="greeting-section">
                    <h2 className="greeting-text">
                        <FormattedText text={greetingText} />
                    </h2>
                </section>

                {/* Events Spread */}
                {/* Itinerary & RSVP Section */}
                <section className="rsvp-form-section">
                    <div className="rsvp-header">
                        <h2 className="rsvp-title">Itinerary & RSVP</h2>
                        {!hasResponded && <span className="rsvp-subtitle">Kindly respond by {rsvpDeadline}</span>}
                    </div>

                    <RSVPForm
                        family={family}
                        events={events || []}
                        hasResponded={hasResponded}
                    />
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
