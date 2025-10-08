import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Mail } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="container-custom text-center">
        <div className="max-w-4xl mx-auto px-4">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-normal text-white leading-none tracking-tight opacity-90">
              404
            </h1>
          </div>

          {/* Main Message */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-white mb-6 uppercase tracking-tight">
              Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={handleBackClick}
              className="flex items-center space-x-3 px-8 py-4 bg-white text-black font-normal hover:bg-gray-100 transition-all duration-300 uppercase tracking-wide group"
              style={{ borderRadius: '2px' }}
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Home</span>
            </button>
            
            <a
              href="/email"
              className="flex items-center space-x-3 px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-wide group"
              style={{ borderRadius: '2px' }}
            >
              <Mail className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Contact Us</span>
            </a>
          </div>

          {/* Additional Help */}
          <div className="border-t border-gray-800 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <h3 className="text-lg font-normal text-white uppercase tracking-wide">
                  Explore Our Work
                </h3>
                <p className="text-gray-400 font-light text-sm">
                  Discover our latest projects and case studies
                </p>
                <button
                  onClick={() => navigate('/#work')}
                  className="text-white hover:text-gray-300 transition-colors duration-300 text-sm font-light underline"
                >
                  View Portfolio
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-normal text-white uppercase tracking-wide">
                  Get In Touch
                </h3>
                <p className="text-gray-400 font-light text-sm">
                  Ready to start your next project?
                </p>
                <a
                  href="/email"
                  className="text-white hover:text-gray-300 transition-colors duration-300 text-sm font-light underline"
                >
                  Send Message
                </a>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-normal text-white uppercase tracking-wide">
                  Learn More
                </h3>
                <p className="text-gray-400 font-light text-sm">
                  About our process and team
                </p>
                <button
                  onClick={() => navigate('/about')}
                  className="text-white hover:text-gray-300 transition-colors duration-300 text-sm font-light underline"
                >
                  About Us
                </button>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <p className="text-gray-500 font-light text-sm">
              If you believe this is an error, please{' '}
              <a 
                href="mailto:contact@studioeyn.com" 
                className="text-white hover:text-gray-300 transition-colors duration-300 underline"
              >
                contact us
              </a>
              {' '}and we'll help you find what you're looking for.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
