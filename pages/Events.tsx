import React from 'react';
import { Section } from '../components/Section';
import { Event } from '../types';
import { Button } from '../components/Button';
import { MapPin, Clock, Calendar as CalendarIcon, Ticket } from 'lucide-react';

export const Events: React.FC = () => {
  const events: Event[] = [
    {
      id: '1',
      title: 'Fall Semester Orientation',
      date: '2023-11-04',
      month: 'NOV',
      day: '04',
      time: '10:00 AM - 12:00 PM',
      location: 'Ocoee Community Center',
      description: 'Mandatory orientation for all incoming Weekend Film Lab students and parents. We will cover the production calendar and gear check-out procedures.',
      type: 'workshop'
    },
    {
      id: '2',
      title: 'Guest Speaker: Director Q&A',
      date: '2023-11-15',
      month: 'NOV',
      day: '15',
      time: '6:30 PM - 8:00 PM',
      location: 'Rebuilt Village Studio A',
      description: 'An exclusive session on directing for social impact. Open to all registered students. Learn how to transition from script to screen.',
      type: 'community'
    },
    {
      id: '3',
      title: 'Community Screening Night',
      date: '2023-12-01',
      month: 'DEC',
      day: '01',
      time: '7:00 PM - 9:30 PM',
      location: 'Ocoee High School Auditorium',
      description: 'Watch the final projects from our Summer Intensive cohort. Popcorn provided! Join us for a night of local cinematic talent.',
      type: 'screening'
    },
    {
      id: '4',
      title: 'Lighting & Grip Masterclass',
      date: '2023-12-09',
      month: 'DEC',
      day: '09',
      time: '9:00 AM - 3:00 PM',
      location: 'Rebuilt Village Studio B',
      description: 'A hands-on workshop covering 3-point lighting, gels, and safe rigging practices. Limited seating available.',
      type: 'workshop'
    }
  ];

  return (
    <>
      <Section bg="black" className="pt-32">
        <div className="text-center">
          <div className="font-mono text-[10px] text-primary mb-4 uppercase tracking-[0.4em] font-bold opacity-60">Call Sheet</div>
          <h1 className="text-5xl md:text-7xl font-serif italic tracking-tight text-white mb-8">Calendar of Events</h1>
          <div className="h-1 w-24 bg-primary/30 mx-auto mb-10"></div>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Join us for workshops, screenings, and community gatherings. Mark your calendar for the next production cycle.
          </p>
        </div>
      </Section>

      <Section bg="black">
        <div className="max-w-4xl mx-auto space-y-12">
          {events.map((event) => (
            <div key={event.id} className="group relative bg-slate-900/40 border border-slate-800 p-8 hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
              <div className="flex flex-col md:flex-row gap-10">

                {/* Date Side */}
                <div className="flex flex-col items-center justify-center shrink-0 w-24">
                  <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-2">{event.month}</span>
                  <span className="text-5xl font-serif italic text-white leading-none">{event.day}</span>
                  <div className="h-px w-10 bg-slate-700 mt-4"></div>
                </div>

                {/* Content Side */}
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <span className={`font-mono text-[9px] px-2 py-0.5 border uppercase tracking-widest ${event.type === 'workshop' ? 'border-primary text-primary' :
                            event.type === 'screening' ? 'border-secondary text-secondary' :
                              'border-slate-500 text-slate-500'
                          }`}>
                          {event.type}
                        </span>
                      </div>
                      <h3 className="text-3xl font-serif italic text-white group-hover:text-primary transition-colors">{event.title}</h3>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0 border-slate-700 hover:border-white">
                      Get Invitations
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-6 mb-6">
                    <div className="flex items-center text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                      <Clock size={14} className="mr-2 text-primary" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                      <MapPin size={14} className="mr-2 text-primary" />
                      {event.location}
                    </div>
                  </div>

                  <p className="text-slate-400 font-light leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                <Ticket size={24} className="text-primary rotate-12" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center border-t border-slate-900 pt-16">
          <div className="max-w-xl mx-auto p-12 bg-slate-900/20 border border-dashed border-slate-800">
            <h4 className="text-white font-serif italic text-2xl mb-6">Host a Masterclass</h4>
            <p className="text-slate-400 text-sm font-light mb-8 leading-relaxed">
              Are you interested in booking a private workshop or screening for your school or organization? Let's discuss your production needs.
            </p>
            <Button variant="secondary" size="lg">Contact Production Office</Button>
          </div>
        </div>
      </Section>
    </>
  );
};