import React from 'react'
import { motion } from 'framer-motion'

const items = [
  { key: 'family',     label: 'Family',     barClass: 'bar-family',     icon: '👨‍👩‍👧' },
  { key: 'crops',      label: 'Crops',      barClass: 'bar-crops',      icon: '🌾' },
  { key: 'finance',    label: 'Finance',    barClass: 'bar-finance',    icon: '💰' },
  { key: 'resilience', label: 'Resilience', barClass: 'bar-resilience', icon: '🛡️' },
]

export function PillarsBar({ metrics }) {
  return (
    <div className="w-full space-y-2.5">
      {items.map((item, i) => {
        const value = metrics?.[item.key] ?? 0
        const danger = value <= 20
        return (
          <div key={item.key} className="flex items-center gap-2.5">
            <span className="text-base w-6 text-center">{item.icon}</span>
            <span className="w-20 text-[10px] uppercase tracking-widest font-semibold text-slate-400">
              {item.label}
            </span>
            <div className="flex-1 h-2.5 rounded-full bg-white/5 overflow-hidden relative">
              <motion.div
                className={`${item.barClass} h-full rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }}
              />
              {danger && (
                <div className="absolute inset-0 rounded-full animate-pulse bg-red-500/20" />
              )}
            </div>
            <span className={`w-8 text-[11px] text-right font-bold tabular-nums ${danger ? 'text-red-400' : 'text-slate-300'}`}>
              {value}
            </span>
          </div>
        )
      })}
    </div>
  )
}
