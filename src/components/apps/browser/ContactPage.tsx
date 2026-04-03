import { useRef } from 'react'

interface ContactLink {
  label: string
  value: string
  href: string
  accent: string
  gradientBg: string
  icon: React.ReactNode
}

function EmailIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M2 7L10 12L18 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function GitHubIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="10" cy="10" r="2.5" fill={color} />
      <line x1="12.5" y1="10" x2="17" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function LinkedInIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="16" height="16" rx="3" stroke={color} strokeWidth="1.5" fill="none" />
      <text x="6" y="14" fontSize="9" fontWeight="700" fill={color} fontFamily="sans-serif">in</text>
    </svg>
  )
}

const LINKS: ContactLink[] = [
  {
    label: 'EMAIL',
    value: 'deancimatu@gmail.com',
    href: 'mailto:deancimatu@gmail.com',
    accent: '#FF8C00',
    gradientBg: 'linear-gradient(135deg, #1e120a 0%, #0d1828 100%)',
    icon: <EmailIcon color="#FF8C00" />,
  },
  {
    label: 'GITHUB',
    value: 'github.com/Dean-Cimatu',
    href: 'https://github.com/Dean-Cimatu',
    accent: '#a78bfa',
    gradientBg: 'linear-gradient(135deg, #0d1020 0%, #0d1828 100%)',
    icon: <GitHubIcon color="#a78bfa" />,
  },
  {
    label: 'LINKEDIN',
    value: 'linkedin.com/in/deancimatu',
    href: 'https://linkedin.com/in/deancimatu',
    accent: '#00D4FF',
    gradientBg: 'linear-gradient(135deg, #071822 0%, #0d1828 100%)',
    icon: <LinkedInIcon color="#00D4FF" />,
  },
]

function ContactCard({ link }: { link: ContactLink }) {
  const ref = useRef<HTMLAnchorElement>(null)

  return (
    <a
      ref={ref}
      href={link.href}
      target={link.href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      onMouseEnter={() => {
        if (!ref.current) return
        ref.current.style.borderColor = link.accent
        ref.current.style.transform = 'translateY(-2px)'
        ref.current.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4)`
      }}
      onMouseLeave={() => {
        if (!ref.current) return
        ref.current.style.borderColor = `${link.accent}40`
        ref.current.style.transform = 'translateY(0)'
        ref.current.style.boxShadow = 'none'
      }}
      style={{
        display: 'flex', alignItems: 'center', gap: '18px',
        background: link.gradientBg,
        border: `1px solid ${link.accent}40`,
        borderLeft: `3px solid ${link.accent}`,
        borderRadius: '10px', padding: '20px 24px', marginBottom: '12px',
        textDecoration: 'none', cursor: 'pointer',
        transition: 'border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: '8px', flexShrink: 0,
        backgroundColor: `${link.accent}15`,
        border: `1px solid ${link.accent}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {link.icon}
      </div>
      <div>
        <div style={{
          fontSize: '0.65rem', color: link.accent, marginBottom: '4px',
          textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700,
          fontFamily: '"JetBrains Mono", monospace',
        }}>
          {link.label}
        </div>
        <div style={{
          fontSize: '0.95rem', color: '#E8F4F8',
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 500,
        }}>
          {link.value}
        </div>
      </div>
    </a>
  )
}

export const ContactPage = () => (
  <div style={{
    maxWidth: '480px', margin: '0 auto',
    padding: '64px 32px',
    fontFamily: 'Ubuntu, sans-serif',
    backgroundColor: '#080d18',
    minHeight: '100%',
  }}>
    <h1 style={{
      fontSize: '2rem', fontWeight: 800, margin: '0 0 10px 0',
      letterSpacing: '-0.02em', color: '#E8F4F8',
      lineHeight: 1.15,
    }}>
      Let's work{' '}
      <span style={{
        background: 'linear-gradient(90deg, #00D4FF, #a78bfa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        together.
      </span>
    </h1>
    <p style={{ color: '#8899AA', marginTop: '10px', marginBottom: '36px', fontSize: '0.9rem', lineHeight: 1.7 }}>
      Whether it's a placement, a side project, or just a good conversation — I'm always open to new things.
    </p>

    <div>
      {LINKS.map(link => (
        <ContactCard key={link.label} link={link} />
      ))}
    </div>

    <div style={{ marginTop: '28px' }}>
      <p style={{ color: '#FFD700', fontSize: '0.78rem', margin: '0 0 8px 0', fontFamily: '"JetBrains Mono", monospace' }}>
        ⚡ Usually within 24 hours
      </p>
      <p style={{ color: '#4A5568', fontSize: '0.75rem', margin: 0, fontFamily: 'Ubuntu, sans-serif' }}>
        Open to placement{' '}
        <span style={{ color: '#2e4a6a' }}>·</span>{' '}
        collaborations{' '}
        <span style={{ color: '#2e4a6a' }}>·</span>{' '}
        freelance
      </p>
    </div>
  </div>
)
