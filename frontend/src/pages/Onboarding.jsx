import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ParticleCanvas from '../components/ambient/ParticleCanvas'
import BreathingOrb from '../components/ambient/BreathingOrb'
import useAppStore from '../store/useAppStore'

const SLIDES = [
  {
    id: 0,
    label: 'SANCTUARY',
    title: 'Tend a living sanctuary',
    titleItalic: 'powered by quiet AI.',
    body: 'Step into a world where nature and intelligence exist in perfect stillness. FloraVerse watches, learns, and cares.',
    accent: '#6aad7a',
    bg: { from: '#050d07', mid: '#0d2318', radial: 'rgba(45,90,61,0.4)' },
  },
  {
    id: 1,
    label: 'CONNECTION',
    title: 'Your plants whisper.',
    titleItalic: 'FloraVerse listens.',
    body: 'Our AI reads the subtle signs — leaf patterns, color shifts, growth rhythms — and translates them into gentle, intelligent care.',
    accent: '#d4a843',
    bg: { from: '#080903', mid: '#1a1a08', radial: 'rgba(212,168,67,0.2)' },
  },
  {
    id: 2,
    label: 'HARMONY',
    title: 'Nature, intelligence,',
    titleItalic: 'and care in harmony.',
    body: 'From disease detection to harvest timing, FloraVerse is your calm AI companion — silently watching over every leaf.',
    accent: '#92c9a0',
    bg: { from: '#050d07', mid: '#0a1a0f', radial: 'rgba(106,173,122,0.25)' },
  },
]

export default function Onboarding() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir]         = useState(1)
  const navigate              = useNavigate()
  const completeOnboarding    = useAppStore((s) => s.completeOnboarding)

  const slide = SLIDES[current]

  const goTo = (i) => {
    setDir(i > current ? 1 : -1)
    setCurrent(i)
  }

  const next = () => {
    if (current < SLIDES.length - 1) goTo(current + 1)
    else finish()
  }

  const finish = () => {
    completeOnboarding()
    navigate('/dashboard')
  }

  // Auto-advance every 8 seconds
  useEffect(() => {
    const t = setTimeout(next, 8000)
    return () => clearTimeout(t)
  }, [current])

  const variants = {
    enter:  (d) => ({ opacity: 0, x: d * 60, y: 20 }),
    center: { opacity: 1, x: 0, y: 0 },
    exit:   (d) => ({ opacity: 0, x: -d * 40, y: -10 }),
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Dynamic background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${slide.id}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{
            background: `radial-gradient(ellipse at 50% 80%, ${slide.bg.radial} 0%, ${slide.bg.mid} 40%, ${slide.bg.from} 100%)`,
          }}
        />
      </AnimatePresence>

      {/* Particle ambient */}
      <ParticleCanvas />

      {/* Volumetric light */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px opacity-30"
          style={{
            height: '60%',
            background: `linear-gradient(180deg, ${slide.accent}80 0%, transparent 100%)`,
            filter: 'blur(1px)',
            boxShadow: `0 0 40px 20px ${slide.accent}20`,
          }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col h-full px-6 pt-16">

        {/* Skip button */}
        <div className="flex justify-end mb-8">
          <button onClick={finish} className="btn-ghost text-sm py-2 px-5">
            Skip
          </button>
        </div>

        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-2xl">🌿</span>
          <span className="font-display text-xl font-light tracking-widest text-dawn-100">
            FLORA<span className="font-medium" style={{ color: slide.accent }}>VERSE</span>
          </span>
        </motion.div>

        {/* Breathing orb */}
        <div className="flex justify-center mb-16">
          <motion.div
            key={`orb-${slide.id}`}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <BreathingOrb
              size={100}
              color={slide.id === 1 ? 'gold' : 'forest'}
              pulse
            />
          </motion.div>
        </div>

        {/* Slide text */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={`slide-${slide.id}`}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col"
          >
            <p className="section-subtitle tracking-[0.25em] mb-4" style={{ color: slide.accent }}>
              {slide.label}
            </p>

            <h2 className="font-display text-4xl font-light text-dawn-100 leading-tight mb-2">
              {slide.title}
            </h2>
            <h2 className="font-display text-4xl font-light italic leading-tight mb-8" style={{ color: slide.accent }}>
              {slide.titleItalic}
            </h2>

            <p className="font-body text-dawn-300 leading-relaxed text-base font-light max-w-sm">
              {slide.body}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Bottom controls */}
        <div className="pb-12 space-y-8">
          {/* Dot navigation */}
          <div className="flex justify-center gap-2.5">
            {SLIDES.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-400"
                style={{
                  width:   i === current ? 24 : 6,
                  height:  6,
                  background: i === current ? slide.accent : 'rgba(255,255,255,0.25)',
                }}
                animate={{ width: i === current ? 24 : 6 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          {/* CTA button */}
          <motion.button
            onClick={next}
            className="w-full py-4 rounded-2xl font-body font-medium text-base relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${slide.accent} 0%, ${slide.accent}cc 100%)`,
              color: current === 1 ? '#1a1205' : '#0a1a0f',
              boxShadow: `0 8px 30px ${slide.accent}40`,
            }}
            whileTap={{ scale: 0.97 }}
            whileHover={{ boxShadow: `0 12px 40px ${slide.accent}60` }}
          >
            {current < SLIDES.length - 1 ? 'Continue' : 'Enter FloraVerse'}

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
