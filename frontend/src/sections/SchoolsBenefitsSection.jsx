import React from 'react';
import { motion } from 'framer-motion';

const benefits = [
  {
    num: '01', title: 'Student Development',
    desc: 'Additional opportunities for learning, creativity and participation beyond the standard curriculum.',
  },
  {
    num: '02', title: 'Educational Value',
    desc: 'Activities that complement regular classroom learning and reinforce academic skills.',
  },
  {
    num: '03', title: 'Student Engagement',
    desc: 'Encourages students to participate actively, collaborate and communicate with confidence.',
  },
  {
    num: '04', title: 'Recognition',
    desc: 'Recognition for participation and achievement where applicable, reinforcing student motivation.',
  },
  {
    num: '05', title: 'Measurable Participation',
    desc: 'Summary of registrations, participation and activities available on request.',
  },
  {
    num: '06', title: 'Professional Execution',
    desc: 'DENSE360 manages major event coordination and execution needs, reducing internal workload.',
  },
];

export default function SchoolsBenefitsSection() {
  return (
    <section id="schools" className="py-24 bg-[#0B2344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#16B86A]/15 text-[#16B86A] text-xs font-bold tracking-widest uppercase mb-5">
            Benefits to Schools
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            Why should your school<br />
            <span className="text-[#16B86A]">partner with DENSE360?</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#16B86A]/30 p-7 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#16B86A]/20 flex items-center justify-center text-[#16B86A] font-black text-sm mb-5">
                {b.num}
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-3">{b.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 max-w-3xl mx-auto text-center"
        >
          <p className="text-lg text-slate-200 font-medium leading-relaxed">
            "The school gets an additional student-development opportunity without having to{' '}
            <span className="text-[#16B86A] font-bold">build the entire programme internally.</span>"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
