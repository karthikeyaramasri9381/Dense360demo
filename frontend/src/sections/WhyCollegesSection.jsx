import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Store, BookOpen, FileText, Compass, Eye } from 'lucide-react';

export default function WhyCollegesSection() {
  const cards = [
    {
      num: "01",
      title: "DIRECT STUDENT ACCESS",
      desc: "Students and parents come to the event, giving colleges an opportunity to meet them directly.",
      icon: Users,
    },
    {
      num: "02",
      title: "DEDICATED STALL",
      desc: "A dedicated space to present the college and interact with visitors.",
      icon: Store,
    },
    {
      num: "03",
      title: "PARENT INTERACTION",
      desc: "Parents can directly ask questions to the college team.",
      icon: Users,
    },
    {
      num: "04",
      title: "STREAM AWARENESS",
      desc: "Explain the streams and programmes offered by the institution.",
      icon: BookOpen,
    },
    {
      num: "05",
      title: "ADMISSION CONVERSATIONS",
      desc: "Interested students can discuss admissions and next steps directly with the college team.",
      icon: FileText,
    },
    {
      num: "06",
      title: "MULTIPLE STUDENT INTERACTIONS",
      desc: "Colleges can interact with multiple prospective students and parents during one event.",
      icon: Compass,
    },
    {
      num: "07",
      title: "COLLEGE VISIBILITY",
      desc: "Present the institution, programmes, academic environment and student opportunities directly to the target audience.",
      icon: Eye,
    },
  ];

  return (
    <section className="py-20 bg-[#F5F2EA] text-[#0B2344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#0B2344]/10 text-[#0B2344] text-xs font-black tracking-widest uppercase">
            For Colleges
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight">
            MEET STUDENTS DIRECTLY.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            DENSE360 creates a direct interaction opportunity between participating colleges, students and parents.
          </p>
        </div>

        {/* 7 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((c, idx) => {
            const IconComp = c.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#16B86A]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-[#16B86A] bg-[#16B86A]/10 px-2.5 py-1 rounded-full">
                      {c.num}
                    </span>
                    <IconComp className="w-5 h-5 text-[#0B2344]" />
                  </div>
                  <h3 className="font-display font-extrabold text-base text-[#0B2344] mb-2 leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
