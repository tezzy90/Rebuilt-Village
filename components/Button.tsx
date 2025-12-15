import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  // Changes: Removed rounded-md, added tracking-widest, uppercase, font-bold
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform hover:-translate-y-1";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-teal-500 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]",
    secondary: "bg-secondary text-white hover:bg-orange-600 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]",
    outline: "border-2 border-slate-500 bg-transparent hover:border-white hover:text-white text-slate-300",
    ghost: "bg-transparent hover:bg-white/10 text-slate-300 hover:text-white",
  };

  const sizes = {
    sm: "h-8 px-4 text-xs",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-10 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};