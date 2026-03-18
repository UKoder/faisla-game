/**
 * Haptic feedback — uses navigator.vibrate (offline, no library needed).
 * Only fires on devices that support it (most Android phones).
 */

export function isHapticsSupported() {
  return typeof navigator !== 'undefined' && 'vibrate' in navigator
}

/**
 * Vibrate with a "bad choice" pattern — a sharp double-buzz that mimics a gut-punch.
 */
export function vibrateError() {
  if (!isHapticsSupported()) return
  navigator.vibrate([80, 60, 120])
}

/**
 * Short single buzz for a neutral/good confirmation.
 */
export function vibrateSuccess() {
  if (!isHapticsSupported()) return
  navigator.vibrate(40)
}

/**
 * Determine if a choice is "bad" based on the delta effects.
 * Bad = net pillar sum is negative, or finance drops by 15+, or any pillar drops by 20+.
 * @param {{ family: number; crops: number; finance: number; resilience: number }} delta
 */
export function isBadChoice(delta) {
  if (!delta) return false
  const net = (delta.family ?? 0) + (delta.crops ?? 0) + (delta.finance ?? 0) + (delta.resilience ?? 0)
  const bigFinanceDrop = (delta.finance ?? 0) <= -15
  const anyPillarCrash = Object.values(delta).some((v) => v <= -20)
  return net < -10 || bigFinanceDrop || anyPillarCrash
}
