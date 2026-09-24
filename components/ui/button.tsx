import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/* ── Button Variants ───────────────────────────────────────────────────────── */
const buttonVariants = cva(
  // Base styles shared across all variants
  [
    'inline-flex items-center justify-center gap-2',
    'font-inter font-medium uppercase tracking-widest',
    'rounded-full border transition-all duration-400',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-40',
    'select-none whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        /**
         * Default — ivory background, dark text. Primary CTA.
         */
        default: [
          'bg-ivory text-background border-ivory',
          'hover:bg-ivory/90 hover:border-ivory/90',
          'active:scale-[0.98]',
        ],
        /**
         * Gold — warm gold background, dark text. Accent CTA.
         */
        gold: [
          'bg-gold text-background border-gold',
          'hover:bg-gold-light hover:border-gold-light',
          'active:scale-[0.98]',
          'shadow-gold-glow/30',
        ],
        /**
         * Outline — transparent with ivory border.
         */
        outline: [
          'bg-transparent text-ivory border-border-strong',
          'hover:bg-ivory/5 hover:border-ivory/40',
          'active:scale-[0.98]',
        ],
        /**
         * Outline Gold — transparent with gold border.
         */
        'outline-gold': [
          'bg-transparent text-gold border-gold/40',
          'hover:bg-gold/8 hover:border-gold/70',
          'active:scale-[0.98]',
        ],
        /**
         * Ghost — no border, subtle hover fill.
         */
        ghost: [
          'bg-transparent text-ivory border-transparent',
          'hover:bg-ivory/8 hover:border-ivory/10',
          'active:scale-[0.98]',
        ],
        /**
         * Ghost Gold — ghost with gold text.
         */
        'ghost-gold': [
          'bg-transparent text-gold border-transparent',
          'hover:bg-gold/8',
          'active:scale-[0.98]',
        ],
        /**
         * Muted — dimmed surface, for secondary/tertiary actions.
         */
        muted: [
          'bg-surface text-ivory/70 border-border',
          'hover:bg-surface/80 hover:text-ivory hover:border-border-strong',
          'active:scale-[0.98]',
        ],
      },
      size: {
        sm: 'h-9 px-5 text-label-sm gap-1.5',
        md: 'h-11 px-7 text-label-md gap-2',
        lg: 'h-13 px-9 text-label-lg gap-2.5',
        xl: 'h-15 px-11 text-label-lg gap-3',
        icon: 'h-10 w-10 rounded-full p-0',
        'icon-sm': 'h-8 w-8 rounded-full p-0',
        'icon-lg': 'h-12 w-12 rounded-full p-0',
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
