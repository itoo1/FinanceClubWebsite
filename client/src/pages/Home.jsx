import React from 'react'
import { Link } from 'react-router-dom'
import { useEvents } from '../hooks/useData'
import { useScrollReveal, useCounter, useParallax } from '../hooks/useEffects'
import s from './Home.module.css'

const PILLARS = [
  { num:'01', area:'Análisis',  title:'Rigor cuantitativo',   body:'Modelos de valoración, macroeconomía aplicada y gestión del riesgo. Cada tesis de inversión requiere datos sólidos y argumentación rigurosa.' },
  { num:'02', area:'Mercados',  title:'Práctica real',         body:'Carteras simuladas, análisis de empresas cotizadas e informes de research propios. El aprendizaje ocurre en contacto con los mercados reales.' },
  { num:'03', area:'Red',       title:'Network profesional',   body:'Alumni en fondos de inversión, banca de inversión y consultoría estratégica. Mentores activos que acompañan a cada miembro.' },
  { num:'04', area:'Ética',     title:'Finanzas responsables', body:'Debatimos el impacto social del capital, criterios ESG y la responsabilidad del sector financiero en la economía sostenible.' },
]

const ACTIVITIES = [
  ['Sesiones de análisis semanal',     'Jueves · 19:00', 'Presencial',       'Activo'],
  ['Talleres de modelos financieros',  'Quincenal',      'Lab. Finanzas',  'Activo'],
  ['Competición de carteras',          'Semestral',      'Online',            'Activo'],
  ['Conferencia anual de inversión',   'Junio',          'Híbrido',           'Planificado'],
  ['Publicación de informes research', 'Mensual',        'Digital',           'Activo'],
]

