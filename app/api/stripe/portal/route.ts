import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const admin = createAdminClient()
    const { data: membership } = await admin
      .from('memberships')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single()

    if (!membership?.stripe_customer_id) {
      return NextResponse.json(
        { error: 'No active Stripe billing profile found for this account' },
        { status: 404 }
      )
    }

    const stripe = getStripe()
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: membership.stripe_customer_id,
      return_url: `${origin}/account`,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error: any) {
    console.error('Stripe Customer Portal Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to open billing portal' },
      { status: 500 }
    )
  }
}
