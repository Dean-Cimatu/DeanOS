import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSystemStore } from '../../../store/systemStore'
import { useClickOutside } from '../../../hooks/useClickOutside'

function useBatteryDrain() {
  const drainBattery = useSystemStore(s => s.drainBattery)
  useEffect(() => {
    const interval = setInterval(() => {
      const { batteryLastTick } = useSystemStore.getState()
      if (Date.now() - batteryLastTick >= 300_000) drainBattery()
    }, 60_000)
    return () => clearInterval(interval)
  }, [drainBattery])
}

function batteryColor(level: number) {
  if (level > 60) return '#00FF88'
  if (level > 30) return '#E8F4F8'
  if (level > 10) return '#FFD700'
  return '#FF4444'
}

function BatteryIcon({ level, color }: { level: number; color: string }) {
  const fill = Math.round(13 * Math.max(0, Math.min(100, level)) / 100)
  return (
    <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
      <rect x="0.5" y="0.5" width="16" height="11" rx="2" stroke={color} strokeWidth="1" />
      <rect x="17" y="4" width="2.5" height="4" rx="1" fill={color} />
      {fill > 0 && <rect x="2" y="2" width={fill} height="8" rx="1" fill={color} />}
    </svg>
  )
}

function BatteryPopover({ level, onClose }: { level: number; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref as React.RefObject<HTMLElement>, onClose)
  const color = batteryColor(level)
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
      <div style={{ color: '#E8F4F8', fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>Battery</div>
      <div style={{ height: '8px', borderRadius: '4px', backgroundColor: '#0A0F1E', overflow: 'hidden', marginBottom: '10px' }}>
        <div style={{ height: '100%', width: `${level}%`, borderRadius: '4px', backgroundColor: color, transition: 'width 0.3s ease' }} />
      </div>
      <div style={{ color: '#E8F4F8', fontSize: '12px', marginBottom: '4px' }}>{level}% — Plugged in</div>
      <div style={{ color: '#8899AA', fontSize: '11px' }}>About 6 hours remaining</div>
    </motion.div>
  )
}

export function BatteryWidget() {
  useBatteryDrain()
  const batteryLevel = useSystemStore(s => s.batteryLevel)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const color = batteryColor(batteryLevel)
  const critical = batteryLevel <= 10

  return (
    <div
      style={{ position: 'relative' }}
      onMouseDown={e => e.stopPropagation()}
      onClick={e => { e.stopPropagation(); setOpen(o => !o) }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '3px 7px', borderRadius: '5px', cursor: 'pointer', height: '30px',
          backgroundColor: hovered ? '#1E2D45' : 'transparent', transition: 'background-color 0.12s',
        }}
      >
        <div style={critical ? { animation: 'battPulse 1s ease-in-out infinite' } : undefined}>
          <BatteryIcon level={batteryLevel} color={color} />
        </div>
        <span style={{ color: '#8899AA', fontSize: '10px', fontFamily: '"JetBrains Mono", monospace' }}>
          {batteryLevel}%
        </span>
      </div>
      <AnimatePresence>
        {open && <BatteryPopover level={batteryLevel} onClose={() => setOpen(false)} />}
      </AnimatePresence>
      <style>{`@keyframes battPulse { 0%,100%{opacity:1} 50%{opacity:0.35} }`}</style>
    </div>
  )
}
