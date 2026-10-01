import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ExperienceStagesSection() {
  const stages = [
    {
      num: "STAGE 01",
      title: "BEFORE THE EVENT",
      items: ["Register", "Receive event information", "Plan your visit"],
      color: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    },
    {
      num: "STAGE 02",
      title: "AT THE EVENT",
      items: ["Attend expert sessions", "Explore college stalls", "Meet college representatives", "Ask questions", "Understand streams", "Compare options"],
      color: "bg-[#16B86A]/10 text-[#16B86A] border-[#16B86A]/30",
    },
    {
      num: "STAGE 03",
      title: "AFTER THE EVENT",
      items: ["Shortlist colleges", "Discuss with family", "Take the next admission step"],
      color: "bg-indigo-500/10 text-indigo-700 border-indigo-500/20",
    },
  ];

  return (
    <section className="py-20 bg-white text-[#0B2344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#16B86A]/10 text-[#16B86A] text-xs font-black tracking-widest uppercase">
            The Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight">
            FROM QUESTION TO CLARITY.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            A simple three-stage process for students and families.
          </p>
        </div>

        {/* 3 Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stages.map((stage, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#F5F2EA] border border-slate-200/80 hover:border-[#16B86A] transition-all flex flex-col justify-between"
            >
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4 ${stage.color}`}>
                  {stage.num}
                </span>

                <h3 className="text-2xl font-display font-black text-[#0B2344] mb-6">
                  {stage.title}
                </h3>

                <div className="space-y-3">
                  {stage.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-700 text-sm font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#16B86A] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
