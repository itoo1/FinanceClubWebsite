import React from 'react'
import { useHideOnScroll } from '../hooks/useEffects'
import TopBar from './TopBar'
import Ticker from './Ticker'
import Nav    from './Nav'
import s from './Header.module.css'

export default function Header() {
  const { hidden, scrolled } = useHideOnScroll()

  return (
    <div data-header className={`${s.header} ${hidden ? s.hidden : ''} ${scrolled ? s.scrolled : ''}`}>
      <TopBar />
      <Ticker />
      <Nav scrolled={scrolled} />
    </div>
  )
}
