import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function WhyExistsSection() {
  const noise = [
    "Random recommendations",
    "Social media claims",
    "Word of mouth rumors",
    "Generic advertisements",
    "Limited or biased information",
    "One-sided sales conversations"
  ];

  return (
    <section className="py-20 bg-white text-[#0B2344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#16B86A]/10 text-[#16B86A] text-xs font-black tracking-widest uppercase">
            Why DENSE360 Exists
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight">
            BECAUSE CHOOSING A COLLEGE SHOULDN'T BEGIN WITH CONFUSION.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            After Class 10, students deserve clear, direct access to facts rather than relying on unverified channels.
          </p>
        </div>

        {/* Noise vs DENSE360 Physical Space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Noise */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500" /> Beyond the usual noise:
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {noise.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-600 text-xs font-semibold p-3 rounded-xl bg-white border border-slate-200/60">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Physical Discovery */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-[#0B2344] text-white border border-white/10 space-y-4 shadow-xl">
            <span className="text-xs font-extrabold text-[#16B86A] uppercase tracking-widest">
              Direct Physical Discovery
            </span>
            <h3 className="text-2xl font-display font-black text-white">
              DENSE360 creates a physical space where students and parents can explore multiple options directly.
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Sit down across the table from decision-makers, ask hard questions, inspect subject combinations, and leave with objective clarity.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
