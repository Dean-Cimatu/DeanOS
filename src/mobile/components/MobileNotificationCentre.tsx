import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMobileStore } from '../store/mobileStore'
import { useSystemStore } from '../../store/systemStore'

const TYPE_COLORS: Record<string, string> = {
  success: '#00FF88',
  warning: '#FFD700',
  error:   '#FF3B30',
  info:    '#00D4FF',
}

export const MobileNotificationCentre = () => {
  const open         = useMobileStore(s => s.notificationCentreOpen)
  const close        = useMobileStore(s => s.closeNotificationCentre)
  const notifications     = useSystemStore(s => s.notifications)
  const clearNotifications = useSystemStore(s => s.clearNotifications)
  const dismissNotification = useSystemStore(s => s.dismissNotification)

  // Swipe-up-to-close on the panel
  const panelDragStart = useRef<number | null>(null)

  const onPanelPointerDown = (e: React.PointerEvent) => {
    panelDragStart.current = e.clientY
  }
  const onPanelPointerUp = (e: React.PointerEvent) => {
    if (panelDragStart.current !== null) {
      const dy = e.clientY - panelDragStart.current
      panelDragStart.current = null
      if (dy < -60) close()
    }
  }
  const onPanelPointerCancel = () => { panelDragStart.current = null }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="notif-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onPointerUp={close}
            style={{
              position: 'fixed',
              top: 0, right: 0, bottom: 0, left: 0,
              zIndex: 800,
              background: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />

          {/* Panel */}
          <motion.div
            key="notif-panel"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onPointerDown={onPanelPointerDown}
            onPointerUp={onPanelPointerUp}
            onPointerCancel={onPanelPointerCancel}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0,
              zIndex: 900,
              maxHeight: '80vh',
              display: 'flex', flexDirection: 'column',
              background: 'rgba(10,15,30,0.94)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(42,63,95,0.8)',
              borderBottomLeftRadius: 24,
              borderBottomRightRadius: 24,
              paddingTop: 'env(safe-area-inset-top, 0px)',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 20px 12px',
              flexShrink: 0,
            }}>
              <span style={{
                color: '#E8F4F8', fontSize: 18, fontWeight: 600,
                fontFamily: 'Inter, -apple-system, sans-serif',
              }}>
                Notifications
              </span>
              <button
                onPointerUp={e => { e.stopPropagation(); clearNotifications(); close() }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#00D4FF', fontSize: 14,
                  fontFamily: 'Inter, -apple-system, sans-serif',
                  padding: '4px 0',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                Clear All
              </button>
            </div>

            {/* List */}
            <div style={{
              overflowY: 'auto', flex: 1,
              padding: '0 16px 16px',
              touchAction: 'pan-y',
            }}>
              {notifications.length === 0 ? (
                <div style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  padding: '48px 0', gap: 12,
                }}>
                  <span style={{ fontSize: 40 }}>🔔</span>
                  <span style={{
                    color: '#8899AA', fontSize: 14,
                    fontFamily: 'Inter, -apple-system, sans-serif',
                  }}>
                    No notifications
                  </span>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {notifications.map((n, i) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 12,
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: 16,
                        padding: '12px 14px',
                        marginBottom: 8,
                        border: '1px solid rgba(255,255,255,0.07)',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Type dot */}
                      <div style={{
                        width: 8, height: 8, borderRadius: 9999,
                        background: TYPE_COLORS[n.type] ?? '#00D4FF',
                        flexShrink: 0, marginTop: 5,
                      }} />

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          color: '#E8F4F8', fontSize: 13, fontWeight: 600, lineHeight: 1.3,
                          fontFamily: 'Inter, -apple-system, sans-serif',
                          margin: 0,
                        }}>
                          {n.title}
                        </p>
                        <p style={{
                          color: '#8899AA', fontSize: 12, lineHeight: 1.5,
                          fontFamily: 'Inter, -apple-system, sans-serif',
                          margin: '3px 0 0',
                        }}>
                          {n.message}
                        </p>
                        <p style={{
                          color: '#4A5F72', fontSize: 10,
                          fontFamily: 'Inter, -apple-system, sans-serif',
                          margin: '4px 0 0',
                        }}>
                          {new Date(n.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      {/* Dismiss */}
                      <button
                        onPointerUp={e => { e.stopPropagation(); dismissNotification(n.id) }}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: '#8899AA', fontSize: 20, lineHeight: 1,
                          padding: '0 0 0 4px', flexShrink: 0,
                          marginTop: -2,
                          WebkitTapHighlightColor: 'transparent',
                        }}
                      >
                        ×
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Drag handle */}
            <div style={{
              display: 'flex', justifyContent: 'center',
              paddingBottom: 12, flexShrink: 0,
            }}>
              <div style={{
                width: 40, height: 4,
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 9999,
              }} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
