'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function FooterCTA() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-card border-t border-border py-24 md:py-32 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 text-center relative">
        {/* Glow behind CTA */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            style={{
              width: '500px',
              height: '300px',
              background:
                'radial-gradient(ellipse at center, rgba(79,195,217,0.10) 0%, rgba(197,163,224,0.08) 50%, transparent 70%)',
              filter: 'blur(32px)',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-6">
            Ready to start recovering?
          </p>

          <h2 className="headline text-4xl md:text-6xl text-foreground mb-5">
            Stop leaving money in abandoned carts.
          </h2>

          <p className="text-base md:text-lg text-muted font-light mb-10 max-w-md mx-auto">
            Setup takes 5 minutes. First 14 days free. No credit card needed.
          </p>

          <motion.a
            href="#pricing"
            whileHover={
              prefersReduced
                ? {}
                : {
                    scale: 1.04,
                    boxShadow: '0 12px 40px rgba(79,195,217,0.40)',
                  }
            }
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-accent text-white text-base font-medium transition-shadow"
          >
            Get your snippet free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8.5 4 13 8l-4.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>

          <div className="flex items-center justify-center gap-6 mt-8 text-xs text-caption font-light">
            <span className="flex items-center gap-1.5">
              <span className="text-accent">✓</span> 14-day free trial
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-accent">✓</span> No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-accent">✓</span> Cancel anytime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
