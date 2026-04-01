export interface AppDefinition {
  id: string
  name: string
  icon: string
  defaultSize: { width: number; height: number }
  minSize: { width: number; height: number }
  category: string
  initialPage?: string
}

export const APP_REGISTRY: AppDefinition[] = [
  {
    id: 'browser',
    name: 'Browser',
    icon: '🌐',
    defaultSize: { width: 900, height: 600 },
    minSize: { width: 600, height: 400 },
    category: 'internet',
    initialPage: '/',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: '>_',
    defaultSize: { width: 800, height: 500 },
    minSize: { width: 400, height: 300 },
    category: 'system',
  },
]
