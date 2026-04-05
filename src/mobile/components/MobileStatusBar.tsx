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
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {level <= 20 && (
        <span style={{
          fontSize: '10px',
          fontWeight: 600,
          fontFamily: 'Inter, -apple-system, sans-serif',
          color: fillColor,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {level}%
        </span>
      )}
      <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
        <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke="white" strokeOpacity="0.6" />
        <path d="M23 4.5 C24.5 4.5 25 5.2 25 6.5 C25 7.8 24.5 8.5 23 8.5" stroke="white" strokeOpacity="0.6" strokeWidth="1" fill="none" />
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

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 'env(safe-area-inset-top)',
      minHeight: 44,
      background: phase === 'app' ? 'rgba(0,0,0,0.5)' : 'transparent',
      backdropFilter: phase === 'app' ? 'blur(4px)' : 'none',
      WebkitBackdropFilter: phase === 'app' ? 'blur(4px)' : 'none',
      transition: 'background 0.3s',
      flexShrink: 0,
    }}>
      <span style={{
        color: 'white',
        fontSize: '0.875rem',
        fontWeight: 600,
        fontFamily: 'Inter, -apple-system, sans-serif',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {timeStr}
      </span>

      <div style={{ flex: 1 }} />

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon level={batteryLevel} />
      </div>
    </div>
  )
}
