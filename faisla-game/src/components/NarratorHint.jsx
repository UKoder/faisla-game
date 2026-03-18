import { useState, useEffect } from 'react'
import { speak, stopSpeech, isTtsSupported, listVoices } from '../services/tts'
import { useGameStore } from '../state/gameStore'

const narratorMeta = {
  elder: {
    label: 'Wise Elder',
    tone: 'Shares long-term wisdom from experience.',
    icon: '🧓',
    cssClass: 'narrator-elder',
    textColor: 'var(--accent-amber)',
  },
  bank_mitr: {
    label: 'Bank Mitr',
    tone: 'Explains formal schemes and safe options.',
    icon: '🏦',
    cssClass: 'narrator-bank_mitr',
    textColor: 'var(--accent-green)',
  },
  scammer: {
    label: 'Scammer',
    tone: 'Sounds helpful, but is dangerous.',
    icon: '⚠️',
    cssClass: 'narrator-scammer',
    textColor: 'var(--accent-red)',
  },
  self: {
    label: 'Your Inner Voice',
    tone: 'Reminds you of your own experience.',
    icon: '💭',
    cssClass: 'narrator-self',
    textColor: 'var(--accent-blue)',
  },
}

const langLabel = {
  'en-IN': 'EN',
  'hi-IN': 'हि',
  'ta-IN': 'த',
}

const langSampleText = {
  'en-IN': 'You need money for seeds and fertilizer this season.',
  'hi-IN': 'आपको इस सीज़न बीज और खाद के लिए पैसों की ज़रूरत है।',
  'ta-IN': 'இந்த சீசனில் விதைகள் மற்றும் உரத்திற்கு பணம் தேவை.',
}

function getLocalizedPrompt(card, lang) {
  if (!card) return langSampleText[lang] ?? ''
  if (lang === 'hi-IN' && card.prompt_hi) return card.prompt_hi
  if (lang === 'ta-IN' && card.prompt_ta) return card.prompt_ta
  return card.prompt ?? ''
}

