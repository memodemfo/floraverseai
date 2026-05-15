import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

import Onboarding from './pages/Onboarding'
import Dashboard  from './pages/Dashboard'
import Diagnosis  from './pages/Diagnosis'
import Collection from './pages/Collection'
import CareSystem from './pages/CareSystem'
import Chatbot    from './pages/Chatbot'
import Climate    from './pages/Climate'
import Analytics  from './pages/Analytics'
import Alerts     from './pages/Alerts'
import Profile    from './pages/Profile'

import useAppStore from './store/useAppStore'

// Wrap each page so AnimatePresence can detect route changes
import { motion } from 'framer-motion'

const pageVariants = {
  initial:   { opacity: 0, y: 16 },
  animate:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit:      { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } },
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  )
}

function AppRoutes() {
  const location        = useLocation()
  const hasOnboarded    = useAppStore(s => s.hasOnboarded)

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Always start at dashboard — intro animation plays inline */}
        <Route path="/"           element={<Navigate to="/dashboard" replace />} />
        <Route path="/onboarding" element={<PageWrapper><Onboarding /></PageWrapper>} />

        {/* Main app */}
        <Route path="/dashboard"  element={<PageWrapper><Dashboard  /></PageWrapper>} />
        <Route path="/diagnosis"  element={<PageWrapper><Diagnosis  /></PageWrapper>} />
        <Route path="/collection" element={<PageWrapper><Collection /></PageWrapper>} />
        <Route path="/care"       element={<PageWrapper><CareSystem /></PageWrapper>} />
        <Route path="/chat"       element={<PageWrapper><Chatbot    /></PageWrapper>} />
        <Route path="/climate"    element={<PageWrapper><Climate    /></PageWrapper>} />
        <Route path="/analytics"  element={<PageWrapper><Analytics  /></PageWrapper>} />
        <Route path="/alerts"     element={<PageWrapper><Alerts     /></PageWrapper>} />
        <Route path="/profile"    element={<PageWrapper><Profile    /></PageWrapper>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return <AppRoutes />
}
