const PLAYLIST_ID = '4fMX7KmDwz6UhXdCBJXoUK'
const PLAYLIST_URL = `https://open.spotify.com/playlist/${PLAYLIST_ID}`

export default function MusicPlayer() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      width: '100%', height: '100%',
      backgroundColor: '#080E1A',
      fontFamily: 'Ubuntu, sans-serif',
    }}>

      {/* ── App header ── */}
      <div style={{
        flexShrink: 0, height: 48,
        background: 'linear-gradient(180deg, #0D1828 0%, #080E1A 100%)',
        borderBottom: '1px solid #1A2D45',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
      }}>
        {/* Left: icon + label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
            <path d="M11 18V7l10-2v9"/>
          </svg>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#C0CEDC', letterSpacing: '0.01em' }}>
            Music
          </span>
        </div>

        {/* Right: Spotify link */}
        <a
          href={PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            fontSize: 11, color: '#1DB954',
            textDecoration: 'none', fontFamily: '"JetBrains Mono", monospace',
            opacity: 0.8, transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
        >
          {/* Spotify logo mark */}
          <svg width="12" height="12" viewBox="0 0 168 168" fill="#1DB954">
            <path d="M84 0C37.6 0 0 37.6 0 84s37.6 84 84 84 84-37.6 84-84S130.4 0 84 0zm38.5 121.2c-1.5 2.4-4.7 3.2-7.1 1.7-19.4-11.9-43.9-14.6-72.7-8-2.8.6-5.5-1.1-6.2-3.9-.6-2.8 1.1-5.5 3.9-6.2 31.5-7.2 58.5-4.1 80.3 9.3 2.5 1.5 3.2 4.7 1.8 7.1zm10.3-22.8c-1.9 3-5.8 4-8.8 2.2-22.2-13.7-56.1-17.6-82.3-9.7-3.4 1-7-.9-8-4.3-1-3.4.9-7 4.3-8 30-9.1 67.3-4.7 92.7 11 3 1.8 4 5.8 2.1 8.8zm.9-23.7c-26.6-15.8-70.5-17.2-95.9-9.5-4.1 1.2-8.4-1.1-9.6-5.2-1.2-4.1 1.1-8.4 5.2-9.6 29.2-8.9 77.8-7.1 108.4 10.9 3.7 2.2 4.9 6.9 2.7 10.6-2.1 3.6-6.9 4.9-10.8 2.8z"/>
          </svg>
          Open in Spotify
        </a>
      </div>

      {/* ── Spotify embed fills the rest ── */}
      <div style={{
        flex: 1, overflow: 'hidden',
        // Slight inset glow to frame the embed
        background: '#080E1A',
      }}>
        <iframe
          src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`}
          width="100%"
          height="100%"
          frameBorder={0}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ display: 'block', borderRadius: 0 }}
        />
      </div>
    </div>
  )
}
