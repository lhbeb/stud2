import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, User, Tag } from 'lucide-react';
import { loadProjectBySlug } from '../utils/projectLoader';
import { Project } from '../types/project';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadProjectBySlug(slug)
        .then((projectData) => {
          setProject(projectData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error loading project:', error);
          setIsLoading(false);
        });
    }
  }, [slug]);

  const handleBackClick = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-white mb-4">Project Not Found</h1>
          <p className="text-gray-300 mb-8">The project you're looking for doesn't exist.</p>
          <button
            onClick={handleBackClick}
            className="px-8 py-4 bg-white text-black font-normal hover:bg-gray-100 transition-colors duration-300 uppercase"
            style={{ borderRadius: '7px' }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-300 mb-12"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-normal uppercase tracking-wide">Back to Works</span>
          </button>

          {/* Project Header */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
              <div className="mb-6 md:mb-0">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal text-white leading-tight uppercase tracking-tight mb-4">
                  {project.title}
                </h1>
                {project.caseStudy.overview && (
                  <p className="text-lg md:text-xl text-gray-300 font-light max-w-3xl">
                    {project.caseStudy.overview}
                  </p>
                )}
              </div>
            </div>

            {/* Case Study Summary (above images) */}
            <div className="mt-8">
              <div className="mx-auto" style={{ maxWidth: '1400px' }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                  {project.caseStudy.challenge && (
                    <div className="border-t border-gray-800 pt-6">
                      <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-3">Challenge</h3>
                      <p className="text-gray-300 font-light leading-relaxed">
                        {project.caseStudy.challenge}
                      </p>
                    </div>
                  )}
                  {project.caseStudy.solution && (
                    <div className="border-t border-gray-800 pt-6">
                      <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-3">Solution</h3>
                      <p className="text-gray-300 font-light leading-relaxed">
                        {project.caseStudy.solution}
                      </p>
                    </div>
                  )}
                  {project.caseStudy.results && project.caseStudy.results.length > 0 && (
                    <div className="border-t border-gray-800 pt-6">
                      <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-3">Results</h3>
                      <ul className="space-y-2">
                        {project.caseStudy.results.map((result, index) => (
                          <li key={index} className="text-gray-300 font-light leading-relaxed">
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Project Images - Long scroll stacked */}
          {project.caseStudy.images.length > 0 && (
            <div className="mt-12">
              <div className="mx-auto" style={{ maxWidth: '1400px' }}>
                {project.caseStudy.images.map((image, index) => (
                  <div key={index} className={slug === 'eight-jewelery' ? '' : 'mb-8'}>
                    <img
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-auto object-cover block"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testimonial */}
          {project.caseStudy.testimonial && (
            <div className="mt-16 pt-16 border-t border-gray-800 max-w-3xl">
              <blockquote>
                <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-6">
                  "{project.caseStudy.testimonial.quote}"
                </p>
                <div className="text-gray-400">
                  <p className="font-normal">{project.caseStudy.testimonial.author}</p>
                  <p className="text-sm font-light">{project.caseStudy.testimonial.position}</p>
                </div>
              </blockquote>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-16 pt-16 border-t border-gray-800">
            <div className="flex justify-between items-center">
              <button
                onClick={handleBackClick}
                className="flex items-center space-x-2 px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 uppercase"
                style={{ borderRadius: '7px' }}
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Works</span>
              </button>
              
              <a
                href="#contact"
                className="flex items-center space-x-2 px-8 py-4 bg-white text-black hover:bg-gray-100 transition-all duration-300 uppercase"
                style={{ borderRadius: '7px' }}
              >
                <span>Start Your Project</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
