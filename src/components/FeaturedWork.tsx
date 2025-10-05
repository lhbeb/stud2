import { ArrowUpRight } from 'lucide-react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import CreativeProcessGrid from './CreativeProcessGrid';

const FeaturedWork: React.FC = () => {
  const { elementRef, isVisible } = useScrollTrigger();

  return (
    <section id="work" ref={elementRef}>
      {/* Header Section - Separate from Grid */}
      <div className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal text-black leading-tight uppercase tracking-tight">
                Creative Process
              </h2>
              <div className="mt-6 md:mt-0">
                <a
                  href="https://instagram.com/studioeiyn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-black text-white text-base font-normal uppercase shadow hover:bg-gray-900 transition-colors duration-200 whitespace-nowrap"
                  style={{ borderRadius: '7px' }}
                >
                  <span>VIEW ALL</span>
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Animated GSAP grid */}
      <CreativeProcessGrid />
    </section>
  );
};

export default FeaturedWork;