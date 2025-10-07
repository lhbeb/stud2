import { Project } from '../types/project';

// Define the JSON structure for individual project files
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

// Convert JSON project to our Project type
const convertJSONToProject = (jsonProject: ProjectJSON): Project => {
  // Extract images from content
  const images = jsonProject.content
    ? jsonProject.content
        .filter(item => item.type === 'image' && item.url)
        .map(item => item.url!)
        .filter(Boolean)
    : [];

  // Extract text content for case study
  const textContent = jsonProject.content
    ? jsonProject.content
        .filter(item => item.type === 'text' && item.content)
        .map(item => item.content!)
        .filter(Boolean)
    : [];

  // Create case study structure with fallbacks
  const caseStudy = {
    overview: textContent[0] || '',
    challenge: textContent[1] || '',
    solution: textContent[2] || '',
    results: jsonProject.results || [
      'Increased user engagement',
      'Improved conversion rates',
      'Enhanced brand recognition'
    ],
    images: images,
    testimonial: jsonProject.testimonial || undefined
  };

  return {
    id: jsonProject.slug,
    slug: jsonProject.slug,
    title: jsonProject.title || 'Untitled Project',
    category: jsonProject.category || 'Design Strategy',
    client: jsonProject.client || 'Unknown Client',
    year: jsonProject.year || new Date().getFullYear().toString(),
    description: jsonProject.intro?.text || '',
    shortDescription: jsonProject.intro?.text ? jsonProject.intro.text.substring(0, 100) + '...' : '',
    thumbnailImage: jsonProject.thumbnail || jsonProject.intro?.photo || '',
    coverImage: jsonProject.intro?.photo || jsonProject.thumbnail || '',
    tags: jsonProject.tags || [],
    budget: jsonProject.budget || '',
    featured: jsonProject.featured || false,
    background: jsonProject.background || 'black',
    caseStudy: caseStudy
  };
};

// Load a single project by slug
export const loadProjectBySlug = async (slug: string): Promise<Project | null> => {
  try {
    const response = await fetch(`/projects/${slug}/project.json`);
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

// Load all projects by dynamically discovering them
export const loadAllProjects = async (): Promise<Project[]> => {
  try {
    // Try to load common project slugs and filter out failures
    // This approach allows for dynamic project discovery
    const potentialSlugs = [
      'origin-roasters',
      'eight-jewelery',
      'charger-coffee',
      'dairum-cosmetics',
      'emond-fashion',
      'binayat-realestate',
      'restaurant-chain-rebrand',
      'luxury-hotel-brand-identity',
      'fintech-mobile-app',
      'ecommerce-platform',
      'healthcare-digital-transformation',
      'fashion-ecommerce-platform'
    ];

    const projectPromises = potentialSlugs.map(async (slug) => {
      try {
        const project = await loadProjectBySlug(slug);
        return project;
      } catch (error) {
        // Project doesn't exist, return null
        return null;
      }
    });

    const projects = await Promise.all(projectPromises);
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