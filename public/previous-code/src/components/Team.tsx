import { Linkedin, Twitter, Github } from 'lucide-react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

const Team: React.FC = () => {
  const { elementRef, isVisible } = useScrollTrigger();

  const team = [
    {
      name: 'Youssef Eyn',
      role: 'Creative Director & Founder',
      bio: 'Leading brand strategy and creative direction with over 10 years of experience in the MENA region. Passionate about creating meaningful brand experiences.',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
      },
    },
    {
      name: 'Amina Benali',
      role: 'Senior UI/UX Designer',
      bio: 'Crafting intuitive digital experiences with a focus on user-centered design and accessibility. Expert in modern design systems and prototyping.',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
      },
    },
    {
      name: 'Omar Alaoui',
      role: 'Lead Full-Stack Developer',
      bio: 'Building scalable web platforms and custom solutions with modern technologies. Specialized in React, Node.js, and cloud architecture.',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
      },
    },
    {
      name: 'Laila Mansouri',
      role: 'Brand Strategist',
      bio: 'Developing strategic brand positioning and market insights for clients across Gulf markets. Expert in brand architecture and positioning.',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
      },
    },
  ];

  return (
    <section 
      id="about" 
      className="py-16 md:py-32 bg-gray-50"
      ref={elementRef}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className={`mb-16 md:mb-24 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal text-black leading-tight uppercase tracking-tight mb-6">
            Meet Our Team
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-3xl">
            A passionate team of designers, developers, and strategists based in Casablanca, 
            dedicated to creating exceptional brand experiences for clients across the Middle East and Gulf region.
          </p>
        </div>

        {/* Team Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 stagger-children ${
          isVisible ? 'visible' : ''
        }`}>
          {team.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-3">
                    <a
                      href={member.social.linkedin}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors duration-200"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4 text-black" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors duration-200"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter className="h-4 w-4 text-black" />
                    </a>
                    <a
                      href={member.social.github}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors duration-200"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github className="h-4 w-4 text-black" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-normal text-black mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-500 font-light mb-4 text-sm uppercase tracking-wide">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm font-light leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 md:mt-24 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-black rounded-lg p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-normal mb-4">
              Want to join our team?
            </h3>
            <p className="text-gray-300 font-light mb-8 max-w-2xl mx-auto">
              We're always looking for talented designers and developers to join our growing team in Casablanca.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 rounded-lg bg-white text-black text-base font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;