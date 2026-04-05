import { useEffect } from 'react'
import { useMobileDevice } from '../hooks/useMobileDevice'
import { useMobileStore } from './store/mobileStore'
import { MobileBootScreen } from './components/MobileBootScreen'
import { MobileLockScreen } from './components/MobileLockScreen'
import { MobileHomeScreen } from './components/MobileHomeScreen'

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
      // No global touchAction here — each screen manages its own.
      // MobileLockScreen sets touchAction: none for swipe detection.
      // MobileHomeScreen sets touchAction: pan-y on the scroll container.
      userSelect: 'none',
    }}>
      {phase === 'boot'                    && <MobileBootScreen />}
      {phase === 'lock'                    && <MobileLockScreen />}
      {(phase === 'home' || phase === 'drawer') && <MobileHomeScreen />}
      {(phase === 'app')                   && (
        // App shell placeholder — M6 will replace this
        <MobileHomeScreen />
      )}
    </div>
  )
}
