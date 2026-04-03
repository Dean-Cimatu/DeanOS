export interface AppDefinition {
  id: string
  name: string
  iconId: string
  defaultSize: { width: number; height: number }
  minSize: { width: number; height: number }
  category: 'internet' | 'system' | 'portfolio' | 'accessories' | 'media' | 'games'
  description: string
  initialPage?: string
}

export const APP_REGISTRY: AppDefinition[] = [
  {
    id: 'browser',
    name: 'Browser',
    iconId: 'browser',
    defaultSize: { width: 900, height: 600 },
    minSize: { width: 600, height: 400 },
    category: 'internet',
    description: 'Browse the web and portfolio',
    initialPage: '/',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    iconId: 'terminal',
    defaultSize: { width: 800, height: 500 },
    minSize: { width: 400, height: 300 },
    category: 'system',
    description: 'Command line interface',
  },
  {
    id: 'files',
    name: 'Files',
    iconId: 'files',
    defaultSize: { width: 860, height: 540 },
    minSize: { width: 500, height: 380 },
    category: 'system',
    description: 'Browse the filesystem',
  },
  {
    id: 'settings',
    name: 'System Settings',
    iconId: 'settings',
    defaultSize: { width: 760, height: 520 },
    minSize: { width: 600, height: 420 },
    category: 'system',
    description: 'Customise your desktop',
  },
  {
    id: 'music',
    name: 'Music',
    iconId: 'music',
    defaultSize: { width: 400, height: 600 },
    minSize: { width: 360, height: 500 },
    category: 'media',
    description: 'Spotify music player',
  },
  {
    id: 'fileviewer',
    name: 'File Viewer',
    iconId: 'document',
    defaultSize: { width: 600, height: 500 },
    minSize: { width: 400, height: 320 },
    category: 'accessories',
    description: 'View text and markdown files',
  },
  {
    id: 'pico-racer',
    name: 'Pico Racer',
    iconId: 'picoracer',
    defaultSize: { width: 640, height: 520 },
    minSize: { width: 480, height: 400 },
    category: 'games',
    description: 'Pseudo-3D outrun-style racing game (Pico-8)',
  },
  {
    id: 'rogue-survivor',
    name: 'Rogue Survivor',
    iconId: 'roguesurvivor',
    defaultSize: { width: 800, height: 600 },
    minSize: { width: 600, height: 480 },
    category: 'games',
    description: 'Top-down auto-attacking roguelike (Godot 4)',
  },
  {
    id: 'calculator',
    name: 'Calculator',
    iconId: 'calculator',
    defaultSize: { width: 280, height: 420 },
    minSize: { width: 280, height: 420 },
    category: 'accessories',
    description: 'Standard calculator',
  },
]
