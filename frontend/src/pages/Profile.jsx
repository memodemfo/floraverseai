import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Bell, Moon, Leaf, BarChart2, Settings } from 'lucide-react'
import ForestBackground from '../components/ambient/ForestBackground'
import ParticleCanvas from '../components/ambient/ParticleCanvas'
import BreathingOrb from '../components/ambient/BreathingOrb'
import GlassCard from '../components/ui/GlassCard'
import FloatingNav from '../components/layout/FloatingNav'
import { achievements } from '../data/mockData'
import useAppStore from '../store/useAppStore'

const THEMES = [
  { id: 'forest',  label: 'Deep Forest',  bg: '#0a1a0f', accent: '#6aad7a' },
  { id: 'golden',  label: 'Golden Hour',  bg: '#1a1205', accent: '#d4a843' },
  { id: 'misty',   label: 'Misty Dawn',   bg: '#0f1f16', accent: '#92c9a0' },
]

function Toggle({ value, onChange, color = '#6aad7a' }) {
  return (
    <motion.button
      onClick={() => onChange(!value)}
      className="relative w-11 h-6 rounded-full flex-shrink-0 transition-colors duration-300"
      style={{ background: value ? `${color}40` : 'rgba(255,255,255,0.08)', border: `1px solid ${value ? `${color}50` : 'rgba(255,255,255,0.15)'}` }}
      whileTap={{ scale: 0.93 }}
    >
      <motion.div
        className="absolute top-0.5 w-5 h-5 rounded-full shadow-md"
        style={{ background: value ? color : 'rgba(255,255,255,0.3)' }}
        animate={{ left: value ? '1.25rem' : '0.15rem' }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />
    </motion.button>
  )
}

export default function Profile() {
  const { theme, setTheme, plants } = useAppStore()
  const [notifs, setNotifs] = useState({ watering: true, disease: true, harvest: true, weekly: false })
  const [persona, setPersona] = useState('sage')

  const earned = achievements.filter(a => a.earned).length

  return (
    <div className="relative min-h-screen pb-32">
      <ForestBackground variant={theme === 'golden' ? 'golden' : 'default'} />
      <ParticleCanvas />

      <div className="relative z-10">

        {/* ── Profile Hero ─────────────────────────── */}
        <div className="relative pt-14 pb-6 px-5 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex justify-center mb-4">
              <BreathingOrb size={80} label="Profile" pulse />
            </div>
            <h1 className="font-display text-3xl font-light text-dawn-100">Garden Sage</h1>
            <p className="font-body text-sm text-dawn-300 font-light mt-1">FloraVerse Member · Level 3</p>

            {/* Eco score */}
            <div
              className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(106,173,122,0.12)', border: '1px solid rgba(106,173,122,0.2)' }}
            >
              <span className="text-sm">🌿</span>
              <span className="font-mono text-xs text-forest-400">Eco Score: </span>
              <span className="font-display text-sm text-forest-400 gold-text">740 pts</span>
            </div>
          </motion.div>
        </div>

        {/* ── Garden Stats ──────────────────────────── */}
        <div className="px-5 mb-6">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Plants',     value: plants.length,  icon: '🌿' },
              { label: 'Care Days',  value: '28',           icon: '🔥' },
              { label: 'Diagnoses', value: '5',             icon: '🔬' },
            ].map((s, i) => (
              <GlassCard key={s.label} className="p-4 text-center" delay={i * 0.07}>
                <div className="text-xl mb-1.5">{s.icon}</div>
                <p className="font-display text-2xl font-light text-dawn-100">{s.value}</p>
                <p className="metric-label text-2xs mt-1">{s.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* ── Eco Achievements ──────────────────────── */}
        <div className="px-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-xl font-light text-dawn-100">Achievements</h2>
            <span className="font-mono text-xs text-forest-400">{earned}/{achievements.length} earned</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {achievements.map((a, i) => (
              <motion.div
                key={a.id}
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl"
                style={{
                  background: a.earned ? 'rgba(106,173,122,0.10)' : 'rgba(255,255,255,0.03)',
                  border:     `1px solid ${a.earned ? 'rgba(106,173,122,0.20)' : 'rgba(255,255,255,0.06)'}`,
                  opacity:    a.earned ? 1 : 0.45,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: a.earned ? 1 : 0.45, scale: 1 }}
                transition={{ delay: 0.05 * i }}
                title={a.desc}
              >
                <span className="text-2xl">{a.icon}</span>
                <p className="font-mono text-2xs text-dawn-300 text-center leading-tight" style={{ fontSize: '0.48rem' }}>
                  {a.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Theme Selector ───────────────────────── */}
        <div className="px-5 mb-6">
          <h2 className="font-display text-xl font-light text-dawn-100 mb-3">Forest Theme</h2>
          <GlassCard className="p-4" delay={0.2}>
            <div className="flex gap-3">
              {THEMES.map(t => (
                <motion.button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className="flex-1 flex flex-col items-center gap-2 py-3 rounded-2xl transition-all duration-200"
                  style={{
                    background: theme === t.id ? `${t.accent}18` : 'rgba(255,255,255,0.04)',
                    border:     `1px solid ${theme === t.id ? `${t.accent}30` : 'rgba(255,255,255,0.07)'}`,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 rounded-full" style={{ background: `radial-gradient(circle, ${t.accent} 0%, ${t.bg} 100%)` }} />
                  <p className="font-mono text-2xs text-center" style={{ color: theme === t.id ? t.accent : 'rgba(245,230,200,0.4)', fontSize: '0.5rem' }}>
                    {t.label}
                  </p>
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* ── Notification Settings ────────────────── */}
        <div className="px-5 mb-6">
          <h2 className="font-display text-xl font-light text-dawn-100 mb-3">Notifications</h2>
          <GlassCard variant="light" className="p-5" delay={0.25}>
            {[
              { key: 'watering', icon: '💧', label: 'Watering reminders',   sub: 'Daily care alerts'         },
              { key: 'disease',  icon: '🔬', label: 'Disease detection',    sub: 'AI scan alerts'            },
              { key: 'harvest',  icon: '🌾', label: 'Harvest ready',        sub: 'Peak ripeness alerts'      },
              { key: 'weekly',   icon: '📊', label: 'Weekly insights',      sub: 'Sunday garden summary'     },
            ].map(item => (
              <div key={item.key} className="flex items-center gap-3 py-3 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm text-dawn-100 font-medium">{item.label}</p>
                  <p className="font-mono text-2xs text-forest-400">{item.sub}</p>
                </div>
                <Toggle value={notifs[item.key]} onChange={v => setNotifs(n => ({ ...n, [item.key]: v }))} />
              </div>
            ))}
          </GlassCard>
        </div>

        {/* ── AI Persona ───────────────────────────── */}
        <div className="px-5 mb-6">
          <h2 className="font-display text-xl font-light text-dawn-100 mb-3">AI Companion Persona</h2>
          <GlassCard className="p-4 space-y-2" delay={0.3}>
            {[
              { id: 'sage',     label: '🌿 Forest Sage',     desc: 'Calm, wise, ancient wisdom'          },
              { id: 'scientist',label: '🔬 Botanist',        desc: 'Precise, analytical, scientific'     },
              { id: 'friend',   label: '🌸 Friendly Gardener', desc: 'Warm, enthusiastic, encouraging' },
            ].map(p => (
              <motion.button
                key={p.id}
                onClick={() => setPersona(p.id)}
                className="w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all duration-200"
                style={{
                  background: persona === p.id ? 'rgba(106,173,122,0.12)' : 'rgba(255,255,255,0.04)',
                  border:     `1px solid ${persona === p.id ? 'rgba(106,173,122,0.25)' : 'rgba(255,255,255,0.07)'}`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex-1">
                  <p className="font-body text-sm font-medium" style={{ color: persona === p.id ? '#92c9a0' : 'rgba(245,230,200,0.7)' }}>
                    {p.label}
                  </p>
                  <p className="font-mono text-2xs text-forest-400 mt-0.5">{p.desc}</p>
                </div>
                {persona === p.id && (
                  <div className="w-2 h-2 rounded-full bg-forest-400" />
                )}
              </motion.button>
            ))}
          </GlassCard>
        </div>

        {/* ── About ────────────────────────────────── */}
        <div className="px-5 mb-6">
          <GlassCard className="p-5 text-center" delay={0.35}>
            <span className="text-3xl mb-2 block">🌿</span>
            <p className="font-display text-lg text-dawn-100 mb-1">FloraVerse AI</p>
            <p className="font-mono text-2xs text-forest-400">Version 1.0.0 · Built with quiet intelligence</p>
            <p className="font-body text-xs text-dawn-300 font-light mt-3 max-w-xs mx-auto leading-relaxed">
              "Nature, intelligence, and care in harmony."
            </p>
          </GlassCard>
        </div>

      </div>

      <FloatingNav />
    </div>
  )
}
