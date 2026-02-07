import { Link, useLocation } from 'react-router';
import { Menu, X, Facebook } from 'lucide-react';
import { useState } from 'react';

const ZaloIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 500 500" fill="currentColor" className={className}>
    <path d="M428.14 71.86C380.6 24.32 317.41 0 250 0 112 0 0 112 0 250c0 67.41 24.32 130.61 71.86 178.14C119.39 475.68 182.59 500 250 500c67.41 0 130.61-24.32 178.14-71.86C475.68 380.61 500 317.41 500 250c0-67.41-24.32-130.6-71.86-178.14zm-143.25 358.8H184.2c-5.8 0-10.5-4.7-10.5-10.5V368c0-5.8 4.7-10.5 10.5-10.5h16.2c3.5 0 6.6-2 8.1-5.2l20.4-44.2h-63.5l-6.4 14.8c-2.3 5.3-7.5 8.7-13.3 8.7h-18.4c-9.6 0-16.3-9.1-13.3-17.9l46.4-135.4c1.8-5.3 6.9-8.9 12.5-8.9h23.1c5.9 0 11.2 3.9 12.8 9.6l43.2 153.3c2.6 9.2-4.4 18.5-13.9 18.2l-53.1.1zm154.2 0h-57.8c-5.8 0-10.5-4.7-10.5-10.5v-10.8c0-5.8 4.7-10.5 10.5-10.5h33.8v-28.7H384c-5.8 0-10.5-4.7-10.5-10.5v-11.3c0-5.8 4.7-10.5 10.5-10.5h31.8v-27.4h-33.8c-5.8 0-10.5-4.7-10.5-10.5v-11.3c0-5.8 4.7-10.5 10.5-10.5h57.8c5.8 0 10.5 4.7 10.5 10.5v132.8c-0.1 5.7-4.8 10.4-10.6 10.4z" />
    <path d="M228.6 308.1h30c5.8 0 10.5-4.7 10.5-10.5v-132.8c0-5.8-4.7-10.5-10.5-10.5h-30c-5.8 0-10.5 4.7-10.5 10.5v132.8c0 5.8 4.7 10.5 10.5 10.5zm-59.3-75.1l7.8-19.1h25.8l7.8 19.1h-41.4z" />
  </svg>
);

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Trang chủ' },
    { path: '/map', label: 'Bản đồ' },
    { path: '/community', label: 'Cộng đồng' },
    { path: '/news', label: 'Tin tức' },
    { path: '/contact', label: 'Liên hệ' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    if (location.pathname === path) {
      e.preventDefault();

      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Wait 1 second (1000ms) for the scroll to finish (or mostly finish) before reloading
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    // For mobile menu
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1C1C1C]/90 backdrop-blur-md border-b border-[#2E2E2E]">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" onClick={(e) => handleLinkClick(e, '/')} className="flex items-center space-x-2">
            <img
              src="/logo-vf7.svg"
              alt="VF7 Community Logo"
              className="h-10 w-auto"
            />
            <span className="hidden md:block font-bold text-xl text-white">VinFast VF7</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`relative transition-colors ${isActive(link.path)
                  ? 'text-[#D4AF37]'
                  : 'text-[#E0E0E0] hover:text-[#D4AF37]'
                  }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <div className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-[#D4AF37]" />
                )}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A3A3A3] hover:text-[#1877F2] transition-colors"
              title="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://zalo.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A3A3A3] hover:text-[#0068FF] transition-colors"
              title="Zalo"
            >
              <ZaloIcon className="w-6 h-6" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#2E2E2E]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-3 transition-colors ${isActive(link.path)
                  ? 'text-[#D4AF37] font-medium'
                  : 'text-[#E0E0E0]'
                  }`}
                onClick={(e) => handleLinkClick(e, link.path)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Social Icons */}
            <div className="flex items-center justify-center gap-6 py-4 border-t border-[#2E2E2E] mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#A3A3A3] hover:text-[#1877F2]"
              >
                <Facebook size={24} />
                <span className="font-medium">Facebook</span>
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#A3A3A3] hover:text-[#0068FF]"
              >
                <ZaloIcon className="w-6 h-6" />
                <span className="font-medium">Zalo</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}