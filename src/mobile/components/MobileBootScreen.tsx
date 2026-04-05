import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMobileStore } from '../store/mobileStore'

export const MobileBootScreen = () => {
  const [localPhase, setLocalPhase] = useState(0)

  useEffect(() => {
    const delay = (ms: number) => new Promise(r => setTimeout(r, ms))
    const run = async () => {
      await delay(300)
      setLocalPhase(1); await delay(1000)
      setLocalPhase(2); await delay(1500)
      setLocalPhase(3); await delay(400)
      useMobileStore.getState().setPhase('lock')
    }
    run()
  }, [])

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0, left: 0,
        background: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
      animate={{ opacity: localPhase === 3 ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence>
        {localPhase >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              width: 80,
              height: 80,
              background: 'white',
              borderRadius: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            }}
          >
            <span style={{
              color: '#0A0F1E',
              fontSize: '2.25rem',
              fontWeight: 700,
              fontFamily: 'Inter, sans-serif',
            }}>
              D
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {localPhase >= 2 && (
        <div style={{
          position: 'absolute',
          bottom: 48,
          width: 120,
          height: 4,
          background: '#333333',
          borderRadius: 9999,
          overflow: 'hidden',
        }}>
          <motion.div
            style={{
              height: '100%',
              background: 'white',
              borderRadius: 9999,
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.4, ease: 'linear' }}
          />
        </div>
      )}
    </motion.div>
  )
}
