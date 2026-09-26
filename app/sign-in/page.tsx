'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { setDemoUser } from '@/lib/auth/demo-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function SignInContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/account'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const configured = isSupabaseConfigured()

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    // ── Preview Sandbox Mode ──
    if (!configured) {
      setDemoUser({
        id: 'demo-' + Date.now(),
        email: email || 'Witlynai@gmail.com',
        user_metadata: {
          full_name: email.split('@')[0] || 'Sakib Ziad',
        },
      })
      router.push(redirectTo)
      router.refresh()
      return
    }

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setErrorMessage(error.message)
        return
      }

      if (data.session) {
        router.push(redirectTo)
        router.refresh()
      }
    } catch (err: any) {
      const msg = err.message || ''
      if (msg.includes('Failed to fetch')) {
        setErrorMessage('Unable to reach Supabase. Check your connection or .env.local configuration.')
      } else {
        setErrorMessage(msg || 'An unexpected error occurred.')
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setGoogleLoading(true)
    setErrorMessage('')

    // ── Preview Sandbox Mode ──
    if (!configured) {
      setDemoUser({
        id: 'demo-google-' + Date.now(),
        email: 'Witlynai@gmail.com',
        user_metadata: {
          full_name: 'Sakib Ziad',
        },
      })
      router.push(redirectTo)
      router.refresh()
      return
    }

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
          skipBrowserRedirect: true,
        },
      })

      if (error) {
        setErrorMessage(error.message)
        setGoogleLoading(false)
        return
      }

      if (data?.url) {
        try {
          const res = await fetch(data.url)
          if (res.status === 400) {
            const body = await res.json().catch(() => null)
            if (body?.msg?.includes('Unsupported provider') || body?.error_code === 'validation_failed') {
              setErrorMessage(
                'Google Sign-In is not enabled in your Supabase project yet. Please enable it in Supabase under Authentication → Providers → Google, or sign in with Email & Password.'
              )
              setGoogleLoading(false)
              return
            }
          }
        } catch {
          // If fetch fails or CORS, proceed to redirect
        }

        window.location.href = data.url
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
            <span className="eyebrow-luxury text-white/50 block mb-2">Client & Member Access</span>
            <h1 className="font-fraunces text-2xl sm:text-3xl text-white font-light tracking-tight mb-2">
              Sign In to Your Account
            </h1>
            <p className="font-inter text-xs text-zinc-400">
              Access your digital products, blueprints, and Syndicate membership.
            </p>
          </div>

          {/* Sandbox Preview Mode Notice */}
          {!configured && (
            <div className="mb-6 p-3.5 rounded-xl bg-zinc-900/90 border border-emerald-500/20 text-xs text-zinc-300 leading-relaxed">
              <div className="flex items-center gap-1.5 mb-1 text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Preview Sandbox Mode
              </div>
              <p className="text-[11.5px] text-zinc-400">
                Direct sign-in is active for sandbox testing. Continue with Google or enter any email to enter your dashboard.
              </p>
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
            onClick={handleGoogleSignIn}
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
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest">
              <span className="bg-[#121214] px-3 text-zinc-500">Or email</span>
            </div>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Email Address
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-zinc-400 hover:text-white transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
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
                  Authenticating...
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Footer link */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-zinc-400 font-inter">
              Don&apos;t have an account?{' '}
              <Link
                href={`/sign-up?redirectTo=${encodeURIComponent(redirectTo)}`}
                className="text-white font-medium hover:underline underline-offset-4"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SignInContent />
    </Suspense>
  )
}
