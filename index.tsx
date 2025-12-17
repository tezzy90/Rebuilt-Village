import './src/index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Analytics } from './components/Analytics';
import { CookieConsentBanner } from './components/CookieConsent';

const container = document.getElementById('root');
if (!container) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Analytics />
        <App />
        <CookieConsentBanner />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);