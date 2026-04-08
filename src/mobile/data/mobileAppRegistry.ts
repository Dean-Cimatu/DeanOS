export interface MobileApp {
  id: string
  name: string
  icon: string
  category: 'portfolio' | 'social' | 'media' | 'utilities' | 'games'
}

export const mobileApps: MobileApp[] = [
  // Portfolio
  { id: 'browser',    name: 'Browser',    icon: '🌐', category: 'portfolio' },
  // Social
  { id: 'linkedin',   name: 'LinkedIn',   icon: 'in', category: 'social'    },
  { id: 'github',     name: 'GitHub',     icon: '',   category: 'social'    },
  { id: 'mail',       name: 'Mail',       icon: '✉️',  category: 'social'    },
  // Media
  { id: 'photos',     name: 'Photos',     icon: '🖼️', category: 'media'     },
  { id: 'music',      name: 'Music',      icon: '🎵', category: 'media'     },
  // Utilities
  { id: 'weather',    name: 'Weather',    icon: '🌤️', category: 'utilities' },
  { id: 'files',      name: 'Files',      icon: '📁', category: 'utilities' },
  { id: 'calculator', name: 'Calculator', icon: '🧮', category: 'utilities' },
  { id: 'settings',   name: 'Settings',   icon: '⚙️', category: 'utilities' },
]

export const dockApps = ['browser', 'music', 'calculator', 'settings']
