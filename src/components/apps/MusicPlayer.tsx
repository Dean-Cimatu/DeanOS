const PLAYLIST_ID = '4fMX7KmDwz6UhXdCBJXoUK'
const PLAYLIST_URL = `https://open.spotify.com/playlist/${PLAYLIST_ID}`

export default function MusicPlayer() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', backgroundColor: '#0A0F1E',
    }}>
      {/* Header */}
      <div style={{
        height: 40, flexShrink: 0,
        borderBottom: '1px solid #2A3F5F',
        padding: '0 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          fontSize: '12px', fontFamily: '"JetBrains Mono", monospace',
          color: '#8899AA',
        }}>
          Music
        </span>
        <a
          href={PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '11px', color: '#00D4FF',
            textDecoration: 'none', fontFamily: '"JetBrains Mono", monospace',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
        >
          Open in Spotify →
        </a>
      </div>

      {/* Spotify embed */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <iframe
          src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`}
          width="100%"
          height="100%"
          frameBorder={0}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ borderRadius: 0, display: 'block' }}
        />
      </div>
    </div>
  )
}
