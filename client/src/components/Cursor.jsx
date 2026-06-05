import React, { useEffect, useState } from 'react'
import s from './Cursor.module.css'

export default function Cursor() {
  const [pos,     setPos]     = useState({ x: -100, y: -100 })
  const [dot,     setDot]     = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    let animId
    let target = { x: -100, y: -100 }

    const onMove = e => {
      target = { x: e.clientX, y: e.clientY }
      setDot({ x: e.clientX, y: e.clientY })
    }

    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)

    // Smooth follow for outer ring
    const loop = () => {
      setPos(prev => ({
        x: prev.x + (target.x - prev.x) * 0.12,
        y: prev.y + (target.y - prev.y) * 0.12,
      }))
      animId = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    animId = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <div
        className={`${s.ring} ${hovered ? s.ringHovered : ''}`}
        style={{ transform: `translate(${pos.x - 20}px, ${pos.y - 20}px)` }}
      />
      <div
        className={`${s.dot} ${hovered ? s.dotHovered : ''}`}
        style={{ transform: `translate(${dot.x - 3}px, ${dot.y - 3}px)` }}
      />
    </>
  )
}
