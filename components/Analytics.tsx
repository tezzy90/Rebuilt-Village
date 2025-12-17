import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';

export const Analytics: React.FC = () => {
    useEffect(() => {
        const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

        if (measurementId && import.meta.env.PROD) {
            ReactGA.initialize(measurementId);
            ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
        }
    }, []);

    return null;
};
