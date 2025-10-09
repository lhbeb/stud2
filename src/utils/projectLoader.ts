import { Project } from '../types/project';

// Import project JSON files as modules
import chargerCoffeeData from '../projects/charger-coffee/project.json';
import originRoastersData from '../projects/origin-roasters/project.json';
import eightJeweleryData from '../projects/eight-jewelery/project.json';
import dairumCosmeticsData from '../projects/dairum-cosmetics/project.json';
import emondFashionData from '../projects/emond-fashion/project.json';
import binayatRealestateData from '../projects/binayat-realestate/project.json';
import byersChristopherData from '../projects/byers-christopher-allen/project.json';

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
  hidden?: boolean;
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
    approach: textContent[3] || '',
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
    imageSpacing: jsonProject.imageSpacing || 'normal',
    caseStudy: caseStudy
  };
};

// Project data mapping
const projectDataMap: Record<string, ProjectJSON> = {
  'charger-coffee': chargerCoffeeData,
  'origin-roasters': originRoastersData,
  'eight-jewelery': eightJeweleryData,
  'dairum-cosmetics': dairumCosmeticsData,
  'emond-fashion': emondFashionData,
  'binayat-realestate': binayatRealestateData,
  'byers-christopher-allen': byersChristopherData,
};

// Load a single project by slug
export const loadProjectBySlug = async (slug: string): Promise<Project | null> => {
  try {
    const jsonProject = projectDataMap[slug];
    if (!jsonProject) {
      throw new Error(`Project ${slug} not found`);
    }
    return convertJSONToProject(jsonProject);
  } catch (error) {
    console.error(`Error loading project ${slug}:`, error);
    return null;
  }
};

// Load all projects (excluding hidden ones)
export const loadAllProjects = async (): Promise<Project[]> => {
  try {
    const projects = Object.values(projectDataMap)
      .filter(jsonProject => !jsonProject.hidden)
      .map(jsonProject => 
        convertJSONToProject(jsonProject)
      );
    return projects;
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