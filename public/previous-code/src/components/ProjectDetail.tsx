import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag, User } from 'lucide-react';
import { getProjectBySlug } from '../data/projects';
import { Project } from '../types/project';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { elementRef, isVisible } = useScrollTrigger();
  const divRef = elementRef as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    if (slug) {
      loadProject(slug);
    }
  }, [slug]);

  const loadProject = async (projectSlug: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const projectData = await getProjectBySlug(projectSlug);
      if (projectData) {
        setProject(projectData);
      } else {
        setError('Project not found');
      }
    } catch (err) {
      setError('Error loading project');
      console.error('Error loading project:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/#works');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">{error || 'Project not found'}</h1>
          <button
            onClick={handleBackClick}
            className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Back to Works
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container-custom py-4">
          <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Back to Works</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Project Info */}
            <div ref={divRef} className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4">
                  {project.category}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-300 font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Project Meta */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="flex items-center space-x-2 text-gray-400 mb-2">
                    <User size={16} />
                    <span className="text-sm">Client</span>
                  </div>
                  <p className="text-white font-medium">{project.client}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-gray-400 mb-2">
                    <Calendar size={16} />
                    <span className="text-sm">Year</span>
                  </div>
                  <p className="text-white font-medium">{project.year}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={project.thumbnailImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Overview */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-normal mb-8">Overview</h2>
              <p className="text-lg text-gray-300 font-light leading-relaxed">
                {project.caseStudy.overview}
              </p>
            </div>

            {/* Challenge */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-normal mb-8">Challenge</h2>
              <p className="text-lg text-gray-300 font-light leading-relaxed">
                {project.caseStudy.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-normal mb-8">Solution</h2>
              <p className="text-lg text-gray-300 font-light leading-relaxed">
                {project.caseStudy.solution}
              </p>
            </div>

            {/* Images */}
            {project.caseStudy.images.length > 0 && (
              <div className="mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.caseStudy.images.map((image, index) => (
                    <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-normal mb-8">Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.caseStudy.results.map((result, index) => (
                  <div key={index} className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-white font-medium">{result}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            {project.caseStudy.testimonial && (
              <div className="bg-gray-900 p-8 md:p-12 rounded-lg">
                <blockquote className="text-xl md:text-2xl font-light text-white mb-6 leading-relaxed">
                  "{project.caseStudy.testimonial.quote}"
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-white font-medium">{project.caseStudy.testimonial.author}</p>
                    <p className="text-gray-400 text-sm">{project.caseStudy.testimonial.position}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 border-t border-gray-800">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-normal mb-6">
              Ready to start your project?
            </h2>
            <p className="text-lg text-gray-300 font-light mb-8 max-w-2xl mx-auto">
              Let's discuss how we can bring your vision to life with strategic design and development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBackClick}
                className="px-8 py-4 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors duration-200"
              >
                View More Projects
              </button>
              <a
                href="#contact"
                className="px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;