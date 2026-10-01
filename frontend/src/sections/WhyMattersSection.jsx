import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  { num: '01', title: 'Learn through practical activities', icon: '📚' },
  { num: '02', title: 'Develop communication skills', icon: '🎙️' },
  { num: '03', title: 'Build teamwork and collaboration', icon: '🤝' },
  { num: '04', title: 'Improve creativity and problem-solving', icon: '💡' },
  { num: '05', title: 'Participate in healthy competition', icon: '🏆' },
  { num: '06', title: 'Explore different interests', icon: '🌐' },
  { num: '07', title: 'Interact with new ideas and perspectives', icon: '🔭' },
  { num: '08', title: 'Gain confidence through participation', icon: '⭐' },
];

export default function WhyMattersSection() {
  return (
    <section id="why" className="py-24 bg-[#0B2344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#16B86A]/15 text-[#16B86A] text-xs font-bold tracking-widest uppercase mb-5">
            Why This Matters
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            Students need more than
            <br />
            <span className="text-[#16B86A]">classroom learning.</span>
          </h2>
          <p className="mt-5 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Today's students benefit from opportunities that stretch beyond the textbook — building the skills they will actually use.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-[#16B86A]/30 transition-all cursor-default"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{r.icon}</span>
                <div>
                  <p className="text-[#16B86A] font-bold text-xs tracking-widest mb-1">{r.num}</p>
                  <p className="text-white font-medium text-sm leading-snug">{r.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 p-8 rounded-3xl border border-[#16B86A]/25 bg-gradient-to-r from-[#16B86A]/10 to-transparent max-w-3xl"
        >
          <p className="text-lg sm:text-xl text-white font-medium leading-relaxed">
            "Our objective is to <span className="text-[#16B86A] font-bold">complement classroom education</span> with meaningful student experiences."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
