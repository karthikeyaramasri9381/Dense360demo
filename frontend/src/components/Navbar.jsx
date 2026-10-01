import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Experience', id: 'concept360' },
    { name: 'Activities', id: 'offerings' },
    { name: 'For Schools', id: 'schools' },
    { name: 'Events', id: 'journey' },
    { name: 'Contact', id: 'footer' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B2344]/95 backdrop-blur-md shadow-lg py-3.5 border-b border-white/10'
          : 'bg-[#0B2344] py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#16B86A] to-[#0E7D46] flex items-center justify-center shadow-md shadow-green-900/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-display font-extrabold text-lg tracking-wider">360</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-display font-black text-xl tracking-wider leading-none">
                DENSE<span className="text-[#16B86A]">360</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-300 font-medium uppercase mt-0.5">
                Education Experience
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-slate-200 hover:text-[#16B86A] font-medium text-sm transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#16B86A] hover:bg-[#129B58] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:shadow-green-600/30 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>FILL THE DETAILS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/register"
              className="px-3 py-1.5 rounded-full bg-[#16B86A] text-white font-bold text-xs"
            >
              REGISTER
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B2344] border-t border-white/10 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="block py-2 text-base font-medium text-slate-200 hover:text-[#16B86A] hover:pl-2 transition-all"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10">
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#16B86A] text-white font-bold text-sm shadow-md"
            >
              <span>FILL THE DETAILS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
