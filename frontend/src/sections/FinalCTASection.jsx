import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, HelpCircle, Building2, CheckCircle2, Sparkles } from 'lucide-react';

export default function FinalCTASection() {
  const studentQuestions = ["Which college?", "Which stream?", "What comes next?"];
  const collegePoints = [
    "Meet students.",
    "Meet parents.",
    "Present your college.",
    "Explain your streams.",
    "Answer questions.",
    "Create admission conversations."
  ];

  return (
    <section className="py-20 bg-[#F5F2EA] text-[#0B2344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section 27: Final Student CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-[#0B2344] text-white p-8 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <span className="px-4 py-1.5 rounded-full bg-[#16B86A]/20 text-[#16B86A] text-xs font-black tracking-widest uppercase border border-[#16B86A]/30">
              For Students & Parents
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight">
              YOUR NEXT STEP STARTS WITH A QUESTION.
            </h2>

            {/* Questions Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {studentQuestions.map((q, idx) => (
                <span key={idx} className="px-5 py-2.5 rounded-2xl bg-white/10 border border-white/15 text-sm sm:text-base font-bold text-[#16B86A]">
                  {q}
                </span>
              ))}
            </div>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              You don't need to find every answer alone. Come to DENSE360. Meet multiple colleges. Explore your options. Ask your questions. Understand your choices.
            </p>

            <div className="space-y-4 pt-2">
              <h3 className="text-2xl sm:text-3xl font-display font-black text-[#16B86A]">
                MAKE YOUR NEXT DECISION WITH CLARITY.
              </h3>

              <div className="pt-2">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-[#16B86A] hover:bg-[#129B58] text-white font-black text-base shadow-xl shadow-green-900/40 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span>FILL THE DETAILS</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Section 28: Final College CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white p-8 sm:p-12 border border-slate-200 shadow-xl"
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-[#0B2344]/10 text-[#0B2344] text-xs font-black tracking-widest uppercase">
                For Participating Institutions
              </span>

              <h2 className="text-2xl sm:text-3xl font-display font-black text-[#0B2344] leading-tight">
                PUT YOUR COLLEGE IN FRONT OF STUDENTS WHO ARE READY TO EXPLORE THEIR OPTIONS.
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {collegePoints.map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#16B86A] shrink-0" />
                    {pt}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#0B2344] hover:bg-[#061325] text-white font-bold text-sm shadow-md transition-all text-center"
              >
                <span>PARTNER WITH DENSE360</span>
                <Building2 className="w-4 h-4 text-[#16B86A]" />
              </Link>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
