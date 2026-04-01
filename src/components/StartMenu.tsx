import { useWindowStore } from "../store/windowStore"
import { APP_REGISTRY } from "../data/appRegistry"

const NAV_PAGES = [
  { label: 'About Me',  page: '/about' },
  { label: 'Projects',  page: '/projects' },
  { label: 'View CV',   page: '/cv' },
  { label: 'Contact',   page: '/contact' },
]

const btnStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: '8px 12px',
  background: 'transparent',
  border: 'none',
  borderRadius: '6px',
  color: '#E8F4F8',
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '13px',
  cursor: 'pointer',
}

export default function StartMenu() {
  const { openWindow } = useWindowStore()

  const openBrowser = (initialPage: string, title: string, offsetX = 0) => {
    const def = APP_REGISTRY.find(a => a.id === 'browser')!
    openWindow({
      id: `browser-${initialPage.replace(/\//g, '') || 'home'}-${Date.now()}`,
      title,
      x: 80 + offsetX,
      y: 60,
      width: def.defaultSize.width,
      height: def.defaultSize.height,
      zIndex: 10,
      minimised: false,
      maximised: false,
      preMaxX: 80 + offsetX,
      preMaxY: 60,
      preMaxWidth: def.defaultSize.width,
      preMaxHeight: def.defaultSize.height,
      initialPage,
    })
  }

  const openTerminal = () => {
    const def = APP_REGISTRY.find(a => a.id === 'terminal')!
    openWindow({
      id: 'terminal',
      title: 'Terminal',
      x: 100,
      y: 100,
      width: def.defaultSize.width,
      height: def.defaultSize.height,
      zIndex: 10,
      minimised: false,
      maximised: false,
      preMaxX: 100,
      preMaxY: 100,
      preMaxWidth: def.defaultSize.width,
      preMaxHeight: def.defaultSize.height,
    })
  }

  return (
    <div style={{
      width: '200px',
      backgroundColor: '#1a1a2e',
      border: '1px solid #2A3F5F',
      borderRadius: '8px',
      position: 'absolute',
      bottom: '4px',
      left: '8px',
      padding: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      zIndex: 999,
    }}>
      {/* Browser shortcut */}
      <button
        onClick={() => openBrowser('/', '🌐 Browser')}
        style={btnStyle}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2A3F5F')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        🌐 Browser
      </button>

      <div style={{ height: '1px', backgroundColor: '#2A3F5F', margin: '4px 0' }} />

      {/* Portfolio pages */}
      {NAV_PAGES.map(({ label, page }) => (
        <button
          key={page}
          onClick={() => openBrowser(page, label)}
          style={btnStyle}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2A3F5F')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          {label}
        </button>
      ))}

      <div style={{ height: '1px', backgroundColor: '#2A3F5F', margin: '4px 0' }} />

      {/* Terminal */}
      <button
        onClick={openTerminal}
        style={btnStyle}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2A3F5F')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        Terminal
      </button>
    </div>
  )
}
