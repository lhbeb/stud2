import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, Users, Zap, Shield } from 'lucide-react';

const BookCallPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send booking data to API
      const response = await fetch('http://localhost:3001/api/book-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          projectType: formData.projectType,
          message: formData.message,
          selectedDate: selectedDate,
          selectedTime: selectedTime,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        // Reset form after success
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', company: '', projectType: '', budget: '', timeline: '', message: '' });
          setSelectedDate('');
          setSelectedTime('');
          setSubmitStatus('idle');
          setCurrentStep(1);
        }, 5000);
      } else {
        setSubmitStatus('error');
        console.error('Booking failed:', result.message);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Generate available time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  // Generate next 30 days
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  const projectTypes = [
    { value: 'brand-identity', label: 'Brand Identity', description: 'Logo, visual identity, brand guidelines' },
    { value: 'ui-ux-design', label: 'UI/UX Design', description: 'Web design, mobile apps, user experience' },
    { value: 'full-stack-development', label: 'Full-Stack Development', description: 'Custom web applications & platforms' },
    { value: 'design-strategy', label: 'Design Strategy', description: 'Strategic planning & consultation' },
    { value: 'other', label: 'Other', description: 'Custom project requirements' }
  ];

  const budgetRanges = [
    { value: 'under-10k', label: 'Under $10,000' },
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: 'over-100k', label: 'Over $100,000' }
  ];

  const timelineOptions = [
    { value: 'asap', label: 'ASAP (Rush project)' },
    { value: '1-month', label: 'Within 1 month' },
    { value: '2-3-months', label: '2-3 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: 'flexible', label: 'Flexible timeline' }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 text-black hover:text-gray-600 transition-colors duration-300 mb-12"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-normal uppercase tracking-wide">Back to Home</span>
          </button>

          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-black leading-tight uppercase tracking-tight mb-6">
              Book Your Free Call
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-light max-w-3xl mx-auto mb-8">
              Schedule a free 30-minute consultation with StudioEyn to discuss your project and discover how we can bring your vision to life.
            </p>
            
            {/* Progress Steps */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-normal transition-all duration-300 ${
                    currentStep >= step 
                      ? 'bg-black text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-px mx-2 transition-all duration-300 ${
                      currentStep > step ? 'bg-black' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-sm font-light text-gray-500">
              {currentStep === 1 && 'Select Date & Time'}
              {currentStep === 2 && 'Project Details'}
              {currentStep === 3 && 'Your Information'}
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            {currentStep === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Calendar Section */}
                <div className="bg-gray-50 rounded-sm p-8 md:p-12">
                  <h2 className="text-2xl md:text-3xl font-normal text-black mb-8 uppercase tracking-tight">
                    Choose Your Time
                  </h2>

                  {/* Date Selection */}
                  <div className="mb-8">
                    <label className="block text-sm font-light text-gray-700 mb-4">
                      <Calendar className="h-4 w-4 inline mr-2" />
                      Select Date
                    </label>
                    <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                      {availableDates.slice(0, 20).map((date) => (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`p-4 text-left border transition-all duration-200 ${
                            selectedDate === date
                              ? 'border-black bg-black text-white'
                              : 'border-gray-200 bg-white text-black hover:border-gray-300'
                          }`}
                          style={{ borderRadius: '7px' }}
                        >
                          <div className="text-sm font-normal">
                            {new Date(date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="text-xs font-light opacity-75">
                            {new Date(date).toLocaleDateString('en-US', { 
                              year: 'numeric' 
                            })}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div className="mb-8">
                    <label className="block text-sm font-light text-gray-700 mb-4">
                      <Clock className="h-4 w-4 inline mr-2" />
                      Select Time
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-3 text-sm font-light border transition-all duration-200 ${
                            selectedTime === time
                              ? 'border-black bg-black text-white'
                              : 'border-gray-200 bg-white text-black hover:border-gray-300'
                          }`}
                          style={{ borderRadius: '7px' }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Appointment */}
                  {selectedDate && selectedTime && (
                    <div className="bg-black text-white p-6 rounded-sm">
                      <h3 className="text-lg font-normal mb-2">Selected Appointment</h3>
                      <p className="text-gray-300 font-light">
                        {new Date(selectedDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })} at {selectedTime}
                      </p>
                    </div>
                  )}
                </div>

                {/* What to Expect */}
                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-sm p-8">
                    <h3 className="text-xl font-normal text-black mb-6 uppercase tracking-tight">
                      What to Expect
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-normal text-black mb-1">Project Discovery</h4>
                          <p className="text-sm font-light text-gray-600">We'll discuss your goals, challenges, and vision</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-normal text-black mb-1">Strategic Insights</h4>
                          <p className="text-sm font-light text-gray-600">Get expert advice on your project approach</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-normal text-black mb-1">Next Steps</h4>
                          <p className="text-sm font-light text-gray-600">Clear roadmap for moving forward</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black text-white rounded-sm p-8">
                    <h3 className="text-xl font-normal mb-4 uppercase tracking-tight">
                      Why Choose StudioEyn?
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-gray-300" />
                        <span className="text-sm font-light">400+ Successful Projects</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Zap className="h-5 w-5 text-gray-300" />
                        <span className="text-sm font-light">10+ Years Experience</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-gray-300" />
                        <span className="text-sm font-light">Gulf Region Specialists</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-sm p-8 md:p-12">
                  <h2 className="text-2xl md:text-3xl font-normal text-black mb-8 uppercase tracking-tight text-center">
                    Tell Us About Your Project
                  </h2>

                  <form className="space-y-8">
                    {/* Project Type */}
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-4">
                        What type of project are you working on? *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projectTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, projectType: type.value }))}
                            className={`p-6 text-left border transition-all duration-200 ${
                              formData.projectType === type.value
                                ? 'border-black bg-black text-white'
                                : 'border-gray-200 bg-white text-black hover:border-gray-300'
                            }`}
                            style={{ borderRadius: '7px' }}
                          >
                            <h3 className="font-normal mb-2">{type.label}</h3>
                            <p className="text-sm font-light opacity-75">{type.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-4">
                        What's your project budget?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {budgetRanges.map((budget) => (
                          <button
                            key={budget.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, budget: budget.value }))}
                            className={`px-4 py-3 text-sm font-light border transition-all duration-200 ${
                              formData.budget === budget.value
                                ? 'border-black bg-black text-white'
                                : 'border-gray-200 bg-white text-black hover:border-gray-300'
                            }`}
                            style={{ borderRadius: '7px' }}
                          >
                            {budget.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-4">
                        When do you need this project completed?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {timelineOptions.map((timeline) => (
                          <button
                            key={timeline.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, timeline: timeline.value }))}
                            className={`px-4 py-3 text-sm font-light border transition-all duration-200 ${
                              formData.timeline === timeline.value
                                ? 'border-black bg-black text-white'
                                : 'border-gray-200 bg-white text-black hover:border-gray-300'
                            }`}
                            style={{ borderRadius: '7px' }}
                          >
                            {timeline.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Project Description */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-light text-gray-700 mb-4">
                        <MessageSquare className="h-4 w-4 inline mr-2" />
                        Project Description
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200 resize-none"
                        placeholder="Tell us about your project goals, challenges, and what you hope to achieve..."
                      />
                    </div>
                  </form>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-sm p-8 md:p-12">
                  <h2 className="text-2xl md:text-3xl font-normal text-black mb-8 uppercase tracking-tight text-center">
                    Your Contact Information
                  </h2>

                  {submitStatus === 'success' && (
                    <div className="mb-8 p-8 bg-black border border-gray-800 rounded-sm text-center">
                      <CheckCircle className="h-12 w-12 text-white mx-auto mb-6" />
                      <h3 className="text-xl font-normal text-white mb-4 uppercase tracking-wide">Call Booked Successfully!</h3>
                      <p className="text-gray-300 font-light leading-relaxed max-w-md mx-auto">
                        We've sent you a confirmation email with calendar details. We'll call you at the scheduled time.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-light text-gray-700 mb-2">
                          <User className="h-4 w-4 inline mr-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-light text-gray-700 mb-2">
                          <Mail className="h-4 w-4 inline mr-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-light text-gray-700 mb-2">
                          <Phone className="h-4 w-4 inline mr-2" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-light text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
                          placeholder="Your company"
                        />
                      </div>
                    </div>

                    {/* Appointment Summary */}
                    {selectedDate && selectedTime && (
                      <div className="bg-black text-white p-6 rounded-sm">
                        <h3 className="text-lg font-normal mb-4">Appointment Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-300">Date:</span>
                            <p className="font-light">
                              {new Date(selectedDate).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-300">Time:</span>
                            <p className="font-light">{selectedTime}</p>
                          </div>
                          {formData.projectType && (
                            <div>
                              <span className="text-gray-300">Project Type:</span>
                              <p className="font-light">
                                {projectTypes.find(t => t.value === formData.projectType)?.label}
                              </p>
                            </div>
                          )}
                          {formData.budget && (
                            <div>
                              <span className="text-gray-300">Budget:</span>
                              <p className="font-light">
                                {budgetRanges.find(b => b.value === formData.budget)?.label}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting || !selectedDate || !selectedTime || !formData.name || !formData.email}
                      className="w-full bg-black text-white px-8 py-4 font-normal disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 hover:bg-gray-900 transition-colors duration-200 uppercase whitespace-nowrap"
                      style={{ borderRadius: '7px' }}
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Calendar className="h-5 w-5" />
                          <span>Confirm Booking</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-8 py-4 border transition-all duration-300 uppercase font-normal ${
                  currentStep === 1
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-black text-black hover:bg-black hover:text-white'
                }`}
                style={{ borderRadius: '7px' }}
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && (!selectedDate || !selectedTime)) ||
                    (currentStep === 2 && !formData.projectType)
                  }
                  className={`px-8 py-4 transition-all duration-300 uppercase font-normal ${
                    (currentStep === 1 && (!selectedDate || !selectedTime)) ||
                    (currentStep === 2 && !formData.projectType)
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-900'
                  }`}
                  style={{ borderRadius: '7px' }}
                >
                  Next Step
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCallPage;