import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';

export default function PositioningSection() {
  return (
    <section className="py-20 bg-[#F5F2EA] text-[#0B2344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#0B2344] text-white p-8 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden text-center space-y-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#16B86A]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#16B86A]/20 text-[#16B86A] text-xs font-black tracking-widest uppercase border border-[#16B86A]/30">
            Important Positioning
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight">
            DENSE360 IS NOT HERE TO TELL YOU WHICH COLLEGE TO CHOOSE.
          </h2>

          {/* Core Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-2">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-rose-400 font-extrabold text-xs uppercase tracking-wider block mb-1">
                01 • Independent Choice
              </span>
              <p className="text-slate-200 text-sm font-semibold">
                We don't decide your future.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-rose-400 font-extrabold text-xs uppercase tracking-wider block mb-1">
                02 • Personal Aspirations
              </span>
              <p className="text-slate-200 text-sm font-semibold">
                We don't tell every student to choose the same stream.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-rose-400 font-extrabold text-xs uppercase tracking-wider block mb-1">
                03 • Unbiased Platform
              </span>
              <p className="text-slate-200 text-sm font-semibold">
                We don't decide which college is right for you.
              </p>
            </div>
          </div>

          <div className="pt-2 text-slate-300 text-base font-medium">
            We create the opportunity to explore.
          </div>

          {/* Empowering Motto */}
          <div className="p-6 rounded-2xl bg-[#16B86A] text-white shadow-lg">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-display font-black text-xl sm:text-2xl tracking-wider">
              <span>YOU ASK.</span>
              <span>YOU COMPARE.</span>
              <span>YOU UNDERSTAND.</span>
              <span>YOU DECIDE.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
