import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Clock, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ProblemSection() {
  const questions = [
    "Which college should I choose?",
    "Which stream is right for me?",
    "What does each college offer?",
    "What is the difference between the options?",
    "Which college should I visit?",
    "How do I compare them?"
  ];

  return (
    <section className="py-20 bg-[#F5F2EA] text-[#0B2344] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#0B2344]/10 text-[#0B2344] text-xs font-black tracking-widest uppercase">
            After Class 10
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight">
            Class 10 ends.<br />
            <span className="text-[#16B86A]">The next decision begins.</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            After Class 10, students and parents often have many questions — and finding the right answers can feel overwhelming.
          </p>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {questions.map((q, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0B2344]/5 text-[#0B2344] flex items-center justify-center shrink-0 font-bold">
                <HelpCircle className="w-5 h-5 text-[#16B86A]" />
              </div>
              <p className="font-bold text-[#0B2344] text-base leading-snug pt-1">
                {q}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Pain Point vs Solution Highlight */}
        <div className="rounded-3xl bg-[#0B2344] text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#16B86A]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" /> The Challenge
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold leading-tight">
                Visiting multiple colleges separately takes time and effort.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Finding answers can mean visiting different colleges, travelling between campuses and repeating the same conversations over and over again.
              </p>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md space-y-4">
              <div className="inline-flex items-center gap-2 text-[#16B86A] text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" /> The DENSE360 Solution
              </div>
              <p className="text-lg sm:text-xl font-bold text-white leading-snug">
                DENSE360 brings multiple colleges together so students and parents can explore their options in one place.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#16B86A] uppercase tracking-wider">
                ONE DAY • ONE VENUE • ALL YOUR OPTIONS
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
