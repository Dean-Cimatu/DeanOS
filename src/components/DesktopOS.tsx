import Boot from './Boot'
import Login from './Login'
import LockScreen from './LockScreen'
import Desktop from './Desktop'
import PowerScreen from './PowerScreen'
import { useSystemStore } from '../store/systemStore'

export const DesktopOS = () => {
  const bootComplete  = useSystemStore(s => s.bootComplete)
  const loggedIn      = useSystemStore(s => s.loggedIn)
  const locked        = useSystemStore(s => s.locked)
  const systemAction  = useSystemStore(s => s.systemAction)

  if (systemAction) return <PowerScreen />

  if (!bootComplete)  return <Boot />
  if (!loggedIn)      return <Login />
  if (locked)         return <LockScreen />
  return <Desktop />
}
