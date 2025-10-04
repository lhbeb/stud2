import { Project } from '../types/project';

// Define the JSON structure for individual project files
export interface ProjectJSON {
  slug: string;
  title: string;
  year: string;
  category: string;
  client: string;
  tags: string[];
  featured: boolean;
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
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

// Convert JSON project to our Project type
const convertJSONToProject = (jsonProject: ProjectJSON): Project => {
  // Extract images from content
  const images = jsonProject.content
    .filter(item => item.type === 'image')
    .map(item => item.url!)
    .filter(Boolean);

  // Extract text content for case study
  const textContent = jsonProject.content
    .filter(item => item.type === 'text')
    .map(item => item.content!)
    .filter(Boolean);

  // Create case study structure
  const caseStudy = {
    overview: textContent[0] || '',
    challenge: textContent[1] || '',
    solution: textContent[2] || '',
    results: [
      'Increased user engagement',
      'Improved conversion rates',
      'Enhanced brand recognition'
    ],
    images: images,
    testimonial: jsonProject.testimonial
  };

  return {
    id: jsonProject.slug,
    slug: jsonProject.slug,
    title: jsonProject.title,
    category: jsonProject.category,
    client: jsonProject.client,
    year: jsonProject.year,
    description: jsonProject.intro.text,
    shortDescription: jsonProject.intro.text.substring(0, 100) + '...',
    thumbnailImage: jsonProject.intro.photo,
    tags: jsonProject.tags,
    featured: jsonProject.featured,
    caseStudy: caseStudy
  };
};

// Load a single project by slug
export const loadProjectBySlug = async (slug: string): Promise<Project | null> => {
  try {
    const response = await fetch(`/src/projects/${slug}/project.json`);
    if (!response.ok) {
      throw new Error(`Project ${slug} not found`);
    }
    const jsonProject: ProjectJSON = await response.json();
    return convertJSONToProject(jsonProject);
  } catch (error) {
    console.error(`Error loading project ${slug}:`, error);
    return null;
  }
};

// Load all projects
export const loadAllProjects = async (): Promise<Project[]> => {
  try {
    // For now, we'll use a predefined list of project slugs
    // In a real application, you might want to fetch this from an API or file listing
    const projectSlugs = [
      'luxury-hotel-brand-identity',
      'fintech-mobile-app',
      'ecommerce-platform',
      'restaurant-chain-rebrand'
    ];

    const projects = await Promise.all(
      projectSlugs.map(slug => loadProjectBySlug(slug))
    );

    return projects.filter((project): project is Project => project !== null);
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
};

// Load featured projects
export const loadFeaturedProjects = async (): Promise<Project[]> => {
  const allProjects = await loadAllProjects();
  return allProjects.filter(project => project.featured);
};

// Load projects with pagination
export const loadProjectsPaginated = async (
  page: number = 1, 
  limit: number = 4
): Promise<{ projects: Project[], total: number, page: number, limit: number }> => {
  const allProjects = await loadAllProjects();
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProjects = allProjects.slice(startIndex, endIndex);
  
  return {
    projects: paginatedProjects,
    total: allProjects.length,
    page,
    limit
  };
};