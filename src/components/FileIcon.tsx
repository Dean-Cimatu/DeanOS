import { useState, useCallback } from 'react'
import { DesktopFile } from '../data/desktopFiles'
import { useSystemStore } from '../store/systemStore'
import { useWindowStore } from '../store/windowStore'
import { AppIcon } from './os/AppIcon'
import { ContextMenu } from './os/ContextMenu'

interface Props {
  file: DesktopFile
}

function openApp(file: DesktopFile) {
  const ws = useWindowStore.getState()
  const { windows } = ws

  if (file.appId === 'settings') {
    if (windows['settings']) { ws.focusWindow('settings'); return }
    ws.openWindow({
      id: 'settings', title: 'System Settings',
      x: 160, y: 80, width: 760, height: 520,
      zIndex: 1, minimised: false, maximised: false,
      preMaxX: 160, preMaxY: 80, preMaxWidth: 760, preMaxHeight: 520,
    })
    return
  }

  if (file.appId === 'files') {
    ws.openWindow({
      id: `files-${Date.now()}`, title: 'Files',
      x: 120, y: 70, width: 860, height: 540,
      zIndex: 1, minimised: false, maximised: false,
      preMaxX: 120, preMaxY: 70, preMaxWidth: 860, preMaxHeight: 540,
    })
    return
  }

  if (file.appId === 'terminal') {
    ws.openWindow({
      id: `terminal-${Date.now()}`, title: 'Terminal',
      x: 100, y: 80, width: 800, height: 500,
      zIndex: 1, minimised: false, maximised: false,
      preMaxX: 100, preMaxY: 80, preMaxWidth: 800, preMaxHeight: 500,
    })
    return
  }

  if (file.appId === 'fileviewer') {
    const filename = file.initialPage ?? file.name
    ws.openWindow({
      id: `fileviewer-${filename}-${Date.now()}`,
      title: filename,
      x: 200, y: 100, width: 600, height: 500,
      zIndex: 1, minimised: false, maximised: false,
      preMaxX: 200, preMaxY: 100, preMaxWidth: 600, preMaxHeight: 500,
      initialPage: filename,
    })
    return
  }

  if (file.appId === 'browser') {
    ws.openWindow({
      id: `browser-${(file.initialPage ?? '/').replace(/\//g, '') || 'home'}-${Date.now()}`,
      title: file.name,
      x: 80, y: 60, width: 900, height: 600,
      zIndex: 1, minimised: false, maximised: false,
      preMaxX: 80, preMaxY: 60, preMaxWidth: 900, preMaxHeight: 600,
      initialPage: file.initialPage ?? '/',
    })
  }
}

export default function FileIcon({ file }: Props) {
  const addNotification = useSystemStore(s => s.addNotification)
  const [ctx, setCtx] = useState<{ x: number; y: number } | null>(null)
  const [selected, setSelected] = useState(false)

  const handleOpen = useCallback(() => openApp(file), [file])

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSelected(true)
    setCtx({ x: e.clientX, y: e.clientY })
  }

  const fileType =
    file.iconId === 'folder' ? 'Folder' :
    file.iconId === 'resume' || file.iconId === 'document' ? 'Document' :
    'Application'

  return (
    <>
      <div
        tabIndex={0}
        onDoubleClick={handleOpen}
        onClick={() => setSelected(true)}
        onBlur={() => setSelected(false)}
        onContextMenu={handleContextMenu}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '6px', padding: '8px 6px', borderRadius: '8px',
          cursor: 'default', userSelect: 'none', outline: 'none',
          width: 80,
          backgroundColor: selected ? 'rgba(0,212,255,0.14)' : 'transparent',
          border: selected ? '1px solid rgba(0,212,255,0.3)' : '1px solid transparent',
          transition: 'background-color 0.1s, border-color 0.1s',
        }}
        onMouseEnter={e => {
          if (!selected) e.currentTarget.style.backgroundColor = 'rgba(0,212,255,0.07)'
        }}
        onMouseLeave={e => {
          if (!selected) e.currentTarget.style.backgroundColor = 'transparent'
        }}
      >
        <AppIcon iconId={file.iconId} size={48} />
        <span style={{
          fontSize: '11px', color: '#E8F4F8', textAlign: 'center',
          fontFamily: "'Ubuntu', sans-serif", lineHeight: 1.3,
          wordBreak: 'break-word', maxWidth: '72px',
          textShadow: '0 1px 4px rgba(0,0,0,0.9)',
        }}>
          {file.name}
        </span>
      </div>

      {ctx && (
        <ContextMenu
          position={ctx}
          onClose={() => { setCtx(null); setSelected(false) }}
          items={[
            { label: 'Open', icon: '▶', onClick: handleOpen },
            { divider: true },
            {
              label: 'Rename', icon: '✏️',
              onClick: () => addNotification({
                type: 'warning', title: 'Rename',
                message: 'Rename is not available in this version.',
              }),
            },
            {
              label: 'Properties', icon: 'ℹ️',
              onClick: () => addNotification({
                type: 'info', title: file.name,
                message: `Type: ${fileType}`,
              }),
            },
            { divider: true },
            {
              label: 'Delete', icon: '🗑️', danger: true,
              onClick: () => addNotification({
                type: 'warning', title: 'Delete',
                message: 'Delete is not available in this version.',
              }),
            },
          ]}
        />
      )}
    </>
  )
}
