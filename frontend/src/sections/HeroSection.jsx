import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, CheckCircle2, Sparkles, Building2, Users, HelpCircle, Compass } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0B2344] overflow-hidden text-white">
      {/* Background Decorative Gradients & Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#16B86A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#16B86A]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#0E7D46]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Event Info Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#16B86A] animate-pulse" />
              <span className="text-xs font-bold tracking-wider text-slate-200 uppercase flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#16B86A]" /> NOVEMBER 7, 2026
                <span className="text-white/40">•</span>
                <MapPin className="w-3.5 h-3.5 text-[#16B86A]" /> HYDERABAD
              </span>
            </motion.div>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="block text-xs uppercase font-extrabold text-[#16B86A] tracking-[0.2em] mb-2">
                Class 10 Education Discovery Event
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-none text-white">
                DENSE<span className="text-[#16B86A]">360</span>
              </h1>
            </motion.div>

            {/* Positioning Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2"
            >
              <p className="text-2xl sm:text-3xl font-display font-extrabold text-[#16B86A] leading-tight">
                ONE EVENT. MULTIPLE COLLEGES. ONE CLEARER DECISION.
              </p>
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed"
            >
              After Class 10, choosing the right Intermediate college and stream can feel confusing. Instead of visiting college after college, explore multiple options at DENSE360 — all in one place, on one day.
            </motion.p>

            {/* Action Bar & Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#16B86A] hover:bg-[#129B58] text-white font-extrabold text-base shadow-xl shadow-green-900/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span>FILL THE DETAILS</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <a
                href="#what-is-dense"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-bold text-sm transition-all"
              >
                <span>EXPLORE DENSE360</span>
              </a>
            </motion.div>

            {/* Hero Supporting Line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xs sm:text-sm text-slate-400 font-medium pt-2 italic"
            >
              Meet colleges. Explore streams. Ask questions. Compare options. Make your next decision with clarity.
            </motion.p>
          </div>

          {/* Right Column: Hero Visual Event Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-3xl bg-gradient-to-b from-white/10 to-white/5 p-6 sm:p-8 border border-white/15 backdrop-blur-xl shadow-2xl"
            >
              {/* Event Badge Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#16B86A] flex items-center justify-center text-white shadow-lg">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">Intermediate College Stalls</h3>
                    <p className="text-slate-300 text-xs">Direct interactions under one roof</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#16B86A]/20 text-[#16B86A] text-xs font-bold border border-[#16B86A]/30">
                  HYDERABAD
                </span>
              </div>

              {/* Event Interaction Visual Highlights */}
              <div className="py-6 space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#16B86A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-bold text-sm">Students & Parents</h4>
                    <p className="text-slate-300 text-xs mt-0.5">Meet college representatives & principals directly</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Compass className="w-5 h-5 text-[#16B86A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-bold text-sm">Streams & Pathways</h4>
                    <p className="text-slate-300 text-xs mt-0.5">Explore MPC, BiPC, MEC, CEC and special combinations</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#16B86A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-bold text-sm">Ask & Compare</h4>
                    <p className="text-slate-300 text-xs mt-0.5">Clear doubt about academics, facilities & admissions</p>
                  </div>
                </div>
              </div>

              {/* Event Concept Footnote */}
              <div className="pt-4 border-t border-white/10 text-center">
                <span className="text-xs text-[#16B86A] font-bold tracking-wider uppercase">
                  ONE VENUE • ONE DAY • MULTIPLE COLLEGES
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
