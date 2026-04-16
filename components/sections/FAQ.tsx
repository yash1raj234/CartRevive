'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const FAQS = [
  {
    q: 'Does CartRevive work with Shopify?',
    a: "Yes — paste the script tag into your Shopify theme's <head> and you're live in under 2 minutes. We also support WooCommerce, Webflow, custom React/Next.js stores, and any platform that runs JavaScript.",
  },
  {
    q: 'What happens after a customer completes a purchase?',
    a: "CartRevive detects the purchase event in real time and immediately halts the recovery sequence. No awkward emails asking someone to buy something they already bought. Zero false positives.",
  },
  {
    q: 'How is the email copy generated?',
    a: "Our model is trained on 2M+ e-commerce recovery emails and fine-tuned on your store's product catalog, tone, and past email performance. Every email is unique to the customer, their cart, and the time since abandonment.",
  },
  {
    q: 'Is my customer data safe?',
    a: "We are SOC 2 Type II compliant. Customer data is encrypted at rest and in transit. We never sell or share data. You can export or delete all customer data at any time from your dashboard.",
  },
  {
    q: 'What is the typical setup time?',
    a: 'Under 5 minutes for most stores. One script tag, one API key. Our onboarding wizard walks you through customizing your first email sequence. Most stores send their first recovery email within the hour.',
  },
  {
    q: 'Can I customize the discount codes?',
    a: 'Yes. On Growth and Agency plans you can configure dynamic discount percentages, static code rules, or connect CartRevive to your Shopify/WooCommerce discount engine to auto-generate unique codes per customer.',
  },
]

function AccordionItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string
  a: string
  open: boolean
  onToggle: () => void
}) {
  const prefersReduced = useReducedMotion()

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left group"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="text-sm md:text-base font-light text-foreground group-hover:text-accent transition-colors duration-200 pr-4">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.25, ease: 'easeInOut' }}
          className="flex-shrink-0 w-5 h-5 rounded-full border border-border flex items-center justify-center text-muted"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 3.5 5 6.5 8 3.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={prefersReduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={prefersReduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="text-sm text-muted font-light pb-5 pr-8 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section id="faq" className="bg-surface py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-4">FAQ</p>
          <h2 className="headline text-4xl md:text-5xl text-foreground">
            Questions answered.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card rounded-2xl border border-border px-6 md:px-8"
        >
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              open={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-caption font-light mt-8"
        >
          Still have questions?{' '}
          <a href="mailto:hello@cartrevive.ai" className="text-accent hover:underline">
            hello@cartrevive.ai
          </a>
        </motion.p>
      </div>
    </section>
  )
}
