// Core Scenario Engine deck for Faisla.
// This stays fully local and is loaded once on app start.

/**
 * @typedef {Object} PillarEffects
 * @property {number} family
 * @property {number} crops
 * @property {number} finance
 * @property {number} resilience
 */

/**
 * @typedef {Object} CardChoice
 * @property {string} label
 * @property {string} description
 */

/**
 * @typedef {Object} FaislaCard
 * @property {string} id
 * @property {'pre_sowing'|'sowing'|'growing'|'harvest'|'off_season'} seasonPhase
 * @property {string} title
 * @property {string} prompt
 * @property {CardChoice} left
 * @property {CardChoice} right
 * @property {PillarEffects} effectsLeft
 * @property {PillarEffects} effectsRight
 * @property {('elder'|'bank_mitr'|'scammer'|'self')} narrator
 * @property {string[]} tags
 * @property {string=} audioKey
 * @property {boolean=} endGame
 * @property {boolean=} triggerDebtTrap
 */

/** @type {FaislaCard[]} */
export const faislaDeck = [
  {
    id: 'loan_informal_vs_bank',
    seasonPhase: 'pre_sowing',
    title: 'Money for Seeds',
    prompt:
      'You need ₹40,000 for seeds and fertilizer. The village moneylender offers instant cash at 5% per month. The bank loan needs paperwork and a week of waiting.',
    left: {
      label: 'Take fast money from sahukar',
      description: 'No delay, but very high interest and pressure.',
    },
    right: {
      label: 'Wait for KCC/bank loan',
      description: 'Slower, but regulated interest and protections.',
    },
    effectsLeft: {
      family: 5,
      crops: 10,
      finance: -20,
      resilience: -10,
    },
    effectsRight: {
      family: -5,
      crops: 0,
      finance: 10,
      resilience: 15,
    },
    narrator: 'bank_mitr',
    tags: ['debt', 'credit', 'planning'],
    triggerDebtTrap: true,
    audioKey: 'pre_sowing.loan_choice',
  },
  {
    id: 'crop_insurance',
    seasonPhase: 'sowing',
    title: 'Crop Insurance Premium',
    prompt:
      'The krishi officer suggests buying crop insurance before sowing. Premium is ₹800 per acre. Last year you skipped it and monsoon was on time.',
    left: {
      label: 'Skip insurance, save money',
      description: 'Hope that weather stays normal again.',
    },
    right: {
      label: 'Pay premium, stay covered',
      description: 'Small cost now to avoid big loss later.',
    },
    effectsLeft: {
      family: 5,
      crops: 0,
      finance: 5,
      resilience: -20,
    },
    effectsRight: {
      family: 0,
      crops: 0,
      finance: -5,
      resilience: 15,
    },
    narrator: 'elder',
    tags: ['insurance', 'risk'],
    audioKey: 'sowing.insurance',
  },
  {
    id: 'fraud_otp_call',
    seasonPhase: 'growing',
    title: 'Fraud Call: Kisan Subsidy',
    prompt:
      'You get a call saying your Kisan subsidy will stop unless you share your ATM OTP “for verification”. The caller sounds urgent and official.',
    left: {
      label: 'Share OTP to keep subsidy',
      description: 'Trust the caller and protect the money.',
    },
    right: {
      label: 'Cut the call, visit bank',
      description: 'Never share OTP on phone.',
    },
    effectsLeft: {
      family: -25,
      crops: -5,
      finance: -30,
      resilience: -15,
    },
    effectsRight: {
      family: 5,
      crops: 0,
      finance: 10,
      resilience: 20,
    },
    narrator: 'scammer',
    tags: ['fraud_call', 'digital_safety'],
    audioKey: 'growing.fraud_otp',
    triggerDebtTrap: true,
  },
  {
    id: 'mandi_low_price',
    seasonPhase: 'harvest',
    title: 'Mandi Prices Crash',
    prompt:
      'Mandi price this week is very low due to oversupply. You can sell now or wait 2 weeks, but must arrange storage.',
    left: {
      label: 'Sell immediately at low price',
      description: 'Clear stock, avoid storage risk.',
    },
    right: {
      label: 'Store grain, wait for better rate',
      description: 'Spend on storage hoping prices recover.',
    },
    effectsLeft: {
      family: 0,
      crops: 0,
      finance: -10,
      resilience: -5,
    },
    effectsRight: {
      family: 0,
      crops: -5,
      finance: 10,
      resilience: 5,
    },
    narrator: 'self',
    tags: ['mandi', 'price_fluctuation'],
    audioKey: 'harvest.mandi_price',
  },
  {
    id: 'festival_spend_vs_savings',
    seasonPhase: 'off_season',
    title: 'Festival Spending',
    prompt:
      'Festival season is here. Children want new clothes and sweets. You planned to keep ₹10,000 aside for next season input cost.',
    left: {
      label: 'Spend most savings on festival',
      description: 'Make family happy today, worry later.',
    },
    right: {
      label: 'Limit spending, protect savings',
      description: 'Celebrate simply, secure next season.',
    },
    effectsLeft: {
      family: 20,
      crops: 0,
      finance: -20,
      resilience: -10,
    },
    effectsRight: {
      family: -5,
      crops: 0,
      finance: 15,
      resilience: 10,
    },
    narrator: 'elder',
    tags: ['savings', 'consumption'],
    audioKey: 'off_season.festival',
  },
  {
    id: 'health_emergency',
    seasonPhase: 'growing',
    title: 'Health Emergency at Home',
    prompt:
      'Your father suddenly falls ill. Private hospital asks for a large advance. Government hospital is farther and crowded but much cheaper.',
    left: {
      label: 'Go to private hospital now',
      description: 'Best care, but big bill and maybe loans.',
    },
    right: {
      label: 'Use govt hospital, manage delay',
      description: 'Cheaper, but more stress and waiting.',
    },
    effectsLeft: {
      family: 15,
      crops: -5,
      finance: -25,
      resilience: -10,
    },
    effectsRight: {
      family: 0,
      crops: 0,
      finance: 5,
      resilience: 10,
    },
    narrator: 'self',
    tags: ['health', 'shock_expense'],
  },
  {
    id: 'monsoon_delay',
    seasonPhase: 'sowing',
    title: 'Monsoon Delay',
    prompt:
      'Rain is delayed by two weeks. You can still sow high-risk, high-yield crop or switch to a more resilient but lower-profit variety.',
    left: {
      label: 'Stick to high-risk crop',
      description: 'Chase higher profit despite delay.',
    },
    right: {
      label: 'Switch to resilient crop',
      description: 'Accept lower profit for stability.',
    },
    effectsLeft: {
      family: 0,
      crops: -20,
      finance: 15,
      resilience: -10,
    },
    effectsRight: {
      family: 0,
      crops: 10,
      finance: -5,
      resilience: 15,
    },
    narrator: 'elder',
    tags: ['monsoon', 'risk'],
  },
  {
    id: 'input_shop_credit',
    seasonPhase: 'pre_sowing',
    title: 'Input Shop Credit',
    prompt:
      'Local agri shop offers seeds and fertilizer on “udhaar” if you promise to sell harvest through them at a fixed lower price.',
    left: {
      label: 'Accept shop credit tie-up',
      description: 'Easy inputs now, less freedom later.',
    },
    right: {
      label: 'Arrange cash elsewhere',
      description: 'More effort now, more options later.',
    },
    effectsLeft: {
      family: 5,
      crops: 5,
      finance: -15,
      resilience: -5,
    },
    effectsRight: {
      family: -5,
      crops: 0,
      finance: 10,
      resilience: 10,
    },
    narrator: 'bank_mitr',
    tags: ['debt', 'market_access'],
  },
  {
    id: 'self_help_group',
    seasonPhase: 'off_season',
    title: 'Join Self Help Group',
    prompt:
      'Women in your family are invited to a Self Help Group that encourages small monthly savings and gives low-interest loans.',
    left: {
      label: 'Ignore SHG, keep cash at home',
      description: 'Avoid meetings and paperwork.',
    },
    right: {
      label: 'Join SHG and start saving',
      description: 'Build small buffer and credit history.',
    },
    effectsLeft: {
      family: 0,
      crops: 0,
      finance: -5,
      resilience: -10,
    },
    effectsRight: {
      family: 10,
      crops: 0,
      finance: 10,
      resilience: 15,
    },
    narrator: 'bank_mitr',
    tags: ['savings', 'formal_credit'],
  },
  {
    id: 'end_of_year_review',
    seasonPhase: 'off_season',
    title: 'Year-End Review',
    prompt:
      'You look back at the whole year. Did savings grow? Are debts under control? Did the family feel secure?',
    left: {
      label: 'Ignore and repeat same pattern',
      description: 'Do not change anything next year.',
    },
    right: {
      label: 'Plan budget for next season',
      description: 'Write simple plan for expenses and savings.',
    },
    effectsLeft: {
      family: -10,
      crops: 0,
      finance: -10,
      resilience: -15,
    },
    effectsRight: {
      family: 10,
      crops: 0,
      finance: 10,
      resilience: 15,
    },
    narrator: 'self',
    tags: ['planning', 'reflection'],
    endGame: true,
  },
]

export function getShuffledDeck() {
  const copy = [...faislaDeck]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

