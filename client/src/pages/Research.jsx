import { useHeaderOffset } from '../hooks/useHeaderHeight'
import React, { useState } from 'react'
import { useResearch } from '../hooks/useData'
import s from './Research.module.css'

const AREAS = ['Todos','Macro','Equities','Renta Fija','Quant','ESG']

export default function Research() {
  const headerOffset = useHeaderOffset()
  const { reports, loading } = useResearch()
  const [area, setArea] = useState('Todos')
  const filtered = area === 'Todos' ? reports : reports.filter(r => r.area === area)

  return (
    <main className={s.page}>
      <div className={s.header}>
        <div className={s.eyebrow}>Research</div>
        <h1 className={s.title}>Informes de Análisis</h1>
        <p className={s.subtitle}>Publicaciones elaboradas por los analistas del club. Acceso libre para miembros registrados.</p>
      </div>
      <div className={s.filters} style={{ top: headerOffset }}>
        {AREAS.map(a => <button key={a} className={`${s.tab} ${area===a?s.tabActive:''}`} onClick={()=>setArea(a)}>{a}</button>)}
      </div>
      <div className="container">
        <div className={s.list}>
          {loading ? Array(4).fill(null).map((_,i) => (
            <div key={i} className={s.reportCard}>
              <div className="skeleton" style={{height:12,width:'20%',marginBottom:12}} />
              <div className="skeleton" style={{height:22,width:'70%',marginBottom:10}} />
              <div className="skeleton" style={{height:14,width:'100%',marginBottom:6}} />
              <div className="skeleton" style={{height:14,width:'80%'}} />
            </div>
          )) : filtered.map(r => (
            <div key={r.id} className={s.reportCard}>
              <div className={`${s.areaBadge} ${s[`area${r.area.replace(/\s/g,'')}`]}`}>{r.area}</div>
              <h2 className={s.reportTitle}>{r.title}</h2>
              <p className={s.abstract}>{r.abstract}</p>
              <div className={s.reportMeta}>
                <span className={s.metaAuthor}>{r.author}</span>
                <span className={s.metaDot}>·</span>
                <span>{r.date}</span>
                <span className={s.metaDot}>·</span>
                <span>{r.pages} páginas</span>
              </div>
              <button className={s.downloadBtn}>Descargar PDF →</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