const PARTNERS = [
  {
    logo: <div className={s.pLogoBloomberg}>Bloomberg</div>,
    cat:'Datos & Terminal', name:'Bloomberg',
    desc:'Acceso a terminales Bloomberg para análisis de mercados en tiempo real, datos históricos y herramientas de research profesional. Abierto a estudiantes y profesionales que quieran integrarse al club.',
    tag:'Socio fundador',
  },
  {
    logo: (
      <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 4 C 80 4, 96 20, 96 50 C 96 80, 80 96, 50 96 C 20 96, 4 80, 4 50 C 4 20, 20 4, 50 4 Z" fill="#FF6900"/>
        <text x="50" y="68" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontSize="38" fontWeight="900" fill="#ffffff" letterSpacing="-1">itaú</text>
      </svg>
    ),
    cat:'Banca & Servicios Financieros', name:'Itaú',
    desc:'Apoya al Laboratorio de Finanzas de la facultad y al club con capacitaciones profesionales. Conecta a estudiantes y profesionales con el ecosistema financiero regional.',
    tag:'Socio fundador',
  },
  {
    logo: (
      <svg width="120" height="32" viewBox="0 0 398 158" xmlns="http://www.w3.org/2000/svg">
        <path fill="#ffffff" fillRule="evenodd" d="M369.974 67.044h-9.603l-.795 3.52h10.398c9.513 0 12.723 2.588 12.723 10.256v3.712c-2.359-2.414-6.53-3.638-12.424-3.638-9.404 0-13.975 4.075-13.975 12.455v.61c0 7.857 4.502 11.842 13.378 11.842h2.39c9.403 0 14.173-3.985 14.173-11.842V80.82c0-9.785-4.713-13.776-16.265-13.776zm12.723 27.423c0 5.623-3.008 7.814-10.73 7.814h-1.494c-7.452 0-10.632-2.49-10.632-8.322v-.61c0-6.335 3.03-9.036 10.133-9.036h.598c8.499 0 12.125 2.61 12.125 8.73v1.424zM123.392 73.95l1.889-9.403h-16.26V51.702l-11.414 1.762v38.367c0 13.264 5.09 17.211 18.968 17.211h6.076l1.89-9.32h-7.145c-6.322 0-8.376-1.593-8.376-8.647V73.95h14.372zM44.97 47.251v41.223c0 15.28 6.897 21.66 21.925 21.66 15.602 0 22.5-6.212 22.5-21.577v-3.945c0-14.44-6.406-21.493-20.365-21.493-4.435 0-9.28.923-12.565 3.525v-21.24L44.97 47.25zm22.335 25.102c7.883 0 10.676 3.191 10.676 12.677v3.527c0 9.234-2.793 12.426-10.84 12.426S56.3 97.791 56.3 88.473v-4.785c0-8.48 2.793-11.335 11.004-11.335zm83.678-9.234c-15.028 0-21.926 6.464-21.926 21.24v2.267c0 14.02 5.995 20.82 20.118 20.82 4.517 0 9.034-.838 12.236-3.442v1.681c0 7.892-3.366 10.492-11.25 10.492h-4.72c-2.698.049-3.924.539-5.55 3.264l-.009-.004c-13.54 21.908-37.047 35.292-62.665 35.292-40.875 0-74.128-33.996-74.128-75.786 0-41.789 33.253-75.785 74.128-75.785 28.711 0 54.83 16.999 67.05 43.453h3.406C135.219 18.284 107.61 0 77.217 0 34.64 0 0 35.414 0 78.943c0 43.53 34.64 78.944 77.217 78.944 25.04 0 48.148-12.274 62.554-32.643h11.047c14.535 0 22.008-5.624 22.008-19.98v-21.66c0-14.273-7.144-20.485-21.843-20.485zm10.511 24.934c0 7.892-2.71 10.326-10.51 10.326-8.788 0-10.512-3.106-10.512-12.256v-1.427c0-9.069 1.56-12.343 10.511-12.343 8.786 0 10.511 3.191 10.511 12.426v3.274zm232.06 17.748h3.544v-53.32h-3.543v53.32zm-79.822-35.236l.795-3.521H298.68V56.978l-3.642.665v34.483c0 9.82 3.599 13.472 13.277 13.472h5.233l.662-3.52h-5.895c-7.294 0-9.635-2.368-9.635-9.75V70.566h15.053zm32.805 19.932c0 9.075-2.777 11.987-11.427 11.987-8.395 0-11.229-3.024-11.229-11.987V67.044h-3.642v23.453c0 11.16 4.17 15.507 14.87 15.507 10.634 0 14.971-4.491 14.971-15.507V67.044h-3.543v23.453zm-80.132-2.546v-3.26c0-10.43 3.485-14.126 13.32-14.126h8.31l.792-3.521h-9.101c-11.73 0-16.964 5.442-16.964 17.646v3.261c0 12.204 5.233 17.647 16.964 17.647h8.406l.795-3.52h-9.201c-9.587 0-13.32-3.961-13.32-14.127zM240.18 67.044h-9.604l-.793 3.52h10.397c9.438 0 12.622 2.588 12.622 10.256v3.712c-2.357-2.414-6.528-3.638-12.424-3.638-9.402 0-13.973 4.075-13.973 12.455v.61c0 7.857 4.533 11.842 13.475 11.842h2.391c9.34 0 14.075-3.985 14.075-11.842V80.82c0-9.785-4.684-13.776-16.166-13.776zm12.622 27.423c0 5.697-2.881 7.814-10.63 7.814h-1.494c-7.52 0-10.73-2.49-10.73-8.322v-.61c0-6.335 3.03-9.036 10.132-9.036h.598c8.498 0 12.124 2.61 12.124 8.73v1.424zm-48.284-28.034c-11.232 0-16.464 5.673-16.464 17.85v33.128h3.543V100.4c2.564 3.407 7.344 5.401 13.12 5.401 11.181 0 16.167-5.506 16.167-17.85v-3.769c0-12.275-5.048-17.75-16.366-17.75zM217.24 87.95c0 10.447-3.393 14.33-12.523 14.33-8.64 0-13.021-4.307-13.021-12.803v-5.194c0-10.18 3.715-14.331 12.822-14.331 9.155 0 12.722 3.989 12.722 14.23v3.768z"/>
      </svg>
    ),
    cat:'Banca de Inversión', name:'BTG Pactual',
    desc:'Banco de inversión líder en Latinoamérica. Aporta experiencia en mercados de capitales y formación profesional para los miembros del club.',
    tag:'Socio institucional',
   },
   {
    logo: (
      <svg width="120" height="44" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="32" r="22" fill="none" stroke="#e30613" strokeWidth="3"/>
        <path d="M40 14 L48 32 L40 28 Z" fill="#e30613"/>
        <text x="0" y="72" fontFamily="Arial Black, Arial, sans-serif" fontSize="16" fontWeight="900" fill="#e30613" letterSpacing="0.5">BAIN &amp; COMPANY</text>
      </svg>
    ),
    cat:'Consultoría Estratégica', name:'Bain & Company',
    desc:'Una de las consultoras estratégicas más reconocidas del mundo. Colabora con el club en eventos, formación profesional y acercamiento al ecosistema corporativo global.',
    tag:'Socio en eventos',
  },

 
]

