import React, { memo } from "react";
import { motion } from "framer-motion";

const TRACK_BG = "/pic/1762614705362.jpeg";

const TRAILS = [
  {
    id: "blue-main",
    path: "M-32 350 C 120 310 240 270 380 230 C 520 190 590 210 630 250",
    gradient: "gradientBlue",
    strokeWidth: 5.6,
    delay: 0,
    duration: 6.1,
    opacity: 0.95,
  },
  {
    id: "red-main",
    path: "M-40 320 C 110 270 240 220 380 190 C 520 155 600 170 650 220",
    gradient: "gradientRed",
    strokeWidth: 5,
    delay: 0.35,
    duration: 6.4,
    opacity: 0.9,
  },
  {
    id: "blue-secondary",
    path: "M-24 390 C 130 340 250 300 400 260 C 540 225 600 250 660 300",
    gradient: "gradientBlueSoft",
    strokeWidth: 3.9,
    delay: 0.7,
    duration: 6.8,
    opacity: 0.72,
  },
  {
    id: "red-secondary",
    path: "M-36 280 C 120 230 250 180 400 160 C 520 145 600 160 640 210",
    gradient: "gradientRedSoft",
    strokeWidth: 3.4,
    delay: 1,
    duration: 7,
    opacity: 0.65,
  },
];

const DASH_LENGTH = 1200;

const NeonTrails = () => {
  return (
    <div
      className="neon-trails"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(2,4,10,0.95) 0%, rgba(3,6,14,0.92) 55%, rgba(4,6,16,0.97) 100%),
          radial-gradient(circle at 18% 22%, rgba(59,130,246,0.15), transparent 42%),
          radial-gradient(circle at 76% 68%, rgba(239,68,68,0.16), transparent 46%),
          url('${TRACK_BG}')`,
      }}
    >
      <div className="neon-trails__flare neon-trails__flare--left" />
      <div className="neon-trails__flare neon-trails__flare--right" />

      <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" role="presentation" aria-hidden="true">
        <defs>
          <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.98)" />
            <stop offset="45%" stopColor="rgba(59,130,246,0.98)" />
            <stop offset="100%" stopColor="rgba(14,165,233,0.96)" />
          </linearGradient>
          <linearGradient id="gradientRed" x1="10%" y1="90%" x2="90%" y2="10%">
            <stop offset="0%" stopColor="rgba(248,113,113,0.95)" />
            <stop offset="50%" stopColor="rgba(239,68,68,0.95)" />
            <stop offset="100%" stopColor="rgba(255,71,122,0.92)" />
          </linearGradient>
          <linearGradient id="gradientBlueSoft" x1="5%" y1="95%" x2="95%" y2="5%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.7)" />
            <stop offset="60%" stopColor="rgba(59,130,246,0.68)" />
            <stop offset="100%" stopColor="rgba(14,165,233,0.75)" />
          </linearGradient>
          <linearGradient id="gradientRedSoft" x1="95%" y1="0%" x2="5%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,127,127,0.7)" />
            <stop offset="55%" stopColor="rgba(239,68,68,0.7)" />
            <stop offset="100%" stopColor="rgba(255,99,132,0.74)" />
          </linearGradient>

          <radialGradient id="pulseBlue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.95)" />
            <stop offset="40%" stopColor="rgba(56,189,248,0.45)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0)" />
          </radialGradient>

          <radialGradient id="pulseRed" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(239,68,68,0.92)" />
            <stop offset="40%" stopColor="rgba(239,68,68,0.42)" />
            <stop offset="100%" stopColor="rgba(239,68,68,0)" />
          </radialGradient>

          <filter id="lineGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="bloom" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="bloom" />
            <feMerge>
              <feMergeNode in="bloom" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#lineGlow)">
          {TRAILS.map((trail) => (
            <motion.path
              key={trail.id}
              d={trail.path}
              fill="none"
              stroke={`url(#${trail.gradient})`}
              strokeWidth={trail.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={DASH_LENGTH}
              initial={{ strokeDashoffset: DASH_LENGTH }}
              animate={{ strokeDashoffset: -DASH_LENGTH }}
              transition={{
                duration: trail.duration,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                delay: trail.delay,
              }}
              opacity={trail.opacity}
              style={{ mixBlendMode: "screen" }}
            />
          ))}
        </g>

        <motion.circle
          r={22}
          fill="url(#pulseBlue)"
          initial={{
            cx: 120,
            cy: 300,
          }}
          animate={{
            cx: [120, 260, 360, 470, 560],
            cy: [300, 230, 180, 200, 260],
          }}
          transition={{
            duration: 6.4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{ mixBlendMode: "screen" }}
        />

        <motion.circle
          r={18}
          fill="url(#pulseRed)"
          initial={{ cx: 440, cy: 110 }}
          animate={{ cx: [440, 400, 460, 520], cy: [110, 150, 130, 100] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 1.2,
          }}
          style={{ mixBlendMode: "screen" }}
        />

        <motion.circle
          r={11}
          fill="rgba(56,189,248,0.75)"
          initial={{ cx: 220, cy: 210 }}
          animate={{ cx: [220, 280, 320, 260], cy: [210, 170, 220, 250] }}
          transition={{
            duration: 4.4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 0.6,
          }}
          style={{ mixBlendMode: "screen" }}
        />

        <motion.circle
          r={9}
          fill="rgba(239,68,68,0.7)"
          initial={{ cx: 120, cy: 160 }}
          animate={{ cx: [120, 200, 240, 180], cy: [160, 140, 180, 210] }}
          transition={{
            duration: 5.6,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 0.9,
          }}
          style={{ mixBlendMode: "screen" }}
        />
      </svg>

      <div className="absolute inline-flex items-center gap-3 px-4 py-2 border top-6 left-6 rounded-xl bg-white/10 border-white/20 backdrop-blur-md">
        <span className="text-[0.55rem] uppercase tracking-[0.36em] text-white/70">
          Live Session
        </span>
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-white">
          <span className="h-2 w-2 rounded-full bg-[rgba(56,189,248,0.9)] animate-pulse-slow" aria-hidden="true" />
          Racing Mode
        </span>
      </div>

      <div className="absolute flex flex-col gap-2 bottom-6 left-6">
        <span className="text-[0.55rem] uppercase tracking-[0.4em] text-white/50">
          Next Availability
        </span>
        <span className="text-sm font-semibold text-white/80">
          Book a 1:1 strategy call
        </span>
      </div>
    </div>
  );
};

export default memo(NeonTrails);
