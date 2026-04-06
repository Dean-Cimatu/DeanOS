import { AnimatePresence, motion } from 'framer-motion'
import { useMobileStore } from '../store/mobileStore'
import { MobileAppHeader } from './MobileAppHeader'
import { MobileAppContent } from './MobileAppContent'

type Origin = { x: number; y: number; width: number; height: number }

function getInitial(origin: Origin | null) {
  if (!origin) return { x: '100%' as unknown as number, opacity: 0, scale: 1, borderRadius: 0 }

  const scaleX = origin.width  / window.innerWidth
  const scaleY = origin.height / window.innerHeight
  const scale  = Math.max(scaleX, scaleY)

  // Translate the full-screen div's centre to the icon's centre
  const tx = (origin.x + origin.width  / 2) - window.innerWidth  / 2
  const ty = (origin.y + origin.height / 2) - window.innerHeight / 2

  return { x: tx, y: ty, scale, borderRadius: 24, opacity: 0.7 }
}

function getExit(origin: Origin | null) {
  if (!origin) return { x: '100%' as unknown as number, opacity: 0, scale: 1, borderRadius: 0 }

  const scale = Math.max(
    origin.width  / window.innerWidth,
    origin.height / window.innerHeight,
  )
  const tx = (origin.x + origin.width  / 2) - window.innerWidth  / 2
  const ty = (origin.y + origin.height / 2) - window.innerHeight / 2

  return { x: tx, y: ty, scale, borderRadius: 24, opacity: 0 }
}

export const MobileAppView = () => {
  const phase      = useMobileStore(s => s.phase)
  const activeAppId = useMobileStore(s => s.activeAppId)
  const openOrigin  = useMobileStore(s => s.openOrigin)

  return (
    <AnimatePresence mode="wait">
      {phase === 'app' && activeAppId && (
        <motion.div
          key={activeAppId}
          initial={getInitial(openOrigin)}
          animate={{ x: 0, y: 0, scale: 1, borderRadius: 0, opacity: 1 }}
          exit={getExit(openOrigin)}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          style={{
            position: 'fixed',
            top: 0, right: 0, bottom: 0, left: 0,
            zIndex: 500,
            display: 'flex', flexDirection: 'column',
            background: '#0A0F1E',
            overflow: 'hidden',
          }}
        >
          <MobileAppHeader appId={activeAppId} />

          <div style={{ flex: 1, overflow: 'hidden', position: 'relative', marginBottom: 20 }}>
            <MobileAppContent appId={activeAppId} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
