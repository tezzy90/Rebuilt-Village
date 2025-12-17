import React from 'react';
import CookieConsent from 'react-cookie-consent';

export const CookieConsentBanner: React.FC = () => {
    return (
        <CookieConsent
            location="bottom"
            buttonText="Accept"
            declineButtonText="Decline"
            enableDeclineButton
            cookieName="rebuiltVillageCookieConsent"
            style={{
                background: '#0f172a',
                borderTop: '1px solid #334155',
                fontFamily: '"Courier Prime", monospace',
            }}
            buttonStyle={{
                background: '#0d9488',
                color: 'white',
                fontSize: '12px',
                fontFamily: '"Courier Prime", monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '12px 24px',
            }}
            declineButtonStyle={{
                background: 'transparent',
                border: '1px solid #475569',
                color: '#cbd5e1',
                fontSize: '12px',
                fontFamily: '"Courier Prime", monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '12px 24px',
            }}
        >
            <span className="text-sm text-slate-300">
                We use cookies to improve your experience and analyze site traffic. By accepting, you agree to our use of cookies.{' '}
                <a href="/privacy" className="text-primary hover:underline">
                    Learn more
                </a>
            </span>
        </CookieConsent>
    );
};
