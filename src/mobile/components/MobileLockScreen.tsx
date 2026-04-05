import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useMobileStore } from '../store/mobileStore'

export const MobileLockScreen = () => {
  const [now, setNow] = useState(new Date())
  const [unlocking, setUnlocking] = useState(false)
  const [labelVisible, setLabelVisible] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const startY = useRef<number | null>(null)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setTimeout(() => setLabelVisible(false), 3000)
    return () => clearTimeout(id)
  }, [])

  const handleUnlock = () => {
    if (unlocking) return
    setUnlocking(true)
    setTimeout(() => useMobileStore.getState().setPhase('home'), 400)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startY.current === null) return
    const delta = startY.current - e.changedTouches[0].clientY
    if (delta > 60) handleUnlock()
    startY.current = null
  }

  const onMouseDown = (e: React.MouseEvent) => {
    startY.current = e.clientY
    setIsDragging(true)
  }
  const onMouseUp = (e: React.MouseEvent) => {
    if (startY.current === null) return
    const delta = startY.current - e.clientY
    if (delta > 60) handleUnlock()
    startY.current = null
    setIsDragging(false)
  }

  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  const dateStr = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <>
      <style>{`
        @keyframes aurora1 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          50% { transform: translate(8%, -12%) scale(1.15); }
        }
        @keyframes aurora2 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          50% { transform: translate(-10%, 8%) scale(1.2); }
        }
        @keyframes aurora3 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          33% { transform: translate(6%, 10%) scale(1.1); }
          66% { transform: translate(-8%, -6%) scale(1.18); }
        }
      `}</style>

      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9000,
          overflow: 'hidden',
          userSelect: 'none',
          touchAction: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        animate={{ y: unlocking ? -window.innerHeight : 0, opacity: unlocking ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {/* Wallpaper */}
        <div style={{ position: 'absolute', inset: 0, background: '#0A0F1E' }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.6,
            background: 'radial-gradient(ellipse 70% 60% at 30% 40%, #00D4FF22 0%, transparent 70%)',
            animation: 'aurora1 12s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.5,
            background: 'radial-gradient(ellipse 60% 70% at 75% 60%, #1E2D4588 0%, #00D4FF11 40%, transparent 70%)',
            animation: 'aurora2 16s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.4,
            background: 'radial-gradient(ellipse 80% 50% at 50% 80%, #121929CC 0%, #00D4FF0A 50%, transparent 75%)',
            animation: 'aurora3 20s ease-in-out infinite',
          }} />
        </div>

        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />

        {/* Time + Date */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          paddingTop: '15vh',
        }}>
          <span style={{
            color: 'white',
            fontSize: '4.5rem',
            fontWeight: 100,
            fontFamily: 'Inter, -apple-system, sans-serif',
            letterSpacing: '-0.025em',
            lineHeight: 1,
          }}>
            {timeStr}
          </span>
          <span style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.125rem',
            marginTop: '8px',
            fontFamily: 'Inter, -apple-system, sans-serif',
          }}>
            {dateStr}
          </span>
        </div>

        {/* Bottom: chevron + label */}
        <div style={{
          position: 'absolute',
          bottom: 48,
          left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
            style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.5rem' }}
          >
            ↑
          </motion.div>
          <motion.span
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.875rem',
              marginTop: '8px',
              fontFamily: 'Inter, -apple-system, sans-serif',
            }}
            animate={{ opacity: labelVisible ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            Swipe up to unlock
          </motion.span>
        </div>
      </motion.div>
    </>
  )
}
