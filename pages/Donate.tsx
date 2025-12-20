import React, { useState } from 'react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { CreditCard, Heart, ShieldCheck, Zap } from 'lucide-react';

export const Donate: React.FC = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('monthly');

  const presetAmounts = [25, 50, 100, 250];

  const impactMessage = (amt: number | null) => {
    if (!amt) return "Support film education and community art in Ocoee.";
    if (amt < 50) return "Funds the capture of one personal story for our community archive.";
    if (amt < 100) return "Provides arts programming for five local youth for a month.";
    if (amt < 250) return "Supports a community screening event to foster local connections.";
    return "Full scholarship for our Masterclass on narrative preservation.";
  };

  return (
    <>
      <Section bg="black" className="pt-32 pb-0 text-slate-200">
        <div className="text-center">
          <div className="font-mono text-[10px] text-primary mb-4 uppercase tracking-[0.4em] font-bold opacity-60">Call For Producers</div>
          <h1 className="text-5xl md:text-7xl font-serif italic tracking-tight text-white mb-8">Executive Sponsorship</h1>
          <div className="h-1 w-24 bg-primary/30 mx-auto mb-10"></div>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Your investment powers the next generation of visual storytellers. Every contribution is a credit to the future of cinema in Ocoee.
          </p>
        </div>
      </Section>

      <Section bg="black">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-16 items-start">

          {/* Donation Form */}
          <div className="lg:col-span-7 bg-slate-900/50 p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 -mr-12 -mt-12 rounded-full blur-2xl"></div>

            <h2 className="text-2xl font-serif italic text-white mb-8">Select Investment Tier</h2>

            <div className="flex bg-black p-1 border border-slate-800 mb-10">
              <button
                className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest transition-all ${frequency === 'once' ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                onClick={() => setFrequency('once')}
              >
                ONE-TIME
              </button>
              <button
                className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest transition-all ${frequency === 'monthly' ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                onClick={() => setFrequency('monthly')}
              >
                MONTHLY SUSTAINER
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {presetAmounts.map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`py-6 px-4 border transition-all duration-300 flex flex-col items-center justify-center ${amount === val
                    ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary/30'
                    : 'border-slate-800 bg-black/50 hover:border-slate-500 text-slate-500 hover:text-white'
                    }`}
                >
                  <span className="text-[10px] font-mono opacity-50 mb-1 uppercase tracking-tighter">Level</span>
                  <span className="text-2xl font-serif italic">${val}</span>
                </button>
              ))}
            </div>

            <div className="mb-10">
              <label className="block text-[10px] font-mono text-slate-500 mb-3 uppercase tracking-widest italic">Manual Override (Custom Amount)</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-serif italic text-xl">$</span>
                <input
                  type="number"
                  className="w-full pl-12 pr-6 py-5 bg-black border border-slate-800 text-white focus:border-primary outline-none font-serif italic text-2xl transition-all"
                  placeholder="0.00"
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-6 mb-10 flex items-start space-x-4">
              <div className="p-2 bg-primary/10 rounded-full shrink-0">
                <Heart className="text-primary" size={20} />
              </div>
              <p className="text-sm text-slate-300 font-light leading-relaxed italic">
                {impactMessage(amount)}
              </p>
            </div>

            <Button variant="primary" size="lg" className="w-full h-16 group relative overflow-hidden">
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <CreditCard size={20} />
                <span>Process Through Secure Gateway {amount ? `($${amount})` : ''}</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </Button>

            <p className="text-[10px] text-center text-slate-600 mt-6 font-mono uppercase tracking-widest">
              Rebuilt Village is a registered 501(c)(3) tax-exempt organization.
            </p>
          </div>

          {/* Info Side */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Zap className="text-primary" size={20} />
                <h3 className="text-sm font-mono uppercase tracking-widest text-white">The Production Fund</h3>
              </div>
              <p className="text-slate-400 mb-8 leading-relaxed font-light text-lg">
                Film education isn't just about cameras—it's about the infrastructure of imagination. Your support bridges the gap between vision and execution.
              </p>

              <div className="space-y-6">
                {[
                  { label: "Gear & Infrastructure", pct: "40%" },
                  { label: "Equity Scholarships", pct: "30%" },
                  { label: "Artist Mentorships", pct: "20%" },
                  { label: "Operations", pct: "10%" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-2 uppercase tracking-tighter">
                      <span>{item.label}</span>
                      <span>{item.pct}</span>
                    </div>
                    <div className="w-full bg-slate-900 h-[2px]">
                      <div className="bg-primary h-full transition-all duration-1000" style={{ width: item.pct }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 border border-slate-800 bg-black/50">
              <div className="flex items-center space-x-3 mb-6">
                <ShieldCheck className="text-primary" size={20} />
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-white">Transparency Record</h4>
              </div>
              <ul className="space-y-4 font-mono text-[10px] uppercase tracking-widest">
                <li className="flex items-center text-slate-400">
                  <span className="w-1.5 h-1.5 bg-primary mr-3"></span>
                  Official 501(c)(3) Status
                </li>
                <li className="flex items-center text-slate-400">
                  <span className="w-1.5 h-1.5 bg-primary mr-3"></span>
                  Form 990 Public Accountability
                </li>
                <li className="flex items-center text-slate-400">
                  <span className="w-1.5 h-1.5 bg-primary mr-3"></span>
                  100% Student-Driven Resource Allocation
                </li>
              </ul>
            </div>
          </div>

        </div>
      </Section>
    </>
  );
};