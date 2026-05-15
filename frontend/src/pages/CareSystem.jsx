import { motion } from 'framer-motion'
import { Droplets, Sun, Zap, Calendar, Leaf, Wind, ChevronRight } from 'lucide-react'
import ForestBackground from '../components/ambient/ForestBackground'
import ParticleCanvas from '../components/ambient/ParticleCanvas'
import PageHeader from '../components/layout/PageHeader'
import GlassCard from '../components/ui/GlassCard'
import FloatingNav from '../components/layout/FloatingNav'
import useAppStore from '../store/useAppStore'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const TODAY = new Date().getDay() // 0=Sun

function CircleProgress({ value, max = 100, color, size = 70, icon: Icon, label, unit = '%' }) {
  const r   = (size - 10) / 2
  const c   = 2 * Math.PI * r
  const off = c - (value / max) * c
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={5} />
          <motion.circle
            cx={size/2} cy={size/2} r={r}
            fill="none" stroke={color} strokeWidth={5} strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: off }}
            transition={{ duration: 1.2, ease: [0.16,1,0.3,1] }}
            style={{ filter: `drop-shadow(0 0 5px ${color}66)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon size={16} color={color} />
        </div>
      </div>
      <div className="text-center">
        <p className="font-display text-sm font-light" style={{ color }}>{value}{unit}</p>
        <p className="metric-label text-2xs">{label}</p>
      </div>
    </div>
  )
}

export default function CareSystem() {
  const { plants } = useAppStore()

  const careItems = [
    { icon: Droplets, label: 'Water',      color: '#6ab8d4', value: 68, unit: '%', note: 'Next: 2 plants today'  },
    { icon: Zap,      label: 'Fertilize',  color: '#c0a0e0', value: 40, unit: '%', note: 'Due in 3 days'         },
    { icon: Sun,      label: 'Sunlight',   color: '#d4a843', value: 78, unit: '%', note: 'Good exposure today'   },
    { icon: Wind,     label: 'Humidity',   color: '#92c9a0', value: 62, unit: '%', note: 'Within ideal range'    },
  ]

  const weekSchedule = DAYS.map((day, i) => {
    const offset = (i + 1 - TODAY + 7) % 7  // days from now
    const tasks  = []
    if (i % 2 === 0) tasks.push({ type: 'water', color: '#6ab8d4', icon: '💧' })
    if (i % 3 === 0) tasks.push({ type: 'check', color: '#92c9a0', icon: '🌿' })
    if (i === 1)     tasks.push({ type: 'fertilize', color: '#c0a0e0', icon: '⚡' })
    const isToday = offset === 0
    return { day, offset, tasks, isToday }
  })

  const aiSuggestions = [
    { icon: '🌡️', text: 'Temperature is ideal. Maintain 22–24°C for optimal growth.' },
    { icon: '💡', text: 'Increase light exposure for Monstera — move 30cm closer to window.' },
    { icon: '🔬', text: 'Basil Garden shows early signs of stress. Consider nitrogen boost.' },
    { icon: '⏱️', text: 'Golden Potato is ready for harvest. Act within 5 days for peak yield.' },
  ]

  return (
    <div className="relative min-h-screen pb-32">
      <ForestBackground />
      <ParticleCanvas />

      <div className="relative z-10">
        <PageHeader title="Smart Care" subtitle="Intelligent Care System" />

        {/* Progress Circles */}
        <div className="px-5 mb-6">
          <GlassCard className="p-6" delay={0.1}>
            <p className="section-subtitle text-xs mb-5">CARE STATUS</p>
            <div className="grid grid-cols-4 gap-2">
              {careItems.map(item => (
                <CircleProgress
                  key={item.label}
                  value={item.value}
                  color={item.color}
                  icon={item.icon}
                  label={item.label}
                  unit={item.unit}
                  size={68}
                />
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Weekly Calendar */}
        <div className="px-5 mb-6">
          <h2 className="font-display text-xl font-light text-dawn-100 mb-3">7-Day Schedule</h2>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2">
            {weekSchedule.map(({ day, isToday, tasks, offset }) => (
              <motion.div
                key={day}
                className="flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl min-w-[52px]"
                style={{
                  background: isToday ? 'rgba(106,173,122,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isToday ? 'rgba(106,173,122,0.3)' : 'rgba(255,255,255,0.07)'}`,
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + offset * 0.04 }}
              >
                <p className="font-mono text-2xs" style={{ color: isToday ? '#92c9a0' : 'rgba(245,230,200,0.4)' }}>
                  {day}
                </p>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center font-body text-xs font-medium"
                  style={{
                    background: isToday ? 'rgba(106,173,122,0.3)' : 'rgba(255,255,255,0.05)',
                    color: isToday ? '#92c9a0' : 'rgba(245,230,200,0.5)',
                  }}
                >
                  {isToday ? '•' : String(new Date(Date.now() + offset * 86400000).getDate()).padStart(2, '0')}
                </div>
                <div className="flex flex-col gap-1">
                  {tasks.map(t => (
                    <span key={t.type} className="text-xs">{t.icon}</span>
                  ))}
                  {tasks.length === 0 && <span className="text-xs opacity-20">—</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Per-plant care */}
        <div className="px-5 mb-6">
          <h2 className="font-display text-xl font-light text-dawn-100 mb-3">Plant Care Status</h2>
          <div className="space-y-3">
            {plants.slice(0, 4).map((p, i) => {
              const daysSince = Math.floor((Date.now() - new Date(p.last_watered)) / 86400000)
              const dueIn     = p.watering_frequency - daysSince
              const pct       = Math.max(0, Math.min(100, ((p.watering_frequency - Math.max(0, dueIn)) / p.watering_frequency) * 100))
              return (
                <GlassCard key={p.id || i} variant="light" className="p-4" delay={0.2 + i * 0.07}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{p.emoji || '🌿'}</span>
                      <div>
                        <p className="font-body text-sm font-medium text-dawn-100">{p.plant_name}</p>
                        <p className="font-mono text-2xs text-forest-400">{p.growth_stage}</p>
                      </div>
                    </div>
                    <span className={`tag text-xs ${dueIn <= 0 ? 'tag-warning' : 'tag-healthy'}`}>
                      {dueIn <= 0 ? '💧 Water now' : `💧 ${dueIn}d`}
                    </span>
                  </div>
                  <div className="w-full h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: pct > 70 ? '#d4a843' : '#6ab8d4', boxShadow: `0 0 5px ${pct > 70 ? 'rgba(212,168,67,0.5)' : 'rgba(106,184,212,0.5)'}` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
                    />
                  </div>
                  <p className="font-mono text-2xs text-dawn-300 mt-1.5">
                    {pct.toFixed(0)}% of watering cycle elapsed
                  </p>
                </GlassCard>
              )
            })}
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="px-5 mb-6">
          <h2 className="font-display text-xl font-light text-dawn-100 mb-3">AI Suggestions</h2>
          <div className="space-y-3">
            {aiSuggestions.map((s, i) => (
              <GlassCard key={i} className="p-4 flex items-center gap-3" delay={0.4 + i * 0.07}>
                <span className="text-xl flex-shrink-0">{s.icon}</span>
                <p className="font-body text-sm text-dawn-200 font-light leading-relaxed flex-1">{s.text}</p>
                <ChevronRight size={14} color="rgba(106,173,122,0.4)" className="flex-shrink-0" />
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      <FloatingNav />
    </div>
  )
}
