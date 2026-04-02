interface ContactLink {
  label: string
  value: string
  href: string
  accent: string
}

const LINKS: ContactLink[] = [
  { label: 'Email', value: 'deancimatu@gmail.com', href: 'mailto:deancimatu@gmail.com', accent: '#c8894a' },
  { label: 'GitHub', value: 'github.com/Dean-Cimatu', href: 'https://github.com/Dean-Cimatu', accent: '#7d95af' },
  { label: 'LinkedIn', value: 'linkedin.com/in/deancimatu', href: 'https://linkedin.com/in/deancimatu', accent: '#00D4FF' },
]

export const ContactPage = () => (
  <div style={{
    maxWidth: '440px', margin: '0 auto',
    padding: '64px 32px',
    fontFamily: 'Ubuntu, sans-serif',
  }}>
    <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#dce8f6', margin: 0, letterSpacing: '-0.01em' }}>
      Get In Touch
    </h1>
    <p style={{ color: '#4d6580', marginTop: '8px', marginBottom: '36px', fontSize: '0.87rem', lineHeight: 1.6 }}>
      Open to placement opportunities, collaborations, and interesting conversations.
    </p>

    <div>
      {LINKS.map(link => (
        <a key={link.label} href={link.href}
          target={link.href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            backgroundColor: '#18243a', border: '1px solid #253a55',
            borderRadius: '10px', padding: '16px 20px', marginBottom: '10px',
            textDecoration: 'none', cursor: 'pointer', transition: 'border-color 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = link.accent)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = '#253a55')}
        >
          <div style={{
            width: 36, height: 36, borderRadius: '8px', flexShrink: 0,
            backgroundColor: `${link.accent}18`,
            border: `1px solid ${link.accent}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: link.accent }} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#4d6580', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              {link.label}
            </div>
            <div style={{ fontSize: '0.88rem', color: link.accent, fontFamily: '"JetBrains Mono", monospace' }}>
              {link.value}
            </div>
          </div>
        </a>
      ))}
    </div>

    <p style={{ color: '#2e4055', fontSize: '0.72rem', marginTop: '28px', fontFamily: '"JetBrains Mono", monospace' }}>
      Usually replies within 24 hours
    </p>
  </div>
)
