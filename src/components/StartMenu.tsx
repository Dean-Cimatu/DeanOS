import { useState, useMemo, useRef, useEffect } from 'react'
import { useWindowStore } from '../store/windowStore'
import { AppIcon } from './os/AppIcon'
import type { WindowState } from '../store/windowStore'

// ── App catalogue ─────────────────────────────────────────────────────────

interface AppEntry {
  id: string
  name: string
  iconId: string
  appId: string
  category: 'internet' | 'system' | 'portfolio'
  description: string
  initialPage?: string
  singleton?: boolean
}

const ALL_APPS: AppEntry[] = [
  { id: 'browser',  name: 'Browser',        iconId: 'browser',  appId: 'browser',   category: 'internet',  description: 'Browse the web and portfolio' },
  { id: 'terminal', name: 'Terminal',        iconId: 'terminal', appId: 'terminal',  category: 'system',    description: 'Command line interface' },
  { id: 'files',    name: 'Files',           iconId: 'files',    appId: 'files',     category: 'system',    description: 'Browse the filesystem' },
  { id: 'settings', name: 'System Settings', iconId: 'settings', appId: 'settings',  category: 'system',    description: 'Customise your desktop', singleton: true },
  { id: 'about',    name: 'About Me',        iconId: 'about',    appId: 'browser',   category: 'portfolio', description: 'Personal background and bio', initialPage: '/about' },
  { id: 'projects', name: 'Projects',        iconId: 'projects', appId: 'browser',   category: 'portfolio', description: 'Portfolio project showcase', initialPage: '/projects' },
  { id: 'resume',   name: 'Resume / CV',     iconId: 'resume',   appId: 'browser',   category: 'portfolio', description: 'View and download CV', initialPage: '/cv' },
]

const FAVOURITES = ['browser', 'terminal', 'files', 'settings']

const CATEGORIES: { id: 'all' | AppEntry['category']; label: string; icon: string }[] = [
  { id: 'all',       label: 'All Applications', icon: '⊞' },
  { id: 'internet',  label: 'Internet',          icon: '🌐' },
  { id: 'system',    label: 'System Tools',      icon: '🛠' },
  { id: 'portfolio', label: 'Portfolio',          icon: '💼' },
]

// ── Open window helper ────────────────────────────────────────────────────

function launchApp(app: AppEntry, openWindow: (w: WindowState) => void, windows: Record<string, WindowState>, focusWindow: (id: string) => void) {
  if (app.singleton && windows[app.appId]) {
    focusWindow(app.appId)
    return
  }

  const ts = Date.now()
  const configs: Record<string, { w: number; h: number; x: number; y: number; title: string }> = {
    browser:  { w: 900, h: 600, x: 80,  y: 60, title: app.name },
    terminal: { w: 800, h: 500, x: 100, y: 80, title: 'Terminal' },
    files:    { w: 860, h: 540, x: 120, y: 70, title: 'Files' },
    settings: { w: 760, h: 520, x: 160, y: 80, title: 'System Settings' },
  }
  const cfg = configs[app.appId] ?? configs.browser
  openWindow({
    id: app.singleton ? app.appId : `${app.appId}-${ts}`,
    title: cfg.title,
    x: cfg.x, y: cfg.y,
    width: cfg.w, height: cfg.h,
    zIndex: 1, minimised: false, maximised: false,
    preMaxX: cfg.x, preMaxY: cfg.y, preMaxWidth: cfg.w, preMaxHeight: cfg.h,
    initialPage: app.initialPage,
  })
}

// ── Component ─────────────────────────────────────────────────────────────

