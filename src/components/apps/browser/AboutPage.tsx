const skillGroups = [
  { title: 'Languages', skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'Bash'], accent: '#8a78e8', bg: '#16103a' },
  { title: 'Frameworks', skills: ['React', 'Next.js', 'Express.js', 'ASP.NET', 'Tailwind CSS'], accent: '#00D4FF', bg: '#0a1e30' },
  { title: 'Tools', skills: ['Git', 'Docker', 'AWS', 'Azure', 'MongoDB', 'PostgreSQL'], accent: '#FF8C00', bg: '#1e1208' },
  { title: 'Concepts', skills: ['OOP', 'Design Patterns', 'REST APIs', 'Data Structures', 'CI/CD'], accent: '#00FF88', bg: '#0a1e14' },
]

const BEYOND_PILLS = [
  { label: 'Formula Student AI', color: '#FF8C00', bg: 'rgba(255,140,0,0.15)', border: 'rgba(255,140,0,0.3)' },
  { label: 'CS Academic Society Founder', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.3)' },
  { label: 'AI & Machine Learning', color: '#00D4FF', bg: 'rgba(0,212,255,0.1)', border: 'rgba(0,212,255,0.28)' },
]

const sectionLabelStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: '#00D4FF',
  textTransform: 'uppercase',
  borderLeft: '3px solid #00D4FF',
  paddingLeft: '10px',
  marginBottom: '18px',
}

export const AboutPage = () => (
  <div style={{
    maxWidth: '680px', margin: '0 auto',
    padding: '48px 32px 64px',
    fontFamily: 'Ubuntu, sans-serif',
    color: '#d8e8f5',
    backgroundColor: '#080d18',
    minHeight: '100%',
  }}>

    {/* INTRO */}
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      <div style={{
        flexShrink: 0, width: 88, height: 88, borderRadius: '50%',
        background: 'linear-gradient(145deg, #1e5ba0 0%, #2e1a80 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '20px', fontWeight: 700, color: 'rgba(255,255,255,0.9)',
        fontFamily: '"JetBrains Mono", monospace',
        boxShadow: '0 0 0 3px #00D4FF, 0 0 24px rgba(0,212,255,0.4)',
      }}>
        DC
      </div>
      <div style={{ paddingTop: '6px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#E8F4F8', margin: 0, letterSpacing: '-0.01em' }}>
          Dean Cimatu
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#00D4FF', marginTop: '5px', fontWeight: 500 }}>
          Software Engineering Student
        </p>
        <p style={{ fontSize: '0.82rem', color: '#8899AA', marginTop: '3px' }}>
          Hampton Hill, London
        </p>
        <p style={{
          fontSize: '0.9rem', color: '#a0b8d0', marginTop: '14px',
          lineHeight: 1.8, maxWidth: '440px',
        }}>
          Second-year BSc Computer Science student at Middlesex University London.
          I build real software — from browser-based OS simulations to full-stack platforms.
          Founder of the CS Academic Society and contributor to Formula Student AI.
        </p>
      </div>
    </div>

    <hr style={{ border: 'none', borderTop: '1px solid #1a2535', margin: '36px 0' }} />

    {/* SKILLS */}
    <div>
      <h2 style={sectionLabelStyle}>Skills</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {skillGroups.map(({ title, skills, accent, bg }) => (
          <div key={title} style={{
            backgroundColor: bg, borderRadius: '8px',
            padding: '16px', border: `1px solid ${accent}30`,
          }}>
            <p style={{
              fontSize: '10px', fontWeight: 700, color: accent,
              marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em',
              margin: '0 0 12px 0',
            }}>
              {title}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {skills.map(skill => (
                <span key={skill} style={{
                  backgroundColor: `${accent}20`,
                  color: accent,
                  border: `1px solid ${accent}40`,
                  fontSize: '11px', padding: '3px 9px', borderRadius: '4px',
                  fontFamily: '"JetBrains Mono", monospace',
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    <hr style={{ border: 'none', borderTop: '1px solid #1a2535', margin: '36px 0' }} />

    {/* EDUCATION */}
    <div>
      <h2 style={sectionLabelStyle}>Education</h2>
      <div style={{
        borderLeft: '3px solid #00D4FF',
        backgroundColor: '#0d1c2e', borderRadius: '0 10px 10px 0',
        padding: '18px 20px',
      }}>
        <p style={{ fontWeight: 600, color: '#E8F4F8', fontSize: '0.95rem', margin: '0 0 5px 0' }}>
          Middlesex University London
        </p>
        <p style={{ fontSize: '0.85rem', color: '#00D4FF', margin: '0 0 5px 0' }}>
          BSc Computer Science
        </p>
        <p style={{ fontSize: '0.78rem', color: '#c8894a', margin: 0 }}>
          Jan 2025 – Jul 2027 · Expected 1st
        </p>
      </div>
    </div>

    <hr style={{ border: 'none', borderTop: '1px solid #1a2535', margin: '36px 0' }} />

    {/* BEYOND CODE */}
    <div>
      <h2 style={sectionLabelStyle}>Beyond Code</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {BEYOND_PILLS.map(pill => (
          <span key={pill.label} style={{
            color: pill.color,
            backgroundColor: pill.bg,
            border: `1px solid ${pill.border}`,
            fontSize: '0.83rem', padding: '7px 15px', borderRadius: '6px',
            fontFamily: 'Ubuntu, sans-serif',
          }}>
            {pill.label}
          </span>
        ))}
      </div>
    </div>

  </div>
)
