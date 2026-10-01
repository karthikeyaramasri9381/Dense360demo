import React from 'react';
import { motion } from 'framer-motion';
import { Store, Users, Building2, BookOpen, HelpCircle, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function StallExperienceSection() {
  const steps = [
    { title: "Visit the college stall", icon: Store },
    { title: "Meet the college team", icon: Users },
    { title: "Understand the college", icon: Building2 },
    { title: "Explore streams", icon: BookOpen },
    { title: "Ask questions", icon: HelpCircle },
    { title: "Discuss admissions", icon: FileText },
    { title: "Take the next step", icon: CheckCircle2 },
  ];

  return (
    <section className="py-20 bg-[#0B2344] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#16B86A]/20 text-[#16B86A] text-xs font-black tracking-widest uppercase border border-[#16B86A]/30">
            The Stall Experience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight">
            WALK IN. EXPLORE. ASK. COMPARE.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Each participating college gets a dedicated interaction space at the event for direct, unhurried conversations with families.
          </p>
        </div>

        {/* Horizontal / Step Flow */}
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center justify-between space-y-3 hover:border-[#16B86A] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#16B86A] text-white flex items-center justify-center font-bold text-sm shadow-md">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-200 leading-snug">
                    {step.title}
                  </span>
                  <span className="text-[10px] text-[#16B86A] font-extrabold uppercase">
                    Step 0{idx + 1}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Strong Statement */}
        <div className="text-center p-8 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-display font-black text-[#16B86A]">
            "It's not just a stage. It's an interaction floor."
          </h3>
          <p className="text-slate-300 text-sm mt-2">
            Real conversations with college leaders and counseling teams in an approachable, supportive environment.
          </p>
        </div>

      </div>
    </section>
  );
}
