import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Camera, Droplets, Sun, MessageCircle,
  Leaf, Bell, BarChart2, HeartPulse, ChevronRight,
  Wind, Zap, User, Settings
} from 'lucide-react'
import ForestBackground from '../components/ambient/ForestBackground'
import ParticleCanvas   from '../components/ambient/ParticleCanvas'
import GardenIntro      from '../components/ambient/GardenIntro'
import HealthRing       from '../components/ui/HealthRing'
import FloatingNav      from '../components/layout/FloatingNav'
import useAppStore      from '../store/useAppStore'

/* ── helpers ─────────────────────────────────────────────────── */
function greeting() {
  const h = new Date().getHours()
  if (h < 5)  return 'Good night'
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  if (h < 21) return 'Good evening'
  return 'Good night'
}

/* ── quick-action grid ────────────────────────────────────────── */
const ACTIONS = [
  { label: 'AI Diagnosis',   icon: Camera,       path: '/diagnosis',  accent: '#00c850', desc: 'Scan & detect disease' },
  { label: 'My Garden',      icon: Leaf,         path: '/collection', accent: '#00c850', desc: 'Manage your plants'    },
  { label: 'Smart Care',     icon: HeartPulse,   path: '/care',       accent: '#00c850', desc: 'Watering & schedules' },
  { label: 'FloraVerse AI',  icon: MessageCircle,path: '/chat',       accent: '#00c850', desc: 'Ask anything'         },
  { label: 'Analytics',      icon: BarChart2,    path: '/analytics',  accent: '#00c850', desc: 'Growth insights'      },
  { label: 'Climate',        icon: Wind,         path: '/climate',    accent: '#00c850', desc: 'Environment data'     },
  { label: 'Alerts',         icon: Bell,         path: '/alerts',     accent: '#00c850', desc: 'Notifications'        },
  { label: 'Profile',        icon: User,         path: '/profile',    accent: '#00c850', desc: 'Your account'         },
]

const ENV = [
  { icon: Droplets, label: 'Humidity', value: '62%' },
  { icon: Sun,      label: 'Light',    value: '78%' },
  { icon: Wind,     label: 'Air',      value: 'Good'},
  { icon: Zap,      label: 'Growth',   value: '+12%'},
]

