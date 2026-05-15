import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, LineChart, Line, CartesianGrid,
} from 'recharts'
import ForestBackground from '../components/ambient/ForestBackground'
import ParticleCanvas from '../components/ambient/ParticleCanvas'
import PageHeader from '../components/layout/PageHeader'
import GlassCard from '../components/ui/GlassCard'
import FloatingNav from '../components/layout/FloatingNav'
import { mockAnalytics } from '../data/mockData'

function GaugeArc({ value, label, color }) {
  const r   = 38
  const cx  = 60
  const cy  = 60
  // Arc: half circle (π radians) from left to right
  const angle = (value / 100) * 180 - 180  // -180 to 0
  const rad   = (angle * Math.PI) / 180
  const x     = cx + r * Math.cos(rad)
  const y     = cy + r * Math.sin(rad)
  const full  = 2 * Math.PI * r
  const half  = Math.PI * r
  const off   = half - (value / 100) * half

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 120, height: 70 }}>
        <svg width={120} height={70} viewBox="0 0 120 70">
          {/* Track */}
          <path
            d={`M 10 60 A 50 50 0 0 1 110 60`}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={8}
            strokeLinecap="round"
          />
          {/* Fill */}
          <motion.path
            d={`M 10 60 A 50 50 0 0 1 110 60`}
            fill="none"
            stroke={color}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={`${Math.PI * 50}`}
            initial={{ strokeDashoffset: Math.PI * 50 }}
            animate={{ strokeDashoffset: Math.PI * 50 * (1 - value / 100) }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
          />
          {/* Value text */}
          <text x="60" y="55" textAnchor="middle" fill={color} fontSize="14" fontFamily="Cormorant Garamond" fontWeight="300">
            {value}%
          </text>
        </svg>
      </div>
      <p className="font-mono text-2xs text-forest-400 tracking-widest text-center -mt-1">{label}</p>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card px-3 py-2 rounded-xl text-xs">
      <p className="font-mono text-forest-400 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} className="font-body text-dawn-200" style={{ color: p.color }}>
          {p.name}: {p.value}%
        </p>
      ))}
    </div>
  )
}

export default function Analytics() {
  const { growthData, healthHistory, riskScores } = mockAnalytics

  const PLANT_LINES = [
    { key: 'monstera', color: '#6aad7a', name: 'Monstera'       },
    { key: 'basil',    color: '#d4a843', name: 'Basil Garden'   },
    { key: 'potato',   color: '#92c9a0', name: 'Golden Potato'  },
    { key: 'cherry',   color: '#f09090', name: 'Cherry Blossom' },
  ]

  return (
    <div className="relative min-h-screen pb-32">
      <ForestBackground variant="diagnosis" />
      <ParticleCanvas />

      <div className="relative z-10">
        <PageHeader title="Analytics" subtitle="Predictive Health Intelligence" />

        {/* Risk Gauges */}
        <div className="px-5 mb-6">
          <GlassCard className="p-6" delay={0.1}>
            <p className="section-subtitle text-xs mb-5">AI RISK ASSESSMENT</p>
            <div className="grid grid-cols-2 gap-4">
              <GaugeArc value={riskScores.diseaseRisk}    label="Disease Risk"    color="#e06060" />
              <GaugeArc value={riskScores.stressLevel}    label="Stress Level"   color="#d4a843" />
              <GaugeArc value={riskScores.harvestReadiness} label="Harvest Ready" color="#6aad7a" />
              <GaugeArc value={riskScores.overallHealth}  label="Overall Health" color="#92c9a0" />
            </div>
          </GlassCard>
        </div>

        {/* AI Predictions */}
        <div className="px-5 mb-6">
          <GlassCard variant="light" className="p-5" delay={0.2}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🔮</span>
              <p className="section-subtitle text-xs">AI PREDICTIONS</p>
            </div>
            {[
              { label: 'Disease Risk', value: 'Low — 82% confidence', color: '#6aad7a', icon: '✅' },
              { label: 'Harvest Window', value: 'Golden Potato ready in 0–5 days', color: '#d4a843', icon: '🌾' },
              { label: 'Stress Forecast', value: 'Monitor Monstera humidity', color: '#d4a843', icon: '⚠️' },
              { label: 'Growth Rate', value: '+12% above seasonal average', color: '#92c9a0', icon: '📈' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{item.icon}</span>
                  <span className="font-body text-xs text-dawn-300 font-light">{item.label}</span>
                </div>
                <span className="font-mono text-xs font-medium" style={{ color: item.color }}>{item.value}</span>
              </div>
            ))}
          </GlassCard>
        </div>

        {/* Growth Chart */}
        <div className="px-5 mb-6">
          <h2 className="font-display text-xl font-light text-dawn-100 mb-3">Growth Trajectory</h2>
          <GlassCard className="p-5" delay={0.3}>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={growthData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="week" tick={{ fill: 'rgba(245,230,200,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(245,230,200,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                {PLANT_LINES.map(l => (
                  <Line key={l.key} type="monotone" dataKey={l.key} name={l.name} stroke={l.color} strokeWidth={2} dot={false}
                    style={{ filter: `drop-shadow(0 0 4px ${l.color}66)` }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-3">
              {PLANT_LINES.map(l => (
                <div key={l.key} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span className="font-mono text-2xs text-dawn-300">{l.name}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Health History */}
        <div className="px-5 mb-6">
          <h2 className="font-display text-xl font-light text-dawn-100 mb-3">Garden Health — 7 Days</h2>
          <GlassCard className="p-5" delay={0.4}>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={healthHistory} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#6aad7a" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#6aad7a" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: 'rgba(245,230,200,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fill: 'rgba(245,230,200,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="score" name="Health" stroke="#6aad7a" strokeWidth={2}
                  fill="url(#healthGrad)"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(106,173,122,0.4))' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* Care Optimization */}
        <div className="px-5 mb-6">
          <h2 className="font-display text-xl font-light text-dawn-100 mb-3">Care Optimization</h2>
          <GlassCard variant="light" className="p-5" delay={0.5}>
            <p className="font-body text-sm text-dawn-200 font-light leading-relaxed mb-4">
              Based on your garden's performance over the last 7 days, FloraVerse AI has identified these opportunities:
            </p>
            {[
              { pct: 87, label: 'Watering accuracy',   color: '#6ab8d4' },
              { pct: 72, label: 'Fertilizer timing',   color: '#c0a0e0' },
              { pct: 91, label: 'Light management',    color: '#d4a843' },
              { pct: 65, label: 'Pest prevention',     color: '#6aad7a' },
            ].map(item => (
              <div key={item.label} className="mb-3 last:mb-0">
                <div className="flex justify-between mb-1">
                  <span className="font-body text-xs text-dawn-300">{item.label}</span>
                  <span className="font-mono text-xs" style={{ color: item.color }}>{item.pct}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: item.color, boxShadow: `0 0 6px ${item.color}60` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ duration: 1.2, delay: 0.5 + 0.07 * [87,72,91,65].indexOf(item.pct), ease: [0.16,1,0.3,1] }}
                  />
                </div>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>

      <FloatingNav />
    </div>
  )
}
