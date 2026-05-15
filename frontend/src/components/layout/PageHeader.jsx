import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, MoreHorizontal } from 'lucide-react'

export default function PageHeader({ title, subtitle, showBack = true, rightAction = null }) {
  const navigate = useNavigate()

  return (
    <motion.header
      className="flex items-center gap-4 px-5 pt-14 pb-4 relative z-10"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {showBack && (
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.10)',
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={18} color="rgba(245,230,200,0.7)" />
        </motion.button>
      )}

      <div className="flex-1 min-w-0">
        {subtitle && (
          <p className="section-subtitle text-xs mb-0.5">{subtitle}</p>
        )}
        <h1 className="font-display text-2xl font-light text-dawn-100 leading-tight truncate">
          {title}
        </h1>
      </div>

      {rightAction && (
        <div className="flex-shrink-0">
          {rightAction}
        </div>
      )}
    </motion.header>
  )
}
