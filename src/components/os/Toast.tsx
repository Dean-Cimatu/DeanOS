import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSettingsStore } from '../../store/settingsStore'

interface ToastProps {
  id: string
  type: string
  title: string
  message: string
  onDismiss: () => void
}

export default function Toast({ title, message, onDismiss }: ToastProps) {
  const accent = useSettingsStore(s => s.accentColor)

  useEffect(() => {
    const t = setTimeout(onDismiss, 7000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '288px',
      backgroundColor: '#1E2D45',
      borderLeft: `4px solid ${accent}`,
      borderRadius: '8px',
      padding: '12px 14px',
      display: 'flex',
      gap: '10px',
      alignItems: 'flex-start',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      overflow: 'hidden',
      fontFamily: 'Ubuntu, sans-serif',
    }}>
      {/* Colour dot */}
      <div style={{
        width: 8, height: 8, borderRadius: '50%',
        backgroundColor: accent,
        flexShrink: 0, marginTop: 3,
      }} />

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: '#dce8f5', fontSize: '13px', fontWeight: 600, margin: 0, fontFamily: 'Ubuntu, sans-serif' }}>
          {title}
        </p>
        <p style={{ color: '#7d95af', fontSize: '12px', margin: '3px 0 0', fontFamily: 'Ubuntu, sans-serif' }}>
          {message}
        </p>
      </div>

      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#8899AA', fontSize: '14px', lineHeight: 1,
          padding: '0 2px', flexShrink: 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#E8F4F8')}
        onMouseLeave={e => (e.currentTarget.style.color = '#8899AA')}
      >
        ×
      </button>

      {/* Drain bar */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 7, ease: 'linear' }}
        style={{
          position: 'absolute', bottom: 0, left: 0,
          height: '2px', backgroundColor: accent, opacity: 0.5,
        }}
      />
    </div>
  )
}
