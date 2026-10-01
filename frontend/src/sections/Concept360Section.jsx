import React, { useState } from 'react';
import { motion } from 'framer-motion';

const nodes = [
  { label: 'Schools', color: '#16B86A', angle: 270, info: 'Partner schools provide institutional support, enabling DENSE360 to reach students effectively.' },
  { label: 'Students', color: '#3B82F6', angle: 0, info: 'Students participate in structured experiences designed to build real-world skills and confidence.' },
  { label: 'Activities', color: '#F59E0B', angle: 90, info: 'Curated activities spanning creativity, teamwork, problem-solving and interactive learning.' },
  { label: 'Opportunities', color: '#EC4899', angle: 180, info: 'Every programme creates a new opportunity — to learn, to showcase, and to grow.' },
];

function OrbitalNode({ label, color, angle, info, isActive, onActivate }) {
  const rad = ((angle - 90) * Math.PI) / 180;
  const r = 160;
  const cx = 210, cy = 210;
  const x = cx + r * Math.cos(rad);
  const y = cy + r * Math.sin(rad);

  return (
    <g>
      {/* Connector line */}
      <line x1={cx} y1={cy} x2={x} y2={y} stroke={isActive ? color : '#1E3A5F'} strokeWidth={isActive ? 2 : 1} strokeDasharray="4 4" opacity={isActive ? 0.8 : 0.3} />
      {/* Node circle */}
      <circle
        cx={x}
        cy={y}
        r={28}
        fill={isActive ? color : '#0E2A50'}
        stroke={color}
        strokeWidth={2}
        style={{ cursor: 'pointer' }}
        onClick={onActivate}
      />
      {/* Label */}
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={isActive ? '#fff' : color}
        fontSize="10"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
        style={{ pointerEvents: 'none', letterSpacing: '0.05em' }}
      >
        {label}
      </text>
    </g>
  );
}

export default function Concept360Section() {
  const [activeNode, setActiveNode] = useState(null);
  const activeInfo = nodes.find(n => n.label === activeNode);

  return (
    <section id="concept360" className="py-24 bg-[#F5F2EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#16B86A]/10 text-[#16B86A] text-xs font-bold tracking-widest uppercase mb-5">
            360° Concept
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#0B2344] leading-tight">
            Connecting Schools.
            <br />
            <span className="text-[#16B86A]">Engaging Students.</span>
            <br />
            Creating Opportunities.
          </h2>
          <p className="mt-5 text-[#64748B] text-base sm:text-lg max-w-2xl mx-auto">
            The DENSE360 ecosystem brings together every element of a meaningful student experience into one cohesive programme.
          </p>
          <p className="mt-3 text-[#64748B]/70 text-sm">Tap any node to learn more.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* SVG Orbital Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-[420px]"
          >
            <svg viewBox="0 0 420 420" className="w-full h-full drop-shadow-xl">
              {/* Outer decorative rings */}
              <circle cx="210" cy="210" r="198" stroke="#0B2344" strokeWidth="1" fill="none" opacity="0.06" />
              <circle cx="210" cy="210" r="165" stroke="#16B86A" strokeWidth="1" fill="none" strokeDasharray="6 10" opacity="0.25" />
              <circle cx="210" cy="210" r="120" stroke="#0B2344" strokeWidth="1" fill="none" strokeDasharray="4 8" opacity="0.08" />

              {/* Nodes */}
              {nodes.map((node) => (
                <OrbitalNode
                  key={node.label}
                  {...node}
                  isActive={activeNode === node.label}
                  onActivate={() => setActiveNode(activeNode === node.label ? null : node.label)}
                />
              ))}

              {/* Center badge */}
              <circle cx="210" cy="210" r="50" fill="#0B2344" />
              <circle cx="210" cy="210" r="48" fill="url(#centerGrad)" />
              <defs>
                <radialGradient id="centerGrad" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="#1D4E89" />
                  <stop offset="100%" stopColor="#0B2344" />
                </radialGradient>
              </defs>
              <text x="210" y="203" textAnchor="middle" fill="#16B86A" fontSize="20" fontWeight="900" fontFamily="Inter, sans-serif">
                360°
              </text>
              <text x="210" y="223" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="3">
                DENSE
              </text>
            </svg>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:max-w-md space-y-5"
          >
            {/* Dynamic info card */}
            <div className="min-h-[120px]">
              {activeInfo ? (
                <motion.div
                  key={activeInfo.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border-2 p-6"
                  style={{ borderColor: activeInfo.color + '40', backgroundColor: activeInfo.color + '08' }}
                >
                  <h3 className="font-display font-bold text-xl text-[#0B2344] mb-2">
                    {activeInfo.label}
                  </h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{activeInfo.info}</p>
                </motion.div>
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-[#0B2344]/15 p-6 text-center">
                  <p className="text-[#64748B] text-sm">
                    Tap a node on the diagram to explore how it fits into the DENSE360 ecosystem.
                  </p>
                </div>
              )}
            </div>

            {/* Static node cards */}
            {nodes.map((node) => (
              <button
                key={node.label}
                onClick={() => setActiveNode(activeNode === node.label ? null : node.label)}
                className={`w-full flex items-start gap-4 rounded-2xl p-4 border-2 text-left transition-all ${
                  activeNode === node.label
                    ? 'border-current bg-white shadow-premium'
                    : 'border-[#0B2344]/10 bg-white hover:border-[#0B2344]/20 hover:shadow-subtle'
                }`}
                style={{ borderColor: activeNode === node.label ? node.color : undefined }}
              >
                <span
                  className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: node.color }}
                >
                  {node.label[0]}
                </span>
                <div>
                  <p className="font-bold text-[#0B2344] text-sm">{node.label}</p>
                  <p className="text-[#64748B] text-xs mt-0.5 line-clamp-2">{node.info}</p>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
