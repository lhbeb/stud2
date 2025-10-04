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
  tags: string[];
  featured: boolean;
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

export interface ProjectsResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
}