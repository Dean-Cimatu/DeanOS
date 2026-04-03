import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useWindowStore } from '../store/windowStore'
import Window from './Window'
import StartMenu from './StartMenu'
import { desktopFiles } from '../data/desktopFiles'
import FileIcon from './FileIcon'
import { useSystemStore } from '../store/systemStore'
import { useSettingsStore } from '../store/settingsStore'
import { ClockWidget } from './os/tray/ClockWidget'
import { BatteryWidget } from './os/tray/BatteryWidget'
import { WiFiWidget } from './os/tray/WiFiWidget'
import { VolumeWidget } from './os/tray/VolumeWidget'
import { NotificationBell } from './os/tray/NotificationBell'
import { NotificationCentre } from './os/NotificationCentre'
import ToastContainer from './os/ToastContainer'
import { ContextMenu } from './os/ContextMenu'
import Screensaver from './os/Screensaver'

const WALLPAPERS: Record<string, string> = {
  aurora: [
    'radial-gradient(ellipse 80% 50% at 16% 24%, rgba(58,80,185,0.22) 0%, transparent 55%)',
    'radial-gradient(ellipse 60% 44% at 83% 72%, rgba(105,42,175,0.18) 0%, transparent 50%)',
    'radial-gradient(ellipse 50% 35% at 50% 105%, rgba(18,38,115,0.25) 0%, transparent 40%)',
    'linear-gradient(165deg, #07090e 0%, #0b1120 48%, #08091a 100%)',
  ].join(', '),
  grid: [
    'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(38,58,100,0.22) 39px, rgba(38,58,100,0.22) 40px)',
    'repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(38,58,100,0.22) 39px, rgba(38,58,100,0.22) 40px)',
    'linear-gradient(155deg, #06080e 0%, #09101c 100%)',
  ].join(', '),
  minimal: 'linear-gradient(160deg, #0a0c14 0%, #0d1320 55%, #0a0e18 100%)',
}

