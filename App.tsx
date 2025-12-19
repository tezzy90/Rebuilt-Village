import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Mail, Check, Clapperboard } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { Button } from './components/Button';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useToggle } from './hooks/useToggle';
import { urlFor } from './services/sanityClient';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const StorySpark = lazy(() => import('./pages/StorySpark').then(m => ({ default: m.StorySpark })));
const Donate = lazy(() => import('./pages/Donate').then(m => ({ default: m.Donate })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const Events = lazy(() => import('./pages/Events').then(m => ({ default: m.Events })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));
const Board = lazy(() => import('./pages/Board').then(m => ({ default: m.Board })));
const Documents = lazy(() => import('./pages/Documents').then(m => ({ default: m.Documents })));

// Programs placeholder component
const Programs = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const { getPrograms } = await import('./services/sanityService');
        const data = await getPrograms();
        if (data && data.length > 0) {
          setPrograms(data);
        }
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPrograms();
  }, []);

  if (loading) return <div className="py-20 text-center text-slate-500 font-mono text-xs uppercase tracking-widest italic">Loading Productions...</div>;

  return (
    <div className="py-20 text-center container mx-auto text-slate-200">
      <h2 className="text-4xl font-serif italic mb-12 tracking-tight">Our Programs</h2>

      {programs.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto px-4">
          {programs.map((program, idx) => (
            <div key={program._id || idx} className="bg-slate-900 p-8 border border-slate-800 text-left group hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              <div
                className="h-72 bg-black mb-6 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-[1.02]"
                style={{ backgroundImage: program.image ? `url(${urlFor(program.image).url()})` : `url(https://picsum.photos/seed/${idx}/600/400)` }}
              ></div>
              <div className="font-mono text-[10px] text-primary mb-3 uppercase tracking-[0.2em] font-bold">
                {program.category || 'SCENE 101'}
              </div>
              <h3 className="text-3xl font-serif italic mb-4 leading-tight">{program.title}</h3>
              <p className="text-slate-400 mb-8 font-light text-sm leading-relaxed">{program.description}</p>
              <Button variant="outline" size="sm" className="px-8 border-slate-700 hover:border-white transition-all">
                Project Details
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-xl mx-auto py-20 border border-dashed border-slate-800 rounded-lg">
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-4 italic">The script is still being written</p>
          <p className="text-slate-600 text-[10px] uppercase tracking-wider">Connect Sanity CMS to feature your classes and workshops here.</p>
        </div>
      )}
    </div>
  );
};

// Contact placeholder component  
// Contact placeholder component
const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="py-20 container mx-auto px-4 max-w-3xl">
      <h2 className="text-4xl font-serif italic mb-12 text-center text-white">Contact The Studio</h2>

      {status === 'success' ? (
        <div className="bg-teal-900/20 border border-teal-800 p-10 text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-teal-500 rounded-full p-2 text-black">
              <Check size={32} />
            </div>
          </div>
          <h3 className="text-2xl font-serif text-white">Message Received</h3>
          <p className="text-teal-300 font-mono text-sm uppercase tracking-widest">We will review your call sheet shortly.</p>
          <Button variant="outline" onClick={() => setStatus('idle')} className="mt-4">Send Another Message</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-slate-900 p-10 border border-slate-800 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-mono text-primary mb-2 uppercase tracking-widest">Name</label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-slate-700 text-white focus:border-primary outline-none transition-colors font-serif"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-xs font-mono text-primary mb-2 uppercase tracking-widest">Email</label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-slate-700 text-white focus:border-primary outline-none transition-colors font-serif"
                placeholder="email@address.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-subject" className="block text-xs font-mono text-primary mb-2 uppercase tracking-widest">Subject</label>
            <select
              id="contact-subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 bg-black border border-slate-700 text-white focus:border-primary outline-none transition-colors font-serif"
            >
              <option>General Inquiry</option>
              <option>Program Enrollment</option>
              <option>Volunteering</option>
              <option>Partnership/Sponsorship</option>
            </select>
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-xs font-mono text-primary mb-2 uppercase tracking-widest">Message</label>
            <textarea
              id="contact-message"
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-black border border-slate-700 text-white focus:border-primary outline-none transition-colors font-serif"
              placeholder="Type your message..."
            ></textarea>
          </div>

          <Button
            className="w-full"
            variant="secondary"
            type="submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Transmitting...' : 'Send Message'}
          </Button>

          {status === 'error' && (
            <p className="text-red-500 text-xs font-mono text-center uppercase tracking-widest animate-pulse">
              Transmission Failed. Please try again.
            </p>
          )}
        </form>
      )}
    </div>
  );
};

