const STAGE_CONFIG = {
  Seedling:      { label: 'Seedling',      icon: '🌱', color: '#92c9a0', bg: 'rgba(106,173,122,0.12)' },
  Vegetative:    { label: 'Vegetative',    icon: '🌿', color: '#6aad7a', bg: 'rgba(74,124,89,0.15)'  },
  Flowering:     { label: 'Flowering',     icon: '🌸', color: '#d4a843', bg: 'rgba(212,168,67,0.12)' },
  'Harvest Ready': { label: 'Harvest Ready', icon: '🌾', color: '#e8c97a', bg: 'rgba(232,201,122,0.15)' },
}

export default function GrowthBadge({ stage }) {
  const config = STAGE_CONFIG[stage] || STAGE_CONFIG.Seedling
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-body"
      style={{
        background: config.bg,
        color: config.color,
        border: `1px solid ${config.color}30`,
      }}
    >
      <span>{config.icon}</span>
      {config.label}
    </span>
  )
}
