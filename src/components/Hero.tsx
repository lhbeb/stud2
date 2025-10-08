import React, { useEffect, useState } from "react";
import LazyVideo from "./LazyVideo";

const HERO_VIDEO_URL =
  "https://player.vimeo.com/video/1124906803?autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&autopause=0&badge=0&app_id=58479";
const DESKTOP_HERO_VIDEO_URL =
  "https://player.vimeo.com/video/1124884284?autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&autopause=0&badge=0&app_id=58479";

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
    <section className="relative w-full bg-white overflow-hidden pt-28 md:pt-14">
      {/* Mobile: Video first, then text, then CTA */}
      <div className="block md:hidden w-full max-w-full" style={{
        paddingTop: '16px',
        paddingBottom: '32px'
      }}>
        {/* Top: Full-Width Video - Directly below navbar */}
        <div className="w-full relative mb-6" style={{ height: '50vh', minHeight: '300px' }}>
          <LazyVideo
            src={HERO_VIDEO_URL}
            className="w-full h-full object-cover pointer-events-none"
            fallbackImage="/fallback.jpeg"
            priority={true}
            width={400}
            height={300}
          />
        </div>
        
        {/* Middle: Hero text - LEFT ALIGNED WITH LOGO */}
        <div className="px-8 pb-4">
          <h1 className="font-normal text-black leading-tight text-2xl uppercase tracking-tight animate-slide-up text-left mb-4" style={{ fontWeight: 400, margin: 0 }}>
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
          <p className="text-sm text-gray-600 animate-slide-up animation-delay-200 font-light">
            Branding Agency, Advanced Design and Marketing Solutions
          </p>
        </div>
        
        {/* Bottom: CTA button - LEFT ALIGNED WITH LOGO */}
        <div className="px-8 pt-4">
          <a
            href="/book-call"
            className="inline-flex items-center px-8 py-4 bg-black text-white text-base font-light uppercase tracking-wide hover:bg-gray-900 transition-colors duration-300 animate-slide-up animation-delay-400"
            style={{ borderRadius: '2px' }}
          >
            <img src="/arrow.svg" alt="" className="h-3 w-3 mr-3" />
            <span>Book a call</span>
          </a>
        </div>
      </div>

      {/* Desktop: Clean layout without vertical text and separator */}
      <div className="hidden md:block" style={{ height: '65vh' }}>
        <div className="container-custom h-full">
          <div className="flex items-center h-full">
            {/* Left Column: Text Content */}
            <div className="w-1/3 pr-8 relative flex items-center">
              {/* Main Content - Centered with video */}
              <div className="relative z-10 w-full">
                <h1 className="text-4xl lg:text-5xl font-normal text-black leading-tight mb-6 animate-slide-up uppercase tracking-tight" style={{ fontWeight: 400 }}>
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
                
                <p className="text-lg text-gray-600 mb-8 animate-slide-up animation-delay-200 font-light">
                  Branding Agency, Advanced Design and Marketing Solutions
                </p>
                
                <a
                href="/book-call"
                className="inline-flex items-center px-8 py-4 bg-black text-white font-normal hover:bg-gray-900 transition-all duration-300 animate-slide-up animation-delay-200 uppercase"
                style={{ borderRadius: '2px' }}
               >
                  <img src="/arrow.svg" alt="" className="h-3 w-3 mr-3" />
                  <span>Book a call</span>
                </a>
              </div>
            </div>
            
            {/* Right Column: Video/Image */}
            <div className="w-2/3 pl-8 flex justify-end">
              <div className="relative w-[840px] h-[672px] rounded-sm overflow-hidden">
                <LazyVideo
                  src={DESKTOP_HERO_VIDEO_URL}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  fallbackImage="/fallback.jpeg"
                  priority={true}
                  width={840}
                  height={672}
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