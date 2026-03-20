import React from 'react'

export function DebtTrapVisualizer({ active }) {
  if (!active) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <div className="absolute inset-0 rounded-xl debt-blink border-2" />
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-sm"
        style={{ background: 'var(--red)', border: '2px solid #8b0000' }}>
        <span className="text-xs">🚨</span>
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#ffffff' }}>Debt Trap Active</span>
      </div>
    </div>
  )
}
