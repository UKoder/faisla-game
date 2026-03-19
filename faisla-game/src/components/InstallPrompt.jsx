/**
 * InstallPrompt — "Add to Home Screen" banner.
 * Shows a dismissible prompt when the app is installable.
 * Handles both Android/Chrome (native prompt) and iOS Safari (manual instructions).
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInstallPrompt } from '../hooks/useInstallPrompt'

export function InstallPrompt() {
  const { canInstall, isInstalled, isIOS, triggerInstall } = useInstallPrompt()
  const [dismissed, setDismissed] = useState(false)
  const [showIOSGuide, setShowIOSGuide] = useState(false)

  // Don't show if already installed, dismissed, or not installable
  if (isInstalled || dismissed || !canInstall) return null

  async function handleInstall() {
    if (isIOS) {
      setShowIOSGuide(true)
      return
    }
    await triggerInstall()
  }

  return (
    <AnimatePresence>
      <motion.div
        key="install-banner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl px-4 py-3 flex items-center gap-3"
        style={{
          background: 'rgba(245,158,11,0.08)',
          border: '1px solid rgba(245,158,11,0.30)',
        }}
      >
        <span className="text-2xl shrink-0">📲</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold" style={{ color: '#f59e0b' }}>
            Add to Home Screen
          </p>
          <p className="text-xs leading-snug mt-0.5" style={{ color: 'var(--p-text-muted)' }}>
            {isIOS
              ? 'Tap Share → "Add to Home Screen" to install'
              : 'Install Faisla for offline play, no browser needed'}
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {!isIOS && (
            <button
              type="button"
              onClick={handleInstall}
              className="text-xs px-3 py-1.5 rounded-lg font-bold"
              style={{
                background: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
                color: '#1c1917',
              }}
            >
              Install
            </button>
          )}
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="text-xs px-2 py-1.5 rounded-lg"
            style={{ color: 'var(--p-text-muted)', background: 'var(--p-bg-inset)' }}
          >
            ✕
          </button>
        </div>
      </motion.div>

      {/* iOS step-by-step guide */}
      {showIOSGuide && (
        <motion.div
          key="ios-guide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl px-4 py-4 mt-1"
          style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)' }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: 'var(--p-sky)' }}>
            iOS Install Steps
          </p>
          <ol className="text-xs space-y-1.5" style={{ color: 'var(--p-text-secondary)' }}>
            <li>1. Tap the <strong>Share</strong> button (□↑) at the bottom of Safari</li>
            <li>2. Scroll down and tap <strong>"Add to Home Screen"</strong></li>
            <li>3. Tap <strong>Add</strong> — Faisla appears on your home screen</li>
          </ol>
          <button
            type="button"
            onClick={() => { setShowIOSGuide(false); setDismissed(true) }}
            className="mt-3 text-xs px-3 py-1.5 rounded-lg"
            style={{ background: 'var(--p-bg-inset)', color: 'var(--p-text-muted)' }}
          >
            Got it
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
