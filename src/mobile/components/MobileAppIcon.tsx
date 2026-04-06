import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppIcon } from '../../components/os/AppIcon'
import { useAppBadge } from '../hooks/useAppBadge'

interface MobileAppIconProps {
  id: string
  name: string
  icon: string   // kept for title-bar usage in MobileAppShell
  onTap: () => void
  size?: 'normal' | 'large'
}

export const MobileAppIcon = ({ id, name, onTap, size = 'normal' }: MobileAppIconProps) => {
  const iconPx = size === 'large' ? 62 : 54
  const touchFired = useRef(false)
  const [ripple, setRipple] = useState(false)
  const badgeCount = useAppBadge(id)

  const handleTap = () => {
    if (size === 'large') {
      setRipple(true)
      setTimeout(() => setRipple(false), 400)
    }
    onTap()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault()
    touchFired.current = true
    handleTap()
    setTimeout(() => { touchFired.current = false }, 300)
  }

  const handleClick = () => {
    if (touchFired.current) return
    handleTap()
  }

  return (
    <div
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 6,
        userSelect: 'none', WebkitTapHighlightColor: 'transparent',
        cursor: 'pointer',
      }}
    >
      {/* Icon + badge wrapper */}
      <motion.div
        whileTap={{
          scale: 0.82,
          boxShadow: '0 0 0 6px rgba(0,212,255,0.15)',
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 20 }}
        style={{
          flexShrink: 0,
          position: 'relative',
          borderRadius: Math.round(iconPx * 0.22),
        }}
      >
        <AppIcon iconId={id} size={iconPx} />

        {/* Notification badge */}
        <AnimatePresence>
          {badgeCount > 0 && (
            <motion.div
              key="badge"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              exit={{ scale: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3, times: [0, 0.6, 1] }}
              style={{
                position: 'absolute',
                top: -5, right: -5,
                minWidth: 18, height: 18,
                background: '#FF3B30',
                borderRadius: 9999,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 4px',
                border: '1.5px solid #0A0F1E',
                zIndex: 10,
              }}
            >
              <span style={{
                color: 'white', fontSize: 10, fontWeight: 700, lineHeight: 1,
                fontFamily: 'Inter, -apple-system, sans-serif',
              }}>
                {badgeCount > 99 ? '99+' : badgeCount}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dock ripple — only for large (dock) icons */}
        <AnimatePresence>
          {ripple && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 1.4, opacity: 0 }}
              exit={{}}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 0, right: 0, bottom: 0, left: 0,
                borderRadius: Math.round(iconPx * 0.22),
                background: 'rgba(0,212,255,0.2)',
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <span style={{
        color: 'white', fontSize: 11,
        fontFamily: 'Inter, -apple-system, sans-serif',
        textAlign: 'center', lineHeight: 1.25,
        maxWidth: 68, overflow: 'hidden',
        textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        textShadow: '0 1px 3px rgba(0,0,0,0.6)',
      }}>
        {name}
      </span>
    </div>
  )
}
