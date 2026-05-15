import { motion } from 'framer-motion'

export default function BreathingOrb({ size = 120, className = '', color = 'neon', label = '', pulse = true }) {
  const isGold = color === 'gold'
  const neonC  = isGold ? '#d4a843' : '#00e85c'
  const glowC  = isGold ? 'rgba(212,168,67,0.4)' : 'rgba(0,232,92,0.35)'
  const ringC  = isGold ? 'rgba(212,168,67,0.08)' : 'rgba(0,232,92,0.06)'

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outermost ambient haze */}
      {pulse && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: size * 2.6, height: size * 2.6, background: `radial-gradient(circle, ${ringC} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Pulse ring 1 */}
      {pulse && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: size * 1.9, height: size * 1.9, border: `1px solid ${isGold ? 'rgba(212,168,67,0.12)' : 'rgba(0,232,92,0.12)'}` }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
      )}

      {/* Pulse ring 2 */}
      {pulse && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: size * 1.45, height: size * 1.45, border: `1px solid ${isGold ? 'rgba(212,168,67,0.20)' : 'rgba(0,232,92,0.20)'}` }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.8, 0.2, 0.8] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        />
      )}

      {/* Mid glow bloom */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 1.2, height: size * 1.2,
          background: `radial-gradient(circle, ${glowC} 0%, transparent 65%)`,
          filter: 'blur(12px)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Core orb */}
      <motion.div
        className="relative rounded-full flex items-center justify-center overflow-hidden"
        style={{ width: size, height: size }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Body */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 38% 32%, rgba(255,255,255,0.22) 0%, ${neonC}22 40%, rgba(0,0,0,0.4) 100%)`,
            border: `1px solid ${neonC}30`,
            boxShadow: `0 0 ${size * 0.6}px ${glowC}, inset 0 1px 3px rgba(255,255,255,0.15)`,
          }}
        />
        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.12) 0%, transparent 55%)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Label */}
        <span className="relative font-mono text-xs font-light tracking-widest" style={{ color: `${neonC}cc` }}>
          AI
        </span>
      </motion.div>

      {label && (
        <p className="absolute -bottom-7 text-xs font-mono tracking-widest" style={{ color: neonC + '80' }}>
          {label}
        </p>
      )}
    </div>
  )
}
