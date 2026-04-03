import { useRef } from 'react'

type Status = 'Live' | 'In Progress' | 'Complete'

interface Project {
  name: string
  description: string
  tech: string[]
  status: Status
  links: { label: string; href: string }[]
  color: string
}

const PROJECTS: Project[] = [
  {
    name: 'DeanOS',
    description: 'A browser-based OS simulation built as a portfolio piece. Every interaction feels like a real desktop — draggable windows, terminal, apps, and more.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Zustand', 'Framer Motion'],
    status: 'Live',
    color: '#00D4FF',
    links: [
      { label: 'GitHub', href: 'https://github.com/Dean-Cimatu/deanos' },
      { label: 'Live ↗', href: 'https://deancimatu.com' },
    ],
  },
  {
    name: 'Car Hire System',
    description: 'Full-stack car hire platform with custom BST & HashTable data structures, Google OAuth, Stripe, and an AI chatbot for customer support.',
    tech: ['C#', 'ASP.NET Core', 'Azure SQL', 'Google OAuth', 'Stripe', 'NUnit'],
    status: 'Live',
    color: '#00FF88',
    links: [
      { label: 'GitHub', href: 'https://github.com/Dean-Cimatu/CST2550-Car-Hire-System' },
      { label: 'Live ↗', href: 'https://carhire.deancimatu.com' },
    ],
  },
  {
    name: 'StudyBuddy',
    description: 'AI study companion webapp. Chat with Claude to generate personalised study task lists, track XP, climb the leaderboard, digest video content into notes, and manage a wellbeing hub.',
    tech: ['React', 'Node.js', 'Claude API', 'OpenAI API', 'MongoDB'],
    status: 'In Progress',
    color: '#8a78e8',
    links: [
      { label: 'GitHub', href: 'https://github.com/Dean-Cimatu/Hackathon' },
    ],
  },
  {
    name: 'DesignPatternCLI',
    description: 'Java CLI tool demonstrating 6 Gang of Four design patterns with interactive, runnable examples from the command line.',
    tech: ['Java', 'Maven'],
    status: 'Complete',
    color: '#FF8C00',
    links: [
      { label: 'GitHub', href: 'https://github.com/Dean-Cimatu/DesignPatterns' },
    ],
  },
]

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; border: string }> = {
  Live:          { label: 'Live',        color: '#00FF88', bg: '#0a2018', border: '#1e4832' },
  'In Progress': { label: 'In Progress', color: '#c8894a', bg: '#201508', border: '#3d2810' },
  Complete:      { label: 'Complete',    color: '#8899AA', bg: '#141e2c', border: '#253040' },
}

// Color-code tech pills by category
const LANGUAGES = new Set(['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'Bash', 'Lua'])
const FRAMEWORKS = new Set(['React', 'Next.js', 'Express.js', 'ASP.NET', 'ASP.NET Core', 'Tailwind', 'Tailwind CSS', 'Vite', 'Zustand', 'Framer Motion', 'Node.js'])
const TOOLS = new Set(['Git', 'Docker', 'AWS', 'Azure', 'Azure SQL', 'MongoDB', 'PostgreSQL', 'NUnit', 'Maven', 'Stripe', 'Google OAuth', 'OAuth', 'Claude API', 'OpenAI API'])

function getTechColor(tech: string): string {
  if (LANGUAGES.has(tech)) return '#8a78e8'
  if (FRAMEWORKS.has(tech)) return '#00D4FF'
  if (TOOLS.has(tech)) return '#FF8C00'
  return '#8899AA'
}

export const ProjectsPage = () => (
  <div style={{
    maxWidth: '740px', margin: '0 auto', padding: '48px 32px 64px',
    fontFamily: 'Ubuntu, sans-serif',
    backgroundColor: '#080d18', minHeight: '100%',
  }}>
    <div style={{ marginBottom: '36px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#E8F4F8', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
        Projects
      </h1>
      {/* Colored underline bar */}
      <div style={{ width: '48px', height: '3px', background: 'linear-gradient(90deg, #00D4FF, #8a78e8)', borderRadius: '2px', marginBottom: '12px' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <p style={{ color: '#8899AA', margin: 0, fontSize: '0.88rem' }}>
          Things I've built, shipped, and learned from
        </p>
        <span style={{
          backgroundColor: 'rgba(0,212,255,0.12)', color: '#00D4FF',
          border: '1px solid rgba(0,212,255,0.28)',
          fontSize: '0.7rem', fontFamily: '"JetBrains Mono", monospace',
          padding: '2px 9px', borderRadius: '12px', fontWeight: 600,
        }}>
          4 projects
        </span>
      </div>
    </div>

    {PROJECTS.map((project) => (
      <ProjectCard key={project.name} project={project} />
    ))}
  </div>
)

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const s = STATUS_CONFIG[project.status]
  const color = project.color

  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return
        ref.current.style.borderColor = `${color}66`
        ref.current.style.transform = 'translateY(-2px)'
        ref.current.style.boxShadow = `0 10px 32px rgba(0,0,0,0.4), 0 0 16px ${color}18`
      }}
      onMouseLeave={() => {
        if (!ref.current) return
        ref.current.style.borderColor = `${color}22`
        ref.current.style.transform = 'translateY(0)'
        ref.current.style.boxShadow = 'none'
      }}
      style={{
        backgroundColor: '#0d1828',
        background: `linear-gradient(135deg, ${color}0d 0%, #0d1828 40%)`,
        border: `1px solid ${color}22`,
        borderLeft: `3px solid ${color}`,
        borderRadius: '10px',
        padding: '22px 24px',
        marginBottom: '14px',
        transition: 'border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontWeight: 700, color: '#E8F4F8', fontSize: '1.05rem', fontFamily: 'Ubuntu, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color, fontSize: '0.8rem' }}>●</span>
          {project.name}
        </span>
        <span style={{
          backgroundColor: s.bg, color: s.color,
          border: `1px solid ${s.border}`,
          fontSize: '0.72rem', padding: '4px 10px',
          borderRadius: '5px', fontWeight: 600,
          fontFamily: '"JetBrains Mono", monospace',
          display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0,
          boxShadow: project.status === 'Live' ? `0 0 8px ${color}66` : 'none',
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: s.color, display: 'inline-block' }} />
          {s.label}
        </span>
      </div>

      {/* Description */}
      <p style={{ color: '#8899AA', fontSize: '0.86rem', lineHeight: 1.7, margin: 0, marginBottom: '14px' }}>
        {project.description}
      </p>

      {/* Tech pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
        {project.tech.map((t) => {
          const tc = getTechColor(t)
          return (
            <span key={t} style={{
              backgroundColor: `${tc}15`, color: tc,
              border: `1px solid ${tc}30`,
              fontSize: '0.68rem', padding: '3px 9px',
              borderRadius: '4px', fontFamily: '"JetBrains Mono", monospace',
            }}>
              {t}
            </span>
          )
        })}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '18px' }}>
        {project.links.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '0.8rem', color, textDecoration: 'none', fontFamily: 'Ubuntu, sans-serif', fontWeight: 600 }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}
