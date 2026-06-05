import { useState, useEffect, useCallback } from 'react'

export function useMarket() {
  const [data, setData]       = useState({ quotes: [], updatedAt: null })
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const fetch_ = useCallback(async () => {
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL || 'https://financeclubwebsite-production.up.railway.app'}/api/market`)
      if (!res.ok) throw new Error('failed')
      const json = await res.json()
      setData(json); setError(null)
    } catch(e) { setError(e.message) }
    finally    { setLoading(false) }
  }, [])

  useEffect(() => { fetch_(); const id = setInterval(fetch_, 60_000); return () => clearInterval(id) }, [fetch_])
  return { ...data, loading, error, refresh: fetch_ }
}

function useSimple(url) {
  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch(url).then(r => r.json()).then(d => { setItems(d); setLoading(false) }).catch(() => setLoading(false))
  }, [url])
  return { items, loading }
}

export function useMembers()  { const { items, loading } = useSimple('/api/members');  return { members: items, loading } }
export function useEvents()   { const { items, loading } = useSimple('/api/events');   return { events: items, loading } }
export function useResearch() { const { items, loading } = useSimple('/api/research'); return { reports: items, loading } }
export function useNews()     { const { items, loading } = useSimple('/api/news');     return { news: items, loading } }

export function useClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => {
      const n = new Date(), p = v => String(v).padStart(2,'0')
      setTime(`${p(n.getHours())}:${p(n.getMinutes())}:${p(n.getSeconds())} CLT`)
    }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id)
  }, [])
  return time
}
