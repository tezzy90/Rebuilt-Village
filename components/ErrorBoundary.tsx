import React, { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    readonly state: State;

    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-film-black flex items-center justify-center px-4">
                    <div className="max-w-2xl text-center">
                        <div className="border-2 border-red-500 p-12">
                            <h1 className="text-4xl font-serif italic text-white mb-6">
                                Something went wrong
                            </h1>
                            <p className="text-slate-400 mb-8 font-mono text-sm text-left whitespace-pre-wrap overflow-auto max-h-96">
                                {this.state.error?.stack || this.state.error?.message || 'An unexpected error occurred'}
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-8 py-3 bg-primary text-white font-mono text-sm uppercase tracking-widest hover:bg-primary/80 transition-colors"
                            >
                                Reload Page
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
