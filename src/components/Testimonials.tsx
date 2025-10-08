import { useScrollTrigger } from '../hooks/useScrollTrigger';

const testimonials = [
  {
    quote: "Really impressed with how fast they turned around our rebrand. The logo and visual identity they created actually made sense for our business.",
    name: "Abdullah Benayan",
    title: "Strategic Planning Manager",
    avatar: "https://i.ibb.co/FLkxZxsF/ah-banyan.jpg"
  },
  {
    quote: "Professional team that delivered exactly what we needed. Clear communication throughout the project.",
    name: "Abdulghaphor Hajjieh",
    title: "Economist @ Kuwait Institute for Scientific Research",
    avatar: "https://i.ibb.co/gFdHRTNC/3d1842d8-c586-45a9-931b-c80be4d61548-1000158138.webp"
  },
  {
    quote: "Helped us launch oncyber with a solid brand foundation. They understood Web3 which was crucial.",
    name: "Rayan Boutaleb",
    title: "Founder, oncyber.io",
    avatar: "https://i.ibb.co/mrynnT9S/1574694752157.jpg"
  },
  {
    quote: "Great work on our franchise branding. Made it easy to scale across different markets.",
    name: "Yousif AlHarbi",
    title: "CEO, FranchiseArt",
    avatar: "https://i.ibb.co/ymFRjFct/1673879629524.jpg"
  },
  {
    quote: "Clean, modern design that elevated our brand. Would work with them again.",
    name: "Youssef Meskaoui",
    title: "Founder, grandecharte.co",
    avatar: "https://i.ibb.co/hx0Rk6Sn/89175967-926607661125082-6144394623272878080-n.jpg"
  },
  {
    quote: "They really got my vision as an artist. The portfolio site they designed perfectly showcases my work.",
    name: "Jihad Eliassa",
    title: "Artist, eliassa.com",
    avatar: "https://i.ibb.co/svSBj8nk/1678787254750.jpg"
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
        <div className={`mb-16 md:mb-24 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal text-black leading-tight uppercase tracking-tight mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl">
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
          {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full sm:w-80 md:w-96 mx-4 bg-white border border-gray-100 rounded-sm p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Header with Avatar and Name */}
              <div className="flex items-center mb-6">
                {/* Circular Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 mr-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Name and Title */}
                <div className="flex-1">
                  <p className="font-normal text-black text-sm mb-1">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-xs font-light">
                    {testimonial.title}
                  </p>
                </div>
              </div>
              
              {/* Testimonial Quote */}
              <div>
                <p className="text-gray-700 font-light leading-relaxed text-base">
                  "{testimonial.quote}"
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
