import React from 'react';
import { Section } from '../components/Section';
import { Card } from '../components/Card';

export const About: React.FC = () => {
  return (
    <>
      <Section bg="light" className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Founded in 2023 in Ocoee, Florida, Rebuilt Village began with a simple observation: Talent is universal, but opportunity is not.
        </p>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <img
            src="/assets/brand/team-action.png"
            alt="Founder teaching students"
            className="rounded-lg shadow-xl grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div>
            <h2 className="text-3xl font-serif italic mb-6">The Mission</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We empower middle and high school students in the Greater Orlando area to tell their own stories through the art of filmmaking. We believe that media literacy is 21st-century literacy.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              By providing professional-grade equipment, industry mentorship, and a safe, collaborative environment, we help students build confidence, technical skills, and a portfolio that opens doors to college and careers.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-serif italic mb-12 text-center">Leadership & Board</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              title={i === 1 ? "Sarah Jenkins" : i === 2 ? "Marcus Thorne" : "Elena Rodriguez"}
              subtitle={i === 1 ? "Executive Director" : i === 2 ? "Director of Education" : "Board Chair"}
              image={i === 1 ? "/assets/brand/sarah.png" : i === 2 ? "/assets/brand/marcus.png" : "/assets/brand/hero-students.png"}
            >
              <p className="text-sm">
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

      <Section bg="light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Financial Transparency</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <p className="mb-6 text-slate-600">
              Rebuilt Village is committed to the highest standards of financial stewardship.
              Our Form 990s and Annual Reports are available for public review.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="#" className="flex items-center p-4 border border-slate-200 rounded hover:bg-slate-50 text-primary font-medium">
                <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                2023 Form 990 (PDF)
              </a>
              <a href="#" className="flex items-center p-4 border border-slate-200 rounded hover:bg-slate-50 text-primary font-medium">
                <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                IRS Determination Letter
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};