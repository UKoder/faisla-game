import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion' // eslint-disable-line no-unused-vars
import './index.css'
import { useGameStore } from './state/gameStore'
import { t } from './i18n/translations'
import { PillarsBar } from './components/PillarsBar'
import { DebtTrapVisualizer } from './components/DebtTrapVisualizer'
import { DecisionCard } from './components/DecisionCard'
import { NarratorHint } from './components/NarratorHint'

/* ─────────────────── LANG SWITCHER ─────────────────── */
const LANGS = [
  { code: 'en-IN', label: 'EN' },
  { code: 'hi-IN', label: 'हि' },
  { code: 'ta-IN', label: 'த' },
]

function LangSwitcher() {
  const uiLang    = useGameStore((s) => s.uiLang)
  const setUiLang = useGameStore((s) => s.setUiLang)

  return (
    <div className="flex gap-1">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setUiLang(code)}
          className="text-[11px] px-2.5 py-1 rounded font-bold transition"
          style={{
            background: uiLang === code ? 'rgba(201,145,58,0.2)' : 'rgba(255,255,255,0.04)',
            border: uiLang === code ? '1px solid rgba(201,145,58,0.5)' : '1px solid var(--border)',
            color: uiLang === code ? 'var(--accent-amber)' : 'var(--text-faint)',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

/* ─────────────────── LAYOUT ─────────────────── */
function AppLayout({ children }) {
  const uiLang = useGameStore((s) => s.uiLang)

  return (
    <div className="bg-animated min-h-screen w-full relative overflow-hidden" style={{ color: 'var(--text-primary)' }}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="relative z-10 w-full px-4 py-4 flex flex-col gap-4 max-w-5xl mx-auto">
        <header className="nm-card rounded-2xl px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-xl">🌾</span>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-widest uppercase" style={{ color: 'var(--accent-amber)' }}>
                Faisla
              </span>
              <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Farmer Decision Game</span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Language switcher */}
            <LangSwitcher />

            {/* Nav links */}
            <nav className="flex gap-2 text-xs">
              {[
                { to: '/',             key: 'nav_home' },
                { to: '/how-it-works', key: 'nav_learn' },
              ].map(({ to, key }) => (
                <NavLink
                  key={to}
                  to={to}
                  style={({ isActive }) => isActive
                    ? { background: 'var(--accent-green)', color: '#0e1209', padding: '6px 14px', borderRadius: '8px', fontWeight: 600 }
                    : { background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '6px 14px', borderRadius: '8px', fontWeight: 500 }
                  }
                >
                  {t(uiLang, key)}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1 nm-card rounded-2xl px-6 py-6 flex justify-center">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

/* ─────────────────── HOME ─────────────────── */
function HomeScreen() {
  const navigate    = useNavigate()
  const startNewRun = useGameStore((s) => s.startNewRun)
  const uiLang      = useGameStore((s) => s.uiLang)
  const T = (key) => t(uiLang, key)

  return (
    <motion.div
      className="flex flex-col gap-8 w-full"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
    >
      {/* Hero */}
      <div className="w-full rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, rgba(90,120,55,0.12) 0%, rgba(160,100,40,0.08) 100%)',
          border: '1px solid rgba(122,173,90,0.15)',
        }}
      >
        <div className="px-8 py-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md mb-5 text-xs font-semibold tracking-widest uppercase"
              style={{ background: 'rgba(122,173,90,0.1)', border: '1px solid rgba(122,173,90,0.25)', color: 'var(--accent-green)' }}>
              {T('home_badge')}
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-2" style={{ color: 'var(--accent-amber)' }}>
              {T('home_h1')}
            </h1>
            <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              {T('home_h2')}
            </h2>
            <p className="leading-relaxed text-sm max-w-lg mb-7" style={{ color: 'var(--text-muted)' }}>
              {T('home_desc')}
            </p>
            <button
              type="button"
              onClick={() => { startNewRun(); navigate('/play') }}
              className="btn-glow px-9 py-3.5 rounded-lg text-sm font-bold tracking-wide"
            >
              {T('home_cta')}
            </button>
          </div>
          <div className="flex-shrink-0 text-center">
            <div className="text-8xl mb-4">🌾</div>
            <div className="flex gap-2 justify-center">
              {['👨‍👩‍👧', '🌱', '💰', '🛡️'].map((icon, i) => (
                <div key={i} className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: '↔️', titleKey: 'feat_swipe_title',   descKey: 'feat_swipe_desc' },
          { icon: '⚖️', titleKey: 'feat_pillars_title', descKey: 'feat_pillars_desc' },
          { icon: '📴', titleKey: 'feat_offline_title', descKey: 'feat_offline_desc' },
          { icon: '🎓', titleKey: 'feat_real_title',    descKey: 'feat_real_desc' },
        ].map(({ icon, titleKey, descKey }) => (
          <div key={titleKey} className="rounded-xl px-4 py-4 flex flex-col gap-2"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
            <div className="text-2xl">{icon}</div>
            <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{T(titleKey)}</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{T(descKey)}</p>
          </div>
        ))}
      </div>

      {/* Scheme highlights */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-faint)' }}>
          {T('home_schemes_title')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
          {[
            { icon: '🏦', nameKey: 'scheme_kcc_name',   descKey: 'scheme_kcc_desc' },
            { icon: '🌧️', nameKey: 'scheme_pmfby_name', descKey: 'scheme_pmfby_desc' },
            { icon: '💵', nameKey: 'scheme_pmkisan_name',descKey: 'scheme_pmkisan_desc' },
            { icon: '🏪', nameKey: 'scheme_enam_name',  descKey: 'scheme_enam_desc' },
            { icon: '👩‍👩‍👧', nameKey: 'scheme_shg_name', descKey: 'scheme_shg_desc' },
            { icon: '🌱', nameKey: 'scheme_soil_name',  descKey: 'scheme_soil_desc' },
          ].map(({ icon, nameKey, descKey }) => (
            <div key={nameKey} className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}>
              <span className="text-xl shrink-0">{icon}</span>
              <div>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{T(nameKey)}</p>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{T(descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────── HELPERS ─────────────────── */
function formatSeasonsAndDays(totalDays) {
  return { seasons: Math.floor(totalDays / 365), days: totalDays % 365 }
}

function lossReasonKey(reason) {
  switch (reason) {
    case 'family_collapse':     return 'loss_family'
    case 'crops_collapse':      return 'loss_crops'
    case 'finance_collapse':    return 'loss_finance'
    case 'resilience_collapse': return 'loss_resilience'
    case 'year_complete':       return 'loss_year'
    default:                    return 'loss_default'
  }
}

function lossIcon(reason) {
  switch (reason) {
    case 'family_collapse':     return '👨‍👩‍👧'
    case 'crops_collapse':      return '🌾'
    case 'finance_collapse':    return '💸'
    case 'resilience_collapse': return '🛡️'
    case 'year_complete':       return '🏆'
    default:                    return '💔'
  }
}

/* ─────────────────── PLAY ─────────────────── */
function PlayScreen() {
  const {
    deck, currentIndex, metrics, inDebtTrap,
    gameOver, gameOverReason, day, seasonPhase,
    bestDaysSurvived, applyChoice, reset, uiLang,
  } = useGameStore()

  const T    = (key) => t(uiLang, key)
  const card = deck[currentIndex]
  const current = formatSeasonsAndDays(day)
  const best    = formatSeasonsAndDays(bestDaysSurvived ?? 0)
  const isWin   = gameOverReason === 'year_complete'

  // Localized card prompt
  function getCardPrompt(c) {
    if (!c) return ''
    if (uiLang === 'hi-IN' && c.prompt_hi) return c.prompt_hi
    if (uiLang === 'ta-IN' && c.prompt_ta) return c.prompt_ta
    return c.prompt ?? ''
  }

  if (gameOver) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center gap-5 w-full max-w-xl mx-auto"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        <div className={`w-full rounded-2xl px-8 py-8 text-center ${isWin ? 'nm-card-glow-green' : 'nm-card-glow-red'}`}>
          <div className="text-5xl mb-3">{lossIcon(gameOverReason)}</div>
          <h2 className="text-xl font-black mb-2" style={{ color: isWin ? 'var(--accent-green)' : 'var(--accent-red)' }}>
            {isWin ? T('play_season_complete') : T('play_game_over')}
          </h2>
          <p className="text-sm leading-relaxed max-w-sm mx-auto" style={{ color: 'var(--text-muted)' }}>
            {T(lossReasonKey(gameOverReason))}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-left max-w-xs mx-auto">
            <div className="rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
              <p className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--text-faint)' }}>{T('play_this_run')}</p>
              <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>S{current.seasons + 1} · D{current.days}</p>
            </div>
            <div className="rounded-xl px-4 py-3" style={{ background: 'rgba(122,173,90,0.07)', border: '1px solid rgba(122,173,90,0.25)' }}>
              <p className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--accent-green)' }}>{T('play_best_run')}</p>
              <p className="font-bold text-sm" style={{ color: 'var(--accent-green)' }}>S{best.seasons + 1} · D{best.days}</p>
            </div>
          </div>
        </div>
        <div className="w-full"><PillarsBar metrics={metrics} /></div>
        <button type="button" className="btn-glow px-10 py-3 rounded-lg text-sm font-bold" onClick={reset}>
          {T('play_try_again')}
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="relative flex flex-col md:flex-row gap-6 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <DebtTrapVisualizer active={inDebtTrap} />

      {/* Left sidebar */}
      <div className="md:w-64 flex flex-col gap-4 shrink-0">
        <div className="rounded-xl px-4 py-4"
          style={{ background: 'rgba(122,173,90,0.07)', border: '1px solid rgba(122,173,90,0.18)' }}>
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
              {T('play_season')} {current.seasons + 1}
              <span className="ml-2 text-xs font-normal" style={{ color: 'var(--text-muted)' }}>{T('play_day')} {current.days}</span>
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md phase-${seasonPhase}`}>
              {T(`phase_${seasonPhase}`)}
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {T('play_balance')}
          </p>
        </div>

        <PillarsBar metrics={metrics} />

        <div className="flex items-center justify-between text-xs px-1" style={{ color: 'var(--text-faint)' }}>
          <span>🏆 {T('play_best')}: S{best.seasons + 1} · D{best.days}</span>
          <span>{currentIndex + 1}/{deck.length}</span>
        </div>

        <NarratorHint card={card} />
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-start justify-center">
        <DecisionCard card={card} onChoice={applyChoice} localizedPrompt={getCardPrompt(card)} uiLang={uiLang} />
      </div>
    </motion.div>
  )
}

/* ─────────────────── LEARN ─────────────────── */
function HowItWorksScreen() {
  const uiLang = useGameStore((s) => s.uiLang)
  const T = (key) => t(uiLang, key)

  return (
    <motion.div
      className="flex flex-col gap-6 w-full"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
    >
      <div>
        <h2 className="text-2xl font-black mb-1" style={{ color: 'var(--accent-amber)' }}>{T('learn_title')}</h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{T('learn_subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {['learn_p1','learn_p2','learn_p3','learn_p4','learn_p5','learn_p6'].map((key, i) => {
          const icons = ['👨‍🌾','🃏','⚖️','📉','📴','🏛️']
          return (
            <div key={key} className="flex items-start gap-4 rounded-xl px-5 py-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
              <span className="text-xl shrink-0">{icons[i]}</span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{T(key)}</p>
            </div>
          )
        })}
      </div>

      <div className="rounded-xl px-6 py-5"
        style={{ background: 'rgba(122,173,90,0.06)', border: '1px solid rgba(122,173,90,0.2)' }}>
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--accent-green)' }}>
          {T('learn_pillars_title')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '👨‍👩‍👧', labelKey: 'pillar_family_label',     descKey: 'pillar_family_desc',     color: 'var(--accent-blue)'  },
            { icon: '🌾',     labelKey: 'pillar_crops_label',      descKey: 'pillar_crops_desc',      color: 'var(--accent-green)' },
            { icon: '💰',     labelKey: 'pillar_finance_label',    descKey: 'pillar_finance_desc',    color: 'var(--accent-amber)' },
            { icon: '🛡️',    labelKey: 'pillar_resilience_label', descKey: 'pillar_resilience_desc', color: '#a07850'             },
          ].map(({ icon, labelKey, descKey, color }) => (
            <div key={labelKey} className="text-center">
              <div className="text-3xl mb-1">{icon}</div>
              <p className="text-xs font-bold mb-0.5" style={{ color }}>{T(labelKey)}</p>
              <p className="text-[11px]" style={{ color: 'var(--text-faint)' }}>{T(descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────── ROOT ─────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/"             element={<HomeScreen />} />
          <Route path="/play"         element={<PlayScreen />} />
          <Route path="/how-it-works" element={<HowItWorksScreen />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}
