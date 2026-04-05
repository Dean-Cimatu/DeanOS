import { useEffect } from 'react'
import { useMobileDevice } from '../hooks/useMobileDevice'
import { useMobileStore } from './store/mobileStore'
import { MobileBootScreen } from './components/MobileBootScreen'
import { MobileLockScreen } from './components/MobileLockScreen'
import { MobileStatusBar } from './components/MobileStatusBar'

export const MobileOS = () => {
  const { isTouch } = useMobileDevice()
  const phase = useMobileStore(s => s.phase)

  useEffect(() => {
    useMobileStore.getState().setIsTouch(isTouch)
  }, [isTouch])

  return (
    <div style={{
      position: 'fixed',
      top: 0, right: 0, bottom: 0, left: 0,
      background: '#0A0F1E',
      overflow: 'hidden',
      touchAction: 'none',
      userSelect: 'none',
    }}>
      {phase === 'boot' && <MobileBootScreen />}
      {phase === 'lock' && <MobileLockScreen />}
      {phase !== 'boot' && phase !== 'lock' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <MobileStatusBar />
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#00D4FF', fontFamily: '"JetBrains Mono", monospace', fontSize: '14px' }}>
              DeanOS Mobile
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
