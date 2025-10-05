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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
                <p className="text-lg md:text-xl text-gray-300 font-light max-w-3xl">
                  {project.description}
                </p>
              </div>
              
              {/* Project Meta */}
              <div className="flex flex-col space-y-4">
                {project.year && (
                  <div className="flex items-center space-x-3 text-sm text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>{project.year}</span>
                  </div>
                )}
                {project.client && (
                  <div className="flex items-center space-x-3 text-sm text-gray-400">
                    <User className="h-4 w-4" />
                    <span>{project.client}</span>
                  </div>
                )}
                {project.category && (
                  <div className="flex items-center space-x-3 text-sm text-gray-400">
                    <Tag className="h-4 w-4" />
                    <span>{project.category}</span>
                  </div>
                )}
                {project.budget && (
                  <div className="flex items-center space-x-3 text-sm text-green-400">
                    <span className="font-semibold">💰</span>
                    <span>{project.budget}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-800 text-gray-300 text-sm font-light rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Project Images */}
          {project.caseStudy.images.length > 0 && (
            <div className="space-y-8">
              {/* Main Image */}
              <div className="relative">
                <img
                  src={project.caseStudy.images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Image Thumbnails */}
              {project.caseStudy.images.length > 1 && (
                <div className="flex space-x-4 overflow-x-auto pb-4">
                  {project.caseStudy.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-24 h-24 rounded-sm overflow-hidden transition-all duration-300 ${
                        currentImageIndex === index
                          ? 'ring-2 ring-white'
                          : 'opacity-60 hover:opacity-80'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Case Study Content */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Overview */}
            {project.caseStudy.overview && (
              <div>
                <h3 className="text-2xl md:text-3xl font-normal text-white mb-6 uppercase tracking-tight">
                  Overview
                </h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  {project.caseStudy.overview}
                </p>
              </div>
            )}

            {/* Challenge */}
            {project.caseStudy.challenge && (
              <div>
                <h3 className="text-2xl md:text-3xl font-normal text-white mb-6 uppercase tracking-tight">
                  Challenge
                </h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  {project.caseStudy.challenge}
                </p>
              </div>
            )}

            {/* Solution */}
            {project.caseStudy.solution && (
              <div>
                <h3 className="text-2xl md:text-3xl font-normal text-white mb-6 uppercase tracking-tight">
                  Solution
                </h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  {project.caseStudy.solution}
                </p>
              </div>
            )}

            {/* Results */}
            {project.caseStudy.results && project.caseStudy.results.length > 0 && (
              <div>
                <h3 className="text-2xl md:text-3xl font-normal text-white mb-6 uppercase tracking-tight">
                  Results
                </h3>
                <ul className="space-y-3">
                  {project.caseStudy.results.map((result, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 font-light">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Testimonial */}
          {project.caseStudy.testimonial && (
            <div className="mt-16 pt-16 border-t border-gray-800">
              <blockquote className="text-center">
                <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-8 max-w-4xl mx-auto">
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
