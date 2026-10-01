import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Mail, MapPin, Award, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#061325] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#16B86A] flex items-center justify-center font-display font-extrabold text-white text-base">
                360
              </div>
              <span className="text-2xl font-display font-black tracking-wider text-white">
                DENSE<span className="text-[#16B86A]">360</span>
              </span>
            </div>
            <p className="text-[#16B86A] font-semibold text-sm tracking-wide">
              Connecting Schools. Engaging Students. Creating Opportunities.
            </p>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              DENSE360 is a student-focused education experience platform designed to complement classroom learning with practical, collaborative, and creative skill-building programmes.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16B86A]" /> Institutional Partner Platform
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#hero" className="text-slate-300 hover:text-[#16B86A] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#concept360" className="text-slate-300 hover:text-[#16B86A] transition-colors">
                  360° Concept
                </a>
              </li>
              <li>
                <a href="#offerings" className="text-slate-300 hover:text-[#16B86A] transition-colors">
                  What We Offer
                </a>
              </li>
              <li>
                <a href="#schools" className="text-slate-300 hover:text-[#16B86A] transition-colors">
                  Benefits to Schools
                </a>
              </li>
              <li>
                <a href="#journey" className="text-slate-300 hover:text-[#16B86A] transition-colors">
                  Student Journey
                </a>
              </li>
              <li>
                <Link to="/certificate/verify" className="text-[#16B86A] hover:underline flex items-center gap-1.5 font-medium">
                  <Award className="w-3.5 h-3.5" /> Verify Certificate
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Registration & Legal */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-4">
              Student Registration
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Ready to take part? Complete your registration to begin your DENSE360 journey.
            </p>
            <Link
              to="/register"
              className="inline-block w-full text-center py-2.5 px-4 rounded-xl bg-[#16B86A] hover:bg-[#129B58] text-white font-bold text-xs shadow-md transition-all"
            >
              FILL THE DETAILS
            </Link>
            
            <div className="mt-6 pt-4 border-t border-white/5 space-y-1.5 text-xs text-slate-400">
              <span className="block hover:text-slate-300 cursor-pointer">Privacy Policy</span>
              <span className="block hover:text-slate-300 cursor-pointer">Participation Terms</span>
              <span className="block hover:text-slate-300 cursor-pointer">School Support Desk</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DENSE360. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Know Your Options. Choose Your Path.</span>
            <Link to="/admin/login" className="text-slate-600 hover:text-slate-400 text-[11px]">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
