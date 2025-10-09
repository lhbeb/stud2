import React from 'react';
import { ArrowLeft, Mail, Instagram, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import LazyImage from './LazyImage';

const AbdeljebbarPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  const services = [
    {
      icon: Instagram,
      title: "Instagram Marketing",
      description: "Creative Instagram marketing strategies that build brand awareness and engage target audiences effectively."
    },
    {
      icon: ExternalLink,
      title: "Digital Marketing Strategy",
      description: "Comprehensive digital marketing strategies including email campaigns, social media management, and brand development."
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Strategic email marketing campaigns that drive engagement and conversions for businesses of all sizes."
    }
  ];

  const achievements = [
    "Successfully launched 50+ digital marketing campaigns",
    "Generated over $2M in revenue for clients",
    "Built and managed 20+ business pages",
    "Developed email marketing campaigns with 25%+ open rates",
    "Created brand identities for tech startups and established businesses"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom max-w-[1400px] mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 text-white hover:opacity-70 transition-colors duration-300 mb-12"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-normal uppercase tracking-wide">Back to Home</span>
          </button>

          {/* Profile Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Profile Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <LazyImage
                  src="https://i.ibb.co/c4WJ3Wm/pnggg.png"
                  alt="Abdeljebbar Bouftih - Marketing Expert"
                  className="w-full max-w-md mx-auto rounded-lg"
                  width={400}
                  height={500}
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="order-1 lg:order-2">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal text-white leading-tight uppercase tracking-tight mb-6">
                Abdeljebbar Bouftih
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-300 font-light mb-8">
                Founder & Manager, Marketing Expert
              </h2>
              <p className="text-lg text-gray-300 font-light leading-relaxed mb-8">
                Founder and Manager of StudioEyn with extensive experience in digital marketing, 
                Facebook advertising, and business development. As the driving force behind StudioEyn, 
                he specializes in helping tech startups and established businesses grow their online presence 
                and reach their target audiences.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <a 
                    href="mailto:abdeljebbarbouftih@gmail.com"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    abdeljebbarbouftih@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 md:py-24 bg-gray-900">
        <div className="container-custom max-w-[1400px] mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-normal text-white leading-tight uppercase tracking-tight mb-16 text-center">
            Marketing Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white text-black flex items-center justify-center mx-auto mb-6" style={{ borderRadius: '2px' }}>
                  <service.icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-normal text-white mb-4 uppercase tracking-wide">
                  {service.title}
                </h4>
                <p className="text-gray-300 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="py-16 md:py-24">
        <div className="container-custom max-w-[1400px] mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-normal text-white leading-tight uppercase tracking-tight mb-16 text-center">
            Key Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 font-light">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-24 bg-gray-900">
        <div className="container-custom max-w-[1400px] mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-normal text-white leading-tight uppercase tracking-tight mb-8">
            Ready to Grow Your Business?
          </h3>
          <p className="text-lg text-gray-300 font-light mb-12 max-w-2xl mx-auto">
            Let's discuss how I can help you achieve your marketing goals and grow your business with strategic digital marketing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:abdeljebbarbouftih@gmail.com"
              className="px-8 py-4 bg-white text-black font-normal hover:bg-gray-100 transition-colors duration-300 uppercase"
              style={{ borderRadius: '2px' }}
            >
              Contact Me
            </a>
            <Link
              to="/email"
              className="px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 uppercase"
              style={{ borderRadius: '2px' }}
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbdeljebbarPage;
