import { NextRequest, NextResponse } from 'next/server'
import { getStripe, PRODUCTS_CATALOG } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  const signature = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

  if (!signature || !webhookSecret) {
    console.error('Stripe webhook error: Missing signature or webhook secret')
    return NextResponse.json({ error: 'Missing webhook signature or secret' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const rawBody = await req.text()
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  const admin = createAdminClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const metadata = session.metadata || {}
        let userId = metadata.userId || session.client_reference_id

        // If user ID wasn't set, attempt to find user by email
        if (!userId && session.customer_email) {
          const { data: users } = await admin.auth.admin.listUsers()
          const matchedUser = users?.users?.find(
            (u) => u.email?.toLowerCase() === session.customer_email?.toLowerCase()
          )
          if (matchedUser) {
            userId = matchedUser.id
          }
        }

        if (!userId) {
          console.warn(`Checkout session completed for ${session.customer_email} without matching userId`)
          break
        }

        const productId = metadata.productId || 'membership'
        const productType = metadata.type || (session.mode === 'subscription' ? 'subscription' : 'one_time')
        const catalogItem = PRODUCTS_CATALOG[productId]

        if (productType === 'subscription' || session.mode === 'subscription') {
          // Advisory Syndicate Membership
          let currentPeriodEnd = new Date()
          if (session.subscription) {
            const subscription: any = await stripe.subscriptions.retrieve(session.subscription as string)
            if (subscription?.current_period_end) {
              currentPeriodEnd = new Date(subscription.current_period_end * 1000)
            }
          } else {
            currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1)
          }

          await admin.from('memberships').upsert(
            {
              user_id: userId,
              status: 'active',
              stripe_customer_id: (session.customer as string) || null,
              stripe_subscription_id: (session.subscription as string) || null,
              current_period_end: currentPeriodEnd.toISOString(),
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id' }
          )
          console.log(`Active membership provisioned for user ${userId}`)
        } else {
          // Digital Product One-Time Purchase
          await admin.from('purchases').insert({
            user_id: userId,
            product_id: productId,
            product_name: catalogItem?.name || metadata.productName || 'Digital Blueprint',
            amount_paid: session.amount_total || catalogItem?.price || 0,
            currency: session.currency || 'usd',
            stripe_session_id: session.id,
            download_ref: catalogItem?.downloadRef || 'https://witlyn.com/access',
          })
          console.log(`Digital product ${productId} provisioned for user ${userId}`)
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription: any = event.data.object
        const currentPeriodEnd = subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000).toISOString()
          : new Date().toISOString()
        const status = subscription.status === 'active' ? 'active' : subscription.status

        await admin
          .from('memberships')
          .update({
            status,
            current_period_end: currentPeriodEnd,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        console.log(`Subscription ${subscription.id} updated to status: ${status}`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription: any = event.data.object

        await admin
          .from('memberships')
          .update({
            status: 'canceled',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        console.log(`Subscription ${subscription.id} canceled`)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice: any = event.data.object
        if (invoice.subscription) {
          const subscription: any = await stripe.subscriptions.retrieve(invoice.subscription as string)
          await admin
            .from('memberships')
            .update({
              status: 'active',
              current_period_end: new Date((subscription?.current_period_end || Date.now() / 1000) * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', subscription.id)
        }
        break
      }

      default:
        // Ignore unhandled event types
        break
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error('Error handling webhook event:', err)
    return NextResponse.json({ error: 'Internal handler failure' }, { status: 500 })
  }
}
