/**
 * CropSetup — Farmer onboarding screen.
 * Farmer enters their name, selects crops they grow, and sets acreage.
 * On submit, starts a personalized game run.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../state/gameStore'
import { t } from '../i18n/translations'

const CROPS = [
  { key: 'wheat',     label: 'Wheat',     label_hi: 'गेहूं',   label_ta: 'கோதுமை',          icon: '🌾' },
  { key: 'paddy',     label: 'Paddy',     label_hi: 'धान',     label_ta: 'நெல்',             icon: '🌿' },
  { key: 'sugarcane', label: 'Sugarcane', label_hi: 'गन्ना',   label_ta: 'கரும்பு',          icon: '🎋' },
  { key: 'potato',    label: 'Potato',    label_hi: 'आलू',     label_ta: 'உருளைக்கிழங்கு',  icon: '🥔' },
]

function cropLabel(crop, lang) {
  if (lang === 'hi-IN') return crop.label_hi
  if (lang === 'ta-IN') return crop.label_ta
  return crop.label
}

export function CropSetup() {
  const navigate = useNavigate()
  const { startPersonalizedRun, uiLang } = useGameStore()
  const T = (k) => t(uiLang, k)

  const [name, setName]           = useState('')
  const [selected, setSelected]   = useState([])
  const [acreage, setAcreage]     = useState('')
  const [error, setError]         = useState('')

  function toggleCrop(key) {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    )
  }

  function handleStart() {
    if (!name.trim()) { setError('Please enter your name.'); return }
    if (selected.length === 0) { setError('Select at least one crop.'); return }
    if (!acreage || isNaN(Number(acreage)) || Number(acreage) <= 0) {
      setError('Enter a valid acreage (e.g. 2.5).')
      return
    }
    setError('')
    startPersonalizedRun({ name: name.trim(), crops: selected, acreage: Number(acreage) })
    navigate('/play')
  }

  return (
    <motion.div
      className="flex flex-col gap-5 w-full"
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
    >
      {/* Header */}
      <div className="p-nm-glow-wheat rounded-2xl px-5 py-5 text-center">
        <div className="text-4xl mb-2">🚜</div>
        <h2 className="text-lg font-black" style={{ color: '#f59e0b' }}>
          My Farm Setup
        </h2>
        <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--p-text-muted)' }}>
          Tell us about your farm. We'll build a game deck based on your real crops.
        </p>
      </div>

      {/* Farmer Name */}
      <div className="p-nm-raised rounded-2xl px-5 py-4" style={{ border: '1px solid var(--p-border-wheat)' }}>
        <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--p-text-muted)' }}>
          👤 Farmer Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Ramesh Kumar"
          className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
          style={{
            background: 'var(--p-bg-inset)',
            border: '1px solid var(--p-border-subtle)',
            color: 'var(--p-text-primary)',
          }}
        />
      </div>

      {/* Crop Selection */}
      <div className="p-nm-raised rounded-2xl px-5 py-4" style={{ border: '1px solid var(--p-border-wheat)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--p-text-muted)' }}>
          🌱 Select Your Crops
        </p>
        <div className="grid grid-cols-2 gap-2">
          {CROPS.map((crop) => {
            const active = selected.includes(crop.key)
            return (
              <button
                key={crop.key}
                type="button"
                onClick={() => toggleCrop(crop.key)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200"
                style={{
                  background: active ? 'rgba(245,158,11,0.12)' : 'var(--p-bg-inset)',
                  border: active ? '1px solid rgba(245,158,11,0.55)' : '1px solid var(--p-border-subtle)',
                  color: active ? '#f59e0b' : 'var(--p-text-secondary)',
                }}
              >
                <span className="text-xl">{crop.icon}</span>
                <span className="text-sm font-bold">{cropLabel(crop, uiLang)}</span>
                {active && <span className="ml-auto text-xs">✓</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Acreage */}
      <div className="p-nm-raised rounded-2xl px-5 py-4" style={{ border: '1px solid var(--p-border-wheat)' }}>
        <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--p-text-muted)' }}>
          📐 Total Land (Acres)
        </label>
        <input
          type="number"
          min="0.5"
          step="0.5"
          value={acreage}
          onChange={(e) => setAcreage(e.target.value)}
          placeholder="e.g. 2.5"
          className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
          style={{
            background: 'var(--p-bg-inset)',
            border: '1px solid var(--p-border-subtle)',
            color: 'var(--p-text-primary)',
          }}
        />
      </div>

      {/* Selected crops summary */}
      {selected.length > 0 && (
        <div className="rounded-xl px-4 py-3 text-xs" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', color: 'var(--p-leaf)' }}>
          Your deck will include scenarios for: {selected.map((c) => CROPS.find((x) => x.key === c)?.icon + ' ' + cropLabel(CROPS.find((x) => x.key === c), uiLang)).join(', ')}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-xs px-1" style={{ color: 'var(--p-rose)' }}>{error}</p>
      )}

      {/* CTA */}
      <button type="button" onClick={handleStart} className="p-btn-wheat w-full rounded-full py-3.5 text-sm font-black tracking-wide">
        🌾 Start My Farm Season
      </button>

      {/* Skip */}
      <button type="button" onClick={() => { useGameStore.getState().startNewRun(); navigate('/play') }}
        className="text-xs text-center py-1" style={{ color: 'var(--p-text-muted)' }}>
        Skip — play with generic scenarios
      </button>
    </motion.div>
  )
}
