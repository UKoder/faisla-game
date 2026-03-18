import { useEffect } from 'react'
import { useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import { t } from '../i18n/translations'
import { useGameStore } from '../state/gameStore'

const swipeThreshold = 80

function cardField(card, field, uiLang) {
  if (!card) return ''
  const suffix = uiLang === 'hi-IN' ? '_hi' : uiLang === 'ta-IN' ? '_ta' : ''
  if (suffix && card[field + suffix]) return card[field + suffix]
  return card[field] ?? ''
}

export function DecisionCard({ card, onChoice, localizedPrompt, uiLang = 'en-IN' }) {
  const choiceRejected = useGameStore((s) => s.choiceRejected)
  const controls       = useAnimation()
  const x              = useMotionValue(0)
  const rotate         = useTransform(x, [-200, 200], [-10, 10])
  const leftOpacity    = useTransform(x, [-160, -30, 0], [1, 0.5, 0])
  const rightOpacity   = useTransform(x, [0, 30, 160], [0, 0.5, 1])
  const cardScale      = useTransform(x, [-200, 0, 200], [0.96, 1, 0.96])
  const leftChoiceOpacity  = useTransform(x, [-160, 0], [1, 0.65])
  const rightChoiceOpacity = useTransform(x, [0, 160], [0.65, 1])

  // Reset card position when a new card arrives
  useEffect(() => {
    controls.set({ x: 0, opacity: 1, rotate: 0, scale: 1 })
    x.set(0)
  }, [card?.id, controls, x])

  // Animate card back in smoothly when P2 rejects
  useEffect(() => {
    if (!choiceRejected) return
    // Card is off-screen (flew left or right) — snap it back with a spring
    controls.start({
      x: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 220, damping: 22, duration: 0.5 },
    })
    x.set(0)
  }, [choiceRejected, controls, x])

  const T = (key) => t(uiLang, key)

  if (!card) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm py-8"
        style={{ color: 'var(--p-text-muted)' }}>
        🌱 Season complete...
      </div>
    )
  }

  const handleDragEnd = async (_, info) => {
    if (info.offset.x < -swipeThreshold) {
      await controls.start({ x: -340, opacity: 0, rotate: -14, transition: { duration: 0.28 } })
      onChoice?.('left')
    } else if (info.offset.x > swipeThreshold) {
      await controls.start({ x: 340, opacity: 0, rotate: 14, transition: { duration: 0.28 } })
      onChoice?.('right')
    } else {
      controls.start({ x: 0, rotate: 0, transition: { type: 'spring', stiffness: 320, damping: 22 } })
    }
  }

  const title      = cardField(card, 'title', uiLang)
  const leftLabel  = cardField(card, 'left_label', uiLang) || card.left?.label
  const leftDesc   = cardField(card, 'left_desc', uiLang)  || card.left?.description
  const rightLabel = cardField(card, 'right_label', uiLang) || card.right?.label
  const rightDesc  = cardField(card, 'right_desc', uiLang)  || card.right?.description

  const leftWord  = uiLang === 'hi-IN' ? 'नहीं' : uiLang === 'ta-IN' ? 'வேண்டாம்' : 'Nahi'
  const rightWord = uiLang === 'hi-IN' ? 'हाँ'  : uiLang === 'ta-IN' ? 'ஆம்'      : 'Haan'

  return (
    <div className="relative flex-1 flex items-center justify-center my-2">
      {/* Left indicator */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none flex flex-col items-center gap-1.5"
        style={{ opacity: leftOpacity }}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.5)' }}>←</div>
        <span className="text-xs text-red-400 font-black uppercase tracking-widest">{leftWord}</span>
      </motion.div>

      {/* Right indicator */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none flex flex-col items-center gap-1.5"
        style={{ opacity: rightOpacity }}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{ background: 'rgba(76,175,80,0.15)', border: '1px solid rgba(76,175,80,0.5)' }}>→</div>
        <span className="text-xs text-green-400 font-black uppercase tracking-widest">{rightWord}</span>
      </motion.div>

      {/* Card */}
      <motion.div
        className="w-full max-w-xs rounded-3xl px-5 py-5 touch-none cursor-grab active:cursor-grabbing p-nm-card p-nm-glow-wheat"
        drag="x"
        style={{ x, rotate, scale: cardScale }}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ opacity: 1, x: 0, rotate: 0 }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full p-phase-${card.seasonPhase}`}>
            {T(`phase_${card.seasonPhase}`)}
          </span>
          <span className="swipe-hint text-xs flex items-center gap-1" style={{ color: 'var(--p-text-muted)' }}>
            ← swipe →
          </span>
        </div>

        <h2 className="text-base font-black leading-snug" style={{ color: 'var(--p-text-primary)' }}>{title}</h2>
        <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--p-text-secondary)' }}>
          {localizedPrompt || card.prompt}
        </p>

        <div className="my-3 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(212,168,67,0.2),transparent)' }} />

        <div className="grid grid-cols-2 gap-2.5">
          <motion.div className="rounded-2xl px-3 py-3"
            style={{ opacity: leftChoiceOpacity, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)' }}>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs text-red-400">←</span>
              <span className="text-xs uppercase tracking-widest text-red-400 font-black">{T('card_swipe_left')}</span>
            </div>
            <div className="text-xs font-bold leading-snug" style={{ color: 'var(--p-text-primary)' }}>{leftLabel}</div>
            <div className="text-xs mt-1 leading-snug" style={{ color: 'var(--p-text-muted)' }}>{leftDesc}</div>
          </motion.div>

          <motion.div className="rounded-2xl px-3 py-3"
            style={{ opacity: rightChoiceOpacity, background: 'rgba(76,175,80,0.07)', border: '1px solid rgba(76,175,80,0.25)' }}>
            <div className="flex items-center gap-1 mb-2 justify-end">
              <span className="text-xs uppercase tracking-widest text-green-400 font-black">{T('card_swipe_right')}</span>
              <span className="text-xs text-green-400">→</span>
            </div>
            <div className="text-xs font-bold leading-snug" style={{ color: 'var(--p-text-primary)' }}>{rightLabel}</div>
            <div className="text-xs mt-1 leading-snug" style={{ color: 'var(--p-text-muted)' }}>{rightDesc}</div>
          </motion.div>
        </div>

        {card.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {card.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded font-medium"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--p-text-muted)', border: '1px solid rgba(255,255,255,0.08)' }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
