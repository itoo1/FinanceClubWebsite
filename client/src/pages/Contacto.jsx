import React, { useState } from 'react'
import s from './Contacto.module.css'

export default function Contacto() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mrednzvj', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(e.target)
      })
      if (res.ok) {
        setStatus('done')
        setTimeout(() => { setStatus('idle'); e.target.reset() }, 3500)
      } else { setStatus('error'); setTimeout(() => setStatus('idle'), 3500) }
    } catch { setStatus('error'); setTimeout(() => setStatus('idle'), 3500) }
  }

  return (
    <main className={s.page}>
      <div className={s.header}>
        <div className={s.eyebrow}>Contacto</div>
        <h1 className={s.title}>Únete al Club</h1>
        <p className={s.subtitle}>Somos el club de finanzas de la <strong>Universidad de Concepción</strong>. Abiertos a todos los estudiantes interesados en mercados, análisis cuantitativo y tecnología financiera.</p>
      </div>

      <div className="container">
        <div className={s.grid}>
          <div className={s.left}>
            <div className={s.infoSection}>
              <div className={s.secTitle}>Información de contacto</div>
              {[
                ['Email',    'financeclubudec@gmail.com'],
                ['Sesiones', 'Jueves · 17:00 h · Lab. Finanzas'],
                ['Sede',     'FACEA · Facultad de Cs. Económicas y Administrativas · Lab. Finanzas · UdeC'],
                ['Redes',    'LinkedIn · Instagram · Newsletter'],
              ].map(([l,v]) => (
                <div className={s.infoRow} key={l}>
                  <span className={s.infoLabel}>{l}</span>
                  <span className={s.infoVal}>{v}</span>
                </div>
              ))}
            </div>
            <div className={s.infoSection}>
              <div className={s.secTitle}>¿Por qué unirte?</div>
              {['Acceso a terminales Bloomberg','Informes de research exclusivos','Red de alumni en la industria','Competición semestral de carteras','Talleres con profesionales'].map(b => (
                <div className={s.benefit} key={b}>
                  <span className={s.bulletAccent}>▸</span> {b}
                </div>
              ))}
            </div>
          </div>

          <div className={s.formBox}>
            <div className={s.formTitle}>Formulario de contacto</div>
            <form onSubmit={handleSubmit} className={s.form}>
              {[
                ['nombre','Nombre completo','text','Ej. María García',true],
                ['email','Correo electrónico','email','nombre@universidad.edu',true],
                ['carrera','Carrera / Año','text','Ej. Ingeniería Comercial, 3.º',false],
              ].map(([name,label,type,ph,req]) => (
                <div className={s.field} key={name}>
                  <label className={s.label}>{label}</label>
                  <input className={s.input} type={type} name={name} placeholder={ph} required={req} />
                </div>
              ))}
              <div className={s.field}>
                <label className={s.label}>Mensaje</label>
                <textarea className={s.input} name="mensaje" rows={4} placeholder="¿Qué te gustaría saber del club?" required />
              </div>
              <button type="submit" className={`${s.submitBtn} ${status==='done'?s.done:''}`} disabled={status==='sending'}>
                {status === 'idle'    && 'Enviar mensaje →'}
                {status === 'sending' && 'Enviando...'}
                {status === 'done'    && 'Mensaje enviado ✓'}
                {status === 'error'   && 'Error — intenta de nuevo'}
              </button>
              <p className={s.privacyNotice}>
                Al enviar este formulario aceptas que tus datos sean usados únicamente para contactarte sobre las actividades del club. No los compartimos con terceros.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}