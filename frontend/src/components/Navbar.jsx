import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B2344]/95 backdrop-blur-md shadow-lg py-3.5 border-b border-white/10'
          : 'bg-[#0B2344] py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Positioning Tag (Clean text logo, no icon box) */}
          <Link to="/" className="flex items-center group">
            <div className="flex flex-col">
              <span className="text-white font-display font-black text-2xl tracking-wider leading-none">
                DENSE<span className="text-[#16B86A]">360</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-300 font-bold uppercase mt-1">
                Education Discovery Event
              </span>
            </div>
          </Link>

          {/* Right Action CTA Button Only (No Nav Links as per requirement) */}
          <div className="flex items-center gap-3">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#16B86A] hover:bg-[#129B58] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:shadow-green-600/30 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>FILL THE DETAILS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
