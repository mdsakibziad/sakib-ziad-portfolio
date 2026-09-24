import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // ── Brand Colors ─────────────────────────────────────────────────────────
      colors: {
        background: '#0B0B0A',
        surface:    '#111110',
        ivory:      '#F7F4EF',
        gold:       '#C9A66B',
        'gold-light': '#D8BA8A',
        'gold-dark':  '#A8854A',
        muted:      '#6B6B68',
        'muted-light': '#8A8A87',
        border:     'rgba(247,244,239,0.12)',
        'border-strong': 'rgba(247,244,239,0.24)',
      },

      // ── Typography ────────────────────────────────────────────────────────────
      fontFamily: {
        fraunces: ['Fraunces', 'Georgia', 'serif'],
        inter:    ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display / hero scale
        'display-2xl': ['clamp(3rem, 8vw, 7.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-xl':  ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-lg':  ['clamp(2rem, 4.5vw, 4rem)',   { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-md':  ['clamp(1.75rem, 3vw, 3rem)',  { lineHeight: '1.15', letterSpacing: '-0.018em' }],
        // Editorial body
        'body-xl': ['1.25rem', { lineHeight: '1.75' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body-md': ['1rem',    { lineHeight: '1.65' }],
        'body-sm': ['0.875rem',{ lineHeight: '1.6' }],
        // Labels / caps
        'label-lg': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
        'label-md': ['0.8125rem',{ lineHeight: '1.4', letterSpacing: '0.1em' }],
        'label-sm': ['0.75rem',  { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      fontWeight: {
        light:    '300',
        regular:  '400',
        medium:   '500',
        semibold: '600',
      },

      // ── Spacing ───────────────────────────────────────────────────────────────
      spacing: {
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
        '38':  '9.5rem',
        '42':  '10.5rem',
        '46':  '11.5rem',
        '50':  '12.5rem',
        '56':  '14rem',
        '60':  '15rem',
        '64':  '16rem',
        '72':  '18rem',
        '80':  '20rem',
        '96':  '24rem',
        '112': '28rem',
        '128': '32rem',
      },

      // ── Layout ────────────────────────────────────────────────────────────────
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ── Shadows ───────────────────────────────────────────────────────────────
      boxShadow: {
        'luxury':     '0 0 0 1px rgba(201,166,107,0.15), 0 4px 32px rgba(0,0,0,0.6)',
        'luxury-lg':  '0 0 0 1px rgba(201,166,107,0.2),  0 16px 64px rgba(0,0,0,0.8)',
        'ivory-glow': '0 0 40px rgba(247,244,239,0.04)',
        'gold-glow':  '0 0 60px rgba(201,166,107,0.15)',
      },

      // ── Animations ────────────────────────────────────────────────────────────
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-down': {
          '0%':   { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
      },
      animation: {
        'fade-up':        'fade-up 800ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-up-slow':   'fade-up 1000ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in':        'fade-in 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in-slow':   'fade-in 900ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-down':      'fade-down 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-in-right': 'slide-in-right 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'shimmer':        'shimmer 2s linear infinite',
        'pulse-slow':     'pulse-slow 3s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },

      // ── Backdrop blur ─────────────────────────────────────────────────────────
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
