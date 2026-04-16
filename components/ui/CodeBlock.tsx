'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CodeBlockProps {
  code: string
}

/* Very minimal hand-rolled tokenizer for a single HTML script tag */
function tokenize(code: string): Array<{ text: string; type: 'tag' | 'attr-name' | 'attr-value' | 'plain' }> {
  const tokens: Array<{ text: string; type: 'tag' | 'attr-name' | 'attr-value' | 'plain' }> = []

  // Match:  <script  src="..."  data-store="..."  ></script>
  const re = /(<\/?script>?|<script)|(\s+[a-z-]+=)|(\"[^\"]*\")/g
  let last = 0
  let m: RegExpExecArray | null

  while ((m = re.exec(code)) !== null) {
    if (m.index > last) {
      tokens.push({ text: code.slice(last, m.index), type: 'plain' })
    }
    if (m[1]) tokens.push({ text: m[1], type: 'tag' })
    else if (m[2]) tokens.push({ text: m[2], type: 'attr-name' })
    else if (m[3]) tokens.push({ text: m[3], type: 'attr-value' })
    last = m.index + m[0].length
  }
  if (last < code.length) tokens.push({ text: code.slice(last), type: 'plain' })
  return tokens
}

const COLOR_MAP: Record<string, string> = {
  tag:        'text-accent',
  'attr-name': 'text-secondary',
  'attr-value': 'text-amber-500',
  plain:      'text-foreground',
}

export default function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const tokens = tokenize(code)

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="relative rounded-xl border border-border bg-[#F0F4F8] overflow-hidden font-mono text-sm">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-card">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        </div>
        <span className="text-[10px] text-caption tracking-wide">index.html</span>
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 text-[11px] text-muted hover:text-accent transition-colors px-2 py-1 rounded-md hover:bg-accent/10"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-accent"
              >
                ✓ Copied
              </motion.span>
            ) : (
              <motion.span key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Code body */}
      <pre className="px-5 py-4 text-xs md:text-sm leading-relaxed overflow-x-auto">
        <code>
          {tokens.map((t, i) => (
            <span key={i} className={COLOR_MAP[t.type]}>
              {t.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
