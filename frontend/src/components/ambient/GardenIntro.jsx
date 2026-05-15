import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─ Depth layers: far → near ─────────────────────────────────────
   Each layer scales at a different rate to create parallax depth.
   The camera "pushes" from z=far to z=close.                    */
const LAYERS = [
  /* sky/canopy — barely moves */
  { emoji: '🌲', x: 15,  y: 12, size: 4.5, scale: 0.10, opacity: 0.18, blur: 6 },
  { emoji: '🌳', x: 72,  y: 8,  size: 5.5, scale: 0.12, opacity: 0.20, blur: 5 },
  { emoji: '🌿', x: 44,  y: 18, size: 3.5, scale: 0.08, opacity: 0.15, blur: 7 },
  /* midground */
  { emoji: '🌱', x: 22,  y: 48, size: 5,   scale: 0.25, opacity: 0.35, blur: 3 },
  { emoji: '🪴', x: 60,  y: 44, size: 6,   scale: 0.28, opacity: 0.40, blur: 2 },
  { emoji: '🍃', x: 80,  y: 52, size: 4.5, scale: 0.22, opacity: 0.30, blur: 4 },
  { emoji: '🌿', x: 8,   y: 55, size: 5.5, scale: 0.26, opacity: 0.38, blur: 3 },
  /* foreground — moves fastest */
  { emoji: '🌱', x: -4,  y: 70, size: 9,   scale: 0.60, opacity: 0.55, blur: 0 },
  { emoji: '🌿', x: 82,  y: 68, size: 11,  scale: 0.65, opacity: 0.60, blur: 0 },
  { emoji: '🪴', x: 36,  y: 65, size: 13,  scale: 0.70, opacity: 0.65, blur: 0 },
  { emoji: '🌳', x: 58,  y: 60, size: 14,  scale: 0.72, opacity: 0.58, blur: 1 },
]

/* Animation phases */
const TOTAL_MS = 5500   // total intro length
const PHASES   = { dark: 0, emerge: 500, push: 1800, land: 4000, exit: 5000 }

