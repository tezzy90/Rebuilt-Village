import { client } from './sanityClient';
import { Event } from '../types';

// ─── Sanity document interfaces ───────────────────────────────────────────────

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
    excerpt: string;
    category: string;
    author: string;
    mainImage: any;
    publishedAt: string;
    body: any[];
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
    };
}

export interface SanityEvent {
    _id: string;
    title: string;
    date: string;
    dateEnd?: string;
    time: string;
    location: string;
    description: string;
    type: Event['type'];
    featured?: boolean;
    registrationUrl?: string;
    sponsoredBy?: string;
    tags?: string[];
}

export interface SanityTeamMember {
    _id: string;
    name: string;
    role: string;
    bio: string;
    headshot?: any;
    order: number;
    active: boolean;
    socialLinks?: Array<{
        platform: string;
        url: string;
    }>;
}

// ─── Mappers ──────────────────────────────────────────────────────────────────

export function mapSanityEvent(e: SanityEvent): Event {
    const d = new Date(e.date + 'T00:00:00');
    return {
        id: e._id,
        title: e.title,
        date: e.date,
        dateEnd: e.dateEnd,
        day: String(d.getDate()).padStart(2, '0'),
        month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
        year: String(d.getFullYear()),
        time: e.time,
        location: e.location,
        description: e.description,
        type: e.type,
        featured: e.featured ?? false,
        registrationUrl: e.registrationUrl,
        sponsoredBy: e.sponsoredBy,
        tags: e.tags,
    };
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export const getPrograms = async (): Promise<SanityProgram[]> => {
    return await client.fetch(`*[_type == "program"] | order(title asc)`);
};

export const getPosts = async (): Promise<SanityPost[]> => {
    return await client.fetch(
        `*[_type == "post"] | order(publishedAt desc) {
            _id, title, slug, excerpt, category, author, mainImage, publishedAt, seo
        }`
    );
};

export const getPostBySlug = async (slug: string): Promise<SanityPost> => {
    return await client.fetch(
        `*[_type == "post" && slug.current == $slug][0] {
            _id, title, slug, excerpt, category, author, mainImage, publishedAt, body, seo
        }`,
        { slug }
    );
};

export const getEvents = async (): Promise<Event[]> => {
    const raw: SanityEvent[] = await client.fetch(
        `*[_type == "event"] | order(date asc) {
            _id, title, date, dateEnd, time, location, description,
            type, featured, registrationUrl, sponsoredBy, tags
        }`
    );
    return raw.map(mapSanityEvent);
};

export const getTeamMembers = async (): Promise<SanityTeamMember[]> => {
    return await client.fetch(
        `*[_type == "teamMember" && active == true] | order(order asc) {
            _id, name, role, bio, headshot, order, active, socialLinks
        }`
    );
};

export interface SanityBoardMember {
    _id: string;
    name: string;
    role: string;
    bio: string;
    headshot?: any;
    order: number;
    active: boolean;
    linkedIn?: string;
    email?: string;
    committees?: string[];
    termStart?: string;
    termEnd?: string;
}

export interface SanityProgramFull {
    _id: string;
    title: string;
    slug: { current: string };
    shortLabel?: string;
    description: string;
    details?: string;
    category: string;
    ageGroup?: string;
    schedule?: string;
    location?: string;
    cost?: string;
    highlights?: string[];
    enrollmentUrl?: string;
    image?: any;
    partnerInstitution?: string;
    featured: boolean;
    active: boolean;
}

export const getBoardMembers = async (): Promise<SanityBoardMember[]> => {
    return await client.fetch(
        `*[_type == "boardMember" && active == true] | order(order asc) {
            _id, name, role, bio, headshot, order, active,
            linkedIn, email, committees, termStart, termEnd
        }`
    );
};

export const getProgramsFull = async (): Promise<SanityProgramFull[]> => {
    return await client.fetch(
        `*[_type == "program" && active == true] | order(title asc) {
            _id, title, slug, shortLabel, description, details, category,
            ageGroup, schedule, location, cost, highlights,
            enrollmentUrl, image, partnerInstitution, featured, active
        }`
    );
};
