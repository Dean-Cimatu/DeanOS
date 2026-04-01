interface NotFoundPageProps {
  path: string
  onNavigate?: (path: string) => void
}

export const NotFoundPage = ({ path, onNavigate }: NotFoundPageProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '96px 32px',
      textAlign: 'center',
      fontFamily: 'Inter, sans-serif',
    }}
  >
    <div
      style={{
        fontSize: '8rem',
        fontWeight: 700,
        fontFamily: '"JetBrains Mono", monospace',
        color: '#00D4FF',
        opacity: 0.2,
        lineHeight: 1,
      }}
    >
      404
    </div>
    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#E8F4F8', marginTop: '16px', marginBottom: 0 }}>
      Page not found
    </h1>
    <p
      style={{
        color: '#8899AA',
        fontSize: '0.8rem',
        marginTop: '8px',
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      Try typing a valid path: /, /about, /projects, /cv, /contact
    </p>
    <button
      onClick={() => onNavigate?.('/')}
      style={{
        marginTop: '32px',
        backgroundColor: '#00D4FF',
        color: '#000',
        padding: '8px 24px',
        borderRadius: '6px',
        fontWeight: 600,
        fontSize: '0.9rem',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
    >
      Go Home
    </button>
  </div>
)
