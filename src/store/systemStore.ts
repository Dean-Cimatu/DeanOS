import { create } from 'zustand'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
  appId?: string   // which mobile app icon this badge belongs to
}

interface SystemState {
  // Boot
  bootPhase: 0 | 1 | 2 | 3 | 4 | 5 | 6
  bootComplete: boolean
  bootProgress: number
  // Auth
  loggedIn: boolean
  locked: boolean
  screensaver: boolean
  systemAction: null | 'shutdown' | 'restart'
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
  lock: () => void
  unlock: () => void
  activateScreensaver: () => void
  dismissScreensaver: () => void
  logout: () => void
  shutdown: () => void
  restart: () => void
  setBattery: (level: number) => void
  setWifi: (connected: boolean) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  tickClock: () => void
  addRecentApp: (appId: string) => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAllRead: () => void
  markAppNotificationsRead: (appId: string) => void
  clearNotifications: () => void
  dismissNotification: (id: string) => void
  drainBattery: () => void
}

export const useSystemStore = create<SystemState>((set) => ({
  bootPhase: 0,
  bootComplete: false,
  bootProgress: 0,
  loggedIn: false,
  locked: false,
  screensaver: false,
  systemAction: null,
  batteryLevel: (() => { const s = localStorage.getItem('deans_battery_level'); return s !== null ? Math.max(0, Math.min(100, parseInt(s, 10))) : 87 })(),
  batteryLastTick: (() => { const s = localStorage.getItem('deans_battery_last_tick'); return s !== null ? parseInt(s, 10) : Date.now() })(),
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
  lock: () => set({ locked: true }),
  unlock: () => set({ locked: false }),
  activateScreensaver: () => set({ screensaver: true }),
  dismissScreensaver: () => set({ screensaver: false }),
  logout: () => set({ loggedIn: false, locked: false, screensaver: false, notifications: [], unreadCount: 0 }),
  shutdown: () => set({ systemAction: 'shutdown' }),
  restart: () => set({ systemAction: 'restart' }),
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
  markAppNotificationsRead: (appId) => set((state) => {
    const toRead = state.notifications.filter(
      n => !n.read && (n.appId === appId || (!n.appId && appId === 'terminal'))
    )
    if (toRead.length === 0) return {}
    return {
      notifications: state.notifications.map(n =>
        toRead.some(r => r.id === n.id) ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - toRead.length),
    }
  }),
  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
  drainBattery: () => set((state) => {
    const newLevel = Math.max(0, state.batteryLevel - 1)
    const newTick = Date.now()
    localStorage.setItem('deans_battery_level', String(newLevel))
    localStorage.setItem('deans_battery_last_tick', String(newTick))
    return { batteryLevel: newLevel, batteryLastTick: newTick }
  }),
  dismissNotification: (id) => set((state) => {
    const notif = state.notifications.find(n => n.id === id)
    return {
      notifications: state.notifications.filter(n => n.id !== id),
      unreadCount: notif && !notif.read ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
    }
  }),
}))
