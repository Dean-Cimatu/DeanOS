export interface MobileApp {
  id: string
  name: string
  icon: string
  category: 'portfolio' | 'media' | 'utilities'
}

export const mobileApps: MobileApp[] = [
  { id: 'browser',    name: 'Browser',    icon: '🌐', category: 'portfolio' },
  { id: 'music',      name: 'Music',      icon: '🎵', category: 'media'     },
  { id: 'calculator', name: 'Calculator', icon: '🧮', category: 'utilities' },
  { id: 'settings',   name: 'Settings',   icon: '⚙️', category: 'utilities' },
]

export const dockApps = ['browser', 'music', 'calculator', 'settings']
