import { useState, useEffect } from 'react'
import { speak, stopSpeech, isTtsSupported, listVoices } from '../services/tts'
import { useGameStore } from '../state/gameStore'

const narratorMeta = {
  elder: {
    label: 'Wise Elder', tone: 'Shares long-term wisdom from experience.',
    icon: '🧓', cssClass: 'p-narrator-elder', color: 'var(--p-wheat)',
  },
  bank_mitr: {
    label: 'Bank Mitr', tone: 'Explains formal schemes and safe options.',
    icon: '🏦', cssClass: 'p-narrator-bank_mitr', color: 'var(--p-leaf)',
  },
  scammer: {
    label: 'Scammer', tone: 'Sounds helpful, but is dangerous.',
    icon: '⚠️', cssClass: 'p-narrator-scammer', color: '#ef4444',
  },
  self: {
    label: 'Your Inner Voice', tone: 'Reminds you of your own experience.',
    icon: '💭', cssClass: 'p-narrator-self', color: 'var(--p-sky)',
  },
}

function getLocalizedPrompt(card, lang) {
  if (!card) return ''
  if (lang === 'hi-IN' && card.prompt_hi) return card.prompt_hi
  if (lang === 'ta-IN' && card.prompt_ta) return card.prompt_ta
  return card.prompt ?? ''
}

export function NarratorHint({ card }) {
  const meta       = narratorMeta[card?.narrator] ?? narratorMeta.self
  const ttsEnabled = useGameStore((s) => s.ttsEnabled)
  const ttsLang    = useGameStore((s) => s.ttsLang)
  const toggleTts  = useGameStore((s) => s.toggleTts)
  const [playing, setPlaying] = useState(false)
  const [voices, setVoices]   = useState([])
  const supported = isTtsSupported()

  useEffect(() => {
    function load() {
      const v = listVoices()
      if (v.length) setVoices(v)
    }
    load()
    window.speechSynthesis?.addEventListener('voiceschanged', load)
    return () => window.speechSynthesis?.removeEventListener('voiceschanged', load)
  }, [])

  useEffect(() => {
    stopSpeech()
    const id = setTimeout(() => setPlaying(false), 0)
    return () => clearTimeout(id)
  }, [card?.id])

  useEffect(() => {
    stopSpeech()
    const id = setTimeout(() => setPlaying(false), 0)
    return () => clearTimeout(id)
  }, [ttsLang])

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

  const langPrefix = ttsLang.split('-')[0]
  const hasAnyVoice = voices.some((v) => v.toLowerCase().includes(langPrefix))
  const noVoiceWarning = ttsEnabled && ttsLang !== 'en-IN' && voices.length > 0 && !hasAnyVoice

  return (
    <div className={`rounded-xl border px-3 py-3 ${meta.cssClass}`}>
      <div className="flex items-center gap-2.5 mb-2">
        <span className="text-lg shrink-0">{meta.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold uppercase tracking-widest" style={{ color: meta.color }}>
            {meta.label}
          </div>
          <div className="text-xs" style={{ color: 'var(--p-text-muted)' }}>{meta.tone}</div>
        </div>
      </div>

      {supported && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button type="button" onClick={toggleTts}
              className="text-xs px-2.5 py-1 rounded transition"
              style={{
                background: ttsEnabled ? 'rgba(76,175,80,0.12)' : 'rgba(255,255,255,0.04)',
                border: ttsEnabled ? '1px solid rgba(76,175,80,0.3)' : '1px solid var(--p-border-wheat)',
                color: ttsEnabled ? 'var(--p-leaf)' : 'var(--p-text-muted)',
              }}>
              {ttsEnabled ? '🔊 On' : '🔇 Off'}
            </button>

            {ttsEnabled && card && (
              <button type="button" onClick={handlePlay}
                className="text-xs px-2.5 py-1 rounded transition"
                style={{
                  background: playing ? 'rgba(192,80,58,0.12)' : 'rgba(255,255,255,0.04)',
                  border: playing ? '1px solid rgba(192,80,58,0.3)' : '1px solid var(--p-border-wheat)',
                  color: playing ? '#ef4444' : 'var(--p-text-muted)',
                }}>
                {playing ? '⏹ Stop' : '▶ Read'}
              </button>
            )}
          </div>

          {noVoiceWarning && (
            <div className="text-xs leading-snug px-2 py-1.5 rounded"
              style={{ background: 'rgba(201,145,58,0.1)', border: '1px solid rgba(201,145,58,0.3)', color: 'var(--p-wheat)' }}>
              No {ttsLang === 'hi-IN' ? 'Hindi' : 'Tamil'} voice found on this device.
            </div>
          )}
        </div>
      )}

      {!supported && (
        <p className="text-xs mt-1" style={{ color: 'var(--p-text-muted)' }}>Voice not supported in this browser.</p>
      )}
    </div>
  )
}
