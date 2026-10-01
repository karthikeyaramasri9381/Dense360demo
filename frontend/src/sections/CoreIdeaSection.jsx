import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Building2, Users, MessageSquare, Scale, CheckCircle2, MapPin } from 'lucide-react';

export default function CoreIdeaSection() {
  const steps = [
    { title: "ONE VENUE", desc: "Single convenient event location", icon: MapPin },
    { title: "MULTIPLE COLLEGES", desc: "Leading Intermediate colleges present", icon: Building2 },
    { title: "DIRECT INTERACTION", desc: "Meet leadership & college teams", icon: Users },
    { title: "QUESTIONS & ANSWERS", desc: "Get real answers about academics", icon: MessageSquare },
    { title: "COMPARE OPTIONS", desc: "Side-by-side college evaluation", icon: Scale },
    { title: "CLEARER DECISION", desc: "Choose your path with confidence", icon: CheckCircle2 },
  ];

  return (
    <section className="py-20 bg-[#0B2344] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#16B86A]/20 text-[#16B86A] text-xs font-black tracking-widest uppercase border border-[#16B86A]/30">
            The Core Idea
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight">
            MULTIPLE INTERMEDIATE COLLEGES.<br />
            <span className="text-[#16B86A]">ONE VENUE. ONE DAY.</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            DENSE360 creates a single event environment where students and parents can explore multiple Intermediate colleges without having to visit every campus separately.
          </p>
        </div>

        {/* Visual Flow Diagram */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#16B86A] transition-all text-center flex flex-col items-center justify-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#16B86A] text-white flex items-center justify-center font-bold shadow-lg">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-display font-extrabold text-white tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 text-xs">
                    {step.desc}
                  </p>
                  
                  {/* Step Number Tag */}
                  <span className="absolute top-3 right-3 text-[10px] font-black text-white/30 tracking-wider">
                    0{idx + 1}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
