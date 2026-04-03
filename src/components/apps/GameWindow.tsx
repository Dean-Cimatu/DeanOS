interface GameWindowProps {
  title: string
  description: string
  status: 'coming-soon' | 'live'
  iframeSrc?: string
  tags: string[]
}

export default function GameWindow({ title, description, status, iframeSrc, tags }: GameWindowProps) {
  const isLive = status === 'live' && !!iframeSrc

  if (isLive) {
    return (
      <iframe
        src={iframeSrc}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        style={{ display: 'block', border: 'none' }}
        title={title}
      />
    )
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      backgroundColor: '#0A0F1E',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: '"JetBrains Mono", monospace',
      padding: '32px',
      textAlign: 'center',
    }}>
      {/* Controller icon */}
      <div style={{ fontSize: '64px', marginBottom: '16px', lineHeight: 1 }}>🎮</div>

      {/* Title */}
      <div style={{
        fontSize: '20px', fontWeight: 700,
        color: '#E8F4F8', marginBottom: '8px',
      }}>
        {title}
      </div>

      {/* Description */}
      <div style={{
        fontSize: '13px', color: '#8899AA',
        maxWidth: '280px', lineHeight: 1.6, marginBottom: '16px',
      }}>
        {description}
      </div>

      {/* Status badge */}
      <div style={{
        display: 'inline-block',
        backgroundColor: '#FFD700', color: '#0A0F1E',
        fontSize: '11px', fontWeight: 700,
        padding: '4px 14px', borderRadius: '999px',
        letterSpacing: '0.08em',
        marginBottom: '14px',
      }}>
        IN DEVELOPMENT
      </div>

      {/* Tech tags */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {tags.map(tag => (
          <span key={tag} style={{
            backgroundColor: '#1E2D45',
            border: '1px solid #2A3F5F',
            color: '#8899AA', fontSize: '11px',
            padding: '2px 8px', borderRadius: '4px',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
