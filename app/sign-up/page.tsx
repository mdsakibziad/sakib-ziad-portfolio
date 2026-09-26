'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function SignUpContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/account'

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const configured = isSupabaseConfigured()

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.')
      setLoading(false)
      return
    }

    if (!configured) {
      setErrorMessage('Database connection is not configured on this deployment. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.')
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
        },
      })

      if (error) {
        setErrorMessage(error.message)
        return
      }

      if (data.session) {
        // Direct session without email confirmation
        router.push(redirectTo)
        router.refresh()
      } else {
        // Email confirmation required
        setSuccessMessage(
          'Account created successfully. Please check your email to confirm your account before signing in.'
        )
      }
    } catch (err: any) {
      const msg = err.message || ''
      if (msg.includes('Failed to fetch')) {
        setErrorMessage('Unable to reach Supabase database. Check your internet connection or configuration.')
      } else {
        setErrorMessage(msg || 'An error occurred during account creation.')
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignUp() {
    setGoogleLoading(true)
    setErrorMessage('')

    if (!configured) {
      setErrorMessage('Supabase is not configured on this deployment. Please add environment variables in Vercel.')
      setGoogleLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
        },
      })

      if (error) {
        setErrorMessage(error.message)
        setGoogleLoading(false)
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to authenticate with Google.')
      setGoogleLoading(false)
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
          {/* Header */}
          <div className="text-center mb-8">
            <span className="eyebrow-luxury text-white/50 block mb-2">Private Client Registry</span>
            <h1 className="font-fraunces text-2xl sm:text-3xl text-white font-light tracking-tight mb-2">
              Create Your Account
            </h1>
            <p className="font-inter text-xs text-zinc-400">
              Access your licensed prompt frameworks, tools, and Syndicate portal.
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3 text-xs text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-emerald-100">Verification Link Dispatched</p>
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

          {/* Google Auth Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 text-white font-inter text-xs uppercase tracking-wider transition-all duration-300 mb-6 disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Sign Up with Google</span>
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest">
              <span className="bg-[#121214] px-3 text-zinc-500">Or email register</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Full Name
              </label>
              <Input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                className="bg-black/40 border-white/15 focus:border-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Work Email
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

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Password
              </label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
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
                  Creating Account...
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Footer link */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-zinc-400 font-inter">
              Already have an account?{' '}
              <Link
                href={`/sign-in?redirectTo=${encodeURIComponent(redirectTo)}`}
                className="text-white font-medium hover:underline underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SignUpContent />
    </Suspense>
  )
}
