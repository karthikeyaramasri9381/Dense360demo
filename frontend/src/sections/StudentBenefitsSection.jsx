import React from 'react';
import { motion } from 'framer-motion';
import { Building, BookOpen, MessageSquare, Scale, Compass, HelpCircle, Clock, CheckCircle2 } from 'lucide-react';

export default function StudentBenefitsSection() {
  const cards = [
    {
      num: "01",
      title: "EXPLORE MULTIPLE COLLEGES",
      desc: "Visit participating colleges at the same venue.",
      icon: Building,
    },
    {
      num: "02",
      title: "UNDERSTAND DIFFERENT STREAMS",
      desc: "Learn about different Intermediate streams and combinations.",
      icon: BookOpen,
    },
    {
      num: "03",
      title: "TALK DIRECTLY TO COLLEGES",
      desc: "Ask questions directly to college representatives and academic teams.",
      icon: MessageSquare,
    },
    {
      num: "04",
      title: "COMPARE YOUR OPTIONS",
      desc: "Understand different colleges and their offerings in one place.",
      icon: Scale,
    },
    {
      num: "05",
      title: "UNDERSTAND WHAT COMES NEXT",
      desc: "Learn more about possible academic pathways after Intermediate.",
      icon: Compass,
    },
    {
      num: "06",
      title: "ASK THE QUESTIONS THAT MATTER",
      desc: "Ask about academics, streams, facilities, student opportunities, admissions and other college-specific information.",
      icon: HelpCircle,
    },
    {
      num: "07",
      title: "SAVE TIME",
      desc: "Reduce the need for multiple individual college visits.",
      icon: Clock,
    },
    {
      num: "08",
      title: "MAKE A MORE INFORMED DECISION",
      desc: "Gather information, discuss it with your family and decide your next step.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-20 bg-[#F5F2EA] text-[#0B2344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#0B2344]/10 text-[#0B2344] text-xs font-black tracking-widest uppercase">
            What Students Get
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight">
            ONE EVENT. MANY ANSWERS.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Everything you need to evaluate your options after Class 10 in a single visit.
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cards.map((card, idx) => {
            const IconComp = card.icon;
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
                      {card.num}
                    </span>
                    <IconComp className="w-5 h-5 text-[#0B2344]" />
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-[#0B2344] mb-2 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Important Message Banner */}
        <div className="rounded-3xl bg-[#0B2344] text-white p-8 sm:p-10 border border-white/10 shadow-xl">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h4 className="text-xl sm:text-2xl font-display font-black text-white">
              DENSE360 does not choose a college for the student.
            </h4>
            <p className="text-slate-300 text-sm sm:text-base">
              It creates the opportunity to explore.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[#16B86A] font-display font-black text-lg sm:text-xl tracking-wider">
              <span>You ask.</span>
              <span>•</span>
              <span>You compare.</span>
              <span>•</span>
              <span>You understand.</span>
              <span>•</span>
              <span>You decide.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
