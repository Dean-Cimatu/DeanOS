import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useSystemStore } from '../store/systemStore'
import { playErrorPing, playStartupChime } from '../lib/sounds'

const PASSWORD = 'password'

function useClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export default function LockScreen() {
  const { unlock, logout, shutdown, restart } = useSystemStore()

  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [focused, setFocused] = useState(false)

  const now = useClock()
  const formControls = useAnimation()

  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  const dateStr = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })

  useEffect(() => {
    formControls.start({ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22, delay: 0.1 } })
  }, [])

  const handleUnlock = async () => {
    if (password === PASSWORD) {
      playStartupChime()
      await formControls.start({ opacity: 0, scale: 1.03, transition: { duration: 0.25 } })
      unlock()
    } else {
      playErrorPing()
      setAttempts(a => a + 1)
      setError(true)
      await formControls.start({ x: [-10, 10, -6, 6, -2, 2, 0], transition: { duration: 0.4 } })
      formControls.set({ x: 0 })
      setTimeout(() => setError(false), 3500)
    }
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: `
          radial-gradient(ellipse 140% 90% at 50% 110%, rgba(0,40,70,0.9) 0%, transparent 55%),
          radial-gradient(ellipse 80% 60% at 15% 40%, rgba(0,80,60,0.35) 0%, transparent 50%),
          radial-gradient(ellipse 60% 70% at 85% 25%, rgba(30,0,80,0.4) 0%, transparent 55%),
          linear-gradient(170deg, #050D1A 0%, #081420 40%, #0A1628 100%)
        `,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Ubuntu, sans-serif',
        overflow: 'hidden',
        userSelect: 'none',
        // Blur effect to show "something is behind" like a real lock screen
        backdropFilter: 'blur(0px)',
      }}
    >
      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)',
      }} />

      {/* Lock indicator top-right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          position: 'absolute', top: '16px', right: '20px',
          display: 'flex', alignItems: 'center', gap: '6px',
          color: 'rgba(255,255,255,0.25)', fontSize: '12px',
          fontFamily: '"JetBrains Mono", monospace',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        Locked
      </motion.div>

      {/* Clock — large, top section */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '80px', zIndex: 1 }}
      >
        <div style={{
          fontSize: '88px', fontWeight: 200, color: 'rgba(255,255,255,0.88)',
          lineHeight: 1, letterSpacing: '-0.03em',
          textShadow: '0 2px 40px rgba(0,0,0,0.4)',
        }}>
          {timeStr}
        </div>
        <div style={{
          fontSize: '18px', color: 'rgba(255,255,255,0.4)',
          marginTop: '10px', fontWeight: 300,
        }}>
          {dateStr}
        </div>
      </motion.div>

      {/* Unlock form */}
      <motion.div
        animate={formControls}
        initial={{ opacity: 0, y: 20 }}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          marginTop: '48px', marginBottom: 'auto',
          zIndex: 1, width: '300px',
        }}
      >
        {/* Avatar */}
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg, #0EA5E9, #7C3AED)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px', fontWeight: 700, color: 'white',
          fontFamily: '"JetBrains Mono", monospace',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.1)',
          marginBottom: '12px',
        }}>DC</div>

        <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', marginBottom: '20px' }}>
          Dean Cimatu
        </div>

        {/* Password row */}
        <div style={{
          width: '100%',
          display: 'flex', alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.09)',
          border: `1px solid ${error ? 'rgba(255,80,80,0.7)' : focused ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}`,
          borderRadius: '8px',
          backdropFilter: 'blur(8px)',
          transition: 'border-color 0.15s',
          marginBottom: '8px',
        }}>
          <span style={{ padding: '0 12px', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </span>
          <input
            type="password"
            placeholder="Password"
            autoFocus
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleUnlock() }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              padding: '12px 0', color: 'rgba(255,255,255,0.9)',
              fontSize: '14px', fontFamily: 'Ubuntu, sans-serif', caretColor: '#00D4FF',
            }}
          />
          <button
            onClick={handleUnlock}
            style={{
              padding: '0 14px', background: 'none', border: 'none', cursor: 'pointer',
              color: password.length > 0 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', flexShrink: 0, transition: 'color 0.15s',
            }}
            onMouseEnter={e => { if (password.length > 0) e.currentTarget.style.color = '#00D4FF' }}
            onMouseLeave={e => { e.currentTarget.style.color = password.length > 0 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.18)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>

        {/* Error / hint */}
        <div style={{ minHeight: '20px', textAlign: 'center', width: '100%' }}>
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span style={{ color: 'rgba(255,100,100,0.9)', fontSize: '12px' }}>Incorrect password</span>
              {attempts >= 1 && (
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>
                  {' — '}hint: <span style={{ color: '#00D4FF', fontFamily: '"JetBrains Mono", monospace' }}>password</span>
                </span>
              )}
            </motion.div>
          )}
        </div>

        {/* Switch user link */}
        <button
          onClick={() => logout()}
          style={{
            marginTop: '16px', background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.3)', fontSize: '12px',
            cursor: 'pointer', fontFamily: 'Ubuntu, sans-serif',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
        >
          Switch user
        </button>
      </motion.div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '48px', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        padding: '0 12px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        backgroundColor: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(12px)',
        gap: '4px',
      }}>
        {[
          { label: 'Suspend', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>, danger: false, action: () => {} },
          { label: 'Restart',  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg>, danger: false, action: restart },
          { label: 'Shut Down', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>, danger: true, action: shutdown },
        ].map(({ label, icon, danger, action }) => (
          <BottomBtn key={label} label={label} danger={danger} onClick={action}>{icon}</BottomBtn>
        ))}
      </div>
    </div>
  )
}

function BottomBtn({ children, label, danger = false, onClick }: {
  children: React.ReactNode; label: string; danger?: boolean; onClick: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      title={label}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '6px 12px', borderRadius: '6px', border: 'none',
        background: hov ? 'rgba(255,255,255,0.12)' : 'transparent',
        color: hov && danger ? '#FF6B6B' : hov ? '#E8F4F8' : 'rgba(255,255,255,0.4)',
        fontSize: '12px', cursor: 'pointer', fontFamily: 'Ubuntu, sans-serif',
        transition: 'background 0.12s, color 0.12s',
      }}
    >
      {children}{label}
    </button>
  )
}
