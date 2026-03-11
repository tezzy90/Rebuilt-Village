import React from 'react';

// Visually hidden but accessible to screen readers
export const ScreenReaderOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 clip-[rect(0,0,0,0)]">
    {children}
  </span>
);

// Announcement region for dynamic content
export const LiveRegion: React.FC<{ id: string; assertive?: boolean }> = ({ id, assertive }) => (
  <div
    id={id}
    role="status"
    aria-live={assertive ? 'assertive' : 'polite'}
    aria-atomic="true"
    className="sr-only"
  />
);
