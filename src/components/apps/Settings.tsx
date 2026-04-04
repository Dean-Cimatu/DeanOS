import { useState, type ReactNode, type CSSProperties } from 'react'
import { useSettingsStore } from '../../store/settingsStore'
import { useSystemStore } from '../../store/systemStore'

type Section = 'display' | 'wallpaper' | 'system' | 'about'

// ── Sidebar icons ──────────────────────────────────────────────────────────────

const ICONS: Record<Section, ReactNode> = {
  display: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  ),
  wallpaper: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  system: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  about: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="8.01"/>
      <polyline points="11 12 12 12 12 16 13 16"/>
    </svg>
  ),
}

const SECTIONS: { id: Section; label: string }[] = [
  { id: 'display',   label: 'Display' },
  { id: 'wallpaper', label: 'Wallpaper' },
  { id: 'system',    label: 'System' },
  { id: 'about',     label: 'About DeanOS' },
]

// ── Data ───────────────────────────────────────────────────────────────────────

const ACCENTS: { hex: string; name: string }[] = [
  { hex: '#00D4FF', name: 'Cyan' },
  { hex: '#9B59B6', name: 'Purple' },
  { hex: '#00FF88', name: 'Green' },
  { hex: '#FF8C00', name: 'Orange' },
  { hex: '#FF4444', name: 'Red' },
  { hex: '#FF69B4', name: 'Pink' },
]

const WALLPAPERS: { id: 'aurora' | 'grid' | 'minimal'; label: string; preview: string }[] = [
  {
    id: 'aurora',
    label: 'Aurora',
    preview: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
  },
  {
    id: 'grid',
    label: 'Grid',
    preview:
      'repeating-linear-gradient(0deg,transparent,transparent 9px,#1a1a2e 9px,#1a1a2e 10px),repeating-linear-gradient(90deg,transparent,transparent 9px,#1a1a2e 9px,#1a1a2e 10px),#0a0a14',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    preview: '#0A0F1E',
  },
]

