'use client';

import { useState, useEffect } from 'react';

/**
 * Countdown Timer Component
 * Displays days, hours, minutes, and seconds until the wedding
 */
export default function CountdownTimer({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0 });
            }
        };

        // Calculate immediately
        calculateTimeLeft();

        // Update every minute
        const timer = setInterval(calculateTimeLeft, 60000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="countdown-timer">
            <div className="countdown-item">
                <span className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-separator"></div>
            <div className="countdown-item">
                <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-separator"></div>
            <div className="countdown-item">
                <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="countdown-label">Minutes</span>
            </div>

        </div>
    );
}
