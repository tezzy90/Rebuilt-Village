import React from 'react';

interface SectionProps {
  className?: string;
  children: React.ReactNode;
  id?: string;
  bg?: 'black' | 'dark' | 'paper';
}

export const Section: React.FC<SectionProps> = ({
  className = '',
  children,
  id,
  bg = 'black'
}) => {
  const bgColors = {
    black: 'bg-background text-text',
    dark: 'bg-surface text-text',
    paper: 'bg-surface-highlight text-text border-t border-b border-border',
  };

  return (
    <section id={id} className={`py-20 md:py-32 ${bgColors[bg]} ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        {children}
      </div>
    </section>
  );
};