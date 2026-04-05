import { useSystemStore } from '../../store/systemStore'
import { useMobileStore } from '../store/mobileStore'

const SignalIcon = () => (
  <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
    <rect x="0"  y="10" width="3" height="4"  rx="0.5" fill="white" />
    <rect x="5"  y="7"  width="3" height="7"  rx="0.5" fill="white" />
    <rect x="10" y="4"  width="3" height="10" rx="0.5" fill="white" />
    <rect x="15" y="1"  width="3" height="13" rx="0.5" fill="white" />
  </svg>
)

const WifiIcon = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
    <path d="M8 9.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" fill="white" />
    <path d="M4.1 7.1a5.5 5.5 0 0 1 7.8 0" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <path d="M1.3 4.3a9.5 9.5 0 0 1 13.4 0" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" />
  </svg>
)

const BatteryIcon = ({ level }: { level: number }) => {
  const fillColor = level > 20 ? 'white' : level > 10 ? '#FFD700' : '#FF4444'
  const fillWidth = Math.round((level / 100) * 20)

  return (
    <div className="flex items-center gap-1">
      {level <= 20 && (
        <span
          className="text-[10px] font-semibold font-['Inter'] tabular-nums"
          style={{ color: fillColor }}
        >
          {level}%
        </span>
      )}
      <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
        {/* Outline */}
        <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke="white" strokeOpacity="0.6" />
        {/* Terminal nub */}
        <path d="M23 4.5 C24.5 4.5 25 5.2 25 6.5 C25 7.8 24.5 8.5 23 8.5" stroke="white" strokeOpacity="0.6" strokeWidth="1" fill="none" />
        {/* Fill */}
        <rect x="2" y="2" width={fillWidth} height="9" rx="1.5" fill={fillColor} />
      </svg>
    </div>
  )
}

export const MobileStatusBar = () => {
  const currentTime  = useSystemStore(s => s.currentTime)
  const batteryLevel = useSystemStore(s => s.batteryLevel)
  const phase        = useMobileStore(s => s.phase)

  const timeStr = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const bgClass = phase === 'app'
    ? 'bg-black/50 backdrop-blur-sm'
    : 'bg-transparent'

  return (
    <div
      className={`flex flex-row items-center px-5 h-[44px] ${bgClass} transition-colors duration-300`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      {/* Left: time */}
      <span className="text-white text-sm font-semibold font-['Inter'] tabular-nums">
        {timeStr}
      </span>

      {/* Centre: spacer */}
      <div className="flex-1" />

      {/* Right: signal, wifi, battery */}
      <div className="flex flex-row items-center gap-1.5">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon level={batteryLevel} />
      </div>
    </div>
  )
}
