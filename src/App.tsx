import { DesktopOS } from './components/DesktopOS'
import { MobileOS } from './mobile/MobileOS'
import { useMobileDevice } from './hooks/useMobileDevice'

export default function App() {
  // getIsMobile() runs synchronously via lazy useState — correct on first render,
  // no flicker. Also prevents both trees from mounting simultaneously, which
  // caused DesktopOS to advance systemStore state and fixed-position mobile
  // elements to escape their display:none parent on iOS Safari.
  const { isMobile } = useMobileDevice()

  return isMobile ? <MobileOS /> : <DesktopOS />
}
