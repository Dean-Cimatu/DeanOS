import { create } from 'zustand'
import { useSystemStore } from '../../store/systemStore'

type Origin = { x: number; y: number; width: number; height: number }

interface MobileState {
  phase: 'boot' | 'lock' | 'home' | 'app' | 'drawer'
  activeAppId: string | null
  isTouch: boolean
  drawerOpen: boolean
  notificationCentreOpen: boolean
  musicActive: boolean
  musicPlaying: boolean
  openOrigin: Origin | null
  recentApps: string[]
  homePageIndex: number

  setPhase: (phase: MobileState['phase']) => void
  openApp: (id: string) => void
  openAppFromIcon: (id: string, origin: Origin) => void
  closeApp: () => void
  goHome: () => void
  openDrawer: () => void
  closeDrawer: () => void
  openNotificationCentre: () => void
  closeNotificationCentre: () => void
  setMusicActive: (val: boolean) => void
  toggleMusicPlaying: () => void
  setIsTouch: (isTouch: boolean) => void
  addRecentApp: (id: string) => void
}

export const useMobileStore = create<MobileState>((set, get) => ({
  phase: 'boot',
  activeAppId: null,
  isTouch: false,
  drawerOpen: false,
  notificationCentreOpen: false,
  musicActive: false,
  musicPlaying: false,
  openOrigin: null,
  recentApps: [],
  homePageIndex: 0,

  setPhase: (phase) => set({ phase }),

  openApp: (id) => {
    const recentApps = [id, ...get().recentApps.filter(r => r !== id)].slice(0, 10)
    set({
      activeAppId: id, phase: 'app', recentApps,
      drawerOpen: false, openOrigin: null,
      ...(id === 'music' ? { musicActive: true } : {}),
    })
    useSystemStore.getState().markAppNotificationsRead(id)
  },

  openAppFromIcon: (id, origin) => {
    const recentApps = [id, ...get().recentApps.filter(r => r !== id)].slice(0, 10)
    set({
      activeAppId: id, phase: 'app', recentApps,
      drawerOpen: false, openOrigin: origin,
      ...(id === 'music' ? { musicActive: true } : {}),
    })
    useSystemStore.getState().markAppNotificationsRead(id)
  },

  closeApp: () => set({ activeAppId: null, phase: 'home', openOrigin: null }),

  goHome: () => set({ phase: 'home', drawerOpen: false }),

  openDrawer: () => set({ drawerOpen: true, phase: 'drawer' }),

  closeDrawer: () => set({ drawerOpen: false, phase: 'home' }),

  openNotificationCentre: () => {
    set({ notificationCentreOpen: true })
    useSystemStore.getState().markAllRead()
  },

  closeNotificationCentre: () => set({ notificationCentreOpen: false }),

  setMusicActive: (val) => set({ musicActive: val }),

  toggleMusicPlaying: () => set(s => ({ musicPlaying: !s.musicPlaying })),

  setIsTouch: (isTouch) => set({ isTouch }),

  addRecentApp: (id) => {
    const recentApps = [id, ...get().recentApps.filter(r => r !== id)].slice(0, 10)
    set({ recentApps })
  },
}))
