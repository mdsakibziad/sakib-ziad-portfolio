import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/* ── Liquid-Glass Button Variants (Dual-Theme Adaptive) ───────────────────── */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-inter font-medium uppercase tracking-[0.12em]',
    'rounded-full border transition-all duration-300 ease-luxury',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-40',
    'select-none whitespace-normal sm:whitespace-nowrap text-center break-words max-w-full leading-snug',
    'hover:scale-[1.02] active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        /**
         * Default — Solid dark (near-black) fill with light text on light mode,
         * inverted to pure white pill with dark text on dark mode. Primary CTA.
         */
        default: [
          'bg-[#141416] text-[#F9F8F6] border-[#141416] font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.14)]',
          'hover:bg-[#27272A] hover:border-[#27272A] hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]',
          'dark:bg-white dark:text-black dark:border-white dark:shadow-[0_0_24px_rgba(255,255,255,0.18)]',
          'dark:hover:bg-zinc-200 dark:hover:border-zinc-200 dark:hover:shadow-[0_0_36px_rgba(255,255,255,0.32)]',
          'active:scale-[0.98]',
        ],
        /**
         * Glass / Gold alias — Primary CTA
         */
        gold: [
          'bg-[#141416] text-[#F9F8F6] border-[#141416] font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.14)]',
          'hover:bg-[#27272A] hover:border-[#27272A] hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]',
          'dark:bg-white dark:text-black dark:border-white dark:shadow-[0_0_24px_rgba(255,255,255,0.18)]',
          'dark:hover:bg-zinc-200 dark:hover:border-zinc-200 dark:hover:shadow-[0_0_36px_rgba(255,255,255,0.32)]',
          'active:scale-[0.98]',
        ],
        /**
         * Outline — Outlined dark border with subtle glass tint on light mode,
         * frosted liquid glass with white specular highlight on dark mode. Secondary CTA.
         */
        outline: [
          'bg-black/[0.03] backdrop-blur-xl text-[#141416] border-black/15 font-medium shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)]',
          'hover:bg-black/[0.06] hover:border-black/30 hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]',
          'dark:bg-white/[0.06] dark:text-white dark:border-white/35 dark:shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]',
          'dark:hover:bg-white/12 dark:hover:border-white/70 dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]',
          'active:scale-[0.98]',
        ],
        /**
         * Outline-Gold alias — mapped to outline.
         */
        'outline-gold': [
          'bg-black/[0.03] backdrop-blur-xl text-[#141416] border-black/15 font-medium shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)]',
          'hover:bg-black/[0.06] hover:border-black/30 hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]',
          'dark:bg-white/[0.04] dark:text-white dark:border-white/20 dark:shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]',
          'dark:hover:bg-white/10 dark:hover:border-white/35 dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]',
          'active:scale-[0.98]',
        ],
        /**
         * Ghost — transparent background with subtle hover.
         */
        ghost: [
          'bg-transparent text-zinc-700 border-transparent',
          'hover:bg-black/[0.05] hover:text-black hover:border-black/10 hover:scale-[1.02]',
          'dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white dark:hover:border-white/15',
          'active:scale-[0.98]',
        ],
        /**
         * Ghost-Gold alias — mapped to ghost.
         */
        'ghost-gold': [
          'bg-transparent text-zinc-700 border-transparent',
          'hover:bg-black/[0.05] hover:text-black hover:border-black/10 hover:scale-[1.02]',
          'dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white dark:hover:border-white/15',
          'active:scale-[0.98]',
        ],
        /**
         * Muted — dimmed surface for secondary actions.
         */
        muted: [
          'bg-surface text-zinc-700 border-border',
          'hover:bg-surface-elevated hover:text-black hover:border-border-strong hover:scale-[1.02]',
          'dark:text-zinc-300 dark:hover:text-white',
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
