import { useState } from 'react'
import { useSettingsStore } from '../../store/settingsStore'

type Section = 'appearance' | 'desktop' | 'about'

const SECTIONS: { id: Section; label: string; icon: string }[] = [
  { id: 'appearance', label: 'Appearance',    icon: '🎨' },
  { id: 'desktop',    label: 'Desktop',        icon: '🖥' },
  { id: 'about',      label: 'About DeanOS',   icon: 'ℹ️' },
]

const WALLPAPERS: { id: 'aurora' | 'grid' | 'minimal'; label: string; preview: string }[] = [
  { id: 'aurora',   label: 'Aurora',   preview: 'linear-gradient(115deg, #0f0c29, #302b63, #24243e)' },
  { id: 'grid',     label: 'Grid',     preview: 'repeating-linear-gradient(0deg,transparent,transparent 9px,#1a1a2e 9px,#1a1a2e 10px),repeating-linear-gradient(90deg,transparent,transparent 9px,#1a1a2e 9px,#1a1a2e 10px),#0a0a14' },
  { id: 'minimal',  label: 'Minimal',  preview: '#0A0F1E' },
]

const ACCENTS = ['#00D4FF','#7C3AED','#10B981','#F59E0B','#EF4444','#EC4899']

const label: React.CSSProperties = {
  fontSize: '11px', color: '#8899AA', fontFamily: 'Inter, sans-serif',
  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px', display: 'block',
}

const sectionTitle: React.CSSProperties = {
  color: '#E8F4F8', fontSize: '16px', fontWeight: 600,
  fontFamily: 'Inter, sans-serif', marginBottom: '24px',
}

