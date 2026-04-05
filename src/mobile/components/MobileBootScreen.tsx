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
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]"
      animate={{ opacity: localPhase === 3 ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence>
        {localPhase >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-20 h-20 bg-white rounded-[22px] flex items-center justify-center shadow-2xl"
          >
            <span className="text-[#0A0F1E] text-4xl font-bold font-['Inter']">D</span>
          </motion.div>
        )}
      </AnimatePresence>

      {localPhase >= 2 && (
        <div className="absolute bottom-12 w-[120px] h-1 bg-[#333333] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.4, ease: 'linear' }}
          />
        </div>
      )}
    </motion.div>
  )
}