// Newsletter Form Component
const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, formType: 'newsletter' }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Newsletter error:', error);
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
    <div className="mt-2 text-left">
      <h4 className="text-white font-serif italic text-lg mb-4">The Call Sheet</h4>
      <p className="mb-4 text-xs font-mono text-slate-500 uppercase tracking-wide">Get casting calls & news.</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
        <input
          id="newsletter-email"
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

// Navigation items type
interface NavItem {
  label: string;
  path: string;
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filmGrainEnabled, toggleFilmGrain] = useToggle(true);
  const location = useLocation();

  // Navigation items
  const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Programs', path: '/programs' },
    { label: 'Events', path: '/events' },
    { label: 'Blog', path: '/blog' },
    { label: 'AI Studio', path: '/ai-studio' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-film-black text-slate-200 font-sans selection:bg-primary selection:text-white">
      {/* Film Grain Toggle - hidden but accessible */}
      <button
        onClick={toggleFilmGrain}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-slate-900 focus:text-white focus:border focus:border-slate-700"
        aria-label={filmGrainEnabled ? "Disable film grain effect" : "Enable film grain effect"}
      >
        Toggle Film Grain
      </button>

      {/* Film Grain Overlay */}
      <div className={`film-grain ${filmGrainEnabled ? '' : 'disabled'}`}></div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-film-black/90 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            aria-label="Rebuilt Village Home"
          >
            <div className="border-2 border-white p-2 group-hover:bg-white group-hover:text-black transition-colors duration-300">
              <Clapperboard size={24} />
            </div>
            <div className="flex flex-col">
              <span className="block text-2xl font-serif font-bold text-white leading-none italic">REBUILT</span>
              <span className="block text-[10px] font-mono font-medium text-primary leading-none tracking-[0.3em] mt-1">VILLAGE</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center space-x-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs font-mono uppercase tracking-widest transition-all hover:text-white ${location.pathname === item.path
                  ? 'text-primary border-b border-primary pb-1'
                  : 'text-slate-500'
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/donate">
              <Button size="sm" variant="primary">
                Donate
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dialog */}
        <Dialog
          open={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          className="xl:hidden relative z-50"
        >
          <div className="fixed inset-0 bg-black/90" aria-hidden="true" />
          <div className="fixed inset-0 flex items-start justify-end">
            <Dialog.Panel className="w-full max-w-sm bg-black border-l border-slate-800 h-full mobile-menu-enter">
              <div className="p-6 space-y-6">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white"
                    aria-label="Close mobile menu"
                  >
                    <X size={24} />
                  </button>
                </div>
                <nav aria-label="Mobile navigation">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-4 text-xl font-serif italic ${location.pathname === item.path ? 'text-primary' : 'text-slate-400'
                        }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="pt-8">
                    <Link to="/donate" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full" variant="primary">
                        Donate
                      </Button>
                    </Link>
                  </div>
                </nav>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/ai-studio" element={<StorySpark />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/board" element={<Board />} />
            <Route path="/documents" element={<Documents />} />
          </Routes>
        </Suspense>
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
              <a
                href="https://instagram.com/rebuiltvillage"
                className="hover:text-primary transition-colors"
                aria-label="Follow us on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com/rebuiltvillage"
                className="hover:text-primary transition-colors"
                aria-label="Follow us on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
              </a>
              <a
                href="mailto:info@rebuiltvillage.org"
                className="hover:text-primary transition-colors"
                aria-label="Email us"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif italic text-lg mb-6">Index</h4>
            <ul className="space-y-3 font-mono text-xs uppercase tracking-widest">
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/programs" className="hover:text-primary transition-colors">Programs</Link></li>
              <li><Link to="/events" className="hover:text-primary transition-colors">Calendar</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Journal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif italic text-lg mb-6">Studio Info</h4>
            <address className="not-italic space-y-3 font-mono text-xs uppercase tracking-widest">
              <p>Ocoee, FL 34761</p>
              <p><a href="mailto:info@rebuiltvillage.org" className="hover:text-primary transition-colors">info@rebuiltvillage.org</a></p>
              <p className="pt-4 text-slate-600">
                501(c)(3) Nonprofit
              </p>
            </address>
          </div>

          <div>
            <h4 className="text-white font-serif italic text-lg mb-6">Transparency</h4>
            <ul className="space-y-3 font-mono text-xs uppercase tracking-widest">
              <li><Link to="/board" className="hover:text-primary transition-colors">Board</Link></li>
              <li><Link to="/documents" className="hover:text-primary transition-colors">Documents</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
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