/**
 * Landscape layout — same warm neumorphic theme as portrait, two-column layout.
 * max-w-6xl, designed for tablet/desktop landscape.
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
import { InstallPrompt } from '../components/InstallPrompt'

const fadeUp = {
  initial:    { opacity: 0, y: 16 },
  animate:    { opacity: 1, y: 0 },
  exit:       { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: 'easeOut' },
}

function formatSD(totalDays) {
  return { seasons: Math.floor(totalDays / 365), days: totalDays % 365 }
}
function lossReasonKey(r) {
  const m = {
    family_collapse:'loss_family', crops_collapse:'loss_crops',
    finance_collapse:'loss_finance', resilience_collapse:'loss_resilience', year_complete:'loss_year',
  }
  return m[r] ?? 'loss_default'
}
function lossIcon(r) {
  return { family_collapse:'👨‍👩‍👧', crops_collapse:'🌾', finance_collapse:'💸', resilience_collapse:'🛡️', year_complete:'🏆' }[r] ?? '💔'
}

/* ─── Shell ─── */
export function LandscapeShell({ children }) {
  const { lightMode, toggleLightMode, ttsEnabled, toggleTts, uiLang, passAndPlay, togglePassAndPlay } = useGameStore()

  const navLinks = [
    { to: '/',             label: t(uiLang, 'nav_home') },
    { to: '/play',         label: t(uiLang, 'nav_play') },
    { to: '/how-it-works', label: t(uiLang, 'nav_learn') },
    { to: '/setup',        label: '🌱' },
    { to: '/languages',    label: '🌐' },
  ]

  return (
    <div data-theme={lightMode ? 'light' : 'dark'} className="portrait-shell p-bg-field">
      <div className="p-orb p-orb-1" />
      <div className="p-orb p-orb-2" />
      <div className="p-orb p-orb-3" />

      <div className="relative z-10 w-full max-w-6xl px-6 py-5 flex flex-col gap-5 min-h-screen">
        <header className="p-nm-card rounded-2xl px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">🌾</span>
            <div className="flex flex-col leading-none">
              <span className="text-base font-black tracking-[0.2em] uppercase"
                style={{ color: '#f59e0b' }}>
                Faisla
              </span>
              <span className="text-xs tracking-widest uppercase mt-0.5" style={{ color: 'var(--p-text-muted)' }}>
                Farmer Decision Game
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
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
                background: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
                border: '1px solid rgba(245,158,11,0.8)',
                boxShadow: '0 0 16px rgba(245,158,11,0.45)',
              } : {}}>
              👨‍👩‍👧
            </button>

            <nav className="flex gap-2">
              {navLinks.map(({ to, label }) => (
                <NavLink key={to} to={to}
                  className={({ isActive }) =>
                    `nav-pill px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide ${isActive ? 'p-btn-wheat' : 'p-nm-btn'}`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1 p-nm-card rounded-2xl px-8 py-7 flex justify-center overflow-auto">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}


/* ─── Home ─── */
export function LandscapeHome() {
  const navigate    = useNavigate()
  const startNewRun = useGameStore((s) => s.startNewRun)
  const uiLang      = useGameStore((s) => s.uiLang)
  const T = (k) => t(uiLang, k)

  return (
    <motion.div className="flex flex-col gap-8 w-full" {...fadeUp}>
      <div className="w-full p-nm-glow-wheat rounded-2xl overflow-hidden">
        <div className="px-8 py-10 flex items-center gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md mb-5 text-xs font-semibold tracking-widest uppercase"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: 'var(--p-leaf)' }}>
              {T('home_badge')}
            </div>
            <h1 className="text-5xl font-black leading-tight mb-2"
              style={{ color: '#f59e0b' }}>
              {T('home_h1')}
            </h1>
            <h2 className="text-4xl font-black leading-tight mb-4" style={{ color: 'var(--p-text-primary)' }}>{T('home_h2')}</h2>
            <p className="leading-relaxed text-sm max-w-lg mb-7" style={{ color: 'var(--p-text-muted)' }}>{T('home_desc')}</p>
            <button type="button" onClick={() => { startNewRun(); navigate('/play') }}
              className="p-btn-wheat px-9 py-3.5 rounded-full text-sm tracking-wide">
              {T('home_cta')}
            </button>
            <button type="button" onClick={() => navigate('/setup')}
              className="p-nm-btn px-7 py-3 rounded-full text-sm tracking-wide"
              style={{ border: '1px solid rgba(16,185,129,0.4)', color: 'var(--p-leaf)' }}>
              🌱 My Farm
            </button>
          </div>
          <div className="shrink-0 text-center">
            <div className="text-8xl mb-4" style={{ display: 'inline-block', animation: 'bounce 2.5s ease-in-out infinite' }}>🚜</div>
            <div className="flex gap-2 justify-center">
              {['👨‍👩‍👧','🌱','💰','🛡️'].map((icon, i) => (
                <div key={i} className="w-11 h-11 rounded-xl flex items-center justify-center text-xl p-nm-raised"
                  style={{ border: '1px solid var(--p-border-wheat)' }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { icon:'↔️', tk:'feat_swipe_title',   dk:'feat_swipe_desc' },
          { icon:'⚖️', tk:'feat_pillars_title', dk:'feat_pillars_desc' },
          { icon:'📴', tk:'feat_offline_title', dk:'feat_offline_desc' },
          { icon:'🎓', tk:'feat_real_title',    dk:'feat_real_desc' },
        ].map(({ icon, tk, dk }) => (
          <div key={tk} className="p-feature-card p-nm-raised rounded-2xl px-4 py-4 flex flex-col gap-2"
            style={{ border: '1px solid var(--p-border-wheat)' }}>
            <div className="text-2xl">{icon}</div>
            <p className="font-semibold text-sm" style={{ color: 'var(--p-text-primary)' }}>{T(tk)}</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--p-text-muted)' }}>{T(dk)}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--p-text-muted)' }}>
          {T('home_schemes_title')}
        </h3>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { icon:'🏦', nk:'scheme_kcc_name',     dk:'scheme_kcc_desc' },
            { icon:'🌧️', nk:'scheme_pmfby_name',   dk:'scheme_pmfby_desc' },
            { icon:'💵', nk:'scheme_pmkisan_name',  dk:'scheme_pmkisan_desc' },
            { icon:'🏪', nk:'scheme_enam_name',     dk:'scheme_enam_desc' },
            { icon:'�‍👩‍👧', nk:'scheme_shg_name',  dk:'scheme_shg_desc' },
            { icon:'�', nk:'scheme_soil_name',     dk:'scheme_soil_desc' },
          ].map(({ icon, nk, dk }) => (
            <div key={nk} className="p-nm-raised flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ border: '1px solid var(--p-border-wheat)' }}>
              <span className="text-xl shrink-0">{icon}</span>
              <div>
                <p className="text-xs font-semibold" style={{ color: 'var(--p-text-primary)' }}>{T(nk)}</p>
                <p className="text-xs" style={{ color: 'var(--p-text-muted)' }}>{T(dk)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <InstallPrompt />
    </motion.div>
  )
}


/* ─── Play ─── */
export function LandscapePlay() {
  const {
    deck, currentIndex, metrics, inDebtTrap,
    gameOver, gameOverReason, day, seasonPhase,
    bestDaysSurvived, reset, uiLang, ttsEnabled, ttsLang,
    proposeChoice, farmerProfile,
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
      <motion.div className="flex flex-col items-center justify-center gap-5 w-full max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
        <div className={`w-full rounded-2xl px-8 py-8 text-center ${isWin ? 'p-nm-glow-green' : 'p-nm-glow-red'}`}>
          <div className="text-5xl mb-3">{lossIcon(gameOverReason)}</div>
          <h2 className={`text-xl font-black mb-2 ${isWin ? 'text-green-500' : 'text-red-500'}`}>
            {isWin ? T('play_season_complete') : T('play_game_over')}
          </h2>
          <p className="text-sm leading-relaxed max-w-sm mx-auto" style={{ color: 'var(--p-text-muted)' }}>
            {T(lossReasonKey(gameOverReason))}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-left max-w-xs mx-auto">
            <div className="p-nm-inset rounded-xl px-4 py-3">
              <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--p-text-muted)' }}>{T('play_this_run')}</p>
              <p className="font-bold text-sm" style={{ color: 'var(--p-text-primary)' }}>S{cur.seasons+1} · D{cur.days}</p>
            </div>
            <div className="p-nm-inset rounded-xl px-4 py-3" style={{ border: '1px solid rgba(16,185,129,0.25)' }}>
              <p className="text-xs uppercase tracking-widest font-bold mb-1 text-green-600">{T('play_best_run')}</p>
              <p className="font-bold text-sm text-green-500">S{best.seasons+1} · D{best.days}</p>
            </div>
          </div>
        </div>
        <PillarsBar metrics={metrics} />
        <button type="button" className="p-btn-wheat px-10 py-3 rounded-full text-sm" onClick={reset}>
          {T('play_try_again')}
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div className="relative flex gap-6 w-full"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <DebtTrapVisualizer active={inDebtTrap} />

      <div className="w-72 flex flex-col gap-4 shrink-0">
        {farmerProfile && (
          <div className="rounded-xl px-3 py-2 flex flex-wrap items-center gap-1.5 text-xs"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}>
            <span>👨‍🌾</span>
            <span style={{ color: 'var(--p-leaf)' }} className="font-bold">{farmerProfile.name}</span>
            <span style={{ color: 'var(--p-text-muted)' }}>{farmerProfile.acreage} acres</span>
            <span style={{ color: 'var(--p-text-muted)' }}>{farmerProfile.crops.join(', ')}</span>
          </div>
        )}
        <div className="p-nm-raised rounded-xl px-4 py-4" style={{ border: '1px solid var(--p-border-wheat)' }}>
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-sm" style={{ color: 'var(--p-text-primary)' }}>
              {T('play_season')} {cur.seasons+1}
              <span className="ml-2 text-xs font-normal" style={{ color: 'var(--p-text-muted)' }}>
                {T('play_day')} {cur.days}
              </span>
            </span>
            <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md p-phase-${seasonPhase}`}>
              {T(`phase_${seasonPhase}`)}
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--p-text-muted)' }}>{T('play_balance')}</p>
        </div>

        <PillarsBar metrics={metrics} />

        <div className="flex items-center justify-between text-xs px-1" style={{ color: 'var(--p-text-muted)' }}>
          <span>🏆 {T('play_best')}: S{best.seasons+1} · D{best.days}</span>
          <span>{currentIndex+1}/{deck.length}</span>
        </div>

        <NarratorHint card={card} />
      </div>

      <div className="flex-1 flex items-start justify-center pt-4">
        <DecisionCard card={card} onChoice={proposeChoice} localizedPrompt={getPrompt(card)} uiLang={uiLang} />
      </div>
      <PassAndPlayOverlay />
    </motion.div>
  )
}

/* ─── Learn ─── */
export function LandscapeLearn() {
  const uiLang = useGameStore((s) => s.uiLang)
  const T = (k) => t(uiLang, k)

  return (
    <motion.div className="flex flex-col gap-6 w-full" {...fadeUp}>
      <div>
        <h2 className="text-2xl font-black mb-1" style={{ color: '#f59e0b' }}>
          {T('learn_title')}
        </h2>
        <p className="text-sm" style={{ color: 'var(--p-text-muted)' }}>{T('learn_subtitle')}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {['learn_p1','learn_p2','learn_p3','learn_p4','learn_p5','learn_p6'].map((key, i) => {
          const icons = ['👨‍🌾','🃏','⚖️','📉','📴','🏛️']
          return (
            <div key={key} className="p-feature-card p-nm-raised flex items-start gap-4 rounded-xl px-5 py-4"
              style={{ border: '1px solid var(--p-border-wheat)' }}>
              <span className="text-xl shrink-0">{icons[i]}</span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--p-text-secondary)' }}>{T(key)}</p>
            </div>
          )
        })}
      </div>
            <div className="p-nm-raised rounded-xl px-6 py-5" style={{ border: '1px solid rgba(16,185,129,0.2)' }}>
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--p-leaf)' }}>
          {T('learn_pillars_title')}
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon:'👨‍👩‍👧', lk:'pillar_family_label',     dk:'pillar_family_desc',     color:'var(--p-sky)'   },
            { icon:'🌾',     lk:'pillar_crops_label',      dk:'pillar_crops_desc',      color:'var(--p-leaf)'  },
            { icon:'💰',     lk:'pillar_finance_label',    dk:'pillar_finance_desc',    color:'var(--p-wheat)' },
            { icon:'🛡️',    lk:'pillar_resilience_label', dk:'pillar_resilience_desc', color:'#a07850'        },
          ].map(({ icon, lk, dk, color }) => (
            <div key={lk} className="text-center">
              <div className="text-3xl mb-1">{icon}</div>
              <p className="text-xs font-bold mb-0.5" style={{ color }}>{T(lk)}</p>
              <p className="text-xs" style={{ color: 'var(--p-text-muted)' }}>{T(dk)}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Languages ─── */
export function LandscapeLanguages() {
  const { uiLang, setUiLang, setTtsLang } = useGameStore()

  const options = [
    { code: 'en-IN', name: 'English', native: 'English', icon: '🇮🇳', sample: 'You need money for seeds and fertilizer.' },
    { code: 'hi-IN', name: 'Hindi',   native: 'हिन्दी',  icon: '🇮🇳', sample: 'आपको बीज और खाद के लिए पैसों की ज़रूरत है।' },
    { code: 'ta-IN', name: 'Tamil',   native: 'தமிழ்',   icon: '🇮🇳', sample: 'உங்களுக்கு விதைகள் மற்றும் உரத்திற்கு பணம் தேவை.' },
  ]

  return (
    <motion.div className="flex flex-col gap-6 w-full max-w-2xl mx-auto" {...fadeUp}>
      <div>
        <h2 className="text-2xl font-black mb-1" style={{ color: '#f59e0b' }}>
          Language / भाषा / மொழி
        </h2>
        <p className="text-sm" style={{ color: 'var(--p-text-muted)' }}>Changes both the UI text and voice language.</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {options.map(({ code, name, native, icon, sample }) => {
          const active = uiLang === code
          return (
            <button key={code} type="button"
              onClick={() => { setUiLang(code); setTtsLang(code) }}
              className={`w-full text-left rounded-2xl px-5 py-5 transition-all duration-200 ${active ? 'p-nm-glow-wheat' : 'p-nm-raised p-feature-card'}`}
              style={{ border: active ? '1px solid rgba(245,158,11,0.5)' : '1px solid var(--p-border-wheat)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className="text-sm font-black" style={{ color: 'var(--p-text-primary)' }}>{name}</p>
                    <p className="text-xs" style={{ color: 'var(--p-text-muted)' }}>{native}</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${active ? 'border-yellow-400' : 'border-gray-500'}`}>
                  {active && <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />}
                </div>
              </div>
              <p className="text-xs italic leading-snug" style={{ color: 'var(--p-text-secondary)' }}>"{sample}"</p>
              {active && <div className="mt-2 text-xs font-bold" style={{ color: '#f59e0b' }}>✓ Active</div>}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
