import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Sparkles, ArrowDown } from 'lucide-react';

export default function DenseConnectionSection() {
  return (
    <section className="py-20 bg-[#0B2344] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#16B86A]/20 text-[#16B86A] text-xs font-black tracking-widest uppercase border border-[#16B86A]/30">
            The Ecosystem Connection
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight">
            ONE EVENT. TWO SIDES OF THE DECISION.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Connecting families seeking guidance with institutions providing quality education.
          </p>
        </div>

        {/* 3 Connected Blocks */}
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Block 1: Students + Parents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-extrabold text-white">STUDENTS + PARENTS</h3>
                  <span className="text-xs text-slate-400">Seeking options & clarity</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
                <span className="px-3 py-1 rounded-lg bg-white/10">Information</span>
                <span className="px-3 py-1 rounded-lg bg-white/10">Guidance</span>
                <span className="px-3 py-1 rounded-lg bg-white/10">Comparison</span>
                <span className="px-3 py-1 rounded-lg bg-white/10">Answers</span>
                <span className="px-3 py-1 rounded-lg bg-[#16B86A]/20 text-[#16B86A]">Clarity</span>
              </div>
            </div>
          </motion.div>

          {/* Connection Arrow */}
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-[#16B86A] text-white flex items-center justify-center shadow-lg">
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </div>
          </div>

          {/* Block 2: DENSE360 Platform */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-[#16B86A] text-white shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-black text-white">DENSE360</h3>
                  <span className="text-xs text-white/80">The discovery bridge</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-bold text-white">
                <span className="px-3 py-1 rounded-lg bg-black/20">One Venue</span>
                <span className="px-3 py-1 rounded-lg bg-black/20">Multiple Colleges</span>
                <span className="px-3 py-1 rounded-lg bg-black/20">Expert Sessions</span>
                <span className="px-3 py-1 rounded-lg bg-black/20">Direct Interaction</span>
              </div>
            </div>
          </motion.div>

          {/* Connection Arrow */}
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-[#16B86A] text-white flex items-center justify-center shadow-lg">
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </div>
          </div>

          {/* Block 3: Colleges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-[#16B86A] flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-extrabold text-white">COLLEGES</h3>
                  <span className="text-xs text-slate-400">Presenting offerings & pathways</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
                <span className="px-3 py-1 rounded-lg bg-white/10">Student interaction</span>
                <span className="px-3 py-1 rounded-lg bg-white/10">Parent interaction</span>
                <span className="px-3 py-1 rounded-lg bg-white/10">Visibility</span>
                <span className="px-3 py-1 rounded-lg bg-white/10">Stream awareness</span>
                <span className="px-3 py-1 rounded-lg bg-[#16B86A]/20 text-[#16B86A]">Admission conversations</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
