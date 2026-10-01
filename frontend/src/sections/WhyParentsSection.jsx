import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle2, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function WhyParentsSection() {
  const benefits = [
    "Meet multiple colleges.",
    "Speak directly with college teams.",
    "Understand streams.",
    "Ask admission-related questions.",
    "Discuss academic pathways.",
    "Compare different options.",
    "Understand what each participating college offers."
  ];

  return (
    <section className="py-20 bg-[#0B2344] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="px-4 py-1.5 rounded-full bg-[#16B86A]/20 text-[#16B86A] text-xs font-black tracking-widest uppercase border border-[#16B86A]/30">
              For Parents
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight">
              YOUR CHILD'S NEXT ACADEMIC DECISION DESERVES A CONVERSATION.
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              As a parent, guiding your child through Class 10 transitions requires direct information and reliable insights from trusted academic leaders.
            </p>

            <div className="p-6 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md">
              <h3 className="text-[#16B86A] font-extrabold text-lg mb-2">
                "One event can give you a clearer starting point for the next decision."
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Save dozens of travel hours while gaining complete visibility into admission criteria, subject combinations, and campus environments.
              </p>
            </div>
          </div>

          {/* Right Column: Benefits Checklist */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/15 space-y-4"
            >
              <h3 className="text-xl font-display font-extrabold text-white pb-2 border-b border-white/10 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-[#16B86A]" /> At DENSE360, parents can:
              </h3>

              <div className="space-y-3.5 pt-2">
                {benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#16B86A] shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-sm font-medium leading-snug">
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
