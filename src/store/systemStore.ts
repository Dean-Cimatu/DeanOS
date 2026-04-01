import { create } from 'zustand'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

interface SystemState {
  // Boot
  bootPhase: 0 | 1 | 2 | 3 | 4 | 5 | 6
  bootComplete: boolean
  bootProgress: number
  // Auth
  loggedIn: boolean
  // System tray
  batteryLevel: number
  batteryLastTick: number
  wifiConnected: boolean
  volume: number
  isMuted: boolean
  currentTime: Date
  // Apps
  recentApps: string[]
  notifications: Notification[]
  unreadCount: number
  // Actions
  setBootPhase: (phase: 0 | 1 | 2 | 3 | 4 | 5 | 6) => void
  setBootComplete: (complete: boolean) => void
  setBootProgress: (progress: number) => void
  setLoggedIn: (loggedIn: boolean) => void
  setBattery: (level: number) => void
  setWifi: (connected: boolean) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  tickClock: () => void
  addRecentApp: (appId: string) => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAllRead: () => void
  clearNotifications: () => void
}

export const useSystemStore = create<SystemState>((set) => ({
  bootPhase: 0,
  bootComplete: false,
  bootProgress: 0,
  loggedIn: false,
  batteryLevel: 87,
  batteryLastTick: Date.now(),
  wifiConnected: true,
  volume: 75,
  isMuted: false,
  currentTime: new Date(),
  recentApps: [],
  notifications: [],
  unreadCount: 0,

  setBootPhase: (phase) => set({ bootPhase: phase }),
  setBootComplete: (complete) => set({ bootComplete: complete }),
  setBootProgress: (progress) => set({ bootProgress: progress }),
  setLoggedIn: (loggedIn) => set({ loggedIn }),
  setBattery: (level) => set({ batteryLevel: level, batteryLastTick: Date.now() }),
  setWifi: (connected) => set({ wifiConnected: connected }),
  setVolume: (volume) => set({ volume }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  tickClock: () => set({ currentTime: new Date() }),
  addRecentApp: (appId) =>
    set((state) => {
      const filtered = state.recentApps.filter((id) => id !== appId)
      return { recentApps: [appId, ...filtered].slice(0, 5) }
    }),
  addNotification: (notification) =>
    set((state) => {
      const newNotification: Notification = {
        ...notification,
        id: crypto.randomUUID(),
        timestamp: new Date(),
        read: false,
      }
      return {
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      }
    }),
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
}))
