import { useState, useEffect } from 'react'
import { speak, stopSpeech, isTtsSupported, listVoices } from '../services/tts'
import { useGameStore } from '../state/gameStore'

const narratorMeta = {
  elder: {
    label: 'Wise Elder', tone: 'Shares long-term wisdom from experience.',
    icon: '🧓', cssClass: 'narrator-elder',
  },
  bank_mitr: {
    label: 'Bank Mitr', tone: 'Explains formal schemes and safe options.',
    icon: '🏦', cssClass: 'narrator-bank_mitr',
  },
  scammer: {
    label: 'Scammer', tone: 'Sounds helpful, but is dangerous.',
    icon: '⚠️', cssClass: 'narrator-scammer',
  },
  self: {
    label: 'Your Inner Voice', tone: 'Reminds you of your own experience.',
    icon: '💭', cssClass: 'narrator-self',
  },
}

const narratorColor = {
  elder:     'var(--wheat)',
  bank_mitr: 'var(--green)',
  scammer:   'var(--red)',
  self:      'var(--blue)',
}

function getLocalizedPrompt(card, lang) {
  if (!card) return ''
  if (lang === 'hi-IN' && card.prompt_hi) return card.prompt_hi
  if (lang === 'ta-IN' && card.prompt_ta) return card.prompt_ta
  return card.prompt ?? ''
}

export function NarratorHint({ card }) {
  const narratorKey = card?.narrator ?? 'self'
  const meta        = narratorMeta[narratorKey] ?? narratorMeta.self
  const color       = narratorColor[narratorKey] ?? 'var(--blue)'

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
    setTimeout(() => setPlaying(false), 0)
  }, [card?.id])

  useEffect(() => {
    stopSpeech()
    setTimeout(() => setPlaying(false), 0)
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

  const langPrefix = ttsLang?.split('-')[0]
  const hasAnyVoice = voices.some((v) => v.toLowerCase().includes(langPrefix))
  const noVoiceWarning = ttsEnabled && ttsLang !== 'en-IN' && voices.length > 0 && !hasAnyVoice

  return (
    <div className={`f-inset rounded-xl border-2 px-3 py-3 ${meta.cssClass}`}>
      <div className="flex items-center gap-2.5 mb-2">
        <span className="text-lg shrink-0">{meta.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-black uppercase tracking-widest" style={{ color }}>
            {meta.label}
          </div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{meta.tone}</div>
        </div>
      </div>

      {supported && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button type="button" onClick={toggleTts}
              className={`text-xs px-2.5 py-1 rounded ${ttsEnabled ? 'btn-primary' : 'btn-ghost'}`}>
              {ttsEnabled ? '🔊 On' : '🔇 Off'}
            </button>

            {ttsEnabled && card && (
              <button type="button" onClick={handlePlay}
                className={`text-xs px-2.5 py-1 rounded ${playing ? 'btn-danger' : 'btn-ghost'}`}>
                {playing ? '⏹ Stop' : '▶ Read'}
              </button>
            )}
          </div>

          {noVoiceWarning && (
            <div className="text-xs leading-snug px-2 py-1.5 rounded f-inset"
              style={{ borderColor: 'var(--wheat)', color: 'var(--wheat)' }}>
              No {ttsLang === 'hi-IN' ? 'Hindi' : 'Tamil'} voice found on this device.
            </div>
          )}
        </div>
      )}

      {!supported && (
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Voice not supported in this browser.</p>
      )}
    </div>
  )
}
