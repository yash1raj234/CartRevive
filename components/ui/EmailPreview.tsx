'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const FULL_BODY = `Hi Priya,

You left something behind — and honestly, we get it. Shopping can wait. But this one might not:

  → Wireless Headphones (Midnight Black)
     Was ₹3,499  •  Only 4 left in stock

We've kept your cart warm. When you're ready, it's right where you left it.

As a small nudge, here's 10% off just for you:

    [ PRIYA10 ]  →  Use at checkout

Your cart expires in 12 hours.

— The CartRevive team`

export default function EmailPreview({ play = false }: { play?: boolean }) {
  const bodyRef = useRef<HTMLPreElement>(null)
  const prefersReduced = useReducedMotion()
  const [displayed, setDisplayed] = useState('')
  const posRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!play) return

    // Reset
    posRef.current = 0
    setDisplayed('')

    if (prefersReduced) {
      setDisplayed(FULL_BODY)
      return
    }

    timerRef.current = setInterval(() => {
      posRef.current += 2
      if (posRef.current >= FULL_BODY.length) {
        setDisplayed(FULL_BODY)
        if (timerRef.current) clearInterval(timerRef.current)
        return
      }
      setDisplayed(FULL_BODY.slice(0, posRef.current))
    }, 18)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [play, prefersReduced])

  return (
    <div className="bg-card rounded-2xl border border-border shadow-md overflow-hidden max-w-sm">
      {/* Email header */}
      <div className="px-5 py-4 bg-surface border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-[10px] font-mono text-accent font-medium">CR</span>
          </div>
          <div>
            <p className="text-xs font-medium text-foreground">CartRevive</p>
            <p className="text-[10px] text-caption">hello@cartrevive.ai</p>
          </div>
        </div>
        <p className="text-sm font-light text-foreground">
          Priya, your cart misses you 🛒
        </p>
        <p className="text-[10px] text-caption mt-0.5">
          To: priya@email.com  •  Just now
        </p>
      </div>

      {/* Product image strip */}
      <div className="px-5 py-3 border-b border-border flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20 border border-border flex-shrink-0" />
        <div>
          <p className="text-xs font-light text-foreground">Wireless Headphones</p>
          <p className="text-[10px] text-caption">Midnight Black  •  ₹3,499</p>
          <p className="text-[10px] text-red-400 font-mono mt-0.5">Only 4 left</p>
        </div>
      </div>

      {/* Body — typewriter */}
      <div className="px-5 py-4">
        <pre
          ref={bodyRef}
          className="text-[11px] text-muted font-sans whitespace-pre-wrap leading-relaxed min-h-[140px]"
        >
          {displayed}
          {play && displayed.length < FULL_BODY.length && (
            <span className="inline-block w-0.5 h-3 bg-accent animate-pulse ml-0.5 align-middle" />
          )}
        </pre>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <div className="rounded-lg bg-accent px-4 py-2.5 text-center">
          <span className="text-xs text-white font-medium">Recover my cart →</span>
        </div>
      </div>
    </div>
  )
}
