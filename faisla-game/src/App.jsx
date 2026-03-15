import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion' // eslint-disable-line no-unused-vars
import './index.css'
import { useGameStore } from './state/gameStore'
import { PillarsBar } from './components/PillarsBar'
import { DebtTrapVisualizer } from './components/DebtTrapVisualizer'
import { DecisionCard } from './components/DecisionCard'
import { NarratorHint } from './components/NarratorHint'

const phaseLabel = {
  pre_sowing: 'Pre-Sowing',
  sowing: 'Sowing',
  growing: 'Growing',
  harvest: 'Harvest',
  off_season: 'Off-Season',
}

function AppLayout({ children }) {
  return (
    <div className="bg-animated min-h-screen text-slate-100 flex justify-center relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="relative z-10 w-full max-w-sm px-3 py-3 flex flex-col gap-3">
        {/* Header */}
        <header className="nm-card rounded-3xl px-4 py-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-[0.25em] uppercase bg-gradient-to-r from-amber-300 to-lime-300 bg-clip-text text-transparent">
              Faisla
            </span>
            <span className="text-[10px] text-slate-400 tracking-wide">Farmer decision game</span>
          </div>
          <nav className="flex gap-1.5 text-[10px]">
            {[
              { to: '/', label: 'Home' },
              { to: '/play', label: 'Play' },
              { to: '/how-it-works', label: 'Learn' },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 py-1 rounded-full font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-300 to-lime-300 text-slate-900 shadow-md shadow-lime-500/30'
                      : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main className="flex-1 nm-card rounded-3xl px-4 py-4 flex justify-center">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

function HomeScreen() {
  const navigate = useNavigate()
  const startNewRun = useGameStore((s) => s.startNewRun)

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-4 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full rounded-3xl overflow-hidden relative"
        style={{
          background: 'linear-gradient(145deg, rgba(52,211,153,0.08), rgba(168,85,247,0.06), rgba(251,191,36,0.06))',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 0 60px rgba(52,211,153,0.06), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <div className="px-5 py-5">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">🌾</div>
            <h1 className="text-xl font-black leading-snug bg-gradient-to-r from-amber-300 via-lime-300 to-emerald-300 bg-clip-text text-transparent">
              Survive the season.
            </h1>
            <h1 className="text-xl font-black leading-snug text-white">
              Keep your farm out of debt.
            </h1>
            <p className="mt-2 text-[12px] text-slate-400 leading-relaxed">
              Every swipe is a real decision Indian farmers face across an agricultural year.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] mb-4">
            {[
              { icon: '↔️', title: 'Binary choices', desc: 'Swipe left or right on loans, insurance, mandi rates, and more.' },
              { icon: '⚖️', title: 'Four pillars', desc: 'Balance family, crops, finance, and resilience each day.' },
              { icon: '📴', title: 'Offline-first', desc: 'Works without internet. Add to Home Screen for app feel.' },
              { icon: '🎓', title: 'Real scenarios', desc: 'Based on actual financial decisions rural farmers face.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="rounded-2xl px-3 py-2.5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="text-base mb-1">{icon}</div>
                <p className="font-bold text-slate-200">{title}</p>
                <p className="mt-0.5 text-slate-500 text-[10px] leading-snug">{desc}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => { startNewRun(); navigate('/play') }}
            className="btn-glow w-full rounded-full py-3 text-sm font-black text-slate-900 tracking-wide"
          >
            🚜 Start New Season
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function formatSeasonsAndDays(totalDays) {
  const seasons = Math.floor(totalDays / 365)
  const days = totalDays % 365
  return { seasons, days }
}

function lossReasonMessage(reason) {
  switch (reason) {
    case 'family_collapse':    return 'Your family welfare dropped to zero — stress and hardship forced you to stop.'
    case 'crops_collapse':     return 'Your crops failed completely — the field could not sustain another season.'
    case 'finance_collapse':   return 'Your finances collapsed — debt and cash flow left the farm insolvent.'
    case 'resilience_collapse':return 'Your resilience ran out — repeated shocks left you unable to recover.'
    case 'year_complete':      return 'You completed a full farming year. Few farmers manage such balance.'
    case 'pillar_collapse':    return 'One of your key pillars hit zero and the farm could not continue.'
    default:                   return 'Your farm could not continue this season.'
  }
}

function lossIcon(reason) {
  switch (reason) {
    case 'family_collapse':    return '👨‍👩‍👧'
    case 'crops_collapse':     return '🌾'
    case 'finance_collapse':   return '💸'
    case 'resilience_collapse':return '🛡️'
    case 'year_complete':      return '🏆'
    default:                   return '💔'
  }
}

function PlayScreen() {
  const {
    deck, currentIndex, metrics, inDebtTrap,
    gameOver, gameOverReason, day, seasonPhase,
    bestDaysSurvived, applyChoice, reset,
  } = useGameStore()

  const card = deck[currentIndex]
  const current = formatSeasonsAndDays(day)
  const best = formatSeasonsAndDays(bestDaysSurvived ?? 0)
  const isWin = gameOverReason === 'year_complete'

  if (gameOver) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center gap-4 w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className={`w-full rounded-3xl px-5 py-5 text-center ${isWin ? 'nm-card-glow-green' : 'nm-card-glow-red'}`}
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <div className="text-5xl mb-2">{lossIcon(gameOverReason)}</div>
          <h2 className={`text-lg font-black ${isWin ? 'text-emerald-300' : 'text-red-300'}`}>
            {isWin ? 'Season Complete!' : 'Game Over'}
          </h2>
          <p className="mt-1.5 text-[12px] text-slate-400 leading-relaxed">
            {lossReasonMessage(gameOverReason)}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 text-left">
            <div className="rounded-2xl px-3 py-2.5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">This run</p>
              <p className="mt-1 font-black text-slate-200 text-sm">
                Season: {current.seasons + 1} , Days: {current.days}
              </p>
            </div>
            <div className="rounded-2xl px-3 py-2.5"
              style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.2)' }}
            >
              <p className="text-[9px] uppercase tracking-widest text-emerald-500 font-bold">Best run</p>
              <p className="mt-1 font-black text-emerald-300 text-sm">
                Season: {best.seasons + 1} , Days: {best.days}
              </p>
            </div>
          </div>
        </div>

        <PillarsBar metrics={metrics} />

        <button
          type="button"
          className="btn-glow w-full rounded-full py-3 text-sm font-black text-slate-900"
          onClick={reset}
        >
          🔄 Try Again
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="relative flex flex-col gap-3 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <DebtTrapVisualizer active={inDebtTrap} />

      {/* Season header */}
      <div className="rounded-2xl px-4 py-3"
        style={{
          background: 'linear-gradient(135deg, rgba(52,211,153,0.08), rgba(168,85,247,0.05))',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black text-white">
              Season {current.seasons + 1}
            </span>
            <span className="text-[10px] text-slate-500 ml-1.5">
              Day {current.days}
            </span>
          </div>
          <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full phase-${seasonPhase}`}>
            {phaseLabel[seasonPhase] ?? seasonPhase}
          </span>
        </div>
        <p className="mt-1 text-[10px] text-slate-500">
          Keep family, field, money, and safety in balance.
        </p>
      </div>

      <PillarsBar metrics={metrics} />

      <DecisionCard card={card} onChoice={applyChoice} />

      <div className="flex items-center justify-between text-[10px] text-slate-600">
        <span>🏆 Best: S{best.seasons + 1} · D{best.days}</span>
        <span>{currentIndex + 1}/{deck.length} cards</span>
      </div>

      <NarratorHint narrator={card?.narrator} audioKey={card?.audioKey} />
    </motion.div>
  )
}

function HowItWorksScreen() {
  return (
    <motion.div
      className="flex flex-col gap-4 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-lg font-black bg-gradient-to-r from-amber-300 to-lime-300 bg-clip-text text-transparent">
        How Faisla works
      </h2>
      <div className="space-y-2.5">
        {[
          { icon: '👨‍🌾', text: 'You play as a small Indian farmer across one agricultural year.' },
          { icon: '🃏', text: 'Each card is a real decision: loan offers, insurance, mandi prices, fraud calls, and more.' },
          { icon: '⚖️', text: 'Every swipe changes four pillars: Family Welfare, Crop Health, Financial Standing, and Risk Resilience.' },
          { icon: '📉', text: 'If any pillar collapses, the season ends — but you keep the learning, not the loss.' },
          { icon: '📴', text: 'Fully offline-first. Your progress is saved locally. No account needed.' },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-start gap-3 rounded-2xl px-3 py-2.5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <span className="text-lg shrink-0">{icon}</span>
            <p className="text-[12px] text-slate-300 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/play" element={<PlayScreen />} />
          <Route path="/how-it-works" element={<HowItWorksScreen />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}
