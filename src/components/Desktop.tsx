import { useState, useEffect } from 'react'
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

const WALLPAPERS: Record<string, string> = {
  aurora: 'linear-gradient(115deg, #0f0c29, #302b63, #24243e)',
  grid: 'repeating-linear-gradient(0deg, transparent, transparent 39px, #1a1a2e 39px, #1a1a2e 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #1a1a2e 39px, #1a1a2e 40px), #0a0a14',
  minimal: '#0A0F1E',
}

export default function Desktop() {
  const windows = useWindowStore(s => s.windows)
  const wallpaper = useSettingsStore(s => s.wallpaper)
  const loggedIn = useSystemStore(s => s.loggedIn)
  const addNotification = useSystemStore(s => s.addNotification)

  type TrayPanel = 'notif' | 'wifi' | 'volume' | 'battery' | 'clock' | null
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTray, setActiveTray] = useState<TrayPanel>(null)
  const toggleTray = (key: Exclude<TrayPanel, null>) =>
    setActiveTray(a => a === key ? null : key)

  const [desktopCtx, setDesktopCtx] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (!loggedIn) return
    const t1 = setTimeout(() => addNotification({ type: 'info', title: 'Welcome back, dean.', message: 'DeanOS v2.0 loaded successfully.' }), 1000)
    const t2 = setTimeout(() => addNotification({ type: 'success', title: 'Car Hire System', message: 'carhire.deancimatu.com is live.' }), 4000)
    const t3 = setTimeout(() => addNotification({ type: 'info', title: 'Portfolio updated', message: '7 projects available in the Browser app.' }), 8000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [loggedIn])

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Desktop area */}
      <div
        style={{
          flex: 1, background: WALLPAPERS[wallpaper] ?? WALLPAPERS.aurora,
          position: 'relative', overflow: 'hidden',
        }}
        onClick={() => { setMenuOpen(false); setActiveTray(null) }}
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
          <div onClick={e => e.stopPropagation()}>
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
                onClick: () => addNotification({
                  type: 'info', title: 'Wallpaper',
                  message: 'Open Settings to change the wallpaper.',
                }),
              },
              {
                label: 'Refresh Desktop', icon: '↺',
                onClick: () => addNotification({
                  type: 'success', title: 'Desktop refreshed', message: '',
                }),
              },
              { label: '', divider: true },
              {
                label: 'About DeanOS', icon: 'ℹ️',
                onClick: () => addNotification({
                  type: 'info', title: 'DeanOS v2.1.0',
                  message: 'Built with React + TypeScript.',
                }),
              },
            ]}
          />
        )}
      </div>

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
          onClick={e => { e.stopPropagation(); setMenuOpen(o => !o); setActiveTray(null) }}
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
