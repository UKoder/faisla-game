/**
 * AutopsyReport — end-of-run decision analysis.
 * Shows 2-3 narrative insights derived from the player's choices.
 * Flat design, high contrast, outdoor-ready.
 */
import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import { useGameStore } from '../state/gameStore'

function getInsightText(insight, uiLang) {
  if (uiLang === 'hi-IN' && insight.text_hi) return insight.text_hi
  if (uiLang === 'ta-IN' && insight.text_ta) return insight.text_ta
  return insight.text
}

export function AutopsyReport({ uiLang = 'en-IN' }) {
  const autopsy = useGameStore((s) => s.autopsy)
  const decisionLog = useGameStore((s) => s.decisionLog)

  if (!autopsy || autopsy.length === 0) return null

  const totalDecisions = decisionLog.length
  const goodChoices = decisionLog.filter((e) => {
    const sum = Object.values(e.delta ?? {}).reduce((a, b) => a + b, 0)
    return sum >= 0
  }).length
  const badChoices = totalDecisions - goodChoices

  const title = uiLang === 'hi-IN'
    ? 'आपके फैसलों का विश्लेषण'
    : uiLang === 'ta-IN'
    ? 'உங்கள் முடிவுகளின் பகுப்பாய்வு'
    : 'Decision Autopsy'

  const subtitle = uiLang === 'hi-IN'
    ? `${totalDecisions} फैसले · ${goodChoices} सही · ${badChoices} गलत`
    : uiLang === 'ta-IN'
    ? `${totalDecisions} முடிவுகள் · ${goodChoices} சரி · ${badChoices} தவறு`
    : `${totalDecisions} decisions · ${goodChoices} good · ${badChoices} costly`

  return (
    <div className="f-inset rounded-xl border-2 px-4 py-4 flex flex-col gap-3"
      style={{ borderColor: 'var(--wheat)' }}>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--wheat)' }}>
            {title}
          </div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{subtitle}</div>
        </div>
        {/* Score bar */}
        <div className="flex items-center gap-1 shrink-0">
          <div className="w-16 h-2 rounded-sm overflow-hidden" style={{ background: 'var(--bg-inset)', border: '1px solid var(--border)' }}>
            <div
              className="h-full"
              style={{
                width: `${totalDecisions > 0 ? (goodChoices / totalDecisions) * 100 : 0}%`,
                background: 'var(--green)',
                transition: 'width 0.6s ease',
              }}
            />
          </div>
          <span className="text-xs font-black tabular-nums" style={{ color: 'var(--green-light)' }}>
            {totalDecisions > 0 ? Math.round((goodChoices / totalDecisions) * 100) : 0}%
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border)' }} />

      {/* Insights */}
      <div className="flex flex-col gap-2.5">
        {autopsy.map((insight, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-2.5"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, duration: 0.3 }}
          >
            <span className="text-base shrink-0 mt-0.5">{insight.icon}</span>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-sub)' }}>
              {getInsightText(insight, uiLang)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
