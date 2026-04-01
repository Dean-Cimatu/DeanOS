import { useState, useEffect, useRef } from 'react'
import { useWindowStore } from '../store/windowStore'
import Window from './Window'
import StartMenu from './StartMenu'
import { desktopFiles } from '../data/desktopFiles'
import FileIcon from './FileIcon'
import { useSystemStore } from '../store/systemStore'
import { useSettingsStore } from '../store/settingsStore'
import { ClockWidget } from './os/tray/ClockWidget'

const WALLPAPERS: Record<string, string> = {
  aurora: 'linear-gradient(115deg, #0f0c29, #302b63, #24243e)',
  grid: 'repeating-linear-gradient(0deg, transparent, transparent 39px, #1a1a2e 39px, #1a1a2e 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #1a1a2e 39px, #1a1a2e 40px), #0a0a14',
  minimal: '#0A0F1E',
}

export default function Desktop() {
  const windows = useWindowStore((state) => state.windows)
  const wallpaper = useSettingsStore((state) => state.wallpaper)

  const {
    batteryLevel,
    wifiConnected,
    volume,
    isMuted,
    unreadCount,
    notifications,
    toggleMute,
    markAllRead,
  } = useSystemStore()

  const [menuOpen, setMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

  // Close notification panel when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    if (notifOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [notifOpen])

  const batteryIcon = batteryLevel > 60 ? '▰▰▰▰' : batteryLevel > 30 ? '▰▰▰░' : batteryLevel > 10 ? '▰▰░░' : '▰░░░'
  const batteryColor = batteryLevel > 30 ? '#4ade80' : batteryLevel > 10 ? '#facc15' : '#f87171'

  const volumeIcon = isMuted || volume === 0 ? '🔇' : volume < 40 ? '🔈' : '🔊'

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Desktop area — icons + windows share same positioning context */}
      <div
        style={{
          flex: 1,
          background: WALLPAPERS[wallpaper] ?? WALLPAPERS.aurora,
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() => { setMenuOpen(false); setNotifOpen(false) }}
      >
        {/* Desktop Icons — overlaid top-left */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            gap: '20px',
            padding: '20px',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            zIndex: 5,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {desktopFiles.map((file) => (
            <FileIcon key={file.id} file={file} />
          ))}
        </div>

        {/* Windows */}
        {Object.entries(windows).map(([id, windowData]) =>
          !windowData.minimised && <Window key={id} id={id} windowData={windowData} />
        )}

        {/* Start Menu */}
        {menuOpen && (
          <div onClick={(e) => e.stopPropagation()}>
            <StartMenu />
          </div>
        )}

        {/* Notification panel */}
        {notifOpen && (
          <div
            ref={notifRef}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              bottom: '4px',
              right: '8px',
              width: '320px',
              maxHeight: '400px',
              backgroundColor: '#1a1a2e',
              border: '1px solid #2A3F5F',
              borderRadius: '10px',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderBottom: '1px solid #2A3F5F',
              }}
            >
              <span style={{ color: '#E8F4F8', fontSize: '13px', fontFamily: '"JetBrains Mono", monospace', fontWeight: 600 }}>
                Notifications
              </span>
              {notifications.length > 0 && (
                <button
                  onClick={markAllRead}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#00D4FF',
                    fontSize: '11px',
                    cursor: 'pointer',
                    fontFamily: '"JetBrains Mono", monospace',
                  }}
                >
                  Mark all read
                </button>
              )}
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {notifications.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: '#8899AA', fontSize: '13px', fontFamily: '"JetBrains Mono", monospace' }}>
                  No notifications
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '10px 14px',
                      borderBottom: '1px solid #1E2D45',
                      backgroundColor: n.read ? 'transparent' : 'rgba(0,212,255,0.05)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ color: '#E8F4F8', fontSize: '12px', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{n.title}</span>
                      <span style={{ color: '#8899AA', fontSize: '10px', fontFamily: '"JetBrains Mono", monospace' }}>
                        {n.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div style={{ color: '#8899AA', fontSize: '11px', fontFamily: 'Inter, sans-serif' }}>{n.message}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Taskbar */}
      <div
        style={{
          height: '40px',
          backgroundColor: 'rgba(10, 15, 30, 0.95)',
          borderTop: '1px solid #1E2D45',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          flexShrink: 0,
        }}
      >
        {/* Left: Start button */}
        <button
          onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); setNotifOpen(false) }}
          style={{
            backgroundColor: menuOpen ? '#00D4FF' : '#1E2D45',
            color: menuOpen ? '#0A0F1E' : '#E8F4F8',
            border: '1px solid #2A3F5F',
            borderRadius: '6px',
            padding: '4px 14px',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 0.15s, color 0.15s',
          }}
        >
          DeanOS
        </button>

        {/* Right: System Tray */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {/* Wifi */}
          <TrayItem title={wifiConnected ? 'WiFi: Connected' : 'WiFi: Disconnected'}>
            <span style={{ color: wifiConnected ? '#4ade80' : '#f87171', fontSize: '14px' }}>
              {wifiConnected ? '▲' : '▼'}
            </span>
            <span style={{ color: '#8899AA', fontSize: '10px', fontFamily: '"JetBrains Mono", monospace', marginLeft: '2px' }}>
              WiFi
            </span>
          </TrayItem>

          {/* Battery */}
          <TrayItem title={`Battery: ${batteryLevel}%`}>
            <span style={{ color: batteryColor, fontSize: '11px', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '-1px' }}>
              {batteryIcon}
            </span>
            <span style={{ color: '#8899AA', fontSize: '10px', fontFamily: '"JetBrains Mono", monospace', marginLeft: '3px' }}>
              {batteryLevel}%
            </span>
          </TrayItem>

          {/* Volume */}
          <TrayItem title={isMuted ? 'Volume: Muted' : `Volume: ${volume}%`} onClick={toggleMute}>
            <span style={{ fontSize: '13px' }}>{volumeIcon}</span>
          </TrayItem>

          {/* Bell / Notifications */}
          <div style={{ position: 'relative' }} onMouseDown={(e) => e.stopPropagation()}>
            <TrayItem
              title={`${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setNotifOpen((o) => !o)
                if (!notifOpen) markAllRead()
              }}
            >
              <span style={{ fontSize: '14px' }}>🔔</span>
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '14px',
                    height: '14px',
                    backgroundColor: '#f87171',
                    borderRadius: '50%',
                    fontSize: '9px',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </TrayItem>
          </div>

          {/* Clock */}
          <ClockWidget />
        </div>
      </div>
    </div>
  )
}

interface TrayItemProps {
  title: string
  onClick?: (e: React.MouseEvent) => void
  children: React.ReactNode
}

function TrayItem({ title, onClick, children }: TrayItemProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        backgroundColor: hovered ? '#1E2D45' : 'transparent',
        border: 'none',
        borderRadius: '5px',
        padding: '3px 7px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background-color 0.12s',
        height: '30px',
      }}
    >
      {children}
    </button>
  )
}
