const LANGUAGES = new Set(['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'Bash'])
const FRAMEWORKS = new Set(['React', 'Next.js', 'Express.js', 'ASP.NET', 'Tailwind', 'Tailwind CSS', 'Git'])
const TOOLS = new Set(['Docker', 'AWS', 'Azure', 'MongoDB', 'PostgreSQL'])

function getTechColor(tech: string): { color: string; bg: string; border: string } {
  if (LANGUAGES.has(tech))  return { color: '#4ade80', bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.25)' }
  if (FRAMEWORKS.has(tech)) return { color: '#86efac', bg: 'rgba(134,239,172,0.08)', border: 'rgba(134,239,172,0.2)' }
  if (TOOLS.has(tech))      return { color: '#a3c9a8', bg: 'rgba(163,201,168,0.08)', border: 'rgba(163,201,168,0.2)' }
  return                           { color: '#6b9470', bg: 'rgba(107,148,112,0.08)', border: 'rgba(107,148,112,0.2)' }
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '40px 0 18px' }}>
      <div style={{ width: '24px', height: '1px', backgroundColor: '#22c55e' }} />
      <span style={{
        fontSize: '0.68rem', color: '#4ade80',
        fontFamily: '"JetBrains Mono", monospace',
        letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600,
      }}>
        {text}
      </span>
    </div>
  )
}

