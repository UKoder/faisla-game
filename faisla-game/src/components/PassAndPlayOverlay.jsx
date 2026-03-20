/**
 * PassAndPlayOverlay — massive thumb targets, flat design.
 * Agree/Disagree buttons take up the entire bottom third of the screen.
 * Designed for calloused hands on cheap digitizers.
 */
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../state/gameStore'

const overlayAnim = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.18 } },
  exit:    { opacity: 0, transition: { duration: 0.14 } },
}

export function PassAndPlayOverlay() {
  const { pendingChoice, applyChoice, rejectChoice, choiceRejected } = useGameStore()

  const showP2     = !!pendingChoice && !choiceRejected
  const showReject = !pendingChoice && choiceRejected

  return (
    <AnimatePresence mode="wait">

      {/* ── Phase 1: P2 must decide ── */}
      {showP2 && (
        <motion.div
          key="p2"
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: '#111111' }}
          {...overlayAnim}
        >
          {/* Top two-thirds — info */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5 text-center">
            {/* Big icon */}
            <motion.div
              className="text-7xl"
              initial={{ scale: 0.5 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              🤝
            </motion.div>

            <div>
              <h2 className="text-2xl font-black mb-2" style={{ color: '#f5a623' }}>
                Pass to Player 2
              </h2>
              <p className="text-base leading-relaxed max-w-xs" style={{ color: '#cccccc' }}>
                Player 1 has decided. Hand the phone to Player 2.
              </p>
            </div>

            <div className="w-full max-w-xs rounded-lg px-5 py-4"
              style={{ background: '#1c1c1c', border: '2px solid #f5a623' }}>
              <p className="text-sm font-black uppercase tracking-widest mb-1" style={{ color: '#f5a623' }}>
                Player 2 — Do you agree?
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#cccccc' }}>
                Financial decisions affect the whole family. Both must agree.
              </p>
            </div>
          </div>

          {/* Bottom third — MASSIVE thumb targets */}
          <div className="flex" style={{ minHeight: '33vh' }}>
            {/* Disagree — full left half, bottom third */}
            <button
              type="button"
              onClick={rejectChoice}
              className="flex-1 flex flex-col items-center justify-center gap-3 active:opacity-80"
              style={{
                background: '#e03030',
                border: 'none',
                borderTop: '3px solid #8b0000',
                borderRight: '1px solid #8b0000',
              }}
            >
              <span className="text-4xl font-black text-white">✕</span>
              <span className="text-lg font-black uppercase tracking-widest text-white">Disagree</span>
            </button>

            {/* Agree — full right half, bottom third */}
            <button
              type="button"
              onClick={() => applyChoice(pendingChoice)}
              className="flex-1 flex flex-col items-center justify-center gap-3 active:opacity-80"
              style={{
                background: '#2d9e4f',
                border: 'none',
                borderTop: '3px solid #1a5c2e',
                borderLeft: '1px solid #1a5c2e',
              }}
            >
              <span className="text-4xl font-black text-white">✓</span>
              <span className="text-lg font-black uppercase tracking-widest text-white">Agree</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* ── Phase 2: Rejection feedback ── */}
      {showReject && (
        <motion.div
          key="reject"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 px-6 text-center"
          style={{ background: '#111111' }}
          {...overlayAnim}
        >
          <motion.div
            className="text-7xl"
            initial={{ scale: 0.5 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            🔄
          </motion.div>

          <div>
            <h2 className="text-2xl font-black mb-2" style={{ color: '#f5f5f5' }}>
              Player 2 Disagreed
            </h2>
            <p className="text-base" style={{ color: '#cccccc' }}>
              Pass back to Player 1 to reconsider.
            </p>
          </div>

          {/* Progress bar — flat, no gradient */}
          <div className="w-full max-w-xs rounded-sm overflow-hidden"
            style={{ height: '8px', background: '#333333', border: '1px solid #444444' }}>
            <motion.div
              style={{ height: '100%', background: '#f5a623' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5, ease: 'linear' }}
            />
          </div>
          <p className="text-sm font-bold" style={{ color: '#888888' }}>Returning card…</p>
        </motion.div>
      )}

    </AnimatePresence>
  )
}
