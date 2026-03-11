/**
 * Standalone ThemeToggle — used as a fallback if needed outside the nav.
 * The primary toggle is the CompactThemeToggle inside ViewfinderNav.tsx.
 */
import { Monitor, Moon, Sun } from 'lucide-react';
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const options: { value: 'light' | 'dark' | 'system'; icon: React.ReactNode; label: string }[] = [
    { value: 'light',  icon: <Sun     className="w-3.5 h-3.5" />, label: 'Light mode'   },
    { value: 'dark',   icon: <Moon    className="w-3.5 h-3.5" />, label: 'Dark mode'    },
    { value: 'system', icon: <Monitor className="w-3.5 h-3.5" />, label: 'System theme' },
  ];

  return (
    <div
      className="flex items-center gap-0.5 bg-surface border border-border rounded-full px-1 py-1"
      role="group"
      aria-label="Select color theme"
    >
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => setTheme(opt.value)}
          aria-pressed={theme === opt.value}
          aria-label={opt.label}
          title={opt.label}
          className={[
            'w-7 h-7 flex items-center justify-center rounded-full',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-1',
            theme === opt.value
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-text-muted hover:text-text',
          ].join(' ')}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
};
