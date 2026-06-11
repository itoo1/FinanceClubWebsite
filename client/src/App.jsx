import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header     from './components/Header'
import Footer     from './components/Footer'
import Home       from './pages/Home'
import Directorio from './pages/Directorio'
import Mercados   from './pages/Mercados'
import Eventos    from './pages/Eventos'
import Research   from './pages/Research'
import Contacto   from './pages/Contacto'
import Privacidad from './pages/Privacidad'

function PageWrapper({ children }) {
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    const id = setTimeout(() => setVisible(true), 30)
    return () => clearTimeout(id)
  }, [])
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(10px)',
      transition: 'opacity 0.45s ease, transform 0.45s ease',
    }}>
      {children}
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/"           element={<PageWrapper><Home /></PageWrapper>}       />
      <Route path="/directorio" element={<PageWrapper><Directorio /></PageWrapper>} />
      <Route path="/mercados"   element={<PageWrapper><Mercados /></PageWrapper>}   />
      <Route path="/eventos"    element={<PageWrapper><Eventos /></PageWrapper>}    />
      <Route path="/research"   element={<PageWrapper><Research /></PageWrapper>}   />
      <Route path="/contacto"   element={<PageWrapper><Contacto /></PageWrapper>}   />
      <Route path="/privacidad" element={<PageWrapper><Privacidad /></PageWrapper>} />
    </Routes>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <AnimatedRoutes />
      <Footer />
    </>
  )
}