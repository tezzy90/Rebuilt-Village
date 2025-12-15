import React, { useState } from 'react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { generateStoryIdea } from '../services/geminiService';
import { Sparkles, Clapperboard, Loader2 } from 'lucide-react';

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
    const idea = await generateStoryIdea(genre, theme);
    setResult(idea);
    setLoading(false);
  };

  return (
    <Section bg="light">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-600 rounded-full mb-4">
            <Sparkles size={24} />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Story Spark AI</h2>
          <p className="text-lg text-slate-600">
            Stuck on your next script? Let our AI assistant help you brainstorm loglines for your next short film.
            Perfect for students looking for inspiration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Clapperboard className="mr-2 text-primary" />
              Configure Your Idea
            </h3>
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Genre</label>
                <select 
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select a Genre</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Documentary">Documentary</option>
                  <option value="Drama">Drama</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Horror">Horror</option>
                  <option value="Adventure">Adventure</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Theme / Topic</label>
                <input 
                  type="text" 
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="e.g., Friendship, Technology, Nature, Overcoming Fear"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Dreaming up ideas...
                  </>
                ) : (
                  'Generate Story Concept'
                )}
              </Button>
            </form>
          </div>

          <div className="bg-slate-900 text-slate-100 p-8 rounded-xl shadow-lg relative min-h-[300px]">
             {result ? (
               <div className="prose prose-invert">
                 <h3 className="text-xl font-bold text-secondary mb-4">Here is your concept:</h3>
                 <div className="whitespace-pre-wrap leading-relaxed font-light">
                   {result}
                 </div>
               </div>
             ) : (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                 <Sparkles size={48} className="mb-4 opacity-20" />
                 <p>Your generated story idea will appear here.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </Section>
  );
};