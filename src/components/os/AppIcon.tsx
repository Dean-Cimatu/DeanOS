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

  photos: {
    bg: 'linear-gradient(145deg, #e74c8b, #9b2d6f)',
    path: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5"/>
        <circle cx="8.5" cy="9.5" r="2" fill="white" opacity="0.9"/>
        <path d="M2 16l5-5 3 3 4-4 8 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,255,255,0.25)"/>
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
