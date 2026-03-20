/**
 * Portrait layout — flat, high-contrast, outdoor-ready.
 * Single-column, max-w-md, designed for mobile portrait.
 */
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion' // eslint-disable-line no-unused-vars
import { useGameStore } from '../state/gameStore'
import { PillarsBar } from '../components/PillarsBar'
import { DebtTrapVisualizer } from '../components/DebtTrapVisualizer'
import { DecisionCard } from '../components/DecisionCard'
import { NarratorHint } from '../components/NarratorHint'
import { t } from '../i18n/translations'
import { speak, stopSpeech } from '../services/tts'
import { PassAndPlayOverlay } from '../components/PassAndPlayOverlay'
import { InstallPrompt } from '../components/InstallPrompt'
import { AutopsyReport } from '../components/AutopsyReport'

const fadeUp = {
  initial:    { opacity: 0, y: 18 },
  animate:    { opacity: 1, y: 0 },
  exit:       { opacity: 0, y: -18 },
  transition: { duration: 0.35, ease: 'easeOut' },
}

function formatSD(totalDays) {
  return { seasons: Math.floor(totalDays / 365), days: totalDays % 365 }
}
function lossReasonKey(r) {
  const m = { family_collapse:'loss_family', crops_collapse:'loss_crops', finance_collapse:'loss_finance', resilience_collapse:'loss_resilience', year_complete:'loss_year' }
  return m[r] ?? 'loss_default'
}
function lossIcon(r) {
  return { family_collapse:'👨‍👩‍👧', crops_collapse:'🌾', finance_collapse:'💸', resilience_collapse:'🛡️', year_complete:'🏆' }[r] ?? '💔'
}

