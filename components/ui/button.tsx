import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/* ── Selora-Style Button Variants (Acid, Line, Ink, Ghost) ───────────────── */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center select-none',
    'font-inter font-bold uppercase tracking-[-0.01em]',
    'border transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4521c]',
    'disabled:pointer-events-none disabled:opacity-40',
    'whitespace-nowrap text-center leading-none',
  ],
  {
    variants: {
      variant: {
        /**
         * Default / Gold: Acid #f4521c with ink slide-up on hover
         */
        default: [
          'btn-acid',
        ],
        gold: [
          'btn-acid',
        ],
        /**
         * Outline: Hairline border with bone slide-up
         */
        outline: [
          'btn-line',
        ],
        'outline-gold': [
          'btn-line',
        ],
        /**
         * Ghost
         */
        ghost: [
          'bg-transparent text-[#ece8e1] border-transparent hover:text-[#f4521c]',
        ],
        'ghost-gold': [
          'bg-transparent text-[#ece8e1] border-transparent hover:text-[#f4521c]',
        ],
        /**
         * Muted
         */
        muted: [
          'bg-[#0b0c10] text-[#bdb8b0] border-[#292929] hover:border-[#f4521c] hover:text-[#ece8e1]',
        ],
      },
      size: {
        sm: 'h-9 px-4 text-[11px] gap-2',
        md: 'h-11 px-6 text-xs gap-2.5',
        lg: 'h-13 px-8 text-sm gap-3',
        xl: 'h-14 px-10 text-sm gap-3.5',
        icon: 'h-11 w-11 p-0 shrink-0 border border-[#292929] bg-[#0b0c10] text-[#ece8e1] hover:border-[#f4521c] hover:text-[#f4521c]',
        'icon-sm': 'h-9 w-9 p-0 shrink-0 border border-[#292929] bg-[#0b0c10] text-[#ece8e1] hover:border-[#f4521c] hover:text-[#f4521c]',
        'icon-lg': 'h-13 w-13 p-0 shrink-0 border border-[#292929] bg-[#0b0c10] text-[#ece8e1] hover:border-[#f4521c] hover:text-[#f4521c]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

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
