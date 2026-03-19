/**
 * useInstallPrompt — captures the browser's beforeinstallprompt event
 * and exposes a trigger function to show the native install dialog.
 *
 * Works on Chrome/Edge/Android. iOS Safari uses a manual share-sheet flow.
 */
import { useState, useEffect } from 'react'

export function useInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Detect iOS Safari
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent)
    setIsIOS(ios)

    // Check if already installed (standalone mode)
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    setIsInstalled(standalone)

    function onBeforeInstall(e) {
      e.preventDefault()
      setPromptEvent(e)
    }

    function onAppInstalled() {
      setIsInstalled(true)
      setPromptEvent(null)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [])

  async function triggerInstall() {
    if (!promptEvent) return false
    promptEvent.prompt()
    const { outcome } = await promptEvent.userChoice
    setPromptEvent(null)
    return outcome === 'accepted'
  }

  // canInstall: true if browser prompt is available OR it's iOS (manual flow)
  const canInstall = !isInstalled && (!!promptEvent || isIOS)

  return { canInstall, isInstalled, isIOS, triggerInstall }
}
