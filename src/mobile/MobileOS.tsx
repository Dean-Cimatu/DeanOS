import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMobileDevice } from '../hooks/useMobileDevice'
import { useMobileStore } from './store/mobileStore'
import { MobileBootScreen } from './components/MobileBootScreen'
import { MobileLockScreen } from './components/MobileLockScreen'
import { MobileHomeScreen } from './components/MobileHomeScreen'
import { MobileAppView } from './components/MobileAppView'
import { MobileAppDrawer } from './components/MobileAppDrawer'

export const MobileOS = () => {
  const { isTouch } = useMobileDevice()
  const phase = useMobileStore(s => s.phase)

  useEffect(() => {
    useMobileStore.getState().setIsTouch(isTouch)
  }, [isTouch])

  // ── Back gesture ────────────────────────────────────────────────────────────
  // Only activates when the pointer starts within 20px of the left edge.
  // Root div handles ONLY this — nothing else.
  const backStart = useRef<{ x: number; y: number } | null>(null)

  const onRootPointerDown = (e: React.PointerEvent) => {
    if (e.clientX < 20) {
      backStart.current = { x: e.clientX, y: e.clientY }
    }
  }

  const onRootPointerUp = (e: React.PointerEvent) => {
    if (!backStart.current) return
    const dx = e.clientX - backStart.current.x
    const dy = e.clientY - backStart.current.y
    backStart.current = null
    // Must be primarily horizontal and travel at least 60px right
    if (dx > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      const p = useMobileStore.getState().phase
      if (p === 'app')    useMobileStore.getState().closeApp()
      if (p === 'drawer') useMobileStore.getState().closeDrawer()
    }
  }

  const onRootPointerCancel = () => { backStart.current = null }

  // ── Home pill ───────────────────────────────────────────────────────────────
  // Owns all home / drawer input. setPointerCapture means we keep receiving
  // events even if the finger travels outside the element.
  // Tap (move < 15px total)  → go home
  // Swipe up > 80px          → open drawer
  // Anything else            → go home (safe default)
  const pillStart = useRef<{ x: number; y: number } | null>(null)
  const [pillPressed, setPillPressed] = useState(false)

  const onPillPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    pillStart.current = { x: e.clientX, y: e.clientY }
    setPillPressed(true)
  }

  const onPillPointerUp = (e: React.PointerEvent) => {
    e.stopPropagation()
    setPillPressed(false)
    if (!pillStart.current) return
    const dx = e.clientX - pillStart.current.x
    const dy = e.clientY - pillStart.current.y
    pillStart.current = null

    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dy < -80) {
      // Clear upswipe → drawer
      useMobileStore.getState().openDrawer()
    } else if (dist < 20 || dy >= -80) {
      // Tap or short/ambiguous swipe → home
      useMobileStore.getState().goHome()
    }
  }

  const onPillPointerCancel = () => {
    pillStart.current = null
    setPillPressed(false)
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
      onPointerDown={onRootPointerDown}
      onPointerUp={onRootPointerUp}
      onPointerCancel={onRootPointerCancel}
    >
      {phase === 'boot'                         && <MobileBootScreen />}
      {phase === 'lock'                         && <MobileLockScreen />}
      {(phase === 'home' || phase === 'drawer') && <MobileHomeScreen />}
      <MobileAppView />

      {/* Drawer always in tree so AnimatePresence animates its exit */}
      <MobileAppDrawer />

      {/* Home indicator pill
          The ENTIRE bottom strip is the touch target — the visual pill is
          just the affordance. Full-width, ~50px tall invisible zone. */}
      <AnimatePresence>
        {showPill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              bottom: 0, left: 0, right: 0,
              zIndex: 300,
              // Full-width touch area — height = safe-area + 40px padding above pill
              height: 'calc(env(safe-area-inset-bottom, 0px) + 40px)',
              minHeight: 40,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingBottom: 'max(10px, env(safe-area-inset-bottom, 10px))',
              touchAction: 'none',
              cursor: 'pointer',
            }}
            onPointerDown={onPillPointerDown}
            onPointerUp={onPillPointerUp}
            onPointerCancel={onPillPointerCancel}
          >
            <motion.div
              style={{
                width: 40, height: 4,
                borderRadius: 9999,
                backgroundColor: 'rgba(255,255,255,0.35)',
                originX: 0.5,
              }}
              animate={{
                backgroundColor: pillPressed
                  ? 'rgba(255,255,255,0.85)'
                  : 'rgba(255,255,255,0.35)',
                scaleX: pillPressed ? 1.3 : 1,
              }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
