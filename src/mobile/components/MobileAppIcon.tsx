import { useRef } from 'react'
import { motion } from 'framer-motion'

interface MobileAppIconProps {
  id: string
  name: string
  icon: string
  onTap: () => void
  size?: 'normal' | 'large'
}

export const MobileAppIcon = ({ name, icon, onTap, size = 'normal' }: MobileAppIconProps) => {
  const iconPx = size === 'large' ? 68 : 60
  // Prevent double-fire: touchEnd sets this, click checks it
  const touchFired = useRef(false)

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault()
    touchFired.current = true
    onTap()
    setTimeout(() => { touchFired.current = false }, 300)
  }

  const handleClick = () => {
    if (touchFired.current) return
    onTap()
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
      <motion.div
        whileTap={{ scale: 0.88 }}
        transition={{ duration: 0.08 }}
        style={{
          width: iconPx, height: iconPx,
          borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.875rem',
          background: 'linear-gradient(135deg, #1E2D45, #0A0F1E)',
          border: '1px solid #2A3F5F',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}
      >
        {icon}
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
