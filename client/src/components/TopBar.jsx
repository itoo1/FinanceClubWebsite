import React from 'react'
import { useClock } from '../hooks/useData'
import s from './TopBar.module.css'

export default function TopBar() {
  const time = useClock()
  const today = new Date().toLocaleDateString('es-CL', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
  const dateStr = today.charAt(0).toUpperCase() + today.slice(1)

  return (
    <div className={s.bar}>
      <div className={s.left}>
        <span>{dateStr}</span>
        <span>Santiago, Chile · UTC-3</span>
        <span className={s.clock}>{time}</span>
      </div>
      <div className={s.right}>
        <a href="#">Terminal Bloomberg</a>
        <a href="#">Newsletter</a>
        <a href="#">Soporte</a>
      </div>
    </div>
  )
}
