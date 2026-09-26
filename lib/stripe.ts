import Stripe from 'stripe'

// TODO: confirm product names/contents/prices with owner before live cart activation
export const PRODUCTS_CATALOG: Record<
  string,
  {
    id: string
    name: string
    price: number // in cents USD
    priceFormatted: string
    type: 'one_time' | 'subscription'
    description: string
    downloadRef: string
  }
> = {
  'brief-system': {
    id: 'brief-system',
    name: 'The Beauty Brand AI Creative Brief & Prompt Blueprint',
    price: 24900, // $249.00
    priceFormatted: '$249',
    type: 'one_time',
    description: '40+ tested prompt blueprints, art direction taxonomies, and Notion briefing workflows.',
    downloadRef: 'https://witlyn.com/access/brief-blueprint-v1.zip',
  },
  'agent-kit': {
    id: 'agent-kit',
    name: 'Autonomous AI Content Engine & Agent Blueprint',
    price: 49500, // $495.00
    priceFormatted: '$495',
    type: 'one_time',
    description: 'Turnkey multi-model diffusion workflows, Make/n8n scenario architectures, and brand agent configurations.',
    downloadRef: 'https://witlyn.com/access/agent-engine-kit-v1.zip',
  },
  'membership': {
    // TODO: confirm membership pricing ($290/month) and billing cadence with owner before launch
    id: 'membership',
    name: 'The Advisory Syndicate Membership',
    price: 29000, // $290.00 / month
    priceFormatted: '$290/month',
    type: 'subscription',
    description: 'Ongoing strategic intelligence, monthly tool setups, private community access, and direct advisory.',
    downloadRef: 'https://witlyn.com/syndicate/portal',
  },
}

let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const apiKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_key'
    stripeInstance = new Stripe(apiKey, {
      apiVersion: '2026-08-26.dahlia' as any,
      appInfo: {
        name: 'Sakib Ziad Portfolio',
        version: '0.1.0',
      },
    })
  }
  return stripeInstance
}
