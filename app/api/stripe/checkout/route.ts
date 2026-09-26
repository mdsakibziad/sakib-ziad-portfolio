import { NextRequest, NextResponse } from 'next/server'
import { getStripe, PRODUCTS_CATALOG } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId, cancelPath } = body

    if (!productId || !PRODUCTS_CATALOG[productId]) {
      return NextResponse.json({ error: 'Invalid product selected' }, { status: 400 })
    }

    const product = PRODUCTS_CATALOG[productId]
    const stripe = getStripe()

    // Determine current origin
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    // Get current Supabase user if logged in
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const sessionParams: any = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
            ...(product.type === 'subscription'
              ? { recurring: { interval: 'month' as const } }
              : {}),
          },
          quantity: 1,
        },
      ],
      mode: product.type === 'subscription' ? 'subscription' : 'payment',
      success_url: `${origin}/account?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${origin}${cancelPath || (product.type === 'subscription' ? '/membership' : '/digital-products')}`,
      metadata: {
        productId: product.id,
        productName: product.name,
        type: product.type,
        userId: user?.id || '',
      },
    }

    if (user?.email) {
      sessionParams.customer_email = user.email
    }
    if (user?.id) {
      sessionParams.client_reference_id = user.id
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to initialize checkout session' },
      { status: 500 }
    )
  }
}
