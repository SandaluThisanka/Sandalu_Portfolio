import React, { memo } from "react";
import { motion } from "framer-motion";

const TRAILS = [
  {
    id: "primary",
    path: "M24 320 C 150 240 210 150 330 110 C 450 70 520 120 560 210",
    gradient: "gradientPrimary",
    strokeWidth: 4.5,
    delay: 0,
    opacity: 1,
  },
  {
    id: "secondary",
    path: "M12 300 C 140 220 230 100 360 70 C 470 40 550 130 572 240",
    gradient: "gradientSecondary",
    strokeWidth: 3,
    delay: 0.65,
    opacity: 0.8,
  },
  {
    id: "tertiary",
    path: "M32 345 C 170 260 250 190 410 150 C 520 120 592 180 586 280",
    gradient: "gradientTertiary",
    strokeWidth: 3.6,
    delay: 1.1,
    opacity: 0.7,
  },
];

const DASH_LENGTH = 780;

const NeonTrails = () => {
  return (
    <div className="neon-trails">
      <div className="neon-trails__flare neon-trails__flare--left" />
      <div className="neon-trails__flare neon-trails__flare--right" />

      <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" role="presentation" aria-hidden="true">
        <defs>
          <linearGradient id="gradientPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(253,224,71,0.95)" />
            <stop offset="60%" stopColor="rgba(250,204,21,0.95)" />
            <stop offset="100%" stopColor="rgba(245,158,11,0.92)" />
          </linearGradient>
          <linearGradient id="gradientSecondary" x1="10%" y1="90%" x2="90%" y2="10%">
            <stop offset="0%" stopColor="rgba(254,240,138,0.75)" />
            <stop offset="50%" stopColor="rgba(250,204,21,0.7)" />
            <stop offset="100%" stopColor="rgba(245,158,11,0.9)" />
          </linearGradient>
          <linearGradient id="gradientTertiary" x1="5%" y1="95%" x2="95%" y2="5%">
            <stop offset="0%" stopColor="rgba(250,204,21,0.7)" />
            <stop offset="55%" stopColor="rgba(253,224,71,0.68)" />
            <stop offset="100%" stopColor="rgba(245,158,11,0.75)" />
          </linearGradient>

          <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(250,204,21,0.95)" />
            <stop offset="40%" stopColor="rgba(250,204,21,0.45)" />
            <stop offset="100%" stopColor="rgba(250,204,21,0)" />
          </radialGradient>

          <filter id="lineGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
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
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: trail.delay,
              }}
              opacity={trail.opacity}
            />
          ))}
        </g>

        <motion.circle
          r={22}
          fill="url(#pulse)"
          initial={{
            cx: 140,
            cy: 280,
          }}
          animate={{
            cx: [140, 280, 360, 470, 540],
            cy: [280, 210, 160, 180, 240],
          }}
          transition={{
            duration: 6.2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{ mixBlendMode: "screen" }}
        />

        <motion.circle
          r={16}
          fill="rgba(253,224,71,0.55)"
          initial={{ cx: 460, cy: 120 }}
          animate={{ cx: [460, 420, 480, 520], cy: [120, 160, 140, 110] }}
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
          r={10}
          fill="rgba(245,158,11,0.7)"
          initial={{ cx: 220, cy: 200 }}
          animate={{ cx: [220, 280, 300, 250], cy: [200, 170, 210, 240] }}
          transition={{
            duration: 4.4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 0.6,
          }}
          style={{ mixBlendMode: "screen" }}
        />
      </svg>

      <div className="absolute top-6 left-6 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
        <span className="text-[0.55rem] uppercase tracking-[0.36em] text-white/70">
          Live Session
        </span>
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-white">
          <span className="h-2 w-2 rounded-full bg-[rgba(250,204,21,0.9)] animate-pulse-slow" aria-hidden="true" />
          Racing Mode
        </span>
      </div>

      <div className="absolute bottom-6 left-6 flex flex-col gap-2">
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
