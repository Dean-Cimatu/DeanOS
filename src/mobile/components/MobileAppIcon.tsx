import { useRef } from 'react'
import { motion } from 'framer-motion'
import { AppIcon } from '../../components/os/AppIcon'

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
        style={{ flexShrink: 0 }}
      >
        <AppIcon iconId={id} size={iconPx} />
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
