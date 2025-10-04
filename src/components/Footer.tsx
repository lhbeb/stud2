import { ArrowUp, Mail, MapPin, Linkedin, Twitter, Instagram, Github } from 'lucide-react';

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
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' },
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
                  style={{ borderRadius: '1px' }}
                >
                  Subscribe
                </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm font-light">
                © 2025 StudioEyn. All rights reserved.
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
                    style={{ borderRadius: '1px' }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              <button
                onClick={scrollToTop}
                className="p-2 bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                style={{ borderRadius: '1px' }}
                aria-label="Back to top"
              >
                <ArrowUp className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;