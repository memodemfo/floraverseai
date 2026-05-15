import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Upload, AlertTriangle, CheckCircle, RotateCcw, Zap, Droplets, Sun, Leaf } from 'lucide-react'
import ForestBackground from '../components/ambient/ForestBackground'
import ParticleCanvas from '../components/ambient/ParticleCanvas'
import PageHeader from '../components/layout/PageHeader'
import GlassCard from '../components/ui/GlassCard'
import HealthRing from '../components/ui/HealthRing'
import FloatingNav from '../components/layout/FloatingNav'
import { predictDisease } from '../services/api'
import useAppStore from '../store/useAppStore'

const URGENCY = {
  High:   { label: 'High Urgency',   tag: 'tag-danger',   icon: '🚨' },
  Medium: { label: 'Medium Urgency', tag: 'tag-warning',  icon: '⚠️' },
  Low:    { label: 'Low Risk',       tag: 'tag-healthy',  icon: '✅' },
}

const MOCK_RESULT = {
  disease:         'Tomato_Early_Blight',
  confidence:      0.91,
  recommendations: {
    watering:    'Reduce watering frequency to allow soil to dry between sessions',
    fertilizer:  'Apply potassium-rich fertilizer to strengthen plant immunity',
    treatment:   'Apply copper-based fungicide spray every 7 days',
    sunlight:    'Increase direct sunlight exposure to 6+ hours daily',
    risk:        'Medium',
  },
}

