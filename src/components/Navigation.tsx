import React, { useState, useEffect } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      
      // If we're not on the home page, navigate to home page with hash
      if (location.pathname !== '/') {
        window.location.href = `/${href}`;
        return;
      }
      
      // If we're on the home page, scroll to the section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out shadow-sm ${
        isScrolled 
          ? 'bg-black' 
          : 'bg-white'
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-26 md:h-24 lg:h-26">
            {/* Logo */}
            <div className="flex-shrink-0 relative">
              <Link to="/" className="block">
                <div className="relative overflow-hidden">
                  {/* Default Logo */}
                  <img
                    src="/logostudio.svg"
                    alt="StudioEyn Logo"
                    className={`h-12 w-auto transition-all duration-300 ease-in-out ${
                      isScrolled 
                        ? 'opacity-0 rotate-2' 
                        : 'opacity-100 rotate-0'
                    }`}
                  />
                  {/* Inverted Logo */}
                  <img
                    src="/logostudio-inverted.svg"
                    alt="StudioEyn Logo"
                    className={`absolute top-0 left-0 h-14 w-auto transition-all duration-300 ease-in-out ${
                      isScrolled 
                        ? 'opacity-100 rotate-0' 
                        : 'opacity-0 -rotate-2'
                    }`}
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block ml-auto">
              <div className="flex items-center space-x-12">
                        {navItems.map((item) => {
                          const isHashLink = item.href.startsWith('#');
                          
                          if (isHashLink) {
                            return (
                              <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleSectionClick(e, item.href)}
                                className={`transition-all duration-300 ease-in-out text-sm font-normal uppercase tracking-wide ${
                                  isScrolled 
                                    ? 'text-white hover:text-gray-300' 
                                    : 'text-black hover:text-gray-600'
                                }`}
                              >
                                {item.name}
                              </a>
                            );
                          }
                          
                          return (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={`transition-all duration-300 ease-in-out text-sm font-normal uppercase tracking-wide ${
                                isScrolled 
                                  ? 'text-white hover:text-gray-300' 
                                  : 'text-black hover:text-gray-600'
                              }`}
                            >
                              {item.name}
                            </Link>
                          );
                        })}
                {/* Email Button - Following Style Guide */}
                <Link
                  to="/email"
                  className={`flex items-center space-x-3 px-6 py-3 border transition-all duration-300 ease-in-out text-sm font-normal uppercase tracking-wide ${
                    isScrolled 
                      ? 'border-white text-white hover:bg-white hover:text-black' 
                      : 'border-black text-black hover:bg-black hover:text-white'
                  }`}
                  style={{ borderRadius: '2px' }}
                >
                  <Mail className="h-4 w-4" />
                  <span>Send a message</span>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-3 transition-all duration-300 ease-in-out ${
                isScrolled 
                  ? 'text-white hover:text-gray-300 hover:bg-white/10' 
                  : 'text-black hover:text-gray-600 hover:bg-black/10'
              }`}
              style={{ borderRadius: '2px' }}
              aria-label="Toggle mobile menu"
            >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu: conditional positioning */}
      {isMobileMenuOpen && (
        <div className={`md:hidden border-t transition-all duration-300 ease-in-out py-12 ${
          isScrolled 
            ? 'fixed top-20 left-0 right-0 z-30 bg-black border-gray-700' 
            : 'bg-white border-gray-200 mt-20'
        }`}>
          <div className="container-custom flex flex-col items-center justify-center space-y-8 w-full">
                    {navItems.map((item) => {
                      const isHashLink = item.href.startsWith('#');
                      
                      if (isHashLink) {
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => {
                              handleSectionClick(e, item.href);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`block transition-all duration-300 ease-in-out text-xl font-normal text-center uppercase tracking-wide ${
                              isScrolled 
                                ? 'text-white hover:text-gray-300' 
                                : 'text-black hover:text-gray-600'
                            }`}
                          >
                            {item.name}
                          </a>
                        );
                      }
                      
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block transition-all duration-300 ease-in-out text-xl font-normal text-center uppercase tracking-wide ${
                            isScrolled 
                              ? 'text-white hover:text-gray-300' 
                              : 'text-black hover:text-gray-600'
                          }`}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
            {/* Mobile Email Button - Following Style Guide */}
            <Link
              to="/email"
              className={`flex items-center space-x-3 px-8 py-4 border transition-all duration-300 ease-in-out text-base font-normal uppercase tracking-wide mt-6 ${
                isScrolled 
                  ? 'border-white text-white hover:bg-white hover:text-black' 
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
              style={{ borderRadius: '2px' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Mail className="h-5 w-5" />
              <span>Send a message</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;