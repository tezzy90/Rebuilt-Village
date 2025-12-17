import React from 'react';
import { Film } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="min-h-screen bg-film-black flex items-center justify-center">
            <div className="text-center">
                <Film size={48} className="mx-auto text-primary mb-4 animate-pulse" />
                <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
                    Loading...
                </p>
            </div>
        </div>
    );
};
