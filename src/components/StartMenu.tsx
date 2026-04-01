import { useWindowStore } from "../store/windowStore"

const BROWSER_SIZE = { width: 900, height: 580 }

export default function StartMenu() {
  const { openWindow } = useWindowStore()

  const openBrowser = (title: string, initialPage: string, offsetX = 0) => {
    openWindow({
      id: `browser-${initialPage.replace('/', '') || 'home'}-${Date.now()}`,
      title,
      x: 80 + offsetX,
      y: 60,
      ...BROWSER_SIZE,
      zIndex: 10,
      minimised: false,
      maximised: false,
      preMaxX: 80 + offsetX,
      preMaxY: 60,
      preMaxWidth: BROWSER_SIZE.width,
      preMaxHeight: BROWSER_SIZE.height,
      initialPage,
    })
  }

  const openTerminal = () => {
    openWindow({
      id: "terminal",
      title: "Terminal",
      x: 100,
      y: 100,
      width: 800,
      height: 500,
      zIndex: 10,
      minimised: false,
      maximised: false,
      preMaxX: 100,
      preMaxY: 100,
      preMaxWidth: 800,
      preMaxHeight: 500,
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
      {[
        { label: 'About Me', page: '/about' },
        { label: 'Projects', page: '/projects' },
        { label: 'View CV', page: '/cv' },
        { label: 'Contact', page: '/contact' },
      ].map(({ label, page }) => (
        <button
          key={page}
          onClick={() => openBrowser(label, page)}
          style={{
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
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2A3F5F')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          {label}
        </button>
      ))}

      <div style={{ height: '1px', backgroundColor: '#2A3F5F', margin: '4px 0' }} />

      <button
        onClick={openTerminal}
        style={{
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
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2A3F5F')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        Terminal
      </button>
    </div>
  )
}
