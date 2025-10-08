import { useScrollTrigger } from '../hooks/useScrollTrigger';

const LocationFocus: React.FC = () => {
  const { elementRef, isVisible } = useScrollTrigger();

  return (
    <section 
      id="location-focus" 
      className="py-16 md:py-24 bg-black text-white overflow-hidden"
      ref={elementRef}
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div className={`space-y-8 md:space-y-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            
            {/* Opening Statement */}
            <div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight">
                <span className="text-white">Global Reach,</span>
                <br />
                <span className="text-gray-300">Gulf Focus</span>
              </h2>
            </div>

            {/* Divider */}
            <div className={`flex justify-center transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}>
              <div className="w-24 h-px bg-white/30"></div>
            </div>

            {/* Main Description */}
            <div className={`transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-200 max-w-3xl mx-auto">
                With studios in <span className="text-white font-normal">Casablanca</span> and 
                <span className="text-white font-normal"> London</span>, we specialize in 
                creating exceptional brand experiences for clients across the 
                <span className="text-white font-normal"> Middle East and Gulf region</span>.
              </p>
            </div>

            {/* Key Markets */}
            <div className={`transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-2xl mx-auto">
                {['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain'].map((country, index) => (
                  <div key={country} className="text-center">
                    <div className="text-sm text-gray-400 font-light uppercase tracking-wide">
                      {country}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10 transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-light text-white mb-1">400+</div>
                <div className="text-xs text-gray-400 font-light uppercase tracking-wide">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-light text-white mb-1">15+</div>
                <div className="text-xs text-gray-400 font-light uppercase tracking-wide">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-light text-white mb-1">10+</div>
                <div className="text-xs text-gray-400 font-light uppercase tracking-wide">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-light text-white mb-1">2</div>
                <div className="text-xs text-gray-400 font-light uppercase tracking-wide">Offices</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationFocus;