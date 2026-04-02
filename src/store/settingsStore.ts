import { create } from 'zustand'

const DEFAULTS = {
  theme: 'dark' as const,
  accentColor: '#00D4FF',
  wallpaper: 'aurora' as const,
  fontSize: 'medium' as const,
}

interface SettingsState {
  theme: 'dark' | 'light'
  accentColor: string
  wallpaper: 'aurora' | 'grid' | 'minimal'
  fontSize: 'small' | 'medium' | 'large'
  // Actions
  setTheme: (theme: 'dark' | 'light') => void
  setAccentColor: (color: string) => void
  setWallpaper: (wallpaper: 'aurora' | 'grid' | 'minimal') => void
  setFontSize: (size: 'small' | 'medium' | 'large') => void
  reset: () => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  ...DEFAULTS,

  setTheme: (theme) => set({ theme }),
  setAccentColor: (accentColor) => set({ accentColor }),
  setWallpaper: (wallpaper) => set({ wallpaper }),
  setFontSize: (fontSize) => set({ fontSize }),
  reset: () => set({ ...DEFAULTS }),
}))
