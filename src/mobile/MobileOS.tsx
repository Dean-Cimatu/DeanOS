import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useMobileDevice } from '../hooks/useMobileDevice'
import { useMobileStore } from './store/mobileStore'
import { MobileBootScreen } from './components/MobileBootScreen'
import { MobileLockScreen } from './components/MobileLockScreen'
import { MobileHomeScreen } from './components/MobileHomeScreen'
import { MobileAppShell } from './components/MobileAppShell'
import { MobileAppDrawer } from './components/MobileAppDrawer'

export const MobileOS = () => {
  const { isTouch } = useMobileDevice()
  const phase = useMobileStore(s => s.phase)
  const pointerStart = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    useMobileStore.getState().setIsTouch(isTouch)
  }, [isTouch])

  const handleBack = () => {
    const { phase: p } = useMobileStore.getState()
    if (p === 'app')    useMobileStore.getState().closeApp()
    if (p === 'drawer') useMobileStore.getState().closeDrawer()
  }

  const onPointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!pointerStart.current) return
    const dx = e.clientX - pointerStart.current.x
    const dy = e.clientY - pointerStart.current.y
    const isHorizontal = Math.abs(dx) > Math.abs(dy)

    // Back: left-edge swipe right
    if (pointerStart.current.x < 20 && dx > 60 && isHorizontal) {
      handleBack()
    }
    // Drawer: long upswipe from bottom edge (check before home — more specific)
    else if (pointerStart.current.y > window.innerHeight - 80 && dy < -120 && !isHorizontal) {
      useMobileStore.getState().openDrawer()
    }
    // Home: short upswipe from bottom edge
    else if (pointerStart.current.y > window.innerHeight - 60 && dy < -60 && !isHorizontal) {
      useMobileStore.getState().goHome()
    }

    pointerStart.current = null
  }

  const showPill = phase === 'home' || phase === 'app'

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0, left: 0,
        background: '#0A0F1E',
        overflow: 'hidden',
        userSelect: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {phase === 'boot'                         && <MobileBootScreen />}
      {phase === 'lock'                         && <MobileLockScreen />}
      {(phase === 'home' || phase === 'drawer') && <MobileHomeScreen />}
      {phase === 'app'                          && <MobileAppShell />}

      {/* Drawer always in tree so AnimatePresence can animate its exit */}
      <MobileAppDrawer />

      {/* Home indicator pill — visible on home and in-app, not during boot/lock/drawer */}
      {showPill && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          zIndex: 200,
          display: 'flex', justifyContent: 'center',
          paddingBottom: 'max(8px, env(safe-area-inset-bottom, 8px))',
          pointerEvents: 'none', // let taps pass through the padding area
        }}>
          <motion.div
            style={{
              width: 40, height: 4,
              backgroundColor: 'rgba(255,255,255,0.4)',
              borderRadius: 9999,
              cursor: 'pointer',
              pointerEvents: 'auto',
            }}
            whileTap={{ backgroundColor: 'rgba(255,255,255,0.8)', scaleX: 1.2 }}
            onPointerUp={() => useMobileStore.getState().goHome()}
          />
        </div>
      )}
    </div>
  )
}
