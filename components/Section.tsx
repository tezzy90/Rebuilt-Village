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
    black: 'bg-film-black text-slate-200',
    dark: 'bg-slate-900 text-slate-200',
    paper: 'bg-slate-800 text-slate-200 border-t border-b border-slate-700', // Changed from white to dark slate for dark mode
  };

  return (
    <section id={id} className={`py-20 md:py-32 ${bgColors[bg]} ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        {children}
      </div>
    </section>
  );
};