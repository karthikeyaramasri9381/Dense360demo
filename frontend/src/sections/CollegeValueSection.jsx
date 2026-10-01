import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CollegeValueSection() {
  const traditional = [
    "Calls",
    "School visits",
    "Individual follow-ups",
    "Travel",
    "Repeated conversations",
    "Time & cost"
  ];

  const denseFlow = [
    "ONE EVENT",
    "MULTIPLE COLLEGES",
    "STUDENTS + PARENTS",
    "DIRECT INTERACTION",
    "ADMISSION CONVERSATIONS"
  ];

  return (
    <section className="py-20 bg-white text-[#0B2344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#16B86A]/10 text-[#16B86A] text-xs font-black tracking-widest uppercase">
            Value Proposition
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight">
            BRING YOUR COLLEGE TO WHERE STUDENTS ARE LOOKING FOR ANSWERS.
          </h2>
        </div>

        {/* Side-by-Side Visual Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Traditional Outreach Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 p-8 rounded-3xl bg-slate-100 border border-slate-200 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 text-xs font-extrabold uppercase mb-4">
                <XCircle className="w-4 h-4" /> Traditional Outreach
              </div>
              <h3 className="text-xl font-display font-bold text-slate-800 mb-6">
                High Effort & Fragmented
              </h3>

              <div className="space-y-3">
                {traditional.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 mt-6 text-xs text-slate-500 font-semibold">
              Fragmented outreach across multiple channels and high logistical expenses.
            </div>
          </motion.div>

          {/* DENSE360 Flow Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 p-8 rounded-3xl bg-[#0B2344] text-white border border-white/10 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16B86A]/20 text-[#16B86A] text-xs font-extrabold uppercase mb-4 border border-[#16B86A]/30">
                <CheckCircle2 className="w-4 h-4" /> DENSE360 Event Platform
              </div>
              <h3 className="text-2xl font-display font-black text-white mb-6">
                High Impact & Direct Connection
              </h3>

              {/* Step Flow */}
              <div className="flex flex-wrap items-center gap-3">
                {denseFlow.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm font-extrabold text-[#16B86A] tracking-wider">
                      {step}
                    </span>
                    {idx < denseFlow.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-slate-400 hidden sm:block shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 text-xs text-slate-300 font-semibold">
              Consolidates high-intent student and parent interactions in one dedicated single-day event environment.
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
