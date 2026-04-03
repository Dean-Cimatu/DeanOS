import { useRef } from 'react'

interface Project {
  name: string
  tagline: string
  description: string
  tech: string[]
  status: 'Live' | 'In Progress' | 'Complete'
  color: string
  links: { label: string; href: string }[]
  featured?: boolean
}

const PROJECTS: Project[] = [
  {
    name: 'DeanOS',
    tagline: "You're inside it right now.",
    description:
      "A browser-based OS built as a portfolio. Boot sequence, window manager, terminal, file system, tray widgets, apps — the whole thing. The fact that you're reading this from inside it is the point.",
    tech: ['React 18', 'TypeScript', 'Vite', 'Zustand', 'Framer Motion'],
    status: 'Live',
    color: '#4ade80',
    links: [
      { label: 'GitHub', href: 'https://github.com/Dean-Cimatu/deanos' },
      { label: 'deancimatu.com', href: 'https://deancimatu.com' },
    ],
    featured: true,
  },
  {
    name: 'Car Hire System',
    tagline: 'Full-stack, from scratch.',
    description:
      'Built a complete car hire platform solo — custom BST and HashTable data structures, Google OAuth, Stripe payments, Azure SQL, and an AI support chatbot. Deployed and live.',
    tech: ['C#', 'ASP.NET Core', 'Azure SQL', 'Stripe', 'Google OAuth', 'NUnit'],
    status: 'Live',
    color: '#22c55e',
    links: [
      { label: 'GitHub', href: 'https://github.com/Dean-Cimatu/CST2550-Car-Hire-System' },
      { label: 'carhire.deancimatu.com', href: 'https://carhire.deancimatu.com' },
    ],
  },
  {
    name: 'StudyBuddy',
    tagline: '5-hour hackathon → real product.',
    description:
      'AI study companion that turns a topic or deadline into a personalised task list with XP, a leaderboard, and a wellbeing hub. Built in 5 hours, now actively developed.',
    tech: ['React', 'Node.js', 'MongoDB', 'Claude API', 'OpenAI API'],
    status: 'Complete',
    color: '#86efac',
    links: [
      { label: 'GitHub', href: 'https://github.com/Dean-Cimatu/Hackathon' },
    ],
  },
  {
    name: 'DesignPatternCLI',
    tagline: 'Six patterns, one terminal.',
    description:
      'A Java CLI that walks you through six Gang of Four design patterns — pick one from the menu and watch it execute with live output explaining each step.',
    tech: ['Java', 'Maven'],
    status: 'Complete',
    color: '#4ade80',
    links: [
      { label: 'GitHub', href: 'https://github.com/Dean-Cimatu/DesignPatterns' },
    ],
  },
]

const STATUS_COLOR: Record<string, string> = {
  Live: '#4ade80',
  'In Progress': '#fbbf24',
  Complete: '#6b9470',
}

export const ProjectsPage = () => (
  <div style={{
    fontFamily: 'Ubuntu, sans-serif',
    background: 'radial-gradient(ellipse 55% 35% at 0% 0%, rgba(34,197,94,0.07) 0%, transparent 55%), #040d06',
    minHeight: '100%',
  }}>
    <div style={{ maxWidth: '740px', margin: '0 auto', padding: '64px 40px 80px' }}>
      <p style={{
        fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase',
        color: '#4ade80', fontFamily: '"JetBrains Mono", monospace',
        marginBottom: '14px', fontWeight: 600,
      }}>Work</p>
      <h1 style={{
        fontSize: '2.4rem', fontWeight: 800, color: '#f0fdf4',
        fontFamily: 'Ubuntu, sans-serif', letterSpacing: '-0.03em', margin: '0 0 8px',
      }}>Things I've built.</h1>
      <p style={{ color: '#3a5a3e', fontSize: '0.9rem', margin: '0 0 52px' }}>
        Shipped, in progress, and done.
      </p>

      {PROJECTS.filter(p => p.featured).map(p => <FeaturedCard key={p.name} project={p} />)}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {PROJECTS.filter(p => !p.featured).map(p => <ProjectCard key={p.name} project={p} />)}
      </div>
    </div>
  </div>
)

