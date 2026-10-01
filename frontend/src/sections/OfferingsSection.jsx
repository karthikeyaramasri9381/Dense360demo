import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Trophy, Palette, Users2, Brain, Zap, Star, Award } from 'lucide-react';

const offerings = [
  { icon: Users2, title: 'Student Engagement Activities', desc: 'Structured activities designed to actively involve and engage students.' },
  { icon: BookOpen, title: 'Learning-Based Challenges', desc: 'Academic and skill-based challenges that reinforce classroom knowledge.' },
  { icon: Trophy, title: 'Competitions & Challenges', desc: 'Healthy competitions that build motivation, focus and drive.' },
  { icon: Palette, title: 'Creative Activities', desc: 'Creative expression through structured and guided project work.' },
  { icon: Users2, title: 'Team-Based Activities', desc: 'Collaborative tasks that develop communication and teamwork.' },
  { icon: Brain, title: 'Problem-Solving Experiences', desc: 'Practical challenges that encourage analytical and critical thinking.' },
  { icon: Zap, title: 'Interactive Sessions', desc: 'Engaging, dynamic sessions that keep students involved throughout.' },
  { icon: Star, title: 'Recognition & Certificates', desc: 'Participation recognition to celebrate effort and achievement.' },
  { icon: Award, title: 'Participation & Outcome Reporting', desc: 'Summary of student participation and outcomes, provided on request.' },
];

export default function OfferingsSection() {
  return (
    <section id="offerings" className="py-24 bg-white">
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
            What We Offer
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#0B2344] leading-tight">
            A complete student<br />engagement programme.
          </h2>
          <p className="mt-5 text-[#64748B] text-base max-w-xl mx-auto">
            Professionally designed activities and experiences that complement school education.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group flex gap-5 rounded-2xl border border-[#0B2344]/10 bg-[#F5F2EA] hover:bg-white hover:shadow-premium hover:border-[#16B86A]/25 p-6 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0B2344] flex items-center justify-center flex-shrink-0 group-hover:bg-[#16B86A] transition-colors">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B2344] text-sm mb-1.5">{item.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center text-[#64748B] text-sm italic"
        >
          These are programme components — students do not need to select these during registration.
        </motion.p>
      </div>
    </section>
  );
}
