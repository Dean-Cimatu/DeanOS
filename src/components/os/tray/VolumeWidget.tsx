import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSystemStore } from '../../../store/systemStore'
import { useClickOutside } from '../../../hooks/useClickOutside'

function VolumeIcon({ volume, muted, color = '#E8F4F8' }: { volume: number; muted: boolean; color?: string }) {
  if (muted || volume === 0) {
    return (
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
        <path d="M1 4.5H3.5L7 2V12L3.5 9.5H1V4.5Z" fill={color} />
        <line x1="10" y1="4.5" x2="14" y2="8.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="4.5" x2="10" y2="8.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (volume < 50) {
    return (
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
        <path d="M1 4.5H3.5L7 2V12L3.5 9.5H1V4.5Z" fill={color} />
        <path d="M9.5 5A2.5 2.5 0 0 1 9.5 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
      <path d="M1 4.5H3.5L7 2V12L3.5 9.5H1V4.5Z" fill={color} />
      <path d="M9.5 5A2.5 2.5 0 0 1 9.5 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11.5 3A5.5 5.5 0 0 1 11.5 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function VolumePopover({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref as React.RefObject<HTMLElement>, onClose)
  const volume = useSystemStore(s => s.volume)
  const isMuted = useSystemStore(s => s.isMuted)
  const setVolume = useSystemStore(s => s.setVolume)
  const toggleMute = useSystemStore(s => s.toggleMute)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      onClick={e => e.stopPropagation()}
      style={{
        position: 'absolute', bottom: '44px', right: 0, width: '200px',
        backgroundColor: '#1E2D45', border: '1px solid #2A3F5F', borderRadius: '12px',
        padding: '16px', boxShadow: '0 25px 50px rgba(0,0,0,0.6)', zIndex: 9999,
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      <div style={{ color: '#E8F4F8', fontSize: '13px', fontWeight: 700, marginBottom: '14px' }}>Volume</div>

      {/* Volume display */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <VolumeIcon volume={volume} muted={isMuted} />
        <span style={{ color: '#E8F4F8', fontSize: '12px', minWidth: '32px' }}>{isMuted ? 'Muted' : `${volume}%`}</span>
      </div>

      {/* Slider */}
      <input
        type="range" min={0} max={100} value={isMuted ? 0 : volume}
        onChange={e => { if (isMuted) toggleMute(); setVolume(Number(e.target.value)) }}
        style={{ width: '100%', accentColor: '#00D4FF', marginBottom: '12px', cursor: 'pointer' }}
      />

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        style={{
          width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #2A3F5F',
          backgroundColor: isMuted ? '#00D4FF22' : 'transparent',
          color: isMuted ? '#00D4FF' : '#8899AA', fontSize: '11px', cursor: 'pointer',
          fontFamily: '"JetBrains Mono", monospace', transition: 'all 0.15s',
        }}
        onMouseEnter={e => { if (!isMuted) e.currentTarget.style.borderColor = '#00D4FF' }}
        onMouseLeave={e => { if (!isMuted) e.currentTarget.style.borderColor = '#2A3F5F' }}
      >
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
    </motion.div>
  )
}

export function VolumeWidget({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const volume = useSystemStore(s => s.volume)
  const isMuted = useSystemStore(s => s.isMuted)
  const setVolume = useSystemStore(s => s.setVolume)
  const [hovered, setHovered] = useState(false)

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY < 0 ? 5 : -5
    setVolume(Math.max(0, Math.min(100, volume + delta)))
  }

  return (
    <div
      style={{ position: 'relative' }}
      onMouseDown={e => e.stopPropagation()}
      onClick={e => { e.stopPropagation(); onToggle() }}
      onWheel={handleWheel}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', padding: '3px 7px', borderRadius: '5px',
          cursor: 'pointer', height: '30px',
          backgroundColor: open || hovered ? '#1E2D45' : 'transparent', transition: 'background-color 0.12s',
        }}
      >
        <VolumeIcon volume={volume} muted={isMuted} />
      </div>
      <AnimatePresence>
        {open && <VolumePopover onClose={onToggle} />}
      </AnimatePresence>
    </div>
  )
}
