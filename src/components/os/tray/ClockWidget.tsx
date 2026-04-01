import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useSystemStore } from '../../../store/systemStore'
import { CalendarPopover } from './CalendarPopover'

export function ClockWidget({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const currentTime = useSystemStore((state) => state.currentTime)
  const [hovered, setHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Drive the store clock from here
  useEffect(() => {
    const interval = setInterval(() => {
      useSystemStore.getState().tickClock()
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const timeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  const dateStr = currentTime.toLocaleDateString([], { weekday: 'short', day: '2-digit' })

  const handleClose = useCallback(() => onToggle(), [onToggle])

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative' }}
      onClick={(e) => { e.stopPropagation(); onToggle() }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          padding: '2px 8px',
          borderLeft: '1px solid #1E2D45',
          marginLeft: '4px',
          borderRadius: '5px',
          backgroundColor: open || hovered ? '#1E2D45' : 'transparent',
          cursor: 'pointer',
          transition: 'background-color 0.12s',
          height: '30px',
          justifyContent: 'center',
        }}
      >
        <span style={{ color: '#E8F4F8', fontSize: '12px', fontFamily: '"JetBrains Mono", monospace', fontWeight: 500, lineHeight: 1.2 }}>
          {timeStr}
        </span>
        <span style={{ color: '#8899AA', fontSize: '10px', fontFamily: '"JetBrains Mono", monospace', lineHeight: 1.2 }}>
          {dateStr}
        </span>
      </div>

      <AnimatePresence>
        {open && <CalendarPopover date={currentTime} onClose={handleClose} />}
      </AnimatePresence>
    </div>
  )
}
