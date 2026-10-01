import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, HeartHandshake, Compass, CheckCircle2 } from 'lucide-react';

export default function WhoShouldAttendSection() {
  const cards = [
    {
      title: "CLASS 10 STUDENTS",
      desc: "Students preparing for their next academic stage.",
      icon: GraduationCap,
    },
    {
      title: "PARENTS",
      desc: "Parents helping their children make an informed Intermediate decision.",
      icon: HeartHandshake,
    },
    {
      title: "STUDENTS EXPLORING STREAMS",
      desc: "Students who are still unsure about their preferred stream.",
      icon: Compass,
    },
    {
      title: "STUDENTS WHO ALREADY HAVE A PLAN",
      desc: "Students who already have a preferred stream can still explore different colleges offering it.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-20 bg-[#F5F2EA] text-[#0B2344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#0B2344]/10 text-[#0B2344] text-xs font-black tracking-widest uppercase">
            Audience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight">
            WHO IS DENSE360 FOR?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Designed specifically for families navigating the Class 10 transition.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, idx) => {
            const IconComp = c.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#16B86A]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0B2344] text-[#16B86A] flex items-center justify-center mb-6 shadow-md">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-[#0B2344] mb-3 leading-tight">
                    {c.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
