import { Suspense } from 'react'
import Calculator from '../../components/apps/Calculator'
import MusicPlayer from '../../components/apps/MusicPlayer'
import PicoRacer from '../../components/apps/PicoRacer'
import RogueSurvivor from '../../components/apps/RogueSurvivor'
import { MobileSettings } from './MobileSettings'
import { MobileBrowserWrapper } from './MobileBrowserWrapper'
import { MobileTerminalWrapper } from './MobileTerminalWrapper'

const mobileAppMap: Record<string, React.FC> = {
  browser:    () => <MobileBrowserWrapper initialPage="/" />,
  calculator: Calculator,
  music:      MusicPlayer,
  terminal:   MobileTerminalWrapper,
  settings:   MobileSettings,
  'pico-racer': PicoRacer,
  rogue:      RogueSurvivor,
  projects:   () => <MobileBrowserWrapper initialPage="/projects" />,
  cv:         () => <MobileBrowserWrapper initialPage="/cv" />,
  contact:    () => <MobileBrowserWrapper initialPage="/contact" />,
}

const Fallback = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '100%',
    color: '#8899AA', fontSize: 13,
    fontFamily: '"JetBrains Mono", monospace',
  }}>
    Loading...
  </div>
)

export const MobileAppContent = ({ appId }: { appId: string }) => {
  const Component = mobileAppMap[appId]
  if (!Component) return (
    <div style={{
      padding: 32, color: '#8899AA', fontSize: 13,
      fontFamily: '"JetBrains Mono", monospace',
    }}>
      App not found: {appId}
    </div>
  )
  return (
    <Suspense fallback={<Fallback />}>
      <Component />
    </Suspense>
  )
}
