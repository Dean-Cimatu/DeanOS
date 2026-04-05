import { motion } from 'framer-motion'
import { useMobileStore } from '../store/mobileStore'
import { mobileApps } from '../data/mobileAppRegistry'
import { MobileNavBar } from './MobileNavBar'

// Desktop app components — all render correctly with width/height 100%
import BrowserApp from '../../components/apps/BrowserApp'
import MusicPlayer from '../../components/apps/MusicPlayer'
import Calculator from '../../components/apps/Calculator'
import Terminal from '../../components/Terminal'
import Settings from '../../components/apps/Settings'
import PicoRacer from '../../components/apps/PicoRacer'
import RogueSurvivor from '../../components/apps/RogueSurvivor'

function AppContent({ id }: { id: string }) {
  switch (id) {
    case 'browser':    return <BrowserApp initialPage="/" />
    case 'music':      return <MusicPlayer />
    case 'calculator': return <Calculator />
    case 'terminal':   return <Terminal />
    case 'settings':   return <Settings />
    case 'pico-racer': return <PicoRacer />
    case 'rogue':      return <RogueSurvivor />
    // Portfolio pages open in the browser app at the relevant route
    case 'projects':   return <BrowserApp initialPage="/projects" />
    case 'cv':         return <BrowserApp initialPage="/cv" />
    case 'contact':    return <BrowserApp initialPage="/contact" />
    default:
      return (
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#8899AA', fontFamily: 'JetBrains Mono, monospace', fontSize: 14,
        }}>
          App not found: {id}
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
        paddingLeft: 16, paddingRight: 16,
        background: 'rgba(10,15,30,0.95)',
        borderBottom: '1px solid #2A3F5F',
      }}>
        {/* Close / back */}
        <button
          onClick={() => useMobileStore.getState().closeApp()}
          onTouchEnd={(e) => { e.preventDefault(); useMobileStore.getState().closeApp() }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#00D4FF', fontSize: '1rem',
            fontFamily: 'Inter, -apple-system, sans-serif',
            padding: '8px 8px 8px 0',
            WebkitTapHighlightColor: 'transparent',
            display: 'flex', alignItems: 'center', gap: 4,
          }}
        >
          ‹ Home
        </button>

        {/* App name — centred */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{
            color: '#E8F4F8',
            fontSize: '0.9375rem', fontWeight: 600,
            fontFamily: 'Inter, -apple-system, sans-serif',
          }}>
            {app?.icon} {app?.name}
          </span>
        </div>

        {/* Right spacer matches left button width for centred title */}
        <div style={{ width: 72 }} />
      </div>

      {/* App content — fills remaining space */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <AppContent id={activeAppId} />
      </div>

      {/* Nav bar */}
      <MobileNavBar />
    </motion.div>
  )
}
