import BrowserApp from '../../components/apps/BrowserApp'

const scrollStyle = {
  height: '100%',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  WebkitOverflowScrolling: 'touch',
} as React.CSSProperties

export const MobileBrowserWrapper = ({ initialPage = '/' }: { initialPage?: string }) => (
  <div style={scrollStyle}>
    <BrowserApp initialPage={initialPage} />
  </div>
)
