import Boot from './components/Boot'
import Login from './components/Login'
import Desktop from './components/Desktop'
import { useSystemStore } from './store/systemStore'

export default function App() {
  const bootComplete = useSystemStore(s => s.bootComplete)
  const loggedIn = useSystemStore(s => s.loggedIn)

  return (
    <div>
      {!bootComplete && <Boot />}
      {bootComplete && !loggedIn && <Login />}
      {loggedIn && <Desktop />}
    </div>
  )
}
