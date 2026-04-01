const skillGroups = [
  { title: 'Languages', skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'Bash'] },
  { title: 'Frameworks', skills: ['React', 'Next.js', 'Express.js', 'ASP.NET', 'Tailwind CSS'] },
  { title: 'Tools', skills: ['Git', 'Docker', 'AWS', 'Azure', 'MongoDB', 'PostgreSQL', 'Zustand'] },
  { title: 'Concepts', skills: ['OOP', 'Design Patterns', 'REST APIs', 'Data Structures', 'CI/CD'] },
]

const s = {
  page: {
    maxWidth: '640px',
    margin: '0 auto',
    padding: '40px 32px',
    fontFamily: '"JetBrains Mono", monospace',
    color: '#E8F4F8',
  } as React.CSSProperties,
  intro: {
    display: 'flex',
    flexDirection: 'row' as const,
    gap: '24px',
    alignItems: 'flex-start',
  },
  avatar: {
    flexShrink: 0,
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#1E2D45',
    border: '2px solid #00D4FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#00D4FF',
  },
  name: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#E8F4F8',
    margin: 0,
  },
  role: {
    fontSize: '15px',
    color: '#00D4FF',
    marginTop: '4px',
  },
  location: {
    fontSize: '13px',
    color: '#8899AA',
    marginTop: '4px',
  },
  bio: {
    fontSize: '13px',
    color: '#8899AA',
    marginTop: '12px',
    lineHeight: 1.7,
  },
  section: {
    marginTop: '40px',
  },
  sectionHeading: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#E8F4F8',
    borderBottom: '1px solid #2A3F5F',
    paddingBottom: '8px',
    marginBottom: '16px',
    margin: '0 0 16px 0',
  },
  skillGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  skillCard: {
    backgroundColor: '#1E2D45',
    borderRadius: '8px',
    padding: '14px',
    border: '1px solid #2A3F5F',
  },
  skillCardTitle: {
    fontSize: '12px',
    fontWeight: 700,
    color: '#00D4FF',
    marginBottom: '10px',
  },
  skillBadgeRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '6px',
  },
  skillBadge: {
    backgroundColor: '#0A0F1E',
    color: '#E8F4F8',
    fontSize: '11px',
    padding: '3px 8px',
    borderRadius: '4px',
    fontFamily: '"JetBrains Mono", monospace',
  },
  educationCard: {
    borderLeft: '2px solid #00D4FF',
    paddingLeft: '16px',
    backgroundColor: '#1E2D45',
    borderRadius: '0 8px 8px 0',
    padding: '14px 14px 14px 16px',
  },
  edName: {
    fontWeight: 700,
    color: '#E8F4F8',
    fontSize: '14px',
  },
  edDegree: {
    fontSize: '13px',
    color: '#00D4FF',
    marginTop: '4px',
  },
  edDates: {
    fontSize: '12px',
    color: '#8899AA',
    marginTop: '4px',
  },
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '10px',
  },
  tag: {
    backgroundColor: '#1E2D45',
    border: '1px solid #2A3F5F',
    color: '#E8F4F8',
    fontSize: '13px',
    padding: '6px 16px',
    borderRadius: '999px',
  },
}

export const AboutPage = () => (
  <div style={s.page}>

    {/* INTRO */}
    <div style={s.intro}>
      <div style={s.avatar}>
        <span style={s.avatarText}>DC</span>
      </div>
      <div>
        <h1 style={s.name}>Dean Cimatu</h1>
        <p style={s.role}>Software Engineering Student</p>
        <p style={s.location}>Hampton Hill, London</p>
        <p style={s.bio}>
          I'm a second-year BSc Computer Science student at Middlesex University London, building
          real software between lectures. Founder of the CS Academic Society and contributor to
          Formula Student AI.
        </p>
      </div>
    </div>

    {/* SKILLS */}
    <div style={s.section}>
      <h2 style={s.sectionHeading}>Skills</h2>
      <div style={s.skillGrid}>
        {skillGroups.map(({ title, skills }) => (
          <div key={title} style={s.skillCard}>
            <p style={s.skillCardTitle}>{title}</p>
            <div style={s.skillBadgeRow}>
              {skills.map(skill => (
                <span key={skill} style={s.skillBadge}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* EDUCATION */}
    <div style={s.section}>
      <h2 style={s.sectionHeading}>Education</h2>
      <div style={s.educationCard}>
        <p style={s.edName}>Middlesex University London</p>
        <p style={s.edDegree}>BSc Computer Science</p>
        <p style={s.edDates}>Jan 2025 – Jul 2027 · Expected 2:1</p>
      </div>
    </div>

    {/* BEYOND CODE */}
    <div style={s.section}>
      <h2 style={s.sectionHeading}>Beyond Code</h2>
      <div style={s.tagRow}>
        {['Formula Student', 'CS Academic Society', 'AI & Machine Learning'].map(label => (
          <span key={label} style={s.tag}>{label}</span>
        ))}
      </div>
    </div>

  </div>
)
