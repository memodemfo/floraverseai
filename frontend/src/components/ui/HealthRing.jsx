// Circular SVG health / progress ring
export default function HealthRing({
  score = 0,
  size = 60,
  strokeWidth = 4,
  label = true,
  className = '',
}) {
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const color =
    score >= 80
      ? '#6aad7a'
      : score >= 60
      ? '#d4a843'
      : '#e06060'

  const glow =
    score >= 80
      ? 'rgba(106,173,122,0.6)'
      : score >= 60
      ? 'rgba(212,168,67,0.6)'
      : 'rgba(224,96,96,0.6)'

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="health-ring absolute">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="health-ring-track"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          style={{
            filter: `drop-shadow(0 0 4px ${glow})`,
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </svg>

      {label && (
        <span
          className="relative font-mono font-medium"
          style={{ fontSize: size * 0.22, color }}
        >
          {score}
        </span>
      )}
    </div>
  )
}
