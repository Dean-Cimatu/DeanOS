import { useEffect, useRef, useState } from 'react'
import { useSystemStore } from '../../../store/systemStore'

interface NotificationBellProps {
  open: boolean
  onToggle: () => void
}

export function NotificationBell({ open, onToggle }: NotificationBellProps) {
  const unreadCount = useSystemStore(s => s.unreadCount)
  const [pulsing, setPulsing] = useState(false)
  const prevCount = useRef(unreadCount)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (unreadCount > prevCount.current) {
      setPulsing(true)
      const t = setTimeout(() => setPulsing(false), 600)
      return () => clearTimeout(t)
    }
    prevCount.current = unreadCount
  }, [unreadCount])

  return (
    <div
      style={{ position: 'relative' }}
      onMouseDown={e => e.stopPropagation()}
      onClick={e => { e.stopPropagation(); onToggle() }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '3px 7px', borderRadius: '5px', cursor: 'pointer', height: '30px',
          backgroundColor: open || hovered ? '#1E2D45' : 'transparent', transition: 'background-color 0.12s',
        }}
      >
        <span style={{ fontSize: '14px' }}>🔔</span>
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute', top: '2px', right: '2px',
            width: '14px', height: '14px', borderRadius: '50%',
            backgroundColor: '#f87171', fontSize: '9px', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontFamily: 'Inter, sans-serif',
            animation: pulsing ? 'bellPulse 0.3s ease-out' : 'none',
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </div>
      <style>{`@keyframes bellPulse { 0%{transform:scale(0.8)} 60%{transform:scale(1.2)} 100%{transform:scale(1)} }`}</style>
    </div>
  )
}