export default function StartMenu() {
  const { openWindow, windows, focusWindow } = useWindowStore()
  const [query, setQuery]     = useState('')
  const [category, setCategory] = useState<'all' | AppEntry['category']>('all')
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => { searchRef.current?.focus() }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ALL_APPS.filter(a => {
      const matchesCat = category === 'all' || a.category === category
      const matchesQuery = !q || a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
      return matchesCat && matchesQuery
    })
  }, [query, category])

  const favApps = useMemo(() => ALL_APPS.filter(a => FAVOURITES.includes(a.id)), [])

  const launch = (app: AppEntry) => launchApp(app, openWindow, windows, focusWindow)

  const menuH = 472

  return (
    <div
      onClick={e => e.stopPropagation()}
      style={{
        position: 'absolute', bottom: '44px', left: 0,
        width: 540, height: menuH,
        backgroundColor: '#111C2E',
        border: '1px solid #1E3050',
        borderRadius: '12px 12px 0 0',
        boxShadow: '0 -12px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', zIndex: 2000,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* ── Header: user info ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '14px',
        padding: '16px 18px 12px',
        background: 'linear-gradient(180deg, #152035 0%, #111C2E 100%)',
        borderBottom: '1px solid #1A2D45',
        flexShrink: 0,
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: '50%',
          background: 'linear-gradient(135deg, #00D4FF, #7C3AED)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '15px', fontWeight: 700, color: 'white', flexShrink: 0,
          fontFamily: 'Inter, sans-serif',
          boxShadow: '0 2px 8px rgba(0,212,255,0.3)',
        }}>
          DC
        </div>
        <div>
          <div style={{ color: '#E8F4F8', fontSize: '14px', fontWeight: 600 }}>dean</div>
          <div style={{ color: '#8899AA', fontSize: '11px', marginTop: '1px' }}>DeanOS v2.1.0</div>
        </div>
        {/* Search */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center',
            backgroundColor: '#0A1525', border: '1px solid #1E2D45',
            borderRadius: '8px', padding: '6px 12px', gap: '7px',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" stroke="#8899AA" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="#8899AA" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              ref={searchRef}
              value={query}
              onChange={e => { setQuery(e.target.value); setCategory('all') }}
              placeholder="Search..."
              style={{
                background: 'none', border: 'none', outline: 'none',
                color: '#E8F4F8', fontSize: '13px', flex: 1, minWidth: 0,
                fontFamily: 'Inter, sans-serif',
              }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{
                background: 'none', border: 'none', color: '#8899AA',
                cursor: 'pointer', padding: 0, fontSize: '14px', lineHeight: 1,
              }}>×</button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main body ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Left column: Favourites + Categories */}
        <div style={{
          width: 192, flexShrink: 0,
          borderRight: '1px solid #1A2D45',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto', padding: '10px 8px',
        }}>
          {/* Favourites — only shown when not searching */}
          {!query && (
            <>
              <div style={{ fontSize: '10px', color: '#3A5070', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, padding: '2px 10px 8px' }}>
                Favourites
              </div>
              {favApps.map(app => (
                <FavRow key={app.id} app={app} onLaunch={() => launch(app)} />
              ))}
              <div style={{ borderTop: '1px solid #1A2D45', margin: '10px 4px' }} />
              <div style={{ fontSize: '10px', color: '#3A5070', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, padding: '2px 10px 8px' }}>
                Categories
              </div>
              {CATEGORIES.map(cat => (
                <CatRow
                  key={cat.id}
                  cat={cat}
                  active={category === cat.id}
                  onClick={() => setCategory(cat.id)}
                />
              ))}
            </>
          )}
          {query && (
            <div style={{ padding: '8px 10px', color: '#8899AA', fontSize: '12px' }}>
              Searching all apps…
            </div>
          )}
        </div>

        {/* Right column: App list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 6px' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '24px 16px', color: '#3A5070', fontSize: '13px', textAlign: 'center' }}>
              No apps found for "{query}"
            </div>
          ) : (
            filtered.map(app => (
              <AppRow key={app.id} app={app} onLaunch={() => launch(app)} />
            ))
          )}
        </div>
      </div>

      {/* ── Bottom bar: places + power ── */}
      <BottomBar onLaunch={launch} openWindow={openWindow} windows={windows} focusWindow={focusWindow} />
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────

function FavRow({ app, onLaunch }: { app: AppEntry; onLaunch: () => void }) {
  return (
    <button onClick={onLaunch} style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '7px 10px', borderRadius: '7px', border: 'none',
      background: 'transparent', color: '#C0D4E8',
      fontSize: '12px', cursor: 'pointer', width: '100%', textAlign: 'left',
      fontFamily: 'Inter, sans-serif', transition: 'background 0.1s',
    }}
      onMouseEnter={e => { e.currentTarget.style.background = '#1A2D45' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
    >
      <AppIcon iconId={app.iconId} size={22} />
      {app.name}
    </button>
  )
}

function CatRow({ cat, active, onClick }: {
  cat: (typeof CATEGORIES)[0]; active: boolean; onClick: () => void
}) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '7px 10px', borderRadius: '7px', border: 'none',
      background: active ? '#1A3050' : 'transparent',
      color: active ? '#00D4FF' : '#8899AA',
      fontSize: '12px', cursor: 'pointer', width: '100%', textAlign: 'left',
      fontFamily: 'Inter, sans-serif', transition: 'background 0.1s, color 0.1s',
    }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#1A2D45' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
    >
      <span style={{ width: 22, textAlign: 'center', fontSize: '13px' }}>{cat.icon}</span>
      {cat.label}
    </button>
  )
}

