import React, { useEffect, useRef } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

export const Analytics: React.FC = () => {
    const location = useLocation();
    const isInitialized = useRef(false);

    useEffect(() => {
        const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
        if (!measurementId) return;

        // Initialize once on first mount
        if (!isInitialized.current) {
            if (import.meta.env.PROD) {
                ReactGA.initialize(measurementId);
            }
            isInitialized.current = true;
        }

        // Track every route change
        if (import.meta.env.PROD) {
            ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
        } else {
            console.log('[Analytics] pageview:', location.pathname + location.search);
        }
    }, [location.pathname, location.search]);

    return null;
};

