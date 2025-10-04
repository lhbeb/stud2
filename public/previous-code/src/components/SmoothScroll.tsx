import { useEffect } from 'react';

const SmoothScroll = () => {
  useEffect(() => {
    // Enhanced smooth scrolling for anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        
        if (targetElement) {
          const headerOffset = 80; // Account for fixed header
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    // Add CSS for smooth scrolling
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      /* Enhanced smooth scrolling with easing */
      @media (prefers-reduced-motion: no-preference) {
        html {
          scroll-behavior: smooth;
        }
      }
      
      /* Section transitions */
      section {
        scroll-margin-top: 80px;
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      /* Intersection observer animations */
      .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .fade-in-up.visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      .stagger-children > * {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .stagger-children.visible > * {
        opacity: 1;
        transform: translateY(0);
      }
      
      .stagger-children.visible > *:nth-child(1) { transition-delay: 0ms; }
      .stagger-children.visible > *:nth-child(2) { transition-delay: 100ms; }
      .stagger-children.visible > *:nth-child(3) { transition-delay: 200ms; }
      .stagger-children.visible > *:nth-child(4) { transition-delay: 300ms; }
      .stagger-children.visible > *:nth-child(5) { transition-delay: 400ms; }
      .stagger-children.visible > *:nth-child(6) { transition-delay: 500ms; }
      .stagger-children.visible > *:nth-child(7) { transition-delay: 600ms; }
      .stagger-children.visible > *:nth-child(8) { transition-delay: 700ms; }
      .stagger-children.visible > *:nth-child(9) { transition-delay: 800ms; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default SmoothScroll;