import { AnimatePresence, motion } from 'framer-motion'
import { useMobileStore } from '../store/mobileStore'
import { MobileAppHeader } from './MobileAppHeader'
import { MobileAppContent } from './MobileAppContent'

export const MobileAppView = () => {
  const phase = useMobileStore(s => s.phase)
  const activeAppId = useMobileStore(s => s.activeAppId)

  return (
    <AnimatePresence mode="wait">
      {phase === 'app' && activeAppId && (
        <motion.div
          key={activeAppId}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 350, damping: 35 }}
          style={{
            position: 'fixed',
            top: 0, right: 0, bottom: 0, left: 0,
            zIndex: 500,
            display: 'flex', flexDirection: 'column',
            background: '#0A0F1E',
          }}
        >
          {/* Safe area top */}
          <div style={{ height: 'env(safe-area-inset-top, 0px)', flexShrink: 0 }} />

          <MobileAppHeader appId={activeAppId} />

          {/* App content — leave room for the home indicator pill */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative', marginBottom: 20 }}>
            <MobileAppContent appId={activeAppId} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
