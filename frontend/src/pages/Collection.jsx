import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Droplets, Calendar, Trash2, Leaf } from 'lucide-react'
import ForestBackground from '../components/ambient/ForestBackground'
import ParticleCanvas from '../components/ambient/ParticleCanvas'
import HealthRing from '../components/ui/HealthRing'
import GrowthBadge from '../components/ui/GrowthBadge'
import FloatingNav from '../components/layout/FloatingNav'
import useAppStore from '../store/useAppStore'
import { addPlant, deletePlant } from '../services/api'
import { PLANT_CATALOG, ALL_SPECIES } from '../data/mockData'

const EMOJIS = Object.fromEntries(ALL_SPECIES.map(p => [p.species, p.emoji]))
const FILTERS = ['All', 'Indoor', 'Outdoor']

/* ─── PLANT CARD ─────────────────────────────────────────────── */
function PlantCard({ plant, delay = 0, onDelete, featured = false }) {
  const emoji = EMOJIS[plant.species] || '🌿'
  const daysWater = (() => {
    const diff = Math.floor((Date.now() - new Date(plant.last_watered)) / 86400000)
    const rem  = plant.watering_frequency - diff
    if (rem <= 0) return 'Now'
    if (rem === 1) return 'Tomorrow'
    return `${rem}d`
  })()

  if (featured) {
    return (
      <motion.div
        className="relative rounded-[28px] overflow-hidden cursor-pointer mb-4"
        style={{
          background: `linear-gradient(160deg, rgba(14,18,16,0.95) 0%, rgba(6,8,6,0.8) 100%)`,
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {/* Full-width hero */}
        <div
          className="relative h-52 flex items-center justify-center overflow-hidden"
          style={{ background: `radial-gradient(ellipse at 50% 100%, ${plant.color || '#1a3d28'}50 0%, rgba(6,8,6,0.6) 70%)` }}
        >
          <motion.span
            className="text-8xl select-none"
            animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            {plant.emoji || emoji}
          </motion.span>

          {/* Floating health ring */}
          <div className="absolute top-4 right-4">
            <HealthRing score={plant.health_score} size={52} strokeWidth={3} />
          </div>

          {/* Location pill */}
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full font-mono text-xs" style={{ background: 'rgba(6,8,6,0.6)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(232,235,233,0.6)', fontSize: '0.55rem', letterSpacing: '0.1em' }}>
            {plant.location === 'indoor' ? '🏠 INDOOR' : '🌳 OUTDOOR'}
          </span>

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-20" style={{ background: 'linear-gradient(to top, rgba(14,18,16,0.95), transparent)' }} />
        </div>

        {/* Info panel */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-display text-2xl font-light" style={{ color: '#e8ebe9', letterSpacing: '-0.01em' }}>{plant.plant_name}</h3>
              <p className="font-mono text-xs mt-0.5" style={{ color: '#00e85c60', letterSpacing: '0.1em' }}>{plant.species}</p>
            </div>
            <GrowthBadge stage={plant.growth_stage} />
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Droplets size={13} color="#6ab8d4" />
              <div>
                <p className="font-mono text-xs" style={{ color: 'rgba(232,235,233,0.35)', fontSize: '0.45rem', letterSpacing: '0.1em' }}>WATER</p>
                <p className="font-body text-sm font-medium" style={{ color: '#e8ebe9' }}>{daysWater}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={13} color="#d4a843" />
              <div>
                <p className="font-mono text-xs" style={{ color: 'rgba(232,235,233,0.35)', fontSize: '0.45rem', letterSpacing: '0.1em' }}>HARVEST</p>
                <p className="font-body text-sm font-medium" style={{ color: '#e8ebe9' }}>
                  {plant.estimated_harvest_days === 0 ? 'Ready!' : `${plant.estimated_harvest_days}d`}
                </p>
              </div>
            </div>
          </div>

          <motion.button
            onClick={(e) => { e.stopPropagation(); onDelete?.(plant) }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl font-body text-xs transition-all duration-200"
            style={{ background: 'rgba(220,80,80,0.06)', border: '1px solid rgba(220,80,80,0.12)', color: 'rgba(240,144,144,0.7)' }}
            whileTap={{ scale: 0.97 }}
          >
            <Trash2 size={12} /> Remove Plant
          </motion.button>
        </div>
      </motion.div>
    )
  }

  // Compact card
  return (
    <motion.div
      className="relative rounded-[22px] overflow-hidden"
      style={{
        background: 'rgba(14,18,16,0.85)',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      whileTap={{ scale: 0.97 }}
    >
      <div
        className="h-24 flex items-center justify-center relative"
        style={{ background: `radial-gradient(ellipse at 50% 100%, ${plant.color || '#1a3d28'}45 0%, transparent 70%)` }}
      >
        <motion.span
          className="text-4xl select-none"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {plant.emoji || emoji}
        </motion.span>
        <div className="absolute top-2 right-2">
          <HealthRing score={plant.health_score} size={30} strokeWidth={2.5} />
        </div>
      </div>

      <div className="p-3">
        <p className="font-body text-xs font-medium truncate mb-0.5" style={{ color: '#e8ebe9' }}>{plant.plant_name}</p>
        <p className="font-mono" style={{ fontSize: '0.45rem', color: '#00e85c50', letterSpacing: '0.08em' }}>{plant.species}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <Droplets size={9} color="#6ab8d4" />
            <span className="font-mono" style={{ fontSize: '0.44rem', color: 'rgba(232,235,233,0.3)' }}>{daysWater}</span>
          </div>
          <motion.button
            onClick={(e) => { e.stopPropagation(); onDelete?.(plant) }}
            className="p-1 rounded-lg"
            style={{ color: 'rgba(240,144,144,0.4)' }}
            whileTap={{ scale: 0.88 }}
          >
            <Trash2 size={10} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── ADD PLANT MODAL ─────────────────────────────────────────── */
function AddPlantModal({ onClose, onAdded }) {
  const [form, setForm] = useState({
    plant_name: '', species: 'Monstera', date_planted: new Date().toISOString().split('T')[0],
    health_score: 85, watering_frequency: 3,
  })
  const [loading, setLoading] = useState(false)
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = async () => {
    if (!form.plant_name) return
    setLoading(true)
    try {
      const res = await addPlant(form)
      onAdded(res.data?.[0] || { ...form, id: Date.now().toString(), growth_stage: 'Seedling', estimated_harvest_days: 90, last_watered: form.date_planted, emoji: ALL_SPECIES.find(p => p.species === form.species)?.emoji || '🌿', color: ALL_SPECIES.find(p => p.species === form.species)?.color || '#1a3d28', location: ALL_SPECIES.find(p => p.species === form.species)?.location || 'outdoor' })
    } catch {
      onAdded({ ...form, id: Date.now().toString(), growth_stage: 'Seedling', estimated_harvest_days: 90, last_watered: form.date_planted, emoji: ALL_SPECIES.find(p => p.species === form.species)?.emoji || '🌿', color: ALL_SPECIES.find(p => p.species === form.species)?.color || '#1a3d28', location: ALL_SPECIES.find(p => p.species === form.species)?.location || 'outdoor' })
    } finally { setLoading(false); onClose() }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0" style={{ background: 'rgba(6,8,6,0.85)', backdropFilter: 'blur(12px)' }} onClick={onClose} />
      <motion.div
        className="relative w-full rounded-t-[32px] p-6 pb-10"
        style={{ background: '#0e1210', border: '1px solid rgba(255,255,255,0.06)', maxHeight: '90vh', overflowY: 'auto' }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
      >
        {/* Handle */}
        <div className="w-12 h-1 rounded-full mx-auto mb-6" style={{ background: 'rgba(255,255,255,0.12)' }} />

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: '#00e85c60', fontSize: '0.5rem' }}>NEW PLANT</p>
            <h2 className="font-display text-2xl font-light" style={{ color: '#e8ebe9' }}>Add to Garden</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <X size={15} color="rgba(232,235,233,0.5)" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'rgba(232,235,233,0.3)', fontSize: '0.5rem' }}>PLANT NAME</label>
            <input className="input-glass" placeholder="e.g. Balcony Monstera" value={form.plant_name} onChange={e => update('plant_name', e.target.value)} />
          </div>

          <div>
            <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'rgba(232,235,233,0.3)', fontSize: '0.5rem' }}>SPECIES / TYPE</label>
            <select className="input-glass" value={form.species} onChange={e => update('species', e.target.value)}
              style={{ background: '#151a17', border: '1px solid rgba(255,255,255,0.08)', color: '#e8ebe9' }}>
              {Object.entries(PLANT_CATALOG).map(([cat, plants]) => (
                <optgroup key={cat} label={cat} style={{ background: '#0e1210', color: '#00e85c' }}>
                  {plants.map(p => (
                    <option key={p.species} value={p.species} style={{ background: '#0e1210' }}>
                      {p.emoji} {p.species}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'rgba(232,235,233,0.3)', fontSize: '0.5rem' }}>DATE PLANTED</label>
              <input type="date" className="input-glass" value={form.date_planted} onChange={e => update('date_planted', e.target.value)} />
            </div>
            <div>
              <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'rgba(232,235,233,0.3)', fontSize: '0.5rem' }}>WATER (DAYS)</label>
              <input type="number" className="input-glass" min="1" max="14" value={form.watering_frequency} onChange={e => update('watering_frequency', +e.target.value)} />
            </div>
          </div>

          <div>
            <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'rgba(232,235,233,0.3)', fontSize: '0.5rem' }}>HEALTH SCORE — {form.health_score}%</label>
            <input type="range" min="0" max="100" value={form.health_score} onChange={e => update('health_score', +e.target.value)}
              className="w-full accent-green-400" style={{ accentColor: '#00e85c' }} />
          </div>

          <motion.button
            onClick={submit}
            className="w-full py-4 rounded-2xl font-body font-medium text-sm mt-2"
            style={{ background: '#00e85c', color: '#060806', boxShadow: '0 0 30px rgba(0,232,92,0.3)' }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
          >
            {loading ? 'Adding...' : '+ Add to Garden'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── COLLECTION PAGE ─────────────────────────────────────────── */
export default function Collection() {
  const { plants, fetchPlants, addPlantLocal, removePlantLocal } = useAppStore()
  const [filter,  setFilter]  = useState('All')
  const [showAdd, setShowAdd] = useState(false)

  const handleDelete = async (plant) => {
    removePlantLocal(plant.id)
    try { await deletePlant(plant.id) } catch(e) { console.log('Backend delete:', e) }
  }

  useEffect(() => { fetchPlants() }, [])

  const filtered = plants.filter(p => {
    if (filter === 'All') return true
    return p.location?.toLowerCase() === filter.toLowerCase()
  })

  const featured = filtered[0]
  const rest     = filtered.slice(1)

  const total    = plants.length
  const indoor   = plants.filter(p => p.location === 'indoor').length
  const outdoor  = plants.filter(p => p.location === 'outdoor').length

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#060806', paddingBottom: '100px' }}>
      <ForestBackground />
      <ParticleCanvas />

      <div className="relative z-10">

        {/* ── HEADER ───────────────────────────────── */}
        <div className="px-5 pt-14 pb-6">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: '#00e85c60', fontSize: '0.55rem' }}>MY GARDEN</p>
            <h1 className="font-display font-light" style={{ fontSize: '2.8rem', color: '#e8ebe9', letterSpacing: '-0.02em', lineHeight: '1' }}>
              Plant<br /><span style={{ color: '#00e85c' }}>Collection</span>
            </h1>
          </motion.div>
        </div>

        {/* ── STATS ROW ────────────────────────────── */}
        <div className="px-5 mb-5">
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {[
              { label: 'Total', value: total,   icon: '🌿' },
              { label: 'Indoor', value: indoor, icon: '🏠' },
              { label: 'Outdoor', value: outdoor, icon: '🌳' },
            ].map(s => (
              <div key={s.label} className="flex-1 rounded-2xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="text-base mb-1">{s.icon}</div>
                <div className="font-display text-xl font-light" style={{ color: '#e8ebe9' }}>{s.value}</div>
                <div className="font-mono uppercase" style={{ fontSize: '0.44rem', color: 'rgba(232,235,233,0.3)', letterSpacing: '0.1em' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── FILTER PILLS ─────────────────────────── */}
        <div className="px-5 mb-5">
          <div className="flex gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-1.5 rounded-full font-mono text-xs transition-all duration-200"
                style={{
                  background: filter === f ? '#00e85c' : 'rgba(255,255,255,0.04)',
                  color: filter === f ? '#060806' : 'rgba(232,235,233,0.4)',
                  border: filter === f ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  fontSize: '0.6rem', letterSpacing: '0.08em',
                  boxShadow: filter === f ? '0 0 20px rgba(0,232,92,0.25)' : 'none',
                }}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* ── PLANT GALLERY ────────────────────────── */}
        <div className="px-5">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                className="rounded-3xl p-10 text-center"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-5xl mb-4">🌱</div>
                <p className="font-display text-xl font-light mb-2" style={{ color: 'rgba(232,235,233,0.5)' }}>Your garden awaits</p>
                <p className="font-body text-sm font-light mb-5" style={{ color: 'rgba(232,235,233,0.3)' }}>Add your first plant to begin.</p>
                <button onClick={() => setShowAdd(true)} className="px-6 py-2.5 rounded-full font-body text-sm font-medium" style={{ background: '#00e85c', color: '#060806', boxShadow: '0 0 24px rgba(0,232,92,0.3)' }}>
                  Add Plant
                </button>
              </motion.div>
            ) : (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Featured plant (first one) */}
                {featured && (
                  <PlantCard plant={featured} delay={0} onDelete={handleDelete} featured />
                )}

                {/* Remaining 2-column grid */}
                {rest.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {rest.map((plant, i) => (
                      <PlantCard key={plant.id || i} plant={plant} delay={0.05 + i * 0.05} onDelete={handleDelete} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* ── FAB ──────────────────────────────────── */}
      <motion.button
        onClick={() => setShowAdd(true)}
        className="fixed bottom-24 right-5 w-14 h-14 rounded-full flex items-center justify-center z-40"
        style={{ background: '#00e85c', boxShadow: '0 0 30px rgba(0,232,92,0.4)', color: '#060806' }}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
      >
        <Plus size={22} />
      </motion.button>

      {/* ── ADD MODAL ────────────────────────────── */}
      <AnimatePresence>
        {showAdd && (
          <AddPlantModal
            onClose={() => setShowAdd(false)}
            onAdded={(plant) => { addPlantLocal(plant); setShowAdd(false) }}
          />
        )}
      </AnimatePresence>

      <FloatingNav />
    </div>
  )
}
