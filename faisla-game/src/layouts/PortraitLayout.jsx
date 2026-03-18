/**
 * Portrait layout — warm neumorphic soil/wheat theme.
 * Single-column, max-w-md, designed for mobile portrait.
 */
import { useEffect } from 'react'
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
    <div data-theme={lightMode ? 'light' : 'dark'} className="portrait-shell p-bg-field">
      <div className="p-orb p-orb-1" />
      <div className="p-orb p-orb-2" />
      <div className="p-orb p-orb-3" />

      <div className="relative z-10 w-full max-w-md px-4 py-4 flex flex-col gap-4">
        <header className="p-nm-card rounded-3xl px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌾</span>
            <div className="flex flex-col leading-none">
              <span className="text-base font-black tracking-[0.2em] uppercase"
                style={{ background: 'linear-gradient(90deg,#d4a843,#f0c96a,#4caf50)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Faisla
              </span>
              <span className="text-xs tracking-widest uppercase mt-0.5" style={{ color: 'var(--p-text-muted)' }}>
                Farmer decision game
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={toggleLightMode}
              className="p-nm-btn w-9 h-9 rounded-full flex items-center justify-center text-base">
              {lightMode ? '🌙' : '☀️'}
            </button>
            <button type="button" onClick={toggleTts}
              className="p-nm-btn w-9 h-9 rounded-full flex items-center justify-center text-base">
              {ttsEnabled ? '🔊' : '🔇'}
            </button>
            <button type="button" onClick={togglePassAndPlay}
              title={passAndPlay ? 'Pass-and-Play ON' : 'Pass-and-Play OFF'}
              className="p-nm-btn w-9 h-9 rounded-full flex items-center justify-center text-base"
              style={passAndPlay ? {
                background: 'linear-gradient(135deg,#d4a843,#f0c96a)',
                border: '1px solid rgba(212,168,67,0.8)',
                boxShadow: '0 0 16px rgba(212,168,67,0.45)',
              } : {}}>
              👨‍👩‍👧
            </button>
          </div>
        </header>

        <nav className="p-nm-card rounded-2xl px-3 py-2 flex gap-2 justify-center">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) =>
                `nav-pill flex-1 text-center px-2 py-1.5 rounded-xl text-xs font-bold tracking-wide ${
                  isActive ? 'p-btn-wheat' : 'p-nm-btn'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 p-nm-card rounded-3xl px-5 py-5 flex justify-center">
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
      <div className="p-nm-glow-wheat rounded-3xl px-5 py-5 text-center">
        <div className="text-5xl mb-3" style={{ display: 'inline-block', animation: 'bounce 2.5s ease-in-out infinite' }}>🚜</div>
        <h1 className="text-xl font-black leading-snug"
          style={{ background: 'linear-gradient(90deg,#d4a843,#f0c96a,#8bc34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {T('home_h1')}
        </h1>
        <h1 className="text-xl font-black leading-snug" style={{ color: 'var(--p-text-primary)' }}>
          {T('home_h2')}
        </h1>
        <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--p-text-muted)' }}>{T('home_desc')}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {features.map(({ icon, titleKey, descKey }) => (
          <div key={titleKey} className="p-feature-card p-nm-raised rounded-2xl px-4 py-4"
            style={{ border: '1px solid var(--p-border-wheat)' }}>
            <div className="text-2xl mb-2">{icon}</div>
            <p className="text-sm font-bold" style={{ color: 'var(--p-text-primary)' }}>{T(titleKey)}</p>
            <p className="mt-1 text-xs leading-snug" style={{ color: 'var(--p-text-muted)' }}>{T(descKey)}</p>
          </div>
        ))}
      </div>

      <button type="button"
        onClick={() => { startNewRun(); navigate('/play') }}
        className="p-btn-wheat w-full rounded-full py-3.5 text-sm tracking-wide">
        {T('home_cta')}
      </button>
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

  // Speak card prompt instantly on each new card
  useEffect(() => {
    if (!ttsEnabled || !card) return
    speak(getPrompt(card), { lang: ttsLang ?? uiLang })
    return () => stopSpeech()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card?.id, ttsEnabled, ttsLang, uiLang])

  // Stop speech immediately when game ends
  useEffect(() => {
    if (gameOver) stopSpeech()
  }, [gameOver])

  if (gameOver) {
    return (
      <motion.div className="flex flex-col gap-4 w-full" {...fadeUp}>
        <div className={`rounded-3xl px-5 py-5 text-center ${isWin ? 'p-nm-glow-green' : 'p-nm-glow-red'}`}>
          <div className="text-5xl mb-2">{lossIcon(gameOverReason)}</div>
          <h2 className={`text-lg font-black ${isWin ? 'text-green-500' : 'text-red-500'}`}>
            {isWin ? T('play_season_complete') : T('play_game_over')}
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed" style={{ color: 'var(--p-text-secondary)' }}>
            {T(lossReasonKey(gameOverReason))}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-left">
            <div className="p-nm-inset rounded-2xl px-4 py-3">
              <p className="text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--p-text-muted)' }}>{T('play_this_run')}</p>
              <p className="mt-1 font-black text-sm" style={{ color: 'var(--p-text-primary)' }}>S{cur.seasons+1} · D{cur.days}</p>
            </div>
            <div className="p-nm-inset rounded-2xl px-4 py-3" style={{ border: '1px solid rgba(76,175,80,0.25)' }}>
              <p className="text-xs uppercase tracking-widest font-bold text-green-600">{T('play_best_run')}</p>
              <p className="mt-1 font-black text-sm text-green-500">S{best.seasons+1} · D{best.days}</p>
            </div>
          </div>
        </div>
        <PillarsBar metrics={metrics} />
        <button type="button" className="p-btn-wheat w-full rounded-full py-3.5 text-sm" onClick={reset}>
          {T('play_try_again')}
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div className="relative flex flex-col gap-3 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <DebtTrapVisualizer active={inDebtTrap} />

      <div className="p-nm-raised rounded-2xl px-4 py-3" style={{ border: '1px solid var(--p-border-wheat)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌤️</span>
            <div>
              <span className="text-sm font-black" style={{ color: 'var(--p-text-primary)' }}>
                {T('play_season')} {cur.seasons+1}
              </span>
              <span className="text-xs ml-2" style={{ color: 'var(--p-text-muted)' }}>
                {T('play_day')} {cur.days}
              </span>
            </div>
          </div>
          <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full p-phase-${seasonPhase}`}>
            {T(`phase_${seasonPhase}`)}
          </span>
        </div>
        <p className="mt-1.5 text-xs" style={{ color: 'var(--p-text-muted)' }}>{T('play_balance')}</p>
      </div>

      <PillarsBar metrics={metrics} />
      <DecisionCard card={card} onChoice={proposeChoice} localizedPrompt={getPrompt(card)} uiLang={uiLang} />

      <div className="flex items-center justify-between text-xs px-1" style={{ color: 'var(--p-text-muted)' }}>
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
      <h2 className="text-lg font-black"
        style={{ background: 'linear-gradient(90deg,#d4a843,#8bc34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {T('learn_title')}
      </h2>
      <div className="space-y-2">
        {['learn_p1','learn_p2','learn_p3','learn_p4','learn_p5','learn_p6'].map((key, i) => {
          const icons = ['👨‍🌾','🃏','⚖️','📉','📴','🏛️']
          return (
            <motion.div key={key}
              className="p-feature-card p-nm-raised flex items-start gap-3 rounded-2xl px-3 py-3"
              style={{ border: '1px solid var(--p-border-wheat)' }}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
            >
              <span className="text-xl shrink-0">{icons[i]}</span>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--p-text-secondary)' }}>{T(key)}</p>
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
        <h2 className="text-lg font-black"
          style={{ background: 'linear-gradient(90deg,#d4a843,#8bc34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Language / भाषा / மொழி
        </h2>
        <p className="mt-1 text-xs" style={{ color: 'var(--p-text-muted)' }}>
          Changes both the UI text and voice language.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {options.map(({ code, name, native, icon, sample }) => {
          const active = uiLang === code
          return (
            <button key={code} type="button"
              onClick={() => { setUiLang(code); setTtsLang(code) }}
              className={`w-full text-left rounded-2xl px-4 py-4 transition-all duration-200 ${active ? 'p-nm-glow-wheat' : 'p-nm-raised p-feature-card'}`}
              style={{ border: active ? '1px solid rgba(212,168,67,0.5)' : '1px solid var(--p-border-wheat)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <span className="text-sm font-black" style={{ color: 'var(--p-text-primary)' }}>{name}</span>
                    <span className="ml-2 text-xs font-bold" style={{ color: 'var(--p-text-muted)' }}>{native}</span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? 'border-yellow-400' : 'border-gray-500'}`}>
                  {active && <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />}
                </div>
              </div>
              <p className="text-xs italic leading-snug" style={{ color: 'var(--p-text-secondary)' }}>"{sample}"</p>
              {active && (
                <div className="mt-2 text-xs font-bold" style={{ color: '#d4a843' }}>✓ Active</div>
              )}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
