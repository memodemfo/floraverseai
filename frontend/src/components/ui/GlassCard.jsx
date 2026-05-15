import { motion } from 'framer-motion'

export default function GlassCard({
  children,
  className = '',
  variant = 'default',
  hover = true,
  onClick,
  delay = 0,
  animate = true,
}) {
  const variants = {
    default:  'glass-card',
    light:    'glass-card-light',
    gold:     'glass-card-gold',
    bare:     '',
  }

  const base = variants[variant] || variants.default

  const Comp = animate ? motion.div : 'div'
  const animProps = animate
    ? {
        initial:    { opacity: 0, y: 16 },
        animate:    { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay },
        whileHover: hover ? { y: -2, boxShadow: '0 12px 40px rgba(0,0,0,0.5)' } : undefined,
        whileTap:   onClick ? { scale: 0.98 } : undefined,
      }
    : {}

  return (
    <Comp
      className={`rounded-3xl overflow-hidden ${base} ${className}`}
      onClick={onClick}
      {...animProps}
    >
      {children}
    </Comp>
  )
}