/* ─── Shell ─── */
export function PortraitShell({ children }) {
  const { lightMode, toggleLightMode, ttsEnabled, toggleTts, uiLang, passAndPlay, togglePassAndPlay } = useGameStore()

  const navLinks = [
    { to: '/',             label: t(uiLang, 'nav_home') },
    { to: '/play',         label: t(uiLang, 'nav_play') },
    { to: '/how-it-works', label: t(uiLang, 'nav_learn') },
    { to: '/languages',    label: '🌐' },
  ]

  return (
    <div data-theme={lightMode ? 'light' : 'dark'} className="portrait-shell">
      <div className="w-full max-w-md px-4 py-4 flex flex-col gap-4">

        {/* Header */}
        <header className="f-card rounded-xl px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌾</span>
            <div className="flex flex-col leading-none">
              <span className="text-base font-black tracking-[0.2em] uppercase"
                style={{ color: 'var(--wheat)' }}>
                Faisla
              </span>
              <span className="text-xs tracking-widest uppercase mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Farmer decision game
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={toggleLightMode}
              className="btn-icon w-9 h-9 rounded-sm flex items-center justify-center text-base">
              {lightMode ? '🌙' : '☀️'}
            </button>
            <button type="button" onClick={toggleTts}
              className="btn-icon w-9 h-9 rounded-sm flex items-center justify-center text-base">
              {ttsEnabled ? '🔊' : '🔇'}
            </button>
            <button type="button" onClick={togglePassAndPlay}
              title={passAndPlay ? 'Pass-and-Play ON' : 'Pass-and-Play OFF'}
              className={`w-9 h-9 rounded-sm flex items-center justify-center text-base ${passAndPlay ? 'btn-icon-active' : 'btn-icon'}`}>
              👨‍👩‍👧
            </button>
          </div>
        </header>

        {/* Nav */}
        <nav className="f-card rounded-xl px-3 py-2 flex gap-2 justify-center">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) =>
                `nav-pill flex-1 text-center px-2 py-1.5 rounded-sm text-xs font-bold tracking-wide ${
                  isActive ? 'nav-pill-active' : ''
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Main */}
        <main className="flex-1 f-card rounded-xl px-4 py-4 flex justify-center">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

/* ─── Home ─── */
export function PortraitHome() {
  const navigate    = useNavigate()
  const startNewRun = useGameStore((s) => s.startNewRun)
  const uiLang      = useGameStore((s) => s.uiLang)
  const T = (k) => t(uiLang, k)

  const features = [
    { icon: '↔️', titleKey: 'feat_swipe_title',   descKey: 'feat_swipe_desc' },
    { icon: '⚖️', titleKey: 'feat_pillars_title', descKey: 'feat_pillars_desc' },
    { icon: '📴', titleKey: 'feat_offline_title', descKey: 'feat_offline_desc' },
    { icon: '🎓', titleKey: 'feat_real_title',    descKey: 'feat_real_desc' },
  ]

  return (
    <motion.div className="flex flex-col gap-4 w-full" {...fadeUp}>
      <div className="f-card-wheat rounded-xl px-5 py-5 text-center">
        <div className="text-5xl mb-3" style={{ display: 'inline-block', animation: 'bounce 2.5s ease-in-out infinite' }}>🚜</div>
        <h1 className="text-xl font-black leading-snug" style={{ color: 'var(--wheat)' }}>
          {T('home_h1')}
        </h1>
        <h1 className="text-xl font-black leading-snug" style={{ color: 'var(--text)' }}>
          {T('home_h2')}
        </h1>
        <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{T('home_desc')}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {features.map(({ icon, titleKey, descKey }) => (
          <div key={titleKey} className="f-raised rounded-xl px-4 py-4">
            <div className="text-2xl mb-2">{icon}</div>
            <p className="text-sm font-black" style={{ color: 'var(--text)' }}>{T(titleKey)}</p>
            <p className="mt-1 text-xs leading-snug" style={{ color: 'var(--text-muted)' }}>{T(descKey)}</p>
          </div>
        ))}
      </div>

      <button type="button"
        onClick={() => { startNewRun(); navigate('/play') }}
        className="btn-primary w-full rounded-sm py-3.5 text-sm tracking-wide">
        {T('home_cta')}
      </button>

      <InstallPrompt />
    </motion.div>
  )
}

/* ─── Play ─── */
export function PortraitPlay() {
  const {
    deck, currentIndex, metrics, inDebtTrap,
    gameOver, gameOverReason, day, seasonPhase,
    bestDaysSurvived, reset, uiLang, ttsEnabled, ttsLang,
    proposeChoice,
  } = useGameStore()

  const [pendingDelta, setPendingDelta] = useState(null)

  const T    = (k) => t(uiLang, k)
  const card = deck[currentIndex]
  const cur  = formatSD(day)
  const best = formatSD(bestDaysSurvived ?? 0)
  const isWin = gameOverReason === 'year_complete'

  function getPrompt(c) {
    if (!c) return ''
    if (uiLang === 'hi-IN' && c.prompt_hi) return c.prompt_hi
    if (uiLang === 'ta-IN' && c.prompt_ta) return c.prompt_ta
    return c.prompt ?? ''
  }

  useEffect(() => {
    if (!ttsEnabled || !card) return
    speak(getPrompt(card), { lang: ttsLang ?? uiLang })
    return () => stopSpeech()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card?.id, ttsEnabled, ttsLang, uiLang])

  useEffect(() => {
    if (gameOver) stopSpeech()
  }, [gameOver])

  if (gameOver) {
    return (
      <motion.div className="flex flex-col gap-4 w-full" {...fadeUp}>
        <div className={`rounded-xl px-5 py-5 text-center ${isWin ? 'f-card-green' : 'f-card-red'}`}>
          <div className="text-5xl mb-2">{lossIcon(gameOverReason)}</div>
          <h2 className="text-lg font-black" style={{ color: isWin ? 'var(--green-light)' : 'var(--red)' }}>
            {isWin ? T('play_season_complete') : T('play_game_over')}
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed" style={{ color: 'var(--text-sub)' }}>
            {T(lossReasonKey(gameOverReason))}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-left">
            <div className="f-inset rounded-xl px-4 py-3">
              <p className="text-xs uppercase tracking-widest font-black" style={{ color: 'var(--text-muted)' }}>{T('play_this_run')}</p>
              <p className="mt-1 font-black text-sm" style={{ color: 'var(--text)' }}>S{cur.seasons+1} · D{cur.days}</p>
            </div>
            <div className="f-inset rounded-xl px-4 py-3" style={{ borderColor: 'var(--green)' }}>
              <p className="text-xs uppercase tracking-widest font-black" style={{ color: 'var(--green)' }}>{T('play_best_run')}</p>
              <p className="mt-1 font-black text-sm" style={{ color: 'var(--green-light)' }}>S{best.seasons+1} · D{best.days}</p>
            </div>
          </div>
        </div>
        <PillarsBar metrics={metrics} />
        <AutopsyReport uiLang={uiLang} />
        <button type="button" className="btn-primary w-full rounded-sm py-3.5 text-sm" onClick={reset}>
          {T('play_try_again')}
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div className="relative flex flex-col gap-3 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <DebtTrapVisualizer active={inDebtTrap} />

      <div className="f-raised rounded-xl px-4 py-3" style={{ borderColor: 'var(--border-wheat)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌤️</span>
            <div>
              <span className="text-sm font-black" style={{ color: 'var(--text)' }}>
                {T('play_season')} {cur.seasons+1}
              </span>
              <span className="text-xs ml-2" style={{ color: 'var(--text-muted)' }}>
                {T('play_day')} {cur.days}
              </span>
            </div>
          </div>
          <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-sm phase-${seasonPhase}`}>
            {T(`phase_${seasonPhase}`)}
          </span>
        </div>
        <p className="mt-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>{T('play_balance')}</p>
      </div>

      <PillarsBar metrics={metrics} pendingDelta={pendingDelta} />
      <DecisionCard
        card={card}
        onChoice={proposeChoice}
        localizedPrompt={getPrompt(card)}
        uiLang={uiLang}
        onDeltaChange={setPendingDelta}
      />

      <div className="flex items-center justify-between text-xs px-1" style={{ color: 'var(--text-muted)' }}>
        <span>🏆 {T('play_best')}: S{best.seasons+1} · D{best.days}</span>
        <span>{currentIndex+1} / {deck.length}</span>
      </div>

      <NarratorHint card={card} />
      <PassAndPlayOverlay />
    </motion.div>
  )
}

