const LAST_RUN_KEY = 'faisla:lastRun'
const BEST_RUN_KEY = 'faisla:bestRun'

export async function saveLastRun(state) {
  try {
    const toStore = {
      day: state.day,
      seasonPhase: state.seasonPhase,
      metrics: state.metrics,
      deck: state.deck,
      currentIndex: state.currentIndex,
      inDebtTrap: state.inDebtTrap,
    }
    localStorage.setItem(LAST_RUN_KEY, JSON.stringify(toStore))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Failed to save run', err)
  }
}

export async function loadLastRun() {
  try {
    const raw = localStorage.getItem(LAST_RUN_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Failed to load run', err)
    return null
  }
}

export async function saveBestRun(best) {
  try {
    localStorage.setItem(BEST_RUN_KEY, JSON.stringify(best))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Failed to save best run', err)
  }
}

export async function loadBestRun() {
  try {
    const raw = localStorage.getItem(BEST_RUN_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Failed to load best run', err)
    return null
  }
}

