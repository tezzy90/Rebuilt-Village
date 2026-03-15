import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <Section bg="black" className="pt-32 pb-16 text-center">
        <p className="font-mono text-[10px] text-primary mb-4 uppercase tracking-[0.4em] font-bold opacity-60">
          From the Studio
        </p>
        <h1 className="text-5xl md:text-7xl font-serif italic tracking-tight text-text mb-8 leading-none">The Clapperboard</h1>
        <div className="h-1 w-24 bg-primary/30 mx-auto mb-10" />
        <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed font-light">
          News, student spotlights, and filmmaking tips from the Rebuilt Village community.
        </p>
      </Section>

      <Section bg="black">
        {loading ? (
          <div className="text-center py-20 text-text-muted">Loading call sheet...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(posts.length > 0 ? posts : []).map((post) => (
              <Card
                key={post._id}
                image={post.mainImage ? urlFor(post.mainImage).url() : '/assets/brand/hero-students.png'}
                title={post.title}
                subtitle="Story"
                className="flex flex-col h-full"
              >
                <div className="flex-grow">
                  <p className="text-xs text-text-muted mb-3">
                    {formatDate(post.publishedAt)} • By {post.author}
                  </p>
                  <p className="text-text-muted mb-4 line-clamp-3">
                    Click to read the full story from the studio.
                  </p>
                </div>
                <Link to={`/blog/${post.slug.current}`} className="w-full mt-auto">
                  <Button variant="outline" size="sm" className="w-full">Read Article</Button>
                </Link>
              </Card>
            ))}
            {!loading && posts.length === 0 && (
              <div className="col-span-full text-center py-20 border-2 border-dashed border-border rounded-xl">
                <p className="text-text-muted font-mono uppercase tracking-widest mb-4 italic text-sm">No stories found in the archives</p>
                <p className="text-text-muted/60 text-xs italic">Connect Sanity CMS to publish stories.</p>
              </div>
            )}
          </div>
        )}
      </Section>
    </>
  );
};