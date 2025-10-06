import { ArrowRight } from 'lucide-react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

const Services: React.FC = () => {
  const { elementRef, isVisible } = useScrollTrigger();

  const services = [
    {
      title: 'Brand Identity',
      description: 'Complete visual identity systems that define your unique market presence.',
      details: ['Logo Design', 'Brand Guidelines', 'Visual Systems']
    },
    {
      title: 'UI/UX Design',
      description: 'Exceptional user experiences across all digital platforms.',
      details: ['Website Design', 'Mobile Apps', 'User Research']
    },
    {
      title: 'Full-Stack Development',
      description: 'Scalable custom platforms that grow with your business.',
      details: ['Frontend Development', 'Backend Solutions', 'API Integration']
    },
    {
      title: 'Design Strategy',
      description: 'Strategic positioning that sets your brand apart.',
      details: ['Design Consulting', 'Market Analysis', 'Brand Planning']
    },
    {
      title: 'Digital Marketing',
      description: 'Strategic digital campaigns that drive engagement and growth.',
      details: ['Social Media', 'Content Strategy', 'SEO & Analytics']
    },
    {
      title: 'E-commerce Solutions',
      description: 'Complete online store solutions for modern retail businesses.',
      details: ['Shopify Development', 'Custom Platforms', 'Payment Integration']
    },
  ];

  return (
    <section 
      id="services" 
      className="py-20 md:py-32 bg-black"
      ref={elementRef}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className={`mb-20 md:mb-28 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal text-white leading-tight uppercase tracking-tight mb-8">
            Our Expertise
          </h2>
          <p className="text-lg md:text-xl text-gray-300 font-light max-w-4xl leading-relaxed">
            Strategic brand and digital design solutions for the Middle East and Gulf region.
          </p>
        </div>

        {/* Services Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 stagger-children ${
          isVisible ? 'visible' : ''
        }`}>
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-500 hover:scale-[1.02] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                borderRadius: '7px'
              }}
            >
              {/* Card */}
              <div className="relative bg-white border border-gray-200 p-8 md:p-12 h-full hover:border-white hover:shadow-lg transition-all duration-300">
                {/* Content */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-normal text-black mb-6 group-hover:text-gray-700 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 font-light leading-relaxed mb-8">
                    {service.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {service.details.map((detail, detailIndex) => (
                      <div 
                        key={detailIndex} 
                        className="px-4 py-2 border border-gray-300 rounded-sm text-sm font-light text-gray-600 hover:border-black hover:text-black transition-all duration-300"
                      >
                        {detail}
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Arrow */}
                  <div className="flex items-center text-gray-400 group-hover:text-black transition-colors duration-300">
                    <span className="text-sm font-light mr-2">Explore Service</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className={`mt-20 md:mt-28 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="border-t border-gray-700 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-normal text-white mb-4 uppercase tracking-tight">
                  Start a project with StudioEyn
                </h3>
                <p className="text-gray-300 font-light max-w-xl">
                  Tell us about your brand or product. We'll propose a clear path forward in 24 hours.
                </p>
              </div>
              <div className="flex md:justify-end gap-4">
                <a
                  href="/book-call"
                  className="inline-flex items-center px-8 py-4 bg-white text-black font-normal hover:bg-gray-100 transition-all duration-300 uppercase tracking-wide whitespace-nowrap"
                  style={{ borderRadius: '2px' }}
                >
                  <span>Book a Call</span>
                </a>
                <a
                  href="mailto:hello@studioeyn.com"
                  className="inline-flex items-center px-8 py-4 border border-white text-white font-normal hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-wide whitespace-nowrap"
                  style={{ borderRadius: '2px' }}
                >
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;