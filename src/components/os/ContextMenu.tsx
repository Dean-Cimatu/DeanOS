import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export interface ContextMenuItem {
  label?: string
  icon?: string
  onClick?: () => void
  danger?: boolean
  divider?: boolean
}

interface ContextMenuProps {
  items: ContextMenuItem[]
  position: { x: number; y: number }
  onClose: () => void
}

const MENU_W = 192

function clampPosition(x: number, y: number, itemCount: number, dividerCount: number) {
  const estimatedH = itemCount * 36 + dividerCount * 9 + 8
  return {
    x: x + MENU_W > window.innerWidth  ? x - MENU_W : x,
    y: y + estimatedH > window.innerHeight ? y - estimatedH : y,
  }
}

export function ContextMenu({ items, position, onClose }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [onClose])

  const realItems  = items.filter(i => !i.divider).length
  const dividers   = items.filter(i =>  i.divider).length
  const { x, y }  = clampPosition(position.x, position.y, realItems, dividers)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
      style={{
        position: 'fixed', left: x, top: y, zIndex: 7000, width: MENU_W,
        backgroundColor: '#1E2D45', border: '1px solid #2A3F5F', borderRadius: '8px',
        padding: '4px 0', boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
        transformOrigin: 'top left', userSelect: 'none',
      }}
    >
      {items.map((item, i) =>
        item.divider ? (
          <div key={i} style={{ borderTop: '1px solid #2A3F5F', margin: '4px 0' }} />
        ) : (
          <div
            key={i}
            onClick={() => { item.onClick?.(); onClose() }}
            style={{
              padding: '7px 12px', fontSize: '13px',
              color: item.danger ? '#FF4444' : '#E8F4F8',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              fontFamily: 'Ubuntu, sans-serif', transition: 'background-color 0.08s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = item.danger ? '#3A1A1A' : '#243355'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            {item.icon && (
              <span style={{ fontSize: '13px', width: '16px', textAlign: 'center', flexShrink: 0 }}>
                {item.icon}
              </span>
            )}
            {item.label}
          </div>
        )
      )}
    </motion.div>
  )
}
