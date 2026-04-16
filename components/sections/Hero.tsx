'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'

type StatConfig = {
  prefix: string
  value: number
  suffix: string
  label: string
  decimals?: number
}

const STATS: StatConfig[] = [
  { prefix: '₹', value: 2.4, suffix: 'Cr recovered', label: 'total revenue recovered', decimals: 1 },
  { prefix: '', value: 340, suffix: '+', label: 'stores live today' },
  { prefix: '', value: 14, suffix: '%', label: 'avg. recovery rate' },
]

/* Canvas particle system ─────────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number

    const ACCENT_COLOR  = 'rgba(79, 195, 217, '
    const SEC_COLOR     = 'rgba(197, 163, 224, '

    type Particle = {
      x: number; y: number
      vx: number; vy: number
      r: number
      color: string
      opacity: number
    }

    let particles: Particle[] = []

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const buildParticles = () => {
      particles = Array.from({ length: 55 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 2.5 + 0.8,
        color: Math.random() > 0.5 ? ACCENT_COLOR : SEC_COLOR,
        opacity: Math.random() * 0.25 + 0.08,
      }))
    }

    resize()
    buildParticles()

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${p.opacity})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }

    draw()

    const ro = new ResizeObserver(() => { resize(); buildParticles() })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}

/* Animated stat number ───────────────────────────────────────────────────── */
function StatNumber({ stat }: { stat: StatConfig }) {
  const numRef = useRef<HTMLSpanElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced || !numRef.current) return
    const obj = { val: 0 }
    const formatted = (v: number) => (stat.decimals ? v.toFixed(stat.decimals) : Math.round(v))

    gsap.to(obj, {
      val: stat.value,
      duration: 2,
      delay: 1.2,
      ease: 'power2.out',
      onUpdate() {
        if (numRef.current) numRef.current.textContent = `${formatted(obj.val)}`
      },
    })
  }, [stat, prefersReduced])

  const initial = stat.decimals ? (0).toFixed(stat.decimals) : '0'

  return (
    <span className="metric-num text-4xl md:text-5xl text-foreground" ref={numRef}>
      {initial}
    </span>
  )
}

/* Hero ───────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const prefersReduced = useReducedMotion()

  // Stagger headline words on mount
  useEffect(() => {
    if (prefersReduced || !headlineRef.current) return

    const words = headlineRef.current.querySelectorAll<HTMLSpanElement>('.word')
    const ctx = gsap.context(() => {
      gsap.from(words, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.1,
      })
    })
    return () => ctx.revert()
  }, [prefersReduced])

  const line1 = 'Your customers leave.'.split(' ')
  const line2 = "Your revenue doesn't have to.".split(' ')

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-surface pt-16"
    >
      {/* Particles */}
      <ParticleCanvas />

      {/* Radial glow — very faint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(79,195,217,0.08) 0%, rgba(197,163,224,0.06) 55%, transparent 80%)',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24 md:py-32 text-center flex flex-col items-center">
        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full border border-border bg-card text-xs font-mono text-muted tracking-wider"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          AI-POWERED CART RECOVERY
        </motion.div>

        {/* Headline — each word wrapped in <span class="word"> for GSAP */}
        <h1
          ref={headlineRef}
          className="headline text-5xl sm:text-6xl md:text-7xl lg:text-[88px] text-foreground mb-6"
        >
          <span className="block mb-1">
            {line1.map((word, i) => (
              <span key={i} className="word inline-block">
                {word}&nbsp;
              </span>
            ))}
          </span>
          <span className="block text-muted">
            {line2.map((word, i) => (
              <span key={i} className="word inline-block">
                {word}&nbsp;
              </span>
            ))}
          </span>
        </h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-base md:text-lg text-muted font-light max-w-xl mx-auto mb-10 leading-relaxed"
        >
          CartRevive automatically recovers abandoned carts with AI-written emails.
          <br className="hidden md:block" />
          One script tag. Any platform. Zero setup cost.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20"
        >
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(79,195,217,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-white text-sm font-medium transition-shadow"
          >
            Get the snippet
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>

          <motion.a
            href="#demo"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border-strong bg-card text-sm font-light text-foreground hover:border-accent hover:text-accent transition-all duration-200"
          >
            Watch demo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3.5 9 7l-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>

        {/* Social proof stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <div className="flex items-baseline gap-0.5">
                {stat.prefix && (
                  <span className="font-mono font-light text-xl md:text-2xl text-accent">
                    {stat.prefix}
                  </span>
                )}
                <StatNumber stat={stat} />
                <span className="metric-num text-lg md:text-2xl text-accent">
                  {stat.suffix}
                </span>
              </div>
              <span className="text-[10px] md:text-xs text-caption font-light tracking-wide text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: 'linear-gradient(to bottom, transparent, #F7F8FA)',
        }}
      />
    </section>
  )
}
