import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 40

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

export default function ParticleCanvas({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:       randomBetween(0, canvas.width),
      y:       randomBetween(0, canvas.height),
      r:       randomBetween(1, 3),
      dx:      randomBetween(-0.3, 0.3),
      dy:      randomBetween(-0.6, -0.1),
      alpha:   randomBetween(0.1, 0.5),
      dAlpha:  randomBetween(-0.003, 0.003),
      hue:     randomBetween(80, 140),  // green-gold spectrum
      drift:   randomBetween(-0.15, 0.15),
    }))

    let animId
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        // Move
        p.x += p.dx + p.drift
        p.y += p.dy
        p.alpha += p.dAlpha

        // Clamp alpha
        if (p.alpha < 0.05) { p.alpha = 0.05; p.dAlpha *= -1 }
        if (p.alpha > 0.55) { p.alpha = 0.55; p.dAlpha *= -1 }

        // Wrap
        if (p.y < -10) { p.y = canvas.height + 10 }
        if (p.x < -10) { p.x = canvas.width  + 10 }
        if (p.x > canvas.width + 10) { p.x = -10 }

        // Draw pollen / spore
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 60%, 70%, ${p.alpha})`
        ctx.fill()

        // Soft glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 60%, 70%, ${p.alpha * 0.15})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
