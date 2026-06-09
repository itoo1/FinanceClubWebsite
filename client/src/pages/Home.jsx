import React from 'react'
import { Link } from 'react-router-dom'
import { useEvents } from '../hooks/useData'
import { useScrollReveal, useCounter } from '../hooks/useEffects'
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
    logo: <div className={s.pLogoBloomberg}><span className={s.blB}>B</span>bloomberg</div>,
    cat:'Datos & Terminal', name:'Bloomberg',
    desc:'Acceso a terminales Bloomberg para análisis de mercados en tiempo real, datos históricos y herramientas de research profesional.',
    tag:'Socio fundador',
  },
  {
    logo: (
      <svg width="80" height="32" viewBox="0 0 90 36" fill="none">
        <rect x="0" y="8" width="4" height="20" rx="2" fill="#1a1a1a" opacity=".7"/>
        <path d="M10 18 C10 10 22 4 28 4 C34 4 38 8 38 14 C38 20 34 24 28 28 C22 32 10 28 10 22Z" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" opacity=".7"/>
        <circle cx="4" cy="4" r="3" fill="#1a1a1a" opacity=".7"/>
        <text x="48" y="24" fontFamily="IBM Plex Sans,sans-serif" fontSize="18" fontWeight="600" fill="#1a1a1a" opacity=".7">itaú</text>
      </svg>
    ),
    cat:'Banca & Servicios Financieros', name:'Itaú',
    desc:'Financia el Laboratorio de Finanzas de la facultad y apoya al club con capacitaciones profesionales y acceso al ecosistema financiero regional.',
    tag:'Socio fundador',
  },
  { placeholder: true },
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

  return (
    <main className={s.page}>

      {/* ── HERO ── */}
      <section className={s.hero}>

        {/* Video — z-index 0 */}
        <video autoPlay muted loop playsInline className={s.video}>
          <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>

        {/* Overlay — z-index 1 */}
        <div className={s.videoOverlay} />

        {/* Content — z-index 2 */}
        <div className={s.heroBody}>
          <div className={s.heroLeft}>
            <div className={s.eyebrow}>
              <span className={s.eyebrowLine} />
              Sociedad Académica · Est. 2026
            </div>

            <h1 className={s.heroTitle}>
              Finance<br />
              <span className={s.accentWord}>Club</span>
            </h1>

            <p className={s.heroLead}>
              El club de finanzas de la <strong>Universidad de Concepción</strong>.
              Una comunidad de estudiantes dedicada al análisis riguroso de los mercados,
              la economía aplicada y las finanzas cuantitativas. Donde la profesionalidad y la tecnología se encuentran.
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
            {events.slice(0,4).map(ev => (
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

      {/* ── ACTIVITIES ── */}
      <section className={`${s.section} ${s.sectionAlt}`}>
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

      {/* ── PARTNERS ── */}
      <section className={s.section}>
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

      {/* ── CTA ── */}
      <section className={`${s.section} ${s.ctaSection}`}>
        <div className="container">
          <div className={`${s.ctaBox} reveal`}>
            <div className={s.ctaContent}>
              <div className={s.sectionLabel} style={{color:'rgba(255,255,255,.5)'}}>Únete al club</div>
              <h2 className={s.ctaTitle}>Construye tu carrera <em>en finanzas</em></h2>
              <p className={s.ctaBody}>Abierto a todos los estudiantes interesados en mercados, análisis cuantitativo y tecnología financiera. Escríbenos para la próxima sesión de bienvenida.</p>
            </div>
            <div className={s.ctaActions}>
              <Link to="/contacto" className={s.ctaBtn}>Contactar ahora →</Link>
              <Link to="/research" className={s.ctaBtnGhost}>Ver informes</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}