/* ─── Learn ─── */
export function PortraitLearn() {
  const uiLang = useGameStore((s) => s.uiLang)
  const T = (k) => t(uiLang, k)

  return (
    <motion.div className="flex flex-col gap-4 w-full" {...fadeUp}>
      <h2 className="text-lg font-black" style={{ color: 'var(--wheat)' }}>
        {T('learn_title')}
      </h2>
      <div className="space-y-2">
        {['learn_p1','learn_p2','learn_p3','learn_p4','learn_p5','learn_p6'].map((key, i) => {
          const icons = ['👨‍🌾','🃏','⚖️','📉','📴','🏛️']
          return (
            <motion.div key={key}
              className="f-raised flex items-start gap-3 rounded-xl px-3 py-3"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
            >
              <span className="text-xl shrink-0">{icons[i]}</span>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-sub)' }}>{T(key)}</p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

/* ─── Languages ─── */
export function PortraitLanguages() {
  const { uiLang, setUiLang, setTtsLang } = useGameStore()
  const T = (k) => t(uiLang, k)

  const options = [
    { code: 'en-IN', name: 'English', native: 'English', icon: '🇮🇳', sample: 'You need money for seeds and fertilizer.' },
    { code: 'hi-IN', name: 'Hindi',   native: 'हिन्दी',  icon: '🇮🇳', sample: 'आपको बीज और खाद के लिए पैसों की ज़रूरत है।' },
    { code: 'ta-IN', name: 'Tamil',   native: 'தமிழ்',   icon: '🇮🇳', sample: 'உங்களுக்கு விதைகள் மற்றும் உரத்திற்கு பணம் தேவை.' },
  ]

  return (
    <motion.div className="flex flex-col gap-4 w-full" {...fadeUp}>
      <div>
        <h2 className="text-lg font-black" style={{ color: 'var(--wheat)' }}>
          Language / भाषा / மொழி
        </h2>
        <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
          Changes both the UI text and voice language.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {options.map(({ code, name, native, icon, sample }) => {
          const active = uiLang === code
          return (
            <button key={code} type="button"
              onClick={() => { setUiLang(code); setTtsLang(code) }}
              className={`w-full text-left rounded-xl px-4 py-4 ${active ? 'f-card-wheat' : 'f-raised'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <span className="text-sm font-black" style={{ color: 'var(--text)' }}>{name}</span>
                    <span className="ml-2 text-xs font-bold" style={{ color: 'var(--text-muted)' }}>{native}</span>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-sm border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: active ? 'var(--wheat)' : 'var(--border)' }}>
                  {active && <div className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--wheat)' }} />}
                </div>
              </div>
              <p className="text-xs italic leading-snug" style={{ color: 'var(--text-sub)' }}>"{sample}"</p>
              {active && (
                <div className="mt-2 text-xs font-black" style={{ color: 'var(--wheat)' }}>✓ Active</div>
              )}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
