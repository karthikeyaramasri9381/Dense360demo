import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Mic, Coffee, Building2, Users } from 'lucide-react';

export default function TimelineSection() {
  const schedule = [
    {
      time: "09:00 AM – 10:00 AM",
      title: "REGISTRATION & ENTRY",
      desc: "Students and parents arrive and complete event check-in.",
      icon: Clock,
      highlight: false,
    },
    {
      time: "10:00 AM – 10:15 AM",
      title: "OPENING SESSION",
      desc: "Welcome and introduction to DENSE360.",
      icon: Mic,
      highlight: false,
    },
    {
      time: "10:15 AM – 12:30 PM",
      title: "PRINCIPAL & EXPERT SESSIONS",
      desc: "Sessions focused on Intermediate choices, streams, academic pathways and future opportunities.",
      icon: Users,
      highlight: true,
    },
    {
      time: "12:30 PM – 01:00 PM",
      title: "BREAK / TRANSITION",
      desc: "Transition time for students, parents, and college delegations.",
      icon: Coffee,
      highlight: false,
    },
    {
      time: "01:00 PM ONWARDS",
      title: "COLLEGE DISCOVERY & INTERACTION",
      desc: "Students and parents visit participating college stalls.",
      icon: Building2,
      highlight: true,
    },
    {
      time: "AFTERNOON",
      title: "MEET. ASK. EXPLORE. COMPARE.",
      desc: "Students and parents interact directly with college teams.",
      icon: CheckCircle2,
      highlight: true,
    },
  ];

  return (
    <section className="py-20 bg-white text-[#0B2344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#16B86A]/10 text-[#16B86A] text-xs font-black tracking-widest uppercase">
            Schedule Overview
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight">
            YOUR DENSE360 DAY
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            A structured one-day agenda designed to give you clarity from morning to afternoon.
          </p>
        </div>

        {/* Vertical Visual Timeline */}
        <div className="max-w-4xl mx-auto relative pl-4 sm:pl-8 border-l-2 border-[#16B86A]/30 space-y-8">
          {schedule.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative group"
              >
                {/* Timeline Dot Indicator */}
                <div className={`absolute -left-[25px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center text-white ${
                  item.highlight ? 'bg-[#16B86A] ring-4 ring-[#16B86A]/20' : 'bg-[#0B2344]'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-white" />
                </div>

                {/* Timeline Card */}
                <div className={`p-6 rounded-3xl border transition-all ${
                  item.highlight
                    ? 'bg-[#F5F2EA] border-[#16B86A]/40 shadow-sm'
                    : 'bg-white border-slate-200'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-extrabold text-[#16B86A] bg-[#16B86A]/10 px-3 py-1 rounded-full w-fit">
                      {item.time}
                    </span>
                    <IconComp className="w-5 h-5 text-[#0B2344] hidden sm:block" />
                  </div>

                  <h3 className="text-xl font-display font-extrabold text-[#0B2344] mt-2 mb-1">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.desc}
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
