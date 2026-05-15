import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Droplets, Thermometer, Wind, Sun, Zap, Leaf } from 'lucide-react'
import ForestBackground from '../components/ambient/ForestBackground'
import ParticleCanvas from '../components/ambient/ParticleCanvas'
import PageHeader from '../components/layout/PageHeader'
import GlassCard from '../components/ui/GlassCard'
import FloatingNav from '../components/layout/FloatingNav'
import { mockClimate } from '../data/mockData'

function ClimateRing({ value, max = 100, label, icon: Icon, color, unit = '%', size = 110 }) {
  const r   = 40
  const c   = 2 * Math.PI * r
  const pct = Math.min(value / max, 1)
  const off = c - pct * c

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={6} />
          <motion.circle
            cx={size/2} cy={size/2} r={r}
            fill="none"
            stroke={color}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: off }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon size={16} color={color} className="mb-0.5" />
          <span className="font-display text-lg font-light" style={{ color }}>
            {value}<span className="text-xs">{unit}</span>
          </span>
        </div>
      </div>
      <p className="font-mono text-2xs text-forest-400 tracking-widest text-center">{label}</p>
    </div>
  )
}

function LiveBar({ value, label, color, max = 100 }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-2xs text-dawn-300 w-24 flex-shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 6px ${color}60` }}
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="font-mono text-2xs text-dawn-100 w-8 text-right flex-shrink-0">{value}</span>
    </div>
  )
}

export default function Climate() {
  const [climate, setClimate] = useState(mockClimate)

  // Simulate live sensor fluctuations
  useEffect(() => {
    const t = setInterval(() => {
      setClimate(c => ({
        humidity:    Math.max(30, Math.min(90, c.humidity + (Math.random() - 0.5) * 3)),
        temperature: Math.max(16, Math.min(32, c.temperature + (Math.random() - 0.5) * 0.5)),
        co2:         Math.max(380, Math.min(500, c.co2 + (Math.random() - 0.5) * 5)),
        light:       Math.max(20, Math.min(100, c.light + (Math.random() - 0.5) * 4)),
        airQuality:  Math.max(60, Math.min(100, c.airQuality + (Math.random() - 0.5) * 2)),
        soilMoisture:Math.max(20, Math.min(90, c.soilMoisture + (Math.random() - 0.5) * 3)),
      }))
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const round = v => Math.round(v)

  const overallScore = Math.round(
    (climate.humidity / 70 * 25 + climate.airQuality / 100 * 25 + climate.light / 100 * 25 + (32 - Math.abs(climate.temperature - 22)) / 16 * 25)
  )

  const scoreColor = overallScore >= 80 ? '#6aad7a' : overallScore >= 60 ? '#d4a843' : '#e06060'

  return (
    <div className="relative min-h-screen pb-32">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse at 30% 70%, rgba(100,150,200,0.15) 0%, rgba(5,13,7,1) 60%)',
              'radial-gradient(ellipse at 70% 30%, rgba(100,150,200,0.20) 0%, rgba(5,13,7,1) 60%)',
              'radial-gradient(ellipse at 30% 70%, rgba(100,150,200,0.15) 0%, rgba(5,13,7,1) 60%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(5,13,7,0.9) 0%, transparent 60%)' }} />
      </div>

      <ParticleCanvas />

      <div className="relative z-10">
        <PageHeader title="Climate Monitor" subtitle="Indoor Environment" />

        {/* Overall Score */}
        <div className="px-5 mb-6">
          <GlassCard className="p-6 text-center" delay={0.1}>
            <p className="section-subtitle text-xs mb-3">COMPATIBILITY SCORE</p>
            <div className="relative inline-flex items-center justify-center mb-3">
              <svg width={140} height={140} style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
                <circle cx={70} cy={70} r={56} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={8} />
                <motion.circle
                  cx={70} cy={70} r={56}
                  fill="none"
                  stroke={scoreColor}
                  strokeWidth={8}
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 56}
                  initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - overallScore / 100) }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ filter: `drop-shadow(0 0 10px ${scoreColor}66)` }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-4xl font-light" style={{ color: scoreColor }}>{overallScore}</span>
                <span className="font-mono text-2xs text-forest-400 tracking-widest">/ 100</span>
              </div>
            </div>
            <p className="font-body text-sm text-dawn-200 font-light">
              {overallScore >= 80
                ? 'Your indoor environment is ideal for plant growth.'
                : overallScore >= 60
                ? 'Good conditions — a few adjustments could help.'
                : 'Plants may be stressed. Check humidity and light levels.'}
            </p>
          </GlassCard>
        </div>

        {/* 4 climate rings */}
        <div className="px-5 mb-6">
          <GlassCard className="p-6" delay={0.2}>
            <p className="section-subtitle text-xs mb-5">LIVE READINGS</p>
            <div className="grid grid-cols-4 gap-2">
              <ClimateRing value={round(climate.humidity)}    label="Humidity"  icon={Droplets}     color="#6ab8d4" unit="%" />
              <ClimateRing value={round(climate.temperature)} label="Temp"      icon={Thermometer}  color="#d4a843" unit="°C" max={40} />
              <ClimateRing value={round(climate.light)}       label="Light"     icon={Sun}           color="#e8c97a" unit="%" />
              <ClimateRing value={round(climate.airQuality)}  label="Air"       icon={Wind}          color="#92c9a0" unit="%" />
            </div>
          </GlassCard>
        </div>

        {/* Detail bars */}
        <div className="px-5 mb-6">
          <GlassCard variant="light" className="p-5 space-y-4" delay={0.3}>
            <p className="section-subtitle text-xs">ENVIRONMENT DETAIL</p>
            <LiveBar value={round(climate.humidity)}     label="Humidity"      color="#6ab8d4" max={100} />
            <LiveBar value={round(climate.light)}        label="Light Exp."    color="#e8c97a" max={100} />
            <LiveBar value={round(climate.airQuality)}   label="Air Quality"   color="#92c9a0" max={100} />
            <LiveBar value={round(climate.soilMoisture)} label="Soil Moisture" color="#a08060" max={100} />
            <LiveBar value={round(climate.co2)}          label="CO₂ (ppm)"     color="#c0a0e0" max={500} />
          </GlassCard>
        </div>

        {/* Recommendations */}
        <div className="px-5 mb-6">
          <h2 className="font-display text-xl font-light text-dawn-100 mb-3">AI Recommendations</h2>
          <div className="space-y-3">
            {[
              {
                icon: Droplets,
                color: '#6ab8d4',
                title: 'Humidity',
                text: climate.humidity < 50
                  ? 'Humidity is low. Use a humidifier or mist plants daily.'
                  : climate.humidity > 75
                  ? 'High humidity detected. Improve ventilation to prevent mold.'
                  : 'Humidity is in the ideal range for most tropical plants.',
              },
              {
                icon: Sun,
                color: '#d4a843',
                title: 'Light Exposure',
                text: climate.light < 50
                  ? 'Light levels are insufficient. Move plants closer to a south-facing window.'
                  : 'Current light levels are supporting healthy photosynthesis.',
              },
              {
                icon: Zap,
                color: '#c0a0e0',
                title: 'CO₂ Levels',
                text: climate.co2 > 450
                  ? 'CO₂ is elevated. Open a window for better air circulation.'
                  : 'CO₂ levels are within normal indoor range.',
              },
              {
                icon: Leaf,
                color: '#6aad7a',
                title: 'Plant Compatibility',
                text: 'Based on current readings, your environment is best suited for tropical and subtropical species.',
              },
            ].map((rec, i) => (
              <GlassCard key={rec.title} variant="light" className="p-4 flex items-start gap-3" delay={0.35 + i * 0.07}>
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${rec.color}18`, border: `1px solid ${rec.color}30` }}
                >
                  <rec.icon size={14} color={rec.color} />
                </div>
                <div>
                  <p className="font-mono text-2xs tracking-widest mb-1" style={{ color: `${rec.color}cc` }}>
                    {rec.title.toUpperCase()}
                  </p>
                  <p className="font-body text-sm text-dawn-200 font-light leading-relaxed">{rec.text}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      <FloatingNav />
    </div>
  )
}
