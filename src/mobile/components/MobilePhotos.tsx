export const MobilePhotos = () => (
  <div style={{
    height: '100%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: 16,
    background: '#0A0F1E',
    padding: 32,
  }}>
    {/* Placeholder grid */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 3,
      width: '100%',
      maxWidth: 360,
      borderRadius: 12,
      overflow: 'hidden',
      opacity: 0.25,
    }}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          style={{
            aspectRatio: '1',
            background: `linear-gradient(135deg, #1E2D45 ${i * 10}%, #0A0F1E)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="4" width="20" height="16" rx="2" stroke="#2A3F5F" strokeWidth="1.5"/>
            <circle cx="8.5" cy="9.5" r="1.5" stroke="#2A3F5F" strokeWidth="1.2"/>
            <path d="M2 16l5-4 3 3 4-4 8 5" stroke="#2A3F5F" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
      ))}
    </div>

    <div style={{ textAlign: 'center' }}>
      <p style={{
        color: '#E8F4F8', fontSize: 16, fontWeight: 600,
        fontFamily: 'Inter, -apple-system, sans-serif',
        margin: '0 0 6px',
      }}>
        Photos
      </p>
      <p style={{
        color: '#8899AA', fontSize: 13,
        fontFamily: 'Inter, -apple-system, sans-serif',
        margin: 0,
      }}>
        Coming soon
      </p>
    </div>
  </div>
)
