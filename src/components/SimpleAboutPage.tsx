import React from 'react';
import { ArrowRight, Users, Lightbulb, Target, Award, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const SimpleAboutPage: React.FC = () => {
  const elementRef = React.useRef<HTMLElement>(null);
  const isVisible = true;

  const values = [
    {
      icon: Lightbulb,
      title: 'Vision',
      description: 'To see what others overlook, to perceive the essential truth of a brand, and to envision futures that feel both inevitable and extraordinary.'
    },
    {
      icon: Target,
      title: 'Mission',
      description: 'Crafting identities that don\'t just exist in the market, but shape it through strategic, aesthetic, and cultural resonance.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Every color, typeface, and compositional choice is purposeful—contributing to a larger system that feels inevitable once realized.'
    }
  ];

  const teamBenefits = [
    'Competitive salary and benefits',
    'Flexible working arrangements',
    'Professional development opportunities',
    'Creative freedom and autonomy',
    'Collaborative team environment',
    'Opportunity to work on diverse projects'
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal text-black leading-tight uppercase tracking-tight mb-8">
              About StudioEyn
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
              A multidisciplinary design practice specializing in transformative brand experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section - Black */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container-custom max-w-4xl mx-auto">
          <div className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-normal uppercase tracking-tight mb-8">
              Our Story
            </h2>
            <p className="text-lg text-gray-300 font-light leading-relaxed mb-6">
              Studio Eyn was founded by Abdeljebbar Bouftih and Elmehdi El Mahboubi, two visionaries who recognized the need for brands that transcend conventional boundaries. Our name, derived from the Arabic word for "eye," reflects our fundamental approach: to see what others overlook, to perceive the essential truth of a brand, and to envision futures that feel both inevitable and extraordinary.
            </p>
            <p className="text-lg text-gray-300 font-light leading-relaxed">
              We operate at the intersection of strategy, aesthetics, and cultural resonance, crafting identities that don't just exist in the market, but shape it.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section - Black */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container-custom max-w-4xl mx-auto">
          <div className={`transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-normal uppercase tracking-tight mb-8">
              What We Do
            </h2>
            <p className="text-lg text-gray-300 font-light leading-relaxed mb-6">
              Our work spans the full spectrum of brand creation and evolution. From foundational identity systems to comprehensive brand guidelines, we build visual languages that are both intellectually rigorous and emotionally compelling.
            </p>
            <p className="text-lg text-gray-300 font-light leading-relaxed mb-6">
              Each project is an exercise in distillation: capturing the essence of what makes a brand singular, then translating that into every touchpoint, every campaign, every moment of encounter.
            </p>
            <p className="text-lg text-gray-300 font-light leading-relaxed">
              We approach marketing not as amplification, but as storytelling with intention. Our campaigns are designed to create dialogue rather than noise—engaging audiences through narratives that feel authentic, considered, and unmistakably deliberate.
            </p>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section - White */}
      <section className="py-16 md:py-24 bg-white text-black">
        <div className="container-custom max-w-4xl mx-auto">
          <div className={`transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-normal uppercase tracking-tight mb-8">
              Our Philosophy
            </h2>
            <p className="text-lg text-gray-700 font-light leading-relaxed">
              At Studio Eyn, we believe that exceptional branding is an act of clarity. In a world saturated with visual stimulus, we create work that commands attention through sophistication rather than volume. Our process is collaborative and meticulous, balancing creative exploration with strategic precision. We don't follow trends; we identify the timeless elements that will allow a brand to evolve without losing its center.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section - White */}
      <section className="py-16 md:py-24 bg-white text-black">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-normal uppercase tracking-tight mb-12 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {values.map((value, index) => (
              <div 
                key={index} 
                className={`text-center transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <value.icon className="h-12 w-12 text-black mx-auto mb-4" />
                <h3 className="text-xl font-normal uppercase tracking-wide mb-2">
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

      {/* The StudioEyn Difference Section - Black */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container-custom max-w-4xl mx-auto">
          <div className={`transition-all duration-700 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-normal uppercase tracking-tight mb-8">
              The StudioEyn Difference
            </h2>
            <p className="text-lg text-gray-300 font-light leading-relaxed mb-6">
              We are curators of coherence. Whether developing a complete brand ecosystem from inception or refining an established identity, our work is distinguished by its conceptual depth and executional excellence.
            </p>
            <p className="text-lg text-gray-300 font-light leading-relaxed">
              For businesses ready to transcend category conventions and establish a truly distinctive presence, Studio Eyn offers more than design services. We offer partnership in building brands that endure.
            </p>
          </div>
        </div>
      </section>

      {/* Join Our Team Section - Black */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container-custom max-w-4xl mx-auto">
          <div className={`border-t border-gray-700 pt-12 transition-all duration-700 delay-900 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-normal uppercase tracking-tight mb-6 text-white">
              Join Our Team
            </h2>
            <p className="text-lg text-gray-300 font-light leading-relaxed mb-8">
              We're always looking for talented individuals who share our passion for exceptional design and strategic thinking. If you're ready to make an impact, we'd love to hear from you.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <ul className="space-y-3 text-gray-300 font-light">
                {teamBenefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-white" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 text-gray-300 font-light">
                {teamBenefits.slice(3).map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-white" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/email"
                className="flex items-center justify-center space-x-3 px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 uppercase"
                style={{ borderRadius: '2px' }}
              >
                <Mail className="h-5 w-5" />
                <span>Send Your Application</span>
              </Link>
              
              <Link
                to="/book-call"
                className="flex items-center justify-center space-x-3 px-8 py-4 bg-white text-black hover:bg-gray-100 transition-all duration-300 uppercase"
                style={{ borderRadius: '2px' }}
              >
                <Users className="h-5 w-5" />
                <span>Schedule a Call</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimpleAboutPage;
