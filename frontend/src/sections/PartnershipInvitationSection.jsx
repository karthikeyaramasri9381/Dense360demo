import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function PartnershipInvitationSection() {
  return (
    <section id="invite" className="py-24 bg-[#F5F2EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#0B2344]/8 text-[#0B2344] text-xs font-bold tracking-widest uppercase mb-5">
            Partnership Invitation
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#0B2344] leading-tight">
            Let's create a meaningful<br />
            <span className="text-[#16B86A]">experience for students.</span>
          </h2>
        </motion.div>

        {/* Partnership visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
            {/* Left: Your School */}
            <div className="rounded-3xl bg-[#0B2344] text-white p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl">🏫</span>
              </div>
              <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">Your School Provides</p>
              <div className="space-y-3">
                <div className="py-3 px-5 rounded-xl bg-white/8 border border-white/10">
                  <span className="font-bold text-base text-white">Students</span>
                </div>
                <Plus className="w-5 h-5 text-slate-400 mx-auto" />
                <div className="py-3 px-5 rounded-xl bg-white/8 border border-white/10">
                  <span className="font-bold text-base text-white">Institutional Support</span>
                </div>
              </div>
            </div>

            {/* Center: Together */}
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-20 h-20 rounded-full bg-[#16B86A] flex items-center justify-center shadow-xl shadow-green-900/20 mb-5">
                <span className="font-display font-black text-white text-2xl">+</span>
              </div>
              <div className="rounded-2xl bg-[#0B2344] text-white px-8 py-5 shadow-premium w-full">
                <p className="text-xs uppercase tracking-widest text-[#16B86A] font-bold mb-2">Together</p>
                <p className="font-display font-black text-xl text-white">Better Student<br />Engagement.</p>
              </div>
            </div>

            {/* Right: DENSE360 */}
            <div className="rounded-3xl bg-[#16B86A] text-white p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl">360°</span>
              </div>
              <p className="text-xs uppercase tracking-widest font-bold text-green-100 mb-4">DENSE360 Provides</p>
              <div className="space-y-3">
                {['Activities', 'Learning Experiences', 'Opportunities', 'Event Execution'].map((item, i) => (
                  <React.Fragment key={item}>
                    <div className="py-2.5 px-4 rounded-xl bg-white/15 border border-white/20">
                      <span className="font-semibold text-sm text-white">{item}</span>
                    </div>
                    {i < 3 && <Plus className="w-4 h-4 text-green-100/70 mx-auto" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
