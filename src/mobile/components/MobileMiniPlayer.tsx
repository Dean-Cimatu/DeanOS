import { motion, AnimatePresence } from 'framer-motion'
import { useMobileStore } from '../store/mobileStore'

const Waveform = () => (
  <div style={{
    display: 'flex', alignItems: 'flex-end', gap: 2,
    height: 16, flexShrink: 0,
  }}>
    {[0, 1, 2, 3].map(i => (
      <motion.div
        key={i}
        style={{
          width: 3, borderRadius: 9999,
          background: '#00D4FF',
          originY: 1,
        }}
        animate={{ height: ['4px', '14px', '4px'] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.15,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
)

export const MobileMiniPlayer = () => {
  const musicActive    = useMobileStore(s => s.musicActive)
  const musicPlaying   = useMobileStore(s => s.musicPlaying)
  const phase          = useMobileStore(s => s.phase)
  const togglePlaying  = useMobileStore(s => s.toggleMusicPlaying)
  const openApp        = useMobileStore(s => s.openApp)

  const visible = musicActive && phase !== 'boot' && phase !== 'lock' && phase !== 'app'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="mini-player"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          style={{
            position: 'fixed',
            left: 12, right: 12,
            bottom: 'calc(env(safe-area-inset-bottom, 0px) + 56px)',
            zIndex: 550,
          }}
        >
          <motion.div
            whileTap={{ scale: 0.97 }}
            onPointerUp={() => openApp('music')}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px',
              borderRadius: 20,
              background: 'rgba(30,45,69,0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(42,63,95,0.8)',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            {/* Album art */}
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: 'linear-gradient(135deg, rgba(0,212,255,0.3), #003355)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 18 }}>🎵</span>
            </div>

            {/* Track info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                color: '#E8F4F8', fontSize: 13, fontWeight: 600, lineHeight: 1.2,
                fontFamily: 'Inter, -apple-system, sans-serif',
                margin: 0,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                Dean's Playlist
              </p>
              <p style={{
                color: '#8899AA', fontSize: 11,
                fontFamily: 'Inter, -apple-system, sans-serif',
                margin: '2px 0 0',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                Tap to open Spotify
              </p>
            </div>

            {/* Waveform — only when playing */}
            <AnimatePresence>
              {musicPlaying && <Waveform />}
            </AnimatePresence>

            {/* Play / pause */}
            <motion.button
              whileTap={{ scale: 0.82 }}
              onPointerUp={e => { e.stopPropagation(); togglePlaying() }}
              style={{
                width: 32, height: 32, flexShrink: 0,
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#E8F4F8', fontSize: 18,
                WebkitTapHighlightColor: 'transparent',
                padding: 0,
              }}
            >
              {musicPlaying ? '⏸' : '▶'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
