import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useSystemStore } from '../../store/systemStore'

interface NotificationCentreProps {
  onClose: () => void
}

const TYPE_COLOR: Record<string, string> = {
  info: '#00D4FF',
  success: '#00FF88',
  warning: '#FFD700',
  error: '#FF4444',
}

export function NotificationCentre({ onClose }: NotificationCentreProps) {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref as React.RefObject<HTMLElement>, onClose)
  const notifications = useSystemStore(s => s.notifications)
  const dismissNotification = useSystemStore(s => s.dismissNotification)
  const clearNotifications = useSystemStore(s => s.clearNotifications)

  return (
    <motion.div
      ref={ref}
      initial={{ x: 320 }}
      animate={{ x: 0 }}
      exit={{ x: 320 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      onClick={e => e.stopPropagation()}
      style={{
        position: 'absolute', right: 0, top: 0, height: '100%', width: '320px',
        backgroundColor: '#1E2D45', borderLeft: '1px solid #2A3F5F',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.4)', zIndex: 9998,
        display: 'flex', flexDirection: 'column',
        fontFamily: 'Ubuntu, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', borderBottom: '1px solid #2A3F5F', flexShrink: 0,
      }}>
        <span style={{ color: '#E8F4F8', fontSize: '13px', fontWeight: 700 }}>Notifications</span>
        <button
          onClick={clearNotifications}
          style={{
            background: 'none', border: 'none', color: '#8899AA', fontSize: '11px',
            cursor: 'pointer', fontFamily: '"JetBrains Mono", monospace', padding: '2px 6px', borderRadius: '4px',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#E8F4F8')}
          onMouseLeave={e => (e.currentTarget.style.color = '#8899AA')}
        >
          Clear all
        </button>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {notifications.length === 0 ? (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8899AA', fontSize: '13px' }}>
            No notifications
          </div>
        ) : notifications.map(n => (
          <div
            key={n.id}
            style={{
              padding: '12px 16px 12px 12px', borderBottom: '1px solid #2A3F5F',
              backgroundColor: n.read ? 'transparent' : `${TYPE_COLOR[n.type] ?? '#8899AA'}0d`,
              display: 'flex', gap: '10px', position: 'relative', transition: 'background-color 0.1s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#243355')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = n.read ? 'transparent' : `${TYPE_COLOR[n.type] ?? '#8899AA'}0d`)}
          >
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              backgroundColor: TYPE_COLOR[n.type] ?? '#8899AA',
              flexShrink: 0, marginTop: '4px',
            }} />
            <div style={{ flex: 1, paddingRight: '16px' }}>
              <div style={{ color: TYPE_COLOR[n.type] ?? '#E8F4F8', fontSize: '12px', fontWeight: 600 }}>{n.title}</div>
              <div style={{ color: '#8899AA', fontSize: '11px', marginTop: '2px' }}>{n.message}</div>
              <div style={{ color: '#556677', fontSize: '10px', marginTop: '4px' }}>
                {n.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <button
              onClick={() => dismissNotification(n.id)}
              style={{
                position: 'absolute', top: '8px', right: '10px',
                background: 'none', border: 'none', color: '#8899AA', fontSize: '15px',
                cursor: 'pointer', lineHeight: 1, padding: '2px 4px', borderRadius: '3px',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FF4444')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8899AA')}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
