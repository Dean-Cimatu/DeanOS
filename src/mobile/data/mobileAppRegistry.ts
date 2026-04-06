export interface MobileApp {
  id: string
  name: string
  icon: string
  category: 'portfolio' | 'social' | 'media' | 'utilities' | 'games'
}

export const mobileApps: MobileApp[] = [
  // Portfolio
  { id: 'browser',    name: 'Browser',    icon: '🌐', category: 'portfolio' },
  { id: 'projects',   name: 'Projects',   icon: '💻', category: 'portfolio' },
  { id: 'cv',         name: 'CV',         icon: '📄', category: 'portfolio' },
  { id: 'contact',    name: 'Contact',    icon: '✉️',  category: 'portfolio' },
  // Social
  { id: 'linkedin',   name: 'LinkedIn',   icon: 'in', category: 'social'    },
  { id: 'github',     name: 'GitHub',     icon: '',   category: 'social'    },
  { id: 'mail',       name: 'Mail',       icon: '✉️',  category: 'social'    },
  // Media
  { id: 'photos',     name: 'Photos',     icon: '🖼️', category: 'media'     },
  { id: 'music',      name: 'Music',      icon: '🎵', category: 'media'     },
  // Utilities
  { id: 'calculator', name: 'Calculator', icon: '🧮', category: 'utilities' },
  { id: 'terminal',   name: 'Terminal',   icon: '>_', category: 'utilities' },
  { id: 'settings',   name: 'Settings',   icon: '⚙️', category: 'utilities' },
  // Games
  { id: 'pico-racer', name: 'Pico Racer', icon: '🏎️', category: 'games'    },
  { id: 'rogue',      name: 'Rogue',      icon: '⚔️', category: 'games'    },
]

export const dockApps = ['browser', 'music', 'calculator', 'settings']
