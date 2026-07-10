import { useHeaderOffset } from '../hooks/useHeaderHeight'
import React, { useState, useMemo } from 'react'
import { useMembers } from '../hooks/useData'
import s from './Directorio.module.css'

const AREAS = ['Todos','Renta Variable','Macro & FX','Banca de Inversión','Comunicaciones','Formación']

function roleGroup(role) {
  if (['Presidenta','Presidente','Vicepresidente','Vicepresidenta','Directora de Relaciones Corporativas','Director de Relaciones Corporativas','Directora de Marketing y Comunicaciones','Director de Marketing y Comunicaciones','Directora de Eventos y Formación','Director de Eventos y Formación','Directora de Comunicación','Director de Comunicación','Directora de Marketing','Director de Marketing'].includes(role)) return 'Directiva'
  if (role === 'Miembro Honorario') return 'Miembro Honorario'
  return 'Miembro'
}

function LinkedInIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  )
}

/* ─── Card grande con foto, solo para Directiva ─── */
function DirectivoCard({ m }) {
  return (
    <div className={s.card}>
      <div className={s.photo}>
        <div className={s.photoBg}>
          {m.photo
            ? <img src={m.photo} alt={m.name} className={s.photoImg} />
            : <span className={s.initials}>{m.avatar}</span>
          }
        </div>
        {m.linkedin && (
          <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className={s.linkedinBtn} aria-label={`LinkedIn de ${m.name}`}>
            <LinkedInIcon />
          </a>
        )}
      </div>
      <div className={s.info}>
        <div className={s.name}>{m.name}</div>
        <div className={s.role}>{m.role}</div>
        <div className={s.meta}>
          <span className={s.career}>{m.career} · {m.year}</span>
          <span className={s.areaBadge}>{m.area}</span>
        </div>
        {m.bio && <p className={s.bio}>{m.bio}</p>}
      </div>
    </div>
  )
}

/* ─── Card compacta para Honorarios y Miembros ─── */
function MemberRow({ m }) {
  return (
    <div className={s.row}>
      <div className={s.rowAvatar}>{m.avatar}</div>
      <div className={s.rowInfo}>
        <div className={s.rowName}>{m.name}</div>
        <div className={s.rowRole}>{m.role}</div>
        <div className={s.rowMeta}>
          <span className={s.career}>{m.career} · {m.year}</span>
          <span className={s.areaBadge}>{m.area}</span>
        </div>
      </div>
      {m.linkedin && (
        <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className={s.rowLinkedin} aria-label={`LinkedIn de ${m.name}`}>
          <LinkedInIcon size={16} />
        </a>
      )}
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
            {Array.from({length:6}).map((_,i) => <div key={i} className={`${s.card} skeleton`} style={{height:340}} />)}
          </div>
        ) : (
          <>
            {/* DIRECTIVA — cards grandes con foto */}
            {fDirectiva.length > 0 && (
              <section className={s.section}>
                <div className={s.sectionHeader}>
                  <h2 className={s.sectionTitle}>Directiva</h2>
                </div>
                <div className={s.grid}>
                  {fDirectiva.map(m => <DirectivoCard key={m.id} m={m} />)}
                </div>
              </section>
            )}

            {/* MIEMBROS HONORARIOS — formato compacto */}
            {fHonorarios.length > 0 && (
              <section className={s.section}>
                <div className={s.sectionHeader}>
                  <h2 className={s.sectionTitle}>Miembros Honorarios</h2>
                </div>
                <div className={s.rowList}>
                  {fHonorarios.map(m => <MemberRow key={m.id} m={m} />)}
                </div>
              </section>
            )}

            {/* MIEMBROS — formato compacto */}
            {fMiembros.length > 0 && (
              <section className={s.section}>
                <div className={s.sectionHeader}>
                  <h2 className={s.sectionTitle}>Miembros</h2>
                </div>
                <div className={s.rowList}>
                  {fMiembros.map(m => <MemberRow key={m.id} m={m} />)}
                </div>
              </section>
            )}

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