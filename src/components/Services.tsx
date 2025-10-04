import { Palette, Code, Smartphone, Zap } from 'lucide-react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

const Services: React.FC = () => {
  const { elementRef, isVisible } = useScrollTrigger();

  const services = [
    {
      icon: Palette,
      title: 'Brand Identity',
      description: 'Logo Design, Visual Systems, and comprehensive Brand Guidelines that define your unique presence in the market.',
      details: ['Logo Design & Visual Identity', 'Brand Guidelines & Standards', 'Visual Systems & Applications']
    },
    {
      icon: Smartphone,
      title: 'UI/UX Design',
      description: 'Website & App Interfaces, Wireframes & Prototypes that deliver exceptional user experiences across all platforms.',
      details: ['Website & Mobile App Design', 'User Experience Research', 'Wireframes & Interactive Prototypes']
    },
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Frontend + Backend development for scalable custom platforms that grow with your business needs.',
      details: ['Frontend & Backend Development', 'Custom Platform Solutions', 'API Integration & Database Design']
    },
    {
      icon: Zap,
      title: 'Design Strategy',
      description: 'Strategic design thinking and market positioning that sets your brand apart in competitive landscapes.',
      details: ['Strategic Design Consulting', 'Market Positioning & Analysis', 'Brand Architecture & Planning']
    },
  ];

  return (
    <section 
      id="services" 
      className="py-16 md:py-32 bg-gray-50"
      ref={elementRef}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className={`mb-16 md:mb-24 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal text-black leading-tight uppercase tracking-tight mb-6">
            Our Expertise
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-3xl">
            With over 10 years of experience and more than 400 successful projects delivered, 
            StudioEyn specializes in brand and digital design that speaks clearly and performs effortlessly across the Middle East and Gulf region.
          </p>
        </div>

        {/* Services Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 stagger-children ${
          isVisible ? 'visible' : ''
        }`}>
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-sm p-8 md:p-12 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-all duration-300">
                <service.icon className="h-8 w-8" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-normal text-black mb-6">
                {service.title}
              </h3>
              
              <p className="text-gray-600 font-light leading-relaxed mb-8">
                {service.description}
              </p>
              
              <div className="space-y-3">
                {service.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-center text-gray-500">
                    <div className="w-2 h-2 bg-black rounded-full mr-4 opacity-60"></div>
                    <span className="font-light">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        {/* Removed the bg-black rounded-lg p-8 md:p-12 text-white section as requested */}
      </div>
    </section>
  );
};

export default Services;