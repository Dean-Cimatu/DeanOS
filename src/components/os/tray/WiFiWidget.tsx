import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickOutside } from '../../../hooks/useClickOutside'

function WiFiIcon({ color = '#00D4FF' }: { color?: string }) {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
      <circle cx="9" cy="13" r="1.5" fill={color} />
      <path d="M5.8 10.2A4.5 4.5 0 0 1 12.2 10.2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 7A7.5 7.5 0 0 1 15 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M0.5 4A10.5 10.5 0 0 1 17.5 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function WiFiPopover({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref as React.RefObject<HTMLElement>, onClose)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      onClick={e => e.stopPropagation()}
      style={{
        position: 'absolute', bottom: '44px', right: 0, width: '224px',
        backgroundColor: '#1E2D45', border: '1px solid #2A3F5F', borderRadius: '12px',
        padding: '16px', boxShadow: '0 25px 50px rgba(0,0,0,0.6)', zIndex: 9999,
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      <div style={{ color: '#E8F4F8', fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>Network</div>

      {/* Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#00FF88', flexShrink: 0 }} />
        <span style={{ color: '#00FF88', fontSize: '12px' }}>Connected</span>
      </div>

      {/* SSID */}
      <div style={{ color: '#E8F4F8', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>DeanOS-Net</div>

      {/* Signal bars visual */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', marginBottom: '10px' }}>
        {[4, 7, 10, 13].map((h, i) => (
          <div key={i} style={{ width: 5, height: h, backgroundColor: '#00D4FF', borderRadius: '2px' }} />
        ))}
      </div>

      {/* IP */}
      <div style={{ color: '#8899AA', fontSize: '11px', marginBottom: '14px' }}>192.168.1.1</div>

      {/* Forget */}
      <button
        style={{ background: 'none', border: 'none', color: '#8899AA', fontSize: '11px', cursor: 'pointer', fontFamily: '"JetBrains Mono", monospace', padding: 0 }}
        onMouseEnter={e => (e.currentTarget.style.color = '#FF4444')}
        onMouseLeave={e => (e.currentTarget.style.color = '#8899AA')}
      >
        Forget Network
      </button>
    </motion.div>
  )
}

export function WiFiWidget({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const [hovered, setHovered] = useState(false)
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
          display: 'flex', alignItems: 'center', padding: '3px 7px', borderRadius: '5px',
          cursor: 'pointer', height: '30px',
          backgroundColor: open || hovered ? '#1E2D45' : 'transparent', transition: 'background-color 0.12s',
        }}
      >
        <WiFiIcon />
      </div>
      <AnimatePresence>
        {open && <WiFiPopover onClose={onToggle} />}
      </AnimatePresence>
    </div>
  )
}
