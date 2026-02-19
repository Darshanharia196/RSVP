import Link from 'next/link';
import { getAllConfig } from '@/lib/googleSheets';
import CountdownTimer from '@/components/CountdownTimer';
import FormattedText from '@/components/FormattedText';
import './landing.css';

export async function generateMetadata() {
  try {
    const config = await getAllConfig();
    const brideName = config?.bride_name || 'Riddhi';
    const groomName = config?.groom_name || 'Darshan';
    return {
      title: `${groomName} & ${brideName}'s Wedding`,
      description: `Join us to celebrate the wedding of ${groomName} & ${brideName}.`,
    };
  } catch {
    return { title: 'The Wedding' };
  }
}

export default async function LandingPage() {
  let config = {};
  try {
    config = await getAllConfig();
  } catch (e) {
    console.error('Error loading config:', e);
  }

  const brideName = config?.bride_name || 'Riddhi';
  const groomName = config?.groom_name || 'Darshan';
  const weddingDate = config?.wedding_date || '2026-03-04 11:00:00';
  const location = config?.location || 'The Grand Resort, Igatpuri';
  const hashtag = config?.hashtag || '#ShanDarRishta';
  const greetingText = config?.greeting_text || 'Please join us as we come together in joy to celebrate love and new beginnings.';

  return (
    <div className="landing-page">

      {/* ── Navigation ── */}
      <nav className="landing-nav">
        <Link href="/" className="nav-logo">
          {groomName} &amp; {brideName}
        </Link>
        <ul className="nav-links">
          <li><Link href="/itinerary">Itinerary</Link></li>
          <li><Link href="/wardrobe">Wardrobe</Link></li>
          <li><Link href="/how-to-reach">Reach</Link></li>
        </ul>
      </nav>

      {/* ── Cover ── */}
      <section className="landing-cover">
        <img src="/ganeshji.png" alt="Ganeshji" className="cover-ganeshji" />
        <div className="cover-invocation">|| શ્રી ગણેશાય નમઃ ||</div>
        <img src="/logo.png" alt="Wedding Logo" className="cover-logo" />
        <div className="cover-divider" />
        <div className="cover-meta">
          <div className="cover-meta-primary">
            <span>March 4 &amp; 5, 2026</span>
            <span className="cover-meta-separator">•</span>
            <span>{location}</span>
          </div>
          <div className="cover-meta-hashtag">{hashtag}</div>
        </div>
      </section>

      {/* ── Hero ── */}
      <section className="landing-hero">
        <div className="hero-title-block">
          <span className="hero-title-line">The</span>
          <span className="hero-title-line indent">Wedding</span>
          <span className="hero-title-line">Of</span>
          <span className="hero-title-line indent">{groomName} &amp; {brideName}</span>
        </div>
        <div className="hero-image-col">
          <div className="hero-image-frame">
            <img src="/hero.jpg" alt="Couple" className="hero-image" />
          </div>
        </div>
      </section>

      {/* ── Countdown ── */}
      <div className="landing-countdown">
        <CountdownTimer targetDate={weddingDate} />
      </div>

      {/* ── Greeting ── */}
      <section className="landing-greeting">
        <p className="greeting-text">
          <FormattedText text={`"${greetingText}"`} />
        </p>
        <span className="greeting-signature">With Love, {groomName} &amp; {brideName}</span>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <p>{groomName} &amp; {brideName} · March 2026 · {location}</p>
      </footer>

    </div>
  );
}
