import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, Sparkles } from 'lucide-react'
import ForestBackground from '../components/ambient/ForestBackground'
import ParticleCanvas from '../components/ambient/ParticleCanvas'
import BreathingOrb from '../components/ambient/BreathingOrb'
import FloatingNav from '../components/layout/FloatingNav'
import { chatResponses } from '../data/chatKnowledge'
import { chatWithOllama } from '../services/api'

const SUGGESTIONS = [
  'Why are my leaves yellow?',
  'How do I propagate Monstera?',
  'My tomato has brown spots',
  'Best plants for indoors?',
  'How often to water succulents?',
  'When should I harvest tomatoes?',
  'My basil keeps dying',
  'How to get rid of aphids?',
]

const AI_NAME = 'Flora'

// Scored keyword matching — returns best-match response
function getAIResponse(input) {
  const lower = input.toLowerCase()
  let bestKey = null
  let bestScore = 0

  for (const [key, entry] of Object.entries(chatResponses)) {
    if (key === 'default' || !entry.keywords) continue
    const score = entry.keywords.reduce((acc, kw) => acc + (lower.includes(kw) ? 1 : 0), 0)
    if (score > bestScore) { bestScore = score; bestKey = key }
  }

  if (bestScore > 0) return chatResponses[bestKey].response
  return chatResponses.default
}

function Message({ msg, isLatest }) {
  const isUser = msg.role === 'user'
  return (
    <motion.div
      className={`flex items-end gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-forest-700 flex items-center justify-center flex-shrink-0 mb-1">
          <span className="text-xs">🌿</span>
        </div>
      )}

      <div
        className={`max-w-[78%] px-4 py-3 ${isUser ? 'chat-bubble-user' : 'chat-bubble-ai'}`}
      >
        {!isUser && (
          <p className="font-mono text-2xs text-forest-400 tracking-widest mb-1">{AI_NAME}</p>
        )}
        <p className="font-body text-sm text-dawn-200 font-light leading-relaxed whitespace-pre-line">
          {msg.text}
        </p>
        <p className="font-mono text-2xs text-dawn-300 mt-1.5 opacity-50 text-right">
          {msg.time}
        </p>
      </div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <motion.div
      className="flex items-end gap-2.5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-7 h-7 rounded-full bg-forest-700 flex items-center justify-center flex-shrink-0">
        <span className="text-xs">🌿</span>
      </div>
      <div className="chat-bubble-ai px-4 py-3">
        <div className="flex gap-1.5 items-center">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-forest-400"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: `Hello, Gardener. 🌿\n\nI'm Flora, your AI plant companion. I'm here to help you understand, care for, and nurture your plants.\n\nWhat's on your mind today?`,
      time: 'Now',
    },
  ])
  const [input,   setInput]   = useState('')
  const [typing,  setTyping]  = useState(false)
  const bottomRef             = useRef(null)

  const scroll = () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => { scroll() }, [messages, typing])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages(m => [...m, { role: 'user', text: msg, time: now }])
    setTyping(true)

    let response
    try {
      // Try Ollama llama3 via backend
      const res = await chatWithOllama(msg)
      if (res.data?.response) {
        response = res.data.response
      } else {
        throw new Error('No response from Ollama')
      }
    } catch {
      // Fallback to local keyword AI
      await new Promise(r => setTimeout(r, 600))
      response = getAIResponse(msg)
    }

    setTyping(false)
    setMessages(m => [...m, { role: 'ai', text: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
  }

  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      <ForestBackground variant="misty" />
      <ParticleCanvas />

      {/* Header */}
      <motion.div
        className="relative z-10 flex items-center gap-4 px-5 pt-14 pb-4 flex-shrink-0"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <BreathingOrb size={42} pulse={false} />
        <div>
          <h1 className="font-display text-2xl font-light text-dawn-100">Flora AI</h1>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-400 animate-pulse" />
            <p className="font-body text-xs text-forest-400 font-light">Your plant companion · Always listening</p>
          </div>
        </div>
        <div className="ml-auto">
          <Sparkles size={18} color="rgba(212,168,67,0.6)" />
        </div>
      </motion.div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar pb-32">
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} isLatest={i === messages.length - 1} />
        ))}
        <AnimatePresence>{typing && <TypingIndicator />}</AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <motion.div
          className="relative z-10 px-4 pb-3 flex-shrink-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-mono text-2xs text-forest-400 tracking-widest mb-2 px-1">SUGGESTED</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => send(s)}
                className="px-3 py-1.5 rounded-full text-xs font-body font-light transition-all duration-200"
                style={{
                  background: 'rgba(45,90,61,0.2)',
                  border: '1px solid rgba(106,173,122,0.2)',
                  color: '#92c9a0',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input bar */}
      <motion.div
        className="relative z-10 px-4 pb-24 pt-2 flex-shrink-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(5,13,7,0.7)', backdropFilter: 'blur(20px)' }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
        >
          <input
            className="flex-1 bg-transparent font-body text-sm text-dawn-100 outline-none placeholder-dawn-300/35"
            placeholder="Ask Flora anything about your plants..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
          />
          <motion.button
            onClick={() => send()}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: input.trim() ? 'linear-gradient(135deg, #2d5a3d, #4a7c59)' : 'rgba(255,255,255,0.06)',
              boxShadow: input.trim() ? '0 4px 15px rgba(74,124,89,0.4)' : 'none',
              transition: 'all 0.2s',
            }}
            whileTap={{ scale: 0.9 }}
          >
            <Send size={15} color={input.trim() ? 'white' : 'rgba(245,230,200,0.35)'} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
