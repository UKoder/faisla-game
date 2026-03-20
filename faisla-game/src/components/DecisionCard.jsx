/**
 * DecisionCard — flat design, SVG swipe indicators, live pillar delta preview.
 * As the user drags, the PillarsBar shows which pillars will be hit.
 */
import { useEffect, useState } from 'react'
import { useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import { t } from '../i18n/translations'
import { useGameStore } from '../state/gameStore'

const SWIPE_THRESHOLD = 80

function cardField(card, field, uiLang) {
  if (!card) return ''
  const suffix = uiLang === 'hi-IN' ? '_hi' : uiLang === 'ta-IN' ? '_ta' : ''
  if (suffix && card[field + suffix]) return card[field + suffix]
  return card[field] ?? ''
}

export function DecisionCard({ card, onChoice, localizedPrompt, uiLang = 'en-IN', onDeltaChange }) {
  const choiceRejected = useGameStore((s) => s.choiceRejected)
  const controls       = useAnimation()
  const x              = useMotionValue(0)
  const rotate         = useTransform(x, [-200, 200], [-8, 8])
  const cardScale      = useTransform(x, [-200, 0, 200], [0.97, 1, 0.97])

  // Opacity of left/right swipe indicators
  const leftOpacity  = useTransform(x, [-160, -40, 0], [1, 0.4, 0])
  const rightOpacity = useTransform(x, [0, 40, 160], [0, 0.4, 1])

  // Track drag direction to show live delta preview
  const [dragDir, setDragDir] = useState(null) // 'left' | 'right' | null

  useEffect(() => {
    const unsub = x.on('change', (v) => {
      if (v < -30) {
        setDragDir('left')
        onDeltaChange?.(card?.effectsLeft ?? null)
      } else if (v > 30) {
        setDragDir('right')
        onDeltaChange?.(card?.effectsRight ?? null)
      } else {
        setDragDir(null)
        onDeltaChange?.(null)
      }
    })
    return unsub
  }, [x, card, onDeltaChange])

  // Reset on new card
  useEffect(() => {
    controls.set({ x: 0, opacity: 1, rotate: 0, scale: 1 })
    x.set(0)
    setDragDir(null)
    onDeltaChange?.(null)
  }, [card?.id, controls, x, onDeltaChange])

  // Spring back on P2 reject
  useEffect(() => {
    if (!choiceRejected) return
    controls.start({
      x: 0, opacity: 1, rotate: 0, scale: 1,
      transition: { type: 'spring', stiffness: 220, damping: 22 },
    })
    x.set(0)
    setDragDir(null)
    onDeltaChange?.(null)
  }, [choiceRejected, controls, x, onDeltaChange])

  const T = (key) => t(uiLang, key)

  if (!card) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm py-8"
        style={{ color: 'var(--text-muted)' }}>
        🌱 Season complete...
      </div>
    )
  }

  const handleDragEnd = async (_, info) => {
    onDeltaChange?.(null)
    setDragDir(null)
    if (info.offset.x < -SWIPE_THRESHOLD) {
      await controls.start({ x: -360, opacity: 0, rotate: -12, transition: { duration: 0.25 } })
      onChoice?.('left')
    } else if (info.offset.x > SWIPE_THRESHOLD) {
      await controls.start({ x: 360, opacity: 0, rotate: 12, transition: { duration: 0.25 } })
      onChoice?.('right')
    } else {
      controls.start({ x: 0, rotate: 0, transition: { type: 'spring', stiffness: 320, damping: 24 } })
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

      {/* ── Left swipe indicator — flat red block ── */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none flex flex-col items-center gap-1"
        style={{ opacity: leftOpacity }}
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-sm text-xl font-black"
          style={{ background: 'var(--red)', color: '#ffffff' }}>✕</div>
        <span className="text-xs font-black uppercase" style={{ color: 'var(--red)' }}>{leftWord}</span>
      </motion.div>

      {/* ── Right swipe indicator — flat green block ── */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none flex flex-col items-center gap-1"
        style={{ opacity: rightOpacity }}
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-sm text-xl font-black"
          style={{ background: 'var(--green)', color: '#ffffff' }}>✓</div>
        <span className="text-xs font-black uppercase" style={{ color: 'var(--green-light)' }}>{rightWord}</span>
      </motion.div>

      {/* ── Card ── */}
      <motion.div
        className="w-full max-w-xs rounded-lg touch-none cursor-grab active:cursor-grabbing f-card-wheat"
        drag="x"
        style={{ x, rotate, scale: cardScale }}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.10}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ opacity: 1, x: 0, rotate: 0 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Phase badge + swipe hint */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <span className={`text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-sm phase-${card.seasonPhase}`}>
            {T(`phase_${card.seasonPhase}`)}
          </span>
          <span className="swipe-hint text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
            ← swipe →
          </span>
        </div>

        {/* Title */}
        <div className="px-4 pb-1">
          <h2 className="text-base font-black leading-snug" style={{ color: 'var(--text)' }}>{title}</h2>
        </div>

        {/* Prompt */}
        <div className="px-4 pb-3">
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-sub)' }}>
            {localizedPrompt || card.prompt}
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: '2px', background: 'var(--border)' }} />

        {/* Choices — two flat blocks */}
        <div className="grid grid-cols-2">
          {/* Left choice */}
          <div className="px-3 py-3"
            style={{
              borderRight: '1px solid var(--border)',
              background: dragDir === 'left' ? 'rgba(224,48,48,0.12)' : 'transparent',
              transition: 'background 0.15s',
            }}>
            <div className="flex items-center gap-1 mb-1.5">
              <span className="text-xs font-black" style={{ color: 'var(--red)' }}>← {leftWord}</span>
            </div>
            <div className="text-xs font-black leading-snug" style={{ color: 'var(--text)' }}>{leftLabel}</div>
            <div className="text-xs mt-1 leading-snug" style={{ color: 'var(--text-muted)' }}>{leftDesc}</div>
          </div>

          {/* Right choice */}
          <div className="px-3 py-3"
            style={{
              background: dragDir === 'right' ? 'rgba(45,158,79,0.12)' : 'transparent',
              transition: 'background 0.15s',
            }}>
            <div className="flex items-center gap-1 mb-1.5 justify-end">
              <span className="text-xs font-black" style={{ color: 'var(--green-light)' }}>{rightWord} →</span>
            </div>
            <div className="text-xs font-black leading-snug text-right" style={{ color: 'var(--text)' }}>{rightLabel}</div>
            <div className="text-xs mt-1 leading-snug text-right" style={{ color: 'var(--text-muted)' }}>{rightDesc}</div>
          </div>
        </div>

        {/* Tags */}
        {card.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-4 py-3" style={{ borderTop: '1px solid var(--border)' }}>
            {card.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-sm font-bold"
                style={{ background: 'var(--bg-inset)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
