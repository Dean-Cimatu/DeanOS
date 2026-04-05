// Pure safe-area spacer. iOS renders its own time/wifi/battery in the notch.
// On non-notched devices (DevTools) env() resolves to 0, so this is invisible.
export const MobileStatusBar = () => (
  <div style={{ height: 'env(safe-area-inset-top, 0px)', flexShrink: 0 }} />
)
