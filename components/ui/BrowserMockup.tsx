import { ReactNode } from 'react'

interface BrowserMockupProps {
  url?: string
  children?: ReactNode
  className?: string
}

export default function BrowserMockup({
  url = 'store.example.com/checkout',
  children,
  className = '',
}: BrowserMockupProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 overflow-hidden shadow-2xl ${className}`}
      style={{ background: '#1e2334' }}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10" style={{ background: '#161929' }}>
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        {/* URL bar */}
        <div className="flex-1 flex items-center gap-2 bg-white/5 rounded-md px-3 py-1.5">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4.5" stroke="#6B7280" strokeWidth="0.8"/>
            <path d="M3 5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2Z" fill="#6B7280" fillOpacity=".4"/>
          </svg>
          <span className="text-[11px] font-mono text-white/30 flex-1 truncate">{url}</span>
        </div>
      </div>

      {/* Viewport */}
      <div className="relative overflow-hidden" style={{ minHeight: '320px' }}>
        {children}
      </div>
    </div>
  )
}
