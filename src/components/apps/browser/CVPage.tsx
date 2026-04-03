// Color constants for sections
const C = {
  education: '#00D4FF',
  experience: '#00FF88',
  projects: '#8a78e8',
  skills: '#FF8C00',
}

// Tech pill color-coding (same as ProjectsPage)
const LANGUAGES = new Set(['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'Bash', 'Lua'])
const FRAMEWORKS = new Set(['React', 'Next.js', 'Express.js', 'ASP.NET', 'Tailwind', 'Tailwind CSS', 'Git'])
const TOOLS = new Set(['Docker', 'AWS', 'Azure', 'MongoDB', 'PostgreSQL'])
const CONCEPTS_COLOR = '#00FF88'

function getTechColor(tech: string): string {
  if (LANGUAGES.has(tech)) return '#8a78e8'
  if (FRAMEWORKS.has(tech)) return '#00D4FF'
  if (TOOLS.has(tech)) return '#FF8C00'
  return CONCEPTS_COLOR
}

function sectionHeading(_label: string, color: string): React.CSSProperties {
  return {
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    color,
    textTransform: 'uppercase',
    background: `linear-gradient(90deg, ${color}20 0%, transparent 60%)`,
    borderLeft: `3px solid ${color}`,
    padding: '6px 14px',
    borderRadius: '0 6px 6px 0',
    margin: '32px 0 16px',
  }
}

const s = {
  page: {
    maxWidth: '672px',
    margin: '0 auto',
    padding: '48px 32px',
    fontFamily: 'Ubuntu, sans-serif',
    color: '#E8F4F8',
    backgroundColor: '#080d18',
    minHeight: '100%',
  } as React.CSSProperties,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px',
  } as React.CSSProperties,
  name: {
    fontSize: '2.2rem',
    fontWeight: 800,
    color: '#E8F4F8',
    margin: 0,
    letterSpacing: '-0.02em',
  } as React.CSSProperties,
  tagline: {
    color: '#8a78e8',
    marginTop: '5px',
    fontSize: '0.9rem',
    fontWeight: 500,
  } as React.CSSProperties,
  contactRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '4px',
    marginTop: '10px',
    alignItems: 'center',
    fontSize: '0.8rem',
  } as React.CSSProperties,
  divider: {
    color: '#4A5568',
  } as React.CSSProperties,
  entryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: '8px',
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,
  entryTitle: {
    fontWeight: 700,
    color: '#E8F4F8',
    fontSize: '0.92rem',
  } as React.CSSProperties,
  entryDate: {
    color: '#c8894a',
    fontSize: '0.78rem',
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties,
  bullets: {
    margin: '6px 0 0 0',
    paddingLeft: '18px',
    color: '#8899AA',
    fontSize: '0.82rem',
    lineHeight: 1.7,
  } as React.CSSProperties,
  modules: {
    color: '#8899AA',
    fontSize: '0.8rem',
    marginTop: '6px',
  } as React.CSSProperties,
  entryBlock: {
    marginBottom: '20px',
  } as React.CSSProperties,
}

const SKILLS_DATA = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'Bash'],
  },
  {
    label: 'Frameworks & Tools',
    items: ['React', 'Next.js', 'Express.js', 'ASP.NET', 'Tailwind', 'Git', 'Docker', 'AWS', 'Azure', 'MongoDB'],
  },
  {
    label: 'Concepts',
    items: ['OOP', 'Design Patterns', 'REST APIs', 'Data Structures', 'CI/CD', 'Agile'],
  },
]

