/**
 * Clamp a numeric pillar between 0 and 100.
 * @param {number} value
 */
function clampPillar(value) {
  if (Number.isNaN(value)) return 0
  if (value < 0) return 0
  if (value > 100) return 100
  return Math.round(value)
}

/**
 * Apply pillar effects for a choice to the current metrics.
 * @param {{ family: number; crops: number; finance: number; resilience: number }} current
 * @param {{ family: number; crops: number; finance: number; resilience: number }} delta
 */
export function applyPillarEffects(current, delta) {
  return {
    family: clampPillar(current.family + (delta.family ?? 0)),
    crops: clampPillar(current.crops + (delta.crops ?? 0)),
    finance: clampPillar(current.finance + (delta.finance ?? 0)),
    resilience: clampPillar(current.resilience + (delta.resilience ?? 0)),
  }
}

/**
 * Determine if the game should end based on new metrics or card flags.
 * @param {{ family: number; crops: number; finance: number; resilience: number }} metrics
 * @param {{ endGame?: boolean; triggerDebtTrap?: boolean }} card
 */
export function evaluateGameState(metrics, card) {
  let gameOver = false
  let reason = null

  if (metrics.family <= 0) {
    gameOver = true
    reason = 'family_collapse'
  } else if (metrics.crops <= 0) {
    gameOver = true
    reason = 'crops_collapse'
  } else if (metrics.finance <= 0) {
    gameOver = true
    reason = 'finance_collapse'
  } else if (metrics.resilience <= 0) {
    gameOver = true
    reason = 'resilience_collapse'
  }

  const debtTrap = Boolean(card?.triggerDebtTrap) || metrics.finance <= 20

  return {
    gameOver,
    reason,
    debtTrap,
  }
}

