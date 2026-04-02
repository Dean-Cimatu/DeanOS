import Boot from './components/Boot'
import Login from './components/Login'
import LockScreen from './components/LockScreen'
import Desktop from './components/Desktop'
import PowerScreen from './components/PowerScreen'
import { useSystemStore } from './store/systemStore'

export default function App() {
  const bootComplete  = useSystemStore(s => s.bootComplete)
  const loggedIn      = useSystemStore(s => s.loggedIn)
  const locked        = useSystemStore(s => s.locked)
  const systemAction  = useSystemStore(s => s.systemAction)

  // Power screens override everything
  if (systemAction) return <PowerScreen />

  if (!bootComplete)           return <Boot />
  if (!loggedIn)               return <Login />
  if (locked)                  return <LockScreen />
  return <Desktop />
}
