import React, { useEffect } from 'react'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'

const swipeThreshold = 80

export function DecisionCard({ card, onChoice }) {
  const controls = useAnimation()
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-12, 12])
  const leftOpacity  = useTransform(x, [-160, -20, 0], [1, 0.6, 0])
  const rightOpacity = useTransform(x, [0, 20, 160], [0, 0.6, 1])
  const cardOpacity  = useTransform(x, [-200, 0, 200], [0.7, 1, 0.7])

  useEffect(() => {
    controls.set({ x: 0, opacity: 1, rotate: 0 })
  }, [card?.id, controls])

  if (!card) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
        No more decisions. Season summary coming soon.
      </div>
    )
  }

  const handleDragEnd = async (_, info) => {
    if (info.offset.x < -swipeThreshold) {
      await controls.start({ x: -320, opacity: 0, rotate: -15, transition: { duration: 0.3 } })
      onChoice?.('left')
    } else if (info.offset.x > swipeThreshold) {
      await controls.start({ x: 320, opacity: 0, rotate: 15, transition: { duration: 0.3 } })
      onChoice?.('right')
    } else {
      controls.start({ x: 0, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } })
    }
  }

  return (
    <div className="relative flex-1 flex items-center justify-center mt-1 mb-2">
      {/* Left swipe indicator */}
      <motion.div
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        style={{ opacity: leftOpacity }}
      >
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/60 flex items-center justify-center text-lg">
            ←
          </div>
          <span className="text-[9px] text-red-400 font-semibold uppercase tracking-wide">Left</span>
        </div>
      </motion.div>

      {/* Right swipe indicator */}
      <motion.div
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        style={{ opacity: rightOpacity }}
      >
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/60 flex items-center justify-center text-lg">
            →
          </div>
          <span className="text-[9px] text-emerald-400 font-semibold uppercase tracking-wide">Right</span>
        </div>
      </motion.div>

      <motion.div
        className="w-full max-w-xs nm-card nm-card-glow-green rounded-3xl px-4 py-4 touch-none cursor-grab active:cursor-grabbing"
        drag="x"
        style={{ x, rotate, opacity: cardOpacity }}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ opacity: 1, x: 0, rotate: 0 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full phase-${card.seasonPhase}`}>
            {card.seasonPhase?.replace('_', ' ')}
          </span>
          <span className="swipe-hint text-[9px] text-slate-500 flex items-center gap-1">
            <span>←</span>
            <span>swipe</span>
            <span>→</span>
          </span>
        </div>

        {/* Title */}
        <h2 className="text-base font-bold text-white leading-snug">{card.title}</h2>
        <p className="mt-1.5 text-[12px] text-slate-300 leading-relaxed">{card.prompt}</p>

        {/* Divider */}
        <div className="my-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Choices */}
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <motion.div
            className="rounded-2xl px-3 py-2.5 border border-red-500/30 bg-red-950/30"
            style={{ opacity: useTransform(x, [-160, 0], [1, 0.7]) }}
          >
            <div className="flex items-center gap-1 mb-1">
              <span className="text-red-400 text-[10px]">←</span>
              <span className="text-[9px] uppercase tracking-widest text-red-400 font-bold">Left</span>
            </div>
            <div className="font-semibold text-slate-100 text-[11px] leading-snug">{card.left.label}</div>
            <div className="text-slate-400 text-[10px] mt-0.5 leading-snug">{card.left.description}</div>
          </motion.div>

          <motion.div
            className="rounded-2xl px-3 py-2.5 border border-emerald-500/30 bg-emerald-950/30"
            style={{ opacity: useTransform(x, [0, 160], [0.7, 1]) }}
          >
            <div className="flex items-center gap-1 mb-1 justify-end">
              <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold">Right</span>
              <span className="text-emerald-400 text-[10px]">→</span>
            </div>
            <div className="font-semibold text-slate-100 text-[11px] leading-snug">{card.right.label}</div>
            <div className="text-slate-400 text-[10px] mt-0.5 leading-snug">{card.right.description}</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
