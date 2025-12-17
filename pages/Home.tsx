import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Section } from '../components/Section';
import { Play, Film } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <>
      {/* Cinematic Hero Section */}
      <div className="relative h-screen min-h-[600px] bg-black text-white overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/1920/1080?grayscale&blur=2"
            alt="Students filming"
            className="w-full h-full object-cover opacity-50 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          />
        </div>
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-film-black via-transparent to-film-black/80 z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/90 z-10"></div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block border-y border-white/20 py-2 px-6 mb-8 backdrop-blur-sm">
              <span className="font-mono text-sm tracking-[0.3em] text-slate-300">EST. 2023 • OCOEE, FL</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-tight italic">
              Life, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Framed.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              We don't just teach film. We rebuild perspectives. Empowering the next generation of visual storytellers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/programs">
                <Button variant="primary" size="lg">
                  Start Creating
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Manifesto
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Impact "Script" Section */}
      <Section bg="black" className="border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-800 border border-slate-800">
          <div className="p-12 text-center group hover:bg-slate-900 transition-colors duration-500">
            <div className="font-mono text-xs text-slate-500 mb-4 tracking-widest">SCENE 01: IMPACT</div>
            <h3 className="text-5xl font-serif italic text-white mb-2 group-hover:text-primary transition-colors">150+</h3>
            <p className="font-mono text-sm text-slate-400 uppercase tracking-widest">Students Cast</p>
          </div>
          <div className="p-12 text-center group hover:bg-slate-900 transition-colors duration-500">
            <div className="font-mono text-xs text-slate-500 mb-4 tracking-widest">SCENE 02: PRODUCTION</div>
            <h3 className="text-5xl font-serif italic text-white mb-2 group-hover:text-secondary transition-colors">50+</h3>
            <p className="font-mono text-sm text-slate-400 uppercase tracking-widest">Stories Told</p>
          </div>
          <div className="p-12 text-center group hover:bg-slate-900 transition-colors duration-500">
            <div className="font-mono text-xs text-slate-500 mb-4 tracking-widest">SCENE 03: ACCESS</div>
            <h3 className="text-5xl font-serif italic text-white mb-2 group-hover:text-primary transition-colors">100%</h3>
            <p className="font-mono text-sm text-slate-400 uppercase tracking-widest">Scholarships</p>
          </div>
        </div>
      </Section>

      {/* Mission / Video Showcase */}
      <Section bg="dark">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 border-t-2 border-l-2 border-primary/30 hidden md:block"></div>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 text-white">The Art of<br /><span className="italic text-slate-500">Seeing.</span></h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed font-light">
              Rebuilt Village isn't about rote learning. It's about finding the narrative in the noise. We provide professional-grade cinema cameras, lighting, and post-production suites to students who have the vision but need the tools.
            </p>
            <ul className="space-y-6 mb-12">
              {[
                "Cinema Camera Access (Blackmagic, RED)",
                "Directorial Mentorships",
                "Color Grading & Sound Design Labs",
              ].map((item, i) => (
                <li key={i} className="flex items-center text-slate-300 font-mono text-sm tracking-wide">
                  <span className="w-8 h-[1px] bg-primary mr-4"></span>
                  {item.toUpperCase()}
                </li>
              ))}
            </ul>
            <Link to="/about">
              <Button variant="outline">Read The Story</Button>
            </Link>
          </div>

          <div className="lg:col-span-7 relative">
            {/* Artistic Video Placeholder */}
            <div className="relative aspect-video bg-black border border-slate-700 p-2 group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none z-10"></div>
              <img src="https://picsum.photos/seed/film/800/450?grayscale" alt="Showcase Reel" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter grayscale group-hover:grayscale-0" />

              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-24 h-24 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-90 transition-transform duration-500">
                  <Play size={32} className="text-white fill-white ml-2" />
                </div>
              </div>

              {/* Film Strip Accents */}
              <div className="absolute top-0 left-0 bottom-0 w-8 bg-black z-20 flex flex-col justify-between py-2 border-r border-slate-800">
                {[...Array(8)].map((_, i) => <div key={i} className="w-4 h-6 bg-slate-900 mx-auto rounded-sm"></div>)}
              </div>
              <div className="absolute top-0 right-0 bottom-0 w-8 bg-black z-20 flex flex-col justify-between py-2 border-l border-slate-800">
                {[...Array(8)].map((_, i) => <div key={i} className="w-4 h-6 bg-slate-900 mx-auto rounded-sm"></div>)}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <Section bg="black" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/id/45/1920/1080?grayscale')] opacity-10 bg-cover bg-center"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto border-t border-b border-white/10 py-16">
          <Film size={48} className="mx-auto text-primary mb-8 animate-pulse" />
          <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-8">Credits Roll.</h2>
          <p className="text-slate-400 text-lg font-mono max-w-xl mx-auto mb-12 uppercase tracking-widest">
            Be part of the production. Support the arts in Ocoee.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/donate">
              <Button variant="secondary" size="lg">
                Executive Producer (Donate)
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" size="lg">
                Join Crew (Volunteer)
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
};