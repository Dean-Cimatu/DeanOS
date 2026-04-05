import { useState } from 'react'
import { useSettingsStore } from '../../store/settingsStore'
import { useSystemStore } from '../../store/systemStore'

const ACCENTS = [
  { hex: '#00D4FF', name: 'Cyan'   },
  { hex: '#9B59B6', name: 'Purple' },
  { hex: '#00FF88', name: 'Green'  },
  { hex: '#FF8C00', name: 'Orange' },
  { hex: '#FF4444', name: 'Red'    },
  { hex: '#FF69B4', name: 'Pink'   },
]

const WALLPAPERS = [
  { id: 'aurora'  as const, label: 'Aurora',  preview: 'linear-gradient(135deg,#0f0c29,#302b63 50%,#24243e)' },
  { id: 'grid'    as const, label: 'Grid',    preview: 'repeating-linear-gradient(0deg,transparent,transparent 9px,#1a1a2e 9px,#1a1a2e 10px),repeating-linear-gradient(90deg,transparent,transparent 9px,#1a1a2e 9px,#1a1a2e 10px),#0a0a14' },
  { id: 'minimal' as const, label: 'Minimal', preview: '#0A0F1E' },
]

const FONT_SIZES = [
  { id: 'small'  as const, label: 'S' },
  { id: 'medium' as const, label: 'M' },
  { id: 'large'  as const, label: 'L' },
]

// Shared styles
const groupHeader: React.CSSProperties = {
  fontSize: 11, fontWeight: 700,
  color: '#8899AA',
  textTransform: 'uppercase', letterSpacing: '0.1em',
  fontFamily: 'Inter, -apple-system, sans-serif',
  padding: '20px 20px 6px',
}

const group: React.CSSProperties = {
  background: '#121929',
  borderRadius: 14,
  border: '1px solid #1E2D45',
  margin: '0 16px',
  overflow: 'hidden',
}

const row: React.CSSProperties = {
  display: 'flex', alignItems: 'center',
  padding: '14px 16px', gap: 12,
  borderBottom: '1px solid #1E2D45',
}

const lastRow: React.CSSProperties = { ...row, borderBottom: 'none' }

const rowLabel: React.CSSProperties = {
  fontSize: 15, color: '#E8F4F8',
  fontFamily: 'Inter, -apple-system, sans-serif',
  flex: 1,
}

const rowSub: React.CSSProperties = {
  fontSize: 12, color: '#8899AA',
  fontFamily: 'Inter, -apple-system, sans-serif',
  marginTop: 2,
}

