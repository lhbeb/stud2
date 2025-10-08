import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, User, Phone, MessageSquare, Send } from 'lucide-react';

const EmailPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email data to API
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        console.error('Server error:', data);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      console.error('Full error details:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto">
            <div className="h-16 w-16 bg-black mx-auto mb-6 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white transform rotate-45">
                <div className="w-2 h-6 bg-white transform -rotate-45 translate-x-1 translate-y-1"></div>
                <div className="w-4 h-2 bg-white transform -rotate-45 -translate-x-1 translate-y-3"></div>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-normal text-black mb-6 uppercase tracking-tight">
              Message Sent Successfully!
            </h1>
            <p className="text-lg text-gray-600 font-light mb-8">
              Thank you for reaching out to StudioEyn. We'll get back to you as soon as possible.
            </p>
            <button
              onClick={handleBackClick}
              className="px-8 py-4 bg-black text-white font-normal hover:bg-gray-900 transition-colors duration-300 uppercase"
              style={{ borderRadius: '2px' }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container-custom">
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 text-black hover:text-gray-600 transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-normal uppercase tracking-wide">Back to Home</span>
          </button>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-black leading-tight uppercase tracking-tight mb-4">
              Get In Touch
            </h1>
            <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Have a project in mind? Send us a message and we'll get back to you within 24 hours.
            </p>
          </div>

          {/* Email Form */}
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-gray-50 rounded-sm p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-normal text-black mb-6 uppercase tracking-tight">
                  <Mail className="h-5 w-5 inline mr-2" />
                  Your Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">
                      <Phone className="h-4 w-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">
                      <MessageSquare className="h-4 w-4 inline mr-2" />
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
                      placeholder="Project inquiry"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mt-6">
                  <label className="block text-sm font-light text-gray-700 mb-2">
                    <MessageSquare className="h-4 w-4 inline mr-2" />
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message}
                  className="inline-flex items-center space-x-2 px-12 py-4 bg-black text-white font-normal hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 uppercase tracking-wide"
                  style={{ borderRadius: '2px' }}
                >
                  <Send className="h-5 w-5" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </div>

              {submitStatus === 'error' && (
                <div className="text-center">
                  <p className="text-red-600 font-light">
                    There was an error sending your message. Please try again or contact us directly at contact@studioeyn.com
                  </p>
                </div>
              )}
            </form>

            {/* Contact Information */}
            <div className="mt-16 pt-16 border-t border-gray-200">
              <div className="text-center">
                <h3 className="text-xl font-normal text-black mb-4 uppercase tracking-tight">
                  Other Ways to Reach Us
                </h3>
                <p className="text-gray-600 font-light mb-6">
                  Prefer email? Send us a message directly at:
                </p>
                <a
                  href="mailto:contact@studioeyn.com"
                  className="inline-flex items-center space-x-2 text-black hover:text-gray-600 transition-colors duration-300 font-light text-lg"
                >
                  <Mail className="h-5 w-5" />
                  <span>contact@studioeyn.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPage;
