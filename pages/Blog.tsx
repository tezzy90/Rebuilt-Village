import React from 'react';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { BlogPost } from '../types';
import { Button } from '../components/Button';

export const Blog: React.FC = () => {
  const posts: BlogPost[] = [
    {
      id: '1',
      title: 'Student Film "Echoes of Ocoee" Wins Regional Award',
      excerpt: 'Our advanced summer cohort took home the Gold Lens award at the Florida Youth Film Festival this weekend.',
      date: 'October 12, 2023',
      author: 'Sarah Jenkins',
      imageUrl: 'https://picsum.photos/seed/award/800/500',
      category: 'News'
    },
    {
      id: '2',
      title: 'New Blackmagic Cameras Have Arrived!',
      excerpt: 'Thanks to a generous grant from the Arts Council, we have upgraded our equipment locker with 5 new cinema cameras.',
      date: 'September 28, 2023',
      author: 'Marcus Thorne',
      imageUrl: 'https://picsum.photos/seed/camera/800/500',
      category: 'Equipment'
    },
    {
      id: '3',
      title: '5 Tips for Lighting on a Budget',
      excerpt: 'You don’t need expensive Arri SkyPanels to make your film look professional. Here are five hacks using hardware store lights.',
      date: 'September 15, 2023',
      author: 'Elena Rodriguez',
      imageUrl: 'https://picsum.photos/seed/light/800/500',
      category: 'Education'
    },
    {
      id: '4',
      title: 'Meet Our New Editing Instructor',
      excerpt: 'We are thrilled to welcome James Wu, a professional editor from Orlando, to our weekend workshop team.',
      date: 'August 30, 2023',
      author: 'Sarah Jenkins',
      imageUrl: 'https://picsum.photos/seed/editor/800/500',
      category: 'Community'
    }
  ];

  return (
    <>
      <Section bg="light" className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">The Clapperboard</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          News, student spotlights, and filmmaking tips from the Rebuilt Village community.
        </p>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card 
              key={post.id}
              image={post.imageUrl}
              title={post.title}
              subtitle={post.category}
              className="flex flex-col h-full"
            >
              <div className="flex-grow">
                <p className="text-xs text-slate-400 mb-3">{post.date} • By {post.author}</p>
                <p className="text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-auto">Read Article</Button>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
};