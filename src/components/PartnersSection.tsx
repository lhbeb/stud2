import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const partnerLogos = [
  'partner1.svg',
  'partner2.svg',
  'partner3.svg',
  'partner 4.svg',
  'partner 5.svg',
  'partner 6.svg',
  'partner 7.svg',
];

const PartnersSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  // GSAP animation setup
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Get the logo container
    const logoContainer = containerRef.current.querySelector('.logo-set') as HTMLElement;
    if (!logoContainer) return;
    
    // Wait for images to load to get accurate measurements
    const images = logoContainer.querySelectorAll('img');
    let loadedImages = 0;
    
    const initAnimation = () => {
      // Calculate the width of one complete set of logos (first half)
      const firstSetLogos = Array.from(logoContainer.children).slice(0, partnerLogos.length);
      let singleSetWidth = 0;
      
      firstSetLogos.forEach((logo) => {
        const logoElement = logo as HTMLElement;
        singleSetWidth += logoElement.offsetWidth;
        // Add gap width (8px on mobile, 20px on desktop)
        singleSetWidth += window.innerWidth < 768 ? 32 : 80; // 8px * 4 or 20px * 4 for gap
      });
      
      // Create the animation timeline - never paused, always running
      const tl = gsap.timeline({ 
        repeat: -1,
        onRepeat: () => {
          // Reset position seamlessly when repeating
          gsap.set(logoContainer, { x: 0 });
        }
      });
      
      // Set initial position with hardware acceleration
      gsap.set(logoContainer, { 
        x: 0,
        force3D: true,
        willChange: "transform"
      });
      
      // Animate the container to move left by exactly one set width
      // Made mobile even slower as requested
      tl.to(logoContainer, {
        x: -singleSetWidth,
        duration: window.innerWidth < 768 ? 18 : 50, // Mobile much slower now, desktop 50% slower
        ease: "none",
        force3D: true
      });
      
      animationRef.current = tl;
      
      // Always start the animation - never pause
      tl.play();
    };
    
    // Check if images are already loaded
    if (images.length === 0) {
      initAnimation();
      return;
    }
    
    // Wait for all images to load
    images.forEach((img) => {
      if (img.complete) {
        loadedImages++;
        if (loadedImages === images.length) {
          initAnimation();
        }
      } else {
        img.onload = () => {
          loadedImages++;
          if (loadedImages === images.length) {
            initAnimation();
          }
        };
      }
    });
    
    return () => {
      // Clean up animation on unmount
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []); // No dependencies - animation runs once and never stops

  return (
    <section className="pt-8 pb-16 md:pt-12 md:pb-20 bg-white md:h-[25vh] md:flex md:items-center">
      <div className="container-custom">
        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-8 md:w-16 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 md:w-16 z-10 bg-gradient-to-l from-white to-transparent" />
          <div
            ref={containerRef}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-8 md:gap-20 logo-set" style={{ width: 'max-content' }}>
              {partnerLogos.map((logo, idx) => (
                <img
                  key={`${logo}-${idx}`}
                  src={`/${logo}`}
                  alt={`Partner ${idx + 1}`}
                  className="h-12 sm:h-21 md:h-17 partners-logo cursor-pointer flex-shrink-0 logo-item"
                  loading="lazy"
                  draggable={false}
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
              ))}
              {/* Duplicate set for seamless looping */}
              {partnerLogos.map((logo, idx) => (
                <img
                  key={`${logo}-duplicate-${idx}`}
                  src={`/${logo}`}
                  alt={`Partner ${idx + 1}`}
                  className="h-12 sm:h-21 md:h-17 partners-logo cursor-pointer flex-shrink-0 logo-item"
                  loading="lazy"
                  draggable={false}
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
