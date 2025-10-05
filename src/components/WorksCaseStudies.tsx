import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { loadAllProjects } from '../utils/projectLoader';
import { Project } from '../types/project';

const WorksCaseStudies: React.FC = () => {
  const { elementRef, isVisible } = useScrollTrigger();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const projectsPerPage = 6; // 2x3 grid on desktop, 1x6 on mobile

  useEffect(() => {
    loadProjects(0);
  }, []);

  const loadProjects = async (page: number) => {
    setIsLoading(true);
    setIsTransitioning(true);
    
    try {
      const allProjects = await loadAllProjects();
      const startIndex = page * projectsPerPage;
      const endIndex = startIndex + projectsPerPage;
      const paginatedProjects = allProjects.slice(startIndex, endIndex);
      
      setProjects(paginatedProjects);
      setTotalPages(Math.ceil(allProjects.length / projectsPerPage));
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
      // Delay transition end to allow smooth animation
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const handleProjectClick = (slug: string) => {
    navigate(`/projects/${slug}`);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      loadProjects(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      loadProjects(currentPage - 1);
    }
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-black">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-gray-300">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={elementRef}
      className="py-24 bg-black overflow-hidden"
    >
      <div className="container-custom">
        {/* Header */}
        <div className={`text-left mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-8 uppercase tracking-tight">
            OUR WORKS
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="relative">
          <div 
            ref={containerRef}
            className={`transition-all duration-500 ${
              isTransitioning ? 'opacity-50' : 'opacity-100'
            }`}
          >
            {/* Desktop: 2x3 Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group cursor-pointer transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    transitionDelay: `${200 + index * 100}ms`
                  }}
                  onClick={() => handleProjectClick(project.slug)}
                >
                  {/* Project Image */}
                  <div className="relative aspect-[3/4] overflow-hidden mb-4">
                    <img
                      src={project.thumbnailImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      draggable={false}
                    />
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                  </div>
                  
                  {/* Project Title */}
                  <h3 className="text-sm font-normal text-white uppercase tracking-wide group-hover:text-gray-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Mobile: 1x6 Grid */}
            <div className="md:hidden space-y-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group cursor-pointer transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    transitionDelay: `${200 + index * 100}ms`
                  }}
                  onClick={() => handleProjectClick(project.slug)}
                >
                  {/* Project Image */}
                  <div className="relative aspect-[3/4] overflow-hidden mb-4">
                    <img
                      src={project.thumbnailImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      draggable={false}
                    />
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                  </div>
                  
                  {/* Project Title */}
                  <h3 className="text-sm font-normal text-white uppercase tracking-wide group-hover:text-gray-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {totalPages > 1 && (
            <div className={`flex justify-center items-center mt-16 space-x-6 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`p-3 transition-all duration-300 ${
                  currentPage === 0
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Page indicators */}
              <div className="flex space-x-3">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => loadProjects(i)}
                    className={`w-2 h-2 transition-all duration-300 ${
                      i === currentPage ? 'bg-white' : 'bg-gray-600 hover:bg-gray-400'
                    }`}
                    style={{ borderRadius: '50%' }}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className={`p-3 transition-all duration-300 ${
                  currentPage === totalPages - 1
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorksCaseStudies;