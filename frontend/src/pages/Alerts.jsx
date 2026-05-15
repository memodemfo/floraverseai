import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import ForestBackground from '../components/ambient/ForestBackground'
import ParticleCanvas from '../components/ambient/ParticleCanvas'
import PageHeader from '../components/layout/PageHeader'
import GlassCard from '../components/ui/GlassCard'
import FloatingNav from '../components/layout/FloatingNav'
import useAppStore from '../store/useAppStore'

const URGENCY_STYLE = {
  high:   { tag: 'tag-danger',   dot: '#e06060', label: 'Urgent'   },
  medium: { tag: 'tag-warning',  dot: '#d4a843', label: 'Advisory' },
  low:    { tag: 'tag-healthy',  dot: '#6aad7a', label: 'Info'     },
  info:   { tag: 'tag-info',     dot: '#6ab8d4', label: 'Info'     },
}

const GROUPS = ['Urgent', 'Advisory', 'Info']

function AlertCard({ alert, onResolve }) {
  const style = URGENCY_STYLE[alert.urgency] || URGENCY_STYLE.info

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -16, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="glass-card rounded-2xl p-4 flex items-start gap-3"
        style={{ borderLeft: `3px solid ${style.dot}` }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
          style={{ background: `${style.dot}18` }}
        >
          {alert.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <p className="font-body text-sm font-medium text-dawn-100 truncate">{alert.plant_name}</p>
            <span className={`${style.tag} flex-shrink-0`} style={{ fontSize: '0.6rem', padding: '2px 8px' }}>
              {style.label}
            </span>
          </div>
          <p className="font-body text-xs text-dawn-300 font-light leading-snug">{alert.message}</p>
          <p className="font-mono text-2xs text-forest-500 mt-1">{alert.time}</p>
        </div>

        <motion.button
          onClick={() => onResolve(alert.id)}
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(106,173,122,0.10)', border: '1px solid rgba(106,173,122,0.20)' }}
          whileTap={{ scale: 0.88 }}
          title="Mark resolved"
        >
          <CheckCircle size={15} color="#6aad7a" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Alerts() {
  const { alerts, resolveAlert, fetchAlerts } = useAppStore()
  const [filter, setFilter] = useState('All')

  useEffect(() => { fetchAlerts() }, [])

  const filtered = filter === 'All'
    ? alerts
    : alerts.filter(a => (URGENCY_STYLE[a.urgency]?.label || 'Info') === filter)

  return (
    <div className="relative min-h-screen pb-32">
      <ForestBackground />
      <ParticleCanvas />

      <div className="relative z-10">
        <PageHeader title="Alert Center" subtitle="Smart Notifications" showBack={false} />

        {/* Filter */}
        <div className="px-5 mb-5 flex gap-2">
          {['All', ...GROUPS].map(f => {
            const count = f === 'All'
              ? alerts.length
              : alerts.filter(a => (URGENCY_STYLE[a.urgency]?.label || 'Info') === f).length

            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-200"
                style={{
                  background: filter === f ? 'rgba(106,173,122,0.15)' : 'rgba(255,255,255,0.05)',
                  color:      filter === f ? '#92c9a0' : 'rgba(245,230,200,0.45)',
                  border:     `1px solid ${filter === f ? 'rgba(106,173,122,0.25)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {f}
                {count > 0 && (
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center text-2xs font-medium"
                    style={{ background: filter === f ? 'rgba(106,173,122,0.3)' : 'rgba(255,255,255,0.1)', fontSize: '0.5rem' }}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Alert Count */}
        <div className="px-5 mb-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-2xs text-forest-400 tracking-widest">
              {filtered.length} ACTIVE ALERT{filtered.length !== 1 ? 'S' : ''}
            </p>
            {filtered.length > 0 && (
              <button
                className="font-body text-xs text-forest-400"
                onClick={() => filtered.forEach(a => resolveAlert(a.id))}
              >
                Resolve all
              </button>
            )}
          </div>
        </div>

        {/* Alerts list */}
        <div className="px-5 space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <GlassCard className="p-10 text-center" animate={false}>
                  <motion.div
                    className="text-5xl mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    ✨
                  </motion.div>
                  <p className="font-display text-xl text-dawn-100 mb-2">All clear</p>
                  <p className="font-body text-sm text-dawn-300 font-light">
                    Your plants are thriving. No alerts at this time.
                  </p>
                </GlassCard>
              </motion.div>
            ) : (
              filtered.map(alert => (
                <AlertCard key={alert.id} alert={alert} onResolve={resolveAlert} />
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Insights */}
        {alerts.length > 0 && (
          <div className="px-5 mt-6">
            <GlassCard variant="light" className="p-5" delay={0.3}>
              <p className="font-mono text-2xs text-forest-400 tracking-widest mb-2">AI ALERT SUMMARY</p>
              <p className="font-body text-sm text-dawn-200 font-light leading-relaxed">
                {alerts.filter(a => a.urgency === 'high').length > 0
                  ? `${alerts.filter(a => a.urgency === 'high').length} urgent alert${alerts.filter(a => a.urgency === 'high').length > 1 ? 's' : ''} need your attention. Your plants are signaling for care.`
                  : 'No urgent issues. Your garden is in gentle balance — continue your current care rhythm.'}
              </p>
            </GlassCard>
          </div>
        )}
      </div>

      <FloatingNav />
    </div>
  )
}
