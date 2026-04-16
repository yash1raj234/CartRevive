'use client'

import { motion } from 'framer-motion'
import MetricCard from '@/components/ui/MetricCard'

const metrics = [
  {
    value: 14.2,
    suffix: '%',
    decimals: 1,
    label: 'Average recovery rate',
    sublabel: 'Across all stores on our platform',
    sparkData: [6, 8, 7, 10, 9, 12, 11, 14, 13, 14.2],
    highlight: false,
  },
  {
    value: 2.4,
    prefix: '₹',
    suffix: 'Cr',
    decimals: 1,
    label: 'Total revenue recovered',
    sublabel: 'Cumulative across 340+ active stores',
    sparkData: [20, 35, 28, 50, 45, 72, 68, 95, 88, 100],
    highlight: true,
  },
  {
    value: 60,
    suffix: 's',
    label: 'First email latency',
    sublabel: 'From cart abandonment to inbox delivery',
    sparkData: [62, 61, 60, 60, 59, 60, 58, 60, 59, 60],
    highlight: false,
  },
]

export default function Metrics() {
  return (
    <section id="metrics" className="bg-surface py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-4">By the numbers</p>
          <h2 className="headline text-4xl md:text-5xl text-foreground">
            Numbers that speak for themselves.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <MetricCard {...m} />
            </motion.div>
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 text-center"
        >
          {[
            { icon: '🔒', text: 'SOC 2 Type II compliant' },
            { icon: '⚡', text: 'Sub-60s delivery SLA' },
            { icon: '🛑', text: 'Stops on purchase. Always.' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-muted font-light">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
