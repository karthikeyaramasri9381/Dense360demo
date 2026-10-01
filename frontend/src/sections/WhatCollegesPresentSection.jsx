import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function WhatCollegesPresentSection() {
  const items = [
    "College introduction",
    "Intermediate streams",
    "Academic approach",
    "Faculty",
    "Campus",
    "Student opportunities",
    "Academic support",
    "Facilities",
    "Achievements",
    "Activities",
    "Future pathways",
    "Admission process",
    "Fees and scholarships, where applicable",
    "Contact details"
  ];

  return (
    <section className="py-20 bg-[#F5F2EA] text-[#0B2344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#0B2344]/10 text-[#0B2344] text-xs font-black tracking-widest uppercase">
            College Presentation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight">
            YOUR COLLEGE. YOUR STORY. YOUR OPPORTUNITY.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Participating colleges have full freedom to showcase their institutional strengths and offerings.
          </p>
        </div>

        {/* Presentation Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-[#16B86A] shrink-0" />
              <span className="text-sm font-bold text-[#0B2344] leading-snug">
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Supporting Statement */}
        <div className="p-6 rounded-2xl bg-[#0B2344] text-white text-center max-w-3xl mx-auto border border-white/10 shadow-lg">
          <p className="text-slate-300 text-sm sm:text-base font-medium">
            "The college controls the information it presents. <span className="text-[#16B86A] font-bold">DENSE360 provides the platform for interaction."</span>
          </p>
        </div>

      </div>
    </section>
  );
}
