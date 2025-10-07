export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Brand Identity' | 'UI/UX Design' | 'Full-Stack Development' | 'Design Strategy';
  client: string;
  year: string;
  description: string;
  shortDescription: string;
  thumbnailImage: string;
  coverImage: string;
  tags: string[];
  budget: string;
  featured: boolean;
  background: 'black' | 'white';
  caseStudy: {
    overview: string;
    challenge: string;
    solution: string;
    results: string[];
    images: string[];
    testimonial?: {
      quote: string;
      author: string;
      position: string;
    };
  };
}

export interface ProjectJSON {
  thumbnail: string;
  slug: string;
  title: string;
  year: string;
  category: string;
  client: string;
  tags: string[];
  budget: string;
  featured: boolean;
  background?: 'black' | 'white';
  intro: {
    photo: string;
    text: string;
  };
  content: Array<{
    type: 'text' | 'image';
    content?: string;
    url?: string;
    alt?: string;
    caption?: string;
  }>;
  results?: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

export interface ProjectsResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
}