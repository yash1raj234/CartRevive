'use client'

import { motion } from 'framer-motion'
import PricingCard from '@/components/ui/PricingCard'

const tiers = [
  {
    tier: 'Starter',
    price: '₹2,499',
    description: 'Perfect for new stores testing recovery.',
    badge: undefined,
    featured: false,
    cta: 'Start free trial',
    features: [
      { text: '500 abandoned carts / month' },
      { text: '3-step email sequence' },
      { text: 'AI-generated email copy' },
      { text: 'Real-time dashboard' },
      { text: 'Email support', secondary: true },
    ],
  },
  {
    tier: 'Growth',
    price: '₹5,999',
    description: 'For growing stores that want more control.',
    badge: 'Most popular',
    featured: true,
    cta: 'Get Growth',
    features: [
      { text: '3,000 abandoned carts / month' },
      { text: '5-step sequence with smart gaps' },
      { text: 'SMS recovery (add-on)' },
      { text: 'A/B testing for subject lines' },
      { text: 'Custom discount codes' },
      { text: 'Priority support', secondary: true },
    ],
  },
  {
    tier: 'Agency',
    price: '₹14,999',
    description: 'Unlimited scale, multiple brands, white-label.',
    badge: undefined,
    featured: false,
    cta: 'Talk to sales',
    features: [
      { text: 'Unlimited carts' },
      { text: 'Multi-store management' },
      { text: 'White-label branding' },
      { text: 'Custom AI model fine-tuning' },
      { text: 'Dedicated account manager', secondary: true },
      { text: 'SLA guarantee', secondary: true },
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-card py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-4">Pricing</p>
          <h2 className="headline text-4xl md:text-5xl text-foreground max-w-lg mx-auto">
            Simple pricing. Serious results.
          </h2>
          <p className="text-muted font-light mt-4 text-base max-w-sm mx-auto">
            All plans include a 14-day free trial. No card required.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start mt-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <PricingCard {...tier} />
            </motion.div>
          ))}
        </div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-xs text-caption font-light mt-10"
        >
          All prices in INR. Billed monthly. Annual billing saves 20%.
          <br />
          Email sequences automatically stop the moment a purchase is made.
        </motion.p>
      </div>
    </section>
  )
}
