import React, { useEffect, useState, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STAGES = [
  { until: 15, label: 'Uploading file to secure servers...', icon: '⬆️' },
  { until: 35, label: 'Analyzing document structure...', icon: '🔍' },
  { until: 55, label: 'Converting pages...', icon: '⚙️' },
  { until: 75, label: 'Applying formatting...', icon: '✨' },
  { until: 90, label: 'Optimizing output...', icon: '🚀' },
  { until: 99, label: 'Almost ready...', icon: '📦' },
  { until: 100, label: 'Done!', icon: '✅' },
];

function getStage(pct) {
  return STAGES.find(s => pct <= s.until) || STAGES[STAGES.length - 1];
}

function ProcessingView({ message, progress = 0 }) {
  const [displayPct, setDisplayPct] = useState(0);
  const [autoProgress, setAutoProgress] = useState(0);
  const intervalRef = useRef(null);
  const lastExternalRef = useRef(0);

  // Smart auto-progress: fills naturally, slows near 90%, jumps when real progress arrives
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setAutoProgress(prev => {
        const real = lastExternalRef.current;
        const effective = Math.max(prev, real);
        if (effective >= 99) return 99;
        // Slow down as we approach ceiling to avoid false 100%
        const ceiling = real > 0 ? Math.min(real + 15, 92) : 88;
        if (effective >= ceiling) return effective + 0.05;
        const speed = effective < 30 ? 0.8 : effective < 60 ? 0.4 : effective < 80 ? 0.2 : 0.08;
        return Math.min(effective + speed, ceiling);
      });
    }, 80);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Sync real external progress
  useEffect(() => {
    if (progress > 0) {
      lastExternalRef.current = progress;
      setAutoProgress(prev => Math.max(prev, progress));
    }
  }, [progress]);

  // Smooth display
  useEffect(() => {
    const t = setInterval(() => {
      setDisplayPct(prev => {
        const diff = autoProgress - prev;
        if (Math.abs(diff) < 0.5) return Math.round(autoProgress);
        return Math.round(prev + diff * 0.15);
      });
    }, 80);
    return () => clearInterval(t);
  }, [autoProgress]);

  const pct = Math.min(Math.round(displayPct), 100);
  const stage = getStage(pct);
  const size = 160;
  const r = 64;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (circumference * pct) / 100;
  const dotAngle = ((pct / 100) * 360 - 90) * (Math.PI / 180);
  const dotX = size / 2 + r * Math.cos(dotAngle);
  const dotY = size / 2 + r * Math.sin(dotAngle);

  return (
    <div className="flex flex-col items-center gap-8 py-10 select-none">

      {/* Outer glow rings */}
      <div className="relative flex items-center justify-center" style={{ width: size + 80, height: size + 80 }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size + 24 + i * 22,
              height: size + 24 + i * 22,
              background: `radial-gradient(circle, rgba(0,200,150,${0.06 - i * 0.015}) 0%, transparent 70%)`,
              border: `1px solid rgba(0,200,150,${0.15 - i * 0.04})`,
            }}
            animate={{ scale: [1, 1.04 + i * 0.02, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 2.8 + i * 0.5, delay: i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Main circle */}
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="pgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00C896" />
                <stop offset="50%" stopColor="#00A8FF" />
                <stop offset="100%" stopColor="#7B61FF" />
              </linearGradient>
              <filter id="pgGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {/* Track */}
            <circle
              cx={size/2} cy={size/2} r={r}
              fill="none"
              stroke="rgba(128,128,128,0.15)"
              strokeWidth="8"
            />
            {/* Progress arc */}
            <circle
              cx={size/2} cy={size/2} r={r}
              fill="none"
              stroke="url(#pgGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              filter="url(#pgGlow)"
              transform={`rotate(-90 ${size/2} ${size/2})`}
              style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
            />
            {/* Spinning dot at tip */}
            {pct > 2 && (
              <circle
                cx={dotX}
                cy={dotY}
                r={5}
                fill="#00C896"
                filter="url(#pgGlow)"
              />
            )}
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <AnimatePresence mode="wait">
              <motion.span
                key={stage.icon}
                className="text-2xl"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {stage.icon}
              </motion.span>
            </AnimatePresence>
            <motion.span
              className="text-2xl font-bold font-mono"
              style={{ color: '#00C896' }}
            >
              {pct}%
            </motion.span>
          </div>
        </div>
      </div>

      {/* Stage label */}
      <div className="flex flex-col items-center gap-3 text-center px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={stage.label}
            className="text-sm font-semibold text-foreground"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            {stage.label}
          </motion.p>
        </AnimatePresence>

        {/* Mini progress bar */}
        <div className="w-48 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(128,128,128,0.15)' }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #00C896, #00A8FF)',
              transition: 'width 0.3s ease-out',
            }}
          />
        </div>

        <p className="text-xs text-muted-foreground mt-1">
          Your file is encrypted and deleted after 1 hour
        </p>
      </div>
    </div>
  );
}

export default memo(ProcessingView);