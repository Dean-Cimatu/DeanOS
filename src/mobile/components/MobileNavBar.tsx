import { motion } from 'framer-motion'
import { useMobileStore } from '../store/mobileStore'

const btnStyle: React.CSSProperties = {
  minWidth: 48, minHeight: 48,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: 12,
  background: 'none', border: 'none', cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
}

const DrawerIcon = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 5px)', gap: 2 }}>
    {[0, 1, 2, 3].map(i => (
      <div key={i} style={{
        width: 5, height: 5,
        background: 'rgba(255,255,255,0.8)',
        borderRadius: 1,
      }} />
    ))}
  </div>
)

export const MobileNavBar = () => {
  const handleBack = () => {
    const { phase } = useMobileStore.getState()
    if (phase === 'app') useMobileStore.getState().closeApp()
    else if (phase === 'drawer') useMobileStore.getState().closeDrawer()
    // home: do nothing (subtle press animation is enough)
  }

  const handleHome = () => useMobileStore.getState().goHome()

  const handleDrawer = () => {
    const { drawerOpen } = useMobileStore.getState()
    drawerOpen
      ? useMobileStore.getState().closeDrawer()
      : useMobileStore.getState().openDrawer()
  }

  return (
    <div style={{
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      flexShrink: 0,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        height: 56,
        paddingLeft: 24, paddingRight: 24,
      }}>
        {/* Back */}
        <motion.button
          style={{ ...btnStyle, color: 'rgba(255,255,255,0.8)', fontSize: '1.5rem' }}
          whileTap={{ scale: 0.85 }}
          transition={{ duration: 0.075 }}
          onClick={handleBack}
          onTouchEnd={(e) => { e.preventDefault(); handleBack() }}
        >
          ‹
        </motion.button>

        {/* Home */}
        <motion.button
          style={btnStyle}
          whileTap={{ scale: 0.85 }}
          transition={{ duration: 0.075 }}
          onClick={handleHome}
          onTouchEnd={(e) => { e.preventDefault(); handleHome() }}
        >
          <div style={{
            width: 20, height: 20,
            background: 'white',
            borderRadius: '50%',
          }} />
        </motion.button>

        {/* Drawer */}
        <motion.button
          style={btnStyle}
          whileTap={{ scale: 0.85 }}
          transition={{ duration: 0.075 }}
          onClick={handleDrawer}
          onTouchEnd={(e) => { e.preventDefault(); handleDrawer() }}
        >
          <DrawerIcon />
        </motion.button>
      </div>
    </div>
  )
}
