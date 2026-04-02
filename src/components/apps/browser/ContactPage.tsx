import { useRef } from 'react'

interface ContactLink {
  icon: string
  label: string
  value: string
  href: string
}

const LINKS: ContactLink[] = [
  { icon: 'X', label: 'Email', value: 'deancimatu@example.com', href: 'mailto:deancimatu@example.com' },
  { icon: 'X', label: 'GitHub', value: 'github.com/Dean-Cimatu', href: 'https://github.com/Dean-Cimatu' },
  { icon: 'X', label: 'LinkedIn', value: 'linkedin.com/in/deancimatu', href: 'https://linkedin.com/in/deancimatu' },
]

function ContactRow({ link }: { link: ContactLink }) {
  const ref = useRef<HTMLAnchorElement>(null)

  return (
    <a
      ref={ref}
      href={link.href}
      target={link.href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        backgroundColor: '#1E2D45',
        border: '1px solid #2A3F5F',
        borderRadius: '12px',
        padding: '16px 24px',
        marginBottom: '12px',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#00D4FF')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A3F5F')}
    >
      <span style={{ fontSize: '1.5rem' }}>{link.icon}</span>
      <div>
        <div style={{ fontSize: '0.75rem', color: '#8899AA', marginBottom: '2px', fontFamily: 'Ubuntu, sans-serif' }}>
          {link.label}
        </div>
        <div style={{ fontSize: '0.9rem', color: '#00D4FF', fontFamily: '"JetBrains Mono", monospace' }}>
          {link.value}
        </div>
      </div>
    </a>
  )
}

export const ContactPage = () => (
  <div
    style={{
      maxWidth: '448px',
      margin: '0 auto',
      padding: '64px 32px',
      textAlign: 'center',
      fontFamily: 'Ubuntu, sans-serif',
    }}
  >
    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#E8F4F8', margin: 0 }}>
      Get In Touch
    </h1>
    <p style={{ color: '#8899AA', marginTop: '8px', marginBottom: '40px', fontSize: '0.9rem', lineHeight: 1.6 }}>
      I'm open to placement opportunities, collaborations, and interesting conversations.
    </p>

    <div style={{ textAlign: 'left' }}>
      {LINKS.map(link => (
        <ContactRow key={link.label} link={link} />
      ))}
    </div>

    <p style={{ color: '#8899AA', fontSize: '0.75rem', marginTop: '24px' }}>
      Response time: usually within 24 hours 🕐
    </p>
  </div>
)
