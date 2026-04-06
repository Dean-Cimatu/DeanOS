import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMobileStore } from '../store/mobileStore'
import { mobileApps } from '../data/mobileAppRegistry'
import { AppIcon } from '../../components/os/AppIcon'

// ── Individual app card ──────────────────────────────────────────────────────

interface AppCardProps {
  appId: string
  index: number
}

const AppCard = ({ appId, index }: AppCardProps) => {
  const app = mobileApps.find(a => a.id === appId)
  const [gone, setGone] = useState(false)
  const [dragY, setDragY] = useState(0)
  const dragStart = useRef<number | null>(null)

  if (!app || gone) return null

  const dismiss = () => {
    setGone(true)
    useMobileStore.getState().removeRecentApp(appId)
  }

  const openThis = () => {
    useMobileStore.getState().openApp(appId)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    dragStart.current = e.clientY
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart.current === null) return
    const delta = e.clientY - dragStart.current
    // Only allow upward drag
    if (delta < 0) setDragY(delta)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    e.stopPropagation()
    if (dragStart.current === null) return
    const delta = e.clientY - dragStart.current
    dragStart.current = null

    if (delta < -80) {
      dismiss()
    } else if (Math.abs(delta) < 10) {
      openThis()
    } else {
      // Snap back
      setDragY(0)
    }
  }

  const onPointerCancel = (e: React.PointerEvent) => {
    e.stopPropagation()
    dragStart.current = null
    setDragY(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: dragY }}
      exit={{ opacity: 0, y: -120, transition: { duration: 0.22 } }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 300, damping: 26 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: '72vw',
        maxWidth: 320,
        height: '58vh',
        borderRadius: 20,
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #1E2D45, #121929)',
        border: '1px solid #2A3F5F',
        cursor: 'grab',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* App header bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 14px',
        borderBottom: '1px solid #2A3F5F',
        flexShrink: 0,
        background: '#121929',
      }}>
        <AppIcon iconId={appId} size={28} />
        <span style={{
          color: '#E8F4F8', fontSize: 14, fontWeight: 600,
          fontFamily: 'Inter, -apple-system, sans-serif',
          flex: 1,
        }}>
          {app.name}
        </span>
        <button
          onPointerDown={e => e.stopPropagation()}
          onPointerUp={e => { e.stopPropagation(); dismiss() }}
          style={{
            background: 'rgba(255,255,255,0.08)', border: 'none',
            color: '#8899AA', fontSize: 16, lineHeight: 1,
            width: 26, height: 26, borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          ×
        </button>
      </div>

      {/* Preview area — large icon as placeholder */}
      <div style={{
        flex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: 0.18,
      }}>
        <AppIcon iconId={appId} size={96} />
      </div>

      {/* Swipe-up hint */}
      <div style={{
        position: 'absolute',
        bottom: 10, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <span style={{
          color: 'rgba(255,255,255,0.2)', fontSize: 10,
          fontFamily: 'Inter, -apple-system, sans-serif',
        }}>
          Swipe up to close
        </span>
      </div>
    </motion.div>
  )
}

// ── Switcher shell ───────────────────────────────────────────────────────────

export const MobileAppSwitcher = () => {
  const phase      = useMobileStore(s => s.phase)
  const recentApps = useMobileStore(s => s.recentApps)

  const clearAll = (e: React.PointerEvent) => {
    e.stopPropagation()
    useMobileStore.getState().clearRecentApps()
    useMobileStore.getState().goHome()
  }

  return (
    <AnimatePresence>
      {phase === 'switcher' && (
        <motion.div
          key="switcher"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onPointerUp={() => useMobileStore.getState().goHome()}
          style={{
            position: 'fixed',
            top: 0, right: 0, bottom: 0, left: 0,
            zIndex: 700,
            display: 'flex', flexDirection: 'column',
            background: 'rgba(10,15,30,0.92)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Header */}
          <div style={{
            paddingTop: 'calc(env(safe-area-inset-top, 0px) + 52px)',
            padding: 'calc(env(safe-area-inset-top, 0px) + 52px) 24px 16px',
            flexShrink: 0,
          }}>
            <span style={{
              color: '#E8F4F8', fontSize: 22, fontWeight: 700,
              fontFamily: 'Inter, -apple-system, sans-serif',
            }}>
              Recent Apps
            </span>
          </div>

          {/* Cards */}
          {recentApps.length === 0 ? (
            <div style={{
              flex: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                color: '#8899AA', fontSize: 15,
                fontFamily: 'Inter, -apple-system, sans-serif',
              }}>
                No recent apps
              </span>
            </div>
          ) : (
            <div
              onPointerDown={e => e.stopPropagation()}
              style={{
                flex: 1,
                overflowX: 'auto', overflowY: 'hidden',
                touchAction: 'pan-x',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '8px 24px 8px',
                height: '100%',
                width: 'max-content',
              }}>
                <AnimatePresence>
                  {recentApps.map((appId, i) => (
                    <AppCard key={appId} appId={appId} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Close All */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 52px)',
            paddingTop: 20,
            flexShrink: 0,
          }}>
            <button
              onPointerDown={e => e.stopPropagation()}
              onPointerUp={clearAll}
              style={{
                background: 'none',
                border: '1px solid rgba(255,59,48,0.4)',
                borderRadius: 9999,
                color: '#FF3B30', fontSize: 14,
                fontFamily: 'Inter, -apple-system, sans-serif',
                padding: '8px 28px',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              Close All
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
