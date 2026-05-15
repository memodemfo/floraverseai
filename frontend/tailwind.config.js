/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#050d07',
          900: '#0a1a0f',
          800: '#0d2318',
          700: '#1a3d28',
          600: '#2d5a3d',
          500: '#4a7c59',
          400: '#6aad7a',
          300: '#92c9a0',
          200: '#bbdfc4',
          100: '#e0f0e4',
        },
        sunlight: {
          900: '#7a5a10',
          700: '#b88820',
          500: '#d4a843',
          400: '#e0bc68',
          300: '#e8c97a',
          200: '#f2dca8',
          100: '#faf0dc',
        },
        dawn: {
          900: '#8a6a3a',
          700: '#b8955a',
          500: '#d4b87a',
          300: '#e8d4a8',
          100: '#f5e6c8',
          50:  '#fdf8f0',
        },
        mist: {
          dark:  'rgba(10,26,15,0.85)',
          mid:   'rgba(10,26,15,0.60)',
          light: 'rgba(10,26,15,0.30)',
        },
        glass: {
          DEFAULT: 'rgba(255,255,255,0.05)',
          border:  'rgba(255,255,255,0.10)',
          light:   'rgba(255,255,255,0.12)',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '40px',
      },
      boxShadow: {
        glass:    '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        glow:     '0 0 30px rgba(106,173,122,0.3)',
        'glow-gold': '0 0 30px rgba(212,168,67,0.3)',
        'glow-sm': '0 0 15px rgba(106,173,122,0.2)',
        cinematic: '0 25px 60px rgba(0,0,0,0.6)',
        orb:      '0 0 60px rgba(106,173,122,0.5), 0 0 120px rgba(106,173,122,0.2)',
      },
      animation: {
        'breathe':        'breathe 4s ease-in-out infinite',
        'float':          'float 6s ease-in-out infinite',
        'float-slow':     'float 10s ease-in-out infinite',
        'pulse-glow':     'pulseGlow 3s ease-in-out infinite',
        'scan-line':      'scanLine 2.5s linear infinite',
        'drift':          'drift 20s linear infinite',
        'fade-up':        'fadeUp 0.6s ease forwards',
        'fade-in':        'fadeIn 0.5s ease forwards',
        'spin-slow':      'spin 8s linear infinite',
        'ping-slow':      'ping 3s cubic-bezier(0,0,0.2,1) infinite',
        'leaf-sway':      'leafSway 4s ease-in-out infinite',
        'shimmer':        'shimmer 2s linear infinite',
      },
      keyframes: {
        breathe: {
          '0%,100%': { transform: 'scale(1)',   opacity: '0.9' },
          '50%':     { transform: 'scale(1.08)', opacity: '1'   },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 20px rgba(106,173,122,0.3)' },
          '50%':     { boxShadow: '0 0 60px rgba(106,173,122,0.7)' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        drift: {
          '0%':   { transform: 'translateX(-100vw) translateY(0)' },
          '100%': { transform: 'translateX(100vw)  translateY(-50px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        leafSway: {
          '0%,100%': { transform: 'rotate(-3deg) translateY(0)' },
          '50%':     { transform: 'rotate(3deg) translateY(-4px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'forest-gradient':  'linear-gradient(135deg, #050d07 0%, #0a1a0f 40%, #1a3d28 100%)',
        'gold-gradient':    'linear-gradient(135deg, #d4a843 0%, #e8c97a 100%)',
        'glass-gradient':   'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        'mist-gradient':    'linear-gradient(180deg, rgba(10,26,15,0) 0%, rgba(10,26,15,0.95) 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}
