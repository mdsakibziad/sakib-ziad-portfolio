import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/* ── Liquid-Glass Button Variants (Pure Monochrome) ───────────────────────── */
const buttonVariants = cva(
  // Base styles shared across all variants — mobile responsive wrapping & safe bounds
  [
    'inline-flex items-center justify-center',
    'font-inter font-medium uppercase tracking-[0.12em]',
    'rounded-full border transition-all duration-300 ease-luxury',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-40',
    'select-none whitespace-normal sm:whitespace-nowrap text-center break-words max-w-full leading-snug',
    'hover:scale-[1.02] active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        /**
         * Default — Pure white luxury pill with soft reflection. Primary CTA.
         */
        default: [
          'bg-white text-black border-white font-semibold shadow-[0_0_24px_rgba(255,255,255,0.18)]',
          'hover:bg-zinc-200 hover:border-zinc-200 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(255,255,255,0.32)]',
          'active:scale-[0.98]',
        ],
        /**
         * Glass / Gold alias — Monochromatic frosted liquid glass.
         */
        gold: [
          'bg-white text-black border-white font-semibold shadow-[0_0_24px_rgba(255,255,255,0.18)]',
          'hover:bg-zinc-200 hover:border-zinc-200 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(255,255,255,0.32)]',
          'active:scale-[0.98]',
        ],
        /**
         * Outline — Frosted liquid glass with white specular highlight.
         */
        outline: [
          'bg-white/[0.04] backdrop-blur-xl text-white border-white/20 font-medium shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]',
          'hover:bg-white/10 hover:border-white/35 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]',
          'active:scale-[0.98]',
        ],
        /**
         * Outline-Gold alias — mapped to liquid glass outline.
         */
        'outline-gold': [
          'bg-white/[0.04] backdrop-blur-xl text-white border-white/20 font-medium shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]',
          'hover:bg-white/10 hover:border-white/35 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]',
          'active:scale-[0.98]',
        ],
        /**
         * Ghost — transparent background with subtle frosted hover.
         */
        ghost: [
          'bg-transparent text-white/80 border-transparent',
          'hover:bg-white/10 hover:text-white hover:border-white/15 hover:scale-[1.02]',
          'active:scale-[0.98]',
        ],
        /**
         * Ghost-Gold alias — mapped to ghost.
         */
        'ghost-gold': [
          'bg-transparent text-white/80 border-transparent',
          'hover:bg-white/10 hover:text-white hover:border-white/15 hover:scale-[1.02]',
          'active:scale-[0.98]',
        ],
        /**
         * Muted — dimmed surface for secondary actions.
         */
        muted: [
          'bg-surface text-zinc-300 border-border',
          'hover:bg-surface-elevated hover:text-white hover:border-border-strong hover:scale-[1.02]',
          'active:scale-[0.98]',
        ],
      },
      size: {
        sm: 'min-h-[2.25rem] px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] gap-1.5',
        md: 'min-h-[2.75rem] px-4.5 sm:px-7 py-2 sm:py-2.5 text-xs font-semibold gap-2',
        lg: 'min-h-[3.25rem] px-5 sm:px-9 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-[0.12em] gap-2.5 sm:gap-3',
        xl: 'min-h-[3.5rem] px-6 sm:px-11 py-3 sm:py-4 text-xs sm:text-sm font-semibold tracking-[0.14em] gap-3 sm:gap-3.5',
        icon: 'h-11 w-11 rounded-full p-0 shrink-0',
        'icon-sm': 'h-9 w-9 rounded-full p-0 shrink-0',
        'icon-lg': 'h-13 w-13 rounded-full p-0 shrink-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

/* ── Types ─────────────────────────────────────────────────────────────────── */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

/* ── Component ─────────────────────────────────────────────────────────────── */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
