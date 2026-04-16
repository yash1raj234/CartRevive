'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CodeBlock from '@/components/ui/CodeBlock'
import EmailPreview from '@/components/ui/EmailPreview'
import StepCard from '@/components/ui/StepCard'

gsap.registerPlugin(ScrollTrigger)

const SCRIPT_TAG = `<script
  src="https://cdn.cartrevive.ai/v1/cartrevive.js"
  data-store="YOUR_STORE_ID"
  async
></script>`

/* Step 2 — live event feed */
const EVENTS = [
  { label: 'add_to_cart',       color: 'text-accent',    dot: 'bg-accent',    ts: '0.24s' },
  { label: 'email_captured',    color: 'text-secondary', dot: 'bg-secondary', ts: '1.07s' },
  { label: 'checkout_started',  color: 'text-amber-500', dot: 'bg-amber-400', ts: '1.83s' },
  { label: 'add_to_cart',       color: 'text-accent',    dot: 'bg-accent',    ts: '2.41s' },
  { label: 'tab_closed',        color: 'text-red-400',   dot: 'bg-red-400',   ts: '3.19s' },
]

function EventFeed() {
  const feedRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const feed = feedRef.current
    if (!feed || prefersReduced) return

    const items = feed.querySelectorAll<HTMLDivElement>('.event-item')
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 })
      items.forEach((item, i) => {
        gsap.set(item, { x: 40, opacity: 0 })
        tl.to(item, { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }, i * 0.3)
      })
      tl.to(items, { opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.in' }, `+=${0.6}`)
    }, feed)

    return () => ctx.revert()
  }, [prefersReduced])

  return (
    <div className="bg-card rounded-2xl border border-border p-5 max-w-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-xs font-mono text-muted">live event stream</span>
      </div>
      <div ref={feedRef} className="flex flex-col gap-2">
        {EVENTS.map((e, i) => (
          <div key={i} className="event-item flex items-center gap-3 py-2 px-3 rounded-lg bg-surface border border-border">
            <span className={`w-1.5 h-1.5 rounded-full ${e.dot} flex-shrink-0`} />
            <code className={`text-xs ${e.color} flex-1`}>{e.label}</code>
            <span className="text-[10px] font-mono text-caption tabular-nums">
              {e.ts}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Step 4 — Revenue counter with sparkline */
function RevenueCounter() {
  const numRef = useRef<HTMLSpanElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced || !numRef.current || !cardRef.current) return
    const obj = { val: 0 }
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: 18400,
        duration: 2,
        ease: 'power2.out',
        snap: { val: 1 },
        onUpdate() {
          if (numRef.current) numRef.current.textContent = `₹${obj.val.toLocaleString('en-IN')}`
        },
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reset',
        },
      })
    }, cardRef)
    return () => ctx.revert()
  }, [prefersReduced])

  // Sparkline data points (upward trend)
  const points = [12, 19, 14, 28, 24, 38, 32, 55, 48, 72]
  const max = Math.max(...points)
  const W = 120, H = 40
  const pts = points
    .map((v, i) => `${(i / (points.length - 1)) * W},${H - (v / max) * H}`)
    .join(' ')

  return (
    <div ref={cardRef} className="bg-card rounded-2xl border border-border p-6 max-w-xs">
      <p className="text-xs font-mono text-caption mb-2">recovered this month</p>
      <span
        ref={numRef}
        className="metric-num text-4xl text-foreground block mb-4"
      >
        ₹0
      </span>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-10" fill="none">
        <polyline
          points={pts}
          stroke="#4FC3D9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="text-[10px] font-mono text-accent mt-2">↑ 22% vs last month</p>
    </div>
  )
}

/* HowItWorks ────────────────────────────────────────────────────────────── */
export default function HowItWorks() {
  const outerRef  = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [emailPlay, setEmailPlay] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Trigger email typewriter when step 3 is ~in view (horizontal scroll progress ~60%)
  useEffect(() => {
    if (isMobile || prefersReduced || !outerRef.current) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: outerRef.current,
        start: 'top top',
        end: () => `+=${window.innerWidth * 3}`,
        onUpdate(self) {
          if (self.progress >= 0.58 && !emailPlay) setEmailPlay(true)
          if (self.progress < 0.55) setEmailPlay(false)
        },
      })
    })
    return () => ctx.revert()
  }, [isMobile, prefersReduced, emailPlay])

  // Horizontal scroll GSAP (desktop only)
  useEffect(() => {
    if (isMobile || prefersReduced || !outerRef.current || !sliderRef.current) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        gsap.to(sliderRef.current, {
          x: () => -(sliderRef.current!.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: outerRef.current,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            start: 'top top',
            end: () => `+=${sliderRef.current!.scrollWidth - window.innerWidth}`,
          },
        })
      })
    })
    return () => ctx.revert()
  }, [isMobile, prefersReduced])

  const steps = [
    {
      number: '01',
      title: 'Paste one script tag',
      description:
        'Drop a single line into your HTML. Works with Shopify, WooCommerce, Webflow, or any custom stack. No plugin installs, no SDK.',
      content: <CodeBlock code={SCRIPT_TAG} />,
    },
    {
      number: '02',
      title: 'We track every cart event',
      description:
        'CartRevive silently captures add_to_cart, email_captured, and checkout_started events — in real time, across all sessions.',
      content: <EventFeed />,
    },
    {
      number: '03',
      title: 'AI writes personalized emails',
      description:
        'Our model generates unique, on-brand copy for each abandoned cart — with the right product, the right tone, and the right discount.',
      content: <EmailPreview play={emailPlay} />,
    },
    {
      number: '04',
      title: 'Revenue recovered automatically',
      description:
        'CartRevive sends the sequence, tracks clicks, and stops emailing the moment a purchase is made. You just watch the number go up.',
      content: <RevenueCounter />,
    },
  ]

  return (
    <section id="how-it-works" className="bg-surface">
      {/* Section label — always visible above scroll area */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-8">
        <p className="text-xs font-mono text-accent tracking-widest uppercase mb-4">How it works</p>
        <h2 className="headline text-4xl md:text-5xl text-foreground max-w-xl">
          From abandoned cart to recovered revenue in four steps.
        </h2>
      </div>

      {/* ── Desktop: pinned horizontal scroll ─────────────────────────────── */}
      {!isMobile ? (
        <div
          ref={outerRef}
          className="hidden md:block"
        >
          {/* GSAP handles pinning this viewport */}
          <div className="h-screen overflow-hidden relative">
            {/* Horizontal slider */}
            <div
              ref={sliderRef}
              className="flex h-full w-max"
            >
              {steps.map((step) => (
                <StepCard key={step.number} {...step}>
                  {step.content}
                </StepCard>
              ))}
            </div>

            {/* Progress dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {steps.map((s) => (
                <span key={s.number} className="w-1.5 h-1.5 rounded-full bg-border-strong" />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* ── Mobile: vertical stack ─────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col gap-0 pb-16">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`px-6 py-12 border-b border-border ${i % 2 === 0 ? 'bg-surface' : 'bg-card'}`}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-mono text-muted mb-5">
              STEP {step.number}
            </span>
            <h3 className="headline-md text-2xl text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted font-light mb-6">{step.description}</p>
            {step.content}
          </div>
        ))}
      </div>
    </section>
  )
}
