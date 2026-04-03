import { useWindowStore } from '../../store/windowStore'

interface GameCard {
  id: string
  title: string
  description: string
  tags: string[]
  engine: string
  iconEmoji: string
  color: string
  windowId: string
  windowTitle: string
  width: number
  height: number
}

const GAMES: GameCard[] = [
  {
    id: 'pico-racer',
    title: 'Pico Racer',
    description: 'A pseudo-3D outrun-style racing game. Build in Pico-8.',
    tags: ['Pico-8', 'Lua', 'Pseudo-3D'],
    engine: 'Pico-8',
    iconEmoji: '🏎️',
    color: '#c8894a',
    windowId: 'picoracer',
    windowTitle: 'Pico Racer',
    width: 640,
    height: 520,
  },
  {
    id: 'rogue-survivor',
    title: 'Rogue Survivor',
    description: 'A top-down auto-attacking roguelike survivor. Built in Godot.',
    tags: ['Godot 4', 'GDScript', 'Roguelike'],
    engine: 'Godot 4',
    iconEmoji: '⚔️',
    color: '#8a78e8',
    windowId: 'roguesurvivor',
    windowTitle: 'Rogue Survivor',
    width: 800,
    height: 600,
  },
]

export default function GameLibrary() {
  const { openWindow, focusWindow, windows } = useWindowStore()

  function launch(game: GameCard) {
    if (windows[game.windowId]) {
      focusWindow(game.windowId)
      return
    }
    openWindow({
      id: game.windowId,
      title: game.windowTitle,
      x: 120, y: 80,
      width: game.width, height: game.height,
      zIndex: 1, minimised: false, maximised: false,
      preMaxX: 120, preMaxY: 80,
      preMaxWidth: game.width, preMaxHeight: game.height,
    })
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      backgroundColor: '#0D1828',
      fontFamily: 'Ubuntu, sans-serif',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px 12px',
        borderBottom: '1px solid #1E2D45',
        backgroundColor: '#0A0F1E',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#E8F4F8' }}>Games</div>
        <div style={{ fontSize: '12px', color: '#4A6080', marginTop: '2px' }}>
          {GAMES.length} games — in development
        </div>
      </div>

      {/* Grid */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '16px',
        alignContent: 'start',
      }}>
        {GAMES.map(game => (
          <div
            key={game.id}
            onClick={() => launch(game)}
            style={{
              backgroundColor: '#111E30',
              border: '1px solid #1E2D45',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'border-color 0.15s, transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = game.color
              el.style.transform = 'translateY(-2px)'
              el.style.boxShadow = `0 8px 28px rgba(0,0,0,0.4), 0 0 0 1px ${game.color}44`
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#1E2D45'
              el.style.transform = 'none'
              el.style.boxShadow = 'none'
            }}
          >
            {/* Banner */}
            <div style={{
              height: '110px',
              backgroundColor: '#0A0F1E',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '52px', position: 'relative',
              borderBottom: `2px solid ${game.color}33`,
            }}>
              {game.iconEmoji}
              {/* IN DEV badge */}
              <div style={{
                position: 'absolute', top: '10px', right: '10px',
                backgroundColor: '#FFD700', color: '#0A0F1E',
                fontSize: '9px', fontWeight: 700,
                padding: '2px 8px', borderRadius: '999px',
                letterSpacing: '0.07em', fontFamily: '"JetBrains Mono", monospace',
              }}>
                IN DEV
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#dce8f5', marginBottom: '4px' }}>
                {game.title}
              </div>
              <div style={{ fontSize: '12px', color: '#5A6F88', lineHeight: 1.5, marginBottom: '10px' }}>
                {game.description}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {game.tags.map(tag => (
                  <span key={tag} style={{
                    backgroundColor: '#0D1828',
                    border: '1px solid #1E3045',
                    color: '#8298b0', fontSize: '10px',
                    padding: '2px 7px', borderRadius: '4px',
                    fontFamily: '"JetBrains Mono", monospace',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Launch row */}
            <div style={{
              borderTop: '1px solid #1A2D3A',
              padding: '8px 14px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '11px', color: '#3A5070' }}>
                Built with {game.engine}
              </span>
              <span style={{
                fontSize: '11px', color: game.color,
                fontFamily: '"JetBrains Mono", monospace',
              }}>
                Open ›
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