export default function Diagnosis() {
  const [tab,        setTab]        = useState('upload')
  const [scanning,   setScanning]   = useState(false)
  const [preview,    setPreview]    = useState(null)
  const [result,     setResult]     = useState(null)
  const [unknown,    setUnknown]    = useState(false)
  const fileRef                     = useRef(null)
  const { setDiagnosisResult }      = useAppStore()

  const handleFile = async (file) => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    setResult(null)
    setUnknown(false)
    setScanning(true)

    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await predictDisease(fd)
      const data = res.data
      if (data.message && data.message.includes('Unknown')) {
        setUnknown(true)
      } else {
        setResult(data)
        setDiagnosisResult(data)
      }
    } catch {
      // Demo mode — use mock result
      await new Promise(r => setTimeout(r, 2800))
      setResult(MOCK_RESULT)
      setDiagnosisResult(MOCK_RESULT)
    } finally {
      setScanning(false)
    }
  }

  const reset = () => {
    setPreview(null); setResult(null); setUnknown(false); setScanning(false)
  }

  const formatDisease = (d = '') =>
    d.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')

  const confidence = result ? Math.round((result.confidence || 0) * 100) : 0
  const recs       = result?.recommendations || {}
  const urgency    = URGENCY[recs.risk] || URGENCY.Medium

  return (
    <div className="relative min-h-screen pb-32 overflow-x-hidden">
      <ForestBackground variant="diagnosis" />
      <ParticleCanvas />

      <div className="relative z-10">
        <PageHeader title="AI Diagnosis" subtitle="Plant Health Scanner" />

        {/* ── Tabs ──────────────────────────────────── */}
        <div className="px-5 mb-6">
          <div
            className="flex rounded-2xl p-1 gap-1"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {[
              { id: 'upload', icon: Upload,  label: 'Upload Image' },
              { id: 'camera', icon: Camera,  label: 'Camera Scan'  },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => { setTab(id); reset() }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-300 text-sm font-body"
                style={{
                  background:   tab === id ? 'rgba(106,173,122,0.15)' : 'transparent',
                  color:        tab === id ? '#92c9a0' : 'rgba(245,230,200,0.45)',
                  border:       tab === id ? '1px solid rgba(106,173,122,0.25)' : '1px solid transparent',
                }}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Scanner Zone ──────────────────────────── */}
        <div className="px-5 mb-6">
          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div
                key="upload-zone"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className="relative rounded-3xl overflow-hidden cursor-pointer group"
                  style={{
                    height: 240,
                    background: 'rgba(10,26,15,0.6)',
                    border: '2px dashed rgba(106,173,122,0.25)',
                    backdropFilter: 'blur(20px)',
                  }}
                  onClick={() => fileRef.current?.click()}
                >
                  {/* Corner brackets */}
                  {[['top-4 left-4', 'border-t border-l'], ['top-4 right-4', 'border-t border-r'],
                    ['bottom-4 left-4', 'border-b border-l'], ['bottom-4 right-4', 'border-b border-r']].map(([pos, border], i) => (
                    <div
                      key={i}
                      className={`absolute ${pos} w-6 h-6 ${border}`}
                      style={{ borderColor: 'rgba(106,173,122,0.5)' }}
                    />
                  ))}

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ background: 'rgba(106,173,122,0.12)', border: '1px solid rgba(106,173,122,0.25)' }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {tab === 'upload' ? (
                        <Upload size={28} color="#6aad7a" />
                      ) : (
                        <Camera size={28} color="#6aad7a" />
                      )}
                    </motion.div>
                    <div className="text-center px-6">
                      <p className="font-body text-dawn-200 text-sm font-medium mb-1">
                        {tab === 'upload' ? 'Tap to upload a plant photo' : 'Open camera to scan plant'}
                      </p>
                      <p className="font-body text-dawn-300 text-xs font-light">
                        AI will analyze in seconds
                      </p>
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{ boxShadow: 'inset 0 0 40px rgba(106,173,122,0.08)' }}
                  />
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  capture={tab === 'camera' ? 'environment' : undefined}
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </motion.div>
            ) : (
              <motion.div
                key="preview-zone"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-3xl overflow-hidden scan-container"
                style={{ height: 280 }}
              >
                <img
                  src={preview}
                  alt="Plant"
                  className="w-full h-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0" style={{ background: 'rgba(5,13,7,0.4)' }} />

                {/* Scan line animation */}
                {scanning && <div className="scan-line" />}

                {/* Scanning overlay */}
                {scanning && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full border-2 border-forest-400 flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      style={{ borderTopColor: '#6aad7a', borderRightColor: 'transparent', borderBottomColor: 'rgba(106,173,122,0.3)', borderLeftColor: 'transparent' }}
                    />
                    <div className="text-center">
                      <p className="font-mono text-sm text-forest-400 tracking-widest">ANALYZING</p>
                      <motion.p
                        className="font-body text-xs text-dawn-300 mt-1"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        AI scanning plant tissue...
                      </motion.p>
                    </div>
                    {/* AI particles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-forest-400"
                        animate={{
                          x: [0, (Math.random() - 0.5) * 100],
                          y: [0, (Math.random() - 0.5) * 100],
                          opacity: [0, 1, 0],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }}
                        style={{ top: '50%', left: '50%' }}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Corner brackets */}
                {[['top-3 left-3', 'border-t border-l'], ['top-3 right-3', 'border-t border-r'],
                  ['bottom-3 left-3', 'border-b border-l'], ['bottom-3 right-3', 'border-b border-r']].map(([pos, border], i) => (
                  <div key={i} className={`absolute ${pos} w-5 h-5 ${border}`}
                    style={{ borderColor: 'rgba(106,173,122,0.7)', borderWidth: 2 }} />
                ))}

                {/* Reset button */}
                {!scanning && (
                  <motion.button
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)' }}
                    onClick={reset}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <RotateCcw size={14} color="rgba(245,230,200,0.8)" />
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Results ───────────────────────────────── */}
        <AnimatePresence>
          {unknown && !scanning && (
            <motion.div
              className="px-5 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <GlassCard className="p-6 text-center" animate={false}>
                <div className="text-4xl mb-4">🔍</div>
                <p className="font-mono text-xs text-forest-400 tracking-widest mb-2">EXPLORATORY ANALYSIS MODE</p>
                <p className="font-display text-xl text-dawn-100 mb-2">Unknown Plant Detected</p>
                <p className="font-body text-sm text-dawn-300 font-light leading-relaxed">
                  This plant is outside my trained species. I'm running an exploratory pattern analysis. For best results, try a clearer image or use a common plant variety.
                </p>
                <button className="btn-forest mt-4 w-full" onClick={reset}>Try Again</button>
              </GlassCard>
            </motion.div>
          )}

          {result && !scanning && (
            <motion.div
              className="px-5 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {/* ── Main Result Card ── */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <GlassCard className="p-6" animate={false}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-mono text-2xs text-forest-400 tracking-widest mb-1">DIAGNOSIS COMPLETE</p>
                      <h3 className="font-display text-2xl font-light text-dawn-100">
                        {formatDisease(result.disease)}
                      </h3>
                    </div>
                    <HealthRing score={confidence} size={56} strokeWidth={4} />
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={urgency.tag}>
                      {urgency.icon} {urgency.label}
                    </span>
                    <span className="font-mono text-xs text-dawn-300">
                      {confidence}% confidence
                    </span>
                  </div>

                  {/* Confidence bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-mono text-forest-400 mb-1.5">
                      <span>AI Confidence</span><span>{confidence}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: confidence >= 80 ? 'linear-gradient(90deg, #4a7c59, #6aad7a)' : 'linear-gradient(90deg, #9a7a30, #d4a843)',
                          boxShadow: `0 0 8px ${confidence >= 80 ? 'rgba(106,173,122,0.5)' : 'rgba(212,168,67,0.5)'}`,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${confidence}%` }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* ── Treatment Cards ── */}
              {[
                { icon: Droplets, label: 'Watering',   value: recs.watering,   color: '#6ab8d4' },
                { icon: Leaf,     label: 'Treatment',  value: recs.treatment,  color: '#6aad7a' },
                { icon: Zap,      label: 'Fertilizer', value: recs.fertilizer, color: '#c0a0e0' },
                { icon: Sun,      label: 'Sunlight',   value: recs.sunlight,   color: '#d4a843' },
              ].map(({ icon: Icon, label, value, color }, i) => value && (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <GlassCard variant="light" className="p-4 flex items-start gap-3" animate={false}>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                    >
                      <Icon size={16} color={color} />
                    </div>
                    <div>
                      <p className="font-mono text-2xs tracking-widest mb-1" style={{ color: `${color}cc` }}>
                        {label.toUpperCase()}
                      </p>
                      <p className="font-body text-sm text-dawn-200 font-light leading-relaxed">{value}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}

              {/* ── Recovery Banner ── */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <GlassCard variant="light" className="p-4 flex items-center gap-3" animate={false}>
                  <CheckCircle size={20} color="#6aad7a" className="flex-shrink-0" />
                  <p className="font-body text-sm text-dawn-200 font-light">
                    With proper treatment, recovery is expected within <span className="text-forest-400 font-medium">2–3 weeks</span>.
                  </p>
                </GlassCard>
              </motion.div>

              <div className="h-4" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Empty State ───────────────────────────── */}
        {!preview && !result && (
          <div className="px-5 mt-2">
            <GlassCard className="p-5" delay={0.3}>
              <p className="font-mono text-2xs text-forest-400 tracking-widest mb-3">HOW IT WORKS</p>
              {[
                { step: '01', text: 'Upload or scan your plant photo' },
                { step: '02', text: 'AI analyzes leaf patterns & color' },
                { step: '03', text: 'Get diagnosis + treatment plan' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-center gap-3 mb-3 last:mb-0">
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-medium flex-shrink-0"
                    style={{ background: 'rgba(106,173,122,0.12)', color: '#6aad7a' }}
                  >
                    {step}
                  </span>
                  <p className="font-body text-sm text-dawn-300 font-light">{text}</p>
                </div>
              ))}
            </GlassCard>
          </div>
        )}
      </div>

      <FloatingNav />
    </div>
  )
}
