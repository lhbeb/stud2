import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

const Team: React.FC = () => {
  const { elementRef, isVisible } = useScrollTrigger();

  const team = [
    {
      name: 'ELMehdi EL Mahboubi',
      role: 'Co-Founder, Creative Director',
      image: 'https://i.ibb.co/hJxnD9XQ/mehdi.png',
    },
    {
      name: 'Abdeljebbar Bouftih',
      role: 'Founder, Marketing Expert',
      image: 'https://i.ibb.co/zhMVDykB/pnggg.png',
    },
    {
      name: 'Walid Azif',
      role: 'Web Dev, Code Ninja',
      image: 'https://i.ibb.co/qMgs0GkY/Whats-App-Image-2025-10-08-at-22-11-46-1.jpg',
    },
    {
      name: 'Amine Tair',
      role: 'Brand Strategist',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg',
    },
    {
      name: 'Abderrazak Abde',
      role: 'UI/UX Designer',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg',
    },
  ];

  return (
    <section 
      id="about" 
      className="py-16 md:py-32 bg-black"
      ref={elementRef}
    >
      <div className="container-custom">
        <div className={`mb-12 md:mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal text-white leading-tight uppercase tracking-tight">
            Meet Our Team
          </h2>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 stagger-children ${
          isVisible ? 'visible' : ''
        }`}>
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden transition-all duration-300"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
                <LazyImage
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  width={400}
                  height={533}
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-300"></div>
                
                {/* Name and Role Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-base md:text-lg font-normal text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-300 font-light text-xs md:text-sm uppercase tracking-wide">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Team;