'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'

interface MetricCardProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
  sublabel?: string
  sparkData?: number[]
  highlight?: boolean
}

export default function MetricCard({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  label,
  sublabel,
  sparkData,
  highlight = false,
}: MetricCardProps) {
  const cardRef   = useRef<HTMLDivElement>(null)
  const numRef    = useRef<HTMLSpanElement>(null)
  const isInView  = useInView(cardRef, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (!isInView || prefersReduced || !numRef.current) return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate() {
        if (numRef.current) {
          numRef.current.textContent = decimals
            ? obj.val.toFixed(decimals)
            : Math.round(obj.val).toLocaleString('en-IN')
        }
      },
    })
  }, [isInView, value, decimals, prefersReduced])

  // Sparkline
  const sparkPts = sparkData ?? []
  const max = Math.max(...sparkPts, 1)
  const W = 120, H = 36
  const pts = sparkPts
    .map((v, i) => `${(i / Math.max(sparkPts.length - 1, 1)) * W},${H - (v / max) * H}`)
    .join(' ')

  return (
    <motion.div
      ref={cardRef}
      whileHover={
        prefersReduced
          ? {}
          : {
              y: -4,
              boxShadow: highlight
                ? '0 0 0 2px #4FC3D9, 0 12px 32px rgba(79,195,217,0.18)'
                : '0 0 0 1.5px rgba(79,195,217,0.4), 0 12px 32px rgba(79,195,217,0.12)',
            }
      }
      transition={{ duration: 0.2 }}
      className={`rounded-2xl border p-7 flex flex-col gap-4 transition-colors ${
        highlight
          ? 'border-accent bg-[rgba(79,195,217,0.06)]'
          : 'border-border bg-card'
      }`}
    >
      {/* Number */}
      <div className="flex items-baseline gap-1 overflow-hidden">
        {prefix && (
          <span className="font-mono font-light text-xl xl:text-2xl text-accent shrink-0">{prefix}</span>
        )}
        <span
          ref={numRef}
          className="metric-num text-4xl xl:text-5xl text-foreground truncate"
        >
          {decimals ? (0).toFixed(decimals) : '0'}
        </span>
        {suffix && (
          <span className="metric-num text-2xl xl:text-3xl text-accent shrink-0">{suffix}</span>
        )}
      </div>

      {/* Sparkline */}
      {sparkPts.length > 0 && (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-9" fill="none" preserveAspectRatio="none">
          <polyline
            points={pts}
            stroke="#4FC3D9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points={`0,${H} ${pts} ${W},${H}`}
            fill="rgba(79,195,217,0.08)"
          />
        </svg>
      )}

      {/* Labels */}
      <div>
        <p className="text-sm font-light text-foreground">{label}</p>
        {sublabel && (
          <p className="text-xs text-caption font-light mt-1">{sublabel}</p>
        )}
      </div>
    </motion.div>
  )
}
