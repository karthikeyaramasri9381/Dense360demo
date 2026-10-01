import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const partnerSteps = [
  { step: '01', title: 'School Approval', desc: 'Discuss the programme with school management and get the go-ahead.' },
  { step: '02', title: 'Programme Planning', desc: 'Finalise the most suitable programme format for your school.' },
  { step: '03', title: 'Student Communication', desc: 'Share approved programme information with students and parents.' },
  { step: '04', title: 'Registration', desc: 'Students register through the agreed process.' },
  { step: '05', title: 'Event Experience', desc: 'DENSE360 coordinates and delivers the full activity experience.' },
  { step: '06', title: 'Feedback & Recognition', desc: 'Recognise participation and achievement where applicable.' },
  { step: '07', title: 'School Report', desc: 'Participation and outcome information shared with the school.' },
];

export default function PartnershipWorksSection() {
  return (
    <section id="partnership" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#16B86A]/10 text-[#16B86A] text-xs font-bold tracking-widest uppercase mb-5">
            How the Partnership Works
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#0B2344] leading-tight">
            A simple seven-step process.
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnerSteps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl bg-[#F5F2EA] border border-[#0B2344]/8 hover:border-[#16B86A]/30 hover:shadow-premium p-6 transition-all"
            >
              {/* Step marker */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B2344] text-white flex items-center justify-center font-black text-sm flex-shrink-0">
                  {s.step}
                </div>
                {i < partnerSteps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 top-6 z-10">
                    <ArrowRight className="w-4 h-4 text-[#CBD5E1]" />
                  </div>
                )}
              </div>
              <h3 className="font-display font-bold text-[#0B2344] text-base mb-2">{s.title}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
