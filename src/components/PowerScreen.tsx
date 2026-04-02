import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSystemStore } from '../store/systemStore'
import { useWindowStore } from '../store/windowStore'

export default function PowerScreen() {
  const systemAction = useSystemStore(s => s.systemAction)
  const { setLoggedIn, setBootComplete, setBootPhase, setBootProgress, locked } = useSystemStore()
  const windows = useWindowStore(s => s.windows)
  const closeWindow = useWindowStore(s => s.closeWindow)

  const isRestart = systemAction === 'restart'
  const [phase, setPhase] = useState<'message' | 'dark'>('message')

  useEffect(() => {
    // Close all open windows
    Object.keys(windows).forEach(id => closeWindow(id))

    if (isRestart) {
      // Show message → go dark → replay boot
      const t1 = setTimeout(() => setPhase('dark'), 1800)
      const t2 = setTimeout(() => {
        // Reset everything and replay boot sequence
        useSystemStore.setState({
          systemAction: null,
          loggedIn: false,
          locked: false,
          bootComplete: false,
          bootPhase: 0,
          bootProgress: 0,
          notifications: [],
          unreadCount: 0,
        })
      }, 2400)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    } else {
      // Shutdown: show message then go fully dark
      const t1 = setTimeout(() => setPhase('dark'), 2000)
      return () => clearTimeout(t1)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'dark' ? 0 : 1 }}
      transition={{ duration: isRestart ? 0.5 : 1.2, ease: 'easeInOut' }}
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: '#000',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Ubuntu, sans-serif',
        zIndex: 99999,
      }}
      // After fade-out for shutdown, show the "off" screen permanently
      onAnimationComplete={() => {
        if (!isRestart && phase === 'dark') {
          // Render the off-state screen (handled by App via systemAction still set)
        }
      }}
    >
      {phase === 'message' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
        >
          {isRestart ? (
            <>
              {/* Spinning restart icon */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10"/>
                  <path d="M3.51 15a9 9 0 1 0 .49-4.95"/>
                </svg>
              </motion.div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', fontWeight: 300, letterSpacing: '0.04em' }}>
                Restarting…
              </div>
              <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', fontFamily: '"JetBrains Mono", monospace' }}>
                DeanOS v2.1.0
              </div>
            </>
          ) : (
            <>
              {/* Power icon */}
              <div style={{ color: 'rgba(255,255,255,0.5)' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
                  <line x1="12" y1="2" x2="12" y2="12"/>
                </svg>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', fontWeight: 300, letterSpacing: '0.04em' }}>
                Shutting down…
              </div>
              <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px', fontFamily: '"JetBrains Mono", monospace' }}>
                Please wait
              </div>
            </>
          )}
        </motion.div>
      )}

      {/* After shutdown fully dark — show "powered off" message with power-on button */}
      {!isRestart && phase === 'dark' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
        >
          <div style={{ color: 'rgba(255,255,255,0.15)', fontSize: '13px', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.08em' }}>
            SYSTEM POWERED OFF
          </div>
          <button
            onClick={() => {
              useSystemStore.setState({
                systemAction: null,
                loggedIn: false,
                locked: false,
                bootComplete: false,
                bootPhase: 0,
                bootProgress: 0,
                notifications: [],
                unreadCount: 0,
              })
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px', borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'transparent', color: 'rgba(255,255,255,0.4)',
              fontSize: '13px', cursor: 'pointer', fontFamily: 'Ubuntu, sans-serif',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/>
            </svg>
            Power on
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
