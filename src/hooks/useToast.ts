import { useSystemStore } from '../store/systemStore'

export const useToast = () => {
  const addNotification = useSystemStore(s => s.addNotification)
  return {
    info:    (title: string, message: string) => addNotification({ type: 'info',    title, message }),
    success: (title: string, message: string) => addNotification({ type: 'success', title, message }),
    warning: (title: string, message: string) => addNotification({ type: 'warning', title, message }),
    error:   (title: string, message: string) => addNotification({ type: 'error',   title, message }),
  }
}
