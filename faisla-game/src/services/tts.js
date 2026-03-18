/**
 * Text-to-speech — Web Speech API, fully offline.
 * Supports en-IN, hi-IN, ta-IN.
 *
 * Key fixes:
 * - Chrome loads voices asynchronously. We wait for voiceschanged before speaking.
 * - If voices aren't ready yet, we queue the utterance and fire after voiceschanged.
 * - Always set utterance.lang so the browser picks the right voice even without explicit voice assignment.
 * - pickVoice tries exact → region → prefix match, falls back to null (browser default).
 */

let cachedVoices = []
let pendingUtterance = null   // queued utterance waiting for voices to load

function refreshVoices() {
  if (!window.speechSynthesis) return
  const list = window.speechSynthesis.getVoices()
  if (list.length) cachedVoices = list
}

function onVoicesChanged() {
  refreshVoices()
  // Fire any queued utterance now that voices are available
  if (pendingUtterance) {
    const u = pendingUtterance
    pendingUtterance = null
    const voice = pickVoice(u.lang)
    if (voice) u.voice = voice
    setTimeout(() => window.speechSynthesis?.speak(u), 50)
  }
}

if (typeof window !== 'undefined') {
  refreshVoices()
  window.speechSynthesis?.addEventListener('voiceschanged', onVoicesChanged)
}

/**
 * Find the best available voice for a given BCP-47 lang tag.
 * @param {string} lang  e.g. 'hi-IN', 'ta-IN', 'en-IN'
 * @returns {SpeechSynthesisVoice|null}
 */
function pickVoice(lang) {
  refreshVoices()
  const voices = cachedVoices
  if (!voices.length) return null

  const langLower    = lang.toLowerCase()
  const prefix       = langLower.split('-')[0]      // 'hi', 'ta', 'en'
  const regionSuffix = langLower.split('-')[1] ?? '' // 'in'

  // 1. Exact match
  const exact = voices.find((v) => v.lang.toLowerCase() === langLower)
  if (exact) return exact

  // 2. Same language + same region prefix
  const sameRegion = voices.find(
    (v) => v.lang.toLowerCase().startsWith(prefix + '-' + regionSuffix)
  )
  if (sameRegion) return sameRegion

  // 3. Same language prefix only
  const samePrefix = voices.find((v) => v.lang.toLowerCase().startsWith(prefix))
  if (samePrefix) return samePrefix

  return null
}

/**
 * Speak text aloud in the given language.
 * If voices haven't loaded yet, queues the utterance until voiceschanged fires.
 * @param {string} text
 * @param {{ lang?: string; rate?: number; pitch?: number }} opts
 */
export function speak(text, { lang = 'en-IN', rate = 0.9, pitch = 1 } = {}) {
  if (!text || !window.speechSynthesis) return

  window.speechSynthesis.cancel()
  pendingUtterance = null

  const utterance  = new SpeechSynthesisUtterance(text)
  utterance.lang   = lang
  utterance.rate   = rate
  utterance.pitch  = pitch

  refreshVoices()

  if (cachedVoices.length === 0) {
    // Voices not ready yet — queue and wait for voiceschanged
    pendingUtterance = utterance
    return
  }

  const voice = pickVoice(lang)
  if (voice) utterance.voice = voice

  // 60ms gap lets cancel() flush (fixes Chrome silent-after-cancel bug)
  setTimeout(() => window.speechSynthesis?.speak(utterance), 60)
}

export function stopSpeech() {
  pendingUtterance = null
  window.speechSynthesis?.cancel()
}

export function isTtsSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/**
 * Returns list of available voices for debugging.
 * Useful to check if hi-IN / ta-IN voices are installed on the device.
 */
export function listVoices() {
  refreshVoices()
  return cachedVoices.map((v) => `${v.name} (${v.lang})`)
}
