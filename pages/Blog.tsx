import React, { useState, useEffect } from 'react';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { getPosts, SanityPost } from '../services/sanityService';
import { urlFor } from '../services/sanityClient';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<SanityPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackPosts = [
    {
      _id: '1',
      title: 'Student Film "Echoes of Ocoee" Wins Regional Award',
      publishedAt: '2023-10-12',
      author: 'Sarah Jenkins',
      mainImage: 'https://picsum.photos/seed/award/800/500',
      category: 'News',
      slug: { current: 'award' }
    }
  ];

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        if (data && data.length > 0) {
          setPosts(data);
        }
      } catch (error) {
        console.error('Error fetching Sanity posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Section bg="light" className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">The Clapperboard</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          News, student spotlights, and filmmaking tips from the Rebuilt Village community.
        </p>
      </Section>

      <Section>
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading call sheet...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(posts.length > 0 ? posts : []).map((post) => (
              <Card
                key={post._id}
                image={post.mainImage ? urlFor(post.mainImage).url() : 'https://picsum.photos/seed/rebuilt/800/500'}
                title={post.title}
                subtitle="Story"
                className="flex flex-col h-full"
              >
                <div className="flex-grow">
                  <p className="text-xs text-slate-400 mb-3">
                    {formatDate(post.publishedAt)} • By {post.author}
                  </p>
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    Click to read the full story from the studio.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-auto">Read Article</Button>
              </Card>
            ))}
            {!loading && posts.length === 0 && (
              <div className="col-span-full text-center py-20 border-2 border-dashed border-slate-800 rounded-xl">
                <p className="text-slate-500 font-mono uppercase tracking-widest mb-4 italic text-sm">No stories found in the archives</p>
                <p className="text-slate-400 text-xs italic">Connect Sanity CMS to publish stories.</p>
              </div>
            )}
          </div>
        )}
      </Section>
    </>
  );
};