import { useHeaderOffset } from '../hooks/useHeaderHeight'
import React, { useState, useMemo } from 'react'
import { useMembers } from '../hooks/useData'
import s from './Directorio.module.css'

const AREAS = ['Todos','Renta Variable','Macro & FX','Renta Fija','Derivados','Quant / ML','ESG','M&A / Valoración','Banca de Inversión','Finanzas Sostenibles','Comunicaciones','Formación']

function roleGroup(role) {
  if (['Presidenta','Presidente','Vicepresidente','Vicepresidenta','Directora de Relaciones Corporativas','Director de Relaciones Corporativas','Directora de Marketing y Comunicaciones','Director de Marketing y Comunicaciones','Directora de Eventos y Formación','Director de Eventos y Formación','Directora de Comunicación','Director de Comunicación','Directora de Marketing','Director de Marketing'].includes(role)) return 'Directiva'
  if (role === 'Miembro Honorario') return 'Miembro Honorario'
  return 'Miembro'
}

function MemberCard({ m }) {
  return (
    <div className={s.card}>
      <div className={s.avatar}>{m.avatar}</div>
      <div className={s.info}>
        <div className={s.name}>{m.name}</div>
        <div className={s.role}>{m.role}</div>
        <div className={s.career}>{m.career} · {m.year}</div>
        <span className={s.areaBadge}>{m.area}</span>
        {m.bio && <p className={s.bio}>{m.bio}</p>}
      </div>
    </div>
  )
}

export default function Directorio() {
  const headerOffset = useHeaderOffset()
  const { members, loading } = useMembers()
  const [search, setSearch]  = useState('')
  const [area, setArea]      = useState('Todos')

  const directiva  = useMemo(() => members.filter(m => roleGroup(m.role) === 'Directiva'),         [members])
  const honorarios = useMemo(() => members.filter(m => roleGroup(m.role) === 'Miembro Honorario'), [members])
  const miembros   = useMemo(() => members.filter(m => roleGroup(m.role) === 'Miembro'),           [members])

  const filterFn = (list) => list.filter(m => {
    const q = search.toLowerCase()
    return (search === '' || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.area.toLowerCase().includes(q))
      && (area === 'Todos' || m.area === area)
  })

  const fDirectiva  = filterFn(directiva)
  const fHonorarios = filterFn(honorarios)
  const fMiembros   = filterFn(miembros)

  return (
    <main className={s.page}>
      <div className={s.header}>
        <div className={s.eyebrow}>Equipo</div>
        <h1 className={s.title}>Directorio del Club</h1>
        <p className={s.subtitle}><strong>{members.length} miembros activos</strong> este semestre. Una directiva electa y un equipo de miembros activos.</p>
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
      </div>

      <div className="container">
        {loading ? (
          <div className={s.grid}>
            {Array.from({length:6}).map((_,i) => <div key={i} className={`${s.card} skeleton`} style={{height:140}} />)}
          </div>
        ) : (
          <>
            {/* ─── DIRECTIVA ─── */}
            {fDirectiva.length > 0 && (
              <section className={s.section}>
                <div className={s.sectionHeader}>
                  <h2 className={s.sectionTitle}>Directiva</h2>
                  <span className={s.sectionCount}>{fDirectiva.length} integrantes</span>
                </div>
                <div className={s.grid}>
                  {fDirectiva.map(m => <MemberCard key={m.id} m={m} />)}
                </div>
              </section>
            )}

            {/* ─── HONORARIOS ─── */}
            {fHonorarios.length > 0 && (
              <section className={s.section}>
                <div className={s.sectionHeader}>
                  <h2 className={s.sectionTitle}>Miembros Honorarios</h2>
                  <span className={s.sectionCount}>{fHonorarios.length} integrantes</span>
                </div>
                <div className={s.grid}>
                  {fHonorarios.map(m => <MemberCard key={m.id} m={m} />)}
                </div>
              </section>
            )}

            {/* ─── MIEMBROS ─── */}
            {fMiembros.length > 0 && (
              <section className={s.section}>
                <div className={s.sectionHeader}>
                  <h2 className={s.sectionTitle}>Miembros</h2>
                  <span className={s.sectionCount}>{fMiembros.length} integrantes</span>
                </div>
                <div className={s.grid}>
                  {fMiembros.map(m => <MemberCard key={m.id} m={m} />)}
                </div>
              </section>
            )}

            {/* Empty state */}
            {fDirectiva.length === 0 && fHonorarios.length === 0 && fMiembros.length === 0 && (
              <div className={s.empty}>
                <p>No se encontraron miembros con estos filtros.</p>
                <button className={s.resetBtn} onClick={()=>{setSearch('');setArea('Todos')}}>Limpiar filtros</button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}