export const CVPage = () => {
  const handleDownloadEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'linear-gradient(90deg, #00D4FF22, #8a78e822)'
    e.currentTarget.style.borderColor = '#a78bfa'
  }
  const handleDownloadLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'transparent'
    e.currentTarget.style.borderColor = '#00D4FF'
  }

  return (
    <div style={s.page}>

      {/* HEADER */}
      <div style={s.header}>
        <div>
          <h1 style={s.name}>Dean Cimatu</h1>
          <p style={s.tagline}>Software Engineering Student</p>
          <div style={s.contactRow}>
            <a href="mailto:deancimatu@gmail.com" style={{ color: '#FF8C00', textDecoration: 'none' }}>deancimatu@gmail.com</a>
            <span style={s.divider}>·</span>
            <a href="https://github.com/Dean-Cimatu" target="_blank" rel="noopener noreferrer" style={{ color: '#C8D8E8', textDecoration: 'none' }}>github.com/deancimatu</a>
            <span style={s.divider}>·</span>
            <a href="https://linkedin.com/in/deancimatu" target="_blank" rel="noopener noreferrer" style={{ color: '#00D4FF', textDecoration: 'none' }}>linkedin.com/in/deancimatu</a>
            <span style={s.divider}>·</span>
            <span style={{ color: '#8899AA' }}>Hampton Hill, London</span>
          </div>
        </div>
        <a
          href="#"
          style={{
            flexShrink: 0,
            border: '1px solid #00D4FF',
            color: '#00D4FF',
            background: 'transparent',
            padding: '6px 14px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap' as const,
            transition: 'background 0.15s, border-color 0.15s',
            display: 'inline-block',
          }}
          onMouseEnter={handleDownloadEnter}
          onMouseLeave={handleDownloadLeave}
        >
          Download PDF ↓
        </a>
      </div>

      {/* EDUCATION */}
      <h2 style={sectionHeading('Education', C.education)}>Education</h2>
      <div style={s.entryBlock}>
        <div style={s.entryRow}>
          <span style={s.entryTitle}>Middlesex University London</span>
          <span style={{ ...s.entryDate, color: '#c8894a' }}>Jan 2025 – Jul 2027</span>
        </div>
        <div style={{ color: C.education, fontSize: '0.82rem', marginTop: '2px' }}>BSc Computer Science · Expected 2:1</div>
        <p style={s.modules}>
          Relevant modules: Data Structures &amp; Algorithms, Operating Systems, Web Applications, Software Engineering
        </p>
      </div>

      {/* EXPERIENCE */}
      <h2 style={sectionHeading('Experience', C.experience)}>Experience</h2>

      <div style={s.entryBlock}>
        <div style={s.entryRow}>
          <span style={s.entryTitle}>Founder &amp; President, CS Academic Society</span>
          <span style={s.entryDate}>2025 – Present</span>
        </div>
        <div style={{ color: C.experience, fontSize: '0.82rem', marginTop: '2px' }}>Middlesex University</div>
        <ul style={s.bullets}>
          <li>Founded and grew the university's first CS society</li>
          <li>Organising workshops, hackathons, and industry speaker events</li>
        </ul>
      </div>

      <div style={s.entryBlock}>
        <div style={s.entryRow}>
          <span style={s.entryTitle}>Course Ambassador, CS Department</span>
          <span style={s.entryDate}>2025 – Present</span>
        </div>
        <div style={{ color: C.experience, fontSize: '0.82rem', marginTop: '2px' }}>Middlesex University</div>
        <ul style={s.bullets}>
          <li>Representing the CS course to prospective students at open days</li>
        </ul>
      </div>

      <div style={s.entryBlock}>
        <div style={s.entryRow}>
          <span style={s.entryTitle}>Computer Vision Contributor, Formula Student</span>
          <span style={s.entryDate}>2025 – Present</span>
        </div>
        <div style={{ color: C.experience, fontSize: '0.82rem', marginTop: '2px' }}>MDX Racing</div>
        <ul style={s.bullets}>
          <li>Developing YOLO-based cone detection for autonomous racing</li>
        </ul>
      </div>

      {/* PROJECTS */}
      <h2 style={sectionHeading('Projects', C.projects)}>Projects</h2>

      <div style={s.entryBlock}>
        <div style={s.entryRow}>
          <span style={s.entryTitle}>DeanOS</span>
          <a href="https://github.com/Dean-Cimatu/deanos" target="_blank" rel="noopener noreferrer" style={{ ...s.entryDate, color: C.projects, textDecoration: 'none' }}>github ↗</a>
        </div>
        <ul style={s.bullets}>
          <li>Browser-based OS simulation built as a portfolio piece with a full desktop experience</li>
          <li>React 18, TypeScript, Vite, Tailwind CSS, Zustand, Framer Motion</li>
          <li>Window manager, draggable icons, terminal emulator, and browser app with routing</li>
        </ul>
      </div>

      <div style={s.entryBlock}>
        <div style={s.entryRow}>
          <span style={s.entryTitle}>Car Hire System</span>
          <a href="https://github.com/Dean-Cimatu/carhire" target="_blank" rel="noopener noreferrer" style={{ ...s.entryDate, color: C.projects, textDecoration: 'none' }}>github ↗</a>
        </div>
        <ul style={s.bullets}>
          <li>Full-stack car hire platform with custom BST &amp; HashTable data structures</li>
          <li>C#, ASP.NET Core, Azure SQL, Google OAuth, Stripe payments, NUnit tests</li>
          <li>Integrated AI chatbot for customer support</li>
        </ul>
      </div>

      <div style={s.entryBlock}>
        <div style={s.entryRow}>
          <span style={s.entryTitle}>StudyBuddy</span>
          <a href="https://github.com/Dean-Cimatu/studybuddy" target="_blank" rel="noopener noreferrer" style={{ ...s.entryDate, color: C.projects, textDecoration: 'none' }}>github ↗</a>
        </div>
        <ul style={s.bullets}>
          <li>AI-powered study assistant built in 5 hours at a hackathon</li>
          <li>Express.js, MongoDB, JWT auth, Claude API integration</li>
        </ul>
      </div>

      {/* SKILLS */}
      <h2 style={sectionHeading('Skills', C.skills)}>Skills</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {SKILLS_DATA.map(({ label, items }) => (
          <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap' as const }}>
            <span style={{
              color: C.skills, fontWeight: 700, fontSize: '0.78rem',
              minWidth: '140px', flexShrink: 0, paddingTop: '3px',
            }}>
              {label}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {items.map(item => {
                const tc = getTechColor(item)
                return (
                  <span key={item} style={{
                    backgroundColor: `${tc}15`, color: tc,
                    border: `1px solid ${tc}30`,
                    fontSize: '0.7rem', padding: '2px 8px',
                    borderRadius: '4px', fontFamily: '"JetBrains Mono", monospace',
                  }}>
                    {item}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
