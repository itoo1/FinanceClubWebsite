import React from 'react'
import { Link } from 'react-router-dom'
import s from './Privacidad.module.css'

const sections = [
  {
    title: '1. Sobre nosotros',
    text: 'Finance Club es una sociedad académica estudiantil de la Universidad de Concepción, sin fines de lucro, dedicada al estudio de las finanzas, los mercados de capital y la economía aplicada.'
  },
  {
    title: '2. Información que recolectamos',
    text: 'A través del formulario de contacto solicitamos nombre, correo electrónico, carrera, año académico y mensaje. No utilizamos cookies de seguimiento ni herramientas de analítica que identifiquen personalmente a los visitantes.'
  },
  {
    title: '3. Cómo usamos tu información',
    text: 'Los datos enviados se utilizan exclusivamente para responder tu solicitud, informarte sobre actividades del club y mantener una base interna de miembros. No compartimos ni transferimos tus datos a terceros.'
  },
  {
    title: '4. Almacenamiento y seguridad',
    text: 'Los mensajes se procesan a través de Formspree con cifrado TLS. La información de los miembros se almacena con acceso restringido a la directiva.'
  },
  {
    title: '5. Datos de mercados financieros',
    text: 'Las cotizaciones mostradas provienen de Yahoo Finance. Esta información tiene fines exclusivamente educativos y no constituye recomendación de inversión.'
  },
  {
    title: '6. Tus derechos (Ley 19.628)',
    text: 'Puedes solicitar acceso, rectificación o eliminación de tus datos en cualquier momento escribiendo a financeclubudec@gmail.com.'
  },
  {
    title: '7. Limitación de responsabilidad',
    text: 'El contenido publicado en este sitio es producido por estudiantes con fines académicos. No constituye asesoría financiera profesional ni opinión oficial de la Universidad de Concepción.'
  },
]

export default function Privacidad() {
  return (
    <main className={s.page}>
      <div className={s.header}>
        <div className={s.eyebrow}>Legal</div>
        <h1 className={s.title}>Política de Privacidad y Términos</h1>
        <p className={s.subtitle}>Última actualización: junio 2026</p>
      </div>
      <div className="container">
        <div className={s.content}>
          {sections.map((sec, i) => (
            <div key={i} className={s.section}>
              <h2 className={s.secTitle}>{sec.title}</h2>
              <p className={s.secText}>{sec.text}</p>
            </div>
          ))}
          <div className={s.back}>
            <Link to="/" className={s.backLink}>← Volver al inicio</Link>
          </div>
        </div>
      </div>
    </main>
  )
}