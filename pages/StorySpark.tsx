import React, { useState } from 'react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { generateStoryIdea } from '../services/geminiService';
import { Clapperboard, Loader2, Wand2, Film } from 'lucide-react';

export const StorySpark: React.FC = () => {
  const [genre, setGenre] = useState('');
  const [theme, setTheme] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genre || !theme) return;

    setLoading(true);
    setResult(null);
    try {
      const idea = await generateStoryIdea(genre, theme);
      setResult(idea);
    } catch (error) {
      setResult("ERROR: Transmission Interrupted. The AI scriptorium is currently offline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section bg="black" className="min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="font-mono text-[10px] text-primary mb-4 uppercase tracking-[0.4em] font-bold opacity-60">Scene: Brainstorming</div>
          <h2 className="text-5xl md:text-6xl font-serif italic tracking-tight text-white mb-6">Story Spark AI</h2>
          <div className="h-1 w-20 bg-primary/30 mx-auto mb-8"></div>
          <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
            Stuck on your next script? Tune the frequency. Let our AI assistant help you brainstorm loglines and concepts for your next production.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-slate-900/40 p-10 border border-slate-800 backdrop-blur-sm">
            <h3 className="text-sm font-mono text-primary mb-8 flex items-center uppercase tracking-widest">
              <Film className="mr-3" size={16} />
              Production Parameters
            </h3>
            <form onSubmit={handleGenerate} className="space-y-8">
              <div>
                <label className="block text-[10px] font-mono text-slate-500 mb-2 uppercase tracking-[0.2em]">Genre Profile</label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full px-4 py-4 bg-black border border-slate-700 text-white focus:border-primary outline-none transition-colors font-serif italic text-lg"
                  required
                >
                  <option value="" className="font-sans">SELECT GENRE...</option>
                  <option value="Sci-Fi" className="font-sans">Sci-Fi / Futurist</option>
                  <option value="Documentary" className="font-sans">Documentary / Truth</option>
                  <option value="Drama" className="font-sans">Drama / Human Condition</option>
                  <option value="Comedy" className="font-sans">Comedy / Subversion</option>
                  <option value="Horror" className="font-sans">Horror / Primal</option>
                  <option value="Adventure" className="font-sans">Adventure / Journey</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-500 mb-2 uppercase tracking-[0.2em]">Core Theme / Logline Spark</label>
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="e.g., Sacrifice, Digital Isolation, The Florida Sun..."
                  className="w-full px-4 py-4 bg-black border border-slate-700 text-white focus:border-primary outline-none transition-colors font-serif italic text-lg lg:text-xl"
                  required
                />
              </div>

              <Button type="submit" disabled={loading} variant="primary" className="w-full h-16 group">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-3" size={20} />
                    Processing Narrative...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-3 group-hover:rotate-12 transition-transform" size={20} />
                    Ignite Concept
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-black border border-slate-800 p-10 min-h-[450px] flex flex-col">
              <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                <div className="font-mono text-[10px] text-slate-600 uppercase tracking-widest italic">Output: Final Draft</div>
                <div className="flex space-x-1">
                  {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>)}
                </div>
              </div>

              {result ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="whitespace-pre-wrap leading-relaxed font-serif italic text-xl md:text-2xl text-slate-200">
                    {result}
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-slate-700 p-6 text-center">
                  <Clapperboard size={64} className="mb-6 opacity-10" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em]">Waiting for transmission...</p>
                </div>
              )}

              <div className="mt-auto pt-8 border-t border-slate-900 flex justify-between">
                <div className="font-mono text-[9px] text-slate-700 uppercase">System: StorySpark v1.0</div>
                {result && (
                  <button
                    onClick={() => navigator.clipboard.writeText(result || '')}
                    className="font-mono text-[9px] text-primary uppercase hover:text-white transition-colors"
                  >
                    Copy to Clipboard
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};