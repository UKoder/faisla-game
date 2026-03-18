import { useEffect } from 'react'
import { useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import { t } from '../i18n/translations'

const swipeThreshold = 80

// Pull localized field from card, fallback to English
function cardField(card, field, uiLang) {
  if (!card) return ''
  const suffix = uiLang === 'hi-IN' ? '_hi' : uiLang === 'ta-IN' ? '_ta' : ''
  if (suffix && card[field + suffix]) return card[field + suffix]
  return card[field] ?? ''
}

export function DecisionCard({ card, onChoice, localizedPrompt, uiLang = 'en-IN' }) {
  const controls     = useAnimation()
  const x            = useMotionValue(0)
  const rotate       = useTransform(x, [-200, 200], [-10, 10])
  const leftOpacity  = useTransform(x, [-160, -30, 0], [1, 0.5, 0])
  const rightOpacity = useTransform(x, [0, 30, 160], [0, 0.5, 1])
  const cardScale    = useTransform(x, [-200, 0, 200], [0.96, 1, 0.96])

  useEffect(() => {
    controls.set({ x: 0, opacity: 1, rotate: 0 })
  }, [card?.id, controls])

  const T = (key) => t(uiLang, key)

  if (!card) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm py-8" style={{ color: 'var(--text-muted)' }}>
        🌱 {T('phase_harvest')}...
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

  const title       = cardField(card, 'title', uiLang)
  const leftLabel   = cardField(card, 'left_label', uiLang) || card.left?.label
  const leftDesc    = cardField(card, 'left_desc', uiLang)  || card.left?.description
  const rightLabel  = cardField(card, 'right_label', uiLang) || card.right?.label
  const rightDesc   = cardField(card, 'right_desc', uiLang)  || card.right?.description
  const phaseKey    = `phase_${card.seasonPhase}`

  // Swipe indicator labels
  const leftWord  = uiLang === 'hi-IN' ? 'नहीं' : uiLang === 'ta-IN' ? 'வேண்டாம்' : 'Nahi'
  const rightWord = uiLang === 'hi-IN' ? 'हाँ'  : uiLang === 'ta-IN' ? 'ஆம்'      : 'Haan'
  const swipeHint = uiLang === 'hi-IN' ? 'स्वाइप' : uiLang === 'ta-IN' ? 'ஸ்வைப்' : 'swipe'

  return (
    <div className="relative flex-1 flex items-center justify-center mt-1 mb-2">
      {/* Left swipe indicator */}
      <motion.div
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        style={{ opacity: leftOpacity }}
      >
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/60 flex items-center justify-center text-lg">←</div>
          <span className="text-[9px] text-red-400 font-semibold uppercase tracking-wide">
            {uiLang === 'en-IN' ? 'Left' : '←'}
          </span>
        </div>
        <span className="text-xs text-red-400 font-black uppercase tracking-widest">{leftWord}</span>
      </motion.div>

      {/* Right indicator */}
      <motion.div
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        style={{ opacity: rightOpacity }}
      >
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/60 flex items-center justify-center text-lg">→</div>
          <span className="text-[9px] text-emerald-400 font-semibold uppercase tracking-wide">
            {uiLang === 'en-IN' ? 'Right' : '→'}
          </span>
        </div>
        <span className="text-xs text-green-400 font-black uppercase tracking-widest">{rightWord}</span>
      </motion.div>

      {/* Card */}
      <motion.div
        className="w-full max-w-xs nm-card nm-card-glow-green rounded-3xl px-4 py-4 touch-none cursor-grab active:cursor-grabbing"
        drag="x"
        style={{ x, rotate, scale: cardScale }}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ opacity: 1, x: 0, rotate: 0 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full phase-${card.seasonPhase}`}>
            {T(phaseKey)}
          </span>
          <span className="swipe-hint text-[9px] text-slate-500 flex items-center gap-1">
            <span>←</span>
            <span>{swipeHint}</span>
            <span>→</span>
          </span>
        </div>

        {/* Title */}
        <h2 className="text-base font-bold text-white leading-snug">{title}</h2>
        <p className="mt-1.5 text-[12px] text-slate-300 leading-relaxed">{localizedPrompt || card.prompt}</p>

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
              <span className="text-[9px] uppercase tracking-widest text-red-400 font-bold">
                {T('card_swipe_left')}
              </span>
            </div>
            <div className="font-semibold text-slate-100 text-[11px] leading-snug">{leftLabel}</div>
            <div className="text-slate-400 text-[10px] mt-0.5 leading-snug">{leftDesc}</div>
          </motion.div>

          <motion.div
            className="rounded-2xl px-3 py-2.5 border border-emerald-500/30 bg-emerald-950/30"
            style={{ opacity: useTransform(x, [0, 160], [0.7, 1]) }}
          >
            <div className="flex items-center gap-1 mb-1 justify-end">
              <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold">
                {T('card_swipe_right')}
              </span>
              <span className="text-emerald-400 text-[10px]">→</span>
            </div>
            <div className="font-semibold text-slate-100 text-[11px] leading-snug">{rightLabel}</div>
            <div className="text-slate-400 text-[10px] mt-0.5 leading-snug">{rightDesc}</div>
          </motion.div>
        </div>

        {/* Tags */}
        {card.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {card.tags.map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded font-medium"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-faint)', border: '1px solid var(--border)' }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
