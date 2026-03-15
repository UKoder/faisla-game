import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { useGameStore } from './state/gameStore'

function BootstrappedApp() {
  const hydrateFromStorage = useGameStore((s) => s.hydrateFromStorage)

  useEffect(() => {
    hydrateFromStorage()
  }, [hydrateFromStorage])

  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BootstrappedApp />
  </StrictMode>,
)