export default function GardenIntro({ onComplete }) {
  const [ms, setMs]         = useState(0)
  const timersRef           = React.useRef([])

  /* Tick every 16ms for smooth progress */
  useEffect(() => {
    const start = Date.now()
    const raf   = setInterval(() => setMs(Date.now() - start), 16)
    return () => clearInterval(raf)
  }, [])

  /* Auto-complete */
  useEffect(() => {
    const t = setTimeout(onComplete, TOTAL_MS)
    timersRef.current = [t]
    return () => clearTimeout(t)
  }, [onComplete])

  const skip = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    onComplete()
  }, [onComplete])

  const progress = Math.min(ms / TOTAL_MS, 1)
  const isDark   = ms < PHASES.emerge
  const isEmerge = ms >= PHASES.emerge && ms < PHASES.push
  const isPush   = ms >= PHASES.push   && ms < PHASES.land
  const isLand   = ms >= PHASES.land   && ms < PHASES.exit
  const isExit   = ms >= PHASES.exit

  /* Camera push ratio 0→1 during push phase */
  const pushRatio = isPush
    ? Math.min((ms - PHASES.push) / (PHASES.land - PHASES.push), 1)
    : isLand || isExit ? 1 : 0

  /* eased push */
  const eased = pushRatio < 0.5
    ? 2 * pushRatio * pushRatio
    : 1 - Math.pow(-2 * pushRatio + 2, 2) / 2

  return (
    <motion.div
      className="fixed inset-0 z-[200] overflow-hidden cursor-pointer select-none"
      style={{ background: '#050A05' }}
      animate={{ opacity: isExit ? 0 : 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      onClick={skip}
    >

      {/* ── AMBIENT GREEN GLOW ─────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,200,80,0.07) 0%, transparent 70%)',
        }}
        animate={{ opacity: isDark ? 0 : isPush ? 0.3 + eased * 0.5 : 0.15 }}
        transition={{ duration: 1.2 }}
      />

      {/* ── LIGHT BEAM FROM TOP ───────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: '50%', top: 0,
          transform: 'translateX(-50%)',
          width: '40%', height: '70%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
          filter: 'blur(30px)',
        }}
        animate={{ opacity: isDark ? 0 : isPush ? 0.5 + eased * 0.5 : 0.2, scaleX: isPush ? 1 + eased * 0.5 : 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* ── PLANT PARALLAX LAYERS ─────────────────────────────── */}
      {LAYERS.map((l, i) => {
        /* Each layer scales toward viewer at different speed */
        const pushScale  = 1 + eased * l.scale * 3.5
        const pushTransY = eased * l.scale * 120

        return (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: `${l.x}%`,
              top:  `${l.y}%`,
              fontSize: `${l.size}rem`,
              filter: `blur(${l.blur * (1 - eased * 0.8)}px)`,
              transformOrigin: 'center bottom',
            }}
            animate={{
              opacity: isDark ? 0 : isExit ? 0 : l.opacity + eased * 0.15,
              scale:   isDark ? 0.6 : pushScale,
              y:       isDark ? 30 : -pushTransY,
            }}
            transition={{
              opacity: { duration: 0.9, delay: isDark ? 0 : 0.05 * i },
              scale:   { duration: 0.05, ease: 'linear' },
              y:       { duration: 0.05, ease: 'linear' },
            }}
          >
            {l.emoji}
          </motion.div>
        )
      })}

      {/* ── GROUND MIST ───────────────────────────────────────── */}
      {[1, 2, 3].map(i => (
        <motion.div
          key={`m${i}`}
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            bottom: `${(i - 1) * 10}%`,
            height: '25%',
            background: `linear-gradient(to top, rgba(0,180,80,${0.025 / i}) 0%, transparent 100%)`,
            filter: 'blur(24px)',
          }}
          animate={{
            x: [`-${i * 5}%`, `${i * 5}%`, `-${i * 5}%`],
            opacity: isDark ? 0 : 0.8,
          }}
          transition={{
            x: { duration: 10 + i * 3, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 1 },
          }}
        />
      ))}

      {/* ── FLOATING PARTICLES ───────────────────────────────── */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={`p${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  i % 4 === 0 ? 3 : 2,
            height: i % 4 === 0 ? 3 : 2,
            left:   `${10 + (i * 4.7) % 80}%`,
            top:    `${20 + (i * 7.3) % 60}%`,
            background: i % 3 === 0 ? 'rgba(0,220,90,0.9)' : 'rgba(255,255,255,0.7)',
            boxShadow: i % 3 === 0 ? '0 0 6px rgba(0,220,90,0.8)' : 'none',
          }}
          animate={isDark ? { opacity: 0 } : {
            y:       [0, -(40 + (i % 5) * 20)],
            x:       [0, ((i % 2 === 0 ? 1 : -1) * (5 + i % 8))],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: 2.5 + (i % 4) * 0.8,
            repeat:   Infinity,
            delay:    (i * 0.3) % 3,
            ease:     'easeOut',
          }}
        />
      ))}

      {/* ── CENTER CONTENT ────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

        {/* Logo orb */}
        <motion.div
          className="mb-6 flex items-center justify-center rounded-full"
          style={{
            width: 64, height: 64,
            background: 'rgba(0,200,80,0.06)',
            border: '1px solid rgba(0,200,80,0.2)',
          }}
          animate={{
            opacity: isDark ? 0 : isEmerge ? 1 : isPush ? 0.4 : 0,
            scale:   isDark ? 0.7 : 1,
            boxShadow: isPush
              ? `0 0 ${40 + eased * 40}px rgba(0,200,80,${0.1 + eased * 0.2})`
              : '0 0 20px rgba(0,200,80,0.1)',
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span style={{ fontSize: '1.8rem' }}>🌿</span>
        </motion.div>

        {/* Brand name */}
        <motion.div
          className="text-center"
          animate={{
            opacity: isDark ? 0 : isEmerge ? 1 : 0,
            y:       isDark ? 20 : isEmerge ? 0 : -30,
          }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.35em', color: 'rgba(0,200,80,0.5)', marginBottom: '0.75rem' }}>
            FLORAVERSE AI
          </p>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '3rem',
            fontWeight: 300,
            color: '#f0f5f0',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>
            Your Garden.<br />
            <span style={{ color: '#00c850' }}>Intelligent.</span>
          </h1>
        </motion.div>

        {/* Push phase text */}
        <motion.p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.5rem',
            letterSpacing: '0.28em',
            color: 'rgba(0,200,80,0.4)',
            marginTop: '2rem',
          }}
          animate={{ opacity: isPush ? 0.8 : 0 }}
          transition={{ duration: 0.5 }}
        >
          ENTERING YOUR GARDEN
        </motion.p>
      </div>

      {/* ── PROGRESS BAR ──────────────────────────────────────── */}
      <div
        className="absolute bottom-10 left-1/2"
        style={{ transform: 'translateX(-50%)', width: 100, height: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 9999 }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, rgba(0,200,80,0.4), rgba(0,200,80,0.9))',
            borderRadius: 9999,
            boxShadow: '0 0 8px rgba(0,200,80,0.5)',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      {/* ── CORNER BRACKETS ───────────────────────────────────── */}
      {[
        { style: { top: 20, left: 20 },   path: 'M0 12V0H12' },
        { style: { top: 20, right: 20 },  path: 'M20 12V0H8' },
        { style: { bottom: 20, right: 20 }, path: 'M20 8V20H8' },
        { style: { bottom: 20, left: 20 }, path: 'M0 8V20H12' },
      ].map((c, i) => (
        <motion.svg
          key={i}
          width="20" height="20" viewBox="0 0 20 20" fill="none"
          className="absolute pointer-events-none"
          style={c.style}
          animate={{ opacity: isDark ? 0 : 0.25 }}
          transition={{ duration: 0.8, delay: i * 0.08 }}
        >
          <path d={c.path} stroke="rgba(0,200,80,0.7)" strokeWidth="1.2" />
        </motion.svg>
      ))}

      {/* ── TAP TO SKIP ───────────────────────────────────────── */}
      <motion.p
        className="absolute"
        style={{
          bottom: 40, right: 24,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.44rem',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.18)',
        }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
      >
        TAP TO SKIP
      </motion.p>

    </motion.div>
  )
}
