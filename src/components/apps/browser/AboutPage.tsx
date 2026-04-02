const skillGroups = [
  { title: 'Languages', skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'Bash'], accent: '#8a78e8', bg: '#1a1a38' },
  { title: 'Frameworks', skills: ['React', 'Next.js', 'Express.js', 'ASP.NET', 'Tailwind CSS'], accent: '#00D4FF', bg: '#0e2230' },
  { title: 'Tools', skills: ['Git', 'Docker', 'AWS', 'Azure', 'MongoDB', 'PostgreSQL'], accent: '#c8894a', bg: '#251a0e' },
  { title: 'Concepts', skills: ['OOP', 'Design Patterns', 'REST APIs', 'Data Structures', 'CI/CD'], accent: '#4dba8c', bg: '#0e2218' },
]

export const AboutPage = () => (
  <div style={{
    maxWidth: '640px', margin: '0 auto',
    padding: '48px 32px 64px',
    fontFamily: 'Ubuntu, sans-serif',
    color: '#d8e8f5',
  }}>

    {/* INTRO */}
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      <div style={{
        flexShrink: 0, width: 72, height: 72, borderRadius: '50%',
        background: 'linear-gradient(145deg, #1e5ba0 0%, #2e1a80 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '18px', fontWeight: 700, color: 'rgba(255,255,255,0.9)',
        fontFamily: '"JetBrains Mono", monospace',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}>
        DC
      </div>
      <div style={{ paddingTop: '4px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#dce8f6', margin: 0, letterSpacing: '-0.01em' }}>
          Dean Cimatu
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#00D4FF', marginTop: '4px', fontWeight: 400 }}>
          Software Engineering Student
        </p>
        <p style={{ fontSize: '0.82rem', color: '#4d6580', marginTop: '3px' }}>
          Hampton Hill, London
        </p>
        <p style={{
          fontSize: '0.87rem', color: '#7d95af', marginTop: '12px',
          lineHeight: 1.75, maxWidth: '440px',
        }}>
          Second-year BSc Computer Science student at Middlesex University London.
          I build real software — from browser-based OS simulations to full-stack platforms.
          Founder of the CS Academic Society and contributor to Formula Student AI.
        </p>
      </div>
    </div>

    {/* SKILLS */}
    <div style={{ marginTop: '44px' }}>
      <h2 style={{
        fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
        color: '#4d6580', textTransform: 'uppercase',
        borderBottom: '1px solid #1e2d40', paddingBottom: '8px', marginBottom: '18px',
      }}>
        Skills
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {skillGroups.map(({ title, skills, accent, bg }) => (
          <div key={title} style={{
            backgroundColor: bg, borderRadius: '8px',
            padding: '14px', border: `1px solid ${accent}22`,
          }}>
            <p style={{
              fontSize: '11px', fontWeight: 700, color: accent,
              marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              {title}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {skills.map(skill => (
                <span key={skill} style={{
                  backgroundColor: 'rgba(0,0,0,0.25)', color: '#c4d8ec',
                  fontSize: '11px', padding: '3px 8px', borderRadius: '4px',
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

    {/* EDUCATION */}
    <div style={{ marginTop: '40px' }}>
      <h2 style={{
        fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
        color: '#4d6580', textTransform: 'uppercase',
        borderBottom: '1px solid #1e2d40', paddingBottom: '8px', marginBottom: '18px',
      }}>
        Education
      </h2>
      <div style={{
        borderLeft: '2px solid #00D4FF', paddingLeft: '18px',
        backgroundColor: '#18243a', borderRadius: '0 8px 8px 0',
        padding: '16px 18px 16px 20px',
      }}>
        <p style={{ fontWeight: 600, color: '#d8e8f5', fontSize: '0.92rem' }}>
          Middlesex University London
        </p>
        <p style={{ fontSize: '0.84rem', color: '#00D4FF', marginTop: '4px' }}>
          BSc Computer Science
        </p>
        <p style={{ fontSize: '0.78rem', color: '#c8894a', marginTop: '4px' }}>
          Jan 2025 – Jul 2027 · Expected 1
        </p>
      </div>
    </div>

    {/* BEYOND CODE */}
    <div style={{ marginTop: '40px' }}>
      <h2 style={{
        fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
        color: '#4d6580', textTransform: 'uppercase',
        borderBottom: '1px solid #1e2d40', paddingBottom: '8px', marginBottom: '18px',
      }}>
        Beyond Code
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['Formula Student AI', 'CS Academic Society Founder', 'AI & Machine Learning'].map(label => (
          <span key={label} style={{
            backgroundColor: '#18243a', border: '1px solid #253a55',
            color: '#a4bcce', fontSize: '0.82rem', padding: '6px 14px', borderRadius: '6px',
            fontFamily: 'Ubuntu, sans-serif',
          }}>
            {label}
          </span>
        ))}
      </div>
    </div>

  </div>
)
