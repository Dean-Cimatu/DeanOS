import { useRef } from 'react'
import { AppIcon } from '../../components/os/AppIcon'
import { mobileApps } from '../data/mobileAppRegistry'
import { useMobileStore } from '../store/mobileStore'

export const MobileAppHeader = ({ appId }: { appId: string }) => {
  const app = mobileApps.find(a => a.id === appId)
  const dragStart = useRef<number | null>(null)

  const closeApp = () => useMobileStore.getState().closeApp()

  return (
    <div
      style={{
        flexShrink: 0,
        background: '#121929',
        borderBottom: '1px solid #2A3F5F',
        cursor: 'grab',
        touchAction: 'none',
        /* Safe-area padding pushes the visible row below the status bar
           while keeping #121929 continuous behind it */
        paddingTop: 'env(safe-area-inset-top, 0px)',
      }}
      onPointerDown={e => { dragStart.current = e.clientY }}
      onPointerUp={e => {
        if (dragStart.current !== null && e.clientY - dragStart.current > 100) closeApp()
        dragStart.current = null
      }}
      onPointerCancel={() => { dragStart.current = null }}
    >
      {/* Actual header row */}
      <div style={{
        height: 52,
        display: 'flex', alignItems: 'center',
        paddingLeft: 12, paddingRight: 12,
        gap: 10,
      }}>
      {/* App icon */}
      <AppIcon iconId={appId} size={32} />

      {/* App name */}
      <span style={{
        flex: 1,
        color: '#E8F4F8', fontSize: '0.9375rem', fontWeight: 600,
        fontFamily: 'Inter, -apple-system, sans-serif',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {app?.name ?? appId}
      </span>

      {/* Close button */}
      <button
        onPointerDown={e => e.stopPropagation()}
        onPointerUp={e => { e.stopPropagation(); closeApp() }}
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: 'none', cursor: 'pointer',
          color: '#8899AA', fontSize: '1.1rem',
          width: 32, height: 32, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        ✕
      </button>
      </div>
    </div>
  )
}
