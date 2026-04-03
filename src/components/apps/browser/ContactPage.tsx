import { useRef } from 'react'

interface ContactLink {
  label: string
  value: string
  href: string
  accent: string
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
      <path d="M10 2C5.58 2 2 5.58 2 10c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0018 10c0-4.42-3.58-8-8-8z" fill={color} />
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
    label: 'Email',
    value: 'deancimatu@gmail.com',
    href: 'mailto:deancimatu@gmail.com',
    accent: '#4ade80',
    icon: <EmailIcon color="#4ade80" />,
  },
  {
    label: 'GitHub',
    value: 'github.com/Dean-Cimatu',
    href: 'https://github.com/Dean-Cimatu',
    accent: '#86efac',
    icon: <GitHubIcon color="#86efac" />,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/deancimatu',
    href: 'https://linkedin.com/in/deancimatu',
    accent: '#22c55e',
    icon: <LinkedInIcon color="#22c55e" />,
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
        ref.current.style.backgroundColor = '#0c1f10'
        ref.current.style.borderLeftColor = link.accent
        ref.current.style.borderColor = '#1c3a22'
        ref.current.style.borderLeftColor = link.accent
        ref.current.style.paddingLeft = '28px'
      }}
      onMouseLeave={() => {
        if (!ref.current) return
        ref.current.style.backgroundColor = 'transparent'
        ref.current.style.borderColor = 'transparent'
        ref.current.style.borderLeftColor = link.accent
        ref.current.style.paddingLeft = '20px'
      }}
      style={{
        display: 'flex', alignItems: 'center', gap: '18px',
        padding: '16px 20px',
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        borderLeft: `3px solid ${link.accent}`,
        borderRadius: '0 8px 8px 0',
        textDecoration: 'none', cursor: 'pointer',
        transition: 'background-color 0.18s ease, border-color 0.18s ease, padding-left 0.18s ease',
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: '8px', flexShrink: 0,
        backgroundColor: `${link.accent}15`,
        border: `1px solid ${link.accent}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {link.icon}
      </div>
      <div>
        <div style={{
          fontSize: '0.65rem', color: link.accent, marginBottom: '3px',
          textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700,
          fontFamily: '"JetBrains Mono", monospace',
        }}>
          {link.label}
        </div>
        <div style={{
          fontSize: '0.88rem', color: '#f0fdf4',
          fontFamily: '"JetBrains Mono", monospace',
        }}>
          {link.value}
        </div>
      </div>
      <span style={{ marginLeft: 'auto', color: '#2d5e34', fontSize: '1rem' }}>›</span>
    </a>
  )
}

export const ContactPage = () => (
  <div style={{
    fontFamily: 'Ubuntu, sans-serif',
    background: `
      radial-gradient(ellipse 55% 45% at 90% 100%, rgba(34,197,94,0.07) 0%, transparent 55%),
      #040d06
    `,
    minHeight: '100%',
  }}>
    <div style={{ maxWidth: '560px', margin: '0 auto', padding: '64px 40px 80px' }}>

      {/* Label */}
      <p style={{
        fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase',
        color: '#4ade80', fontFamily: '"JetBrains Mono", monospace',
        marginBottom: '20px', fontWeight: 600,
      }}>
        Contact
      </p>

      {/* Headline */}
      <h1 style={{
        fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.15,
        color: '#f0fdf4', fontFamily: 'Ubuntu, sans-serif',
        letterSpacing: '-0.03em', margin: '0 0 20px',
      }}>
        Let's make
        <br />
        <span style={{
          background: 'linear-gradient(90deg, #4ade80, #22c55e)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          something.
        </span>
      </h1>

      <p style={{
        fontSize: '1rem', color: '#6b9470', lineHeight: 1.85,
        maxWidth: '440px', margin: '0 0 52px',
      }}>
        I'm actively looking for a placement for 2025/26.
        If you're building something interesting and need someone who ships — let's talk.
      </p>

      {/* Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '48px' }}>
        {LINKS.map(link => (
          <ContactCard key={link.label} link={link} />
        ))}
      </div>

      {/* Footer note */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        borderTop: '1px solid #0f2212', paddingTop: '28px',
      }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4ade80', flexShrink: 0 }} />
        <p style={{
          fontSize: '0.78rem', color: '#3a5a3e',
          fontFamily: '"JetBrains Mono", monospace', margin: 0,
        }}>
          Usually reply within 24 hours &mdash; Open to placement · freelance · collaboration
        </p>
      </div>

    </div>
  </div>
)
