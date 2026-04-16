import { ReactNode } from 'react'

interface StepCardProps {
  number: string  // "01" | "02" | etc.
  title: string
  description: string
  children?: ReactNode
}

export default function StepCard({ number, title, description, children }: StepCardProps) {
  return (
    <div className="relative w-screen md:w-[min(85vw,640px)] flex-shrink-0 h-full flex flex-col justify-center px-8 md:px-16 lg:px-20 select-none">
      {/* Watermark step number */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono font-light text-[22vw] md:text-[18vw] leading-none text-foreground/[0.04] pointer-events-none whitespace-nowrap"
      >
        {number}
      </span>

      {/* Content */}
      <div className="relative z-10">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-mono text-muted mb-6">
          STEP {number}
        </span>

        <h3 className="headline-md text-3xl md:text-4xl text-foreground mb-3">{title}</h3>
        <p className="text-base text-muted font-light mb-8 max-w-md">{description}</p>

        {children}
      </div>
    </div>
  )
}
