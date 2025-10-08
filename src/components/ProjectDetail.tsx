import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { loadProjectBySlug } from '../utils/projectLoader';
import { Project } from '../types/project';
import LazyImage from './LazyImage';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
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
    // Scroll to top when going back to home
    window.scrollTo(0, 0);
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
            style={{ borderRadius: '2px' }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Dynamic styling based on background
  const backgroundColor = project.background === 'white' ? 'bg-white text-black' : 'bg-black text-white';
  const textColor = project.background === 'white' ? 'text-black' : 'text-white';
  const secondaryTextColor = project.background === 'white' ? 'text-gray-600' : 'text-gray-300';
  const mutedTextColor = project.background === 'white' ? 'text-gray-500' : 'text-gray-400';
  const borderColor = project.background === 'white' ? 'border-gray-200' : 'border-gray-800';
  const buttonStyle = project.background === 'white' 
    ? 'border-black text-black hover:bg-black hover:text-white' 
    : 'border-white text-white hover:bg-white hover:text-black';
  const primaryButtonStyle = project.background === 'white'
    ? 'bg-black text-white hover:bg-gray-900'
    : 'bg-white text-black hover:bg-gray-100';

  const isZeroSpacing = project.imageSpacing === 'zero';

  return (
    <div className={`min-h-screen ${backgroundColor}`}>
      {/* Header */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom max-w-[1400px] mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className={`flex items-center space-x-2 ${textColor} hover:opacity-70 transition-colors duration-300 mb-12`}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-normal uppercase tracking-wide">Back to Works</span>
          </button>

          {/* Project Header */}
          <div className="mb-16">
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-normal ${textColor} leading-tight uppercase tracking-tight mb-4`}>
              {project.title}
            </h1>
            {project.caseStudy.overview && (
              <p className={`text-lg md:text-xl ${secondaryTextColor} font-light max-w-3xl mb-12`}>
                {project.caseStudy.overview}
              </p>
            )}

            {/* The Challenge + The Vision - Before Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-16 mb-24">
              {project.caseStudy.challenge && (
                <div className={`border-t ${borderColor} pt-6`}>
                  <h3 className={`text-sm font-normal ${mutedTextColor} mb-4 uppercase tracking-wide`}>The Challenge</h3>
                  <p className={`${secondaryTextColor} font-light leading-relaxed`}>{project.caseStudy.challenge}</p>
                </div>
              )}
              {project.caseStudy.solution && (
                <div className={`border-t ${borderColor} pt-6`}>
                  <h3 className={`text-sm font-normal ${mutedTextColor} mb-4 uppercase tracking-wide`}>The Vision</h3>
                  <p className={`${secondaryTextColor} font-light leading-relaxed`}>{project.caseStudy.solution}</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Project Images - Full Width on Mobile, Contained on Desktop */}
      {project.caseStudy.images.length > 0 && (
        <div className={`${isZeroSpacing ? 'space-y-0' : 'space-y-8'}`}>
          <div className="md:container-custom md:max-w-[1400px] md:mx-auto md:px-4">
            {project.caseStudy.images.map((image, index) => (
              <div key={index} className="relative w-full">
                <LazyImage
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-auto object-cover block"
                  width={800}
                  height={600}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* The Approach + The Outcome - After Images */}
      <div className="pt-16 md:pt-24">
        <div className="container-custom max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            {project.caseStudy.approach && (
              <div className={`border-t ${borderColor} pt-6`}>
                <h3 className={`text-sm font-normal ${mutedTextColor} mb-4 uppercase tracking-wide`}>The Approach</h3>
                <p className={`${secondaryTextColor} font-light leading-relaxed`}>{project.caseStudy.approach}</p>
              </div>
            )}
            {project.caseStudy.results && project.caseStudy.results.length > 0 && (
              <div className={`border-t ${borderColor} pt-6`}>
                <h3 className={`text-sm font-normal ${mutedTextColor} mb-4 uppercase tracking-wide`}>The Outcome</h3>
                <ul className="space-y-2">
                  {project.caseStudy.results.map((result, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className={`w-1.5 h-1.5 ${project.background === 'white' ? 'bg-black' : 'bg-white'} rounded-full mt-2 flex-shrink-0`}></div>
                      <span className={`${secondaryTextColor} font-light`}>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className={`mt-16 pt-16 pb-16 md:pb-24 border-t ${borderColor}`}>
            <div className="flex justify-between items-center">
              <button
                onClick={handleBackClick}
                className={`flex items-center space-x-2 px-8 py-4 border transition-all duration-300 uppercase ${buttonStyle}`}
                style={{ borderRadius: '2px' }}
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Works</span>
              </button>
              
              <Link
                to="/email"
                className={`flex items-center space-x-2 px-8 py-4 transition-all duration-300 uppercase ${primaryButtonStyle}`}
                style={{ borderRadius: '2px' }}
              >
                <span>Start Your Project</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;