import { useEffect, useId, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Badge } from './Badge'
import {
  IconApps,
  IconBookmark,
  IconClose,
  IconFeed,
  IconMenu,
  IconSettings,
  IconUser,
} from './icons'

const navItems = [
  { to: '/', key: 'nav.feed', end: true, Icon: IconFeed },
  { to: '/saved', key: 'nav.saved', Icon: IconBookmark },
  { to: '/applications', key: 'nav.applications', Icon: IconApps },
  { to: '/profile', key: 'nav.profile', Icon: IconUser },
  { to: '/settings', key: 'nav.settings', Icon: IconSettings },
] as const

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { tr } = useApp()

  return (
    <>
      <div>
        <p className="font-display text-[1.35rem] text-[var(--ink)]">HiddenHire</p>
        <p className="mt-1 text-[11px] leading-snug text-muted">{tr('brand.tagline')}</p>
        <div className="mt-3">
          <Badge>{tr('brand.demo')}</Badge>
        </div>
      </div>
      <nav className="flex flex-col gap-1" aria-label="Main">
        {navItems.map(({ to, key, Icon, ...rest }) => (
          <NavLink
            key={to}
            to={to}
            end={'end' in rest ? rest.end : false}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex min-h-11 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm ${
                isActive
                  ? 'bg-[var(--accent)] font-semibold text-white'
                  : 'text-[var(--ink)] hover:bg-black/5'
              }`
            }
          >
            <Icon className="h-4 w-4 opacity-90" />
            {tr(key)}
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export function Layout() {
  const { tr } = useApp()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const titleId = useId()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      {/* Desktop sidebar */}
      <aside className="hidden w-[15.5rem] shrink-0 flex-col gap-6 bg-[var(--sidebar)] px-5 py-6 md:flex">
        <SidebarNav />
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-[var(--ink)]/35 transition-opacity ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label={tr('nav.closeMenu')}
          onClick={() => setMenuOpen(false)}
        />
        <aside
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`absolute inset-y-0 left-0 flex w-[min(18rem,88vw)] flex-col gap-6 bg-[var(--sidebar)] px-5 py-6 shadow-xl transition-transform duration-200 ease-out ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <p id={titleId} className="sr-only">
              HiddenHire
            </p>
            <button
              type="button"
              className="touch-target -mr-1 -mt-1 ml-auto inline-flex items-center justify-center rounded-xl text-[var(--ink)] hover:bg-black/5"
              aria-label={tr('nav.closeMenu')}
              onClick={() => setMenuOpen(false)}
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>
          <SidebarNav onNavigate={() => setMenuOpen(false)} />
        </aside>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-[var(--border)] bg-[var(--bg)]/95 px-4 py-3 backdrop-blur md:hidden">
          <button
            type="button"
            className="touch-target inline-flex items-center justify-center rounded-xl bg-[var(--sidebar)] text-[var(--ink)]"
            aria-label={tr('nav.openMenu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(true)}
          >
            <IconMenu className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="font-display truncate text-base text-[var(--ink)]">HiddenHire</p>
            <p className="truncate text-[10px] text-muted">{tr('brand.demo')}</p>
          </div>
        </header>
        <main className="min-w-0 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
