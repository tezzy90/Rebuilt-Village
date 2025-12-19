import { client } from './sanityClient';

export interface SanityProgram {
    _id: string;
    title: string;
    description: string;
    image: any;
    category: string;
    featured: boolean;
}

export interface SanityPost {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage: any;
    publishedAt: string;
    body: any[];
    author: string;
}

export const getPrograms = async (): Promise<SanityProgram[]> => {
    return await client.fetch(`*[_type == "program"] | order(title asc)`);
};

export const getPosts = async (): Promise<SanityPost[]> => {
    return await client.fetch(`*[_type == "post"] | order(publishedAt desc)`);
};

export const getPostBySlug = async (slug: string): Promise<SanityPost> => {
    return await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
};
