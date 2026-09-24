import * as React from 'react'
import { cn } from '@/lib/utils'

/* ── Input Component ───────────────────────────────────────────────────────── */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional label rendered above the input */
  label?: string
  /** Optional error message rendered below the input */
  error?: string
  /** Optional helper text rendered below the input (shown when no error) */
  hint?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full space-y-1.5">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block font-inter text-label-sm uppercase tracking-widest text-ivory/60"
          >
            {label}
          </label>
        )}

        {/* Input field */}
        <input
          ref={ref}
          id={inputId}
          type={type}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(
            // Layout & shape
            'w-full rounded-xl px-4 py-3',
            // Typography
            'font-inter text-body-md text-ivory placeholder:text-ivory/25',
            // Background & border
            'bg-surface border border-ivory/20',
            // Transitions
            'transition-all duration-300',
            // Focus state — gold ring
            'focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30',
            // Error state
            error && 'border-red-400/50 focus:border-red-400/70 focus:ring-red-400/20',
            // Disabled state
            'disabled:cursor-not-allowed disabled:opacity-40',
            // File input styling
            'file:border-0 file:bg-transparent file:text-ivory/70 file:text-sm file:font-medium',
            className
          )}
          {...props}
        />

        {/* Error message */}
        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="font-inter text-label-sm text-red-400/80"
          >
            {error}
          </p>
        )}

        {/* Hint text */}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="font-inter text-label-sm text-muted">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
