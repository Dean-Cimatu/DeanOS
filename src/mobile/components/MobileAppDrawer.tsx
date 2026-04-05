import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMobileStore } from '../store/mobileStore'
import { mobileApps } from '../data/mobileAppRegistry'
import { MobileAppIcon } from './MobileAppIcon'

const CATEGORY_LABELS: Record<string, string> = {
  portfolio: 'Portfolio',
  media:     'Media',
  utilities: 'Utilities',
}

export const MobileAppDrawer = () => {
  const drawerOpen = useMobileStore(s => s.drawerOpen)
  const [search, setSearch] = useState('')
  const dragStart = useRef<number | null>(null)

  const closeDrawer = () => {
    useMobileStore.getState().closeDrawer()
    setSearch('')
  }

  const handleAppTap = (id: string) => {
    closeDrawer()
    setTimeout(() => useMobileStore.getState().openApp(id), 150)
  }

  // Filter or group
  const query = search.trim().toLowerCase()
  const filtered = query
    ? mobileApps.filter(a => a.name.toLowerCase().includes(query))
    : null

  // Grouped for no-search state
  const categories = [...new Set(mobileApps.map(a => a.category))]
  const grouped = categories.map(cat => ({
    category: cat,
    apps: mobileApps.filter(a => a.category === cat),
  }))

  return (
    <AnimatePresence>
      {drawerOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'fixed',
            top: 0, right: 0, bottom: 0, left: 0,
            zIndex: 600,
            display: 'flex', flexDirection: 'column',
            background: 'rgba(10,15,30,0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Safe area top */}
          <div style={{ height: 'env(safe-area-inset-top, 0px)', flexShrink: 0 }} />

          {/* Drag handle */}
          <div
            style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 8px', flexShrink: 0, cursor: 'grab' }}
            onPointerDown={e => { dragStart.current = e.clientY }}
            onPointerUp={e => {
              if (dragStart.current !== null && e.clientY - dragStart.current > 80) closeDrawer()
              dragStart.current = null
            }}
          >
            <div style={{
              width: 40, height: 4,
              background: 'rgba(255,255,255,0.3)',
              borderRadius: 9999,
            }} />
          </div>

          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '4px 20px 12px',
            flexShrink: 0,
          }}>
            <span style={{
              fontSize: 20, fontWeight: 700, color: '#E8F4F8',
              fontFamily: 'Inter, -apple-system, sans-serif',
            }}>
              All Apps
            </span>
            <button
              onClick={closeDrawer}
              onTouchEnd={e => { e.preventDefault(); closeDrawer() }}
              style={{
                background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.7)', fontSize: 13,
                fontFamily: 'Inter, -apple-system, sans-serif',
                padding: '6px 14px', borderRadius: 20,
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              Done
            </button>
          </div>

          {/* Search bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 12, padding: '10px 14px',
            margin: '0 16px 16px',
            border: '1px solid rgba(255,255,255,0.08)',
            flexShrink: 0,
          }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>🔍</span>
            <input
              type="text"
              placeholder="Search apps..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: 'white', fontSize: 15,
                fontFamily: 'Inter, -apple-system, sans-serif',
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.4)', fontSize: 14, padding: 2,
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* App grid */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px', touchAction: 'pan-y' }}>

            {/* Search results */}
            {filtered && (
              filtered.length === 0 ? (
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '32px 0',
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: 14, fontFamily: 'Inter, -apple-system, sans-serif',
                }}>
                  No apps found
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  columnGap: 8, rowGap: 24,
                  justifyItems: 'center',
                  paddingTop: 8,
                }}>
                  {filtered.map(app => (
                    <MobileAppIcon key={app.id} {...app} onTap={() => handleAppTap(app.id)} />
                  ))}
                </div>
              )
            )}

            {/* Grouped (no search) */}
            {!filtered && grouped.map(({ category, apps }) => (
              <div key={category}>
                <div style={{
                  fontSize: 10, fontWeight: 700,
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontFamily: 'Inter, -apple-system, sans-serif',
                  marginTop: 20, marginBottom: 10,
                }}>
                  {CATEGORY_LABELS[category] ?? category}
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  columnGap: 8, rowGap: 24,
                  justifyItems: 'center',
                }}>
                  {apps.map(app => (
                    <MobileAppIcon key={app.id} {...app} onTap={() => handleAppTap(app.id)} />
                  ))}
                </div>
              </div>
            ))}

            {/* Bottom breathing room */}
            <div style={{ height: 24 }} />
          </div>

          {/* Safe area spacer — no nav bar */}
          <div style={{
            height: 'max(20px, env(safe-area-inset-bottom, 20px))',
            flexShrink: 0,
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
