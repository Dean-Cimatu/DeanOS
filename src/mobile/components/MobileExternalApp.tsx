import { useEffect, useRef, useState } from 'react'
import { AppIcon } from '../../components/os/AppIcon'

interface MobileExternalAppProps {
  iconId: string
  label: string
  url: string
  buttonLabel?: string
  hint?: string
}

export const MobileExternalApp = ({
  iconId,
  label,
  url,
  buttonLabel = `Open ${label}`,
  hint,
}: MobileExternalAppProps) => {
  const [opened, setOpened] = useState(false)
  const didAutoOpen = useRef(false)

  // Auto-open once on mount; browsers may block it — button is the fallback
  useEffect(() => {
    if (didAutoOpen.current) return
    didAutoOpen.current = true
    const t = setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer')
      setOpened(true)
    }, 300)
    return () => clearTimeout(t)
  }, [url])

  const open = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
    setOpened(true)
  }

  return (
    <div style={{
      height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 24,
      background: '#0A0F1E',
      padding: 32,
    }}>
      <AppIcon iconId={iconId} size={72} />

      <div style={{ textAlign: 'center' }}>
        <p style={{
          color: '#E8F4F8', fontSize: 20, fontWeight: 700,
          fontFamily: 'Inter, -apple-system, sans-serif',
          margin: '0 0 6px',
        }}>
          {label}
        </p>
        {hint && (
          <p style={{
            color: '#8899AA', fontSize: 13,
            fontFamily: 'Inter, -apple-system, sans-serif',
            margin: 0,
          }}>
            {hint}
          </p>
        )}
      </div>

      <button
        onPointerUp={open}
        style={{
          background: 'linear-gradient(135deg, #00D4FF22, #00D4FF11)',
          border: '1px solid #00D4FF55',
          borderRadius: 14,
          color: '#00D4FF',
          fontSize: 15, fontWeight: 600,
          fontFamily: 'Inter, -apple-system, sans-serif',
          padding: '14px 32px',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          transition: 'opacity 0.15s',
        }}
      >
        {opened ? `↗ Reopen ${label}` : `↗ ${buttonLabel}`}
      </button>

      {opened && (
        <p style={{
          color: '#8899AA', fontSize: 12,
          fontFamily: 'Inter, -apple-system, sans-serif',
          margin: 0,
          textAlign: 'center',
        }}>
          Opened in your browser
        </p>
      )}
    </div>
  )
}
