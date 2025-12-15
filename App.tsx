import React, { useState, useEffect } from 'react';
import { View } from './types';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { StorySpark } from './pages/StorySpark';
import { Donate } from './pages/Donate';
import { Blog } from './pages/Blog';
import { Events } from './pages/Events';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Board } from './pages/Board';
import { Documents } from './pages/Documents';
import { Menu, X, Instagram, Facebook, Mail, Film, Check, Clapperboard } from 'lucide-react';
import { Button } from './components/Button';

// Placeholder components for views not yet fully implemented in this iteration
const Programs = () => (
  <div className="py-20 text-center container mx-auto text-slate-200">
    <h2 className="text-3xl font-serif italic mb-12">Our Programs</h2>
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
      <div className="bg-slate-900 p-8 border border-slate-800 text-left group hover:border-primary transition-colors">
        <div className="h-64 bg-black mb-6 bg-[url('https://picsum.photos/seed/prog1/600/400')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"></div>
        <div className="font-mono text-xs text-primary mb-2">SCENE 101</div>
        <h3 className="text-2xl font-serif italic mb-4">Weekend Film Lab</h3>
        <p className="text-slate-400 mb-6 font-light">A recurring Saturday workshop for middle schoolers focusing on the fundamentals of visual storytelling.</p>
        <Button variant="outline" size="sm">View Syllabus</Button>
      </div>
      <div className="bg-slate-900 p-8 border border-slate-800 text-left group hover:border-secondary transition-colors">
        <div className="h-64 bg-black mb-6 bg-[url('https://picsum.photos/seed/prog2/600/400')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"></div>
        <div className="font-mono text-xs text-secondary mb-2">SCENE 202</div>
        <h3 className="text-2xl font-serif italic mb-4">Summer Intensive</h3>
        <p className="text-slate-400 mb-6 font-light">A 4-week deep dive for high school students. Produce a short film from script to screen.</p>
        <Button variant="outline" size="sm">View Syllabus</Button>
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="py-20 container mx-auto px-4 max-w-3xl">
    <h2 className="text-4xl font-serif italic mb-12 text-center text-white">Contact The Studio</h2>
    <form className="bg-slate-900 p-10 border border-slate-800 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-xs font-mono text-primary mb-2 uppercase tracking-widest">Name</label>
          <input type="text" className="w-full px-4 py-3 bg-black border border-slate-700 text-white focus:border-primary outline-none transition-colors font-serif" placeholder="Your Name" />
        </div>
        <div>
          <label className="block text-xs font-mono text-primary mb-2 uppercase tracking-widest">Email</label>
          <input type="email" className="w-full px-4 py-3 bg-black border border-slate-700 text-white focus:border-primary outline-none transition-colors font-serif" placeholder="email@address.com" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-mono text-primary mb-2 uppercase tracking-widest">Subject</label>
        <select className="w-full px-4 py-3 bg-black border border-slate-700 text-white focus:border-primary outline-none transition-colors font-serif">
          <option>General Inquiry</option>
          <option>Program Enrollment</option>
          <option>Volunteering</option>
          <option>Partnership/Sponsorship</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-mono text-primary mb-2 uppercase tracking-widest">Message</label>
        <textarea rows={4} className="w-full px-4 py-3 bg-black border border-slate-700 text-white focus:border-primary outline-none transition-colors font-serif" placeholder="Type your message..."></textarea>
      </div>
      <Button className="w-full" variant="secondary">Send Message</Button>
    </form>
  </div>
);

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="mt-4 p-4 bg-teal-900/20 border border-teal-800 text-teal-300 font-mono text-sm">
        <div className="flex items-center mb-1">
          <Check size={16} className="mr-2" />
          <span className="font-bold uppercase tracking-wider">Confirmed</span>
        </div>
        <p className="text-xs">You are on the list.</p>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <h4 className="text-white font-serif italic text-lg mb-4">The Call Sheet</h4>
      <p className="mb-4 text-xs font-mono text-slate-500 uppercase tracking-wide">Get casting calls & news.</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="EMAIL ADDRESS"
          required
          className="w-full px-4 py-3 bg-black border border-slate-800 focus:border-primary outline-none text-white placeholder-slate-600 text-xs font-mono uppercase tracking-widest transition-all"
        />
        <Button size="sm" type="submit" variant="outline" className="w-full border-slate-700 hover:border-white">
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [currentView]);

  const navItems = [
    { label: 'Home', view: View.HOME },
    { label: 'About', view: View.ABOUT },
    { label: 'Programs', view: View.PROGRAMS },
    { label: 'Events', view: View.EVENTS },
    { label: 'Blog', view: View.BLOG },
    { label: 'AI Studio', view: View.STORY_SPARK },
    { label: 'Contact', view: View.CONTACT },
  ];

  const renderView = () => {
    switch (currentView) {
      case View.HOME: return <Home setView={setCurrentView} />;
      case View.ABOUT: return <About />;
      case View.DONATE: return <Donate />;
      case View.STORY_SPARK: return <StorySpark />;
      case View.PROGRAMS: return <Programs />;
      case View.BLOG: return <Blog />;
      case View.EVENTS: return <Events />;
      case View.CONTACT: return <Contact />;
      case View.PRIVACY: return <Privacy />;
      case View.TERMS: return <Terms />;
      case View.BOARD: return <Board />;
      case View.DOCUMENTS: return <Documents />;
      default: return <Home setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-film-black text-slate-200 font-sans selection:bg-primary selection:text-white">

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-film-black/90 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">

          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentView(View.HOME)}
          >
            <div className="border-2 border-white p-2 group-hover:bg-white group-hover:text-black transition-colors duration-300">
              <Clapperboard size={24} />
            </div>
            <div className="flex flex-col">
              <span className="block text-2xl font-serif font-bold text-white leading-none italic">REBUILT</span>
              <span className="block text-[10px] font-mono font-medium text-primary leading-none tracking-[0.3em] mt-1">VILLAGE</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setCurrentView(item.view)}
                className={`text-xs font-mono uppercase tracking-widest transition-all hover:text-white ${currentView === item.view
                  ? 'text-primary border-b border-primary pb-1'
                  : 'text-slate-500'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <Button size="sm" variant="primary" onClick={() => setCurrentView(View.DONATE)}>
              Donate
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-black border-b border-slate-800 py-6 px-4 space-y-6 absolute w-full h-screen z-50">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setCurrentView(item.view)}
                className={`block w-full text-center py-3 text-xl font-serif italic ${currentView === item.view ? 'text-primary' : 'text-slate-400'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-8 flex justify-center">
              <Button className="w-full max-w-xs" variant="primary" onClick={() => setCurrentView(View.DONATE)}>
                Donate
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="bg-black text-slate-500 py-16 border-t border-slate-900">
        <div className="container mx-auto px-4 grid md:grid-cols-5 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-white font-serif italic text-2xl mb-6">Rebuilt Village</h4>
            <p className="mb-6 text-sm font-light leading-relaxed">
              Cinema is an empathy machine. We are tuning the engine.
            </p>
            <div className="flex space-x-6 text-white">
              <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Mail size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif italic text-lg mb-6">Index</h4>
            <ul className="space-y-3 font-mono text-xs uppercase tracking-widest">
              <li><button onClick={() => setCurrentView(View.ABOUT)} className="hover:text-primary transition-colors">About</button></li>
              <li><button onClick={() => setCurrentView(View.PROGRAMS)} className="hover:text-primary transition-colors">Programs</button></li>
              <li><button onClick={() => setCurrentView(View.EVENTS)} className="hover:text-primary transition-colors">Calendar</button></li>
              <li><button onClick={() => setCurrentView(View.BLOG)} className="hover:text-primary transition-colors">Journal</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif italic text-lg mb-6">Studio Info</h4>
            <ul className="space-y-3 font-mono text-xs uppercase tracking-widest">
              <li>Ocoee, FL 34761</li>
              <li>info@rebuiltvillage.org</li>
              <li className="pt-4 text-slate-600">
                EIN: 12-3456789<br />
                501(c)(3) Nonprofit
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif italic text-lg mb-6">Transparency</h4>
            <ul className="space-y-3 font-mono text-xs uppercase tracking-widest">
              <li><button onClick={() => setCurrentView(View.BOARD)} className="hover:text-primary transition-colors">Board</button></li>
              <li><button onClick={() => setCurrentView(View.DOCUMENTS)} className="hover:text-primary transition-colors">Documents</button></li>
              <li><button onClick={() => setCurrentView(View.PRIVACY)} className="hover:text-primary transition-colors">Privacy</button></li>
              <li><button onClick={() => setCurrentView(View.TERMS)} className="hover:text-primary transition-colors">Terms</button></li>
            </ul>
          </div>

          <div>
            <NewsletterForm />
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-slate-900 text-center font-mono text-xs text-slate-700 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Rebuilt Village. All rights reserved.
        </div>
      </footer>
    </div>
  );
}