function Metric({ val, label, delta }) {
  const isNum = !isNaN(parseInt(val))
  const suffix = val.replace(/[0-9]/g, '')
  const { count, ref } = useCounter(isNum ? val : 0, 1600)
  return (
    <div className={s.metric} ref={ref}>
      <div className={s.metricVal}>{isNum ? `${count}${suffix}` : val}</div>
      <div className={s.metricLabel}>{label}</div>
      <div className={s.metricDelta}>{delta}</div>
    </div>
  )
}

export default function Home() {
  const { events } = useEvents()
  useScrollReveal()
  const parallax = useParallax(0.4)
  const fadeStart = typeof window !== 'undefined' ? window.innerHeight * 0.5 : 400
  const heroOpacity = Math.max(0, 1 - parallax / fadeStart)

  // Sort events chronologically by month then day
  const MONTH_ORDER = { ENE:1, FEB:2, MAR:3, ABR:4, MAY:5, JUN:6, JUL:7, AGO:8, SEP:9, OCT:10, NOV:11, DIC:12 }
  const sortedEvents = [...events].sort((a, b) => {
    const ma = MONTH_ORDER[a.month] || 99
    const mb = MONTH_ORDER[b.month] || 99
    if (ma !== mb) return ma - mb
    return parseInt(a.day) - parseInt(b.day)
  })

  return (
    <main className={s.page}>

      {/* ── HERO ── */}
      <section className={s.hero}>

        {/* Video — z-index 0 */}
        <video autoPlay muted loop playsInline className={s.video} style={{ transform: `translateY(${parallax * 0.5}px) scale(1.1)` }}>
          <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>

        {/* Overlay — z-index 1 */}
        <div className={s.videoOverlay} />

        {/* Content — z-index 2 */}
        <div className={s.heroBody} style={{ opacity: heroOpacity, transform: `translateY(${parallax * 0.2}px)` }}>
          <div className={s.heroLeft}>
            <div className={s.eyebrow}>
              <span className={s.eyebrowLine} />
              Sociedad Académica · Est. 2026
            </div>

            <h1 className={s.heroTitle}>
              Finance<br />
              <span className={s.accentWord}>Club <span className={s.udec}>UdeC</span></span>
            </h1>

            <p className={s.heroLead}>
              El club de finanzas de la <strong>Universidad de Concepción</strong>.
              Una comunidad de estudiantes dedicada al análisis riguroso de los mercados,
              las finanzas cuantitativas y la economía aplicada. Donde la profesionalidad y el rigor analítico se encuentran.
            </p>

            <div className={s.heroActions}>
              <Link to="/contacto" className={s.btnPrimary}>
                Únete al club <span className={s.btnArrow}>→</span>
              </Link>
              <Link to="/directorio" className={s.btnSecondary}>
                Ver directorio
              </Link>
            </div>
          </div>

          <div className={s.heroRight}>
            <div className={s.sideTitle}>Próximos eventos</div>
            {sortedEvents.slice(0,4).map(ev => (
              <div className={s.evItem} key={ev.id}>
                <div className={s.evDate}>
                  <span className={s.evDay}>{ev.day}</span>
                  <span className={s.evMonth}>{ev.month}</span>
                </div>
                <div>
                  <div className={s.evName}>{ev.name}</div>
                  <div className={s.evMeta}>{ev.time} · {ev.location}</div>
                </div>
              </div>
            ))}
            <Link to="/eventos" className={s.sideMore}>Ver todos los eventos →</Link>
          </div>
        </div>

        {/* Metrics bar — z-index 2 */}
        <div className={s.metricsBar}>
          <div className={s.metricsInner}>
            <Metric val="15+"  label="Socios activos"      delta="↑ Primer mes del club" />
            <Metric val="6"    label="Áreas de estudio"    delta="↑ Equities, FX, Quant, RF, ESG, M&A" />
            <Metric val="10+"  label="Sesiones anuales"    delta="↑ Calendario 2026" />
            <Metric val="3+"   label="Asesores académicos" delta="↑ Mentores activos" />
          </div>
        </div>

        {/* Scroll indicator */}
        <button className={s.scrollHint} onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} aria-label="Bajar al contenido">
          <span className={s.scrollText}>Explorar</span>
          <span className={s.scrollLine} />
        </button>

      </section>

      {/* ── PILLARS ── */}
      <section className={s.section}>
        <div className="container">
          <div className={`${s.sectionHeader} reveal`}>
            <div>
              <div className={s.sectionLabel}>Sobre el Club</div>
              <h2 className={s.sectionTitle}>Formando analistas<br /><em>con criterio propio</em></h2>
            </div>
          </div>

          <blockquote className={`${s.leadQuote} reveal`}>
            Desde 2026, cultivamos el pensamiento crítico y las habilidades técnicas
            necesarias para navegar la complejidad de los mercados modernos.{' '}
            <strong>Profesionalidad, tecnología y análisis cuantitativo.</strong>
          </blockquote>

          <div className={s.pillarGrid}>
            {PILLARS.map((p, i) => (
              <div className={`${s.pillarCard} reveal d${i+1}`} key={p.num}>
                <div className={s.pillarAccent} />
                <div className={s.pillarNum}>{p.num} / {p.area}</div>
                <div className={s.pillarTitle}>{p.title}</div>
                <p className={s.pillarBody}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className="container">
          <div className={`${s.sectionHeader} reveal`}>
            <div>
              <div className={s.sectionLabel}>Partners</div>
              <h2 className={s.sectionTitle}>Nuestros<br /><em>colaboradores</em></h2>
            </div>
          </div>
          <p className={`${s.partnersLead} reveal`}>
            Instituciones y empresas que respaldan la formación financiera del club y la proyección profesional de sus miembros.
          </p>
          <div className={s.partnersGrid}>
            {PARTNERS.map((p, i) => p.placeholder ? (
              <div key={i} className={`${s.partnerCard} ${s.placeholder} reveal d${i+1}`}>
                <div className={s.placeholderInner}>
                  <span className={s.plus}>+</span>
                  <span className={s.placeholderText}>Próximo partner</span>
                </div>
              </div>
            ) : (
              <div className={`${s.partnerCard} reveal d${i+1}`} key={i}>
                <div className={s.partnerTop}>
                  <div className={s.partnerLogo}>{p.logo}</div>
                  <div className={s.partnerCat}>{p.cat}</div>
                </div>
                <div className={s.partnerName}>{p.name}</div>
                <p className={s.partnerDesc}>{p.desc}</p>
                <span className={s.partnerTag}>{p.tag}</span>
                <div className={s.partnerHoverLine} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVITIES ── */}
      <section className={s.section}>
        <div className="container">
          <div className={`${s.sectionHeader} reveal`}>
            <div>
              <div className={s.sectionLabel}>Actividades</div>
              <h2 className={s.sectionTitle}>Semestre<br /><em>en curso</em></h2>
            </div>
            <Link to="/eventos" className={s.sectionMore}>Ver calendario →</Link>
          </div>
          <div className={`reveal`}>
            <table className={s.table}>
              <thead>
                <tr><th>Actividad</th><th>Frecuencia</th><th>Formato</th><th>Estado</th></tr>
              </thead>
              <tbody>
                {ACTIVITIES.map(([act,freq,fmt,status]) => (
                  <tr key={act} className={s.tableRow}>
                    <td><strong>{act}</strong></td>
                    <td>{freq}</td><td>{fmt}</td>
                    <td><span className={`${s.badge} ${status==='Activo'?s.badgeGreen:s.badgeBlue}`}>{status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </main>
  )
}