import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PieChart, Zap, Users, Shield, TrendingUp } from 'lucide-react';

interface ImpactMetric {
  label: string;
  value: string;
  subtext: string;
  icon: React.ElementType;
}

const METRICS: ImpactMetric[] = [
  {
    label: 'Direct Program Flow',
    value: '85%',
    subtext: 'Efficiency Ratio',
    icon: TrendingUp
  },
  {
    label: 'Youth Reached',
    value: '450+',
    subtext: 'Scholarships Awarded',
    icon: Users
  },
  {
    label: 'Stories Preserved',
    value: '12',
    subtext: 'Local Narratives',
    icon: Zap
  },
  {
    label: 'Verified Status',
    value: '501(c)(3)',
    subtext: 'Tax Exempt',
    icon: Shield
  }
];

export const ImpactDashboard: React.FC = () => {
  const prefersReduced = useReducedMotion();
  return (
    <div className="bg-surface border border-border overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
      
      <div className="relative p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <p className="font-mono text-[10px] text-primary uppercase tracking-[0.4em] mb-4 font-bold opacity-60">
              Operational Transparency
            </p>
            <h2 className="text-4xl md:text-5xl font-serif italic text-text tracking-tight">
              Radical <em className="text-primary not-italic">Impact.</em>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-border group-hover:w-20 transition-all duration-700" />
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Live Updates</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReduced ? 0 : idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <Icon size={14} className="text-primary opacity-60" />
                  <span className="font-mono text-[9px] text-text-muted uppercase tracking-[0.2em]">
                    {metric.label}
                  </span>
                </div>
                <div className="text-4xl md:text-5xl font-bold font-display tracking-tighter text-text">
                  {metric.value}
                </div>
                <p className="font-mono text-[10px] text-text-muted italic opacity-40 uppercase tracking-widest">
                  {metric.subtext}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-border grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-xl font-serif italic text-text mb-4 leading-snug">
              Every dollar is mapped to a frame of student work.
            </h3>
            <p className="text-sm text-text-muted leading-relaxed font-light">
              We operate with zero-waste principles. Our administrative overhead is covered by separate corporate grants, 
              ensuring your community donations go directly to gear, labs, and mentorship.
            </p>
          </div>
          <div className="bg-background/40 border border-border p-6 relative">
             <div className="flex items-center justify-between mb-4">
               <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Funding Allocation</span>
               <PieChart size={16} className="text-primary opacity-40" />
             </div>
             <div className="space-y-4">
                {[
                  { label: 'Student Gear & Labs', pct: '60%', color: 'bg-primary' },
                  { label: 'Professional Mentorship', pct: '25%', color: 'bg-primary/60' },
                  { label: 'Community Screenings', pct: '15%', color: 'bg-primary/30' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-[11px] font-mono text-text-muted uppercase tracking-widest mb-2">
                      <span>{item.label}</span>
                      <span>{item.pct}</span>
                    </div>
                    <div className="h-[2px] bg-border overflow-hidden">
                      <motion.div
                        initial={{ width: prefersReduced ? item.pct : 0 }}
                        whileInView={{ width: item.pct }}
                        transition={{ duration: prefersReduced ? 0 : 1, ease: "easeOut" }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