function FeaturedCard({ project: p }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={ref}
      onMouseEnter={() => { if (ref.current) ref.current.style.borderColor = '#22c55e55' }}
      onMouseLeave={() => { if (ref.current) ref.current.style.borderColor = '#1c3a22' }}
      style={{
        marginBottom: '14px', backgroundColor: '#0c1f10',
        border: '1px solid #1c3a22', borderRadius: '12px',
        overflow: 'hidden', transition: 'border-color 0.18s',
      }}
    >
      <div style={{
        height: '72px',
        background: 'linear-gradient(135deg, #0c2e14 0%, #061409 100%)',
        borderBottom: '1px solid #1c3a22',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        padding: '0 24px 12px',
      }}>
        <span style={{ fontSize: '0.68rem', fontFamily: '"JetBrains Mono", monospace', color: '#4ade80', letterSpacing: '0.1em' }}>
          ★ Featured
        </span>
        <span style={{
          fontSize: '0.68rem', fontFamily: '"JetBrains Mono", monospace', color: '#4ade80',
          backgroundColor: '#22c55e18', border: '1px solid #22c55e33', padding: '2px 8px', borderRadius: '4px',
        }}>
          ● {p.status}
        </span>
      </div>
      <div style={{ padding: '22px 24px 24px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f0fdf4', fontFamily: 'Ubuntu, sans-serif', margin: '0 0 4px' }}>
          {p.name}
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#4ade80', margin: '0 0 12px', fontStyle: 'italic' }}>{p.tagline}</p>
        <p style={{ fontSize: '0.88rem', color: '#6b9470', lineHeight: 1.75, margin: '0 0 18px' }}>{p.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
          {p.tech.map(t => (
            <span key={t} style={{
              backgroundColor: '#070f08', border: '1px solid #1c3a22', color: '#3a5a3e',
              fontSize: '0.72rem', padding: '3px 9px', borderRadius: '4px',
              fontFamily: '"JetBrains Mono", monospace',
            }}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          {p.links.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.82rem', color: '#4ade80', textDecoration: 'none', fontWeight: 600 }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
            >{l.label} ↗</a>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project: p }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const sc = STATUS_COLOR[p.status]
  return (
    <div
      ref={ref}
      onMouseEnter={() => { if (!ref.current) return; ref.current.style.borderColor = `${p.color}44`; ref.current.style.transform = 'translateY(-2px)' }}
      onMouseLeave={() => { if (!ref.current) return; ref.current.style.borderColor = '#1c3a22'; ref.current.style.transform = 'none' }}
      style={{
        backgroundColor: '#0c1f10', border: '1px solid #1c3a22', borderLeft: `3px solid ${p.color}`,
        borderRadius: '10px', padding: '20px', transition: 'border-color 0.18s, transform 0.18s',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <h3 style={{ fontSize: '0.97rem', fontWeight: 700, color: '#f0fdf4', fontFamily: 'Ubuntu, sans-serif', margin: 0 }}>
            {p.name}
          </h3>
          <span style={{ fontSize: '0.65rem', color: sc, fontFamily: '"JetBrains Mono", monospace', flexShrink: 0, marginLeft: '8px', marginTop: '2px' }}>
            ● {p.status}
          </span>
        </div>
        <p style={{ fontSize: '0.78rem', color: p.color, margin: '0 0 10px', fontStyle: 'italic' }}>{p.tagline}</p>
        <p style={{ fontSize: '0.8rem', color: '#4a6e4e', lineHeight: 1.7, margin: '0 0 14px' }}>{p.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '14px' }}>
          {p.tech.map(t => (
            <span key={t} style={{
              backgroundColor: '#070f08', border: '1px solid #1c3a22', color: '#2d5e34',
              fontSize: '0.68rem', padding: '2px 7px', borderRadius: '4px',
              fontFamily: '"JetBrains Mono", monospace',
            }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        {p.links.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '0.78rem', color: p.color, textDecoration: 'none', fontWeight: 600 }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
          >{l.label} ↗</a>
        ))}
      </div>
    </div>
  )
}
