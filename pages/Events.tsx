import React from 'react';
import { Section } from '../components/Section';
import { Event } from '../types';
import { Button } from '../components/Button';
import { MapPin, Clock, Calendar as CalendarIcon } from 'lucide-react';

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
      description: 'Mandatory orientation for all incoming Weekend Film Lab students and parents.',
      type: 'workshop'
    },
    {
      id: '2',
      title: 'Guest Speaker: Director Ava DuVernay (Virtual)',
      date: '2023-11-15',
      month: 'NOV',
      day: '15',
      time: '6:30 PM - 8:00 PM',
      location: 'Rebuilt Village Studio A',
      description: 'An exclusive Zoom Q&A session on directing for social impact. Open to all registered students.',
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
      description: 'Watch the final projects from our Summer Intensive cohort. Popcorn provided! Tickets are $5 suggested donation.',
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
      description: 'A hands-on workshop covering 3-point lighting, gels, and safe rigging practices.',
      type: 'workshop'
    }
  ];

  return (
    <>
      <Section bg="light" className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Calendar of Events</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Join us for workshops, screenings, and community gatherings.
        </p>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto space-y-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
              
              {/* Date Column */}
              <div className="bg-slate-50 md:w-32 flex flex-row md:flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-slate-200">
                <span className="text-primary font-bold tracking-widest uppercase text-sm md:mb-1">{event.month}</span>
                <span className="text-3xl md:text-4xl font-bold text-slate-900 ml-2 md:ml-0">{event.day}</span>
              </div>

              {/* Content Column */}
              <div className="p-6 flex-grow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-2 ${
                      event.type === 'workshop' ? 'bg-blue-100 text-blue-700' :
                      event.type === 'screening' ? 'bg-secondary/10 text-secondary' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {event.type.toUpperCase()}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{event.title}</h3>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4 md:mt-0 shrink-0">
                    Register / RSVP
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-600 mb-4">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-primary" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-primary" />
                    {event.location}
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-4">Looking to book a private workshop for your school?</p>
          <Button variant="primary">Contact Education Director</Button>
        </div>
      </Section>
    </>
  );
};