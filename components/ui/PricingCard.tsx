'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface PricingFeature {
  text: string
  secondary?: boolean
}

interface PricingCardProps {
  tier: string
  price: string
  period?: string
  description: string
  features: PricingFeature[]
  cta: string
  featured?: boolean
  badge?: string
}

export default function PricingCard({
  tier,
  price,
  period = '/month',
  description,
  features,
  cta,
  featured = false,
  badge,
}: PricingCardProps) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      whileHover={
        prefersReduced
          ? {}
          : {
              y: featured ? -12 : -4,
              boxShadow: featured
                ? '0 0 0 2px #4FC3D9, 0 20px 48px rgba(79,195,217,0.2)'
                : '0 8px 32px rgba(0,0,0,0.08)',
            }
      }
      transition={{ duration: 0.2 }}
      className={[
        'relative rounded-2xl p-7 flex flex-col gap-6 border transition-colors',
        featured
          ? 'border-accent bg-[rgba(79,195,217,0.05)] md:-translate-y-2'
          : 'border-border bg-card',
      ].join(' ')}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-white text-[10px] font-medium tracking-wide shadow-md">
            {badge}
          </span>
        </div>
      )}

      {/* Tier & price */}
      <div>
        <p className="text-xs font-mono text-muted uppercase tracking-widest mb-3">{tier}</p>
        <div className="flex items-baseline gap-1">
          <span className="metric-num text-4xl text-foreground">{price}</span>
          <span className="text-sm text-caption font-light">{period}</span>
        </div>
        <p className="text-sm text-muted font-light mt-2">{description}</p>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-2.5 flex-1">
        {features.map((f) => (
          <li key={f.text} className="flex items-start gap-2.5 text-sm">
            <span
              className={`mt-0.5 flex-shrink-0 font-medium ${
                f.secondary ? 'text-secondary' : 'text-accent'
              }`}
            >
              ✓
            </span>
            <span className={f.secondary ? 'text-muted font-light' : 'text-foreground font-light'}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <motion.a
        href="#"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={[
          'block text-center px-5 py-3 rounded-xl text-sm font-medium transition-all',
          featured
            ? 'bg-accent text-white hover:shadow-lg hover:shadow-[rgba(79,195,217,0.35)]'
            : 'border border-border-strong text-foreground hover:border-accent hover:text-accent bg-card',
        ].join(' ')}
      >
        {cta}
      </motion.a>
    </motion.div>
  )
}
