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

/**
 * Derive 2-3 autopsy insights from the decision log.
 * Returns an array of { icon, text } objects.
 * @param {Array<{tags:string[], direction:string, delta:{family,crops,finance,resilience}}>} log
 * @param {string} reason  gameOverReason
 * @param {number} days    total days survived
 */
export function deriveAutopsy(log, reason, days) {
  if (!log || log.length === 0) return []

  const insights = []

  // Count informal-debt choices (left on debt/credit cards)
  const informalDebt = log.filter(
    (e) => e.direction === 'left' && (e.tags?.includes('debt') || e.tags?.includes('credit'))
  ).length
  if (informalDebt >= 2) {
    insights.push({
      icon: '💸',
      text: `You relied on informal loans ${informalDebt} times. High-interest debt quietly crushed your resilience.`,
      text_hi: `आपने ${informalDebt} बार अनौपचारिक कर्ज़ लिया। अधिक ब्याज वाले कर्ज़ ने चुपचाप आपका लचीलापन तोड़ दिया।`,
      text_ta: `நீங்கள் ${informalDebt} முறை அனுபவமற்ற கடன்களை நம்பினீர்கள். அதிக வட்டி கடன் உங்கள் நெகிழ்ச்சியை அமைதியாக நசுக்கியது.`,
    })
  }

  // Skipped insurance
  const skippedInsurance = log.filter(
    (e) => e.direction === 'left' && e.tags?.includes('insurance')
  ).length
  if (skippedInsurance > 0) {
    insights.push({
      icon: '🌧️',
      text: 'You skipped crop insurance. One bad monsoon with no cover can end a season instantly.',
      text_hi: 'आपने फसल बीमा छोड़ दिया। बिना कवर के एक खराब मानसून तुरंत मौसम खत्म कर सकता है।',
      text_ta: 'நீங்கள் பயிர் காப்பீட்டை தவிர்த்தீர்கள். காப்பீடு இல்லாமல் ஒரு மோசமான மழை உடனடியாக பருவத்தை முடிக்கும்.',
    })
  }

  // Fell for fraud
  const fraudChoices = log.filter(
    (e) => e.direction === 'left' && (e.tags?.includes('fraud_call') || e.tags?.includes('fraud'))
  ).length
  if (fraudChoices > 0) {
    insights.push({
      icon: '⚠️',
      text: 'You fell for a scam. Real government schemes never ask for OTPs or advance fees over the phone.',
      text_hi: 'आप एक धोखे में फंस गए। असली सरकारी योजनाएं कभी फोन पर OTP या अग्रिम शुल्क नहीं मांगतीं।',
      text_ta: 'நீங்கள் ஒரு மோசடியில் சிக்கினீர்கள். உண்மையான அரசு திட்டங்கள் ஒருபோதும் தொலைபேசியில் OTP அல்லது முன்பணம் கேட்காது.',
    })
  }

  // Ignored govt schemes
  const ignoredSchemes = log.filter(
    (e) => e.direction === 'left' && e.tags?.includes('govt_scheme')
  ).length
  if (ignoredSchemes >= 2) {
    insights.push({
      icon: '🏛️',
      text: `You skipped ${ignoredSchemes} government schemes. PM-KISAN, KCC, and PMFBY exist to protect farmers — use them.`,
      text_hi: `आपने ${ignoredSchemes} सरकारी योजनाएं छोड़ दीं। PM-KISAN, KCC और PMFBY किसानों की रक्षा के लिए हैं — इनका उपयोग करें।`,
      text_ta: `நீங்கள் ${ignoredSchemes} அரசு திட்டங்களை தவிர்த்தீர்கள். PM-KISAN, KCC மற்றும் PMFBY விவசாயிகளை பாதுகாக்க உள்ளன — அவற்றை பயன்படுத்துங்கள்.`,
    })
  }

  // Good savings habit
  const goodSavings = log.filter(
    (e) => e.direction === 'right' && (e.tags?.includes('savings') || e.tags?.includes('formal_credit'))
  ).length
  if (goodSavings >= 2 && reason === 'year_complete') {
    insights.push({
      icon: '✅',
      text: `You made ${goodSavings} smart savings decisions. That discipline is what separates surviving farmers from thriving ones.`,
      text_hi: `आपने ${goodSavings} स्मार्ट बचत निर्णय लिए। यही अनुशासन जीवित रहने वाले किसानों को फलने-फूलने वाले किसानों से अलग करता है।`,
      text_ta: `நீங்கள் ${goodSavings} சிறந்த சேமிப்பு முடிவுகள் எடுத்தீர்கள். அந்த ஒழுக்கமே உயிர்வாழும் விவசாயிகளை செழிக்கும் விவசாயிகளிடமிருந்து பிரிக்கிறது.`,
    })
  }

  // Festival overspend
  const festivalSpend = log.filter(
    (e) => e.direction === 'left' && e.tags?.includes('consumption')
  ).length
  if (festivalSpend > 0) {
    insights.push({
      icon: '🎉',
      text: "Festival spending drained your buffer. Celebrating simply keeps next season's seeds funded.",
      text_hi: 'त्योहार के खर्च ने आपका बफर खाली कर दिया। सादगी से मनाने से अगले सीज़न के बीज का पैसा बचता है।',
      text_ta: 'திருவிழா செலவு உங்கள் இருப்பை வடிகட்டியது. எளிமையாக கொண்டாடுவது அடுத்த பருவத்தின் விதை நிதியை பாதுகாக்கும்.',
    })
  }

  // Fallback if nothing specific triggered
  if (insights.length === 0) {
    const seasons = Math.floor(days / 365)
    insights.push({
      icon: '📋',
      text: `You survived ${seasons} season${seasons !== 1 ? 's' : ''}. Every decision you made was a lesson in real farm economics.`,
      text_hi: `आप ${seasons} मौसम${seasons !== 1 ? 'ों' : ''} तक टिके रहे। आपका हर फैसला असली खेती अर्थशास्त्र का एक सबक था।`,
      text_ta: `நீங்கள் ${seasons} பருவம் தப்பிப்பிழைத்தீர்கள். நீங்கள் எடுத்த ஒவ்வொரு முடிவும் உண்மையான விவசாய பொருளாதாரத்தில் ஒரு பாடம்.`,
    })
  }

  return insights.slice(0, 3)
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
  /** @type {Array<{tags:string[], direction:string, delta:object}>} */
  decisionLog: [],
  /** @type {Array<{icon:string, text:string, text_hi:string, text_ta:string}>} */
  autopsy: [],

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
      decisionLog: [],
      autopsy: [],
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
      bestDaysSurvived: get().bestDaysSurvived ?? 0,
      decisionLog: [],
      autopsy: [],
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

    // Append to decision log for end-of-run autopsy
    const newLog = [
      ...state.decisionLog,
      { tags: card.tags ?? [], direction, delta },
    ]

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
      decisionLog: newLog,
      autopsy: evaluation.gameOver
        ? deriveAutopsy(newLog, evaluation.reason ?? 'pillar_collapse', newDay)
        : state.autopsy,
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
      decisionLog: [],
      autopsy: [],
    })
  },
}))

