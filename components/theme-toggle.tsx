'use client'

import React, { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './theme-provider'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn(
          'w-9 h-9 rounded-full border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.04]',
          className
        )}
      />
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 rounded-full',
        'h-9 px-2.5 sm:px-3 text-xs font-inter uppercase tracking-wider',
        'border border-black/10 dark:border-white/15',
        'bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-md',
        'text-zinc-700 dark:text-zinc-300',
        'shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)]',
        'transition-all duration-300 ease-luxury',
        'hover:border-black/25 dark:hover:border-white/30',
        'hover:bg-black/[0.06] dark:hover:bg-white/[0.08]',
        'hover:text-black dark:hover:text-white',
        'hover:scale-[1.03] active:scale-[0.97]',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white',
        className
      )}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      <span className="relative flex items-center justify-center w-4 h-4">
        {isDark ? (
          <Sun className="w-3.5 h-3.5 text-zinc-200 transition-transform duration-300 rotate-0 group-hover:rotate-45" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-zinc-700 transition-transform duration-300 -rotate-12 group-hover:rotate-0" />
        )}
      </span>
      {showLabel && (
        <span className="text-[11px] font-mono tracking-widest">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  )
}
