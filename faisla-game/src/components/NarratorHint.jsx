import React from 'react'

const narratorMeta = {
  elder: {
    label: 'Wise Elder',
    tone: 'Shares long-term wisdom from experience.',
    icon: '🧓',
    cssClass: 'narrator-elder',
    textColor: 'text-amber-300',
  },
  bank_mitr: {
    label: 'Bank Mitr',
    tone: 'Explains formal schemes and safe options.',
    icon: '🏦',
    cssClass: 'narrator-bank_mitr',
    textColor: 'text-emerald-300',
  },
  scammer: {
    label: 'Scammer',
    tone: 'Sounds helpful, but is dangerous.',
    icon: '⚠️',
    cssClass: 'narrator-scammer',
    textColor: 'text-red-400',
  },
  self: {
    label: 'Your Inner Voice',
    tone: 'Reminds you of your own experience.',
    icon: '💭',
    cssClass: 'narrator-self',
    textColor: 'text-sky-300',
  },
}

export function NarratorHint({ narrator, audioKey }) {
  const meta = narratorMeta[narrator] ?? narratorMeta.self

  return (
    <div className={`rounded-2xl border px-3 py-2.5 flex items-start gap-3 ${meta.cssClass}`}>
      <div className="text-xl mt-0.5 shrink-0">{meta.icon}</div>
      <div className="flex-1 min-w-0">
        <div className={`text-[11px] font-bold uppercase tracking-widest ${meta.textColor}`}>
          {meta.label}
        </div>
        <div className="text-[11px] text-slate-400 mt-0.5">{meta.tone}</div>
        {audioKey && (
          <button
            type="button"
            className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] text-slate-300 hover:bg-white/10 transition"
            onClick={() => console.log('Play narration for', audioKey)}
          >
            <span>Play explanation</span>
          </button>
        )}
      </div>
    </div>
  )
}
