import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import s from './Nav.module.css'

const LINKS = [
  { to: '/',           label: 'Inicio'     },
  { to: '/mercados',   label: 'Mercados'   },
  { to: '/research',   label: 'Análisis'   },
  { to: '/directorio', label: 'Directorio' },
  { to: '/eventos',    label: 'Eventos'    },
  { to: '/contacto',   label: 'Contacto'   },
]

export default function Nav({ scrolled = false }) {
  const [open, setOpen] = useState(false)

  return (
    <nav className={`${s.nav} ${scrolled ? s.scrolled : ''}`}>
      <Link to="/" className={s.logo}>
        Finance <span>Club</span>
      </Link>

      <ul className={`${s.links} ${open ? s.open : ''}`}>
        {LINKS.map(l => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
              <span className={s.linkUnderline} />
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={s.right}>
        <Link to="/contacto" className={s.btnLogin}>Ingresar</Link>
        <Link to="/contacto" className={s.btnJoin}>Únete</Link>
        <button className={s.hamburger} onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span className={open ? s.hOpen : ''}/><span className={open ? s.hOpen : ''}/><span className={open ? s.hOpen : ''}/>
        </button>
      </div>
    </nav>
  )
}
