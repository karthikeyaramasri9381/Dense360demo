import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section id="cta" className="py-28 bg-[#0B2344] relative overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute top-0 right-0 w-96 h-96 -translate-y-1/3 translate-x-1/3 pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full opacity-[0.07]">
          <circle cx="200" cy="200" r="180" stroke="#16B86A" strokeWidth="2" fill="none" strokeDasharray="12 8" />
          <circle cx="200" cy="200" r="120" stroke="#16B86A" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-80 h-80 translate-y-1/3 -translate-x-1/3 pointer-events-none">
        <svg viewBox="0 0 300 300" className="w-full h-full opacity-[0.05]">
          <circle cx="150" cy="150" r="130" stroke="#ffffff" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#16B86A]/30 bg-[#16B86A]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16B86A] animate-pulse" />
            <span className="text-[#16B86A] text-xs font-bold tracking-widest uppercase">Ready to begin?</span>
          </div>

          {/* Heading */}
          <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.95]">
            Ready to be part<br />of{' '}
            <span className="text-[#16B86A]">DENSE360?</span>
          </h2>

          {/* Subtext */}
          <div className="space-y-2 text-slate-300 text-lg">
            <p>Know your options.</p>
            <p>Choose your path.</p>
            <p>Create meaningful student experiences.</p>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              to="/register"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-[#16B86A] hover:bg-[#129B58] text-white font-black text-lg shadow-2xl shadow-green-900/40 hover:shadow-green-900/60 transition-all duration-200 transform hover:-translate-y-1"
            >
              FILL THE DETAILS
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>

          <p className="text-slate-500 text-sm pt-4">
            DENSE360 — The Right Choice
          </p>
        </motion.div>
      </div>
    </section>
  );
}
