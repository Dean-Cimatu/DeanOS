import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSystemStore } from '../../store/systemStore'

const COLOURS = ['#00D4FF', '#00FF88', '#FFD700', '#FF4444', '#9B59B6', '#FF69B4', '#FF8C00']
const LOGO_W = 164
const LOGO_H = 64

export default function Screensaver() {
  const dismissScreensaver = useSystemStore(s => s.dismissScreensaver)

  const [renderPos, setRenderPos] = useState({ x: 120, y: 100 })
  const [colour, setColour] = useState(COLOURS[0])
  const [hintVisible, setHintVisible] = useState(true)

  const pos = useRef({ x: 120, y: 100 })
  const vel = useRef({ x: 1.8, y: 1.4 })
  const colourIndex = useRef(0)
  const rafRef = useRef(0)

  useEffect(() => {
    const animate = () => {
      pos.current.x += vel.current.x
      pos.current.y += vel.current.y

      let bounced = false
      if (pos.current.x <= 0 || pos.current.x + LOGO_W >= window.innerWidth) {
        vel.current.x *= -1
        bounced = true
      }
      if (pos.current.y <= 0 || pos.current.y + LOGO_H >= window.innerHeight) {
        vel.current.y *= -1
        bounced = true
      }

      if (bounced) {
        colourIndex.current = (colourIndex.current + 1) % COLOURS.length
        setColour(COLOURS[colourIndex.current])
      }

      pos.current.x = Math.max(0, Math.min(window.innerWidth - LOGO_W, pos.current.x))
      pos.current.y = Math.max(0, Math.min(window.innerHeight - LOGO_H, pos.current.y))

      setRenderPos({ x: pos.current.x, y: pos.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    const hintTimer = setTimeout(() => setHintVisible(false), 3000)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(hintTimer)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={dismissScreensaver}
      style={{
        position: 'fixed', inset: 0, zIndex: 9500,
        backgroundColor: '#000',
        cursor: 'pointer',
      }}
    >
      {/* Bouncing DVD-style logo */}
      <div
        style={{
          position: 'absolute',
          left: renderPos.x,
          top: renderPos.y,
          color: colour,
          border: `2px solid ${colour}`,
          borderRadius: '6px',
          padding: '8px 16px',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          fontSize: '22px',
          fontWeight: 700,
          fontFamily: '"JetBrains Mono", monospace',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
          color: colour,
        }}>
          Dean OS
        </div>
        <div style={{
          width: 40,
          height: 6,
          backgroundColor: colour,
          borderRadius: '3px',
          marginTop: '6px',
        }} />
      </div>

      {/* Dismiss hint — fades out after 3s */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#333333',
        fontSize: '12px',
        fontFamily: '"JetBrains Mono", monospace',
        opacity: hintVisible ? 1 : 0,
        transition: 'opacity 0.8s ease',
        pointerEvents: 'none',
      }}>
        Click anywhere to unlock
      </div>
    </motion.div>
  )
}