function EntryRow({ title, right, sub, bullets, note }: {
  title: string
  right?: React.ReactNode
  sub?: string
  bullets?: string[]
  note?: string
}) {
  return (
    <div style={{ marginBottom: '22px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 700, color: '#f0fdf4', fontSize: '0.92rem' }}>{title}</span>
        {right && <span style={{ color: '#6b9470', fontSize: '0.78rem', whiteSpace: 'nowrap', fontFamily: '"JetBrains Mono", monospace' }}>{right}</span>}
      </div>
      {sub && <div style={{ color: '#4ade80', fontSize: '0.82rem', marginTop: '3px' }}>{sub}</div>}
      {note && <p style={{ color: '#6b9470', fontSize: '0.8rem', marginTop: '6px', marginBottom: 0 }}>{note}</p>}
      {bullets && (
        <ul style={{ margin: '6px 0 0 0', paddingLeft: '18px', color: '#a3c9a8', fontSize: '0.82rem', lineHeight: 1.8 }}>
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
    </div>
  )
}

const SKILLS_DATA = [
  { label: 'Languages',          items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'Bash'] },
  { label: 'Frameworks & Tools', items: ['React', 'Next.js', 'Express.js', 'ASP.NET', 'Tailwind', 'Git', 'Docker', 'AWS', 'Azure', 'MongoDB'] },
  { label: 'Concepts',           items: ['OOP', 'Design Patterns', 'REST APIs', 'Data Structures', 'CI/CD', 'Agile'] },
]

export const CVPage = () => {
  const handleDlEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = '#0c1f10'
    e.currentTarget.style.borderColor = '#4ade80'
    e.currentTarget.style.color = '#4ade80'
  }
  const handleDlLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent'
    e.currentTarget.style.borderColor = '#22c55e55'
    e.currentTarget.style.color = '#6b9470'
  }

  return (
    <div style={{
      fontFamily: 'Ubuntu, sans-serif',
      background: `
        radial-gradient(ellipse 60% 40% at 100% 0%, rgba(34,197,94,0.06) 0%, transparent 55%),
        #040d06
      `,
      minHeight: '100%',
    }}>
      <div style={{ maxWidth: '660px', margin: '0 auto', padding: '56px 40px 80px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '4px' }}>
          <div>
            <p style={{
              fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#4ade80', fontFamily: '"JetBrains Mono", monospace',
              marginBottom: '12px', fontWeight: 600,
            }}>
              CV
            </p>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f0fdf4', margin: '0 0 4px', letterSpacing: '-0.03em' }}>
              Dean Cimatu
            </h1>
            <p style={{ color: '#6b9470', fontSize: '0.9rem', margin: '0 0 12px' }}>
              Software Engineering Student
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '0.8rem', alignItems: 'center' }}>
              <a href="mailto:deancimatu@gmail.com" style={{ color: '#4ade80', textDecoration: 'none' }}>deancimatu@gmail.com</a>
              <span style={{ color: '#1c3a22' }}>·</span>
              <a href="https://github.com/Dean-Cimatu" target="_blank" rel="noopener noreferrer" style={{ color: '#a3c9a8', textDecoration: 'none' }}>github.com/deancimatu</a>
              <span style={{ color: '#1c3a22' }}>·</span>
              <a href="https://linkedin.com/in/deancimatu" target="_blank" rel="noopener noreferrer" style={{ color: '#a3c9a8', textDecoration: 'none' }}>linkedin.com/in/deancimatu</a>
              <span style={{ color: '#1c3a22' }}>·</span>
              <span style={{ color: '#3a5a3e' }}>Hampton Hill, London</span>
            </div>
          </div>
          <a
            href="#"
            style={{
              flexShrink: 0,
              border: '1px solid #22c55e55',
              color: '#6b9470',
              background: 'transparent',
              padding: '7px 14px',
              borderRadius: '6px',
              fontSize: '0.78rem',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background-color 0.15s, border-color 0.15s, color 0.15s',
              display: 'inline-block',
              fontFamily: '"JetBrains Mono", monospace',
            }}
            onMouseEnter={handleDlEnter}
            onMouseLeave={handleDlLeave}
          >
            Download PDF ↓
          </a>
        </div>

        {/* Education */}
        <SectionLabel text="Education" />
        <div style={{
          borderLeft: '3px solid #22c55e',
          backgroundColor: '#0c1f10', borderRadius: '0 10px 10px 0',
          padding: '16px 20px', marginBottom: '8px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontWeight: 700, color: '#f0fdf4', fontSize: '0.92rem' }}>Middlesex University London</span>
            <span style={{ color: '#6b9470', fontSize: '0.78rem', fontFamily: '"JetBrains Mono", monospace' }}>Jan 2025 – Jul 2027</span>
          </div>
          <div style={{ color: '#4ade80', fontSize: '0.82rem', marginTop: '3px' }}>BSc Computer Science · Targeting a 1st</div>
          <p style={{ color: '#6b9470', fontSize: '0.8rem', marginTop: '6px', marginBottom: 0 }}>
            Relevant modules: Data Structures &amp; Algorithms, Operating Systems, Web Applications, Software Engineering
          </p>
        </div>

        {/* Experience */}
        <SectionLabel text="Experience" />
        <EntryRow
          title="Founder & President, CS Academic Society"
          right="2025 – Present"
          sub="Middlesex University"
          bullets={[
            'Founded the university\'s first CS society',
            'Organising workshops, hackathons, and industry speaker events',
          ]}
        />
        <EntryRow
          title="Course Ambassador, CS Department"
          right="2025 – Present"
          sub="Middlesex University"
          bullets={['Representing the CS course to prospective students at open days']}
        />
        <EntryRow
          title="Computer Vision Contributor, Formula Student"
          right="2025 – Present"
          sub="MDX Racing"
          bullets={['Developing YOLO-based cone detection for autonomous racing']}
        />

        {/* Projects */}
        <SectionLabel text="Projects" />
        <EntryRow
          title="DeanOS"
          right={<a href="https://github.com/Dean-Cimatu/deanos" target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80', textDecoration: 'none' }}>github ↗</a>}
          bullets={[
            'Browser-based OS simulation built as a portfolio piece with a full desktop experience',
            'React 18, TypeScript, Vite, Zustand, Framer Motion',
            'Window manager, draggable icons, terminal emulator, and browser app with routing',
          ]}
        />
        <EntryRow
          title="Car Hire System"
          right={<a href="https://github.com/Dean-Cimatu/carhire" target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80', textDecoration: 'none' }}>github ↗</a>}
          bullets={[
            'Full-stack car hire platform with custom BST & HashTable data structures',
            'C#, ASP.NET Core, Azure SQL, Google OAuth, Stripe payments, NUnit tests',
            'Integrated AI chatbot for customer support',
          ]}
        />
        <EntryRow
          title="StudyBuddy"
          right={<a href="https://github.com/Dean-Cimatu/studybuddy" target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80', textDecoration: 'none' }}>github ↗</a>}
          bullets={[
            'AI-powered study assistant built in 5 hours at a hackathon',
            'Express.js, MongoDB, JWT auth, Claude API integration',
          ]}
        />

        {/* Skills */}
        <SectionLabel text="Skills" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {SKILLS_DATA.map(({ label, items }) => (
              <div key={label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <span style={{
                  color: '#6b9470', fontWeight: 600, fontSize: '0.78rem',
                  minWidth: '140px', flexShrink: 0, paddingTop: '3px',
                  fontFamily: '"JetBrains Mono", monospace',
                }}>
                  {label}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {items.map(item => {
                    const c = getTechColor(item)
                    return (
                      <span key={item} style={{
                        backgroundColor: c.bg, color: c.color,
                        border: `1px solid ${c.border}`,
                        fontSize: '0.72rem', padding: '3px 9px',
                        borderRadius: '5px', fontFamily: '"JetBrains Mono", monospace',
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
    </div>
  )
}
