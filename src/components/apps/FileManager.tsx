import { useState } from 'react'
import { AppIcon } from '../os/AppIcon'

type VDir = '/home' | '/home/projects' | '/home/about'

interface VFile {
  name: string
  isDir: boolean
  size?: string
  modified?: string
}

const FS: Record<VDir, VFile[]> = {
  '/home': [
    { name: 'about',       isDir: true,  modified: 'Today' },
    { name: 'projects',    isDir: true,  modified: 'Today' },
    { name: 'DeanOS.md',   isDir: false, size: '1.2 KB', modified: 'Today' },
    { name: 'resume.txt',  isDir: false, size: '1.8 KB', modified: 'Today' },
  ],
  '/home/projects': [
    { name: 'DeanOS',    isDir: true, modified: 'Today' },
    { name: 'carhire',   isDir: true, modified: 'Today' },
    { name: 'portfolio', isDir: true, modified: 'Today' },
  ],
  '/home/about': [
    { name: 'bio.txt',    isDir: false, size: '0.4 KB', modified: 'Today' },
    { name: 'skills.txt', isDir: false, size: '0.6 KB', modified: 'Today' },
  ],
}

const PLACES: { label: string; path: VDir; iconId: string }[] = [
  { label: 'Home',     path: '/home',         iconId: 'about' },
  { label: 'Projects', path: '/home/projects', iconId: 'projects' },
  { label: 'About',    path: '/home/about',    iconId: 'folder' },
]

function dirAlias(d: VDir) {
  return d === '/home' ? '~' : d.replace('/home', '~')
}

