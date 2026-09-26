'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const configured = isSupabaseConfigured()

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    if (!configured) {
      setErrorMessage('Supabase is not configured yet. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file to enable password resets.')
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/account`,
      })

      if (error) {
        setErrorMessage(error.message)
        return
      }

      setSuccessMessage('Password reset instructions have been dispatched to your email address.')
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-ivory flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Ambient Cold Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="card-surface p-8 sm:p-10 border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.9)]">
          {/* Back link */}
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>

          {/* Header */}
          <div className="mb-6">
            <span className="eyebrow-luxury text-white/50 block mb-2">Account Recovery</span>
            <h1 className="font-fraunces text-2xl sm:text-3xl text-white font-light tracking-tight mb-2">
              Reset Your Password
            </h1>
            <p className="font-inter text-xs text-zinc-400">
              Enter your registered email address and we will dispatch secure instructions to reset your password.
            </p>
          </div>

          {/* Configuration Notice if Supabase is unconfigured */}
          {!configured && (
            <div className="mb-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
              <span className="font-medium text-amber-300 block mb-1">Setup Required</span>
              Supabase credentials (<code className="text-amber-100 bg-black/40 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_URL</code> &amp; <code className="text-amber-100 bg-black/40 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>) are not yet configured in <code className="text-amber-100 bg-black/40 px-1 py-0.5 rounded">.env.local</code>. Please connect your Supabase project to activate password resets.
            </div>
          )}

          {/* Success Callout */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3 text-xs text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-emerald-100">Instructions Sent</p>
                <p>{successMessage}</p>
              </div>
            </div>
          )}

          {/* Error Callout */}
          {errorMessage && (
            <div className="mb-6 p-3 rounded-lg bg-red-950/40 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Registered Email Address
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="founder@brand.com"
                className="bg-black/40 border-white/15 focus:border-white"
              />
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={loading}
              className="w-full justify-center text-xs tracking-widest uppercase mt-6"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Dispatching...
                </>
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
