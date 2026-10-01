import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Award, Compass, BookOpen, HelpCircle, Rocket, Sparkles } from 'lucide-react';

export default function SessionsSection() {
  const sessions = [
    {
      num: "01",
      title: "CHOOSING THE RIGHT INTERMEDIATE PATH",
      desc: "Understanding how students can approach the decision after Class 10.",
      icon: Compass,
    },
    {
      num: "02",
      title: "STREAMS, SUBJECTS & FUTURE PATHWAYS",
      desc: "Understanding how subject choices can connect with future study options.",
      icon: BookOpen,
    },
    {
      num: "03",
      title: "ACADEMIC EXPECTATIONS",
      desc: "What students should understand before entering Intermediate education.",
      icon: Award,
    },
    {
      num: "04",
      title: "COMMON QUESTIONS STUDENTS & PARENTS HAVE",
      desc: "Questions families should consider before choosing a college.",
      icon: HelpCircle,
    },
    {
      num: "05",
      title: "PREPARING FOR THE NEXT STEP",
      desc: "How students can think beyond Class 10 and prepare for their next academic stage.",
      icon: Rocket,
    },
  ];

  return (
    <section className="py-20 bg-[#F5F2EA] text-[#0B2344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#0B2344]/10 text-[#0B2344] text-xs font-black tracking-widest uppercase">
            Morning Programme
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight">
            HEAR DIRECTLY FROM EDUCATION LEADERS
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            The morning programme brings principals, academic leaders and invited guests onto the stage to discuss the questions students and parents face after Class 10.
          </p>
        </div>

        {/* 5 Sessions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sessions.map((s, idx) => {
            const IconComp = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#16B86A]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-[#16B86A] bg-[#16B86A]/10 px-3 py-1 rounded-full">
                      SESSION {s.num}
                    </span>
                    <IconComp className="w-5 h-5 text-[#0B2344]" />
                  </div>

                  <h3 className="font-display font-extrabold text-base text-[#0B2344] mb-2 leading-snug">
                    {s.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Special Guest Sessions Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="p-6 rounded-3xl bg-gradient-to-br from-[#0B2344] to-[#061325] text-white shadow-md flex flex-col justify-between border border-white/10"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  FEATURED
                </span>
                <Mic className="w-5 h-5 text-[#16B86A]" />
              </div>

              <h3 className="font-display font-extrabold text-lg text-white mb-2 leading-snug">
                GUEST SESSIONS
              </h3>

              <p className="text-slate-300 text-xs leading-relaxed">
                Invited guests and education experts may share their perspectives and experiences with students and parents.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
