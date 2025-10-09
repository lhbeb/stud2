import React, { useState } from 'react';
import { Send, MapPin, Mail, CheckCircle, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const { elementRef, isVisible } = useScrollTrigger();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', company: '', message: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Casablanca, Morocco & London, UK',
      description: 'Our studios are located in Casablanca and London'
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'contact@studioeyn.com',
      description: 'Get in touch for project inquiries'
    },
  ];

  const socialLinks = [
    { 
      icon: Twitter, 
      href: 'https://x.com/studioeiyn', 
      label: 'X (Twitter)'
    },
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/studioeiyn/', 
      label: 'Instagram'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/studioeyn', 
      label: 'LinkedIn'
    },
  ];

  return (
    <section 
      id="contact" 
      className="py-16 md:py-32 bg-black"
      ref={elementRef}
    >
      <div className="container-custom">
        {/* Unified Black CTA Section */}
        <div className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="max-w-6xl mx-auto relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}></div>
            </div>
            
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Content */}
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight uppercase tracking-tight mb-8">
                    Let's Create
                  </h2>
                  <p className="text-xl text-gray-300 font-light leading-relaxed mb-12">
                    Transform your vision into reality.
                  </p>
                </div>
                
                {/* Right: Actions */}
                <div className="space-y-6">
                  <a
                    href="/book-call"
                    className="group block w-full bg-white text-black p-8 hover:bg-gray-100 transition-all duration-300"
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-normal mb-2 uppercase tracking-wide">Book a Call</h3>
                        <p className="text-sm text-gray-600 font-light">Free consultation</p>
                      </div>
                      <div className="w-8 h-8 bg-black text-white flex items-center justify-center group-hover:bg-gray-800 transition-colors duration-300" style={{ borderRadius: '2px' }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </a>
                  
                  <Link
                    to="/email"
                    className="group block w-full border border-white text-white p-8 hover:bg-white hover:text-black transition-all duration-300"
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-normal mb-2 uppercase tracking-wide">Email Us</h3>
                        <p className="text-sm text-gray-300 font-light group-hover:text-gray-600">Send a message</p>
                      </div>
                      <div className="w-8 h-8 border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300" style={{ borderRadius: '2px' }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className={`mt-16 pt-16 border-t border-gray-800 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-normal text-white mb-8 uppercase tracking-tight">
              Follow Us
            </h3>
            <p className="text-gray-300 font-light mb-8 max-w-2xl mx-auto">
              Stay connected with our latest work and insights
            </p>
            <div className="flex justify-center gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="group flex items-center justify-center w-12 h-12 border border-gray-600 text-gray-400 hover:text-white hover:border-white transition-all duration-300"
                  style={{ borderRadius: '2px' }}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;