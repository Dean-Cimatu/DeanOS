import { useWindowStore } from "../store/windowStore"
import type { WindowState } from "../store/windowStore"
import { useRef, useEffect } from 'react'
import Terminal from './Terminal'
import BrowserApp from './apps/BrowserApp'

interface WindowProps {
  id: string
  windowData: WindowState
}

export default function Window({ id, windowData }: WindowProps) {
  const { closeWindow, focusWindow, moveWindow, minimiseWindow, maximiseWindow } = useWindowStore()

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
        backgroundColor: id.startsWith('browser') ? '#121929' : id === 'terminal' ? '#0A0F1E' : 'white',
        display: 'flex',
      }}>
        {id === 'terminal' && <Terminal />}
        {id.startsWith('browser') && <BrowserApp initialPage={windowData.initialPage} />}
      </div>
    </div>
  )
}
