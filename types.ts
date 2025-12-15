export enum View {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  PROGRAMS = 'PROGRAMS',
  GALLERY = 'GALLERY',
  DONATE = 'DONATE',
  STORY_SPARK = 'STORY_SPARK', // AI Feature
  CONTACT = 'CONTACT',
  BLOG = 'BLOG',
  EVENTS = 'EVENTS',
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS',
  BOARD = 'BOARD',
  DOCUMENTS = 'DOCUMENTS',
}

export interface StudentFilm {
  id: string;
  title: string;
  studentName: string;
  grade: string;
  thumbnailUrl: string;
  description: string;
  tags: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface Program {
  title: string;
  description: string;
  ageGroup: string;
  duration: string;
  imageUrl: string;
  features: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl: string;
  category: string;
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO string or formatted date
  day: string;
  month: string;
  time: string;
  location: string;
  description: string;
  type: 'workshop' | 'screening' | 'community';
}
