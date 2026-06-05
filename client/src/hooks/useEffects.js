import React, { useEffect, useRef, useState } from 'react'

// Scroll reveal — adds 'revealed' class when element enters viewport
export function useScrollReveal(selector = '.reveal', options = {}) {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          io.unobserve(e.target)
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px', ...options }
    )
    const els = document.querySelectorAll(selector)
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  })
}

// Animated counter — counts from 0 to target when visible
export function useCounter(target, duration = 1800) {
  const [count, setCount]   = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true)
        io.disconnect()
      }
    }, { threshold: 0.5 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const isNumeric = !isNaN(parseInt(target))
    if (!isNumeric) { setCount(target); return }
    const end   = parseInt(target)
    const start = performance.now()
    const tick  = (now) => {
      const elapsed  = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(end)
    }
    requestAnimationFrame(tick)
  }, [started, target, duration])

  return { count, ref }
}

// Sticky nav with scroll-triggered background
export function useScrollNav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return scrolled
}

// Parallax — returns a Y offset based on scroll
export function useParallax(speed = 0.3) {
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const handler = () => setOffset(window.scrollY * speed)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [speed])
  return offset
}

// Page transition — returns 'entering' | 'visible' state
export function usePageTransition() {
  const [state, setState] = useState('entering')
  useEffect(() => {
    const id = setTimeout(() => setState('visible'), 50)
    return () => clearTimeout(id)
  }, [])
  return state
}

// Hide header on scroll down, show on scroll up
export function useHideOnScroll() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastY = React.useRef(0)

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (y > lastY.current && y > 80) {
        setHidden(true)   // scrolling down
      } else {
        setHidden(false)  // scrolling up
      }
      lastY.current = y
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return { hidden, scrolled }
}
