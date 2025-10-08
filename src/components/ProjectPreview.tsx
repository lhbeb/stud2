import React, { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { loadProjectBySlug } from '../utils/projectLoader';
import { Project } from '../types/project';
import LazyImage from './LazyImage';

const ProjectPreview: React.FC = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load the Eight Jewelry project
    let isMounted = true;
    
    loadProjectBySlug('eight-jewelery')
      .then((projectData) => {
        if (isMounted) {
          setProject(projectData);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error('Error loading project:', error);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleMoreClick = useCallback(() => {
    navigate('/projects/eight-jewelery');
    // Use requestAnimationFrame for smooth scroll
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, [navigate]);

  if (isLoading) {
    return (
      <section className="bg-black text-white py-24">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Loading project...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <section className="bg-black text-white relative overflow-hidden">
      {/* Container with limited height - 50% of original */}
      <div className="container-custom max-w-[1400px] mx-auto px-4 py-24" style={{ height: '100vh', maxHeight: '1000px' }}>
        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight uppercase tracking-tight mb-4">
            {project.title}
          </h1>
          {project.caseStudy.overview && (
            <p className="text-base md:text-lg text-gray-300 font-light max-w-2xl mb-8">
              {project.caseStudy.overview}
            </p>
          )}

          {/* The Challenge + The Vision - Condensed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 mb-8">
            {project.caseStudy.challenge && (
              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-xs font-normal text-gray-400 mb-2 uppercase tracking-wide">The Challenge</h3>
                <p className="text-sm text-gray-300 font-light leading-relaxed line-clamp-3">{project.caseStudy.challenge}</p>
              </div>
            )}
            {project.caseStudy.solution && (
              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-xs font-normal text-gray-400 mb-2 uppercase tracking-wide">The Vision</h3>
                <p className="text-sm text-gray-300 font-light leading-relaxed line-clamp-3">{project.caseStudy.solution}</p>
              </div>
            )}
          </div>
        </div>

        {/* Project Images - Only first image */}
        {project.caseStudy.images.length > 0 && (
          <div className="mb-8">
            <div className="relative w-full h-48 md:h-64 overflow-hidden">
              <LazyImage
                src={project.caseStudy.images[0]}
                alt={`${project.title} - Preview`}
                className="w-full h-full object-cover block"
                width={800}
                height={400}
              />
            </div>
          </div>
        )}

        {/* Gradient Overlay - More prominent */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/90 to-transparent z-10"></div>
        
        {/* More Button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={handleMoreClick}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-black font-normal hover:bg-gray-100 transition-all duration-300 uppercase tracking-wide group"
            style={{ borderRadius: '2px' }}
          >
            <span>More</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(ProjectPreview);
