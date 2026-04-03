const s = {
  page: {
    maxWidth: '672px',
    margin: '0 auto',
    padding: '48px 32px',
    fontFamily: 'Ubuntu, sans-serif',
    color: '#E8F4F8',
  } as React.CSSProperties,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px',
  },
  name: {
    fontSize: '1.875rem',
    fontWeight: 700,
    color: '#E8F4F8',
    margin: 0,
  },
  tagline: {
    color: '#8899AA',
    marginTop: '4px',
    fontSize: '0.9rem',
  },
  contactRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '4px',
    marginTop: '10px',
    alignItems: 'center',
    fontSize: '0.8rem',
  },
  contactLink: {
    color: '#00D4FF',
    textDecoration: 'none',
  },
  divider: {
    color: '#4A5568',
  },
  downloadBtn: {
    flexShrink: 0,
    border: '1px solid #00D4FF',
    color: '#00D4FF',
    padding: '6px 14px',
    borderRadius: '6px',
    fontSize: '0.8rem',
    textDecoration: 'none',
    whiteSpace: 'nowrap' as const,
    transition: 'background-color 0.15s, color 0.15s',
  },
  sectionHeading: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    color: '#00D4FF',
    textTransform: 'uppercase' as const,
    borderBottom: '1px solid #2A3F5F',
    paddingBottom: '4px',
    marginBottom: '16px',
    marginTop: '32px',
  },
  entryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: '8px',
    flexWrap: 'wrap' as const,
  },
  entryTitle: {
    fontWeight: 700,
    color: '#E8F4F8',
    fontSize: '0.9rem',
  },
  entryDate: {
    color: '#8899AA',
    fontSize: '0.78rem',
    whiteSpace: 'nowrap' as const,
  },
  entrySubtitle: {
    color: '#00D4FF',
    fontSize: '0.82rem',
    marginTop: '2px',
  },
  bullets: {
    margin: '6px 0 0 0',
    paddingLeft: '18px',
    color: '#8899AA',
    fontSize: '0.82rem',
    lineHeight: 1.7,
  },
  modules: {
    color: '#8899AA',
    fontSize: '0.8rem',
    marginTop: '6px',
  },
  entryBlock: {
    marginBottom: '20px',
  },
  skillsGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  skillRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'baseline',
    fontSize: '0.82rem',
    flexWrap: 'wrap' as const,
  },
  skillLabel: {
    color: '#00D4FF',
    fontWeight: 700,
    minWidth: '130px',
    flexShrink: 0,
  },
  skillValues: {
    color: '#8899AA',
  },
}

export const CVPage = () => {
  const handleDownloadEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = '#00D4FF'
    e.currentTarget.style.color = '#000'
  }
  const handleDownloadLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent'
    e.currentTarget.style.color = '#00D4FF'
  }

  return (
    <div style={s.page}>

      {/* HEADER */}
      <div style={s.header}>
        <div>
          <h1 style={s.name}>Dean Cimatu</h1>
          <p style={s.tagline}>Software Engineering Student</p>
          <div style={s.contactRow}>
            <a href="mailto:deancimatu@gmail.com" style={s.contactLink}>deancimatu@example.com</a>
            <span style={s.divider}>·</span>
            <a href="https://github.com/Dean-Cimatu" target="_blank" rel="noopener noreferrer" style={s.contactLink}>github.com/deancimatu</a>
            <span style={s.divider}>·</span>
            <a href="https://linkedin.com/in/deancimatu" target="_blank" rel="noopener noreferrer" style={s.contactLink}>linkedin.com/in/deancimatu</a>
            <span style={s.divider}>·</span>
            <span style={{ color: '#8899AA' }}>Hampton Hill, London</span>
          </div>
        </div>
        <a
          href="#"
          style={s.downloadBtn}
          onMouseEnter={handleDownloadEnter}
          onMouseLeave={handleDownloadLeave}
        >
          Download PDF ↓
        </a>
      </div>

      {/* EDUCATION */}
      <h2 style={s.sectionHeading}>Education</h2>
      <div style={s.entryBlock}>
        <div style={s.entryRow}>
          <span style={s.entryTitle}>Middlesex University London</span>
          <span style={s.entryDate}>Jan 2025 – Jul 2027</span>
        </div>
        <div style={s.entrySubtitle}>BSc Computer Science · Expected 2:1</div>
        <p style={s.modules}>
          Relevant modules: Data Structures &amp; Algorithms, Operating Systems, Web Applications, Software Engineering
        </p>
      </div>

      {/* EXPERIENCE */}
      <h2 style={s.sectionHeading}>Experience</h2>

      <div style={s.entryBlock}>
        <div style={s.entryRow}>
          <span style={s.entryTitle}>Founder &amp; President, CS Academic Society</span>
          <span style={s.entryDate}>2025 – Present</span>
        </div>
        <div style={s.entrySubtitle}>Middlesex University</div>
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
        <div style={s.entrySubtitle}>Middlesex University</div>
        <ul style={s.bullets}>
          <li>Representing the CS course to prospective students at open days</li>
        </ul>
      </div>

      <div style={s.entryBlock}>
        <div style={s.entryRow}>
          <span style={s.entryTitle}>Computer Vision Contributor, Formula Student</span>
          <span style={s.entryDate}>2025 – Present</span>
        </div>
        <div style={s.entrySubtitle}>MDX Racing</div>
        <ul style={s.bullets}>
          <li>Developing YOLO-based cone detection for autonomous racing</li>
        </ul>
      </div>

      {/* PROJECTS */}
      <h2 style={s.sectionHeading}>Projects</h2>

      <div style={s.entryBlock}>
        <div style={s.entryRow}>
          <span style={s.entryTitle}>DeanOS</span>
          <a href="https://github.com/Dean-Cimatu/deanos" target="_blank" rel="noopener noreferrer" style={{ ...s.entryDate, color: '#00D4FF', textDecoration: 'none' }}>github ↗</a>
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
          <a href="https://github.com/Dean-Cimatu/carhire" target="_blank" rel="noopener noreferrer" style={{ ...s.entryDate, color: '#00D4FF', textDecoration: 'none' }}>github ↗</a>
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
          <a href="https://github.com/Dean-Cimatu/studybuddy" target="_blank" rel="noopener noreferrer" style={{ ...s.entryDate, color: '#00D4FF', textDecoration: 'none' }}>github ↗</a>
        </div>
        <ul style={s.bullets}>
          <li>AI-powered study assistant built in 5 hours at a hackathon</li>
          <li>Express.js, MongoDB, JWT auth, Claude API integration</li>
        </ul>
      </div>

      {/* SKILLS */}
      <h2 style={s.sectionHeading}>Skills</h2>
      <div style={s.skillsGrid}>
        <div style={s.skillRow}>
          <span style={s.skillLabel}>Languages</span>
          <span style={s.skillValues}>TypeScript · JavaScript · Python · Java · C# · Bash</span>
        </div>
        <div style={s.skillRow}>
          <span style={s.skillLabel}>Frameworks &amp; Tools</span>
          <span style={s.skillValues}>React · Next.js · Express.js · ASP.NET · Tailwind · Git · Docker · AWS · Azure · MongoDB</span>
        </div>
        <div style={s.skillRow}>
          <span style={s.skillLabel}>Concepts</span>
          <span style={s.skillValues}>OOP · Design Patterns · REST APIs · Data Structures · CI/CD · Agile</span>
        </div>
      </div>

    </div>
  )
}
