import { motion } from 'framer-motion'

export default function ForestBackground({ variant = 'default' }) {
  const isGolden = variant === 'golden'
  const isDiag   = variant === 'diagnosis'

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base black */}
      <div className="absolute inset-0" style={{ background: '#060806' }} />

      {/* Primary volumetric light */}
      <motion.div
        className="absolute"
        style={{
          width: '140%', height: '80%', top: '-20%', left: '-20%',
          background: isDiag
            ? 'radial-gradient(ellipse at 50% 30%, rgba(0,232,92,0.06) 0%, transparent 60%)'
            : isGolden
            ? 'radial-gradient(ellipse at 40% 20%, rgba(212,168,67,0.05) 0%, transparent 55%)'
            : 'radial-gradient(ellipse at 30% 0%, rgba(0,232,92,0.04) 0%, transparent 50%)',
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary aurora glow */}
      <motion.div
        className="absolute"
        style={{
          width: '100%', height: '60%', bottom: '0', right: '-10%',
          background: 'radial-gradient(ellipse at 80% 100%, rgba(0,232,92,0.025) 0%, transparent 50%)',
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Fog layer */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(6,8,6,0.4) 50%, rgba(6,8,6,0.9) 100%)',
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
