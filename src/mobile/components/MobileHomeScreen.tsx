import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileStatusBar } from './MobileStatusBar'
import { MobileAppIcon } from './MobileAppIcon'
import { mobileApps } from '../data/mobileAppRegistry'
import { useMobileStore } from '../store/mobileStore'

export const MobileHomeScreen = () => {
  const [showHint, setShowHint] = useState(() => !localStorage.getItem('drawerHintSeen'))

  useEffect(() => {
    if (showHint) {
      const id = setTimeout(() => {
        setShowHint(false)
        localStorage.setItem('drawerHintSeen', 'true')
      }, 3000)
      return () => clearTimeout(id)
    }
  }, [showHint])

  return (
    <div style={{
      position: 'fixed',
      top: 0, right: 0, bottom: 0, left: 0,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Wallpaper */}
      <div style={{
        position: 'absolute',
        top: 0, right: 0, bottom: 0, left: 0,
        zIndex: 0,
        background: [
          'radial-gradient(ellipse at 30% 20%, #003355 0%, #0A0F1E 60%)',
          'radial-gradient(ellipse at 70% 80%, #001a33 0%, transparent 50%)',
        ].join(', '),
      }} />

      {/* Status bar spacer */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <MobileStatusBar />
      </div>

      {/* App icon grid — compresses in on mount, icons stagger upward */}
      <div style={{
        position: 'relative', zIndex: 10,
        flex: 1, overflowY: 'auto',
        padding: '16px 16px 8px 16px',
        touchAction: 'pan-y',
      }}>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            columnGap: 8, rowGap: 24,
            justifyItems: 'center',
          }}
        >
          {mobileApps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 25,
                delay: Math.min(index, 10) * 0.04,
              }}
            >
              <MobileAppIcon
                {...app}
                onTap={() => useMobileStore.getState().openApp(app.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Drawer hint — shows once on first load */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            style={{
              position: 'fixed',
              bottom: 32, left: 0, right: 0,
              display: 'flex', justifyContent: 'center',
              zIndex: 99,
              pointerEvents: 'none',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <span style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: 12,
              fontFamily: 'Inter, -apple-system, sans-serif',
            }}>
              ↑ Swipe up for all apps
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
