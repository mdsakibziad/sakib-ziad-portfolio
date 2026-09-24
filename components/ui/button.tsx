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
          'bg-ivory text-background border-ivory font-semibold',
          'hover:bg-white hover:border-white hover:shadow-[0_0_30px_rgba(247,244,239,0.25)]',
        ],
        /**
         * Gold — warm gold background, dark text. Accent CTA.
         */
        gold: [
          'bg-gold text-background border-gold font-semibold',
          'hover:bg-gold-light hover:border-gold-light hover:shadow-[0_0_35px_rgba(201,166,107,0.4)]',
        ],
        /**
         * Outline — transparent with ivory border.
         */
        outline: [
          'bg-transparent text-ivory border-border-strong',
          'hover:bg-ivory/10 hover:border-ivory/60 hover:shadow-[0_0_25px_rgba(247,244,239,0.08)]',
        ],
        /**
         * Outline Gold — transparent with gold border.
         */
        'outline-gold': [
          'bg-transparent text-gold border-gold/40',
          'hover:bg-gold/10 hover:border-gold hover:shadow-[0_0_25px_rgba(201,166,107,0.25)]',
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
