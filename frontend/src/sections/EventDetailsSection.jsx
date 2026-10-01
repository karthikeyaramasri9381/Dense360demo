import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Sun, Sunset, CheckCircle2 } from 'lucide-react';

export default function EventDetailsSection() {
  const forList = [
    "Class 10 Students",
    "Parents",
    "Intermediate Colleges",
    "Principals",
    "Academic Leaders",
    "Education Guests"
  ];

  return (
    <section className="py-20 bg-[#0B2344] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-4xl mx-auto rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-12 backdrop-blur-xl shadow-2xl space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-[#16B86A]/20 text-[#16B86A] text-xs font-black tracking-widest uppercase border border-[#16B86A]/30">
              Event Details Summary
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-white">
              DENSE360 2026
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-slate-200 pt-2">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#16B86A]" /> November 7, 2026
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#16B86A]" /> Hyderabad
              </span>
            </div>
            <p className="text-xs uppercase font-extrabold text-[#16B86A] tracking-widest pt-1">
              ONE DAY • MULTIPLE COLLEGES • DIRECT INTERACTION
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/10">
            
            {/* For Audience */}
            <div className="space-y-4">
              <h3 className="text-lg font-display font-extrabold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-[#16B86A]" /> Who It Is For:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {forList.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-300 text-xs font-semibold p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16B86A] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Event Format */}
            <div className="space-y-4">
              <h3 className="text-lg font-display font-extrabold text-white">
                Event Format:
              </h3>
              
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#16B86A] uppercase">
                  <Sun className="w-4 h-4" /> MORNING PROGRAMME
                </div>
                <p className="text-sm font-bold text-white">
                  Expert & Principal Sessions
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-xs font-extrabold text-amber-400 uppercase">
                  <Sunset className="w-4 h-4" /> AFTERNOON PROGRAMME
                </div>
                <p className="text-sm font-bold text-white">
                  College Stalls & Direct Interaction
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
