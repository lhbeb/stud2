import React, { useEffect } from 'react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { ArrowLeft, MapPin, Mail, Users, Award, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const { elementRef, isVisible } = useScrollTrigger();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: Target,
      title: 'Strategic Design',
      description: 'Every project begins with deep understanding of your brand, market, and objectives to create designs that truly resonate.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in every detail, from initial concept to final delivery, ensuring exceptional results.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients as partners, fostering open communication and shared vision throughout the process.'
    }
  ];

  const team = [
    {
      name: 'StudioEyn Team',
      role: 'Creative Directors & Designers',
      description: 'A passionate collective of designers, strategists, and creative minds dedicated to bringing your vision to life.',
      image: '/team-placeholder.jpg'
    }
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '25+', label: 'Happy Clients' },
    { number: '3', label: 'Years Experience' },
    { number: '100%', label: 'Client Satisfaction' }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          {/* Back Button */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-black hover:text-gray-600 transition-colors duration-300 mb-12"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-normal uppercase tracking-wide">Back to Home</span>
          </Link>

          {/* Page Header */}
          <div className={`mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal text-black leading-tight uppercase tracking-tight mb-6">
              About StudioEyn
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-light max-w-3xl">
              We are a Casablanca-based creative agency specializing in brand identity and digital design for the Middle East and Gulf region. Our mission is to transform visions into powerful, memorable brands.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <h2 className="text-3xl md:text-4xl font-normal text-black leading-tight uppercase tracking-tight mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-6">
                At StudioEyn, we believe that great design has the power to transform businesses and create meaningful connections. We specialize in creating distinctive brand identities and digital experiences that resonate with Middle Eastern and Gulf markets.
              </p>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                Our approach combines strategic thinking with creative excellence, ensuring that every project not only looks exceptional but also drives real business results for our clients.
              </p>
            </div>
            <div className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <div className="bg-black p-8 md:p-12 rounded-sm">
                <h3 className="text-2xl font-normal text-white mb-6 uppercase tracking-tight">
                  Why Choose Us
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300 font-light">Deep understanding of Middle Eastern and Gulf markets</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300 font-light">Strategic approach to brand development</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300 font-light">Modern design with cultural sensitivity</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300 font-light">End-to-end project management</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-normal text-black leading-tight uppercase tracking-tight mb-6">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              These core principles guide everything we do and shape how we approach each project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-black rounded-sm flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-normal text-black mb-4 uppercase tracking-tight">
                  {value.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container-custom">
          <div className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-normal text-white leading-tight uppercase tracking-tight mb-6">
              Our Impact
            </h2>
            <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and client success.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-normal text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300 font-light uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-normal text-black leading-tight uppercase tracking-tight mb-6">
              Our Team
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Meet the creative minds behind StudioEyn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="w-32 h-32 bg-gray-200 rounded-sm mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-normal text-black mb-2 uppercase tracking-tight">
                  {member.name}
                </h3>
                <p className="text-gray-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 font-light leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className={`text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-normal text-black leading-tight uppercase tracking-tight mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-lg text-gray-600 font-light mb-8 max-w-2xl mx-auto">
              Let's discuss your project and explore how we can bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/book-call"
                className="inline-flex items-center px-8 py-4 bg-black text-white font-normal hover:bg-gray-900 transition-all duration-300 uppercase tracking-wide whitespace-nowrap"
                style={{ borderRadius: '2px' }}
              >
                <span>Book a Call</span>
              </Link>
              <a
                href="mailto:hello@studioeyn.com"
                className="inline-flex items-center px-8 py-4 border border-black text-black font-normal hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-wide whitespace-nowrap"
                style={{ borderRadius: '2px' }}
              >
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
