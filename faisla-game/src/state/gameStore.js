import { create } from 'zustand'
import { getShuffledDeck } from '../scenarios/faislaDeck'
import { applyPillarEffects, evaluateGameState } from '../engine/consequences'
import { saveLastRun, loadLastRun, saveBestRun, loadBestRun } from '../services/storage'

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
  lightMode: false,

  toggleTts() {
    set((s) => ({ ttsEnabled: !s.ttsEnabled }))
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

    const newMetrics = applyPillarEffects(state.metrics, delta)
    const evaluation = evaluateGameState(newMetrics, card)

    const nextIndex = state.currentIndex + 1
    const hasNext = nextIndex < state.deck.length
    const nextCard = hasNext ? state.deck[nextIndex] : getShuffledDeck()[0]

    const dayIncrement = 30 + Math.floor(Math.random() * 31) // 30–60 days
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
    }

    // If game over, update best score
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

