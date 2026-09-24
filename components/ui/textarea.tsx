import * as React from 'react'
import { cn } from '@/lib/utils'

/* ── Textarea Component ────────────────────────────────────────────────────── */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Optional label rendered above the textarea */
  label?: string
  /** Optional error message rendered below the textarea */
  error?: string
  /** Optional helper text rendered below the textarea (shown when no error) */
  hint?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, error, hint, id, rows = 5, ...props },
    ref
  ) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full space-y-1.5">
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className="block font-inter text-label-sm uppercase tracking-widest text-ivory/60"
          >
            {label}
          </label>
        )}

        {/* Textarea field */}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : hint
              ? `${textareaId}-hint`
              : undefined
          }
          className={cn(
            // Layout & shape
            'w-full rounded-xl px-4 py-3',
            // Typography
            'font-inter text-body-md text-ivory placeholder:text-ivory/25',
            // Background & border — matches Input component exactly
            'bg-surface border border-ivory/20',
            // Resize behaviour — vertical only
            'resize-y min-h-[120px]',
            // Transitions
            'transition-all duration-300',
            // Focus state — gold ring
            'focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30',
            // Error state
            error && 'border-red-400/50 focus:border-red-400/70 focus:ring-red-400/20',
            // Disabled state
            'disabled:cursor-not-allowed disabled:opacity-40',
            className
          )}
          {...props}
        />

        {/* Error message */}
        {error && (
          <p
            id={`${textareaId}-error`}
            role="alert"
            className="font-inter text-label-sm text-red-400/80"
          >
            {error}
          </p>
        )}

        {/* Hint text */}
        {!error && hint && (
          <p
            id={`${textareaId}-hint`}
            className="font-inter text-label-sm text-muted"
          >
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
