import React, { useState } from 'react';
import { Send, MapPin, Mail, CheckCircle } from 'lucide-react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

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
      content: 'Casablanca, Morocco',
      description: 'Our studio is located in the heart of Casablanca'
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'contact@studioeyn.com',
      description: 'Get in touch for project inquiries'
    },
  ];

  return (
    <section 
      id="contact" 
      className="py-16 md:py-32 bg-white"
      ref={elementRef}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className={`mb-16 md:mb-24 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal text-black leading-tight uppercase tracking-tight mb-6">
            Let's Create Together
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-3xl">
            Got a project in mind? Whether you need a brand identity, a custom website, or a digital overhaul — 
            we'd love to hear from you and discuss how we can bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <div className={`space-y-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-sm p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-sm bg-black flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-normal text-black mb-2">
                        {info.title}
                      </h4>
                      <p className="text-black font-medium mb-1">
                        {info.content}
                      </p>
                      <p className="text-gray-600 font-light text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-black rounded-sm p-8 text-white">
              <h3 className="text-2xl font-normal mb-4">
                Ready to start your project?
              </h3>
              <p className="text-gray-300 font-light mb-6">
                Book a free consultation call to discuss your project requirements and how we can help.
              </p>
              <a
              href="mailto:hello@studioeyn.com"
              className="inline-block px-8 py-4 bg-white text-black text-base font-semibold hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap"
              style={{ borderRadius: '1px' }}
            >
                Book Free Call
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="bg-gray-50 rounded-sm p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-normal text-black mb-8">
                Send us a Message
              </h3>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-800 font-light">
                    Message sent successfully! We'll get back to you soon.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-light text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light
                               focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-light text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light
                               focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-light text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light
                             focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-light text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light
                             focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white px-8 py-4 font-semibold
                           disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center space-x-2
                           hover:bg-gray-900 transition-colors duration-200 whitespace-nowrap"
                  style={{ borderRadius: '1px' }}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;