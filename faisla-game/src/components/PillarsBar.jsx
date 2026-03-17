import React from 'react'

const items = [
  { key: 'family',     label: 'Family',     barClass: 'bar-family',     icon: '👨‍👩‍👧', dangerIcon: '😰' },
  { key: 'crops',      label: 'Crops',      barClass: 'bar-crops',      icon: '🌾',     dangerIcon: '🥀' },
  { key: 'finance',    label: 'Finance',    barClass: 'bar-finance',    icon: '💰',     dangerIcon: '💸' },
  { key: 'resilience', label: 'Resilience', barClass: 'bar-resilience', icon: '🛡️',    dangerIcon: '⚠️' },
]

export function PillarsBar({ metrics }) {
  return (
    <div className="nm-raised rounded-2xl px-4 py-4 flex flex-col gap-3"
      style={{ border: '1px solid var(--border-wheat)' }}>
      {items.map((item) => {
        const value  = metrics?.[item.key] ?? 0
        const danger = value <= 20
        const warn   = value <= 40 && value > 20
        return (
          <div key={item.key} className="flex items-center gap-3">
            <span className="text-lg w-6 text-center shrink-0 leading-none">
              {danger ? item.dangerIcon : item.icon}
            </span>
            <span className="w-20 text-xs font-bold uppercase tracking-wider shrink-0"
              style={{ color: 'var(--text-muted)' }}>
              {item.label}
            </span>
            <div className="flex-1 h-3 rounded-full bar-track overflow-hidden">
              <div
                className={`${item.barClass} h-full rounded-full`}
                style={{
                  width: `${value}%`,
                  transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
                  animation: danger ? 'dangerPulse 1.4s ease-in-out infinite' : 'none',
                }}
              />
            </div>
            <span className="w-8 text-sm text-right font-black tabular-nums shrink-0"
              style={{ color: danger ? '#ef4444' : warn ? '#f59e0b' : 'var(--text-secondary)' }}>
              {value}
            </span>
          </div>
        )
      })}
    </div>
  )
}