function AppRow({ app, onLaunch }: { app: AppEntry; onLaunch: () => void }) {
  return (
    <button onClick={onLaunch} style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '8px 10px', borderRadius: '8px', border: 'none',
      background: 'transparent', color: '#C0D4E8',
      cursor: 'pointer', width: '100%', textAlign: 'left',
      fontFamily: 'Inter, sans-serif', transition: 'background 0.1s',
    }}
      onMouseEnter={e => { e.currentTarget.style.background = '#1A2D45' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
    >
      <AppIcon iconId={app.iconId} size={32} />
      <div>
        <div style={{ fontSize: '13px', fontWeight: 500, color: '#E8F4F8' }}>{app.name}</div>
        <div style={{ fontSize: '11px', color: '#8899AA', marginTop: '1px' }}>{app.description}</div>
      </div>
    </button>
  )
}

function BottomBar({ onLaunch, openWindow, windows, focusWindow }: {
  onLaunch: (app: AppEntry) => void
  openWindow: (w: WindowState) => void
  windows: Record<string, WindowState>
  focusWindow: (id: string) => void
}) {
  const places: AppEntry[] = [
    { id: 'home',     name: 'Home',     iconId: 'files',    appId: 'files',    category: 'system',    description: 'Home folder' },
    { id: 'projects', name: 'Projects', iconId: 'projects', appId: 'browser',  category: 'portfolio', description: 'Portfolio projects', initialPage: '/projects' },
    { id: 'settings', name: 'Settings', iconId: 'settings', appId: 'settings', category: 'system',    description: 'System settings', singleton: true },
  ]

  const iconBtn = (label: string, onClick: () => void, title: string): React.ReactNode => (
    <button key={label} title={title} onClick={onClick} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
      background: 'none', border: 'none', color: '#8899AA',
      cursor: 'pointer', padding: '6px 10px', borderRadius: '7px',
      fontSize: '10px', fontFamily: 'Inter, sans-serif',
      transition: 'background 0.1s, color 0.1s',
    }}
      onMouseEnter={e => { e.currentTarget.style.background = '#1A2D45'; e.currentTarget.style.color = '#E8F4F8' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#8899AA' }}
    >
      <span style={{ fontSize: '16px' }}>{label}</span>
      {title}
    </button>
  )

  return (
    <div style={{
      borderTop: '1px solid #1A2D45', padding: '6px 12px',
      backgroundColor: '#0C1625',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexShrink: 0,
    }}>
      {/* Places */}
      <div style={{ display: 'flex', gap: '2px' }}>
        {places.map(p => (
          <PlaceBtn key={p.id} app={p} onLaunch={() => onLaunch(p)} />
        ))}
      </div>

      {/* Power / session */}
      <div style={{ display: 'flex', gap: '2px' }}>
        {iconBtn('🔒', () => alert('Lock screen'), 'Lock')}
        {iconBtn('↩', () => window.location.reload(), 'Log out')}
        {iconBtn('⏻', () => window.location.reload(), 'Power')}
      </div>
    </div>
  )
}

function PlaceBtn({ app, onLaunch }: { app: AppEntry; onLaunch: () => void }) {
  return (
    <button onClick={onLaunch} title={app.name} style={{
      display: 'flex', alignItems: 'center', gap: '7px',
      background: 'none', border: 'none', color: '#8899AA',
      cursor: 'pointer', padding: '5px 10px', borderRadius: '7px',
      fontSize: '12px', fontFamily: 'Inter, sans-serif',
      transition: 'background 0.1s, color 0.1s',
    }}
      onMouseEnter={e => { e.currentTarget.style.background = '#1A2D45'; e.currentTarget.style.color = '#E8F4F8' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#8899AA' }}
    >
      <AppIcon iconId={app.iconId} size={18} />
      {app.name}
    </button>
  )
}
