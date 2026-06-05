import React from 'react'
import s from './SectionNav.module.css'

const SECTIONS = ['Inicio','Chile','América Latina','Renta Variable','Renta Fija','Commodities','Divisas','Criptomonedas','Banca','ESG','Análisis']

export default function SectionNav({ active = 'Inicio', onChange }) {
  return (
    <div className={s.bar}>
      {SECTIONS.map(sec => (
        <button
          key={sec}
          className={`${s.item} ${active === sec ? s.active : ''}`}
          onClick={() => onChange && onChange(sec)}
        >
          {sec}
        </button>
      ))}
    </div>
  )
}
