/**
 * PassAndPlayOverlay
 *
 * Phase 1 — pendingChoice set, choiceRejected false:
 *   Full-screen "Pass to P2" screen. P2 can Agree or Disagree.
 *
 * Phase 2 — pendingChoice null, choiceRejected true:
 *   Brief "P2 disagreed" screen shown while the card springs back.
 *   Auto-dismisses after the spring animation completes (~550ms).
 */
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../state/gameStore'

const overlayVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, scale: 0.97, transition: { duration: 0.18, ease: 'easeIn' } },
}

const iconVariants = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { delay: 0.08, type: 'spring', stiffness: 280, damping: 18 } },
}

export function PassAndPlayOverlay() {
  const { pendingChoice, applyChoice, rejectChoice, choiceRejected } = useGameStore()

  const showP2Screen   = !!pendingChoice && !choiceRejected
  const showRejectScreen = !pendingChoice && choiceRejected

  return (
    <AnimatePresence mode="wait">

      {/* ── Phase 1: P2 decision screen ── */}
      {showP2Screen && (
        <motion.div
          key="p2-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 gap-5"
          style={{ background: 'rgba(12,9,4,0.95)', backdropFilter: 'blur(14px)' }}
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div className="text-6xl" variants={iconVariants} initial="initial" animate="animate">
            🤝
          </motion.div>

          <div className="text-center">
            <h2 className="text-xl font-black mb-1.5"
              style={{ background: 'linear-gradient(90deg,#d4a843,#f0c96a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Pass to Player 2
            </h2>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--p-text-muted)' }}>
              Player 1 has decided. Hand the phone over — Player 2 must agree before the choice is final.
            </p>
          </div>

          <div className="p-nm-glow-wheat rounded-2xl px-5 py-4 w-full max-w-xs text-center">
            <p className="text-xs uppercase tracking-widest font-bold mb-1.5" style={{ color: 'var(--p-text-muted)' }}>
              Player 2 — Do you agree?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--p-text-secondary)' }}>
              Financial decisions affect the whole family. Both players must agree.
            </p>
          </div>

          <div className="flex gap-3 w-full max-w-xs">
            <button
              type="button"
              onClick={rejectChoice}
              className="flex-1 py-3.5 rounded-full text-sm font-black transition-all duration-150 active:scale-95"
              style={{
                background: 'rgba(239,68,68,0.10)',
                border: '1px solid rgba(239,68,68,0.45)',
                color: '#ef4444',
              }}
            >
              ✗ Disagree
            </button>
            <button
              type="button"
              onClick={() => applyChoice(pendingChoice)}
              className="flex-1 py-3.5 rounded-full text-sm font-black p-btn-wheat active:scale-95"
            >
              ✓ Agree
            </button>
          </div>
        </motion.div>
      )}

      {/* ── Phase 2: Rejection feedback screen ── */}
      {showRejectScreen && (
        <motion.div
          key="reject-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 gap-5"
          style={{ background: 'rgba(12,9,4,0.88)', backdropFilter: 'blur(10px)' }}
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            className="text-6xl"
            variants={iconVariants}
            initial="initial"
            animate="animate"
          >
            🔄
          </motion.div>

          <div className="text-center">
            <h2 className="text-lg font-black mb-1.5" style={{ color: 'var(--p-text-primary)' }}>
              Player 2 Disagreed
            </h2>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--p-text-muted)' }}>
              Pass the phone back to Player 1 to reconsider.
            </p>
          </div>

          {/* Animated progress bar showing the card is returning */}
          <div className="w-full max-w-xs">
            <div className="p-nm-inset rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg,#d4a843,#f0c96a)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-center mt-2" style={{ color: 'var(--p-text-muted)' }}>
              Returning card…
            </p>
          </div>
        </motion.div>
      )}

    </AnimatePresence>
  )
}
