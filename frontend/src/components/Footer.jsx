import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#061325] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Main Brand & Positioning */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="text-2xl font-display font-black tracking-wider text-white">
                DENSE<span className="text-[#16B86A]">360</span>
              </span>
              <span className="text-xs text-slate-300 font-bold uppercase tracking-widest mt-1">
                Education Discovery Event
              </span>
            </div>
            
            <p className="text-[#16B86A] font-bold text-base tracking-wide">
              ONE EVENT. MULTIPLE COLLEGES. ONE CLEARER DECISION.
            </p>

            <p className="text-slate-300 text-sm max-w-lg leading-relaxed">
              DENSE360 is an education discovery event bringing multiple Intermediate colleges together under one roof to help Class 10 students and parents explore pathways, ask questions, compare options, and decide with clarity.
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Calendar className="w-4 h-4 text-[#16B86A]" /> November 7, 2026
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <MapPin className="w-4 h-4 text-[#16B86A]" /> Hyderabad
              </span>
            </div>
          </div>

          {/* Col 3: Event Focus */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-4">
              Connecting
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>Class 10 Students</li>
              <li>Parents & Families</li>
              <li>Intermediate Colleges</li>
              <li>Principals & Academic Leaders</li>
              <li>Education Experts & Guests</li>
            </ul>
          </div>

          {/* Col 4: Registration CTA */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-4">
              Student Registration
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Participate in the event. Complete your details to explore your college options.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 w-full text-center py-3 px-4 rounded-xl bg-[#16B86A] hover:bg-[#129B58] text-white font-bold text-xs shadow-md transition-all"
            >
              <span>FILL THE DETAILS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="mt-6 pt-4 border-t border-white/5 flex flex-col gap-1 text-xs text-slate-400">
              <Link to="/certificate/verify" className="hover:text-[#16B86A] transition-colors">
                Verify Certificate
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} DENSE360. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-300 font-medium">Connecting Students, Parents & Colleges.</span>
            <Link to="/admin/login" className="text-slate-500 hover:text-slate-300 text-[11px] underline">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