export default function Settings() {
  const [section, setSection] = useState<Section>('appearance')
  const { wallpaper, setWallpaper, accentColor, setAccentColor } = useSettingsStore()

  return (
    <div style={{
      display: 'flex', height: '100%', backgroundColor: '#0D1828',
      fontFamily: 'Inter, sans-serif', overflow: 'hidden',
    }}>
      {/* Sidebar */}
      <div style={{
        width: 200, flexShrink: 0,
        backgroundColor: '#111E30', borderRight: '1px solid #1E2D45',
        display: 'flex', flexDirection: 'column', padding: '12px 8px',
        overflowY: 'auto',
      }}>
        <div style={{ padding: '8px 12px 16px', color: '#8899AA', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Settings
        </div>
        {SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '9px 12px', borderRadius: '7px', border: 'none',
              background: section === s.id ? '#1E2D45' : 'transparent',
              color: section === s.id ? '#00D4FF' : '#C0CEDC',
              fontSize: '13px', cursor: 'pointer', width: '100%', textAlign: 'left',
              fontFamily: 'Inter, sans-serif', transition: 'background 0.1s, color 0.1s',
            }}
            onMouseEnter={e => { if (section !== s.id) e.currentTarget.style.background = '#1A2640' }}
            onMouseLeave={e => { if (section !== s.id) e.currentTarget.style.background = 'transparent' }}
          >
            <span style={{ fontSize: '15px' }}>{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
        {section === 'appearance' && (
          <div>
            <div style={sectionTitle}>Appearance</div>

            {/* Wallpaper */}
            <div style={{ marginBottom: '32px' }}>
              <span style={label}>Wallpaper</span>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                {WALLPAPERS.map(w => (
                  <div
                    key={w.id}
                    onClick={() => setWallpaper(w.id)}
                    style={{
                      cursor: 'pointer', borderRadius: '10px', overflow: 'hidden',
                      border: wallpaper === w.id ? '2px solid #00D4FF' : '2px solid #1E2D45',
                      transition: 'border-color 0.15s', flexShrink: 0,
                    }}
                  >
                    <div style={{
                      width: 110, height: 68, background: w.preview,
                    }} />
                    <div style={{
                      backgroundColor: '#1A2640', padding: '6px 10px',
                      fontSize: '11px', color: wallpaper === w.id ? '#00D4FF' : '#8899AA',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      {w.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent colour */}
            <div style={{ marginBottom: '32px' }}>
              <span style={label}>Accent Colour</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                {ACCENTS.map(c => (
                  <div
                    key={c}
                    onClick={() => setAccentColor(c)}
                    style={{
                      width: 28, height: 28, borderRadius: '50%',
                      backgroundColor: c, cursor: 'pointer',
                      boxShadow: accentColor === c ? `0 0 0 2px #0D1828, 0 0 0 4px ${c}` : 'none',
                      transition: 'box-shadow 0.15s',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Current selections summary */}
            <div style={{
              backgroundColor: '#111E30', border: '1px solid #1E2D45',
              borderRadius: '10px', padding: '16px 20px',
            }}>
              <div style={{ fontSize: '12px', color: '#8899AA', marginBottom: '10px', fontWeight: 600 }}>
                Current theme
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  ['Wallpaper', WALLPAPERS.find(w => w.id === wallpaper)?.label ?? wallpaper],
                  ['Accent', accentColor],
                  ['Theme', 'Aurora Dark'],
                  ['Font', 'JetBrains Mono + Inter'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: '#8899AA' }}>{k}</span>
                    <span style={{ fontSize: '12px', color: '#E8F4F8', display: 'flex', alignItems: 'center', gap: 6 }}>
                      {k === 'Accent' && (
                        <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: v }} />
                      )}
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {section === 'desktop' && (
          <div>
            <div style={sectionTitle}>Desktop</div>
            <div style={{
              backgroundColor: '#111E30', border: '1px solid #1E2D45',
              borderRadius: '10px', overflow: 'hidden',
            }}>
              {[
                { label: 'Show desktop icons', value: 'Enabled' },
                { label: 'Icon size', value: '48px' },
                { label: 'Icon arrangement', value: 'Grid (left side)' },
                { label: 'Show clock in taskbar', value: 'Enabled' },
                { label: 'Taskbar position', value: 'Bottom' },
              ].map(({ label: l, value }, i, arr) => (
                <div key={l} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '13px 20px',
                  borderBottom: i < arr.length - 1 ? '1px solid #1E2D45' : 'none',
                }}>
                  <span style={{ fontSize: '13px', color: '#C0CEDC' }}>{l}</span>
                  <span style={{
                    fontSize: '12px', color: '#00D4FF',
                    backgroundColor: 'rgba(0,212,255,0.1)', padding: '2px 10px',
                    borderRadius: '12px',
                  }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === 'about' && (
          <div>
            <div style={sectionTitle}>About DeanOS</div>

            {/* Logo area */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px',
              padding: '20px 24px',
              backgroundColor: '#111E30', border: '1px solid #1E2D45', borderRadius: '12px',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: '16px',
                background: 'linear-gradient(135deg, #0EA5E9, #7C3AED)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: '28px', fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 700, color: 'white',
              }}>D</div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#E8F4F8', marginBottom: '4px' }}>
                  DeanOS
                </div>
                <div style={{ fontSize: '12px', color: '#8899AA' }}>v2.1.0 — Kernel 6.1.0-deanos</div>
                <div style={{ fontSize: '11px', color: '#8899AA', marginTop: '2px' }}>
                  Based on React 18 + TypeScript
                </div>
              </div>
            </div>

            {/* System info */}
            <div style={{
              backgroundColor: '#111E30', border: '1px solid #1E2D45',
              borderRadius: '10px', overflow: 'hidden',
            }}>
              {[
                ['OS', 'DeanOS Linux x86_64'],
                ['Kernel', '6.1.0-deanos'],
                ['Desktop', 'Dean-Compositor'],
                ['CPU', 'DCPU @ 4.20 GHz (8C/16T)'],
                ['RAM', '16384 MB DDR5-6000'],
                ['Shell', 'deanos-terminal'],
                ['Framework', 'React 18.3 + TypeScript 5'],
                ['Bundler', 'Vite 5'],
                ['Styling', 'Tailwind CSS + Framer Motion'],
                ['Author', 'Dean Cimatu'],
              ].map(([k, v], i, arr) => (
                <div key={k} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '11px 20px',
                  borderBottom: i < arr.length - 1 ? '1px solid #1E2D45' : 'none',
                }}>
                  <span style={{ fontSize: '12px', color: '#8899AA', minWidth: 100 }}>{k}</span>
                  <span style={{ fontSize: '12px', color: '#E8F4F8' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
