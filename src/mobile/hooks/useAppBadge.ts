import { useSystemStore } from '../../store/systemStore'

export const useAppBadge = (appId: string): number => {
  const notifications = useSystemStore(s => s.notifications)
  const unread = notifications.filter(n => !n.read)

  // Notifications with no appId default to the terminal badge
  const badgeMap: Record<string, number> = {
    terminal: unread.filter(n => !n.appId || n.appId === 'terminal').length,
    browser:  unread.filter(n => n.appId === 'browser').length,
  }

  return badgeMap[appId] ?? 0
}