export default function Desktop() {
  const windows = useWindowStore(s => s.windows)
  const wallpaper = useSettingsStore(s => s.wallpaper)
  const loggedIn = useSystemStore(s => s.loggedIn)
  const screensaver = useSystemStore(s => s.screensaver)
  const { addNotification, lock, logout, shutdown, restart } = useSystemStore()

  type TrayPanel = 'notif' | 'wifi' | 'volume' | 'battery' | 'clock' | null
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTray, setActiveTray] = useState<TrayPanel>(null)
  const toggleTray = (key: Exclude<TrayPanel, null>) =>
    setActiveTray(a => a === key ? null : key)

  const [desktopCtx, setDesktopCtx] = useState<{ x: number; y: number } | null>(null)

  const menuRef = useRef<HTMLDivElement>(null)
  const startBtnRef = useRef<HTMLButtonElement>(null)

  // Close start menu on any mousedown outside it (capture phase so stopPropagation
  // in child components doesn't interfere)
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current?.contains(e.target as Node)) return
      if (startBtnRef.current?.contains(e.target as Node)) return
      setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler, true)
    return () => document.removeEventListener('mousedown', handler, true)
  }, [menuOpen])

  useEffect(() => {
    if (!loggedIn) return
    const t1 = setTimeout(() => addNotification({ type: 'info', title: 'Welcome back, dean.', message: 'DeanOS v2.1.0 loaded successfully.' }), 1200)
    const t2 = setTimeout(() => addNotification({ type: 'success', title: 'Car Hire System', message: 'carhire.deancimatu.com is live.' }), 10000)
    const t3 = setTimeout(() => addNotification({ type: 'info', title: 'Portfolio updated', message: '7 projects available in the Browser app.' }), 20000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [loggedIn])

  return (
    <div
      style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}
      onMouseDown={() => setActiveTray(null)}
    >
      {/* Desktop area */}
      <div
        style={{
          flex: 1, background: WALLPAPERS[wallpaper] ?? WALLPAPERS.aurora,
          position: 'relative', overflow: 'hidden',
        }}
        onMouseDown={e => { if (e.target === e.currentTarget) setDesktopCtx(null) }}
        onContextMenu={e => {
          if (e.target !== e.currentTarget) return
          e.preventDefault()
          setDesktopCtx({ x: e.clientX, y: e.clientY })
        }}
      >
        {/* Desktop Icons */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, bottom: 40,
            display: 'grid',
            gridAutoFlow: 'column',
            gridTemplateRows: 'repeat(auto-fill, 100px)',
            gridAutoColumns: '96px',
            gap: '4px',
            padding: '16px 12px',
            alignContent: 'start',
            zIndex: 0,
          }}
          onClick={e => e.stopPropagation()}
        >
          {desktopFiles.map(file => <FileIcon key={file.id} file={file} />)}
        </div>

        {/* Windows */}
        {Object.entries(windows).map(([id, windowData]) =>
          !windowData.minimised && <Window key={id} id={id} windowData={windowData} />
        )}

        {/* Start Menu */}
        {menuOpen && (
          <div ref={menuRef} onClick={e => e.stopPropagation()}>
            <StartMenu />
          </div>
        )}

        {/* Notification Centre */}
        <AnimatePresence>
          {activeTray === 'notif' && <NotificationCentre onClose={() => setActiveTray(null)} />}
        </AnimatePresence>

        {/* Desktop context menu */}
        {desktopCtx && (
          <ContextMenu
            position={desktopCtx}
            onClose={() => setDesktopCtx(null)}
            items={[
              {
                label: 'Change Wallpaper', icon: '🖼️',
                onClick: () => addNotification({ type: 'info', title: 'Wallpaper', message: 'Open Settings to change the wallpaper.' }),
              },
              {
                label: 'Refresh Desktop', icon: '↺',
                onClick: () => addNotification({ type: 'success', title: 'Desktop refreshed', message: '' }),
              },
              { label: '', divider: true },
              { label: 'Lock Screen', icon: '🔒', onClick: lock },
              { label: '', divider: true },
              { label: 'Log Out',      icon: '↩',  onClick: logout,   danger: true },
              { label: 'Restart',      icon: '↺',  onClick: restart,  danger: false },
              { label: 'Shut Down',    icon: '⏻',  onClick: shutdown, danger: true },
            ]}
          />
        )}
      </div>

      {/* Screensaver overlay */}
      <AnimatePresence>
        {screensaver && <Screensaver key="screensaver" />}
      </AnimatePresence>

      {/* Toast notifications */}
      <ToastContainer />

      {/* Taskbar */}
      <div
        style={{
          height: '40px', backgroundColor: 'rgba(10,15,30,0.95)', borderTop: '1px solid #1E2D45',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 8px', backdropFilter: 'blur(8px)', zIndex: 1000, flexShrink: 0,
        }}
      >
        {/* Left: Start button */}
        <button
          ref={startBtnRef}
          onMouseDown={e => { e.stopPropagation(); setMenuOpen(o => !o); setActiveTray(null) }}
          style={{
            backgroundColor: menuOpen ? '#00D4FF' : '#1E2D45', color: menuOpen ? '#0A0F1E' : '#E8F4F8',
            border: '1px solid #2A3F5F', borderRadius: '6px', padding: '4px 14px',
            fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', fontWeight: 600,
            cursor: 'pointer', transition: 'background-color 0.15s, color 0.15s',
          }}
        >
          DeanOS
        </button>

        {/* Right: System Tray */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <NotificationBell open={activeTray === 'notif'} onToggle={() => toggleTray('notif')} />
          <WiFiWidget open={activeTray === 'wifi'} onToggle={() => toggleTray('wifi')} />
          <VolumeWidget open={activeTray === 'volume'} onToggle={() => toggleTray('volume')} />
          <BatteryWidget open={activeTray === 'battery'} onToggle={() => toggleTray('battery')} />
          <ClockWidget open={activeTray === 'clock'} onToggle={() => toggleTray('clock')} />
        </div>
      </div>
    </div>
  )
}
