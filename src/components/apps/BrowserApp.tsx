import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PageRouter } from './browser/PageRouter'

const VALID_PATHS = new Set(['/', '/about', '/projects', '/cv', '/contact'])

export default function BrowserApp({ initialPage = '/' }: { initialPage?: string }) {
  const [history, setHistory] = useState<string[]>([initialPage])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [addressInput, setAddressInput] = useState('deanos://')
  const direction = useRef<'forward' | 'back'>('forward')

  const currentPage = history[historyIndex]
  const canGoBack = historyIndex > 0
  const canGoForward = historyIndex < history.length - 1

  useEffect(() => {
    setAddressInput(`deanos:/${currentPage}`)
  }, [currentPage])

  const navigate = (path: string) => {
    const target = VALID_PATHS.has(path) ? path : '/404'
    direction.current = 'forward'
    const newHistory = history.slice(0, historyIndex + 1)
    setHistory([...newHistory, target])
    setHistoryIndex(newHistory.length)
  }

  const goBack = () => {
    if (canGoBack) {
      direction.current = 'back'
      setHistoryIndex((i) => i - 1)
    }
  }

  const goForward = () => {
    if (canGoForward) {
      direction.current = 'forward'
      setHistoryIndex((i) => i + 1)
    }
  }

  const goHome = () => navigate('/')

  const refresh = () => setHistory((h) => [...h])

  const handleAddressSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    const raw = addressInput
      .replace(/^deanos:\/\//, '/')
      .replace(/^deanos:\//, '/')
    const path = raw.startsWith('/') ? raw : `/${raw}`
    navigate(path)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '44px',
          backgroundColor: '#1E2D45',
          borderBottom: '1px solid #2A3F5F',
          gap: '4px',
          padding: '0 8px',
          flexShrink: 0,
        }}
      >
        <NavButton onClick={goBack} disabled={!canGoBack} title="Back">←</NavButton>
        <NavButton onClick={goForward} disabled={!canGoForward} title="Forward">→</NavButton>
        <NavButton onClick={refresh} disabled={false} title="Refresh">↻</NavButton>
        <NavButton onClick={goHome} disabled={false} title="Home">⌂</NavButton>

        <input
          type="text"
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
          onKeyDown={handleAddressSubmit}
          onFocus={(e) => e.target.select()}
          spellCheck={false}
          style={{
            flex: 1,
            height: '32px',
            backgroundColor: '#0A0F1E',
            color: '#E0E8F0',
            border: '1px solid #2A3F5F',
            borderRadius: '6px',
            padding: '0 10px',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '13px',
            outline: 'none',
            marginLeft: '4px',
          }}
          onFocusCapture={(e) => {
            ;(e.target as HTMLInputElement).style.borderColor = '#00D4FF'
            ;(e.target as HTMLInputElement).style.boxShadow = '0 0 0 1px #00D4FF'
          }}
          onBlur={(e) => {
            ;(e.target as HTMLInputElement).style.borderColor = '#2A3F5F'
            ;(e.target as HTMLInputElement).style.boxShadow = 'none'
          }}
        />
      </div>

      {/* Content area */}
      <div style={{ flex: 1, overflow: 'hidden', backgroundColor: '#121929', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: direction.current === 'back' ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction.current === 'back' ? 16 : -16 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ height: '100%', width: '100%', overflowY: 'auto' }}
          >
            <PageRouter currentPage={currentPage} onNavigate={navigate} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

interface NavButtonProps {
  onClick: () => void
  disabled: boolean
  title: string
  children: React.ReactNode
}

function NavButton({ onClick, disabled, title, children }: NavButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleMouseDown = () => {
    if (!disabled && ref.current) ref.current.style.transform = 'scale(0.92)'
  }
  const handleMouseUp = () => {
    if (ref.current) ref.current.style.transform = 'scale(1)'
  }
  const handleMouseEnter = () => {
    if (!disabled && ref.current) ref.current.style.backgroundColor = '#2A3F5F'
  }
  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.backgroundColor = 'transparent'
      ref.current.style.transform = 'scale(1)'
    }
  }

  return (
    <button
      ref={ref}
      onClick={disabled ? undefined : onClick}
      title={title}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        border: 'none',
        backgroundColor: 'transparent',
        color: disabled ? '#4A5568' : '#00D4FF',
        cursor: disabled ? 'default' : 'pointer',
        fontSize: '16px',
        flexShrink: 0,
        transition: 'background-color 0.1s, transform 0.08s',
      }}
    >
      {children}
    </button>
  )
}
