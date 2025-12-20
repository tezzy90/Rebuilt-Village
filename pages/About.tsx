import React from 'react';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { FileText, ShieldCheck, Milestone } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <>
      <Section bg="black" className="text-center pt-32">
        <div className="font-mono text-[10px] text-primary mb-4 uppercase tracking-[0.4em] font-bold opacity-60">Origin Story</div>
        <h1 className="text-5xl md:text-7xl font-serif italic tracking-tight text-white mb-8">Rebuilding The Frame</h1>
        <div className="h-1 w-24 bg-primary/30 mx-auto mb-10"></div>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
          Founded in 2023 in Ocoee, Florida, Rebuilt Village began with a simple observation: Talent is universal, but opportunity is not. Cinema is our tool for restoration.
        </p>
      </Section>

      <Section bg="black">
        <div className="max-w-6xl mx-auto">
          {/* Vision Block */}
          <div className="text-center mb-32">
            <div className="font-mono text-[10px] text-primary mb-4 uppercase tracking-[0.4em] font-bold opacity-60">The Vision</div>
            <h2 className="text-4xl md:text-6xl font-serif italic text-white mb-6">Rebuilding Community through Art</h2>
            <div className="h-px w-32 bg-slate-800 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start mb-32">
            <div className="relative group overflow-hidden border border-slate-800 p-2">
              <img
                src="/assets/brand/team-action.png"
                alt="Founder teaching students"
                className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-[1.02]"
              />
              <div className="absolute top-0 left-0 w-8 h-full bg-black/20 flex flex-col justify-around py-4 border-r border-white/5">
                {[...Array(6)].map((_, i) => <div key={i} className="w-3 h-4 bg-black/40 mx-auto rounded-sm"></div>)}
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Milestone size={20} className="text-primary" />
                <h2 className="text-sm font-mono uppercase tracking-widest text-white">Our Mission Statement</h2>
              </div>
              <p className="text-slate-200 mb-8 leading-relaxed font-light text-xl italic font-serif">
                "Our mission is to enrich the community by telling stories through the art of film and media."
              </p>
              <p className="text-slate-300 mb-8 leading-relaxed font-light text-lg">
                We empower our local community to capture and share stories that are deeply personal, ensuring that these narratives are preserved for future generations.
              </p>
              <p className="text-slate-400 mb-8 leading-relaxed font-light">
                We strive to use art as a medium to foster community connections through events, arts programming, and education. By providing professional-grade tools and mentorship, we ensure the next generation of storytellers has the power to define their own legacy.
              </p>
              <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-8">
                <div>
                  <div className="text-2xl font-serif italic text-white">01</div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Preserving Narratives</div>
                </div>
                <div>
                  <div className="text-2xl font-serif italic text-white">02</div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Fostering Connection</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif italic text-white">Cast & Crew</h2>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-4">The people behind the lens</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              title={i === 1 ? "Sarah Jenkins" : i === 2 ? "Marcus Thorne" : "Elena Rodriguez"}
              subtitle={i === 1 ? "Executive Director" : i === 2 ? "Director of Education" : "Board Chair"}
              image={i === 1 ? "/assets/brand/sarah.png" : i === 2 ? "/assets/brand/marcus.png" : "/assets/brand/hero-students.png"}
            >
              <p className="text-sm leading-relaxed text-slate-400">
                {i === 1
                  ? "Former documentary filmmaker with 10 years of experience in youth education."
                  : i === 2
                    ? "MFA in Film Production from FSU. Passionate about cinematography and lighting."
                    : "Community leader and education advocate in Ocoee for over 20 years."}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section bg="dark" className="border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <ShieldCheck size={32} className="text-primary mb-6" />
            <h2 className="text-3xl font-serif italic text-white mb-4">Produced With Integrity</h2>
            <p className="text-slate-400 font-light leading-relaxed max-w-2xl">
              Rebuilt Village is committed to the highest standards of financial stewardship.
              As a 501(c)(3) nonprofit, our "box office" is open for public review.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <a href="#" className="flex items-center justify-between p-6 bg-black border border-slate-800 hover:border-primary transition-all group">
              <div className="flex items-center text-slate-300">
                <FileText className="w-5 h-5 mr-4 text-slate-500 group-hover:text-primary transition-colors" />
                <span className="font-mono text-xs uppercase tracking-widest">2023 Form 990</span>
              </div>
              <span className="text-[10px] font-mono text-slate-600 uppercase">PDF Archive</span>
            </a>
            <a href="#" className="flex items-center justify-between p-6 bg-black border border-slate-800 hover:border-primary transition-all group">
              <div className="flex items-center text-slate-300">
                <ShieldCheck className="w-5 h-5 mr-4 text-slate-500 group-hover:text-primary transition-colors" />
                <span className="font-mono text-xs uppercase tracking-widest">Determination Letter</span>
              </div>
              <span className="text-[10px] font-mono text-slate-600 uppercase">IRS Records</span>
            </a>
          </div>
        </div>
      </Section>
    </>
  );
};