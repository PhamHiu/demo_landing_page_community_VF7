import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" onClick={(e) => handleLinkClick(e, '/')} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1A73E8] to-[#00D2D3] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">VF7</span>
            </div>
            <span className="hidden md:block font-bold text-xl text-[#2D3436]">VinFast VF7</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`relative transition-colors ${isActive(link.path)
                  ? 'text-[#1A73E8]'
                  : 'text-[#2D3436] hover:text-[#1A73E8]'
                  }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <div className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-[#1A73E8]" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gradient-to-r from-[#1A73E8] to-[#00D2D3] text-white rounded-full hover:shadow-lg transition-all inline-block"
            >
              Tham gia
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-3 transition-colors ${isActive(link.path)
                  ? 'text-[#1A73E8] font-medium'
                  : 'text-[#2D3436]'
                  }`}
                onClick={(e) => handleLinkClick(e, link.path)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-[#1A73E8] to-[#00D2D3] text-white rounded-full hover:shadow-lg transition-all inline-block text-center"
            >
              Tham gia
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}