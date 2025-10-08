import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { Link } from 'react-router-dom';

const Team: React.FC = () => {
  const { elementRef, isVisible } = useScrollTrigger();

  const team = [
    {
      name: 'Youssef Eyn',
      role: 'Creative Director',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
    },
    {
      name: 'Amina Benali',
      role: 'UI/UX Designer',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
    },
    {
      name: 'Omar Alaoui',
      role: 'Full-Stack Developer',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    },
    {
      name: 'Laila Mansouri',
      role: 'Brand Strategist',
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

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 stagger-children ${
          isVisible ? 'visible' : ''
        }`}>
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden transition-all duration-300"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
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

        <div className={`mt-16 md:mt-24 pt-12 border-t border-gray-800 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="text-left">
              <p className="text-white font-light text-sm md:text-base mb-2">
                Want to join our team?
              </p>
              <p className="text-gray-400 font-light text-xs md:text-sm">
                We're always looking for talented designers and developers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/about"
                className="inline-block px-6 py-3 border border-white text-white text-xs font-normal hover:bg-white hover:text-black transition-colors duration-200 whitespace-nowrap uppercase tracking-wide"
                style={{ borderRadius: '2px' }}
              >
                Learn More
              </Link>
              <Link
                to="/email"
                className="inline-block px-6 py-3 bg-white text-black text-xs font-normal hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap uppercase tracking-wide"
                style={{ borderRadius: '2px' }}
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;