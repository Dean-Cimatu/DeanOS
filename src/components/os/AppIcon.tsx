interface AppIconProps {
  iconId: string
  size?: number
}

interface IconConfig {
  bg: string
  fg?: string
  path: React.ReactNode
}

const configs: Record<string, IconConfig> = {
  browser: {
    bg: 'linear-gradient(145deg, #38BDF8, #0284C7)',
    path: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9.5" stroke="white" strokeWidth="1.7"/>
        <path d="M12 2.5C12 2.5 8.5 6 8.5 12C8.5 18 12 21.5 12 21.5" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M12 2.5C12 2.5 15.5 6 15.5 12C15.5 18 12 21.5 12 21.5" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
        <line x1="2.5" y1="12" x2="21.5" y2="12" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M3.5 7.5h17M3.5 16.5h17" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7"/>
      </svg>
    ),
  },

  terminal: {
    bg: 'linear-gradient(145deg, #1E293B, #0F172A)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <polyline points="4 17 10 11 4 5" stroke="#00FF88" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="19" x2="20" y2="19" stroke="#00FF88" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    ),
  },

  files: {
    bg: 'linear-gradient(145deg, #FBBF24, #D97706)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
          fill="rgba(255,255,255,0.95)" stroke="rgba(180,120,0,0.3)" strokeWidth="0.5"/>
        <path d="M3 9h18" stroke="rgba(180,120,0,0.25)" strokeWidth="1"/>
      </svg>
    ),
  },

  settings: {
    bg: 'linear-gradient(145deg, #64748B, #334155)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2.8" stroke="white" strokeWidth="1.7"/>
        <path stroke="white" strokeWidth="1.7" strokeLinecap="round"
          d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M16.9 16.9l1.4 1.4M5.6 18.4l1.4-1.4M16.9 7.1l1.4-1.4"/>
        <circle cx="12" cy="12" r="5.5" stroke="white" strokeWidth="1.5" strokeDasharray="2.5 2" strokeOpacity="0.5"/>
      </svg>
    ),
  },

  about: {
    bg: 'linear-gradient(145deg, #A855F7, #7C3AED)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.5" stroke="white" strokeWidth="1.7"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
  },

  projects: {
    bg: 'linear-gradient(145deg, #10B981, #047857)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <polyline points="16 18 22 12 16 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8 6 2 12 8 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="14" y1="4" x2="10" y2="20" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.6"/>
      </svg>
    ),
  },

  resume: {
    bg: 'linear-gradient(145deg, #E2E8F0, #CBD5E1)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
          fill="white" stroke="#94A3B8" strokeWidth="1.4"/>
        <polyline points="14 2 14 8 20 8" stroke="#94A3B8" strokeWidth="1.4"/>
        <line x1="16" y1="13" x2="8" y2="13" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="16" y1="17" x2="8" y2="17" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="10" y1="9" x2="8" y2="9" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },

  folder: {
    bg: 'linear-gradient(145deg, #FBBF24, #D97706)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
          fill="rgba(255,255,255,0.9)"/>
      </svg>
    ),
  },

  music: {
    bg: 'linear-gradient(145deg, #1DB954, #158a3e)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="7.5" cy="18" r="3" fill="white"/>
        <circle cx="16.5" cy="16" r="3" fill="white"/>
        <path d="M10.5 18V8L19.5 6V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },

  games: {
    bg: 'linear-gradient(145deg, #1a1040, #2d1b69)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="20" height="12" rx="4" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="1.5"/>
        <line x1="7" y1="12" x2="11" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="9" y1="10" x2="9" y2="14" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="16" cy="11" r="1" fill="white"/>
        <circle cx="15" cy="13" r="1" fill="#00D4FF"/>
        <circle cx="17" cy="13" r="1" fill="#FFD700"/>
      </svg>
    ),
  },

  picoracer: {
    bg: 'linear-gradient(145deg, #7c2d12, #c2410c)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 17 Q6 13 12 12 Q18 11 21 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M3 19 Q6 15 12 14 Q18 13 21 16" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" fill="none"/>
        <rect x="8" y="8" width="8" height="5" rx="2" fill="white" opacity="0.9"/>
        <rect x="9" y="9" width="6" height="2" rx="0.5" fill="#c2410c"/>
        <circle cx="9" cy="16" r="1.5" fill="white"/>
        <circle cx="15" cy="15.5" r="1.5" fill="white"/>
      </svg>
    ),
  },

  roguesurvivor: {
    bg: 'linear-gradient(145deg, #1e1040, #4c1d95)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <polygon points="12,3 14,9 20,9 15,13 17,19 12,15 7,19 9,13 4,9 10,9" fill="rgba(255,255,255,0.15)" stroke="#FFD700" strokeWidth="1.4" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3" fill="white" opacity="0.9"/>
        <line x1="12" y1="9" x2="12" y2="6" stroke="#8a78e8" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="12" y1="15" x2="12" y2="18" stroke="#8a78e8" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },

  calculator: {
    bg: 'linear-gradient(145deg, #2d3a4a, #1a2535)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="rgba(255,255,255,0.08)" stroke="#00D4FF" strokeWidth="1.5"/>
        <rect x="6" y="6" width="12" height="4" rx="1.5" fill="#00D4FF" opacity="0.9"/>
        <circle cx="7.5" cy="14" r="1.2" fill="white"/>
        <circle cx="12" cy="14" r="1.2" fill="white"/>
        <circle cx="16.5" cy="14" r="1.2" fill="#00D4FF"/>
        <circle cx="7.5" cy="18" r="1.2" fill="white"/>
        <circle cx="12" cy="18" r="1.2" fill="white"/>
        <circle cx="16.5" cy="18" r="1.2" fill="#00D4FF"/>
      </svg>
    ),
  },

  code: {
    bg: 'linear-gradient(145deg, #1e293b, #0f172a)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <polyline points="16 18 22 12 16 6" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8 6 2 12 8 18" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="14" y1="4" x2="10" y2="20" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },

  document: {
    bg: 'linear-gradient(145deg, #E2E8F0, #CBD5E1)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
          fill="white" stroke="#94A3B8" strokeWidth="1.4"/>
        <polyline points="14 2 14 8 20 8" stroke="#94A3B8" strokeWidth="1.4"/>
        <line x1="16" y1="13" x2="8" y2="13" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="16" y1="17" x2="8" y2="17" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },

  weather: {
    bg: 'linear-gradient(145deg, #1a6fb5, #0a3d6b)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="10" r="3.5" fill="white" opacity="0.95"/>
        <path d="M12 3v1.5M12 15.5V17M5.5 10H4M20 10h-1.5M7.4 6.4L6.3 5.3M17.6 14.7l-1.1-1.1M7.4 13.6l-1.1 1.1M16.6 5.4l1 1" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M5 17.5a3 3 0 0 1 3-3h8a3 3 0 0 1 0 6H8a3 3 0 0 1-3-3z" fill="white" opacity="0.85"/>
      </svg>
    ),
  },

  linkedin: {
    bg: 'linear-gradient(145deg, #0A66C2, #004182)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="rgba(255,255,255,0.08)"/>
        <rect x="5.5" y="9.5" width="3" height="9" rx="0.5" fill="white"/>
        <circle cx="7" cy="7" r="1.6" fill="white"/>
        <path d="M12 9.5v9M12 12.5c0-1.7 1.1-3 3-3s3 1.3 3 3v5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },

  github: {
    bg: 'linear-gradient(145deg, #24292E, #0d1117)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" fill="white"/>
      </svg>
    ),
  },

  mail: {
    bg: 'linear-gradient(145deg, #2563EB, #1E40AF)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="3" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="1.5"/>
        <path d="M2 7l10 7 10-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },

  photos: {
    bg: 'linear-gradient(145deg, #e74c8b, #9b2d6f)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2.5" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="1.5"/>
        <circle cx="8" cy="9.5" r="2" fill="white" opacity="0.9"/>
        <path d="M2 16.5l5.5-5 3.5 3.5 4-5 7 6.5" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
}

export function AppIcon({ iconId, size = 48 }: AppIconProps) {
  const cfg = configs[iconId] ?? {
    bg: '#1E2D45',
    path: <span style={{ color: 'white', fontSize: size * 0.38, fontFamily: 'monospace' }}>?</span>,
  }
  const r = Math.round(size * 0.22)

  return (
    <div style={{
      width: size, height: size,
      background: cfg.bg,
      borderRadius: r,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      boxShadow: '0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)',
    }}>
      <div style={{ width: size * 0.58, height: size * 0.58 }}>
        {cfg.path}
      </div>
    </div>
  )
}
