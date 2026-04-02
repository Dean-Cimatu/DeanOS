import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSystemStore } from '../store/systemStore'
import { useWindowStore } from '../store/windowStore'

const boot = () => useSystemStore.setState({
  systemAction: null, loggedIn: false, locked: false,
  bootComplete: false, bootPhase: 0, bootProgress: 0,
  notifications: [], unreadCount: 0,
})

export default function PowerScreen() {
  const systemAction = useSystemStore(s => s.systemAction)
  const windows = useWindowStore(s => s.windows)
  const closeWindow = useWindowStore(s => s.closeWindow)

  const isRestart = systemAction === 'restart'
  const [phase, setPhase] = useState<'message' | 'dark'>('message')

  useEffect(() => {
    Object.keys(windows).forEach(id => closeWindow(id))

    if (isRestart) {
      const t1 = setTimeout(() => setPhase('dark'), 1800)
      const t2 = setTimeout(boot, 2400)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    } else {
      const t1 = setTimeout(() => setPhase('dark'), 2000)
      return () => clearTimeout(t1)
    }
  }, [])

  return (
    // Outer wrapper stays black always — never fades
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Ubuntu, sans-serif', zIndex: 99999,
    }}>
      {/* "Shutting down / Restarting" message — fades out */}
      {phase === 'message' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
        >
          {isRestart ? (
            <>
              <motion.div
                animate={{ rotate: -360 }}
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

      {/* Powered-off state — pulsing power button on black */}
      {!isRestart && phase === 'dark' && (
        <motion.button
          onClick={boot}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.18, 0.32, 0.18],
          }}
          transition={{
            opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
          }}
          whileHover={{ opacity: 0.7, scale: 1.06 }}
          style={{
            width: 72, height: 72, borderRadius: '50%',
            border: '1.5px solid rgba(255,255,255,0.35)',
            background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            outline: 'none',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.9)" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
            <line x1="12" y1="2" x2="12" y2="12"/>
          </svg>
        </motion.button>
      )}
    </div>
  )
}
