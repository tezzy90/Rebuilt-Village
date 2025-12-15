import React, { useState } from 'react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { CheckCircle, CreditCard, Heart } from 'lucide-react';

export const Donate: React.FC = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('monthly');

  const presetAmounts = [25, 50, 100, 250];

  const impactMessage = (amt: number | null) => {
    if (!amt) return "Support film education in Ocoee.";
    if (amt < 50) return "Provides SD cards and cables for one film crew.";
    if (amt < 100) return "Funds editing software license for one student for a semester.";
    if (amt < 250) return "Maintains a camera kit for one year.";
    return "Funds a full scholarship for our Summer Intensive.";
  };

  return (
    <>
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Invest in Creativity</h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Your tax-deductible donation empowers the next generation of storytellers in Central Florida.
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          
          {/* Donation Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Select Donation Amount</h2>
            
            <div className="flex bg-slate-100 p-1 rounded-lg mb-8">
              <button 
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${frequency === 'once' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                onClick={() => setFrequency('once')}
              >
                Give Once
              </button>
              <button 
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${frequency === 'monthly' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                onClick={() => setFrequency('monthly')}
              >
                Monthly
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {presetAmounts.map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`py-4 px-6 rounded-lg border-2 font-bold text-lg transition-all ${
                    amount === val 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>

            <div className="mb-8">
               <label className="block text-sm font-medium text-slate-700 mb-2">Custom Amount</label>
               <div className="relative">
                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                 <input 
                  type="number" 
                  className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Other amount"
                  onChange={(e) => setAmount(Number(e.target.value))}
                 />
               </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-8 flex items-start">
              <Heart className="text-secondary shrink-0 mr-3 mt-1" size={20} />
              <p className="text-sm text-orange-800 font-medium">
                {impactMessage(amount)}
              </p>
            </div>

            <Button size="lg" className="w-full flex items-center justify-center space-x-2">
              <CreditCard size={20} />
              <span>Donate {amount ? `$${amount}` : ''} via Stripe</span>
            </Button>
            
            <p className="text-xs text-center text-slate-400 mt-4">
              Secure payment processing. Rebuilt Village is a registered 501(c)(3).
            </p>
          </div>

          {/* Info Side */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Give?</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Film education is expensive. Cameras, computers, and software are often out of reach for public school programs. Rebuilt Village bridges this gap, ensuring that zip code doesn't determine creative potential.
            </p>

            <h4 className="text-lg font-bold text-slate-900 mb-4">Where your money goes</h4>
            <div className="space-y-4">
              {[
                { label: "Equipment Maintenance & Upgrades", pct: "40%" },
                { label: "Student Scholarships", pct: "30%" },
                { label: "Teaching Artist Stipends", pct: "20%" },
                { label: "Operations & Insurance", pct: "10%" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm font-medium text-slate-700 mb-1">
                    <span>{item.label}</span>
                    <span>{item.pct}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: item.pct }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2">Transparency</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2"/> EIN: 12-3456789</li>
                <li className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2"/> 501(c)(3) Tax-Exempt Status</li>
                <li className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2"/> GuideStar Bronze Seal of Transparency</li>
              </ul>
            </div>
          </div>

        </div>
      </Section>
    </>
  );
};