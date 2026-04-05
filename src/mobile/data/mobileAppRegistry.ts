export interface MobileApp {
  id: string
  name: string
  icon: string
  category: 'portfolio' | 'media' | 'utilities' | 'games'
}

export const mobileApps: MobileApp[] = [
  // Portfolio
  { id: 'browser',    name: 'Browser',    icon: '🌐', category: 'portfolio' },
  { id: 'projects',   name: 'Projects',   icon: '💻', category: 'portfolio' },
  { id: 'cv',         name: 'CV',         icon: '📄', category: 'portfolio' },
  { id: 'contact',    name: 'Contact',    icon: '✉️',  category: 'portfolio' },
  // Media
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
