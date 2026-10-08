'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
  Layers,
  Activity,
  FileText,
  Calendar,
  Check,
  Copy,
  Zap,
  Terminal,
  Lock,
} from 'lucide-react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
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

type TabType = 'overview' | 'vault' | 'membership' | 'security'

export default function AccountPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [purchases, setPurchases] = useState<PurchaseItem[]>([])
  const [membership, setMembership] = useState<MembershipData | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [copiedId, setCopiedId] = useState(false)

  // Password update state
  const [newPassword, setNewPassword] = useState('')
  const [updatingPassword, setUpdatingPassword] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  // Stripe Portal loading
  const [portalLoading, setPortalLoading] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      router.push('/sign-in?redirectTo=/account')
      return
    }

    const supabase = createClient()

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
  }, [router])

  async function handleSignOut() {
    const supabase = createClient()
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
      const supabase = createClient()
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
      alert('Failed to connect to billing server.')
    } finally {
      setPortalLoading(false)
    }
  }

  function handleCopyClientId() {
    if (!user?.id) return
    navigator.clipboard.writeText(user.id)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-ivory flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border border-border animate-ping absolute inset-0" />
            <div className="w-12 h-12 rounded-full border border-border-strong flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-ivory animate-spin" />
            </div>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Initializing Encrypted Client Workspace...
          </span>
        </div>
      </div>
    )
  }

  const isMemberActive = membership?.status === 'active'
  const displayName = profile?.full_name || user?.user_metadata?.full_name || 'Client Executive'
  const userInitials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'SZ'

  const authProvider = user?.app_metadata?.provider === 'google' ? 'Google OAuth' : 'Email Authentication'

  return (
    <div className="min-h-screen bg-background text-ivory pt-28 sm:pt-32 pb-24 relative overflow-hidden">
      
      {/* Ambient Radial Glass Gradients */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] pointer-events-none opacity-40 blur-[130px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(120,120,120,0.08) 0%, rgba(120,120,120,0.02) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-luxury max-w-6xl relative z-10 px-4 sm:px-6">

        {/* ── Executive Identity Header (Bespoke Command HUD) ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="card-surface p-6 sm:p-8 mb-8 relative overflow-hidden"
        >
          {/* Subtle Top Metallic Highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Identity Group */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-5">
              <div className="relative shrink-0">
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={displayName}
                    className="w-16 h-16 rounded-2xl object-cover border border-border-strong shadow-[0_0_24px_rgba(0,0,0,0.08)]"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-surface-elevated border border-border-strong flex items-center justify-center font-fraunces text-xl font-light text-ivory shadow-[0_0_24px_rgba(0,0,0,0.04)]">
                    {userInitials}
                  </div>
                )}
                <div
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-surface flex items-center justify-center"
                  title="Encrypted Live Session"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </div>
              </div>

              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="font-fraunces text-2xl sm:text-3xl text-ivory font-light tracking-tight truncate">
                    {displayName}
                  </h1>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                      isMemberActive
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30'
                        : 'bg-surface-elevated text-muted-light border border-border'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isMemberActive ? 'bg-emerald-500' : 'bg-muted'}`} />
                    {isMemberActive ? 'Syndicate Member' : 'Verified Client'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                  <span className="font-mono text-muted-light text-[11px]">{user?.email}</span>
                  <span className="text-muted/40 hidden sm:inline">•</span>
                  <span className="text-[11px] font-mono text-muted hidden sm:inline-flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-500" />
                    TLS 256-Bit Encrypted
                  </span>
                </div>
              </div>
            </div>

            {/* Top Toolbar Actions */}
            <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
              <Button asChild variant="outline" size="sm" className="text-xs uppercase tracking-wider h-9">
                <Link href="/consulting">
                  <Calendar className="w-3.5 h-3.5 mr-2" />
                  <span>Book Advisory Call</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-xs uppercase tracking-wider text-muted hover:text-ivory h-9"
              >
                <LogOut className="w-3.5 h-3.5 mr-1.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>

          </div>
        </motion.div>

        {/* ── Executive Status HUD Metrics ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          {/* Metric 1 */}
          <div className="card-surface p-5 relative overflow-hidden group hover:border-border-strong transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted">Advisory Entitlement</span>
              <ShieldCheck className="w-4 h-4 text-muted group-hover:text-ivory transition-colors" />
            </div>
            <p className="font-fraunces text-xl text-ivory font-light mb-1">
              {isMemberActive ? 'Active Syndicate' : 'Direct Advisory'}
            </p>
            <p className="text-[11px] font-inter text-muted-light">
              {isMemberActive
                ? `Next renewal: ${
                    membership?.current_period_end
                      ? new Date(membership.current_period_end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : 'Monthly active'
                  }`
                : '1:1 Private consulting on demand'}
            </p>
          </div>

          {/* Metric 2 */}
          <div className="card-surface p-5 relative overflow-hidden group hover:border-border-strong transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted">Asset Vault</span>
              <Package className="w-4 h-4 text-muted group-hover:text-ivory transition-colors" />
            </div>
            <p className="font-fraunces text-xl text-ivory font-light mb-1">
              {purchases.length} {purchases.length === 1 ? 'Licensed Kit' : 'Licensed Kits'}
            </p>
            <p className="text-[11px] font-inter text-muted-light">
              Commercial multi-brand deployment rights
            </p>
          </div>

          {/* Metric 3 */}
          <div className="card-surface p-5 relative overflow-hidden group hover:border-border-strong transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted">Strategic Lead</span>
              <Zap className="w-4 h-4 text-muted group-hover:text-ivory transition-colors" />
            </div>
            <p className="font-fraunces text-xl text-ivory font-light mb-1">
              Sakib Ziad
            </p>
            <p className="text-[11px] font-inter text-muted-light">
              Founder & AI Creative Strategist
            </p>
          </div>
        </motion.div>

        {/* ── Executive Tabs Navigation ────────────────────────────────────────── */}
        <div className="flex items-center gap-1 sm:gap-2 border-b border-border mb-8 overflow-x-auto pb-px scrollbar-none">
          {[
            { id: 'overview', label: 'Command Overview', icon: Activity },
            { id: 'vault', label: 'Asset Vault', icon: Layers, badge: purchases.length > 0 ? purchases.length : undefined },
            { id: 'membership', label: 'Syndicate Advisory', icon: ShieldCheck, badge: isMemberActive ? 'Active' : undefined },
            { id: 'security', label: 'Security & Profile', icon: KeyRound },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`relative px-4 py-3 rounded-lg text-xs font-inter tracking-wider uppercase transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'text-ivory font-medium'
                    : 'text-muted hover:text-ivory hover:bg-surface-elevated'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-ivory' : 'text-muted'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono ${
                      isActive
                        ? 'bg-foreground text-background'
                        : 'bg-surface-elevated text-muted'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* ── Tab Content Views ──────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Private Strategy Dispatch */}
              <div className="card-surface p-6 sm:p-8 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5 mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                      Confidential Advisory Dispatch · Q4 Architecture
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-muted">Calibrated for Beauty & Skincare</span>
                </div>

                <div className="space-y-3 max-w-3xl">
                  <h2 className="font-fraunces text-xl sm:text-2xl text-ivory font-light">
                    AI Creative Direction: Moving Beyond Generic Diffusion
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-light font-inter leading-relaxed">
                    Most beauty brands fail in AI production because they use one-shot prompts without directional staging or lighting taxonomies. We have updated our proprietary brief architecture with multi-stage diffusion workflows specifically calibrated for realistic skin micro-textures, moisture sheen, and cosmetic pigment precision.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-border flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-elevated border border-border flex items-center justify-center font-fraunces text-xs text-ivory">
                      SZ
                    </div>
                    <div>
                      <p className="text-xs font-medium text-ivory">Sakib Ziad</p>
                      <p className="text-[10px] font-mono text-muted">Lead Creative Strategist · Witlyn</p>
                    </div>
                  </div>

                  <Button asChild variant="outline" size="sm" className="text-xs uppercase tracking-wider">
                    <Link href="/consulting">
                      <span>Schedule Strategic Review</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Quick Jump Modules (2 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Module 1: Production Engine */}
                <div className="card-surface p-6 hover:border-border-strong transition-all space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-border flex items-center justify-center text-ivory">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted">Creative Production</span>
                  </div>
                  <div>
                    <h3 className="font-fraunces text-lg text-ivory mb-1">Witlyn AI Creative Studio</h3>
                    <p className="text-xs text-muted-light leading-relaxed">
                      Need turnkey, done-for-you commercial production, bespoke video generation, or retainer-based campaign execution?
                    </p>
                  </div>
                  <a
                    href="https://witlyn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ivory hover:text-muted transition-colors pt-2"
                  >
                    <span>Visit Witlyn Studio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Module 2: Blueprints & Frameworks */}
                <div className="card-surface p-6 hover:border-border-strong transition-all space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-border flex items-center justify-center text-ivory">
                      <Layers className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted">Self-Serve Kits</span>
                  </div>
                  <div>
                    <h3 className="font-fraunces text-lg text-ivory mb-1">Explore Available Frameworks</h3>
                    <p className="text-xs text-muted-light leading-relaxed">
                      Browse production-proven creative briefing architectures, autonomous brand agent stacks, and multi-model campaign playbooks.
                    </p>
                  </div>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ivory hover:text-muted transition-colors pt-2"
                  >
                    <span>Browse Campaign Vault</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: ASSET VAULT */}
          {activeTab === 'vault' && (
            <motion.div
              key="vault"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {purchases.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                      Active Digital Entitlements ({purchases.length})
                    </span>
                    <span className="text-[11px] font-mono text-muted">All downloads verified & active</span>
                  </div>

                  {purchases.map((purchase) => {
                    const catalogItem = PRODUCTS_CATALOG[purchase.product_id]
                    return (
                      <div
                        key={purchase.id}
                        className="card-surface p-6 hover:border-border-strong transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest bg-surface-elevated text-ivory border border-border">
                              LICENSED
                            </span>
                            <span className="text-[10px] font-mono text-muted uppercase">
                              Purchased on {new Date(purchase.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="font-fraunces text-xl text-ivory font-light">
                            {purchase.product_name}
                          </h3>
                          <p className="text-xs text-muted-light max-w-2xl">
                            {catalogItem?.description || 'Commercial production rights, editable templates, and prompt workflows included.'}
                          </p>
                        </div>

                        <div className="shrink-0">
                          <Button asChild variant="default" size="sm">
                            <a
                              href={purchase.download_ref || catalogItem?.downloadRef || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                            >
                              <Download className="w-4 h-4" />
                              <span>Download Assets</span>
                            </a>
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Curated Preview of Frameworks */}
                  <div className="card-surface p-8 text-center space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center mx-auto text-ivory">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-fraunces text-xl text-ivory font-light mb-1">
                        No Assets Licensed to This Account Yet
                      </h3>
                      <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
                        When you acquire our AI creative brief systems, agent kits, or playbooks, your permanent downloadable assets and license keys will appear here.
                      </p>
                    </div>
                    <Button asChild variant="outline" size="sm" className="text-xs uppercase tracking-wider">
                      <Link href="/work">
                        <span>Browse Available Frameworks</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </Link>
                    </Button>
                  </div>

                  {/* Featured Catalog Items Showcase */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted block mb-4 px-1">
                      Available Production Frameworks
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.values(PRODUCTS_CATALOG)
                        .filter((p) => p.type === 'one_time')
                        .map((prod) => (
                          <div
                            key={prod.id}
                            className="card-surface p-5 flex flex-col justify-between space-y-4 hover:border-border-strong transition-all"
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                 <span className="text-[10px] font-mono uppercase tracking-wider text-muted">Commercial Framework</span>
                                 <span className="font-mono text-xs text-ivory">{prod.priceFormatted}</span>
                              </div>
                              <h4 className="font-fraunces text-base text-ivory">{prod.name}</h4>
                              <p className="text-xs text-muted-light leading-relaxed">{prod.description}</p>
                            </div>

                            <Button asChild variant="outline" size="sm" className="w-full text-xs uppercase tracking-wider">
                              <Link href="/work">
                                <span>View Specifications</span>
                                <ArrowRight className="w-3.5 h-3.5 ml-2" />
                              </Link>
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: MEMBERSHIP */}
          {activeTab === 'membership' && (
            <motion.div
              key="membership"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="card-surface p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-ivory" />
                    <div>
                      <h2 className="font-fraunces text-xl text-ivory font-light">The Advisory Syndicate</h2>
                      <p className="text-xs text-muted font-mono">Private Executive Retainer & AI Advisory</p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest ${
                      isMemberActive
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30'
                        : 'bg-surface-elevated text-muted border border-border'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isMemberActive ? 'bg-emerald-500' : 'bg-muted'}`} />
                    Status: {isMemberActive ? 'Active Seat' : 'Inactive'}
                  </span>
                </div>

                {isMemberActive ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-surface-elevated border border-border">
                        <span className="text-[10px] font-mono text-muted uppercase tracking-widest block mb-1">
                          Retainer Cadence
                        </span>
                        <p className="font-fraunces text-base text-ivory">Monthly Advisory & Model Calibrations</p>
                        <p className="text-xs text-muted-light mt-1">Direct monthly roadmapping and custom prompt testing.</p>
                      </div>

                      <div className="p-4 rounded-xl bg-surface-elevated border border-border">
                        <span className="text-[10px] font-mono text-muted uppercase tracking-widest block mb-1">
                          Billing Cycle
                        </span>
                        <p className="font-mono text-sm text-ivory mt-1">
                          {membership?.current_period_end
                            ? new Date(membership.current_period_end).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : 'Renews Monthly'}
                        </p>
                        <p className="text-[11px] text-muted mt-1">Managed automatically via Stripe.</p>
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
                            Connecting to Stripe...
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
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-light hover:text-ivory transition-colors"
                      >
                        <span>Access Private Vault</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-xs sm:text-sm text-muted-light leading-relaxed max-w-2xl font-inter">
                      The Advisory Syndicate is an ongoing strategic partnership for beauty and cosmetics founders. Members receive monthly 1:1 strategy reviews, bespoke prompt architecture calibrations, and private Slack access to Sakib Ziad.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {[
                        'Monthly 1:1 Strategy & Roadmap Sessions',
                        'Turnkey Diffusion & Agent Blueprints',
                        'Direct Async Line to Sakib Ziad',
                        'Limited to 12 Active Brand Seats Annually',
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-muted-light">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-border flex items-center gap-4">
                      <Button asChild variant="default" size="sm">
                        <Link href="/membership" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider">
                          <span>Explore Syndicate & Apply</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 4: SECURITY & PROFILE */}
          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              {/* Profile Details (7 Cols) */}
              <div className="md:col-span-7 space-y-6">
                <div className="card-surface p-6 sm:p-8 space-y-5">
                  <div className="flex items-center gap-2.5 border-b border-border pb-4">
                    <User className="w-4 h-4 text-ivory" />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-ivory">Client Identity</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-muted uppercase tracking-widest block mb-1">
                        Full Name
                      </span>
                      <p className="font-fraunces text-lg text-ivory font-light">{displayName}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-muted uppercase tracking-widest block mb-1">
                        Primary Email
                      </span>
                      <p className="font-mono text-xs text-muted-light">{user?.email}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-muted uppercase tracking-widest block mb-1">
                        Authentication Method
                      </span>
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-surface-elevated border border-border text-xs font-mono text-muted-light">
                        <Lock className="w-3 h-3 text-emerald-500" />
                        <span>{authProvider}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-muted uppercase tracking-widest block mb-1">
                        Client ID (Encrypted)
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-muted-light truncate max-w-xs bg-surface-elevated px-2 py-1 rounded border border-border">
                          {user?.id}
                        </span>
                        <button
                          onClick={handleCopyClientId}
                          className="p-1 rounded hover:bg-surface-elevated text-muted hover:text-ivory transition-colors"
                          title="Copy Client ID"
                        >
                          {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Concierge Desk */}
                <div className="card-surface p-6 space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted block">
                    Direct Concierge Line
                  </span>
                  <p className="text-xs text-muted-light leading-relaxed">
                    Have questions about commercial multi-brand licensing, custom corporate billing, or scheduling your strategic review?
                  </p>
                  <a
                    href="mailto:witlyn@sakibziad.my"
                    className="inline-block text-ivory font-mono text-xs underline underline-offset-4 hover:text-muted transition-colors"
                  >
                    witlyn@sakibziad.my
                  </a>
                </div>
              </div>

              {/* Password Settings (5 Cols) */}
              <div className="md:col-span-5 space-y-6">
                <div className="card-surface p-6 sm:p-8 space-y-5">
                  <div className="flex items-center gap-2.5 border-b border-border pb-4">
                    <KeyRound className="w-4 h-4 text-ivory" />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-ivory">Password Credentials</span>
                  </div>

                  {passwordSuccess && (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2 text-xs text-emerald-600 dark:text-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Credentials updated successfully.</span>
                    </div>
                  )}

                  {passwordError && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2 text-xs text-red-500 dark:text-red-200">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{passwordError}</span>
                    </div>
                  )}

                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-muted mb-1.5">
                        New Master Password
                      </label>
                      <Input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min. 6 characters"
                        className="text-xs h-10"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      disabled={updatingPassword}
                      className="w-full text-xs uppercase tracking-wider h-10"
                    >
                      {updatingPassword ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />
                          Encrypting...
                        </>
                      ) : (
                        <span>Update Password</span>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  )
}
