import { useScrollTrigger } from '../hooks/useScrollTrigger';

const testimonials = [
  {
    quote: "StudioEyn transformed our brand identity completely. Their strategic approach resulted in a visual identity that perfectly captures our luxury hospitality brand.",
    name: "Ahmed Al-Rashid",
    title: "CEO, Luxury Hotels Group",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "Working with StudioEyn on our fintech platform was exceptional. They delivered a user-friendly interface that our customers love, and their Gulf market understanding is impressive.",
    name: "Fatima Al-Zahra",
    title: "Product Manager, FinTech Startup",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "The e-commerce redesign by StudioEyn increased our conversion rates by 40%. Their UX expertise helped us stand out in the competitive Gulf retail market.",
    name: "Omar Benali",
    title: "Marketing Director, Retail Brand",
    avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "StudioEyn's strategic brand positioning helped us secure Series A funding. Their comprehensive strategy positioned us perfectly for growth in Qatar's tech ecosystem.",
    name: "Layla Mansouri",
    title: "Founder, Tech Startup",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "The healthcare platform developed by StudioEyn streamlined our operations significantly. Their development expertise and healthcare workflow understanding is remarkable.",
    name: "Dr. Khalid Al-Mahmoud",
    title: "Director, Healthcare Group",
    avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "StudioEyn delivered a complete digital transformation for our real estate portfolio. Their modern approach and attention to detail exceeded our expectations.",
    name: "Sarah Al-Mansoori",
    title: "CEO, Emirates Properties",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
  },
];

export function Testimonials() {
  const { elementRef, isVisible } = useScrollTrigger();

  return (
    <section 
      id="testimonials"
      className="py-16 md:py-32 bg-white overflow-hidden"
      ref={elementRef}
    >
      <div className="container-custom">
        <div className={`text-center mb-16 md:mb-24 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal text-black leading-tight uppercase tracking-tight mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Trusted by brands across the Middle East and Gulf region for strategic design and development solutions.
          </p>
        </div>
      </div>
      
      <div className={`relative overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-scroll hover:pause-animation">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full sm:w-80 md:w-96 mx-4 bg-white border border-gray-100 rounded-sm p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 font-light leading-relaxed text-base text-center">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="border-t border-gray-100 pt-4 text-center">
                <p className="font-normal text-black text-sm mb-1">
                  {testimonial.name}
                </p>
                <p className="text-gray-500 text-sm font-light">
                  {testimonial.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
