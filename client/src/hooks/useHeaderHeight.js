import { useState, useEffect } from 'react'

// Returns current header offset — 0 when header is hidden, header height when visible
export function useHeaderOffset() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const header = document.querySelector('[data-header]')
    if (!header) return

    const update = () => {
      const rect = header.getBoundingClientRect()
      // If header is fully or partially visible, offset = its bottom edge
      // If hidden (scrolled up off screen), offset = 0
      setOffset(Math.max(0, rect.bottom))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return offset
}
