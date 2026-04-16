'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BrowserMockup from '@/components/ui/BrowserMockup'

gsap.registerPlugin(ScrollTrigger)

/* ── Product grid inside the browser ──────────────────────────────────────── */
function CartScene() {
  return (
    <div className="p-5" style={{ background: '#1e2334' }}>
      <p className="text-[10px] font-mono text-white/30 mb-3 tracking-wider">MY CART (3 items)</p>
      <div className="flex flex-col gap-2 mb-4">
        {['Wireless Headphones — ₹3,499', 'Leather Case — ₹899', 'USB-C Hub — ₹2,199'].map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg border border-white/10" style={{ background: '#161929' }}>
            <div className="w-8 h-8 rounded-md flex-shrink-0" style={{ background: i === 0 ? 'rgba(79,195,217,0.3)' : i === 1 ? 'rgba(197,163,224,0.3)' : 'rgba(251,191,36,0.3)' }} />
            <span className="text-[11px] text-white/60 font-light">{item}</span>
          </div>
        ))}
      </div>
      <div className="rounded-lg px-4 py-2.5 text-center text-[11px] font-medium text-white" style={{ background: '#4FC3D9' }}>
        Checkout  →
      </div>
    </div>
  )
}

/* ── Email notification that slides in ───────────────────────────────────── */
function EmailNotification({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="absolute top-3 right-3 z-20 w-52 rounded-xl border border-white/15 shadow-xl p-3"
      style={{ background: '#161929' }}
    >
      <div className="flex items-start gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(79,195,217,0.2)' }}>
          <span className="text-[9px] font-mono text-accent">CR</span>
        </div>
        <div>
          <p className="text-[10px] font-medium text-white/80">CartRevive</p>
          <p className="text-[10px] text-white/40 leading-snug mt-0.5">
            &ldquo;Priya, your cart misses you…&rdquo;
          </p>
          <p className="text-[9px] text-accent font-mono mt-1.5">Click to recover →</p>
        </div>
      </div>
    </motion.div>
  )
}

/* ── GSAP-driven sequence ─────────────────────────────────────────────────── */
type Phase = 'cart' | 'closing' | 'countdown' | 'email' | 'confirmed'

export default function LiveDemo() {
  const sectionRef    = useRef<HTMLDivElement>(null)
  const contentRef    = useRef<HTMLDivElement>(null)
  const countRef      = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const [phase, setPhase]   = useState<Phase>('cart')
  const [countdown, setCountdown] = useState(60)
  const [emailVisible, setEmailVisible] = useState(false)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Only animate while in viewport
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => runSequence(),
        onLeave: () => stopSequence(),
        onEnterBack: () => runSequence(),
        onLeaveBack: () => stopSequence(),
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      stopSequence()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReduced])

  const stopSequence = () => {
    if (tlRef.current) { tlRef.current.kill(); tlRef.current = null }
    setPhase('cart')
    setCountdown(60)
    setEmailVisible(false)
  }

  const runSequence = () => {
    if (tlRef.current) return // already running

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
      onRepeat() {
        setPhase('cart')
        setCountdown(60)
        setEmailVisible(false)
      },
    })
    tlRef.current = tl

    // Phase 1 — show cart (1.5s)
    tl.call(() => setPhase('cart'))
    tl.to({}, { duration: 2 })

    // Phase 2 — close tab (0.6s)
    tl.call(() => setPhase('closing'))
    tl.to({}, { duration: 0.8 })

    // Phase 3 — countdown 60→0 (1.2s)
    tl.call(() => {
      setPhase('countdown')
      const obj = { n: 60 }
      gsap.to(obj, {
        n: 0,
        duration: 1.2,
        ease: 'none',
        snap: { n: 1 },
        onUpdate() { setCountdown(Math.round(obj.n)) },
      })
    })
    tl.to({}, { duration: 1.4 })

    // Phase 4 — email arrives (2.5s)
    tl.call(() => { setPhase('email'); setEmailVisible(true) })
    tl.to({}, { duration: 2.5 })

    // Phase 5 — confirmed (1.5s)
    tl.call(() => { setEmailVisible(false); setPhase('confirmed') })
    tl.to({}, { duration: 1.8 })
  }

  return (
    <section
      id="demo"
      ref={sectionRef}
      style={{ background: '#1A1E2E' }}
      className="py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-4">Live Demo</p>
          <h2 className="headline text-4xl md:text-5xl text-white max-w-xl mx-auto">
            Watch it work in{' '}
            <span className="text-accent">60 seconds</span>
          </h2>
          <p className="text-muted text-base mt-4 font-light">
            From cart abandonment to email delivery — fully automated.
          </p>
        </motion.div>

        {/* Browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <BrowserMockup url={phase === 'confirmed' ? 'store.example.com/order-confirmed' : 'store.example.com/cart'}>
            <div ref={contentRef} className="relative" style={{ minHeight: '320px', background: '#1e2334' }}>
              <EmailNotification visible={emailVisible} />

              {/* Phase: cart */}
              {phase === 'cart' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CartScene />
                </motion.div>
              )}

              {/* Phase: closing — animated tab close */}
              {phase === 'closing' && (
                <motion.div
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeIn' }}
                  className="absolute inset-0"
                >
                  <CartScene />
                </motion.div>
              )}

              {/* Phase: countdown */}
              {phase === 'countdown' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <p className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
                    CartRevive activates in
                  </p>
                  <div ref={countRef} className="metric-num text-7xl text-white/80" style={{ fontFamily: 'var(--font-mono)' }}>
                    {countdown}
                  </div>
                  <p className="text-[10px] font-mono text-accent">seconds</p>
                </div>
              )}

              {/* Phase: email + confirmed */}
              {(phase === 'email' || phase === 'confirmed') && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="p-5"
                >
                  {phase === 'confirmed' ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-3">
                      <div className="w-12 h-12 rounded-full border-2 border-accent flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M4 10l4.5 4.5L16 7" stroke="#4FC3D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="text-sm font-light text-white/80">Order confirmed!</p>
                      <p className="text-[11px] font-mono text-accent">₹9,496 recovered</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <p className="text-[10px] font-mono text-white/30 mb-2">Inbox — 1 new message</p>
                      <div className="p-3 rounded-xl border border-white/10 flex items-start gap-3" style={{ background: '#161929' }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(79,195,217,0.2)' }}>
                          <span className="text-[9px] font-mono text-accent">CR</span>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium text-white/80">CartRevive</p>
                          <p className="text-[11px] text-white/40">Priya, your cart misses you 🛒</p>
                          <p className="text-[10px] text-accent mt-1.5 font-mono">Recover cart →</p>
                        </div>
                        <span className="ml-auto text-[10px] font-mono text-accent flex-shrink-0">NEW</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step label overlay */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                <div className="flex gap-1.5">
                  {(['cart', 'closing', 'countdown', 'email', 'confirmed'] as Phase[]).map((p) => (
                    <span
                      key={p}
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{ background: phase === p ? '#4FC3D9' : 'rgba(255,255,255,0.15)' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </BrowserMockup>
        </motion.div>

        {/* Stat strip below demo */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12 text-center">
          {[
            { value: '< 60s', label: 'first email sent after abandonment' },
            { value: '3-step', label: 'sequence with smart gaps' },
            { value: '0', label: 'emails sent after purchase' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="metric-num text-2xl text-accent">{s.value}</span>
              <span className="text-[11px] text-white/30 font-light mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
