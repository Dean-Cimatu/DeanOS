import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useSystemStore } from '../store/systemStore'
import { unlockAudio, playErrorPing, playStartupChime } from '../lib/sounds'
import { type ReactNode } from 'react'

const PASSWORD = 'password'

function useClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

// ── Icons ──────────────────────────────────────────────────────────────────────

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

function PowerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
      <line x1="12" y1="2" x2="12" y2="12"/>
    </svg>
  )
}

function KeyboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12"/>
    </svg>
  )
}

function A11yIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="2"/>
      <path d="M12 22V13M8 13l-2 4M16 13l2 4M8 10l4 3 4-3"/>
    </svg>
  )
}

// ── Bottom bar button ──────────────────────────────────────────────────────────

function BarBtn({ children, title, danger = false, onClick }: {
  children: ReactNode
  title: string
  danger?: boolean
  onClick?: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '6px 12px', borderRadius: '6px', border: 'none',
        background: hov ? 'rgba(255,255,255,0.12)' : 'transparent',
        color: hov && danger ? '#FF6B6B' : hov ? '#E8F4F8' : 'rgba(255,255,255,0.5)',
        fontSize: '12px', cursor: 'pointer', fontFamily: 'Ubuntu, sans-serif',
        transition: 'background 0.12s, color 0.12s',
      }}
    >
      {children}
    </button>
  )
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function Login() {
  const { setLoggedIn, shutdown, restart } = useSystemStore()

  const [password, setPassword] = useState('')
  const [capsLock, setCapsLock] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [error, setError] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)
  const [focused, setFocused] = useState(false)
  const [autoTyping, setAutoTyping] = useState(false)
  const autoTypingRef = useRef(false)

  const now = useClock()
  const formControls = useAnimation()

  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  const dateStr = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })

  useEffect(() => {
    formControls.start({ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 240, damping: 22, delay: 0.2 } })
  }, [])

  const startAutoType = () => {
    autoTypingRef.current = true
    setAutoTyping(true)
    setError(false)
    setPassword('')

    let i = 0
    const typeNext = () => {
      if (i < PASSWORD.length) {
        setPassword(PASSWORD.slice(0, i + 1))
        i++
        setTimeout(typeNext, 120)
      } else {
        // Small pause after last char, then submit
        setTimeout(async () => {
          setLoggingIn(true)
          playStartupChime()
          await formControls.start({ opacity: 0, scale: 1.03, transition: { duration: 0.3 } })
          setLoggedIn(true)
        }, 400)
      }
    }

    // Brief pause before starting to type
    setTimeout(typeNext, 600)
  }

  const handleLogin = async () => {
    if (loggingIn || autoTypingRef.current) return
    if (password === PASSWORD) {
      setLoggingIn(true)
      playStartupChime()
      await formControls.start({ opacity: 0, scale: 1.03, transition: { duration: 0.3 } })
      setLoggedIn(true)
    } else {
      playErrorPing()
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setError(true)
      await formControls.start({ x: [-10, 10, -6, 6, -2, 2, 0], transition: { duration: 0.4 } })
      formControls.set({ x: 0 })
      if (newAttempts >= 3) {
        setTimeout(() => startAutoType(), 800)
      } else {
        setTimeout(() => setError(false), 3500)
      }
    }
  }

  return (
    <div
      onMouseDown={unlockAudio}
      onKeyDown={unlockAudio}
      style={{
        position: 'fixed', inset: 0,
        // Mint-like wallpaper: deep, atmospheric, slightly colourful
        background: [
          'radial-gradient(ellipse 130% 70% at 50% 110%, rgba(12,50,105,0.55) 0%, transparent 55%)',
          'radial-gradient(ellipse 90% 60% at 8% 30%, rgba(50,15,110,0.2) 0%, transparent 50%)',
          'radial-gradient(ellipse 70% 60% at 92% 18%, rgba(60,12,120,0.15) 0%, transparent 55%)',
          'linear-gradient(170deg, #06080e 0%, #080e1a 42%, #07091a 100%)',
        ].join(', '),
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Ubuntu, sans-serif',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* ── Faint vignette ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
      }} />

      {/* ── Top bar: clock (left) ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '52px', zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 24px',
        }}
      >
        {/* Clock centred in bar */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.75)',
            fontFamily: 'Ubuntu, sans-serif', letterSpacing: '0.04em',
          }}>
            {timeStr} &nbsp;·&nbsp; {dateStr}
          </div>
        </div>
      </motion.div>

      {/* ── Centre: floating login (no card border) ── */}
      <motion.div
        animate={formControls}
        initial={{ opacity: 0, y: 24 }}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          flex: 1, justifyContent: 'center',
          zIndex: 1, width: '320px',
        }}
      >
        {/* Avatar */}
        <div style={{
          width: 96, height: 96, borderRadius: '50%',
          background: 'linear-gradient(145deg, #1b5c9e 0%, #2d1878 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '30px', fontWeight: 700, color: 'white',
          fontFamily: '"JetBrains Mono", monospace',
          boxShadow: '0 4px 32px rgba(0,0,0,0.5), 0 0 0 3px rgba(255,255,255,0.1)',
          marginBottom: '18px',
        }}>
          DC
        </div>

        {/* Name */}
        <div style={{
          fontSize: '20px', fontWeight: 400, color: 'rgba(255,255,255,0.92)',
          letterSpacing: '0.01em', marginBottom: '4px',
        }}>
          Dean Cimatu
        </div>
        <div style={{
          fontSize: '13px', color: 'rgba(255,255,255,0.35)',
          fontFamily: '"JetBrains Mono", monospace', marginBottom: '28px',
        }}>
          dean
        </div>

        {/* Password row — lock icon | input | arrow button */}
        <div style={{
          width: '100%', position: 'relative',
          display: 'flex', alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.1)',
          border: `1px solid ${error ? 'rgba(255,80,80,0.7)' : focused ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.18)'}`,
          borderRadius: '8px',
          backdropFilter: 'blur(12px)',
          transition: 'border-color 0.15s',
          marginBottom: '10px',
        }}>
          {/* Lock icon */}
          <span style={{
            padding: '0 12px', color: 'rgba(255,255,255,0.35)',
            display: 'flex', alignItems: 'center', flexShrink: 0,
          }}>
            <LockIcon />
          </span>

          <input
            type="password"
            placeholder="Password"
            autoFocus
            readOnly={autoTyping}
            value={password}
            onChange={e => { if (!autoTyping) setPassword(e.target.value) }}
            onKeyDown={e => {
              if (autoTyping) return
              setCapsLock(e.getModifierState('CapsLock'))
              if (e.key === 'Enter') handleLogin()
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              padding: '13px 0',
              color: autoTyping ? 'rgba(0,212,255,0.85)' : 'rgba(255,255,255,0.92)',
              fontSize: '15px',
              fontFamily: 'Ubuntu, sans-serif',
              caretColor: '#00D4FF',
              cursor: autoTyping ? 'default' : 'text',
            }}
          />

          {/* Submit arrow */}
          <button
            onClick={handleLogin}
            style={{
              padding: '0 14px', background: 'none', border: 'none', cursor: 'pointer',
              color: password.length > 0 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', flexShrink: 0,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => { if (password.length > 0) e.currentTarget.style.color = '#00D4FF' }}
            onMouseLeave={e => { e.currentTarget.style.color = password.length > 0 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)' }}
          >
            <ArrowIcon />
          </button>
        </div>

        {/* Caps lock + error */}
        <div style={{ width: '100%', minHeight: '20px', textAlign: 'center' }}>
          {!autoTyping && capsLock && (
            <div style={{ color: '#FFD700', fontSize: '12px' }}>
              Caps Lock is on
            </div>
          )}
          {autoTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ color: 'rgba(0,212,255,0.7)', fontSize: '12px', fontFamily: '"JetBrains Mono", monospace' }}>
                entering password automatically…
              </div>
            </motion.div>
          )}
          {!autoTyping && error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ color: 'rgba(255,100,100,0.9)', fontSize: '12px' }}>
                Incorrect password
                {attempts >= 1 && (
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {' — '}hint: <span style={{ color: '#00D4FF', fontFamily: '"JetBrains Mono", monospace' }}>password</span>
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* ── Bottom action bar (Mint Slick Greeter style) ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.3 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '48px', zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 12px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          backgroundColor: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Left: session / keyboard / accessibility */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <BarBtn title="Session">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            DeanOS
          </BarBtn>
          <BarBtn title="Keyboard layout">
            <KeyboardIcon />
            EN
          </BarBtn>
          <BarBtn title="Accessibility">
            <A11yIcon />
          </BarBtn>
        </div>

        {/* Centre: hostname */}
        <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '11px', fontFamily: '"JetBrains Mono", monospace' }}>
          deanos-pc
        </span>

        {/* Right: power buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <BarBtn title="Suspend" onClick={() => {}}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            Suspend
          </BarBtn>
          <BarBtn title="Restart" onClick={restart}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/>
            </svg>
            Restart
          </BarBtn>
          <BarBtn title="Shut Down" danger onClick={shutdown}>
            <PowerIcon />
            Shut Down
          </BarBtn>
        </div>
      </motion.div>
    </div>
  )
}
