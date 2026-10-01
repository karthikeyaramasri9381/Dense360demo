import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const pillars = [
  {
    num: '01', key: 'LEARN', color: '#16B86A', bgClass: 'from-[#16B86A] to-[#0E7D46]',
    title: 'LEARN',
    desc: 'Educational and activity-based experiences that connect theory with practice.',
  },
  {
    num: '02', key: 'PARTICIPATE', color: '#3B82F6', bgClass: 'from-[#3B82F6] to-[#1D4ED8]',
    title: 'PARTICIPATE',
    desc: 'Interactive activities and challenges that put students at the centre.',
  },
  {
    num: '03', key: 'CREATE', color: '#F59E0B', bgClass: 'from-[#F59E0B] to-[#D97706]',
    title: 'CREATE',
    desc: 'Creative thinking and problem-solving in a structured, supportive environment.',
  },
  {
    num: '04', key: 'COLLABORATE', color: '#8B5CF6', bgClass: 'from-[#8B5CF6] to-[#7C3AED]',
    title: 'COLLABORATE',
    desc: 'Teamwork and communication skills developed through real group experiences.',
  },
  {
    num: '05', key: 'DISCOVER', color: '#EC4899', bgClass: 'from-[#EC4899] to-[#DB2777]',
    title: 'DISCOVER',
    desc: 'Exploring new interests, ideas and opportunities beyond the classroom.',
  },
];

export default function WhatIsDenseSection() {
  return (
    <section id="whatisdense" className="py-24 bg-[#F5F2EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#0B2344]/8 text-[#0B2344] text-xs font-bold tracking-widest uppercase mb-5">
            What DENSE360 Is
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#0B2344] leading-tight">
            A student-focused<br />experience platform.
          </h2>
          <p className="mt-5 text-[#64748B] text-base sm:text-lg max-w-2xl mx-auto">
            DENSE360 creates professionally organised programmes that combine meaningful student experiences into one coherent programme.
          </p>
        </motion.div>

        {/* Visual sequence indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12 text-xs font-bold tracking-widest text-[#64748B]"
        >
          {pillars.map((p, i) => (
            <React.Fragment key={p.key}>
              <span style={{ color: p.color }}>{p.key}</span>
              {i < pillars.length - 1 && (
                <ArrowRight className="w-3 h-3 text-[#CBD5E1] flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Pillars cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-white border border-[#0B2344]/8 p-6 shadow-subtle hover:shadow-premium transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg mb-5 bg-gradient-to-br ${p.bgClass} shadow-md`}
              >
                {p.num}
              </div>
              <h3 className="font-display font-black text-base tracking-widest mb-3" style={{ color: p.color }}>
                {p.title}
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Goal message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 p-8 rounded-3xl bg-[#0B2344] max-w-3xl mx-auto text-center"
        >
          <p className="text-lg sm:text-xl text-white font-medium leading-relaxed">
            "To make learning more engaging and give students opportunities to{' '}
            <span className="text-[#16B86A] font-bold">demonstrate what they can do.</span>"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
