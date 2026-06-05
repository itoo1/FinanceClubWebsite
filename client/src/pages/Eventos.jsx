import { useHeaderOffset } from '../hooks/useHeaderHeight'
import React, { useState } from 'react'
import { useEvents } from '../hooks/useData'
import s from './Eventos.module.css'

const CATS = ['Todos','Análisis','Taller','Conferencia','Competición']

function Modal({ ev, onClose }) {
  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={e => e.stopPropagation()}>
        <button className={s.close} onClick={onClose}>×</button>
        <div className={`${s.modalCat} ${s[`cat${ev.category}`]}`}>{ev.category}</div>
        <h2 className={s.modalTitle}>{ev.name}</h2>
        <p className={s.modalDesc}>{ev.desc}</p>
        <div className={s.modalMeta}>
          {[['Fecha', `${ev.day} ${ev.month}`],['Hora', ev.time],['Lugar', ev.location],['Formato', ev.format]].map(([l,v]) => (
            <div className={s.metaRow} key={l}>
              <span className={s.metaLabel}>{l}</span>
              <span className={s.metaVal}>{v}</span>
            </div>
          ))}
        </div>
        <button className={s.registerBtn}>Inscribirse al evento →</button>
      </div>
    </div>
  )
}

export default function Eventos() {
  const headerOffset = useHeaderOffset()
  const { events, loading } = useEvents()
  const [cat, setCat]       = useState('Todos')
  const [selected, setSelected] = useState(null)

  const filtered = cat === 'Todos' ? events : events.filter(e => e.category === cat)

  return (
    <main className={s.page}>
      <div className={s.header}>
        <div className={s.eyebrow}>Calendario</div>
        <h1 className={s.title}>Eventos & Actividades</h1>
        <p className={s.subtitle}>Sesiones semanales, talleres y conferencias. Acceso libre para todos los miembros.</p>
      </div>
      <div className={s.filters} style={{ top: headerOffset }}>
        {CATS.map(c => <button key={c} className={`${s.tab} ${cat===c?s.tabActive:''}`} onClick={()=>setCat(c)}>{c}</button>)}
      </div>
      <div className="container">
        <div className={s.list}>
          {loading ? Array(5).fill(null).map((_,i) => (
            <div key={i} className={s.eventRow}>
              <div className="skeleton" style={{width:60,height:60,flexShrink:0}} />
              <div style={{flex:1}}>
                <div className="skeleton" style={{height:14,width:'40%',marginBottom:8}} />
                <div className="skeleton" style={{height:12,width:'25%'}} />
              </div>
            </div>
          )) : filtered.map(ev => (
            <div key={ev.id} className={s.eventRow} onClick={() => setSelected(ev)}>
              <div className={s.dateBox}>
                <span className={s.day}>{ev.day}</span>
                <span className={s.month}>{ev.month}</span>
              </div>
              <div className={s.evBody}>
                <div className={s.evTop}>
                  <span className={`${s.catTag} ${s[`cat${ev.category}`]}`}>{ev.category}</span>
                  <span className={s.fmtTag}>{ev.format}</span>
                </div>
                <div className={s.evTitle}>{ev.name}</div>
                <div className={s.evMeta}>{ev.time} · {ev.location}</div>
              </div>
              <span className={s.arrow}>→</span>
            </div>
          ))}
        </div>
      </div>
      {selected && <Modal ev={selected} onClose={() => setSelected(null)} />}
    </main>
  )
}
