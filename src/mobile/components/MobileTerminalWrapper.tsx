import Terminal from '../../components/Terminal'

export const MobileTerminalWrapper = () => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{
      padding: '6px 12px',
      background: '#0A0F1E',
      borderBottom: '1px solid #2A3F5F',
      flexShrink: 0,
    }}>
      <span style={{
        color: '#8899AA', fontSize: 12,
        fontFamily: '"JetBrains Mono", monospace',
      }}>
        Tap the input field to open keyboard
      </span>
    </div>
    <div style={{ flex: 1, overflow: 'hidden' }}>
      <Terminal />
    </div>
  </div>
)
