import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/* ── Badge Variants ────────────────────────────────────────────────────────── */
const badgeVariants = cva(
  // Base — shared across all variants
  [
    'inline-flex items-center gap-1.5',
    'font-inter font-medium uppercase',
    'tracking-widest leading-none',
    'rounded-full border',
    'transition-colors duration-300',
    'select-none whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        /**
         * Default — subtle surface badge with ivory/muted text.
         */
        default: [
          'bg-surface border-border text-muted',
          'hover:border-border-strong hover:text-ivory/70',
        ],
        /**
         * Gold — warm gold tone for featured/highlighted labels.
         */
        gold: [
          'bg-gold/10 border-gold/30 text-gold',
          'hover:bg-gold/15 hover:border-gold/50',
        ],
        /**
         * Ivory — light on dark for primary category labels.
         */
        ivory: [
          'bg-ivory/8 border-ivory/20 text-ivory/80',
          'hover:bg-ivory/12 hover:border-ivory/30',
        ],
        /**
         * Outline — transparent, muted border.
         */
        outline: [
          'bg-transparent border-border text-muted',
          'hover:border-border-strong hover:text-ivory/60',
        ],
        /**
         * Success — green tone for status/availability badges.
         */
        success: [
          'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        ],
        /**
         * Warning — amber tone for attention badges.
         */
        warning: [
          'bg-amber-500/10 border-amber-500/30 text-amber-400',
        ],
        /**
         * Danger — red tone for alert badges.
         */
        danger: [
          'bg-red-500/10 border-red-500/30 text-red-400',
        ],
      },
      size: {
        sm: 'text-[0.625rem] px-2.5 py-1 gap-1',
        md: 'text-label-sm px-3 py-1.5 gap-1.5',
        lg: 'text-label-md px-4 py-2 gap-2',
      },
      dot: {
        true: '',   // Enables the dot pseudo-element via class
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      dot: false,
    },
  }
)

/* ── Types ─────────────────────────────────────────────────────────────────── */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Render a small colored dot before the label text */
  dot?: boolean
}

/* ── Dot color map matching variant ───────────────────────────────────────── */
const dotColorMap: Record<string, string> = {
  default: 'bg-muted',
  gold:    'bg-gold',
  ivory:   'bg-ivory/60',
  outline: 'bg-muted',
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  danger:  'bg-red-400',
}

/* ── Component ─────────────────────────────────────────────────────────────── */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size, dot = false, children, ...props }, ref) => {
    const dotColor = dotColorMap[variant ?? 'default'] ?? 'bg-muted'

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, dot, className }))}
        {...props}
      >
        {/* Optional status dot */}
        {dot && (
          <span
            aria-hidden="true"
            className={cn(
              'shrink-0 rounded-full',
              size === 'sm' ? 'h-1.5 w-1.5' : size === 'lg' ? 'h-2.5 w-2.5' : 'h-2 w-2',
              dotColor
            )}
          />
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
