import { AnimatePresence, motion } from 'framer-motion'
import { useSystemStore } from '../../store/systemStore'
import Toast from './Toast'

export default function ToastContainer() {
  const notifications = useSystemStore(s => s.notifications)
  const dismissNotification = useSystemStore(s => s.dismissNotification)

  const visible = notifications.slice(0, 2)

  return (
    <div style={{
      position: 'fixed',
      bottom: '56px',  // above 40px taskbar + 16px gap
      right: '16px',
      zIndex: 8000,
      display: 'flex',
      flexDirection: 'column-reverse',
      gap: '8px',
      pointerEvents: 'none',
    }}>
      <AnimatePresence>
        {visible.map(n => (
          <motion.div
            key={n.id}
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: 'auto' }}
          >
            <Toast
              id={n.id}
              type={n.type}
              title={n.title}
              message={n.message}
              onDismiss={() => dismissNotification(n.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
