export interface MobileApp {
  id: string
  name: string
  icon: string
  category: 'portfolio' | 'media' | 'utilities' | 'games'
}

export const mobileApps: MobileApp[] = [
  { id: 'browser',    name: 'Browser',    icon: '🌐', category: 'portfolio' },
  { id: 'music',      name: 'Music',      icon: '🎵', category: 'media'     },
  { id: 'calculator', name: 'Calculator', icon: '🧮', category: 'utilities' },
  { id: 'terminal',   name: 'Terminal',   icon: '⌨️', category: 'utilities' },
  { id: 'projects',   name: 'Projects',   icon: '💼', category: 'portfolio' },
  { id: 'cv',         name: 'My CV',      icon: '📄', category: 'portfolio' },
  { id: 'contact',    name: 'Contact',    icon: '📬', category: 'portfolio' },
  { id: 'settings',   name: 'Settings',   icon: '⚙️', category: 'utilities' },
  { id: 'pico-racer', name: 'Pico Racer', icon: '🏎️', category: 'games'    },
  { id: 'rogue',      name: 'Rogue',      icon: '⚔️', category: 'games'    },
]

export const dockApps = ['browser', 'music', 'calculator', 'terminal']
