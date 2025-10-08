import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CareersPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    portfolio: '',
    coverLetter: '',
    resume: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('portfolio', formData.portfolio);
      formDataToSend.append('coverLetter', formData.coverLetter);
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          portfolio: '',
          coverLetter: '',
          resume: null
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-light text-black mb-6">
              Join Our Team
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Be part of a creative studio that's redefining brand experiences. 
              We're looking for passionate individuals who share our vision of exceptional design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/book-call" 
                className="inline-flex items-center px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Book a Call
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                to="/email" 
                className="inline-flex items-center px-8 py-3 border border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors"
              >
                Email Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-light text-black mb-12 text-left">
              Open Positions
            </h2>
            
            <div className="space-y-8">
              {/* Senior Brand Designer */}
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-black mb-2">Senior Brand Designer</h3>
                    <p className="text-gray-600">Full-time • Remote/On-site</p>
                  </div>
                  <span className="inline-block px-4 py-2 bg-black text-white text-sm font-medium uppercase tracking-wide mt-3 sm:mt-0 self-start sm:self-center" style={{ borderRadius: '2px' }}>
                    Open
                  </span>
                </div>
                <p className="text-gray-700 mb-4">
                  Lead brand identity projects from concept to completion. Work with diverse clients 
                  to create memorable brand experiences that stand out in competitive markets.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">Brand Identity</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">Logo Design</span>
                  <span className="px-3 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">Visual Identity</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">Adobe Creative Suite</span>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Requirements:</strong> 3+ years experience, strong portfolio, proficiency in Adobe Creative Suite
                </p>
              </div>

              {/* UI/UX Designer */}
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-black mb-2">UI/UX Designer</h3>
                    <p className="text-gray-600">Full-time • Remote/On-site</p>
                  </div>
                  <span className="inline-block px-4 py-2 bg-black text-white text-sm font-medium uppercase tracking-wide mt-3 sm:mt-0 self-start sm:self-center" style={{ borderRadius: '2px' }}>
                    Open
                  </span>
                </div>
                <p className="text-gray-700 mb-4">
                  Create intuitive digital experiences that users love. Work on web and mobile projects 
                  that push the boundaries of digital design.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">UI Design</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">UX Research</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">Figma</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">Prototyping</span>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Requirements:</strong> 2+ years experience, strong understanding of user-centered design
                </p>
              </div>

              {/* Creative Director */}
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-black mb-2">Creative Director</h3>
                    <p className="text-gray-600">Full-time • On-site</p>
                  </div>
                  <span className="inline-block px-4 py-2 bg-black text-white text-sm font-medium uppercase tracking-wide mt-3 sm:mt-0 self-start sm:self-center" style={{ borderRadius: '2px' }}>
                    Open
                  </span>
                </div>
                <p className="text-gray-700 mb-4">
                  Lead creative vision and strategy for all projects. Mentor team members and 
                  ensure exceptional creative output across all client work.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">Creative Strategy</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">Team Leadership</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">Client Relations</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">Brand Strategy</span>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Requirements:</strong> 5+ years experience, leadership experience, strong strategic thinking
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-light text-black mb-8 text-left">
              Apply Now
            </h2>
            
            {submitStatus === 'success' && (
              <div className="mb-8 p-4 bg-black border border-gray-300" style={{ borderRadius: '2px' }}>
                <p className="text-white font-medium">Application submitted successfully! We'll be in touch soon.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">There was an error submitting your application. Please try again or contact us directly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                    Position Applying For *
                  </label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Select a position</option>
                    <option value="Senior Brand Designer">Senior Brand Designer</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Creative Director">Creative Director</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Select experience level</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="2-3 years">2-3 years</option>
                  <option value="4-5 years">4-5 years</option>
                  <option value="6+ years">6+ years</option>
                </select>
              </div>

              <div>
                <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio/Website URL *
                </label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  required
                  placeholder="https://yourportfolio.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter *
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Tell us why you'd like to join StudioEyn and what makes you a great fit..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Resume/CV (PDF, DOC, DOCX)
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
                {formData.resume && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {formData.resume.name}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-4 px-8 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CareersPage;