export default function FileManager() {
  const [dir, setDir]       = useState<VDir>('/home')
  const [history, setHistory] = useState<VDir[]>(['/home'])
  const [histIdx, setHistIdx] = useState(0)
  const [view, setView]     = useState<'grid' | 'list'>('grid')
  const [selected, setSelected] = useState<string | null>(null)

  const files = FS[dir] ?? []
  const canBack = histIdx > 0
  const canFwd  = histIdx < history.length - 1

  function navigate(path: VDir) {
    const next = history.slice(0, histIdx + 1)
    next.push(path)
    setHistory(next)
    setHistIdx(next.length - 1)
    setDir(path)
    setSelected(null)
  }

  function goBack() {
    if (!canBack) return
    const idx = histIdx - 1
    setHistIdx(idx)
    setDir(history[idx])
    setSelected(null)
  }

  function goFwd() {
    if (!canFwd) return
    const idx = histIdx + 1
    setHistIdx(idx)
    setDir(history[idx])
    setSelected(null)
  }

  function handleDoubleClick(f: VFile) {
    if (f.isDir) {
      const target = `${dir}/${f.name}` as VDir
      if (FS[target]) navigate(target)
    }
  }

  const btn = (active: boolean): React.CSSProperties => ({
    background: 'none', border: 'none', borderRadius: '6px',
    padding: '5px 8px', cursor: active ? 'pointer' : 'default',
    color: active ? '#E8F4F8' : '#3A4F6A', fontSize: '14px',
    transition: 'background 0.1s',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#0D1828', fontFamily: 'Inter, sans-serif' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '4px',
        padding: '6px 12px',
        backgroundColor: '#111E30', borderBottom: '1px solid #1E2D45',
        flexShrink: 0,
      }}>
        {/* Nav buttons */}
        <button style={btn(canBack)} onClick={goBack}
          onMouseEnter={e => { if (canBack) e.currentTarget.style.background = '#1E2D45' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none' }}>
          ‹
        </button>
        <button style={btn(canFwd)} onClick={goFwd}
          onMouseEnter={e => { if (canFwd) e.currentTarget.style.background = '#1E2D45' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none' }}>
          ›
        </button>
        <button style={btn(dir !== '/home')} onClick={() => navigate('/home')}
          onMouseEnter={e => { e.currentTarget.style.background = '#1E2D45' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none' }}>
          ⌂
        </button>

        {/* Breadcrumb */}
        <div style={{
          flex: 1, marginLeft: '8px',
          backgroundColor: '#0A1525', border: '1px solid #1E2D45', borderRadius: '6px',
          padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '4px',
          fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', color: '#8899AA',
        }}>
          {dirAlias(dir).split('/').filter(Boolean).reduce<React.ReactNode[]>((acc, part, i) => {
            acc.push(<span key={`sep-${i}`} style={{ color: '#3A4F6A' }}>/</span>)
            acc.push(<span key={part} style={{ color: '#00D4FF' }}>{part}</span>)
            return acc
          }, [<span key="root" style={{ color: '#8899AA' }}>dean</span>])}
        </div>

        {/* View toggles */}
        <div style={{ display: 'flex', gap: '2px', marginLeft: '8px' }}>
          {(['grid', 'list'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              ...btn(true),
              background: view === v ? '#1E2D45' : 'none',
              color: view === v ? '#00D4FF' : '#8899AA',
              fontSize: '12px', padding: '4px 8px',
            }}>
              {v === 'grid' ? '⊞' : '☰'}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{
          width: 180, flexShrink: 0,
          backgroundColor: '#0F1A2B', borderRight: '1px solid #1E2D45',
          padding: '12px 8px', overflowY: 'auto',
        }}>
          <div style={{ fontSize: '10px', color: '#3A4F6A', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 10px 8px', fontWeight: 600 }}>
            Places
          </div>
          {PLACES.map(p => (
            <button key={p.path} onClick={() => navigate(p.path)} style={{
              display: 'flex', alignItems: 'center', gap: '9px',
              padding: '7px 10px', borderRadius: '7px', border: 'none',
              background: dir === p.path ? '#1E2D45' : 'transparent',
              color: dir === p.path ? '#00D4FF' : '#A0B4C8',
              fontSize: '12px', cursor: 'pointer', width: '100%', textAlign: 'left',
              fontFamily: 'Inter, sans-serif', transition: 'background 0.1s, color 0.1s',
            }}
              onMouseEnter={e => { if (dir !== p.path) e.currentTarget.style.background = '#17243A' }}
              onMouseLeave={e => { if (dir !== p.path) e.currentTarget.style.background = 'transparent' }}
            >
              <AppIcon iconId={p.iconId} size={20} />
              {p.label}
            </button>
          ))}

          <div style={{ borderTop: '1px solid #1E2D45', margin: '12px 0 8px' }} />
          <div style={{ fontSize: '10px', color: '#3A4F6A', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 10px 8px', fontWeight: 600 }}>
            Bookmarks
          </div>
          <div style={{ padding: '4px 10px', fontSize: '11px', color: '#3A4F6A' }}>
            No bookmarks yet
          </div>
        </div>

        {/* Main area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {view === 'grid' ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignContent: 'start' }}>
              {files.map(f => (
                <div
                  key={f.name}
                  onClick={() => setSelected(f.name)}
                  onDoubleClick={() => handleDoubleClick(f)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: '6px', padding: '10px 8px', borderRadius: '8px',
                    width: 84, cursor: 'default', userSelect: 'none',
                    backgroundColor: selected === f.name ? 'rgba(0,212,255,0.14)' : 'transparent',
                    border: selected === f.name ? '1px solid rgba(0,212,255,0.3)' : '1px solid transparent',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => { if (selected !== f.name) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)' }}
                  onMouseLeave={e => { if (selected !== f.name) e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  <AppIcon iconId={f.isDir ? 'folder' : 'document'} size={40} />
                  <span style={{ fontSize: '11px', color: '#C8D8E8', textAlign: 'center', wordBreak: 'break-word', lineHeight: 1.3 }}>
                    {f.name}
                  </span>
                </div>
              ))}
              {files.length === 0 && (
                <div style={{ color: '#3A4F6A', fontSize: '13px', padding: '20px' }}>
                  This folder is empty.
                </div>
              )}
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1E2D45' }}>
                  {['Name', 'Size', 'Modified'].map(h => (
                    <th key={h} style={{ padding: '6px 12px', textAlign: 'left', fontSize: '11px', color: '#3A4F6A', fontWeight: 600, letterSpacing: '0.06em' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {files.map(f => (
                  <tr
                    key={f.name}
                    onClick={() => setSelected(f.name)}
                    onDoubleClick={() => handleDoubleClick(f)}
                    style={{
                      cursor: 'default', userSelect: 'none',
                      backgroundColor: selected === f.name ? 'rgba(0,212,255,0.1)' : 'transparent',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={e => { if (selected !== f.name) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.03)' }}
                    onMouseLeave={e => { if (selected !== f.name) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
                  >
                    <td style={{ padding: '7px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <AppIcon iconId={f.isDir ? 'folder' : 'document'} size={20} />
                      <span style={{ fontSize: '12px', color: '#C8D8E8' }}>{f.name}</span>
                      {f.isDir && <span style={{ fontSize: '10px', color: '#3A4F6A' }}>folder</span>}
                    </td>
                    <td style={{ padding: '7px 12px', fontSize: '12px', color: '#5A6F88' }}>
                      {f.isDir ? '—' : (f.size ?? '—')}
                    </td>
                    <td style={{ padding: '7px 12px', fontSize: '12px', color: '#5A6F88' }}>
                      {f.modified ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div style={{
        borderTop: '1px solid #1E2D45', padding: '4px 16px',
        backgroundColor: '#111E30', flexShrink: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: '11px', color: '#3A4F6A' }}>
          {files.length} item{files.length !== 1 ? 's' : ''}
          {selected && ` — ${selected} selected`}
        </span>
        <span style={{ fontSize: '11px', color: '#3A4F6A', fontFamily: '"JetBrains Mono", monospace' }}>
          dean@deanos:{dirAlias(dir)}
        </span>
      </div>
    </div>
  )
}
