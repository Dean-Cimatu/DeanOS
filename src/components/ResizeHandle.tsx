export type ResizeDirection = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw'

interface ResizeHandleProps {
  direction: ResizeDirection
  onResizeStart: (e: React.MouseEvent, direction: ResizeDirection) => void
}

const HANDLE_STYLES: Record<ResizeDirection, React.CSSProperties> = {
  n:  { top: 0, left: 8, right: 8, height: 8, cursor: 'ns-resize' },
  s:  { bottom: 0, left: 8, right: 8, height: 8, cursor: 'ns-resize' },
  e:  { right: 0, top: 8, bottom: 8, width: 8, cursor: 'ew-resize' },
  w:  { left: 0, top: 8, bottom: 8, width: 8, cursor: 'ew-resize' },
  ne: { top: 0, right: 0, width: 12, height: 12, cursor: 'ne-resize' },
  nw: { top: 0, left: 0, width: 12, height: 12, cursor: 'nw-resize' },
  se: { bottom: 0, right: 0, width: 12, height: 12, cursor: 'se-resize' },
  sw: { bottom: 0, left: 0, width: 12, height: 12, cursor: 'sw-resize' },
}

export default function ResizeHandle({ direction, onResizeStart }: ResizeHandleProps) {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 50,
        background: 'transparent',
        ...HANDLE_STYLES[direction],
      }}
      onMouseDown={(e) => onResizeStart(e, direction)}
    />
  )
}
