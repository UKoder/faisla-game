/**
 * PillarsBar — flat design, SVG icons, extreme contrast.
 * Icons are inline SVG silhouettes — zero bytes, infinite scale.
 */

/* ── SVG icon components ── */
function FamilyIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {/* adult left */}
      <circle cx="7" cy="5" r="3" fill={color} />
      <rect x="3" y="9" width="8" height="9" rx="2" fill={color} />
      {/* adult right */}
      <circle cx="15" cy="5" r="3" fill={color} />
      <rect x="11" y="9" width="8" height="9" rx="2" fill={color} />
      {/* child */}
      <circle cx="11" cy="14" r="2" fill={color} />
      <rect x="8.5" y="17" width="5" height="5" rx="1.5" fill={color} />
    </svg>
  )
}

function CropsIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {/* stalk */}
      <rect x="10" y="8" width="2" height="14" rx="1" fill={color} />
      {/* grain head */}
      <ellipse cx="11" cy="5" rx="3" ry="5" fill={color} />
      {/* left leaf */}
      <ellipse cx="7" cy="12" rx="4" ry="2" transform="rotate(-30 7 12)" fill={color} opacity="0.7" />
      {/* right leaf */}
      <ellipse cx="15" cy="14" rx="4" ry="2" transform="rotate(30 15 14)" fill={color} opacity="0.7" />
    </svg>
  )
}

function FinanceIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {/* coin circle */}
      <circle cx="11" cy="11" r="9" stroke={color} strokeWidth="2.5" />
      {/* ₹ symbol */}
      <text x="11" y="15.5" textAnchor="middle" fontSize="10" fontWeight="900" fill={color} fontFamily="system-ui">₹</text>
    </svg>
  )
}

function ResilienceIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {/* shield */}
      <path d="M11 2 L20 6 L20 12 C20 17 11 21 11 21 C11 21 2 17 2 12 L2 6 Z" fill={color} />
      {/* checkmark */}
      <path d="M7 11 L10 14 L15 8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const ITEMS = [
  { key: 'family',     label: 'Family',     Icon: FamilyIcon,     cssBar: 'bar-family',     cssColor: 'var(--c-family)'     },
  { key: 'crops',      label: 'Crops',      Icon: CropsIcon,      cssBar: 'bar-crops',      cssColor: 'var(--c-crops)'      },
  { key: 'finance',    label: 'Finance',    Icon: FinanceIcon,    cssBar: 'bar-finance',    cssColor: 'var(--c-finance)'    },
  { key: 'resilience', label: 'Resilience', Icon: ResilienceIcon, cssBar: 'bar-resilience', cssColor: 'var(--c-resilience)' },
]

export function PillarsBar({ metrics, pendingDelta }) {
  return (
    <div className="f-card rounded-xl px-4 py-3 flex flex-col gap-3">
      {ITEMS.map(({ key, label, Icon, cssBar, cssColor }) => {
        const value   = metrics?.[key] ?? 0
        const delta   = pendingDelta?.[key] ?? 0
        const danger  = value <= 20
        const warn    = value <= 40 && value > 20
        const isDrop  = delta < 0

        // Icon turns red and pulses when this pillar is taking a hit during drag
        const iconColor = (pendingDelta && isDrop)
          ? 'var(--red)'
          : danger ? 'var(--red)' : cssColor

        const numColor = danger ? 'var(--red)' : warn ? 'var(--wheat)' : 'var(--text-sub)'

        return (
          <div key={key} className="flex items-center gap-2.5">
            {/* SVG icon — pulses red when pillar is dropping */}
            <div className="shrink-0 w-6 flex items-center justify-center"
              style={{ animation: (pendingDelta && isDrop) || danger ? 'dangerPulse 0.9s step-end infinite' : 'none' }}>
              <Icon color={iconColor} />
            </div>

            {/* Label */}
            <span className="w-[4.5rem] text-xs font-black uppercase tracking-wide shrink-0"
              style={{ color: 'var(--text-muted)' }}>
              {label}
            </span>

            {/* Bar track */}
            <div className="flex-1 h-4 rounded-sm bar-track overflow-hidden">
              <div
                className={`${cssBar} h-full`}
                style={{
                  width: `${value}%`,
                  transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                  animation: danger ? 'dangerPulse 1.2s step-end infinite' : 'none',
                }}
              />
            </div>

            {/* Value + delta */}
            <div className="w-12 text-right shrink-0 flex items-center justify-end gap-0.5">
              <span className="text-sm font-black tabular-nums" style={{ color: numColor }}>
                {value}
              </span>
              {pendingDelta && delta !== 0 && (
                <span className="text-xs font-black"
                  style={{ color: isDrop ? 'var(--red)' : 'var(--green-light)' }}>
                  {isDrop ? delta : `+${delta}`}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
