import { create } from 'zustand'
import { getShuffledDeck, faislaDeck } from '../scenarios/faislaDeck'
import { buildPersonalizedDeck } from '../scenarios/cropDecks'
import { applyPillarEffects, evaluateGameState } from '../engine/consequences'
import { saveLastRun, loadLastRun, saveBestRun, loadBestRun } from '../services/storage'
import { isBadChoice, vibrateError, vibrateSuccess } from '../services/haptics'

const initialMetrics = {
  family: 60,
  crops: 60,
  finance: 60,
  resilience: 60,
}

function inferSeasonPhase(day) {
  const dayInYear = day % 365
  if (dayInYear <= 90) return 'pre_sowing'
  if (dayInYear <= 150) return 'sowing'
  if (dayInYear <= 270) return 'growing'
  if (dayInYear <= 330) return 'harvest'
  return 'off_season'
}

export const useGameStore = create((set, get) => ({
  day: 1,
  seasonPhase: 'pre_sowing',
  deck: getShuffledDeck(),
  currentIndex: 0,
  metrics: initialMetrics,
  inDebtTrap: false,
  gameOver: false,
  gameOverReason: null,
  bestDaysSurvived: 0,
  ttsEnabled: true,
  ttsLang: 'en-IN',
  uiLang: 'en-IN',
  lightMode: false,
  passAndPlay: false,
  pendingChoice: null,
  choiceRejected: false,
  /** @type {{ name: string, crops: string[], acreage: number } | null} */
  farmerProfile: null,

  toggleTts() {
    set((s) => ({ ttsEnabled: !s.ttsEnabled }))
  },

  togglePassAndPlay() {
    set((s) => ({ passAndPlay: !s.passAndPlay, pendingChoice: null }))
    try {
      const next = !get().passAndPlay
      localStorage.setItem('faisla_passAndPlay', String(next))
    } catch {}
  },

  setFarmerProfile(profile) {
    set({ farmerProfile: profile })
    try { localStorage.setItem('faisla_farmerProfile', JSON.stringify(profile)) } catch {}
  },

  startPersonalizedRun(profile) {
    const deck = buildPersonalizedDeck(profile.crops, [...faislaDeck])
    set({
      farmerProfile: profile,
      day: 1,
      seasonPhase: 'pre_sowing',
      deck,
      currentIndex: 0,
      metrics: initialMetrics,
      inDebtTrap: false,
      gameOver: false,
      gameOverReason: null,
      bestDaysSurvived: get().bestDaysSurvived ?? 0,
    })
    try { localStorage.setItem('faisla_farmerProfile', JSON.stringify(profile)) } catch {}
  },

  /**
   * P1 proposes a choice. In pass-and-play mode this sets pendingChoice
   * and waits for P2 to confirm or reject. In solo mode it applies immediately.
   */
  proposeChoice(direction) {
    const { passAndPlay } = get()
    if (passAndPlay) {
      set({ pendingChoice: direction })
    } else {
      get().applyChoice(direction)
    }
  },

  /** P2 rejects the pending choice — animates card back, then clears state. */
  rejectChoice() {
    set({ pendingChoice: null, choiceRejected: true })
    // Give the card's spring animation time to complete, then clear the flag
    setTimeout(() => set({ choiceRejected: false }), 600)
  },

  setTtsLang(lang) {
    set({ ttsLang: lang })
    try { localStorage.setItem('faisla_ttsLang', lang) } catch {}
  },

  setUiLang(lang) {
    set({ uiLang: lang })
    try { localStorage.setItem('faisla_uiLang', lang) } catch {}
  },

  toggleLightMode() {
    set((s) => {
      const next = !s.lightMode
      try { localStorage.setItem('faisla_lightMode', String(next)) } catch {}
      return { lightMode: next }
    })
  },

  startNewRun() {
    set({
      day: 1,
      seasonPhase: 'pre_sowing',
      deck: getShuffledDeck(),
      currentIndex: 0,
      metrics: initialMetrics,
      inDebtTrap: false,
      gameOver: false,
      gameOverReason: null,
      // keep bestDaysSurvived from previous runs
      bestDaysSurvived: get().bestDaysSurvived ?? 0,
    })
  },

  async hydrateFromStorage() {
    const [stored, best] = await Promise.all([
      loadLastRun(),
      loadBestRun(),
    ])
    if (stored) {
      set({
        ...stored,
        gameOver: false,
        gameOverReason: null,
      })
    }
    if (best?.bestDaysSurvived !== undefined) {
      set({ bestDaysSurvived: best.bestDaysSurvived })
    }
    // Restore light mode preference
    try {
      const lm = localStorage.getItem('faisla_lightMode')
      if (lm !== null) set({ lightMode: lm === 'true' })
    } catch {}
    // Restore TTS language preference
    try {
      const lang = localStorage.getItem('faisla_ttsLang')
      if (lang) set({ ttsLang: lang })
    } catch {}
    // Restore UI language preference
    try {
      const uiLang = localStorage.getItem('faisla_uiLang')
      if (uiLang) set({ uiLang })
    } catch {}
    // Restore pass-and-play preference
    try {
      const pap = localStorage.getItem('faisla_passAndPlay')
      if (pap !== null) set({ passAndPlay: pap === 'true' })
    } catch {}
    // Restore farmer profile
    try {
      const fp = localStorage.getItem('faisla_farmerProfile')
      if (fp) set({ farmerProfile: JSON.parse(fp) })
    } catch {}
  },

  /**
   * Apply a choice for the current card ('left' or 'right').
   * Handles consequences, game over, and moving to the next card.
   * @param {'left'|'right'} direction
   */
  applyChoice(direction) {
    const state = get()
    if (state.gameOver) return

    const card = state.deck[state.currentIndex]
    if (!card) return

    const delta =
      direction === 'left' ? card.effectsLeft ?? initialMetrics : card.effectsRight ?? initialMetrics

    // Haptic feedback — buzz on bad choices
    if (isBadChoice(delta)) {
      vibrateError()
    } else {
      vibrateSuccess()
    }

    const newMetrics = applyPillarEffects(state.metrics, delta)
    const evaluation = evaluateGameState(newMetrics, card)

    const nextIndex = state.currentIndex + 1
    const hasNext = nextIndex < state.deck.length
    const nextCard = hasNext ? state.deck[nextIndex] : getShuffledDeck()[0]

    const dayIncrement = 30 + Math.floor(Math.random() * 31)
    const newDay = state.day + dayIncrement
    const nextState = {
      metrics: newMetrics,
      inDebtTrap: evaluation.debtTrap,
      gameOver: evaluation.gameOver,
      gameOverReason:
        evaluation.gameOver ? evaluation.reason ?? 'pillar_collapse' : null,
      currentIndex: evaluation.gameOver ? state.currentIndex : (hasNext ? nextIndex : 0),
      day: evaluation.gameOver ? newDay : newDay,
      seasonPhase: inferSeasonPhase(newDay),
      bestDaysSurvived: state.bestDaysSurvived,
      pendingChoice: null,
    }

    if (nextState.gameOver) {
      if (newDay > (state.bestDaysSurvived ?? 0)) {
        nextState.bestDaysSurvived = newDay
        saveBestRun({ bestDaysSurvived: newDay })
      }
    }

    set(nextState)
    saveLastRun({ ...state, ...nextState })
  },

  reset() {
    set({
      day: 1,
      seasonPhase: 'pre_sowing',
      deck: getShuffledDeck(),
      currentIndex: 0,
      metrics: initialMetrics,
      inDebtTrap: false,
      gameOver: false,
      gameOverReason: null,
      bestDaysSurvived: get().bestDaysSurvived ?? 0,
    })
  },
}))

