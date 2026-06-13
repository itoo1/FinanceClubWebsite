import { useHeaderOffset } from '../hooks/useHeaderHeight'
import React, { useState, useMemo } from 'react'
import { useMembers } from '../hooks/useData'
import s from './Directorio.module.css'

const AREAS = ['Todos','Renta Variable','Macro & FX','Renta Fija','Derivados','Quant / ML','ESG','M&A / Valoración','Banca de Inversión','Finanzas Sostenibles']
const ROLES = ['Todos','Directiva','Miembro Honorario','Miembro']
function roleGroup(role) {
  if (['Presidenta','Presidente','Vicepresidente','Vicepresidenta','Directora de Relaciones Corporativas','Director de Relaciones Corporativas','Directora de Marketing y Comunicaciones','Director de Marketing y Comunicaciones','Directora de Eventos y Formación','Director de Eventos y Formación','Directora de Comunicación','Director de Comunicación','Directora de Marketing','Director de Marketing'].includes(role)) return 'Directiva'
  if (role === 'Miembro Honorario') return 'Miembro Honorario'
  return 'Miembro'
}

export default function Directorio() {
  const headerOffset = useHeaderOffset()
  const { members, loading } = useMembers()
  const [search, setSearch]  = useState('')
  const [area, setArea]      = useState('Todos')
  const [rol, setRol]        = useState('Todos')

  const filtered = useMemo(() => members.filter(m => {
    const q = search.toLowerCase()
    return (search === '' || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.area.toLowerCase().includes(q))
      && (area === 'Todos' || m.area === area)
      && (rol  === 'Todos' || roleGroup(m.role) === rol)
  }), [members, search, area, rol])

  return (
    <main className={s.page}>
      <div className={s.header}>
        <div className={s.eyebrow}>Equipo</div>
        <h1 className={s.title}>Directorio del Club</h1>
        <p className={s.subtitle}><strong>{members.length} miembros activos</strong> este semestre. Búsqueda por nombre, cargo o área de especialización.</p>
      </div>

      <div className={s.filters} style={{ top: headerOffset }}>
        <div className={s.searchRow}>
          <input className={s.search} type="text" placeholder="Buscar miembro..." value={search} onChange={e => setSearch(e.target.value)} />
          {search && <button className={s.clear} onClick={() => setSearch('')}>×</button>}
        </div>
        <div className={s.filterRow}>
          <span className={s.filterLabel}>Área:</span>
          {AREAS.map(a => <button key={a} className={`${s.tab} ${area===a?s.tabActive:''}`} onClick={()=>setArea(a)}>{a}</button>)}
        </div>
        <div className={s.filterRow}>
          <span className={s.filterLabel}>Nivel:</span>
          {ROLES.map(r => <button key={r} className={`${s.tab} ${rol===r?s.tabActive:''}`} onClick={()=>setRol(r)}>{r}</button>)}
        </div>
      </div>

      <div className="container">
        <div className={s.count}>{loading ? 'Cargando...' : `${filtered.length} miembros`}</div>
        {loading ? (
          <div className={s.grid}>
            {Array.from({length:8}).map((_,i) => <div key={i} className={`${s.card} skeleton`} style={{height:120}} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className={s.empty}>
            <p>No se encontraron miembros con estos filtros.</p>
            <button className={s.resetBtn} onClick={()=>{setSearch('');setArea('Todos');setRol('Todos')}}>Limpiar filtros</button>
          </div>
        ) : (
          <div className={s.grid}>
            {filtered.map(m => (
              <div className={s.card} key={m.id}>
                <div className={s.avatar}>{m.avatar}</div>
                <div className={s.info}>
                  <div className={s.name}>{m.name}</div>
                  <div className={s.role}>{m.role}</div>
                  <div className={s.career}>{m.career} · {m.year}</div>
                  <span className={s.areaBadge}>{m.area}</span>
                  {m.bio && <p className={s.bio}>{m.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}