import React from 'react'
import { Link } from 'react-router-dom'
import s from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={s.footer}>

      {/* ── CTA band — institutional close ── */}
      <div className={s.ctaBand}>
        <div className={`container ${s.ctaInner}`}>
          <div>
            <div className={s.ctaEyebrow}>Admisión 2026</div>
            <h2 className={s.ctaTitle}>Forma parte de la próxima<br />generación de analistas.</h2>
          </div>
          <Link to="/contacto" className={s.ctaAction}>
            Postular al club
            <span className={s.ctaArrow} aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className={`container ${s.inner}`}>
        <div className={s.grid}>
          <div className={s.brand}>
            <Link to="/" className={s.logo}>Finance <span>Club</span></Link>
            <p className={s.tagline}>
              El espacio de análisis financiero, macroeconomía y mercados de capital
              para la próxima generación de profesionales.
            </p>
            <p className={s.affiliation}>
              FACEA · Facultad de Ciencias Económicas y Administrativas<br />
              Universidad de Concepción — Chile
            </p>
          </div>
          {[
            ['Secciones', [['/', 'Inicio'], ['/mercados', 'Mercados'], ['/research', 'Análisis'], ['/directorio', 'Directorio'], ['/eventos', 'Eventos']]],
            ['Club',      [['/contacto', 'Únete al Club'], ['/directorio', 'Equipo'], ['/eventos', 'Calendario'], ['/contacto', 'Contacto']]],
            ['Conecta',   []],
          ].map(([title, links]) => (
            <div key={title}>
              <div className={s.colTitle}>{title}</div>
              {title === 'Conecta' ? (
                <ul className={s.colLinks}>
                  <li><a href="https://www.linkedin.com/company/finance-club-udec/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                  <li><a href="https://www.instagram.com/fcudec/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                  <li><a href="mailto:financeclubudec@gmail.com">financeclubudec@gmail.com</a></li>
                </ul>
              ) : (
                <ul className={s.colLinks}>
                  {links.map(([href, label]) => (
                    <li key={label}><Link to={href}>{label}</Link></li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className={s.bottom}>
          <span>© 2026 Finance Club UdeC · Todos los derechos reservados</span>
          <Link to="/privacidad" className={s.legal}>Privacidad · Términos</Link>
        </div>
      </div>
    </footer>
  )
}