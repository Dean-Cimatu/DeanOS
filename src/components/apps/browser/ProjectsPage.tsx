import { useRef } from 'react'

type Status = 'Live' | 'In Progress' | 'Complete'

interface Project {
  name: string
  description: string
  tech: string[]
  status: Status
  links: { label: string; href: string }[]
}

const PROJECTS: Project[] = [
  {
    name: 'DeanOS',
    description: 'A browser-based OS simulation built as a portfolio piece. Every interaction feels like a real desktop — draggable windows, terminal, apps, and more.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Zustand', 'Framer Motion'],
    status: 'Live',
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
    links: [
      { label: 'GitHub', href: 'https://github.com/Dean-Cimatu/carhire' },
      { label: 'Live ↗', href: 'https://carhire.deancimatu.com' },
    ],
  },
  {
    name: 'StudyBuddy',
    description: 'AI study companion webapp. Chat with Claude to generate personalised study task lists, track XP, climb the leaderboard, digest video content into notes, and manage a wellbeing hub.',
    tech: ['React', 'Node.js', 'Claude API', 'OpenAI API', 'MongoDB'],
    status: 'In Progress',
    links: [
      { label: 'GitHub', href: 'https://github.com/Dean-Cimatu/studybuddy' },
    ],
  },
  {
    name: 'DesignPatternCLI',
    description: 'Java CLI tool demonstrating 6 Gang of Four design patterns with interactive, runnable examples from the command line.',
    tech: ['Java', 'Maven'],
    status: 'Complete',
    links: [
      { label: 'GitHub', href: 'https://github.com/Dean-Cimatu/designpatterncli' },
    ],
  },
  {
    name: 'AutoKart',
    description: 'Autonomous go-kart using LiDAR, SLAM, and a Draw-a-Track interface. Powered by Raspberry Pi 5.',
    tech: ['Python', 'Raspberry Pi 5', 'LiDAR', 'SLAM', 'OpenCV'],
    status: 'In Progress',
    links: [
      { label: 'GitHub', href: 'https://github.com/Dean-Cimatu/autokart' },
    ],
  },
  {
    name: 'Formula Student AI',
    description: 'Cone detection system for the MDX Formula Student racing car using computer vision.',
    tech: ['Python', 'OpenCV', 'YOLO'],
    status: 'In Progress',
    links: [
      { label: 'GitHub', href: 'https://github.com/Dean-Cimatu/formula-student-ai' },
    ],
  },
  {
    name: 'SchoolBase',
    description: 'Full-stack school management platform built to explore Next.js and PostgreSQL production patterns.',
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'TypeScript'],
    status: 'In Progress',
    links: [
      { label: 'GitHub', href: 'https://github.com/Dean-Cimatu/schoolbase' },
    ],
  },
]

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; border: string; dot: string }> = {
  Live:          { label: 'Live',        color: '#4dba8c', bg: '#0d2218', border: '#1e4832', dot: '#4dba8c' },
  'In Progress': { label: 'In Progress', color: '#c8894a', bg: '#201508', border: '#3d2810', dot: '#c8894a' },
  Complete:      { label: 'Complete',    color: '#7d95af', bg: '#141e2c', border: '#253040', dot: '#7d95af' },
}

export const ProjectsPage = () => (
  <div style={{ maxWidth: '740px', margin: '0 auto', padding: '48px 32px 64px', fontFamily: 'Ubuntu, sans-serif' }}>
    <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#dce8f6', margin: 0, letterSpacing: '-0.01em' }}>
      Projects
    </h1>
    <p style={{ color: '#4d6580', marginTop: '6px', marginBottom: '32px', fontSize: '0.88rem' }}>
      Things I've built, shipped, and learned from
    </p>

    {PROJECTS.map((project) => (
      <ProjectCard key={project.name} project={project} />
    ))}
  </div>
)

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const s = STATUS_CONFIG[project.status]

  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return
        ref.current.style.borderColor = '#344f6e'
        ref.current.style.backgroundColor = '#1c2a42'
      }}
      onMouseLeave={() => {
        if (!ref.current) return
        ref.current.style.borderColor = '#253a55'
        ref.current.style.backgroundColor = '#18243a'
      }}
      style={{
        backgroundColor: '#18243a',
        border: '1px solid #253a55',
        borderRadius: '10px',
        padding: '22px 24px',
        marginBottom: '14px',
        transition: 'background-color 0.15s ease, border-color 0.15s ease',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontWeight: 600, color: '#dce8f6', fontSize: '1rem', fontFamily: 'Ubuntu, sans-serif' }}>
          {project.name}
        </span>
        <span style={{
          backgroundColor: s.bg, color: s.color,
          border: `1px solid ${s.border}`,
          fontSize: '0.68rem', padding: '3px 9px',
          borderRadius: '5px', fontWeight: 600,
          fontFamily: '"JetBrains Mono", monospace',
          display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: s.dot, display: 'inline-block' }} />
          {s.label}
        </span>
      </div>

      {/* Description */}
      <p style={{ color: '#7d95af', fontSize: '0.84rem', lineHeight: 1.65, margin: 0, marginBottom: '14px' }}>
        {project.description}
      </p>

      {/* Tech pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
        {project.tech.map((t) => (
          <span key={t} style={{
            backgroundColor: '#111c2e', color: '#8298b0',
            fontSize: '0.68rem', padding: '3px 8px',
            borderRadius: '4px', fontFamily: '"JetBrains Mono", monospace',
            border: '1px solid #1e3045',
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '18px' }}>
        {project.links.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '0.8rem', color: '#00D4FF', textDecoration: 'none', fontFamily: 'Ubuntu, sans-serif' }}
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