/* ── animation variants ───────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:  { opacity: 0, y: 18 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] } },
})

/* ── component ────────────────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate()
  const { plants, fetchPlants, fetchAlerts, alerts } = useAppStore()

  /* Intro plays every time the dashboard mounts */
  const [introComplete, setIntroComplete] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  useEffect(() => { fetchPlants(); fetchAlerts() }, [])

  const avgHealth = Math.round(
    plants.reduce((s, p) => s + (p.health_score || 0), 0) / (plants.length || 1)
  )
  const needWater = plants.filter(p =>
    (Date.now() - new Date(p.last_watered)) / 86400000 >= p.watering_frequency
  ).length

  return (
    <>
      {/* ── GARDEN INTRO ─────────────────────── */}
      <AnimatePresence>
        {!introComplete && (
          <GardenIntro key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* ── MAIN DASHBOARD ───────────────────── */}
      <motion.div
        style={{ background: '#050A05', minHeight: '100vh', paddingBottom: 96 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <ForestBackground />
        <ParticleCanvas />

        <div className="relative z-10">

          {/* ── HEADER ─────────────────────────── */}
          <motion.div
            className="flex items-start justify-between px-6 pt-14 pb-8"
            {...fadeUp(0)}
          >
            <div>
              <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.25em', color: 'rgba(0,200,80,0.55)', marginBottom: 6 }}>
                FLORAVERSE AI
              </p>
              <h1 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '2.4rem',
                fontWeight: 300,
                color: '#f0f5f0',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
              }}>
                {greeting()},<br />
                <span style={{ color: '#00c850' }}>Gardener.</span>
              </h1>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <motion.button
                onClick={() => navigate('/alerts')}
                className="relative flex items-center justify-center rounded-full"
                style={{ width: 38, height: 38, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell size={15} color="rgba(240,245,240,0.5)" />
                {alerts.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: '#00c850', boxShadow: '0 0 6px rgba(0,200,80,0.8)' }} />
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* ── GARDEN STATS STRIP ─────────────── */}
          <motion.div className="px-6 mb-8" {...fadeUp(0.08)}>
            <div
              className="flex rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
            >
              {[
                { label: 'Plants',     value: plants.length },
                { label: 'Avg Health', value: `${avgHealth}%` },
                { label: 'Need Water', value: needWater },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="flex-1 py-4 text-center"
                  style={{
                    background: 'rgba(0,200,80,0.03)',
                    borderRight: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.6rem',
                    fontWeight: 300,
                    color: '#f0f5f0',
                    lineHeight: 1,
                  }}>
                    {s.value}
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.44rem', letterSpacing: '0.12em', color: 'rgba(240,245,240,0.3)', marginTop: 4 }}>
                    {s.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── ENVIRONMENT STRIP ──────────────── */}
          <motion.div className="px-6 mb-8" {...fadeUp(0.12)}>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.48rem', letterSpacing: '0.2em', color: 'rgba(240,245,240,0.25)', marginBottom: 10 }}>
              ENVIRONMENT
            </p>
            <div className="flex gap-2">
              {ENV.map(({ icon: Icon, label, value }) => (
                <button
                  key={label}
                  onClick={() => navigate('/climate')}
                  className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <Icon size={13} color="rgba(0,200,80,0.6)" />
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem', fontWeight: 300, color: '#f0f5f0' }}>{value}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.4rem', letterSpacing: '0.1em', color: 'rgba(240,245,240,0.25)' }}>{label.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── QUICK ACTIONS GRID ──────────────── */}
          <div className="px-6 mb-8">
            <motion.p
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.48rem', letterSpacing: '0.2em', color: 'rgba(240,245,240,0.25)', marginBottom: 12 }}
              {...fadeUp(0.15)}
            >
              FEATURES
            </motion.p>
            <div className="grid grid-cols-2 gap-3">
              {ACTIONS.map(({ label, icon: Icon, path, desc }, i) => (
                <motion.button
                  key={path}
                  onClick={() => navigate(path)}
                  className="flex flex-col items-start gap-3 p-4 rounded-2xl text-left transition-all duration-200"
                  style={{
                    background: i === 0 ? 'rgba(0,200,80,0.07)' : 'rgba(255,255,255,0.025)',
                    border: i === 0 ? '1px solid rgba(0,200,80,0.14)' : '1px solid rgba(255,255,255,0.05)',
                  }}
                  whileTap={{ scale: 0.96 }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.18 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="flex items-center justify-center rounded-xl"
                    style={{ width: 36, height: 36, background: 'rgba(0,200,80,0.08)', border: '1px solid rgba(0,200,80,0.12)' }}
                  >
                    <Icon size={16} color="#00c850" />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.8rem', color: '#f0f5f0', marginBottom: 2 }}>{label}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.68rem', color: 'rgba(240,245,240,0.35)' }}>{desc}</p>
                  </div>
                  {i === 0 && (
                    <ChevronRight size={13} color="rgba(0,200,80,0.5)" style={{ position: 'absolute', top: 16, right: 16 }} />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* ── RECENT PLANTS ──────────────────── */}
          {plants.length > 0 && (
            <div className="px-6 mb-8">
              <div className="flex items-center justify-between mb-3">
                <motion.p
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.48rem', letterSpacing: '0.2em', color: 'rgba(240,245,240,0.25)' }}
                  {...fadeUp(0.35)}
                >
                  RECENT PLANTS
                </motion.p>
                <button
                  onClick={() => navigate('/collection')}
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.44rem', letterSpacing: '0.1em', color: 'rgba(0,200,80,0.5)' }}
                >
                  VIEW ALL →
                </button>
              </div>

              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {plants.slice(0, 5).map((plant, i) => (
                  <motion.button
                    key={plant.id}
                    onClick={() => navigate('/collection')}
                    className="flex-shrink-0 flex flex-col items-center gap-2 rounded-2xl"
                    style={{
                      width: 80, padding: '12px 8px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.38 + i * 0.06 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    <motion.span
                      style={{ fontSize: '1.8rem' }}
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {plant.emoji || '🌿'}
                    </motion.span>
                    <HealthRing score={plant.health_score} size={26} strokeWidth={2} />
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', fontWeight: 500, color: 'rgba(240,245,240,0.7)', textAlign: 'center', lineHeight: 1.2 }}>
                      {plant.plant_name.split(' ').slice(0, 2).join(' ')}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* ── AI INSIGHT ──────────────────────── */}
          <motion.div className="px-6 mb-6" {...fadeUp(0.42)}>
            <div
              className="flex items-start gap-3 rounded-2xl p-4"
              style={{ background: 'rgba(0,200,80,0.04)', border: '1px solid rgba(0,200,80,0.08)' }}
            >
              <div className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 32, height: 32, background: 'rgba(0,200,80,0.08)', border: '1px solid rgba(0,200,80,0.12)', marginTop: 2 }}>
                <Leaf size={13} color="#00c850" />
              </div>
              <div>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.44rem', letterSpacing: '0.15em', color: 'rgba(0,200,80,0.45)', marginBottom: 5 }}>FLORA AI</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.78rem', color: 'rgba(240,245,240,0.6)', lineHeight: 1.6 }}>
                  {avgHealth >= 85
                    ? 'Your garden is flourishing. Continue your current care rhythm.'
                    : avgHealth >= 65
                    ? 'A few plants need attention. Adjust watering for better results.'
                    : 'Run an AI diagnosis to identify issues and get personalized advice.'}
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        <FloatingNav />
      </motion.div>
    </>
  )
}
