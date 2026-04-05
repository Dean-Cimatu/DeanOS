import { motion } from 'framer-motion'
import { useMobileStore } from '../store/mobileStore'
import { mobileApps } from '../data/mobileAppRegistry'
import { MobileSettings } from './MobileSettings'

import BrowserApp from '../../components/apps/BrowserApp'
import MusicPlayer from '../../components/apps/MusicPlayer'
import Calculator from '../../components/apps/Calculator'

function AppContent({ id }: { id: string }) {
  switch (id) {
    case 'browser':    return <BrowserApp initialPage="/" />
    case 'music':      return <MusicPlayer />
    case 'calculator': return <Calculator />
    case 'settings':   return <MobileSettings />
    default:
      return (
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#8899AA', fontFamily: '"JetBrains Mono", monospace', fontSize: 14,
        }}>
          Unknown app: {id}
        </div>
      )
  }
}

export const MobileAppShell = () => {
  const activeAppId = useMobileStore(s => s.activeAppId)
  const app = mobileApps.find(a => a.id === activeAppId)

  if (!activeAppId) return null

  return (
    <motion.div
      key={activeAppId}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.28, ease: [0.32, 0, 0.67, 0] }}
      style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0, left: 0,
        display: 'flex', flexDirection: 'column',
        background: '#0A0F1E',
        zIndex: 500,
      }}
    >
      {/* Safe area top */}
      <div style={{ height: 'env(safe-area-inset-top, 0px)', flexShrink: 0 }} />

      {/* Title bar */}
      <div style={{
        height: 44, flexShrink: 0,
        display: 'flex', alignItems: 'center',
        paddingLeft: 8, paddingRight: 16,
        background: 'rgba(10,15,30,0.95)',
        borderBottom: '1px solid #2A3F5F',
      }}>
        {/* Back button — spec style */}
        <button
          onPointerDown={e => e.stopPropagation()}
          onPointerUp={e => { e.stopPropagation(); useMobileStore.getState().closeApp() }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#8899AA', fontSize: '1.5rem',
            padding: '4px 8px 4px 4px',
            WebkitTapHighlightColor: 'transparent',
            lineHeight: 1,
            marginLeft: -4,
          }}
        >
          ‹
        </button>

        {/* App name centred */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{
            color: '#E8F4F8', fontSize: '0.9375rem', fontWeight: 600,
            fontFamily: 'Inter, -apple-system, sans-serif',
          }}>
            {app?.icon} {app?.name}
          </span>
        </div>

        {/* Right spacer balances the back button */}
        <div style={{ width: 40 }} />
      </div>

      {/* App content — leaves room at bottom for the home indicator pill */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', marginBottom: 20 }}>
        <AppContent id={activeAppId} />
      </div>
    </motion.div>
  )
}
