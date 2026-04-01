import { create } from 'zustand'

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
}

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: 'dark',
  accentColor: '#00D4FF',
  wallpaper: 'aurora',
  fontSize: 'medium',

  setTheme: (theme) => set({ theme }),
  setAccentColor: (accentColor) => set({ accentColor }),
  setWallpaper: (wallpaper) => set({ wallpaper }),
  setFontSize: (fontSize) => set({ fontSize }),
}))
