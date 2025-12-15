import React from 'react';

interface CardProps {
  image?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ image, title, subtitle, children, className = '' }) => {
  return (
    <div className={`group relative bg-transparent ${className}`}>
      {image && (
        <div className="aspect-[4/3] overflow-hidden mb-4 border-2 border-transparent group-hover:border-white/20 transition-all duration-500">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover filter grayscale contrast-125 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105" 
          />
        </div>
      )}
      <div className="pt-2">
        {subtitle && (
          <p className="font-mono text-xs text-primary mb-2 tracking-widest border-l-2 border-primary pl-2">
            {subtitle}
          </p>
        )}
        <h3 className="text-2xl font-serif italic text-white mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <div className="text-slate-400 font-light leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};