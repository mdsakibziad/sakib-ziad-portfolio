import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/* ── Button Variants ───────────────────────────────────────────────────────── */
const buttonVariants = cva(
  // Base styles shared across all variants
  [
    'inline-flex items-center justify-center gap-2',
    'font-inter font-medium uppercase tracking-[0.14em]',
    'rounded-full border transition-all duration-300 ease-luxury',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-40',
    'select-none whitespace-nowrap',
    'hover:scale-[1.02] active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        /**
         * Default — ivory background, dark text. Primary CTA.
         */
        default: [
          'bg-ivory text-background border-ivory font-semibold shadow-[0_0_24px_rgba(247,244,239,0.18)]',
          'hover:bg-white hover:border-white hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(247,244,239,0.35)]',
          'active:scale-[0.98]',
        ],
        /**
         * Gold — warm gold background, dark text. Accent CTA.
         */
        gold: [
          'bg-gold text-background border-gold font-semibold shadow-[0_0_24px_rgba(201,166,107,0.25)]',
          'hover:bg-gold-light hover:border-gold-light hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(201,166,107,0.45)]',
          'active:scale-[0.98]',
        ],
        /**
         * Outline — surface background with border, fills ivory on hover.
         */
        outline: [
          'bg-surface/80 text-ivory border-border-strong font-medium shadow-[0_4px_16px_rgba(0,0,0,0.4)]',
          'hover:bg-ivory hover:text-background hover:border-ivory hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(247,244,239,0.2)]',
          'active:scale-[0.98]',
        ],
        /**
         * Outline Gold — gold tint, fills gold on hover.
         */
        'outline-gold': [
          'bg-gold/10 text-gold border-gold/50 font-semibold',
          'hover:bg-gold hover:text-background hover:border-gold hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(201,166,107,0.35)]',
          'active:scale-[0.98]',
        ],
        /**
         * Ghost — no border, subtle hover fill.
         */
        ghost: [
          'bg-transparent text-ivory border-transparent',
          'hover:bg-ivory/10 hover:border-ivory/20 hover:scale-[1.02]',
          'active:scale-[0.98]',
        ],
        /**
         * Ghost Gold — ghost with gold text.
         */
        'ghost-gold': [
          'bg-transparent text-gold border-transparent',
          'hover:bg-gold/10 hover:scale-[1.02]',
          'active:scale-[0.98]',
        ],
        /**
         * Muted — dimmed surface, for secondary/tertiary actions.
         */
        muted: [
          'bg-surface text-ivory/70 border-border',
          'hover:bg-surface/90 hover:text-ivory hover:border-border-strong hover:scale-[1.02]',
          'active:scale-[0.98]',
        ],
      },
      size: {
        sm: 'h-10 px-6 text-xs gap-2',
        md: 'h-12 px-8 text-xs font-semibold gap-2.5',
        lg: 'h-14 px-10 text-sm font-semibold gap-3',
        xl: 'h-16 px-12 text-sm font-semibold tracking-[0.16em] gap-3.5',
        icon: 'h-11 w-11 rounded-full p-0',
        'icon-sm': 'h-9 w-9 rounded-full p-0',
        'icon-lg': 'h-13 w-13 rounded-full p-0',
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
  /**
   * When true, renders as a `Slot` (passes props to its child element).
   * Useful for rendering a `<Link>` styled as a button.
   */
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
