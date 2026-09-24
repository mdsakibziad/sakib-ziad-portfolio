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
      // ── Pure Monochromatic Liquid-Glass Palette (Black, White, Zinc) ───────────
      colors: {
        background: '#070707',
        surface:    '#111111',
        'surface-elevated': '#171717',
        ivory:      '#FFFFFF',
        muted:      '#A1A1AA', // zinc-400: High contrast, WCAG AA compliant
        'muted-light': '#D4D4D8', // zinc-300: Crisp secondary body
        border:     'rgba(255, 255, 255, 0.08)',
        'border-strong': 'rgba(255, 255, 255, 0.16)',
        glass:      'rgba(255, 255, 255, 0.03)',
        'glass-border': 'rgba(255, 255, 255, 0.12)',
        'glass-highlight': 'rgba(255, 255, 255, 0.22)',
      },

      // ── Typography ────────────────────────────────────────────────────────────
      fontFamily: {
        fraunces: ['var(--font-fraunces)', 'Georgia', 'serif'],
        inter:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display / hero scale
        'display-2xl': ['clamp(2.75rem, 7vw, 7rem)',   { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-xl':  ['clamp(2.25rem, 5.5vw, 5rem)',  { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-lg':  ['clamp(1.85rem, 4vw, 3.75rem)', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-md':  ['clamp(1.5rem, 2.8vw, 2.75rem)',{ lineHeight: '1.15', letterSpacing: '-0.018em' }],
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
        'luxury':     '0 0 0 1px rgba(255,255,255,0.08), 0 4px 32px rgba(0,0,0,0.8)',
        'luxury-lg':  '0 0 0 1px rgba(255,255,255,0.14), 0 16px 64px rgba(0,0,0,0.9)',
        'glass-glow': '0 0 50px rgba(255,255,255,0.08)',
        'glass-specular': 'inset 0 1px 0 0 rgba(255,255,255,0.25), 0 8px 32px rgba(0,0,0,0.6)',
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
          '50%':      { opacity: '0.4' },
        },
        'liquid-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%':      { transform: 'scale(1.03)', opacity: '1' },
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
        'liquid-pulse':   'liquid-pulse 6s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
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
        '2xl': '40px',
        '3xl': '64px',
      },
    },
  },
  plugins: [],
}

export default config
