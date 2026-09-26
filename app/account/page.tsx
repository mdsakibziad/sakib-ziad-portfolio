'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Download,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  User,
  LogOut,
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Package,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PRODUCTS_CATALOG } from '@/lib/stripe'

interface PurchaseItem {
  id: string
  product_id: string
  product_name: string
  amount_paid: number
  currency: string
  download_ref: string
  created_at: string
}

interface MembershipData {
  status: string
  current_period_end: string | null
  stripe_customer_id: string | null
}

export default function AccountPage() {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [purchases, setPurchases] = useState<PurchaseItem[]>([])
  const [membership, setMembership] = useState<MembershipData | null>(null)

  // Password update state
  const [newPassword, setNewPassword] = useState('')
  const [updatingPassword, setUpdatingPassword] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  // Stripe Portal loading
  const [portalLoading, setPortalLoading] = useState(false)

  useEffect(() => {
    async function loadUserData() {
      setLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/sign-in?redirectTo=/account')
        return
      }

      setUser(user)

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      setProfile(profileData || { full_name: user.user_metadata?.full_name || '' })

      // Fetch digital product purchases
      const { data: purchasesData } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setPurchases(purchasesData || [])

      // Fetch membership status
      const { data: membershipData } = await supabase
        .from('memberships')
        .select('*')
        .eq('user_id', user.id)
        .single()
      setMembership(membershipData || null)

      setLoading(false)
    }

    loadUserData()
  }, [router, supabase])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault()
    setUpdatingPassword(true)
    setPasswordError('')
    setPasswordSuccess(false)

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.')
      setUpdatingPassword(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) {
        setPasswordError(error.message)
      } else {
        setPasswordSuccess(true)
        setNewPassword('')
      }
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to update password.')
    } finally {
      setUpdatingPassword(false)
    }
  }

  async function handleOpenPortal() {
    setPortalLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Failed to open billing portal.')
      }
    } catch {
      alert('Network error communicating with billing portal.')
    } finally {
      setPortalLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-ivory flex items-center justify-center pt-28">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-white/70" />
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            Verifying Credentials & Entitlements...
          </span>
        </div>
      </div>
    )
  }

  const isMemberActive = membership?.status === 'active'

  return (
    <div className="min-h-screen bg-background text-ivory pt-32 pb-24 selection:bg-white selection:text-black">
      <div className="container-luxury max-w-6xl">
        
        {/* Header / Identity Bar */}
        <div className="card-surface p-8 sm:p-10 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-white/10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/15 flex items-center justify-center text-xl font-fraunces text-white shadow-[0_0_24px_rgba(255,255,255,0.06)]">
              {profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-fraunces text-2xl sm:text-3xl text-white font-light">
                  {profile?.full_name || 'Client Portal'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/10 text-white border border-white/20">
                  {isMemberActive ? 'Syndicate Member' : 'Verified Client'}
                </span>
              </div>
              <p className="font-mono text-xs text-zinc-400">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="text-xs uppercase tracking-wider border-white/15 hover:border-white/30"
            >
              <LogOut className="w-3.5 h-3.5 mr-2" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Column (8 Cols): Digital Products & Membership */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Membership Status Card */}
            <div className="card-surface p-8 border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span className="eyebrow-luxury text-white">Advisory Syndicate Membership</span>
                </div>
                <span
                  className={`text-[11px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                    isMemberActive
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                      : 'bg-white/5 text-zinc-400 border border-white/10'
                  }`}
                >
                  {isMemberActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {isMemberActive ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                        Subscription Tier
                      </span>
                      <p className="font-fraunces text-lg text-white">The Advisory Syndicate</p>
                      <p className="text-xs text-zinc-400 mt-1">Monthly strategic AI access & model calibrations.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                        Next Renewal
                      </span>
                      <p className="font-mono text-sm text-zinc-200 mt-1">
                        {membership?.current_period_end
                          ? new Date(membership.current_period_end).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : 'Active Monthly'}
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-1">Billed automatically via Stripe.</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleOpenPortal}
                      disabled={portalLoading}
                      className="text-xs uppercase tracking-wider"
                    >
                      {portalLoading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />
                          Opening Billing Portal...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-3.5 h-3.5 mr-2" />
                          <span>Manage Subscription & Invoices</span>
                        </>
                      )}
                    </Button>

                    <a
                      href="https://witlyn.com/syndicate/portal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-inter text-zinc-300 hover:text-white transition-colors"
                    >
                      <span>Open Member Vault</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="body-muted text-zinc-300 text-sm">
                    You do not currently hold an active seat in The Advisory Syndicate. Membership grants direct monthly strategy sessions, private Slack access, and exclusive prompt systems.
                  </p>
                  <Button asChild variant="default" size="sm">
                    <Link href="/membership" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider">
                      <span>Explore Membership & Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            {/* 2. Purchased Digital Products */}
            <div className="card-surface p-8 border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-white" />
                  <span className="eyebrow-luxury text-white">Licensed Frameworks & Digital Kits</span>
                </div>
                <span className="font-mono text-xs text-zinc-400">
                  {purchases.length} {purchases.length === 1 ? 'Kit' : 'Kits'} Licensed
                </span>
              </div>

              {purchases.length > 0 ? (
                <div className="space-y-4">
                  {purchases.map((purchase) => {
                    const catalogItem = PRODUCTS_CATALOG[purchase.product_id]
                    return (
                      <div
                        key={purchase.id}
                        className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition-colors"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                            PURCHASED ON {new Date(purchase.created_at).toLocaleDateString()}
                          </span>
                          <h3 className="font-fraunces text-base sm:text-lg text-white font-light">
                            {purchase.product_name}
                          </h3>
                          <p className="text-xs text-zinc-400">
                            {catalogItem?.description || 'Commercial license & full source assets included.'}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <a
                            href={purchase.download_ref || catalogItem?.downloadRef || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 font-inter text-xs font-semibold uppercase tracking-wider text-black bg-white rounded-lg px-4 py-2 hover:bg-zinc-200 transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Kit</span>
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-zinc-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-fraunces text-lg text-white font-light mb-1">
                      No Digital Frameworks Licensed Yet
                    </p>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                      Explore our production-proven AI creative brief architectures, prompt taxonomies, and turnkey agent blueprints.
                    </p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/digital-products" className="text-xs uppercase tracking-wider">
                      <span>Browse Available Products</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>

          </div>

          {/* Sidebar Column (4 Cols): Profile & Password Settings */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Account Security Card */}
            <div className="card-surface p-6 sm:p-8 border-white/10">
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-4 mb-6">
                <KeyRound className="w-4 h-4 text-white" />
                <span className="eyebrow-luxury text-white">Security & Password</span>
              </div>

              {passwordSuccess && (
                <div className="mb-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2 text-xs text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Password updated successfully.</span>
                </div>
              )}

              {passwordError && (
                <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-500/30 flex items-start gap-2 text-xs text-red-200">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{passwordError}</span>
                </div>
              )}

              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Update Password
                  </label>
                  <Input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password (min. 6 chars)"
                    className="bg-black/40 border-white/15 focus:border-white text-xs"
                  />
                </div>

                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  disabled={updatingPassword}
                  className="w-full text-xs uppercase tracking-wider"
                >
                  {updatingPassword ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <span>Update Password</span>
                  )}
                </Button>
              </form>
            </div>

            {/* Direct Support Card */}
            <div className="card-surface p-6 border-white/10 text-xs space-y-3">
              <p className="eyebrow-luxury text-zinc-400">Direct Support</p>
              <p className="text-zinc-300">
                Need license customisation, team invoice reallocation, or advisory access questions?
              </p>
              <a
                href="mailto:Sakib@witlyn.com"
                className="inline-block text-white font-mono text-[11px] underline underline-offset-4 hover:text-zinc-300"
              >
                Sakib@witlyn.com
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
