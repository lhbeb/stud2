import { ArrowUp, Mail, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    services: [
      { name: 'Brand Identity', href: '#services' },
      { name: 'UI/UX Design', href: '#services' },
      { name: 'Full-Stack Development', href: '#services' },
      { name: 'Design Strategy', href: '#services' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Work', href: '#work' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#contact' },
    ],
  };

  const socialLinks = [
    { 
      name: 'Behance', 
      href: '#', 
      label: 'Behance',
      customSvg: true
    },
    { 
      icon: Instagram, 
      href: '#', 
      label: 'Instagram',
      customSvg: false
    },
    { 
      icon: Twitter, 
      href: '#', 
      label: 'Twitter',
      customSvg: false
    },
    { 
      icon: Linkedin, 
      href: '#', 
      label: 'LinkedIn',
      customSvg: false
    },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="lg:col-span-2">
            <img
              src="/logostudioeyn.svg"
              alt="StudioEyn Logo"
              className="h-12 w-auto mb-8 brightness-0 invert"
            />
            <p className="text-gray-300 mb-8 max-w-md font-light leading-relaxed">
              A Casablanca-based creative agency crafting iconic brands and digital experiences for clients across the Middle East and Gulf region.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300 font-light">Casablanca, Morocco</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300 font-light">contact@studioeyn.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-normal text-white mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-light"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-normal text-white mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-light"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div>
              <h3 className="text-xl font-normal text-white mb-2">Stay Updated</h3>
              <p className="text-gray-300 font-light">
                Get the latest design trends and insights delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 bg-gray-900 border border-gray-700 rounded-sm text-white font-light
                         focus:ring-2 focus:ring-white focus:border-transparent transition-colors duration-200"
              />
              <button 
                  className="px-6 py-3 bg-white text-black font-semibold hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap"
                  style={{ borderRadius: '2px' }}
                >
                  Subscribe
                </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm font-light">
                © 2025 StudioEyn. All rights reserved.
              </p>
            </div>

            {/* Social Icons - Minimal Design Studio Style */}
            <div className="flex items-center gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="group flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.customSvg ? (
                    // Behance Icon
                    <svg className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                    </svg>
                  ) : (
                    <social.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  )}
                </a>
              ))}
              
              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="w-10 h-10 flex items-center justify-center bg-white text-black hover:bg-gray-100 transition-colors duration-300"
                style={{ borderRadius: '2px' }}
                aria-label="Back to top"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;