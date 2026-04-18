// Phase 1 shim. Returns empty data; pages fall back to their hardcoded arrays.
// Phase 2 replaces this with Firestore fetches once FireCMS ships and the
// page-level FALLBACK arrays are migrated to Firestore documents.

import { Event } from '../types';

// ─── Sanity document interfaces (retained for page imports) ───────────────────

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

// ─── Query shims ──────────────────────────────────────────────────────────────

export const getPrograms = async (): Promise<SanityProgram[]> => [];

export const getPosts = async (): Promise<SanityPost[]> => [];

export const getPostBySlug = async (_slug: string): Promise<SanityPost | null> => null;

export const getEvents = async (): Promise<Event[]> => [];

export const getTeamMembers = async (): Promise<SanityTeamMember[]> => [];

export const getBoardMembers = async (): Promise<SanityBoardMember[]> => [];

export const getProgramsFull = async (): Promise<SanityProgramFull[]> => [];
