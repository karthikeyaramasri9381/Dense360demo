import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, GraduationCap, Users, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const handleExplore = (e) => {
    e.preventDefault();
    const el = document.getElementById('concept360');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0B2344]"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Decorative 360° ring graphic — top right */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] -translate-y-1/4 translate-x-1/4 pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full opacity-[0.12]">
          <circle cx="200" cy="200" r="150" stroke="#16B86A" strokeWidth="2" fill="none" strokeDasharray="12 8" />
          <circle cx="200" cy="200" r="100" stroke="#16B86A" strokeWidth="1.5" fill="none" strokeDasharray="4 12" />
          <circle cx="200" cy="200" r="50" stroke="#ffffff" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Decorative circle — bottom left */}
      <div className="absolute bottom-0 left-0 w-80 h-80 translate-y-1/3 -translate-x-1/4 pointer-events-none">
        <svg viewBox="0 0 300 300" className="w-full h-full opacity-[0.06]">
          <circle cx="150" cy="150" r="120" stroke="#16B86A" strokeWidth="2" fill="none" />
          <circle cx="150" cy="150" r="80" stroke="#16B86A" strokeWidth="1" fill="none" strokeDasharray="6 8" />
        </svg>
      </div>

      {/* Green accent blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#16B86A]/5 blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Brand badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#16B86A]/30 bg-[#16B86A]/10 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#16B86A] animate-pulse" />
              <span className="text-[#16B86A] font-semibold text-xs tracking-widest uppercase">
                DENSE360 — The Right Choice
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="font-display text-[4.5rem] sm:text-[5.5rem] lg:text-[6rem] font-black leading-[0.9] text-white tracking-tight">
                THE
                <br />
                <span className="text-[#16B86A]">RIGHT</span>
                <br />
                CHOICE.
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <p className="text-slate-300 text-xl sm:text-2xl font-medium tracking-wide">
                Know Your Options. Choose Your Path.
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="space-y-3"
            >
              <p className="text-slate-400 text-base leading-relaxed max-w-lg">
                An education experience for students, parents and educators.
              </p>
              <p className="text-slate-300 text-sm tracking-wide font-medium">
                Connecting Schools. Engaging Students. Creating Opportunities.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#16B86A] hover:bg-[#129B58] text-white font-bold text-base shadow-xl shadow-green-900/30 hover:shadow-green-900/50 transition-all duration-200 transform hover:-translate-y-1"
              >
                <span>FILL THE DETAILS</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={handleExplore}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold text-base hover:border-[#16B86A]/50 hover:bg-white/5 transition-all duration-200"
              >
                EXPLORE DENSE360
              </button>
            </motion.div>

            {/* Stats row — only show when real data exists, for now show programme pillars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              {['LEARN', 'PARTICIPATE', 'CREATE', 'COLLABORATE', 'DISCOVER'].map((word) => (
                <div key={word} className="text-xs font-bold tracking-widest text-[#16B86A]/70 uppercase">
                  {word}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 360° Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[420px] h-[420px]">
              {/* Central concept circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Rotating outer ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-full h-full"
                >
                  <svg viewBox="0 0 420 420" className="w-full h-full">
                    <circle cx="210" cy="210" r="200" stroke="#16B86A" strokeWidth="1.5" fill="none" strokeDasharray="8 16" opacity="0.3" />
                    <circle cx="210" cy="210" r="170" stroke="#ffffff" strokeWidth="1" fill="none" strokeDasharray="4 20" opacity="0.1" />
                  </svg>
                </motion.div>

                {/* Middle ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-[280px] h-[280px]"
                >
                  <svg viewBox="0 0 280 280" className="w-full h-full">
                    <circle cx="140" cy="140" r="130" stroke="#16B86A" strokeWidth="2" fill="none" strokeDasharray="18 10" opacity="0.4" />
                  </svg>
                </motion.div>

                {/* Center badge */}
                <div className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-br from-[#16B86A] to-[#0E7D46] flex flex-col items-center justify-center shadow-2xl shadow-green-800/40">
                  <span className="text-white font-display font-black text-4xl leading-none">360°</span>
                  <span className="text-green-100 text-[10px] font-bold tracking-widest mt-1">DENSE</span>
                </div>

                {/* Orbital label nodes */}
                {[
                  { label: 'Schools', angle: -90, icon: '🏫' },
                  { label: 'Students', angle: 0, icon: '👤' },
                  { label: 'Activities', angle: 90, icon: '✦' },
                  { label: 'Opportunities', angle: 180, icon: '🎯' },
                ].map(({ label, angle, icon }) => {
                  const rad = (angle - 90) * (Math.PI / 180);
                  const r = 200;
                  const x = 50 + (r / 420) * 100 * Math.cos(rad);
                  const y = 50 + (r / 420) * 100 * Math.sin(rad);
                  return (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + angle / 1000 }}
                      className="absolute flex flex-col items-center gap-1"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-[#0B2344] border-2 border-[#16B86A]/40 flex items-center justify-center shadow-lg shadow-black/30">
                        <span className="text-lg">{icon}</span>
                      </div>
                      <span className="text-white/80 text-[10px] font-bold tracking-wider uppercase">{label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-slate-500 text-xs tracking-widest uppercase font-medium">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 text-[#16B86A] animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
