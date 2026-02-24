import Link from 'next/link';
import { getAllConfig } from '@/lib/googleSheets';
import './reach.css';

export const metadata = {
    title: 'How to Reach — The Wedding',
    description: 'Travel guide and directions to the wedding venue.',
};

export const revalidate = 0;

export default async function ReachPage() {
    let config = {};
    try {
        config = await getAllConfig();
    } catch (e) {
        console.error('Error loading config:', e);
    }

    const brideName = config?.bride_name || 'Riddhi';
    const groomName = config?.groom_name || 'Darshan';

    const mapLink = "https://www.google.com/maps/dir//The+Grand+Resort+%7C+Luxury+Resort+in+Igatpuri,+Gate+no.+3,+The+Grand+Resort,+Bahuli+Dam+Road,+Vanketesh+Nagar,+Pimpri,+Igatpuri,+Nandgaonsado,+Maharashtra+422402/@19.0773666,72.9120768,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bdd8474a886553d:0xa723cf75484f4637!2m2!1d73.5836571!2d19.6645521?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D";
    const resortLink = "https://ggresort.com/";

    return (
        <div className="reach-page">

            {/* ── Navigation ── */}
            <nav className="landing-nav">
                <Link href="/" className="nav-logo">
                    {groomName} &amp; {brideName}
                </Link>
                <ul className="nav-links">
                    <li><Link href="/itinerary">Itinerary</Link></li>
                    <li><Link href="/wardrobe">Wardrobe</Link></li>
                    <li><Link href="/how-to-reach" className="active">Location</Link></li>
                </ul>
            </nav>

            {/* ── Page Header ── */}
            <header className="reach-header">
                <span className="reach-header-label">Travel Guide</span>
                <h1 className="reach-header-title">
                    How to <em>Reach</em>
                </h1>
            </header>

            {/* ── Content ── */}
            <main className="reach-content">

                {/* Venue Info */}
                <section className="venue-section">
                    <h2 className="venue-name">The Grand Resort</h2>
                    <p className="venue-address">
                        Gate no. 3, Bahuli Dam Road, Vanketesh Nagar, Pimpri,<br />
                        Igatpuri, Nandgaonsado, Maharashtra 422402
                    </p>
                    <a href="tel:08007291234" className="venue-contact">📞 080072 91234</a>

                    <div className="venue-actions">
                        <a href={mapLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                            Open in Google Maps ↗
                        </a>
                        <a href={resortLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            Visit Website ↗
                        </a>
                    </div>
                </section>

                {/* Route Info */}
                <section className="route-section">
                    <div className="route-header">
                        <h2 className="route-title">By Road from Mumbai</h2>
                        <span className="route-meta">~130 km · 1.5–2 hrs</span>
                    </div>

                    <div className="route-steps">
                        {/* Step 1 */}
                        <div className="route-step">
                            <div>
                                <h3 className="step-label">Mumbai-Nashik Highway</h3>
                                <p className="step-detail">Start on NH-160 heading away from Mumbai.</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="route-step">
                            <div>
                                <h3 className="step-label">Maha Samruddhi Mahamarg</h3>
                                <p className="step-detail">Take the Samruddhi Expressway (Mumbai-Nagpur) entry at Amane Interchange, Thane.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="route-step">
                            <div>
                                <h3 className="step-label">Exit to Igatpuri</h3>
                                <p className="step-detail">Take Exit IC-23 towards Igatpuri. This route bypasses the Kasara Ghat traffic.</p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="route-step">
                            <div>
                                <h3 className="step-label">The Grand Resort</h3>
                                <p className="step-detail">The resort is just ~1 km from the exit on the Mumbai-Agra highway.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* ── Footer ── */}
            <footer className="reach-footer">
                <p>{groomName} &amp; {brideName} · March 2026</p>
            </footer>

        </div>
    );
}
