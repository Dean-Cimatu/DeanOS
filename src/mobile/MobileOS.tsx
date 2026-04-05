import { useEffect } from 'react'
import { useMobileDevice } from '../hooks/useMobileDevice'
import { useMobileStore } from './store/mobileStore'

export const MobileOS = () => {
  const { isTouch } = useMobileDevice()

  useEffect(() => {
    useMobileStore.getState().setIsTouch(isTouch)
  }, [isTouch])

  return (
    <div
      className="fixed inset-0 bg-[#0A0F1E] flex items-center justify-center overflow-hidden"
      style={{ touchAction: 'none', userSelect: 'none' }}
    >
      <span className="text-[#00D4FF] font-mono text-sm">DeanOS Mobile</span>
    </div>
  )
}
