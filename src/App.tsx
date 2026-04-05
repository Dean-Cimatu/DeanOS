import { DesktopOS } from './components/DesktopOS'
import { MobileOS } from './mobile/MobileOS'

export default function App() {
  return (
    <>
      {/* Desktop — hidden below md breakpoint (768px) */}
      <div className="hidden md:block h-screen">
        <DesktopOS />
      </div>

      {/* Mobile — hidden above md breakpoint */}
      <div className="block md:hidden h-screen">
        <MobileOS />
      </div>
    </>
  )
}