export function NarratorHint({ card }) {
  const meta       = narratorMeta[card?.narrator] ?? narratorMeta.self
  const ttsEnabled = useGameStore((s) => s.ttsEnabled)
  const ttsLang    = useGameStore((s) => s.ttsLang)
  const toggleTts  = useGameStore((s) => s.toggleTts)
  const setTtsLang = useGameStore((s) => s.setTtsLang)
  const [playing, setPlaying]     = useState(false)
  const [voices, setVoices]       = useState([])
  const [showDebug, setShowDebug] = useState(false)
  const supported = isTtsSupported()

  // Load voices — Chrome fires voiceschanged async
  useEffect(() => {
    function load() {
      const v = listVoices()
      if (v.length) setVoices(v)
    }
    load()
    window.speechSynthesis?.addEventListener('voiceschanged', load)
    return () => window.speechSynthesis?.removeEventListener('voiceschanged', load)
  }, [])

  // Stop when card changes
  useEffect(() => { stopSpeech(); setPlaying(false) }, [card?.id])
  // Stop when language changes
  useEffect(() => { stopSpeech(); setPlaying(false) }, [ttsLang])

  function handlePlay() {
    if (!supported || !ttsEnabled) return
    if (playing) { stopSpeech(); setPlaying(false); return }

    const text = getLocalizedPrompt(card, ttsLang)
    if (!text) return

    setPlaying(true)
    speak(text, { lang: ttsLang })
    const ms = Math.max(3000, (text.length / 12) * 1000)
    setTimeout(() => setPlaying(false), ms + 1000)
  }

  // Check if a Google online voice is available for the selected language
  const langPrefix = ttsLang.split('-')[0]
  const hasGoogleVoice = voices.some(
    (v) => v.toLowerCase().includes(langPrefix) && v.toLowerCase().includes('google')
  )
  const hasAnyVoice = voices.some((v) => v.toLowerCase().includes(langPrefix))
  // Show warning only for hi/ta when no matching voice found at all
  const noVoiceWarning = ttsEnabled && ttsLang !== 'en-IN' && voices.length > 0 && !hasAnyVoice

  return (
    <div className={`rounded-xl border px-3 py-3 ${meta.cssClass}`}>
      {/* Narrator row */}
      <div className="flex items-center gap-2.5 mb-2">
        <span className="text-lg shrink-0">{meta.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: meta.textColor }}>
            {meta.label}
          </div>
          <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{meta.tone}</div>
        </div>
      </div>

      {supported && (
        <div className="flex flex-col gap-2">
          {/* Controls row */}
          <div className="flex items-center gap-2 flex-wrap">
            <button type="button" onClick={toggleTts}
              className="text-[11px] px-2.5 py-1 rounded transition"
              style={{
                background: ttsEnabled ? 'rgba(122,173,90,0.12)' : 'rgba(255,255,255,0.04)',
                border: ttsEnabled ? '1px solid rgba(122,173,90,0.3)' : '1px solid var(--border)',
                color: ttsEnabled ? 'var(--accent-green)' : 'var(--text-faint)',
              }}>
              {ttsEnabled ? '🔊 On' : '🔇 Off'}
            </button>

            {ttsEnabled && (
              <div className="flex gap-1">
                {Object.entries(langLabel).map(([lang, label]) => (
                  <button key={lang} type="button" onClick={() => setTtsLang(lang)}
                    className="text-[11px] px-2 py-1 rounded font-bold transition"
                    style={{
                      background: ttsLang === lang ? 'rgba(201,145,58,0.2)' : 'rgba(255,255,255,0.04)',
                      border: ttsLang === lang ? '1px solid rgba(201,145,58,0.5)' : '1px solid var(--border)',
                      color: ttsLang === lang ? 'var(--accent-amber)' : 'var(--text-faint)',
                    }}>
                    {label}
                  </button>
                ))}
              </div>
            )}

            {ttsEnabled && card && (
              <button type="button" onClick={handlePlay}
                className="text-[11px] px-2.5 py-1 rounded transition"
                style={{
                  background: playing ? 'rgba(192,80,58,0.12)' : 'rgba(255,255,255,0.04)',
                  border: playing ? '1px solid rgba(192,80,58,0.3)' : '1px solid var(--border)',
                  color: playing ? 'var(--accent-red)' : 'var(--text-muted)',
                }}>
                {playing ? '⏹ Stop' : '▶ Read'}
              </button>
            )}

            <button type="button" onClick={() => setShowDebug(p => !p)}
              className="text-[10px] px-2 py-1 rounded"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text-faint)' }}
              title="Show available voices">
              🔍
            </button>
          </div>

          {/* Warning: no voice found for selected language */}
          {noVoiceWarning && (
            <div className="text-[10px] leading-snug px-2 py-1.5 rounded"
              style={{ background: 'rgba(201,145,58,0.1)', border: '1px solid rgba(201,145,58,0.3)', color: 'var(--accent-amber)' }}>
              ⚠️ No {ttsLang === 'hi-IN' ? 'Hindi' : 'Tamil'} voice found. Make sure Chrome has internet access — Google voices load online.
            </div>
          )}

          {/* Debug panel */}
          {showDebug && (
            <div className="text-[10px] leading-relaxed px-2 py-2 rounded max-h-40 overflow-y-auto"
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', color: 'var(--text-faint)', fontFamily: 'monospace' }}>
              <div className="font-bold mb-1" style={{ color: 'var(--text-muted)' }}>
                Voices loaded ({voices.length}):
              </div>
              {voices.length === 0 && <div>No voices yet — try clicking ▶ Read first.</div>}
              {voices.map((v, i) => {
                const isMatch = v.toLowerCase().includes(langPrefix)
                const isGoogle = v.toLowerCase().includes('google')
                return (
                  <div key={i} style={{
                    color: isMatch && isGoogle
                      ? 'var(--accent-green)'
                      : isMatch
                      ? 'var(--accent-amber)'
                      : 'var(--text-faint)',
                  }}>
                    {isMatch ? '→ ' : '  '}{v}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {!supported && (
        <p className="text-[11px] mt-1" style={{ color: 'var(--text-faint)' }}>
          Voice not supported in this browser.
        </p>
      )}
    </div>
  )
}
