import { MobileStatusBar } from './MobileStatusBar'
import { MobileAppIcon } from './MobileAppIcon'
import { mobileApps, dockApps } from '../data/mobileAppRegistry'
import { useMobileStore } from '../store/mobileStore'

export const MobileHomeScreen = () => {
  const dockAppList = dockApps
    .map(id => mobileApps.find(a => a.id === id))
    .filter(Boolean) as typeof mobileApps

  return (
    <div style={{
      position: 'fixed',
      top: 0, right: 0, bottom: 0, left: 0,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Wallpaper */}
      <div style={{
        position: 'absolute',
        top: 0, right: 0, bottom: 0, left: 0,
        zIndex: 0,
        background: [
          'radial-gradient(ellipse at 30% 20%, #003355 0%, #0A0F1E 60%)',
          'radial-gradient(ellipse at 70% 80%, #001a33 0%, transparent 50%)',
        ].join(', '),
      }} />

      {/* Status bar — spacer on notched devices, full bar on others */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <MobileStatusBar />
      </div>

      {/* Lock button */}
      <button
        onClick={() => useMobileStore.getState().setPhase('lock')}
        onTouchEnd={(e) => { e.preventDefault(); useMobileStore.getState().setPhase('lock') }}
        style={{
          position: 'absolute',
          top: 60, right: 16, zIndex: 20,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '1.25rem',
          padding: 8,
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        🔒
      </button>

      {/* App icon grid */}
      <div style={{
        position: 'relative', zIndex: 10,
        flex: 1, overflowY: 'auto',
        padding: '16px 16px 8px 16px',
        touchAction: 'pan-y',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          columnGap: 8,
          rowGap: 24,
          justifyItems: 'center',
        }}>
          {mobileApps.map(app => (
            <MobileAppIcon
              key={app.id}
              {...app}
              onTap={() => useMobileStore.getState().openApp(app.id)}
            />
          ))}
        </div>
      </div>

      {/* Dock */}
      <div style={{
        position: 'relative', zIndex: 10,
        margin: '0 16px',
        paddingBottom: 'env(safe-area-inset-bottom, 8px)',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '12px 16px',
          display: 'flex', justifyContent: 'space-around',
          alignItems: 'center',
        }}>
          {dockAppList.map(app => (
            <MobileAppIcon
              key={app.id}
              {...app}
              size="large"
              onTap={() => useMobileStore.getState().openApp(app.id)}
            />
          ))}
        </div>
      </div>

      {/* Bottom safe area gap above home indicator */}
      <div style={{ height: 8, position: 'relative', zIndex: 10 }} />
    </div>
  )
}