export const MobileSettings = () => {
  const { accentColor, setAccentColor, wallpaper, setWallpaper, fontSize, setFontSize, reset } = useSettingsStore()
  const addNotification = useSystemStore(s => s.addNotification)
  const notify = (type: 'info' | 'success' | 'warning', title: string, message: string) =>
    addNotification({ type, title, message })

  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#0A0F1E',
      overflowY: 'auto',
      fontFamily: 'Inter, -apple-system, sans-serif',
      paddingBottom: 32,
    }}>

      {/* Logo card */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '24px 20px',
        margin: '16px 16px 0',
        background: '#121929',
        borderRadius: 14, border: '1px solid #1E2D45',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14, flexShrink: 0,
          background: 'linear-gradient(135deg,#0EA5E9,#7C3AED)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, fontWeight: 700, color: 'white',
          fontFamily: '"JetBrains Mono", monospace',
        }}>D</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: accentColor }}>DeanOS</div>
          <div style={{ fontSize: 12, color: '#8899AA', marginTop: 2 }}>v2.1.0 · Mobile</div>
        </div>
      </div>

      {/* ── APPEARANCE ── */}
      <div style={groupHeader}>Appearance</div>
      <div style={group}>

        {/* Accent colour */}
        <div style={{ ...row, flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={rowLabel}>Accent Colour</span>
          <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
            {ACCENTS.map(({ hex, name }) => (
              <button
                key={hex}
                title={name}
                onClick={() => { setAccentColor(hex); notify('info', 'Accent updated', `Now using ${name}.`) }}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: hex, border: 'none', cursor: 'pointer',
                  boxShadow: accentColor === hex
                    ? `0 0 0 2px #121929, 0 0 0 4px ${hex}`
                    : '0 0 0 2px rgba(255,255,255,0.08)',
                  WebkitTapHighlightColor: 'transparent',
                  transition: 'box-shadow 0.15s',
                }}
              />
            ))}
          </div>
        </div>

        {/* Font size */}
        <div style={row}>
          <span style={rowLabel}>Text Size</span>
          <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1px solid #2A3F5F' }}>
            {FONT_SIZES.map(({ id, label }, i) => {
              const active = fontSize === id
              return (
                <button
                  key={id}
                  onClick={() => { setFontSize(id); notify('info', 'Text size updated', `Size set to ${label}.`) }}
                  style={{
                    width: 40, height: 32,
                    background: active ? accentColor : 'transparent',
                    color: active ? '#0A0F1E' : '#8899AA',
                    border: 'none',
                    borderLeft: i > 0 ? '1px solid #2A3F5F' : 'none',
                    fontSize: 13, fontWeight: active ? 700 : 400,
                    cursor: 'pointer',
                    fontFamily: 'Inter, -apple-system, sans-serif',
                    WebkitTapHighlightColor: 'transparent',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Wallpaper */}
        <div style={{ ...lastRow, flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={rowLabel}>Wallpaper</span>
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            {WALLPAPERS.map(w => (
              <button
                key={w.id}
                onClick={() => { setWallpaper(w.id); notify('success', 'Wallpaper changed', `Now using ${w.label}.`) }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <div style={{
                  width: 72, height: 48, borderRadius: 8,
                  background: w.preview,
                  border: wallpaper === w.id ? `2px solid ${accentColor}` : '2px solid #2A3F5F',
                  transition: 'border-color 0.15s',
                  boxShadow: wallpaper === w.id ? `0 0 8px ${accentColor}66` : 'none',
                }} />
                <div style={{
                  fontSize: 11, color: wallpaper === w.id ? accentColor : '#8899AA',
                  textAlign: 'center', marginTop: 4,
                  fontFamily: 'Inter, -apple-system, sans-serif',
                }}>
                  {w.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SYSTEM ── */}
      <div style={groupHeader}>System</div>
      <div style={group}>

        <div style={row}>
          <div style={{ flex: 1 }}>
            <div style={rowLabel}>Version</div>
            <div style={rowSub}>DeanOS v2.1.0</div>
          </div>
          <span style={{
            fontSize: 12, color: '#00D4FF',
            fontFamily: '"JetBrains Mono", monospace',
          }}>Up to date</span>
        </div>

        <div style={lastRow}>
          <div style={{ flex: 1 }}>
            <div style={{ ...rowLabel, color: confirmReset ? '#FF4444' : '#E8F4F8' }}>
              Reset All Settings
            </div>
            <div style={rowSub}>Restore defaults</div>
          </div>
          <button
            onClick={() => {
              if (confirmReset) {
                reset()
                notify('warning', 'Settings reset', 'Restored to defaults.')
                setConfirmReset(false)
              } else {
                setConfirmReset(true)
                setTimeout(() => setConfirmReset(false), 3000)
              }
            }}
            style={{
              padding: '7px 14px', borderRadius: 8,
              border: '1px solid #FF4444',
              background: confirmReset ? '#FF4444' : 'rgba(255,68,68,0.1)',
              color: confirmReset ? 'white' : '#FF4444',
              fontSize: 13, cursor: 'pointer',
              fontFamily: 'Inter, -apple-system, sans-serif',
              WebkitTapHighlightColor: 'transparent',
              transition: 'background 0.15s, color 0.15s',
            }}
          >
            {confirmReset ? 'Confirm' : 'Reset'}
          </button>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <div style={groupHeader}>About</div>
      <div style={group}>
        {([
          ['OS',     'DeanOS Linux'],
          ['Kernel', '6.1.0-deanos'],
          ['Author', 'Dean Cimatu'],
          ['Stack',  'React 18 · TypeScript · Vite'],
        ] as const).map(([k, v], i, arr) => (
          <div key={k} style={i < arr.length - 1 ? row : lastRow}>
            <span style={{ ...rowLabel, flex: 'none', width: 80, color: '#8899AA', fontSize: 14 }}>{k}</span>
            <span style={{ fontSize: 14, color: '#E8F4F8', fontFamily: '"JetBrains Mono", monospace', flex: 1 }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Links */}
      <div style={groupHeader}>Connect</div>
      <div style={group}>
        {[
          { label: 'GitHub',    href: 'https://github.com/Dean-Cimatu',        sub: '@Dean-Cimatu' },
          { label: 'LinkedIn',  href: 'https://linkedin.com/in/dean-cimatu',   sub: 'dean-cimatu'  },
          { label: 'Email',     href: 'mailto:deancimatu@gmail.com',            sub: 'deancimatu@gmail.com' },
        ].map(({ label, href, sub }, i, arr) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', padding: '14px 16px', gap: 12,
              borderBottom: i < arr.length - 1 ? '1px solid #1E2D45' : 'none',
              textDecoration: 'none',
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={rowLabel}>{label}</div>
              <div style={{ ...rowSub, fontFamily: '"JetBrains Mono", monospace' }}>{sub}</div>
            </div>
            <span style={{ color: '#2A3F5F', fontSize: 18 }}>›</span>
          </a>
        ))}
      </div>

    </div>
  )
}
