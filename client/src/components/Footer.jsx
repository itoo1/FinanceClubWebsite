import React from 'react'
import { Link } from 'react-router-dom'
import s from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.inner}`}>
        <div className={s.grid}>
          <div className={s.brand}>
            <Link to="/" className={s.logo}>Finance <span>Club</span></Link>
            <p className={s.tagline}>El espacio de análisis financiero, macroeconomía y mercados de capital para la próxima generación de profesionales.</p>
          </div>
          {[
            ['Secciones', [['/', 'Inicio'], ['/mercados', 'Mercados'], ['/research', 'Análisis'], ['/directorio', 'Directorio'], ['/eventos', 'Eventos']]],
            ['Club',      [['/contacto','Únete al Club'], ['/directorio','Equipo'], ['/eventos','Eventos'], ['/contacto','Newsletter'], ['/contacto','Contacto']]],
            ['Recursos',  [['#','Glosario Financiero'], ['#','Modelos Excel'], ['#','Casos de Estudio'], ['#','Biblioteca'], ['#','Podcasts']]],
          ].map(([title, links]) => (
            <div key={title}>
              <div className={s.colTitle}>{title}</div>
              <ul className={s.colLinks}>
                {links.map(([href, label]) => (
                  <li key={label}><Link to={href}>{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={s.bottom}>
          <span>© 2026 Finance Club · Todos los derechos reservados</span>
          <div className={s.social}>
            <a href="https://www.linkedin.com/in/finance-club-udec-9b4b1a415/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/fcudec/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <Link to="/privacidad">Privacidad · Términos</Link>
        </div>
      </div>
    </footer>
  )
}