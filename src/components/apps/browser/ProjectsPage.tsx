import { useRef } from 'react'

type Status = 'Live' | 'In Progress' | 'Complete'

interface Project {
  name: string
  description: string
  tech: string[]
  status: Status
  links: { label: string; href: string; icon: string }[]
}

const PROJECTS: Project[] = [
  {
    name: 'DeanOS',
    description: 'A browser-based OS simulation built as a portfolio piece. Every interaction feels like a real desktop.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Zustand', 'Framer Motion'],
    status: 'Live',
    links: [
      { label: 'GitHub', href: 'https://github.com/deancimatu/deanos', icon: '⌥' },
      { label: 'Live', href: 'https://deancimatu.com', icon: '↗' },
    ],
  },
  {
    name: 'Car Hire System',
    description: 'Full-stack car hire platform with custom BST & HashTable data structures, Google OAuth, Stripe, and an AI chatbot.',
    tech: ['C#', 'ASP.NET Core', 'Azure SQL', 'Google OAuth', 'Stripe', 'NUnit'],
    status: 'Live',
    links: [
      { label: 'GitHub', href: 'https://github.com/deancimatu/carhire', icon: '⌥' },
      { label: 'Live', href: 'https://carhire.deancimatu.com', icon: '↗' },
    ],
  },
  {
    name: 'StudyBuddy',
    description: 'AI-powered study assistant built in 5 hours at a hackathon. JWT auth, MongoDB, Claude API integration.',
    tech: ['Express.js', 'MongoDB', 'JWT', 'Claude API'],
    status: 'Complete',
    links: [
      { label: 'GitHub', href: 'https://github.com/deancimatu/studybuddy', icon: '⌥' },
    ],
  },
  {
    name: 'DesignPatternCLI',
    description: 'Command-line tool demonstrating 6 Gang of Four design patterns with interactive examples.',
    tech: ['Java', 'Maven'],
    status: 'Complete',
    links: [
      { label: 'GitHub', href: 'https://github.com/deancimatu/designpatterncli', icon: '⌥' },
    ],
  },
  {
    name: 'AutoKart',
    description: 'Autonomous go-kart using LiDAR, SLAM, and a Draw-a-Track interface. Raspberry Pi 5 powered.',
    tech: ['Raspberry Pi 5', 'Python', 'LiDAR', 'SLAM', 'OpenCV'],
    status: 'In Progress',
    links: [
      { label: 'GitHub', href: 'https://github.com/deancimatu/autokart', icon: '⌥' },
    ],
  },
  {
    name: 'Formula Student AI',
    description: 'Cone detection system for MDX Formula Student racing car using computer vision.',
    tech: ['Python', 'OpenCV', 'YOLO'],
    status: 'In Progress',
    links: [
      { label: 'GitHub', href: 'https://github.com/deancimatu/formula-student-ai', icon: '⌥' },
    ],
  },
  {
    name: 'SchoolBase',
    description: 'Full-stack school management platform. Built to learn Next.js + PostgreSQL production patterns.',
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'TypeScript'],
    status: 'In Progress',
    links: [
      { label: 'GitHub', href: 'https://github.com/deancimatu/schoolbase', icon: '⌥' },
    ],
  },
]

const STATUS_STYLES: Record<Status, { bg: string; color: string }> = {
  Live: { bg: '#4ade80', color: '#052e16' },
  'In Progress': { bg: '#facc15', color: '#1c1917' },
  Complete: { bg: '#94a3b8', color: '#0f172a' },
}

export const ProjectsPage = () => (
  <div style={{ maxWidth: '768px', margin: '0 auto', padding: '48px 32px' }}>
    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#E8F4F8', margin: 0 }}>
      Projects
    </h1>
    <p style={{ color: '#8899AA', marginTop: '8px', marginBottom: '32px', fontSize: '0.95rem' }}>
      Things I've built, shipped, and learned from
    </p>

    {PROJECTS.map((project) => (
      <ProjectCard key={project.name} project={project} />
    ))}
  </div>
)

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const badge = STATUS_STYLES[project.status]

  const handleMouseEnter = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translateY(-4px)'
    ref.current.style.borderColor = '#00D4FF'
  }
  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translateY(0)'
    ref.current.style.borderColor = '#2A3F5F'
  }

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: '#1E2D45',
        border: '1px solid #2A3F5F',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '16px',
        transition: 'transform 150ms ease, border-color 150ms ease',
      }}
    >
      {/* Top row: name + status badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 700, color: '#00D4FF', fontSize: '1.0625rem' }}>
          {project.name}
        </span>
        <span
          style={{
            backgroundColor: badge.bg,
            color: badge.color,
            fontSize: '0.7rem',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p style={{ color: '#8899AA', fontSize: '0.85rem', marginTop: '8px', lineHeight: 1.6, marginBottom: 0 }}>
        {project.description}
      </p>

      {/* Tech pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              backgroundColor: '#0A0F1E',
              color: '#E8F4F8',
              fontSize: '0.7rem',
              padding: '3px 8px',
              borderRadius: '4px',
              fontFamily: '"JetBrains Mono", monospace',
              border: '1px solid #2A3F5F',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.8rem',
              color: '#00D4FF',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            <span>{link.icon}</span>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}
