import React from 'react';
import { motion } from 'framer-motion';
import { Users, Compass, BookOpen, MessageSquare, Scale, CheckCircle } from 'lucide-react';

export default function WhatIsDenseSection() {
  const pillars = [
    {
      title: "MEET",
      subtitle: "College representatives",
      desc: "College representatives and academic teams directly.",
      icon: Users,
      color: "from-emerald-500/20 to-emerald-500/5",
    },
    {
      title: "EXPLORE",
      subtitle: "Multiple institutions",
      desc: "Different Intermediate colleges all at the same venue.",
      icon: Compass,
      color: "from-blue-500/20 to-blue-500/5",
    },
    {
      title: "UNDERSTAND",
      subtitle: "Streams & pathways",
      desc: "Streams, academic structures and future opportunities.",
      icon: BookOpen,
      color: "from-indigo-500/20 to-indigo-500/5",
    },
    {
      title: "ASK",
      subtitle: "Direct Q&A",
      desc: "Questions directly to college leadership and staff.",
      icon: MessageSquare,
      color: "from-teal-500/20 to-teal-500/5",
    },
    {
      title: "COMPARE",
      subtitle: "Side-by-side view",
      desc: "Different options in one place without multiple trips.",
      icon: Scale,
      color: "from-emerald-600/20 to-emerald-600/5",
    },
    {
      title: "DECIDE",
      subtitle: "Clarity for future",
      desc: "Take the next step with greater clarity and confidence.",
      icon: CheckCircle,
      color: "from-green-500/20 to-green-500/5",
    },
  ];

  return (
    <section id="what-is-dense" className="py-20 bg-white text-[#0B2344] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#16B86A]/10 text-[#16B86A] text-xs font-black tracking-widest uppercase">
            Education Discovery Event
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight">
            WHAT IS DENSE360?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            DENSE360 is an education discovery event that brings multiple Intermediate colleges together under one roof. Instead of students and parents travelling from college to college, participating colleges come together at one venue.
          </p>
        </div>

        {/* 6 Action Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-8 rounded-3xl bg-[#F5F2EA] border border-slate-200/80 hover:border-[#16B86A]/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0B2344] text-[#16B86A] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                  <IconComp className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-display font-black text-[#0B2344] tracking-tight">
                  {item.title}
                </h3>
                <h4 className="text-xs uppercase font-extrabold text-[#16B86A] tracking-wider mb-2">
                  {item.subtitle}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Strong Statement Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0B2344] to-[#061325] text-white p-8 sm:p-12 text-center shadow-xl border border-white/10">
          <p className="text-slate-300 text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-3">
            Core Promise
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-[#16B86A] tracking-tight max-w-4xl mx-auto leading-tight">
            "Instead of going everywhere to find your options, we bring your options together."
          </h3>
        </div>

      </div>
    </section>
  );
}
