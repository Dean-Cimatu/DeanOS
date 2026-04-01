import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useSystemStore } from '../store/systemStore'
import { unlockAudio, playErrorPing, playStartupChime } from '../lib/sounds'

const PASSWORD = 'password'

export default function Login() {
  const setLoggedIn = useSystemStore(s => s.setLoggedIn)

  const [password, setPassword] = useState('')
  const [capsLock, setCapsLock] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [error, setError] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)

  const cardControls = useAnimation()

  // Entry animation
  useEffect(() => {
    cardControls.start({ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 280, damping: 24, delay: 0.2 } })
  }, [])

  const handleLogin = async () => {
    if (loggingIn) return
    if (password === PASSWORD) {
      setLoggingIn(true)
      playStartupChime()
      await cardControls.start({ opacity: 0, scale: 1.05, transition: { duration: 0.3 } })
      setLoggedIn(true)
    } else {
      playErrorPing()
      setAttempts(a => a + 1)
      setError(true)
      await cardControls.start({
        x: [-8, 8, -4, 4, 0],
        transition: { duration: 0.4 },
      })
      cardControls.set({ x: 0 })
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <div
      onMouseDown={unlockAudio}
      onKeyDown={unlockAudio}
      style={{
        position: 'fixed', inset: 0,
        // Static deep-space background — layered radial gradients
        background: `
          radial-gradient(ellipse 80% 60% at 15% 50%, rgba(0,50,80,0.55) 0%, transparent 70%),
          radial-gradient(ellipse 60% 80% at 85% 30%, rgba(10,30,70,0.5) 0%, transparent 65%),
          radial-gradient(ellipse 50% 50% at 50% 90%, rgba(0,20,50,0.4) 0%, transparent 60%),
          #040D1A
        `,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Login card */}
      <motion.div
        animate={cardControls}
        initial={{ y: 24, opacity: 0 }}
        style={{
          position: 'relative', zIndex: 10,
          width: '380px',
          background: 'rgba(30, 45, 69, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid #2A3F5F',
          borderRadius: '16px',
          padding: '48px',
        }}
      >
        {/* Avatar */}
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          backgroundColor: '#1E2D45',
          border: '2px solid #00D4FF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto',
          color: '#00D4FF', fontSize: '24px', fontWeight: 'bold',
          fontFamily: '"JetBrains Mono", monospace',
        }}>
          DC
        </div>

        {/* Username */}
        <p style={{
          color: '#8899AA', fontSize: '13px',
          fontFamily: '"JetBrains Mono", monospace',
          textAlign: 'center', marginTop: '12px',
        }}>
          dean
        </p>

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          autoFocus
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => {
            setCapsLock(e.getModifierState('CapsLock'))
            if (e.key === 'Enter') handleLogin()
          }}
          style={{
            marginTop: '24px',
            width: '100%',
            backgroundColor: '#0A0F1E',
            border: `1px solid ${error ? '#FF4444' : '#2A3F5F'}`,
            borderRadius: '8px',
            padding: '12px 16px',
            color: '#E8F4F8',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => { if (!error) e.target.style.borderColor = '#00D4FF' }}
          onBlur={e => { if (!error) e.target.style.borderColor = '#2A3F5F' }}
        />

        {/* Caps Lock warning */}
        {capsLock && (
          <p style={{
            color: '#FFD700', fontSize: '11px', marginTop: '6px',
            fontFamily: '"JetBrains Mono", monospace',
          }}>
            ⚠ Caps Lock is on
          </p>
        )}

        {/* Error message + hint */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '8px' }}
          >
            <p style={{
              color: '#FF4444', fontSize: '11px', textAlign: 'center',
              fontFamily: '"JetBrains Mono", monospace',
            }}>
              Incorrect password
            </p>
            {attempts >= 1 && (
              <p style={{
                color: '#8899AA', fontSize: '11px', textAlign: 'center',
                fontFamily: '"JetBrains Mono", monospace',
                marginTop: '4px',
              }}>
                Hint: <span style={{ color: '#00D4FF' }}>password</span>
              </p>
            )}
          </motion.div>
        )}

        {/* Login button */}
        <motion.button
          onClick={handleLogin}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            marginTop: '16px',
            width: '100%',
            backgroundColor: '#00D4FF',
            color: '#000',
            fontWeight: 600,
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: '"JetBrains Mono", monospace',
          }}
        >
          Login
        </motion.button>

        {/* Footer */}
        <p style={{
          color: '#556677', fontSize: '10px',
          fontFamily: '"JetBrains Mono", monospace',
          textAlign: 'center', marginTop: '24px',
        }}>
          DeanOS v2.1.0 — © 2026 Dean Cimatu
        </p>
      </motion.div>
    </div>
  )
}
