import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMobileDevice } from '../hooks/useMobileDevice'
import { useMobileStore } from './store/mobileStore'
import { MobileBootScreen } from './components/MobileBootScreen'
import { MobileLockScreen } from './components/MobileLockScreen'
import { MobileHomeScreen } from './components/MobileHomeScreen'
import { MobileAppView } from './components/MobileAppView'
import { MobileAppDrawer } from './components/MobileAppDrawer'
import { MobileNotificationCentre } from './components/MobileNotificationCentre'
import { MobileMiniPlayer } from './components/MobileMiniPlayer'

export const MobileOS = () => {
  const { isTouch } = useMobileDevice()
  const phase        = useMobileStore(s => s.phase)
  const musicActive  = useMobileStore(s => s.musicActive)
  const showMiniPlayer = musicActive && phase !== 'boot' && phase !== 'lock' && phase !== 'app'

  useEffect(() => {
    useMobileStore.getState().setIsTouch(isTouch)
  }, [isTouch])

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', '#0A0F1E')
  }, [])

  // ── Unified root pointer tracking ───────────────────────────────────────────
  // One ref tracks every gesture that starts in the root div.
  // Each gesture zone is checked on pointerup.
  //
  //  Left edge  (x < 20)   → back swipe (rightward ≥60px, primarily horizontal)
  //  Top strip  (y < 60)   → notification centre (downward ≥80px, primarily vertical)
  //
  // The home pill has its own handlers with stopPropagation, so it never reaches here.
  const rootStart = useRef<{ x: number; y: number } | null>(null)

  const onRootPointerDown = (e: React.PointerEvent) => {
    // Record start for any gesture that could originate here
    if (e.clientX < 20 || e.clientY < 60) {
      rootStart.current = { x: e.clientX, y: e.clientY }
    }
  }

  const onRootPointerUp = (e: React.PointerEvent) => {
    if (!rootStart.current) return
    const start = rootStart.current
    rootStart.current = null

    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    const isHorizontal = Math.abs(dx) > Math.abs(dy) * 1.5
    const isVertical   = Math.abs(dy) > Math.abs(dx) * 1.5
    const p = useMobileStore.getState().phase

    // ── Back gesture: left edge, swipe right ──
    if (start.x < 20 && dx > 60 && isHorizontal) {
      if (p === 'app')    useMobileStore.getState().closeApp()
      if (p === 'drawer') useMobileStore.getState().closeDrawer()
      return
    }

    // ── Notification centre: top strip, swipe down ──
    if (start.y < 60 && dy > 80 && isVertical && p !== 'boot' && p !== 'lock') {
      useMobileStore.getState().openNotificationCentre()
    }
  }

  const onRootPointerCancel = () => { rootStart.current = null }

  // ── Home pill ───────────────────────────────────────────────────────────────
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
      useMobileStore.getState().openDrawer()
    } else if (dist < 20 || dy >= -80) {
      useMobileStore.getState().goHome()
    }
  }

  const onPillPointerCancel = () => {
    pillStart.current = null
    setPillPressed(false)
  }

  const showPill = phase === 'home' || phase === 'app' || phase === 'drawer'

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
      {/* ── Boot ── */}
      <AnimatePresence>
        {phase === 'boot' && <MobileBootScreen key="boot" />}
      </AnimatePresence>

      {/* ── Post-boot UI ── */}
      {phase !== 'boot' && (
        <>
          <AnimatePresence>
            {phase === 'lock' && <MobileLockScreen key="lock" />}
          </AnimatePresence>

          {phase !== 'lock' && (
            <>
              <MobileHomeScreen />
              <MobileAppView />
              <MobileAppDrawer />
            </>
          )}
        </>
      )}

      {/* ── Mini player ── */}
      <MobileMiniPlayer />

      {/* ── Notification centre — overlays everything except boot/lock ── */}
      <MobileNotificationCentre />

      {/* ── Home indicator pill ── */}
      <AnimatePresence>
        {showPill && (
          <motion.div
            key="pill"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              bottom: showMiniPlayer ? 68 : 0,
              left: 0, right: 0,
              zIndex: 600,
              height: 'calc(env(safe-area-inset-bottom, 0px) + 40px)',
              minHeight: 40,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingBottom: showMiniPlayer ? 10 : 'max(10px, env(safe-area-inset-bottom, 10px))',
              touchAction: 'none',
              cursor: 'pointer',
              transition: 'bottom 0.3s ease',
            }}
            onPointerDown={onPillPointerDown}
            onPointerUp={onPillPointerUp}
            onPointerCancel={onPillPointerCancel}
          >
            <motion.div
              style={{
                width: 40, height: 4,
                borderRadius: 9999,
                originX: 0.5,
              }}
              animate={
                pillPressed
                  ? { scaleX: 1.3, backgroundColor: 'rgba(0,212,255,0.8)', opacity: 1 }
                  : phase === 'home'
                    ? { scaleX: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4], backgroundColor: 'rgba(255,255,255,0.4)' }
                    : { scaleX: 1, opacity: 0.35, backgroundColor: 'rgba(255,255,255,0.35)' }
              }
              transition={
                pillPressed
                  ? { duration: 0.1 }
                  : phase === 'home'
                    ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 0.3 }
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
