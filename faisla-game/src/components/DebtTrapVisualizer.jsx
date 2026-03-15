import React from 'react'

export function DebtTrapVisualizer({ active }) {
  if (!active) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <div className="absolute inset-0 rounded-3xl debt-pulse border-2 border-red-500/50" />
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 border border-red-400/60 shadow-lg shadow-red-900/50">
        <span className="text-xs">🚨</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Debt Trap Active</span>
      </div>
    </div>
  )
}

