export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'BRAND IDENTITY' | 'SOCIAL MEDIA' | 'CAMPAIGN DESIGN' | 'DIGITAL DESIGN' | 'PACKAGING' | 'ADVERTISING';
  year: string;
  heroImage: string;
  thumbnail: string;
  aspectRatio: 'landscape' | 'portrait' | 'square' | 'wide';
  shortDescription: string;
  tools: string[];
  featured: boolean;
  caseStudy: CaseStudyDetails;
}

export interface CaseStudyDetails {
  tagline: string;
  overview: string;
  role: string;
  duration: string;
  deliverables: string[];
  challenge: string;
  approach: string;
  visualDirection: {
    title: string;
    description: string;
    colors: { name: string; hex: string; role: string }[];
    typography: { name: string; style: string; usage: string }[];
  };
  mockups: {
    url: string;
    title: string;
    caption: string;
    type: 'full' | 'split' | 'grid';
  }[];
  impact: {
    metric: string;
    label: string;
    description: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    title: string;
    avatar?: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Contract' | 'Lead' | 'Senior';
  description: string;
  responsibilities: string[];
  skills: string[];
}

export interface ExpertiseCategory {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  tags: string[];
  previewImage: string;
  metrics: string;
}

export interface DesignTool {
  name: string;
  category: 'Vector & Identity' | 'Editorial & Layout' | 'Digital & UI' | 'Motion & Video' | 'Image & Retouching' | '3D & Spatial';
  proficiency: number;
  description: string;
  iconSlug: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  company: string;
  project: string;
  avatar: string;
}

export interface DesignerProfile {
  name: string;
  title: string;
  tagline: string;
  intro: string;
  statement: string;
  location: string;
  email: string;
  phone: string;
  status: string;
  avatarUrl?: string;
  yearsOfExperience: string;
  projectsCompleted: string;
  brandsWorkedWith: string;
  designAwards: string;
  bio: string;
  socials: {
    behance: string;
    dribbble: string;
    linkedin: string;
    instagram: string;
    readcv: string;
  };
}

export type AccentTheme = {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
};
