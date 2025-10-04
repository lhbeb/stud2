import { Project } from '../types/project';

export const projectsData: Project[] = [
  {
    id: '1',
    slug: 'luxury-hotel-brand-identity',
    title: 'Luxury Hotel Brand Identity',
    category: 'Brand Identity',
    client: 'Al-Rashid Hotels',
    year: '2024',
    description: 'Complete brand overhaul for a luxury hotel chain across the Gulf region, including logo design, visual identity, and brand guidelines.',
    shortDescription: 'Luxury hotel chain rebranding across Gulf region',
    thumbnailImage: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067',
    tags: ['Branding', 'Hospitality', 'Luxury'],
    featured: true,
    caseStudy: {
      overview: 'Al-Rashid Hotels approached us to modernize their brand identity while maintaining their heritage and luxury positioning in the competitive Gulf hospitality market.',
      challenge: 'The existing brand felt outdated and failed to communicate the premium experience offered by the hotel chain.',
      solution: 'We developed a sophisticated visual identity that blends traditional Arabic design elements with contemporary luxury aesthetics.',
      results: ['40% increase in brand recognition', '25% boost in direct bookings', 'Successful rollout across 12 properties'],
      images: [
        'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      testimonial: {
        quote: 'StudioEyn transformed our brand beyond our expectations. The new identity perfectly captures our luxury positioning.',
        author: 'Ahmed Al-Rashid',
        position: 'CEO, Al-Rashid Hotels'
      }
    }
  },
  {
    id: '2',
    slug: 'fintech-mobile-app',
    title: 'FinTech Mobile App',
    category: 'UI/UX Design',
    client: 'PayFlow',
    year: '2024',
    description: 'User-centered design for a revolutionary fintech mobile application serving the Middle East market.',
    shortDescription: 'Revolutionary fintech app for Middle East market',
    thumbnailImage: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067',
    tags: ['Mobile', 'FinTech', 'UX/UI'],
    featured: true,
    caseStudy: {
      overview: 'PayFlow needed a mobile app that would simplify financial transactions while ensuring security and compliance with regional regulations.',
      challenge: 'Creating an intuitive interface for complex financial operations while maintaining the highest security standards.',
      solution: 'We designed a clean, accessible interface with biometric authentication and smart transaction categorization.',
      results: ['500K+ downloads in first quarter', '4.8/5 app store rating', '60% reduction in transaction time'],
      images: [
        'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ]
    }
  },
  {
    id: '3',
    slug: 'ecommerce-platform',
    title: 'E-commerce Platform',
    category: 'Full-Stack Development',
    client: 'Souq Al-Khaleej',
    year: '2023',
    description: 'Custom e-commerce platform built for a major retail brand with advanced inventory management and analytics.',
    shortDescription: 'Custom e-commerce platform with advanced analytics',
    thumbnailImage: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067',
    tags: ['E-commerce', 'Development', 'Analytics'],
    featured: true,
    caseStudy: {
      overview: 'Souq Al-Khaleej required a scalable e-commerce solution to handle their growing online presence across multiple Gulf countries.',
      challenge: 'Building a platform that could handle high traffic volumes while providing real-time inventory management across multiple warehouses.',
      solution: 'We developed a microservices-based architecture with advanced caching and real-time synchronization capabilities.',
      results: ['300% increase in online sales', '99.9% uptime achieved', 'Real-time inventory across 15 locations'],
      images: [
        'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ]
    }
  },
  {
    id: '4',
    slug: 'healthcare-digital-transformation',
    title: 'Healthcare Digital Transformation',
    category: 'Design Strategy',
    client: 'MedCare Group',
    year: '2023',
    description: 'Comprehensive digital strategy and platform design for a leading healthcare provider in the UAE.',
    shortDescription: 'Digital transformation for leading UAE healthcare provider',
    thumbnailImage: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067',
    tags: ['Healthcare', 'Strategy', 'Digital'],
    featured: true,
    caseStudy: {
      overview: 'MedCare Group needed to digitize their patient experience while maintaining the personal touch of healthcare.',
      challenge: 'Balancing digital efficiency with the human aspect of healthcare delivery.',
      solution: 'We created a comprehensive digital ecosystem including patient portals, telemedicine capabilities, and staff management tools.',
      results: ['50% reduction in wait times', '85% patient satisfaction increase', 'Streamlined operations across 20 clinics'],
      images: [
        'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ]
    }
  },
  {
    id: '5',
    slug: 'real-estate-portal',
    title: 'Real Estate Portal',
    category: 'UI/UX Design',
    client: 'Emirates Properties',
    year: '2023',
    description: 'Modern property search platform with advanced filtering and virtual tour integration.',
    shortDescription: 'Modern property search platform with virtual tours',
    thumbnailImage: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067',
    tags: ['Real Estate', 'Portal', 'Virtual Tours'],
    featured: false,
    caseStudy: {
      overview: 'Emirates Properties wanted to revolutionize property search with immersive virtual experiences.',
      challenge: 'Creating an engaging property discovery experience that works across all devices.',
      solution: 'We built an intuitive search platform with 360° virtual tours and AR visualization features.',
      results: ['200% increase in property inquiries', '75% longer session duration', 'Award-winning user experience'],
      images: [
        'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ]
    }
  },
  {
    id: '6',
    slug: 'restaurant-chain-rebrand',
    title: 'Restaurant Chain Rebrand',
    category: 'Brand Identity',
    client: 'Taste of Arabia',
    year: '2022',
    description: 'Complete rebranding for a popular restaurant chain, including new visual identity and packaging design.',
    shortDescription: 'Complete rebranding for popular restaurant chain',
    thumbnailImage: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067',
    tags: ['Food & Beverage', 'Packaging', 'Rebrand'],
    featured: false,
    caseStudy: {
      overview: 'Taste of Arabia needed a fresh brand identity to compete in the evolving food delivery market.',
      challenge: 'Modernizing the brand while preserving the authentic Middle Eastern heritage.',
      solution: 'We created a vibrant visual identity with contemporary Arabic typography and appetizing food photography.',
      results: ['35% increase in brand recognition', '50% boost in delivery orders', 'Successful expansion to 5 new cities'],
      images: [
        'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ]
    }
  },
  {
    id: '7',
    slug: 'banking-app-redesign',
    title: 'Banking App Redesign',
    category: 'UI/UX Design',
    client: 'Gulf National Bank',
    year: '2024',
    description: 'Complete redesign of mobile banking application with focus on accessibility and user experience.',
    shortDescription: 'Mobile banking app redesign with accessibility focus',
    thumbnailImage: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067',
    tags: ['Banking', 'Mobile', 'Accessibility'],
    featured: false,
    caseStudy: {
      overview: 'Gulf National Bank needed to modernize their mobile banking experience to compete with fintech startups.',
      challenge: 'Simplifying complex banking operations while ensuring security and regulatory compliance.',
      solution: 'We redesigned the entire user journey with intuitive navigation and enhanced security features.',
      results: ['70% increase in mobile transactions', '4.9/5 app store rating', 'Reduced customer service calls by 40%'],
      images: [
        'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/5849592/pexels-photo-5849592.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ]
    }
  },
  {
    id: '8',
    slug: 'logistics-platform',
    title: 'Logistics Management Platform',
    category: 'Full-Stack Development',
    client: 'Desert Express',
    year: '2023',
    description: 'Comprehensive logistics management system for regional shipping and delivery operations.',
    shortDescription: 'Comprehensive logistics management system',
    thumbnailImage: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067',
    tags: ['Logistics', 'Management', 'Tracking'],
    featured: false,
    caseStudy: {
      overview: 'Desert Express required a unified platform to manage their growing logistics operations across the Gulf region.',
      challenge: 'Coordinating complex delivery routes while providing real-time tracking to customers.',
      solution: 'We built a comprehensive platform with route optimization, real-time tracking, and automated notifications.',
      results: ['30% reduction in delivery times', '95% on-time delivery rate', 'Expanded to 3 new countries'],
      images: [
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ]
    }
  },
  {
    id: '9',
    slug: 'education-platform',
    title: 'Online Education Platform',
    category: 'Full-Stack Development',
    client: 'Knowledge Hub',
    year: '2024',
    description: 'Interactive online learning platform with live streaming and assessment capabilities.',
    shortDescription: 'Interactive online learning platform',
    thumbnailImage: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067',
    tags: ['Education', 'E-learning', 'Interactive'],
    featured: false,
    caseStudy: {
      overview: 'Knowledge Hub wanted to create an engaging online education platform for Middle Eastern students.',
      challenge: 'Building an interactive learning environment that rivals in-person education.',
      solution: 'We developed a feature-rich platform with live streaming, interactive whiteboards, and AI-powered assessments.',
      results: ['10,000+ active students', '92% course completion rate', 'Partnerships with 50+ institutions'],
      images: [
        'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ]
    }
  },
  {
    id: '10',
    slug: 'fashion-brand-identity',
    title: 'Fashion Brand Identity',
    category: 'Brand Identity',
    client: 'Noor Couture',
    year: '2023',
    description: 'Elegant brand identity for luxury fashion house specializing in contemporary Middle Eastern designs.',
    shortDescription: 'Luxury fashion house brand identity',
    thumbnailImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067',
    tags: ['Fashion', 'Luxury', 'Contemporary'],
    featured: false,
    caseStudy: {
      overview: 'Noor Couture needed a sophisticated brand identity that would appeal to modern Middle Eastern fashion consumers.',
      challenge: 'Balancing traditional elegance with contemporary fashion trends.',
      solution: 'We created a refined visual identity with elegant typography and a sophisticated color palette.',
      results: ['Featured in Vogue Arabia', '150% increase in online sales', 'Expansion to international markets'],
      images: [
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ]
    }
  }
];

// API simulation functions
export const getProjects = (page: number = 1, limit: number = 4): Promise<{ projects: Project[], total: number, page: number, limit: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProjects = projectsData.slice(startIndex, endIndex);
      
      resolve({
        projects: paginatedProjects,
        total: projectsData.length,
        page,
        limit
      });
    }, 300); // Simulate API delay
  });
};

export const getProjectBySlug = (slug: string): Promise<Project | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const project = projectsData.find(p => p.slug === slug);
      resolve(project || null);
    }, 200);
  });
};

export const getFeaturedProjects = (): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const featured = projectsData.filter(p => p.featured);
      resolve(featured);
    }, 200);
  });
};