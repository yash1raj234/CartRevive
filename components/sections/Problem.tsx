'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Fake Cart Widget ────────────────────────────────────────────────────────── */
const cartItems = [
  { name: 'Wireless Headphones', variant: 'Midnight Black', price: '₹3,499', qty: 1 },
  { name: 'Leather Phone Case', variant: 'Tan / iPhone 15', price: '₹899', qty: 2 },
  { name: 'USB-C Hub 7-in-1', variant: 'Space Grey', price: '₹2,199', qty: 1 },
]

function CartWidget({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-card rounded-2xl border border-border shadow-md overflow-hidden ${className}`}>
      {/* Cart header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1 1h2l2.4 7.4a1 1 0 0 0 .94.66h6.34a1 1 0 0 0 .94-.68l1.68-5.02H4" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="13.5" r="1" fill="#9CA3AF"/>
            <circle cx="12" cy="13.5" r="1" fill="#9CA3AF"/>
          </svg>
          <span className="text-sm font-medium text-foreground">Your cart (4 items)</span>
        </div>
        {/* Abandoned badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-[10px] font-mono text-red-500 tracking-wide">User left 43 min ago</span>
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-border">
        {cartItems.map((item) => (
          <div key={item.name} className="px-5 py-3.5 flex items-center gap-4">
            {/* Image placeholder */}
            <div className="w-10 h-10 rounded-lg bg-surface border border-border flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-light text-foreground truncate">{item.name}</p>
              <p className="text-[11px] text-caption">{item.variant}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono font-light text-foreground">{item.price}</p>
              <p className="text-[11px] text-caption">×{item.qty}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="px-5 py-4 bg-surface border-t border-border flex justify-between items-center">
        <span className="text-sm text-muted font-light">Total</span>
        <span className="font-mono font-light text-lg text-foreground">₹9,496</span>
      </div>
    </div>
  )
}

/* Dead Timeline ──────────────────────────────────────────────────────────── */
const timelineSteps = [
  { time: '0 min', label: 'Cart abandoned' },
  { time: '5 min', label: '' },
  { time: '30 min', label: '' },
  { time: '1 hr', label: '' },
  { time: '24 hr', label: '' },
]

function DeadTimeline() {
  return (
    <div className="relative flex flex-col gap-0 pl-6">
      {/* Vertical line */}
      <div className="absolute left-2.5 top-3 bottom-3 w-px bg-border" />

      {timelineSteps.map((step, i) => (
        <div key={i} className="relative flex items-start gap-4 py-5">
          {/* Dot */}
          <span
            className={`absolute left-0 mt-1 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
              i === 0
                ? 'border-red-300 bg-red-50'
                : 'border-border bg-card'
            }`}
          >
            {i === 0 && (
              <span className="w-2 h-2 rounded-full bg-red-300" />
            )}
          </span>

          <div className="flex-1">
            <span className="text-[11px] font-mono text-caption">{step.time}</span>
            {i === 0 ? (
              <p className="text-sm font-light text-foreground mt-0.5">{step.label}</p>
            ) : (
              <p className="text-sm font-light text-caption mt-0.5 italic">
                No follow-up sent.
              </p>
            )}
          </div>

          {/* Flat line indicator */}
          {i > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <div className="w-8 h-px bg-border-strong" />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="#D1D5DB" strokeWidth="1"/>
              </svg>
            </div>
          )}
        </div>
      ))}

      {/* Revenue lost indicator */}
      <div className="mt-2 px-4 py-3 rounded-xl border border-red-100 bg-red-50 flex items-center gap-3">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 2v6l3 3" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="9" cy="9" r="7.5" stroke="#F87171" strokeWidth="1.2"/>
        </svg>
        <div>
          <p className="text-xs font-mono text-red-400 font-light">₹9,496 never recovered.</p>
          <p className="text-[10px] text-red-300 font-light">This happens 70% of the time.</p>
        </div>
      </div>
    </div>
  )
}

/* Problem Section ───────────────────────────────────────────────────────── */
export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cartRef    = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const svgPathRef = useRef<SVGPathElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return
    const section = sectionRef.current
    const cart = cartRef.current
    const timeline = timelineRef.current
    if (!section || !cart || !timeline) return

    const ctx = gsap.context(() => {
      // Animate cart sliding in from left on scroll
      gsap.from(cart, {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      // Animate timeline sliding in from right
      gsap.from(timeline, {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      // SVG line draw
      if (svgPathRef.current) {
        const length = svgPathRef.current.getTotalLength()
        gsap.set(svgPathRef.current, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(svgPathRef.current, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [prefersReduced])

  return (
    <section id="problem" ref={sectionRef} className="bg-card py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 w-full"
        >
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-4">The Problem</p>
          <h2 className="headline text-4xl sm:text-5xl lg:text-[56px] text-foreground max-w-3xl mx-auto leading-tight">
            70% of carts are abandoned.<br className="hidden sm:block" />
            <span className="text-muted"> Most stores never follow up.</span>
          </h2>
        </motion.div>

        {/* Two-column visual */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
          <div ref={cartRef}>
            <p className="text-xs font-mono text-caption uppercase tracking-widest mb-4">
              What your cart looks like right now
            </p>
            <CartWidget />
          </div>

          <div ref={timelineRef}>
            <p className="text-xs font-mono text-caption uppercase tracking-widest mb-4">
              What happens without CartRevive
            </p>

            {/* Flat-line "signal" SVG */}
            <div className="mb-4 px-1">
              <svg
                viewBox="0 0 320 40"
                className="w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  ref={svgPathRef}
                  d="M0 20 H40 L50 8 L60 32 L70 8 L80 32 L90 20 H120 H320"
                  stroke="#E6E8EC"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-[10px] font-mono text-caption text-center mt-1">
                activity signal → flat line
              </p>
            </div>

            <DeadTimeline />
          </div>
        </div>
      </div>
    </section>
  )
}