const FONT_SIZES: { id: 'small' | 'medium' | 'large'; label: string }[] = [
  { id: 'small',  label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large',  label: 'Large' },
]

// ── Shared styles ──────────────────────────────────────────────────────────────

const sectionTitle: CSSProperties = {
  color: '#E8F4F8', fontSize: '18px', fontWeight: 700,
  fontFamily: 'Ubuntu, sans-serif', marginBottom: '24px',
}

const fieldLabel: CSSProperties = {
  fontSize: '11px', color: '#8899AA', fontFamily: 'Ubuntu, sans-serif',
  textTransform: 'uppercase', letterSpacing: '0.08em',
  marginBottom: '12px', display: 'block',
}

const card: CSSProperties = {
  backgroundColor: '#111E30', border: '1px solid #1E2D45',
  borderRadius: '10px', overflow: 'hidden',
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function Settings() {
  const [section, setSection] = useState<Section>('display')

  const {
    accentColor, setAccentColor,
    wallpaper,    setWallpaper,
    fontSize,     setFontSize,
    reset,
  } = useSettingsStore()

  const addNotification = useSystemStore(s => s.addNotification)

  const notify = (type: 'info' | 'success' | 'warning' | 'error', title: string, message: string) =>
    addNotification({ type, title, message })

  return (
    <div style={{
      display: 'flex', width: '100%', height: '100%', backgroundColor: '#0D1828',
      fontFamily: 'Ubuntu, sans-serif', overflow: 'hidden',
    }}>
      {/* ── Sidebar ── */}
      <div style={{
        width: 200, flexShrink: 0,
        backgroundColor: '#0A0F1E', borderRight: '1px solid #1E2D45',
        display: 'flex', flexDirection: 'column', padding: '12px 8px',
        overflowY: 'auto',
      }}>
        <div style={{
          padding: '8px 12px 16px', color: '#8899AA',
          fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          Settings
        </div>

        {SECTIONS.map(s => {
          const active = section === s.id
          return (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 12px',
                borderRadius: active ? '0 7px 7px 0' : '7px',
                border: 'none',
                borderLeft: active ? '2px solid #00D4FF' : '2px solid transparent',
                background: active ? '#1E2D45' : 'transparent',
                color: active ? '#E8F4F8' : '#8899AA',
                fontSize: '13px', cursor: 'pointer', width: '100%', textAlign: 'left',
                fontFamily: 'Ubuntu, sans-serif', transition: 'background 0.1s, color 0.1s',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = '#1A2035'; e.currentTarget.style.color = '#E8F4F8' } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8899AA' } }}
            >
              {ICONS[s.id]}
              {s.label}
            </button>
          )
        })}
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>

        {/* ── Display ── */}
        {section === 'display' && (
          <div>
            <div style={sectionTitle}>Display</div>

            {/* Accent colour */}
            <div style={{ marginBottom: '32px' }}>
              <span style={fieldLabel}>Accent Color</span>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {ACCENTS.map(({ hex, name }) => (
                  <div
                    key={hex}
                    title={name}
                    onClick={() => { setAccentColor(hex); notify('info', 'Accent updated', `Now using ${name}.`) }}
                    style={{
                      width: 32, height: 32, borderRadius: '50%',
                      backgroundColor: hex, cursor: 'pointer',
                      boxShadow: accentColor === hex
                        ? `0 0 0 2px #0D1828, 0 0 0 4px ${hex}`
                        : '0 0 0 2px transparent',
                      transition: 'box-shadow 0.15s',
                    }}
                  />
                ))}
              </div>
              <div style={{ marginTop: '10px', fontSize: '12px', color: '#8899AA' }}>
                Current: <span style={{ color: accentColor, fontFamily: '"JetBrains Mono", monospace' }}>{accentColor}</span>
              </div>
            </div>

            {/* Font size */}
            <div style={{ marginBottom: '32px' }}>
              <span style={fieldLabel}>Font Size</span>
              <div style={{ display: 'flex', gap: '0' }}>
                {FONT_SIZES.map(({ id, label }, i) => {
                  const active = fontSize === id
                  const radius = i === 0 ? '7px 0 0 7px' : i === FONT_SIZES.length - 1 ? '0 7px 7px 0' : '0'
                  return (
                    <button
                      key={id}
                      onClick={() => { setFontSize(id); notify('info', 'Font size updated', `Size set to ${label}.`) }}
                      style={{
                        padding: '7px 20px', border: `1px solid ${active ? accentColor : '#2A3F5F'}`,
                        background: active ? `rgba(0,212,255,0.12)` : '#111E30',
                        color: active ? accentColor : '#8899AA',
                        fontSize: '13px', cursor: 'pointer', fontFamily: 'Ubuntu, sans-serif',
                        borderRadius: radius,
                        marginLeft: i === 0 ? 0 : '-1px',
                        fontWeight: active ? 600 : 400,
                        transition: 'background 0.1s, color 0.1s, border-color 0.1s',
                        position: 'relative', zIndex: active ? 1 : 0,
                      }}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

          </div>
        )}

        {/* ── Wallpaper ── */}
        {section === 'wallpaper' && (
          <div>
            <div style={sectionTitle}>Wallpaper</div>

            {/* Gradient wallpapers */}
            <div style={{ marginBottom: '28px' }}>
              <span style={fieldLabel}>Gradient</span>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {WALLPAPERS.map(w => (
                  <div
                    key={w.id}
                    onClick={() => { setWallpaper(w.id); notify('success', 'Wallpaper changed', `Now using ${w.label}.`) }}
                    style={{
                      cursor: 'pointer', borderRadius: '10px', overflow: 'hidden',
                      border: wallpaper === w.id ? `2px solid ${accentColor}` : '2px solid #1E2D45',
                      transition: 'border-color 0.15s',
                      boxShadow: wallpaper === w.id ? `0 0 12px ${accentColor}44` : 'none',
                    }}
                  >
                    <div style={{ width: 120, height: 80, background: w.preview }} />
                    <div style={{
                      backgroundColor: '#1A2640', padding: '8px 12px',
                      fontSize: '12px', fontFamily: 'Ubuntu, sans-serif',
                      color: wallpaper === w.id ? accentColor : '#8899AA',
                      textAlign: 'center',
                    }}>
                      {w.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo wallpapers */}
            <div>
              <span style={fieldLabel}>Photos</span>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {[
                  { label: 'London Skyline', preview: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #e94560 100%)', desc: 'Night over the Thames' },
                  { label: 'Mountain Pass', preview: 'linear-gradient(180deg, #2c3e50 0%, #3d5a6b 30%, #6b8f71 65%, #a8c5a0 100%)', desc: 'Alpine morning light' },
                  { label: 'Deep Ocean', preview: 'linear-gradient(180deg, #0d1b2a 0%, #1b4332 30%, #0077b6 65%, #00b4d8 100%)', desc: 'Pacific blue' },
                  { label: 'Desert Dusk', preview: 'linear-gradient(180deg, #2d1b69 0%, #8e44ad 30%, #e67e22 65%, #f39c12 100%)', desc: 'Sahara at golden hour' },
                ].map(w => (
                  <div
                    key={w.label}
                    onClick={() => notify('info', 'Photos coming soon', 'Upload your own photos in a future update.')}
                    style={{
                      cursor: 'pointer', borderRadius: '10px', overflow: 'hidden',
                      border: '2px solid #1E2D45',
                      opacity: 0.75,
                      transition: 'opacity 0.15s, border-color 0.15s',
                      position: 'relative',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.borderColor = '#2A3F5F' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0.75'; (e.currentTarget as HTMLElement).style.borderColor = '#1E2D45' }}
                  >
                    <div style={{ width: 120, height: 80, background: w.preview, position: 'relative' }}>
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', color: 'rgba(255,255,255,0.45)',
                        fontFamily: 'Ubuntu, sans-serif',
                      }}>
                        {w.desc}
                      </div>
                    </div>
                    <div style={{
                      backgroundColor: '#1A2640', padding: '8px 12px',
                      fontSize: '12px', fontFamily: 'Ubuntu, sans-serif',
                      color: '#8899AA', textAlign: 'center',
                    }}>
                      {w.label}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '12px', fontSize: '12px', color: '#4A6080' }}>
                Photo wallpapers are placeholder previews — upload support coming soon.
              </div>
            </div>
          </div>
        )}

        {/* ── System ── */}
        {section === 'system' && (
          <div>
            <div style={sectionTitle}>System</div>

            {/* Version card */}
            <div style={{ ...card, padding: '20px 24px', marginBottom: '20px' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#E8F4F8', marginBottom: '4px', fontFamily: 'Ubuntu, sans-serif' }}>
                DeanOS v2.1.0
              </div>
              <div style={{ fontSize: '13px', color: '#8899AA', marginBottom: '2px' }}>
                Built with React 18 + TypeScript + Vite
              </div>
              <div style={{ fontSize: '12px', color: '#4A6080', marginTop: '2px' }}>
                Kernel 6.1.0-deanos · Dean-Compositor
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ ...card, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', color: '#E8F4F8', marginBottom: '2px' }}>Check for updates</div>
                  <div style={{ fontSize: '12px', color: '#8899AA' }}>You are on the latest release</div>
                </div>
                <button
                  onClick={() => notify('success', 'Up to date', 'You are on the latest version (v2.1.0).')}
                  style={{
                    padding: '7px 16px', borderRadius: '7px', border: `1px solid ${accentColor}`,
                    background: `rgba(0,212,255,0.08)`, color: accentColor,
                    fontSize: '12px', cursor: 'pointer', fontFamily: 'Ubuntu, sans-serif',
                    fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0, transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = `rgba(0,212,255,0.18)`)}
                  onMouseLeave={e => (e.currentTarget.style.background = `rgba(0,212,255,0.08)`)}
                >
                  Check now
                </button>
              </div>

              <div style={{ ...card, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', color: '#E8F4F8', marginBottom: '2px' }}>Reset all settings</div>
                  <div style={{ fontSize: '12px', color: '#8899AA' }}>Restore defaults: Aurora wallpaper, cyan accent, medium font</div>
                </div>
                <button
                  onClick={() => { reset(); notify('warning', 'Settings reset', 'All settings restored to defaults.') }}
                  style={{
                    padding: '7px 16px', borderRadius: '7px', border: '1px solid #FF4444',
                    background: 'rgba(255,68,68,0.08)', color: '#FF4444',
                    fontSize: '12px', cursor: 'pointer', fontFamily: 'Ubuntu, sans-serif',
                    fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0, transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,68,68,0.18)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,68,68,0.08)')}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── About ── */}
        {section === 'about' && (
          <div>
            <div style={sectionTitle}>About DeanOS</div>

            {/* Logo card */}
            <div style={{
              ...card, padding: '24px',
              display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: '16px',
                background: 'linear-gradient(135deg, #0EA5E9, #7C3AED)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: '28px', fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 700, color: 'white',
              }}>D</div>
              <div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: accentColor, marginBottom: '4px' }}>
                  DeanOS
                </div>
                <div style={{ fontSize: '12px', color: '#8899AA' }}>v2.1.0 — Kernel 6.1.0-deanos</div>
                <div style={{ fontSize: '11px', color: '#4A6080', marginTop: '2px' }}>
                  A browser-based portfolio OS
                </div>
              </div>
            </div>

            {/* System info */}
            <div style={{ ...card, marginBottom: '20px' }}>
              {[
                ['OS',         'DeanOS Linux x86_64'],
                ['Kernel',     '6.1.0-deanos'],
                ['Shell',      'deanos-terminal (bash-compatible)'],
                ['Compositor', 'Dean-Compositor (Framer Motion)'],
                ['Author',     'Dean Cimatu'],
              ].map(([k, v], i, arr) => (
                <div key={k} style={{
                  display: 'flex', alignItems: 'center', padding: '11px 20px',
                  borderBottom: i < arr.length - 1 ? '1px solid #1E2D45' : 'none',
                }}>
                  <span style={{ fontSize: '12px', color: '#8899AA', width: 120, flexShrink: 0 }}>{k}</span>
                  <span style={{ fontSize: '12px', color: '#E8F4F8', fontFamily: '"JetBrains Mono", monospace' }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div style={{ ...card, marginBottom: '20px' }}>
              <div style={{ padding: '14px 20px 10px', fontSize: '11px', color: '#8899AA', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Tech Stack
              </div>
              {[
                { category: 'Runtime',    color: '#8a78e8', items: ['React 18.3', 'TypeScript 5.4', 'Vite 5'] },
                { category: 'State',      color: '#00D4FF', items: ['Zustand 4 (window, system, settings stores)'] },
                { category: 'Animation',  color: '#4dba8c', items: ['Framer Motion 11 (spring physics, AnimatePresence)'] },
                { category: 'Styling',    color: '#c8894a', items: ['Tailwind CSS v3', 'Inline CSS-in-JS', 'Ubuntu + JetBrains Mono'] },
                { category: 'APIs',       color: '#FF69B4', items: ['Open-Meteo (weather, no key required)', 'Web Audio API (sounds)'] },
              ].map(({ category, color, items }, i, arr) => (
                <div key={category} style={{
                  padding: '10px 20px',
                  borderBottom: i < arr.length - 1 ? '1px solid #1E2D45' : 'none',
                  display: 'flex', gap: '12px',
                }}>
                  <span style={{ fontSize: '12px', color, width: 100, flexShrink: 0, fontWeight: 600 }}>{category}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {items.map(item => (
                      <span key={item} style={{ fontSize: '12px', color: '#C8D8E8', fontFamily: '"JetBrains Mono", monospace' }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { label: 'GitHub', href: 'https://github.com/Dean-Cimatu', icon: 'GH' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/dean-cimatu', icon: 'in' },
                { label: 'deancimatu@gmail.com', href: 'mailto:deancimatu@gmail.com', icon: '@' },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '9px 16px', borderRadius: '8px',
                    border: `1px solid #1E2D45`, backgroundColor: '#111E30',
                    color: '#C0CEDC', textDecoration: 'none',
                    fontSize: '13px', fontFamily: 'Ubuntu, sans-serif',
                    transition: 'border-color 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.color = accentColor }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2D45'; e.currentTarget.style.color = '#C0CEDC' }}
                >
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: '#4A6080' }}>{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
