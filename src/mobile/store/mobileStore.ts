import { create } from 'zustand'
import { useSystemStore } from '../../store/systemStore'

interface MobileState {
  phase: 'boot' | 'lock' | 'home' | 'app' | 'drawer'
  activeAppId: string | null
  isTouch: boolean
  drawerOpen: boolean
  recentApps: string[]
  homePageIndex: number

  setPhase: (phase: MobileState['phase']) => void
  openApp: (id: string) => void
  closeApp: () => void
  goHome: () => void
  openDrawer: () => void
  closeDrawer: () => void
  setIsTouch: (isTouch: boolean) => void
  addRecentApp: (id: string) => void
}

export const useMobileStore = create<MobileState>((set, get) => ({
  phase: 'boot',
  activeAppId: null,
  isTouch: false,
  drawerOpen: false,
  recentApps: [],
  homePageIndex: 0,

  setPhase: (phase) => set({ phase }),

  openApp: (id) => {
    const recentApps = [id, ...get().recentApps.filter(r => r !== id)].slice(0, 10)
    set({ activeAppId: id, phase: 'app', recentApps, drawerOpen: false })
    useSystemStore.getState().markAppNotificationsRead(id)
  },

  closeApp: () => set({ activeAppId: null, phase: 'home' }),

  goHome: () => set({ phase: 'home', drawerOpen: false }),

  openDrawer: () => set({ drawerOpen: true, phase: 'drawer' }),

  closeDrawer: () => set({ drawerOpen: false, phase: 'home' }),

  setIsTouch: (isTouch) => set({ isTouch }),

  addRecentApp: (id) => {
    const recentApps = [id, ...get().recentApps.filter(r => r !== id)].slice(0, 10)
    set({ recentApps })
  },
}))
