import React, { useEffect, useState } from "react";

const HERO_VIDEO_URL =
  "https://player.vimeo.com/video/1118816145?autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&autopause=0&badge=0&app_id=58479";

const words = ["EYN", "EYE"];

const Hero: React.FC = () => {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentWord = words[wordIndex];
    if (!deleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 220); // slower typing
    } else if (!deleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setDeleting(true), 1800); // longer pause after typing
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 100); // slower deleting
    } else if (deleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      }, 700); // longer pause before next word
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  return (
    <section className="relative w-full bg-white overflow-hidden pt-20">
      {/* Mobile: Refactored layout with bigger video and optimized spacing */}
      <div className="block md:hidden hero-mobile-container w-full max-w-full" style={{
        height: 'calc(100vh - 80px)', // Available height minus navbar
        paddingTop: '16px',
        paddingBottom: '16px'
      }}>
        {/* Top: Hero text - LEFT ALIGNED WITH LOGO */}
        <div className="flex-shrink-0 px-8 pb-4">
          <h1 className="font-normal text-black leading-tight text-2xl uppercase tracking-tight animate-slide-up text-left" style={{ fontWeight: 400, margin: 0 }}>
            <span
              className="inline-block text-black font-mono align-middle w-full whitespace-nowrap"
              style={{ minWidth: '3ch', display: 'block' }}
            >
              {displayed}&nbsp;
            </span>
            <span className="block w-full whitespace-nowrap">DON'T JUST</span>
            <span className="block w-full whitespace-nowrap">SEE BRANDS.</span>
            <span className="block w-full whitespace-nowrap">WE SHAPE THEM</span>
          </h1>
        </div>
        
        {/* Middle: Left-Aligned Video */}
        <div className="flex-1 flex items-center px-8" style={{ minHeight: '400px' }}>
          <div className="w-full max-w-md h-full relative">
            <iframe
              src={HERO_VIDEO_URL}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              title="STUDIOEYN"
              className="w-full h-full object-cover pointer-events-none"
              style={{ 
                zIndex: 1,
                aspectRatio: '16/9',
                minHeight: '280px'
              }}
            ></iframe>
          </div>
        </div>
        
        {/* Bottom: CTA button - LEFT ALIGNED WITH LOGO */}
        <div className="flex-shrink-0 px-8 pt-4">
          <a
            href="#contact"
            className="inline-block px-8 py-4 rounded-lg bg-black text-white text-base font-light uppercase tracking-wide hover:bg-gray-900 transition-colors duration-300 animate-slide-up animation-delay-400"
          >
            Let's talk - Send a message
          </a>
        </div>
      </div>

      {/* Desktop: New layout with StudioEyn branding */}
      <div className="hidden md:block min-h-screen">
        <div className="container-custom">
          <div className="flex items-center min-h-screen py-20">
            {/* Vertical Text - Closer to main text */}
            <div className="absolute left-12 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs font-light text-gray-400 uppercase tracking-wider z-10">
              STUDIO EYN BRANDING SOLUTIONS
            </div>
            
            {/* Left Column: Text Content */}
            <div className="w-2/5 pr-12 relative ml-20">
              {/* Minimal Grey Separator Line - Centered between texts */}
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-px h-16 bg-gray-300 z-10"></div>
              {/* Main Content */}
              <div className="relative z-10">
                <h1 className="text-5xl lg:text-6xl font-normal text-black leading-tight mb-6 animate-slide-up uppercase tracking-tight" style={{ fontWeight: 400 }}>
                  <span
                    className="inline-block text-black font-mono align-middle w-full whitespace-nowrap"
                    style={{ minWidth: '3ch', display: 'block' }}
                  >
                    {displayed}&nbsp;
                  </span>
                  <span className="block w-full whitespace-nowrap">DON'T JUST</span>
                  <span className="block w-full whitespace-nowrap">SEE BRANDS.</span>
                  <span className="block w-full whitespace-nowrap">WE SHAPE THEM</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed mb-8 animate-slide-up animation-delay-200">
                  Creating products with a strong identity.<br />
                  We provide brilliant ideas and adding the<br />
                  world called success brand.
                </p>
                
                <a
                  href="#contact"
                  className="inline-flex items-center px-8 py-4 bg-black text-white font-normal rounded-md hover:bg-gray-900 transition-all duration-300 animate-slide-up animation-delay-400 uppercase"
                >
                  <span>Let's talk - Send a message</span>
                </a>
              </div>
              
              {/* Pagination Indicators */}
              <div className="absolute bottom-0 left-0 flex items-center space-x-2 text-sm font-medium text-gray-600">
                <span className="text-black">01</span>
                <div className="w-8 h-px bg-gray-300"></div>
                <span>03</span>
              </div>
            </div>
            
            {/* Right Column: Video/Image */}
            <div className="w-3/5 pl-8">
              <div className="relative w-full h-[720px] rounded-2xl overflow-hidden">
                {/* Video with fallback image */}
                <iframe
                  src={HERO_VIDEO_URL}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  title="STUDIOEYN"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  style={{ zIndex: 1 }}
                ></iframe>
                
                {/* Fallback image (hidden when video loads) */}
                <img
                  src="/hero-fallback.jpg"
                  alt="StudioEyn Branding Solutions"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ zIndex: 0 }}
                  onError={(e) => {
                    // Hide fallback if image doesn't exist
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;