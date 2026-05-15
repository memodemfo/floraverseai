import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Camera, Leaf, HeartPulse, MessageCircle, Bell, User } from 'lucide-react'

const NAV_ITEMS = [
  { path: '/dashboard',  icon: Home,          label: 'Home'   },
  { path: '/diagnosis',  icon: Camera,        label: 'Scan'   },
  { path: '/collection', icon: Leaf,          label: 'Garden' },
  { path: '/care',       icon: HeartPulse,    label: 'Care'   },
  { path: '/chat',       icon: MessageCircle, label: 'AI'     },
  { path: '/alerts',     icon: Bell,          label: 'Alerts' },
  { path: '/profile',    icon: User,          label: 'You'    },
]

export default function FloatingNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const current  = location.pathname

  return (
    <motion.nav
      className="fixed bottom-5 left-1/2 z-50"
      style={{ translateX: '-50%' }}
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
    >
      <div
        className="flex items-center gap-0.5 px-2.5 py-2 rounded-full"
        style={{
          background: 'rgba(10,13,11,0.90)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: '1px solid rgba(0,232,92,0.08)',
          boxShadow: '0 12px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)',
        }}
      >
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
          const active = current === path || (path !== '/dashboard' && current.startsWith(path))
          return (
            <motion.button
              key={path}
              onClick={() => navigate(path)}
              className="relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-full cursor-pointer"
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.05 }}
              style={{ minWidth: 46 }}
            >
              {active && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  layoutId="nav-pill"
                  style={{
                    background: 'rgba(0,232,92,0.10)',
                    border: '1px solid rgba(0,232,92,0.18)',
                    boxShadow: '0 0 16px rgba(0,232,92,0.15)',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}

              <Icon
                size={17}
                className="relative transition-all duration-200"
                color={active ? '#00e85c' : 'rgba(232,235,233,0.3)'}
                strokeWidth={active ? 2 : 1.5}
              />
              <span
                className="relative font-mono tracking-wide transition-all duration-200"
                style={{
                  fontSize: '0.48rem',
                  letterSpacing: '0.08em',
                  color: active ? '#00e85c' : 'rgba(232,235,233,0.28)',
                }}
              >
                {label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.nav>
  )
}
