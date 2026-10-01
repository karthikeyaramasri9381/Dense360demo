import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0B2344] overflow-hidden text-white">
      {/* Background Decorative Gradients & Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#16B86A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#16B86A]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#0E7D46]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="flex flex-col items-center space-y-6">
          
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

          {/* Main Hero Headline (Continuous single headline string, no manual line break) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl"
          >
            <p className="w-full whitespace-nowrap text-center text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-[#16B86A] leading-tight">
  ONE EVENT MULTIPLE COLLEGES ONE CLEARER DECISION
</p>
          </motion.div>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed"
          >
            After Class 10, choosing the right Intermediate college and stream can feel confusing. Instead of visiting college after college, explore multiple options at DENSE360 — all in one place, on one day.
          </motion.p>

          {/* Action Bar & Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
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
            className="text-xs sm:text-sm text-slate-400 font-medium pt-2 italic max-w-2xl"
          >
            Meet colleges. Explore streams. Ask questions. Compare options. Make your next decision with clarity.
          </motion.p>

        </div>
      </div>
    </section>
  );
}
