const STACK_NOW = ['TypeScript', 'React', 'Python', 'C#', 'ASP.NET', 'Zustand', 'Framer Motion']
const STACK_ALSO = ['Java', 'Docker', 'AWS', 'Azure', 'MongoDB', 'PostgreSQL', 'Next.js']

const NOW = [
  { label: 'DeanOS', detail: 'The OS you\'re inside right now.' },
  { label: 'StudyBuddy', detail: 'AI study companion — Claude API + gamification.' },
  { label: 'Formula Student AI', detail: 'YOLO cone detection for autonomous racing.' },
]

export const AboutPage = () => (
  <div style={{
    fontFamily: 'Ubuntu, sans-serif',
    background: `
      radial-gradient(ellipse 60% 40% at 100% 0%, rgba(34,197,94,0.06) 0%, transparent 55%),
      #040d06
    `,
    minHeight: '100%',
  }}>
    <div style={{ maxWidth: '660px', margin: '0 auto', padding: '64px 40px 80px' }}>

      {/* Opening statement */}
      <div style={{ marginBottom: '56px' }}>
        <p style={{
          fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: '#4ade80', fontFamily: '"JetBrains Mono", monospace',
          marginBottom: '20px', fontWeight: 600,
        }}>
          About
        </p>
        <h1 style={{
          fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.15,
          color: '#f0fdf4', fontFamily: 'Ubuntu, sans-serif',
          letterSpacing: '-0.03em', margin: '0 0 20px',
        }}>
          I build software
          <br />
          <span style={{
            background: 'linear-gradient(90deg, #4ade80, #22c55e)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            that ships.
          </span>
        </h1>
        <p style={{
          fontSize: '1rem', color: '#6b9470', lineHeight: 1.85,
          maxWidth: '540px', margin: 0,
        }}>
          Second-year CS student at Middlesex University, London. I care about the craft —
          writing code that's clean, intentional, and actually solves the problem.
          I don't wait for permission to build things.
        </p>
      </div>

      {/* The story */}
      <div style={{ marginBottom: '52px' }}>
        <SectionLabel text="The story" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '0.92rem', color: '#a3c9a8', lineHeight: 1.85, margin: 0 }}>
            Second-year CS student at Middlesex. I spend most of my time outside lectures building
            things — DeanOS started as a weekend project and kind of spiralled from there.
          </p>
          <p style={{ fontSize: '0.92rem', color: '#a3c9a8', lineHeight: 1.85, margin: 0 }}>
            I help run the CS Society and I'm on the Formula Student team working on computer vision.
            Both are good excuses to learn things that aren't on the syllabus.
          </p>
          <p style={{ fontSize: '0.92rem', color: '#a3c9a8', lineHeight: 1.85, margin: 0 }}>
            Looking for a placement where I can contribute to real work and pick things up fast.
          </p>
        </div>
      </div>

      {/* What I'm building right now */}
      <div style={{ marginBottom: '52px' }}>
        <SectionLabel text="Right now" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {NOW.map(item => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'baseline', gap: '14px',
              padding: '12px 16px',
              backgroundColor: '#0c1f10',
              border: '1px solid #1c3a22',
              borderRadius: '8px',
            }}>
              <span style={{
                color: '#4ade80', fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.75rem', fontWeight: 700, flexShrink: 0,
              }}>
                ▸
              </span>
              <span style={{ color: '#f0fdf4', fontWeight: 600, fontSize: '0.9rem', flexShrink: 0 }}>
                {item.label}
              </span>
              <span style={{ color: '#3a5a3e', fontSize: '0.82rem' }}>
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stack */}
      <div style={{ marginBottom: '52px' }}>
        <SectionLabel text="Stack" />
        <div style={{ marginBottom: '18px' }}>
          <p style={{
            fontSize: '0.68rem', color: '#2d5e34', fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px',
          }}>
            Day to day
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {STACK_NOW.map(t => (
              <span key={t} style={{
                backgroundColor: '#0c1f10', border: '1px solid #22c55e44',
                color: '#4ade80', fontSize: '0.78rem',
                padding: '4px 11px', borderRadius: '6px',
                fontFamily: '"JetBrains Mono", monospace',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p style={{
            fontSize: '0.68rem', color: '#2d5e34', fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px',
          }}>
            Also comfortable with
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {STACK_ALSO.map(t => (
              <span key={t} style={{
                backgroundColor: '#070f08', border: '1px solid #1c3a22',
                color: '#3a5a3e', fontSize: '0.78rem',
                padding: '4px 11px', borderRadius: '6px',
                fontFamily: '"JetBrains Mono", monospace',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Education */}
      <div>
        <SectionLabel text="Education" />
        <div style={{
          borderLeft: '3px solid #22c55e',
          backgroundColor: '#0c1f10', borderRadius: '0 10px 10px 0',
          padding: '18px 22px',
        }}>
          <p style={{ fontWeight: 700, color: '#f0fdf4', fontSize: '0.95rem', margin: '0 0 4px' }}>
            Middlesex University London
          </p>
          <p style={{ fontSize: '0.85rem', color: '#4ade80', margin: '0 0 4px' }}>
            BSc Computer Science
          </p>
          <p style={{ fontSize: '0.78rem', color: '#6b9470', margin: 0 }}>
            Jan 2025 – Jul 2027 · Targeting a 1st
          </p>
        </div>
      </div>

    </div>
  </div>
)

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px',
    }}>
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
