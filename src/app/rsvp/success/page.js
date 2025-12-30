import Link from 'next/link';
import '../rsvp.css';

export default function SuccessPage({ searchParams }) {
    return (
        <div className="rsvp-page">
            <div className="rsvp-content" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className="family-greeting" style={{ margin: 0, maxWidth: '600px' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                    <h1 className="greeting-title">Thank You!</h1>
                    <p className="greeting-message">
                        Your RSVP has been received. We're so excited to celebrate with you!
                    </p>

                    <div style={{ marginTop: '2rem' }}>
                        <Link href={`/rsvp?id=${searchParams.id}`} className="submit-button" style={{ display: 'inline-block', textDecoration: 'none' }}>
                            Back to Invitation
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
