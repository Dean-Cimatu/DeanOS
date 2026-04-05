import { useEffect } from 'react'
import { useMobileDevice } from '../hooks/useMobileDevice'
import { useMobileStore } from './store/mobileStore'
import { MobileBootScreen } from './components/MobileBootScreen'
import { MobileLockScreen } from './components/MobileLockScreen'

export const MobileOS = () => {
  const { isTouch } = useMobileDevice()
  const phase = useMobileStore(s => s.phase)

  useEffect(() => {
    useMobileStore.getState().setIsTouch(isTouch)
  }, [isTouch])

  return (
    <div
      className="fixed inset-0 bg-[#0A0F1E] overflow-hidden"
      style={{ touchAction: 'none', userSelect: 'none' }}
    >
      {phase === 'boot' && <MobileBootScreen />}
      {phase === 'lock' && <MobileLockScreen />}
      {phase !== 'boot' && phase !== 'lock' && (
        <div className="flex items-center justify-center h-full">
          <span className="text-[#00D4FF] font-mono text-sm">DeanOS Mobile</span>
        </div>
      )}
    </div>
  )
}
