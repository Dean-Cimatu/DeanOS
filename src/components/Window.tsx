import { useWindowStore } from "../store/windowStore"
import type { WindowState } from "../store/windowStore"
import { useRef, useEffect } from 'react'
import Terminal from './Terminal'
import BrowserApp from './apps/BrowserApp'
import Settings from './apps/Settings'
import FileManager from './apps/FileManager'
import FileViewer from './apps/FileViewer'
import MusicPlayer from './apps/MusicPlayer'
import ResizeHandle from './ResizeHandle'
import type { ResizeDirection } from './ResizeHandle'

interface WindowProps {
  id: string
  windowData: WindowState
}

const MIN_W = 320
const MIN_H = 240

const DIRECTIONS: ResizeDirection[] = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']

export default function Window({ id, windowData }: WindowProps) {
  const { closeWindow, focusWindow, moveWindow, minimiseWindow, maximiseWindow, updateWindowSize } = useWindowStore()

  const isDragging = useRef(false)
  const dragStart = useRef({ mouseX: 0, mouseY: 0, winX: 0, winY: 0 })

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    dragStart.current = { mouseX: e.clientX, mouseY: e.clientY, winX: windowData.x, winY: windowData.y }
  }

  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      if (!isDragging.current) return
      moveWindow(id, dragStart.current.winX + (e.clientX - dragStart.current.mouseX), dragStart.current.winY + (e.clientY - dragStart.current.mouseY))
    }
    const onUp = () => { isDragging.current = false }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp) }
  }, [])

  const handleResizeStart = (e: React.MouseEvent, direction: ResizeDirection) => {
    e.preventDefault()
    e.stopPropagation()

    const startX = e.clientX
    const startY = e.clientY
    const startW = windowData.width
    const startH = windowData.height
    const startLeft = windowData.x
    const startTop = windowData.y

    const maxW = window.innerWidth - 40
    const maxH = window.innerHeight - 64

    const onMouseMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY

      let newW = startW, newH = startH, newX = startLeft, newY = startTop

      if (direction.includes('e')) newW = Math.max(MIN_W, Math.min(maxW, startW + dx))
      if (direction.includes('s')) newH = Math.max(MIN_H, Math.min(maxH, startH + dy))
      if (direction.includes('w')) { newW = Math.max(MIN_W, startW - dx); newX = startLeft + (startW - newW) }
      if (direction.includes('n')) { newH = Math.max(MIN_H, startH - dy); newY = startTop + (startH - newH) }

      newW = Math.round(newW / 8) * 8
      newH = Math.round(newH / 8) * 8

      updateWindowSize(id, newW, newH)
      moveWindow(id, newX, newY)
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div
      onMouseDown={() => focusWindow(id)}
      style={{
        position: 'absolute',
        left: windowData.x, top: windowData.y,
        width: windowData.width, height: windowData.height,
        zIndex: windowData.zIndex,
        borderRadius: windowData.maximised ? '0' : '10px',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      {/* Resize handles — hidden when maximised */}
      {!windowData.maximised && DIRECTIONS.map(dir => (
        <ResizeHandle key={dir} direction={dir} onResizeStart={handleResizeStart} />
      ))}

      {/* Titlebar */}
      <div
        onMouseDown={handleTitleMouseDown}
        style={{
          position: 'relative', height: '38px', flexShrink: 0,
          backgroundColor: '#1A2744', borderBottom: '1px solid #2A3F5F',
          display: 'flex', alignItems: 'center',
          padding: '0 12px', userSelect: 'none', cursor: 'default',
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: '8px', zIndex: 1 }} onMouseDown={e => e.stopPropagation()}>
          <button
            onClick={() => closeWindow(id)}
            onMouseDown={e => e.stopPropagation()}
            style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F57', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
          />
          <button
            onClick={() => minimiseWindow(id)}
            onMouseDown={e => e.stopPropagation()}
            style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FEBC2E', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
          />
          <button
            onClick={() => maximiseWindow(id)}
            onMouseDown={e => e.stopPropagation()}
            style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28C840', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
          />
        </div>

        {/* Centered title */}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <span style={{ color: '#8899AA', fontSize: '12px', fontFamily: '"JetBrains Mono", monospace', fontWeight: 500 }}>
            {windowData.title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1, overflow: 'hidden',
        backgroundColor:
          id.startsWith('browser')    ? '#121929' :
          id.startsWith('terminal')   ? '#0A0F1E' :
          id.startsWith('settings')   ? '#0D1828' :
          id.startsWith('files')      ? '#0D1828' :
          id.startsWith('fileviewer') ? '#0D1828' :
          id.startsWith('music')      ? '#0A0F1E' :
          'white',
        display: 'flex',
      }}>
        {id.startsWith('terminal')    && <Terminal />}
        {id.startsWith('browser')     && <BrowserApp initialPage={windowData.initialPage} />}
        {id.startsWith('settings')    && <Settings />}
        {id.startsWith('files')       && <FileManager />}
        {id.startsWith('fileviewer')  && <FileViewer filename={windowData.initialPage ?? ''} />}
        {id.startsWith('music')       && <MusicPlayer />}
      </div>
    </div>
  )
}
