/**
 * Text-to-speech — Web Speech API, fully offline.
 *
 * Root cause of silence: getVoices() returns [] on first call in Chrome/Android
 * because voices load asynchronously. We wait for the voiceschanged event,
 * then cache the list so subsequent calls are instant.
 */

let cachedVoices = []

function loadVoices() {
  if (!window.speechSynthesis) return
  const list = window.speechSynthesis.getVoices()
  if (list.length) {
    cachedVoices = list
  } else {
    // Chrome fires voiceschanged once voices are ready
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      cachedVoices = window.speechSynthesis.getVoices()
    }, { once: true })
  }
}

// Kick off voice loading as soon as this module is imported
if (typeof window !== 'undefined') loadVoices()

function pickVoice(lang) {
  const voices = cachedVoices.length
    ? cachedVoices
    : window.speechSynthesis?.getVoices() ?? []

  // 1. Exact match  2. Same language prefix  3. Any voice
  return (
    voices.find((v) => v.lang === lang) ??
    voices.find((v) => v.lang.startsWith(lang.split('-')[0])) ??
    voices[0] ??
    null
  )
}

/**
 * Speak text aloud. Safe to call before voices are loaded — will still work
 * because the browser queues the utterance and resolves the voice internally.
 * @param {string} text
 * @param {{ lang?: string; rate?: number; pitch?: number }} opts
 */
export function speak(text, { lang = 'en-IN', rate = 0.9, pitch = 1 } = {}) {
  if (!text || !window.speechSynthesis) return

  // Cancel any ongoing speech first
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  utterance.rate = rate
  utterance.pitch = pitch

  const voice = pickVoice(lang)
  if (voice) utterance.voice = voice

  // Small delay lets cancel() fully flush before the new utterance starts
  // (fixes a known Chrome bug where cancel+speak in the same tick is silent)
  setTimeout(() => window.speechSynthesis.speak(utterance), 50)
}

export function stopSpeech() {
  window.speechSynthesis?.cancel()
}

export function isTtsSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}
