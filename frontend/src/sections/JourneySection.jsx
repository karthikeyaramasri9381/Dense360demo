import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    step: '01', title: 'DISCOVER',
    desc: 'Students learn about the programme and what activities are available.',
    color: '#16B86A', dotColor: 'bg-[#16B86A]'
  },
  {
    step: '02', title: 'REGISTER',
    desc: 'Students register through the agreed process, sharing their details.',
    color: '#3B82F6', dotColor: 'bg-[#3B82F6]'
  },
  {
    step: '03', title: 'PARTICIPATE',
    desc: 'Students actively take part in challenges, sessions and activities.',
    color: '#F59E0B', dotColor: 'bg-[#F59E0B]'
  },
  {
    step: '04', title: 'LEARN & COLLABORATE',
    desc: 'Developing teamwork, communication and creative thinking through doing.',
    color: '#8B5CF6', dotColor: 'bg-[#8B5CF6]'
  },
  {
    step: '05', title: 'SHOWCASE',
    desc: 'Students demonstrate their skills, ideas and progress.',
    color: '#EC4899', dotColor: 'bg-[#EC4899]'
  },
  {
    step: '06', title: 'RECOGNITION',
    desc: 'Certificates, appreciation and recognition for participation and achievement.',
    color: '#0B2344', dotColor: 'bg-[#0B2344]'
  },
];

export default function JourneySection() {
  return (
    <section id="journey" className="py-24 bg-[#F5F2EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#0B2344]/8 text-[#0B2344] text-xs font-bold tracking-widest uppercase mb-5">
            Student Journey
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#0B2344] leading-tight">
            From registration<br />to recognition.
          </h2>
        </motion.div>

        {/* Timeline — Desktop */}
        <div className="hidden lg:block">
          {/* Horizontal steps */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-[42px] left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-[#16B86A] via-[#8B5CF6] to-[#0B2344] opacity-25" />

            <div className="grid grid-cols-6 gap-6 relative">
              {steps.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Step circle */}
                  <div
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-white font-black text-lg mb-6 shadow-lg z-10 relative border-4 border-[#F5F2EA]"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.step}
                  </div>
                  <h3 className="font-display font-black text-xs tracking-widest text-[#0B2344] mb-2" style={{ color: s.color }}>
                    {s.title}
                  </h3>
                  <p className="text-[#64748B] text-xs leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline — Mobile vertical */}
        <div className="lg:hidden space-y-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex gap-5 relative pb-8"
            >
              {/* Left column: dot + line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-base z-10 shadow-md"
                  style={{ backgroundColor: s.color }}
                >
                  {s.step}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-current to-transparent opacity-20 min-h-[40px]" style={{ backgroundColor: s.color }} />
                )}
              </div>
              {/* Content */}
              <div className="pt-2 pb-4">
                <h3 className="font-display font-black text-sm tracking-widest mb-1.5" style={{ color: s.color }}>
                  {s.title}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
