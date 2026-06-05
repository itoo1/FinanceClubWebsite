import React, { useMemo } from 'react'
import { useMarket } from '../hooks/useData'
import s from './Ticker.module.css'

const FALLBACK = [
  {sym:'IPSA',price:6847,chg:0.84},{sym:'USD/CLP',price:924.5,chg:-0.21},
  {sym:'S&P 500',price:5482,chg:0.37},{sym:'NASDAQ',price:19204,chg:0.52},
  {sym:'Oro',price:2341,chg:-0.14},{sym:'WTI',price:78.42,chg:1.02},
  {sym:'BTC/USD',price:67840,chg:2.11},{sym:'EUR/USD',price:1.0842,chg:-0.08},
  {sym:'Cobre',price:4.58,chg:0.73},{sym:'BOVESPA',price:128450,chg:-0.45},
]

function fmt(price, sym) {
  if (['EUR/USD','Cobre'].includes(sym)) return price.toFixed(2)
  if (price >= 1000) return price.toLocaleString('es-CL', { maximumFractionDigits: 1 })
  return price.toFixed(2)
}

export default function Ticker() {
  const { quotes, loading, error } = useMarket()
  const live  = !loading && !error && quotes.length >= 4
  const items = live ? quotes : FALLBACK
  const doubled = useMemo(() => [...items, ...items], [items])

  return (
    <div className={s.wrap}>
      <div className={s.label}>{live ? 'EN VIVO' : 'DELAYED'}</div>
      <div className={s.scroll}>
        <div className={s.track} style={{ animationDuration: `${doubled.length * 3}s` }}>
          {doubled.map((t, i) => (
            <div className={s.item} key={i}>
              <span className={s.name}>{t.sym}</span>
              <span className={s.val}>{fmt(t.price, t.sym)}</span>
              <span className={`${s.chg} ${t.chg >= 0 ? s.up : s.dn}`}>
                {t.chg >= 0 ? '▲' : '▼'} {Math.abs(t.chg).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
