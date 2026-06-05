import React, { useState } from 'react'
import { useMarket } from '../hooks/useData'
import s from './Mercados.module.css'

const FALLBACK = [
  {sym:'IPSA',price:6847,chg:0.84,high:6900,low:6800},{sym:'USD/CLP',price:924.5,chg:-0.21,high:929,low:918},
  {sym:'S&P 500',price:5482,chg:0.37,high:5501,low:5460},{sym:'NASDAQ',price:19204,chg:0.52,high:19300,low:19100},
  {sym:'DAX',price:18920,chg:0.52,high:19000,low:18840},{sym:'IBEX 35',price:11432,chg:0.84,high:11480,low:11380},
  {sym:'EUR/USD',price:1.0842,chg:-0.08,high:1.088,low:1.081},{sym:'BTC/USD',price:67840,chg:2.11,high:68500,low:65900},
  {sym:'Oro',price:2341,chg:-0.14,high:2355,low:2330},{sym:'WTI',price:78.42,chg:1.02,high:79.1,low:77.8},
  {sym:'Cobre',price:4.58,chg:0.73,high:4.62,low:4.51},{sym:'VIX',price:14.23,chg:-0.31,high:14.9,low:13.8},
]
function fmt(price, sym) {
  if (['EUR/USD','Cobre','VIX'].includes(sym)) return price.toFixed(2)
  if (price >= 1000) return price.toLocaleString('es-CL',{maximumFractionDigits:1})
  return price.toFixed(2)
}

export default function Mercados() {
  const { quotes, loading, updatedAt, refresh } = useMarket()
  const live    = quotes.length >= 4
  const display = live ? quotes : FALLBACK

  return (
    <main className={s.page}>
      <div className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.eyebrow}>Mercados en vivo</div>
          <h1 className={s.title}>Cotizaciones</h1>
          <p className={s.subtitle}>Datos actualizados cada 60 segundos desde Yahoo Finance. Retardo máximo 15 minutos.</p>
        </div>
        <div className={s.headerRight}>
          <div className={`${s.liveTag} ${live ? s.liveBg : s.delayedBg}`}>
            <span className={s.liveDot} />
            {live ? 'EN VIVO' : 'DELAYED'}
          </div>
          {updatedAt && <div className={s.updated}>Actualizado: {new Date(updatedAt).toLocaleTimeString('es-CL')}</div>}
          <button className={s.refreshBtn} onClick={refresh}>↺ Actualizar</button>
        </div>
      </div>

      <div className="container">
        <table className={s.table}>
          <thead>
            <tr>
              <th>Instrumento</th>
              <th className={s.right}>Precio</th>
              <th className={s.right}>Cambio</th>
              <th className={s.right}>Máx. día</th>
              <th className={s.right}>Mín. día</th>
            </tr>
          </thead>
          <tbody>
            {(loading ? FALLBACK : display).map(q => (
              <tr key={q.sym} className={s.row}>
                <td className={s.symCell}>{q.sym}</td>
                <td className={`${s.right} ${s.price}`}>{fmt(q.price, q.sym)}</td>
                <td className={s.right}>
                  <span style={{ color: Number(q.chg) >= 0 ? '#34d17a' : '#f06060', fontWeight: 600, fontFamily: 'IBM Plex Mono, monospace' }}>
                    {Number(q.chg) >= 0 ? '▲' : '▼'} {Math.abs(Number(q.chg)).toFixed(2)}%
                  </span>
                </td>
                <td className={`${s.right} ${s.muted}`}>{q.high ? fmt(q.high, q.sym) : '—'}</td>
                <td className={`${s.right} ${s.muted}`}>{q.low  ? fmt(q.low,  q.sym) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={s.disclaimer}>Datos con posible retraso de hasta 15 minutos. Solo para fines educativos.</div>
      </div>
    </main>
  )
}
