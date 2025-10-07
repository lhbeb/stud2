import { useScrollTrigger } from '../hooks/useScrollTrigger';

const testimonials = [
  {
    quote: "StudioEyn's strategic planning expertise helped us optimize our workforce management and forecasting systems. Their customer service approach and attention to detail made all the difference in our operational efficiency.",
    name: "Abdullah Benayan",
    title: "Strategic Planning Manager | Expert in Workforce Management and Forecasting | Customer Service Specialist",
    avatar: "https://i.ibb.co/FLkxZxsF/ah-banyan.jpg"
  },
  {
    quote: "StudioEyn's economic analysis and research approach helped us develop data-driven strategies for our scientific research initiatives. Their expertise in economic modeling and market research provided invaluable insights for our Kuwait Institute projects.",
    name: "Abdulghaphor Hajjieh",
    title: "Economist @ Kuwait Institute for Scientific Research",
    avatar: "https://i.ibb.co/gFdHRTNC/3d1842d8-c586-45a9-931b-c80be4d61548-1000158138.webp"
  },
  {
    quote: "StudioEyn's innovative approach and strategic vision helped us establish a strong foundation for oncyber.io. Their expertise in brand development and digital strategy was instrumental in our successful launch and growth in the Web3 space.",
    name: "Rayan Boutaleb",
    title: "Founder, oncyber.io",
    avatar: "https://i.ibb.co/mrynnT9S/1574694752157.jpg"
  },
  {
    quote: "StudioEyn's strategic brand positioning and creative excellence helped us establish FranchiseArt as a leading franchise development company. Their comprehensive approach to brand identity and market positioning was instrumental in our rapid expansion across multiple markets.",
    name: "Yousif AlHarbi",
    title: "CEO, FranchiseArt",
    avatar: "https://i.ibb.co/ymFRjFct/1673879629524.jpg"
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
          {[...testimonials, ...testimonials].map((testimonial, index) => (
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
