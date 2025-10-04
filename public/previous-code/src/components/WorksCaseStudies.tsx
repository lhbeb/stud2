import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { getProjects } from '../data/projects';
import { Project } from '../types/project';

const WorksCaseStudies: React.FC = () => {
  const { elementRef, isVisible } = useScrollTrigger();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const projectsPerPage = 4; // 2x2 grid

  useEffect(() => {
    loadProjects(0);
  }, []);

  const loadProjects = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await getProjects(page + 1, projectsPerPage);
      setProjects(response.projects);
      setTotalPages(Math.ceil(response.total / projectsPerPage));
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectClick = (slug: string) => {
    // Navigate to project detail page
    window.location.href = `/project/${slug}`;
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      const nextPageIndex = currentPage + 1;
      setCurrentPage(nextPageIndex);
      loadProjects(nextPageIndex);
      
      // Reset transform after page change
      if (containerRef.current) {
        containerRef.current.style.transform = 'translateX(0px)';
      }
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      const prevPageIndex = currentPage - 1;
      setCurrentPage(prevPageIndex);
      loadProjects(prevPageIndex);
      
      // Reset transform after page change
      if (containerRef.current) {
        containerRef.current.style.transform = 'translateX(0px)';
      }
    }
  };

  // Touch/Mouse handlers for swipe functionality
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    const x = clientX;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Determine swipe direction and trigger page change
    if (containerRef.current) {
      const threshold = 100;
      const distance = startX - (containerRef.current.scrollLeft + scrollLeft);
      
      if (distance > threshold && currentPage < totalPages - 1) {
        nextPage();
      } else if (distance < -threshold && currentPage > 0) {
        prevPage();
      }
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setIsTransitioning(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 0.5; // Reduce sensitivity
    setDragOffset(walk);
    
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${walk}px)`;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsTransitioning(true);
    
    // Determine if we should change page based on drag distance
    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset < 0 && currentPage < totalPages - 1) {
        // Dragged left, go to next page
        nextPage();
      } else if (dragOffset > 0 && currentPage > 0) {
        // Dragged right, go to previous page
        prevPage();
      } else {
        // Reset position if can't change page
        resetPosition();
      }
    } else {
      // Reset position if drag wasn't far enough
      resetPosition();
    }
    
    setDragOffset(0);
  };

  const resetPosition = () => {
    if (containerRef.current) {
      containerRef.current.style.transform = 'translateX(0px)';
    }
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleMouseLeave = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setIsTransitioning(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const walk = (x - startX) * 0.5; // Reduce sensitivity
    setDragOffset(walk);
    
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${walk}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsTransitioning(true);
    
    // Determine if we should change page based on drag distance
    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset < 0 && currentPage < totalPages - 1) {
        // Swiped left, go to next page
        nextPage();
      } else if (dragOffset > 0 && currentPage > 0) {
        // Swiped right, go to previous page
        prevPage();
      } else {
        // Reset position if can't change page
        resetPosition();
      }
    } else {
      // Reset position if swipe wasn't far enough
      resetPosition();
    }
    
    setDragOffset(0);
  };

  return (
    <section 
      id="works" 
      className="py-16 md:py-32 bg-black"
      ref={elementRef}
    >
      <div className="container-custom">
        {/* Section Header with Navigation */}
        <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 sm:gap-0 mb-8 md:mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Title */}
          <div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal text-white leading-tight uppercase tracking-tight">
              Our Works
            </h2>
          </div>
          
          {/* Right side: Pagination Dots and Arrow Navigation */}
          <div className="flex items-center space-x-6 justify-center sm:justify-end">
            {/* Pagination Dots */}
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                   key={i}
                   onClick={() => {
                     setCurrentPage(i);
                     loadProjects(i);
                     
                     // Reset transform after page change
                     if (containerRef.current) {
                       containerRef.current.style.transform = 'translateX(0px)';
                     }
                   }}
                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
                     i === currentPage ? 'bg-white' : 'bg-gray-600'
                   }`}
                 />
              ))}
            </div>
            
            {/* Arrow Navigation */}
            <div className="flex space-x-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`p-2 sm:p-3 rounded-full border transition-all duration-300 ${
                  currentPage === 0 
                    ? 'border-gray-600 text-gray-600 cursor-not-allowed' 
                    : 'border-white text-white hover:bg-white hover:text-black'
                }`}
              >
                <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className={`p-2 sm:p-3 rounded-full border transition-all duration-300 ${
                  currentPage === totalPages - 1 
                    ? 'border-gray-600 text-gray-600 cursor-not-allowed' 
                    : 'border-white text-white hover:bg-white hover:text-black'
                }`}
              >
                <ChevronRight size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div 
          ref={containerRef}
          className={`grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 cursor-grab transition-transform duration-300 ease-out ${
            isDragging ? 'cursor-grabbing' : ''
          } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${
            isTransitioning ? 'transition-transform duration-300 ease-out' : ''
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project.slug)}
              className="group cursor-pointer aspect-[3/4]"
            >
              {/* Full Image Card - 3:4 Aspect Ratio */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={project.thumbnailImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
              </div>

              {/* Project Title Below Image */}
              <div className="mt-6">
                <h3 className="text-lg md:text-xl font-normal text-white uppercase tracking-tight">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No projects found.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default WorksCaseStudies;