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

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

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
          selectedDate,
          selectedTime
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: ''
        });
        setSelectedDate('');
        setSelectedTime('');
      } else {
        setSubmitStatus('error');
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
    window.scrollTo(0, 0);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedDate && selectedTime;
      case 2:
        return formData.projectType;
      case 3:
        return formData.name && formData.email;
      default:
        return false;
    }
  };

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();
  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const projectTypes = [
    { value: 'brand-identity', label: 'Brand Identity' },
    { value: 'ui-ux-design', label: 'UI/UX Design' },
    { value: 'full-stack-development', label: 'Full-Stack Development' },
    { value: 'design-strategy', label: 'Design Strategy' },
    { value: 'other', label: 'Other' }
  ];

  const budgetRanges = [
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: 'over-50k', label: 'Over $50,000' }
  ];

  const timelineOptions = [
    { value: 'asap', label: 'ASAP' },
    { value: '1-month', label: '1 Month' },
    { value: '2-3-months', label: '2-3 Months' },
    { value: '3-6-months', label: '3-6 Months' },
    { value: 'flexible', label: 'Flexible' }
  ];

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-normal text-black mb-6 uppercase tracking-tight">
              Call Booked Successfully!
            </h1>
            <p className="text-lg text-gray-600 font-light mb-8">
              Thank you for booking a call with StudioEyn. We'll send you a confirmation email shortly with the meeting details.
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
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-black leading-tight uppercase tracking-tight mb-4">
              Book Your Free Call
            </h1>
            <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto mb-6">
              Schedule a free 30-minute consultation with StudioEyn to discuss your project.
            </p>
            
            {/* Progress Steps */}
            <div className="flex justify-center items-center space-x-4 mb-4">
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

          {/* Main Content - Step-based Layout */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Date & Time Selection */}
              {currentStep === 1 && (
                <div className="bg-gray-50 rounded-sm p-6 md:p-8 transition-all duration-500">
                  <h2 className="text-xl md:text-2xl font-normal text-black mb-6 uppercase tracking-tight">
                    <Calendar className="h-5 w-5 inline mr-2" />
                    Select Date & Time
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date Selection */}
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-3">
                        Available Dates
                      </label>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                        {availableDates.slice(0, 10).map((date) => (
                          <button
                            key={date}
                            type="button"
                            onClick={() => setSelectedDate(date)}
                            className={`p-3 text-left border transition-all duration-200 ${
                              selectedDate === date
                                ? 'border-black bg-black text-white'
                                : 'border-gray-200 bg-white text-black hover:border-gray-300'
                            }`}
                            style={{ borderRadius: '2px' }}
                          >
                            <div className="text-sm font-normal">
                              {new Date(date).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-3">
                        Available Times
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 text-center border transition-all duration-200 ${
                              selectedTime === time
                                ? 'border-black bg-black text-white'
                                : 'border-gray-200 bg-white text-black hover:border-gray-300'
                            }`}
                            style={{ borderRadius: '2px' }}
                          >
                            <div className="text-sm font-normal">{time}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <div className="bg-gray-50 rounded-sm p-6 md:p-8 transition-all duration-500">
                  <h2 className="text-xl md:text-2xl font-normal text-black mb-6 uppercase tracking-tight">
                    <Users className="h-5 w-5 inline mr-2" />
                    Project Details
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Project Type */}
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">
                        Project Type *
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((budget) => (
                          <option key={budget.value} value={budget.value}>
                            {budget.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map((timeline) => (
                          <option key={timeline.value} value={timeline.value}>
                            {timeline.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Information */}
              {currentStep === 3 && (
                <div className="bg-gray-50 rounded-sm p-6 md:p-8 transition-all duration-500">
                  <h2 className="text-xl md:text-2xl font-normal text-black mb-6 uppercase tracking-tight">
                    <User className="h-5 w-5 inline mr-2" />
                    Your Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">
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

                    {/* Company */}
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-6">
                    <label className="block text-sm font-light text-gray-700 mb-2">
                      <MessageSquare className="h-4 w-4 inline mr-2" />
                      Project Description
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-black font-light focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200 resize-none"
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 border transition-all duration-300 uppercase tracking-wide ${
                    currentStep === 1
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-black text-black hover:bg-black hover:text-white'
                  }`}
                  style={{ borderRadius: '2px' }}
                >
                  Previous
                </button>

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!canProceedToNext()}
                    className={`px-8 py-3 transition-all duration-300 uppercase tracking-wide ${
                      canProceedToNext()
                        ? 'bg-black text-white hover:bg-gray-900'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !canProceedToNext()}
                    className={`px-8 py-3 transition-all duration-300 uppercase tracking-wide ${
                      canProceedToNext() && !isSubmitting
                        ? 'bg-black text-white hover:bg-gray-900'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    {isSubmitting ? 'Booking Call...' : 'Book Free Call'}
                  </button>
                )}
              </div>

              {submitStatus === 'error' && (
                <div className="text-center mt-6">
                  <p className="text-red-600 font-light">
                    There was an error booking your call. Please try again or contact us directly.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCallPage;