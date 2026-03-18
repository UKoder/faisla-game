/**
 * Returns 'portrait' or 'landscape' based on window dimensions.
 * Landscape = width > height AND width >= 640px (avoids tiny rotated phones
 * being treated as landscape for layout purposes).
 */
import { useState, useEffect } from 'react'

function getOrientation() {
  if (typeof window === 'undefined') return 'portrait'
  return window.innerWidth > window.innerHeight && window.innerWidth >= 640
    ? 'landscape'
    : 'portrait'
}

export function useOrientation() {
  const [orientation, setOrientation] = useState(getOrientation)

  useEffect(() => {
    function handle() { setOrientation(getOrientation()) }
    window.addEventListener('resize', handle)
    // Also listen to the Screen Orientation API when available
    screen.orientation?.addEventListener('change', handle)
    return () => {
      window.removeEventListener('resize', handle)
      screen.orientation?.removeEventListener('change', handle)
    }
  }, [])

  return orientation
}
