import { useEffect, useRef } from 'react'
import { useMobileDevice } from '../hooks/useMobileDevice'
import { useMobileStore } from './store/mobileStore'
import { MobileBootScreen } from './components/MobileBootScreen'
import { MobileLockScreen } from './components/MobileLockScreen'
import { MobileHomeScreen } from './components/MobileHomeScreen'
import { MobileAppShell } from './components/MobileAppShell'

export const MobileOS = () => {
  const { isTouch } = useMobileDevice()
  const phase = useMobileStore(s => s.phase)
  const edgeStart = useRef<number | null>(null)

  useEffect(() => {
    useMobileStore.getState().setIsTouch(isTouch)
  }, [isTouch])

  const handleBack = () => {
    const { phase: p } = useMobileStore.getState()
    if (p === 'app') useMobileStore.getState().closeApp()
    else if (p === 'drawer') useMobileStore.getState().closeDrawer()
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.clientX < 20) edgeStart.current = e.clientX
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (edgeStart.current !== null && e.clientX - edgeStart.current > 60) {
      handleBack()
    }
    edgeStart.current = null
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0, left: 0,
        background: '#0A0F1E',
        overflow: 'hidden',
        userSelect: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {phase === 'boot'                          && <MobileBootScreen />}
      {phase === 'lock'                          && <MobileLockScreen />}
      {(phase === 'home' || phase === 'drawer')  && <MobileHomeScreen />}
      {phase === 'app'                           && <MobileAppShell />}
    </div>
  )
}
