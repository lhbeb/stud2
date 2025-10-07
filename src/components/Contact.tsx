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
            Ready to transform your vision into reality? Let's discuss your project and bring your ideas to life.
          </p>
        </div>

        {/* Simple CTA Section */}
        <div className={`text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-black p-12 md:p-16 rounded-sm">
              <h3 className="text-3xl md:text-4xl font-normal text-white mb-6 uppercase tracking-tight">
                Start Your Project Today
              </h3>
              <p className="text-lg text-gray-300 font-light mb-8 max-w-2xl mx-auto">
                Book a free consultation call to discuss your project requirements and how we can help bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

export default Contact;