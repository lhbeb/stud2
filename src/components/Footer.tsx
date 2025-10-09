import { ArrowUp, Mail, MapPin, Phone, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { 
      name: 'Behance', 
      href: 'https://www.behance.net/studioeiyn', 
      label: 'Behance',
      customSvg: true
    },
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/studioeiyn/', 
      label: 'Instagram',
      customSvg: false
    },
    { 
      icon: Twitter, 
      href: 'https://x.com/studioeiyn', 
      label: 'X (Twitter)',
      customSvg: false
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/studioeyn', 
      label: 'LinkedIn',
      customSvg: false
    },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Brand Section */}
          <div>
            <img
              src="/logostudioeyn.svg"
              alt="StudioEyn Logo"
              className="h-12 w-auto mb-8 brightness-0 invert"
            />
            <p className="text-gray-300 mb-8 max-w-md font-light leading-relaxed">
              A Casablanca-based creative agency crafting iconic brands and digital experiences for clients across the Middle East and Gulf region.
            </p>
          </div>

          {/* Contact Information and Office Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h3 className="text-lg font-medium text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-gray-300 font-light">contact@studioeyn.com</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-gray-300 font-light">+212 609-032130</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-6">Office Locations</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="text-gray-300 font-light">
                    <div className="font-medium text-white mb-1">Casablanca Office</div>
                    <div>Lot. la colline - Sidi Maarouf</div>
                    <div>Casablanca 20190, Morocco</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="text-gray-300 font-light">
                    <div className="font-medium text-white mb-1">London Office</div>
                    <div>STUDIOEYN LTD</div>
                    <div>14 St Martin's Ct</div>
                    <div>London WC2N 4AU, UK</div>
                  </div>
                </div>
              </div>
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