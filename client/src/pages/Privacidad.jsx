import React from 'react'
import { Link } from 'react-router-dom'
import s from './Privacidad.module.css'

export default function Privacidad() {
  return (
    <main className={s.page}>
      <div className={s.header}>
        <div className={s.eyebrow}>Privacidad</div>
        <h1 className={s.title}>Política de Privacidad y Términos</h1>
        <p className={s.subtitle}>Última actualización: junio 2026</p>
      </div>

      <div className="container">
        <div className={s.content}>
          <h2>1. Sobre nosotros</h2>
          <p>Finance Club es una sociedad académica estudiantil de la Universidad de Concepción, sin fines de lucro, dedicada al estudio de las finanzas, los mercados de capital y la economía aplicada.</p>

          <h2>2. Información que recolectamos</h2>
          <p>A través del formulario de contacto en este sitio solicitamos: nombre, correo electrónico, carrera y año académico, y el mensaje que decidas enviarnos. No utilizamos cookies de seguimiento ni herramientas de analítica que identifiquen personalmente a nuestros visitantes.</p>

          <h2>3. Cómo usamos tu información</h2>
          <p>Los datos enviados a través del formulario se utilizan exclusivamente para:</p>
          <ul>
            <li>Responder a tu solicitud de contacto</li>
            <li>Informarte sobre actividades, sesiones y eventos del club</li>
            <li>Mantener una base interna de miembros y postulantes</li>
          </ul>
          <p>No compartimos, vendemos ni transferimos tus datos a terceros bajo ninguna circunstancia.</p>

          <h2>4. Almacenamiento y seguridad</h2>
          <p>Los mensajes del formulario de contacto se procesan a través del servicio Formspree, que cuenta con cifrado TLS. La información de los miembros se almacena en sistemas internos del club con acceso restringido a la directiva.</p>

          <h2>5. Datos de mercados financieros</h2>
          <p>Las cotizaciones mostradas en la sección de Mercados provienen de fuentes públicas (Yahoo Finance). Esta información tiene fines exclusivamente educativos y no constituye recomendación de inversión.</p>

          <h2>6. Tus derechos</h2>
          <p>De acuerdo a la Ley N° 19.628 sobre Protección de la Vida Privada de Chile, puedes solicitar en cualquier momento: acceso a tus datos, rectificación de información incorrecta, o eliminación completa de tus datos de nuestros registros. Escríbenos a <a href="mailto:contacto@financeclub.cl" className={s.link}>contacto@financeclub.cl</a>.</p>

          <h2>7. Limitación de responsabilidad</h2>
          <p>El contenido educativo, los análisis y los datos financieros publicados en este sitio son producidos por estudiantes con fines académicos. No constituyen asesoría financiera profesional, recomendación de inversión, ni opinión oficial de la Universidad de Concepción.</p>

          <h2>8. Contacto</h2>
          <p>Para cualquier consulta sobre esta política, escríbenos a <a href="mailto:contacto@financeclub.cl" className={s.link}>contacto@financeclub.cl</a>.</p>

          <div className={s.backLink}>
            <Link to="/">← Volver al inicio</Link>
          </div>
        </div>
      </div>
    </main>
  )
}