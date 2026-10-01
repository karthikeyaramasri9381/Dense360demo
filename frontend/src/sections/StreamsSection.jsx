import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Dna, TrendingUp, Landmark, Info } from 'lucide-react';

export default function StreamsSection() {
  const streams = [
    {
      code: "MPC",
      name: "Mathematics, Physics, Chemistry",
      desc: "Popular stream for engineering, architecture, computer science, physical sciences, and technology pathways.",
      subjects: ["Mathematics", "Physics", "Chemistry"],
      icon: Calculator,
      badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    },
    {
      code: "BiPC",
      name: "Biology, Physics, Chemistry",
      desc: "Core stream for medicine, pharmacy, biotechnology, agricultural science, and allied health sciences.",
      subjects: ["Biology", "Physics", "Chemistry"],
      icon: Dna,
      badgeColor: "bg-teal-500/10 text-teal-700 border-teal-500/20",
    },
    {
      code: "MEC",
      name: "Mathematics, Economics, Commerce",
      desc: "Ideal pathway for finance, corporate management, chartered accountancy, data analytics, and business studies.",
      subjects: ["Mathematics", "Economics", "Commerce"],
      icon: TrendingUp,
      badgeColor: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    },
    {
      code: "CEC",
      name: "Civics, Economics, Commerce",
      desc: "Foundation for law, civil services, public policy, humanities, corporate communications, and business administration.",
      subjects: ["Civics", "Economics", "Commerce"],
      icon: Landmark,
      badgeColor: "bg-indigo-500/10 text-indigo-700 border-indigo-500/20",
    },
  ];

  return (
    <section className="py-20 bg-white text-[#0B2344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#16B86A]/10 text-[#16B86A] text-xs font-black tracking-widest uppercase">
            Academic Pathways
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight">
            EXPLORE YOUR STREAM OPTIONS
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Understand the different Intermediate pathways available through participating colleges.
          </p>
        </div>

        {/* 4 Streams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {streams.map((s, idx) => {
            const IconComp = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-3xl bg-[#F5F2EA] border border-slate-200/80 hover:border-[#16B86A] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-display font-black text-[#0B2344]">
                      {s.code}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#0B2344] text-[#16B86A] flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-[#16B86A] mb-3">
                    {s.name}
                  </h3>

                  <div className="space-y-2 mb-4">
                    {s.subjects.map((sub, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16B86A]" />
                        {sub}
                      </div>
                    ))}
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stream Availability Disclaimer Note */}
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 max-w-4xl mx-auto">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <span className="font-bold">Important Note:</span> Stream availability varies by college. Students and parents should speak directly with each participating college to understand its current offerings.
          </div>
        </div>

      </div>
    </section>
  );
}
