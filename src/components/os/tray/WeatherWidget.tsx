import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickOutside } from '../../../hooks/useClickOutside'
import { useWeather, describeCode } from '../../../hooks/useWeather'

function WeatherPopover({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref as React.RefObject<HTMLElement>, onClose)

  const { data, loading, error } = useWeather()

  const dayLabel = (dateStr: string, i: number) => {
    if (i === 0) return 'Today'
    if (i === 1) return 'Tomorrow'
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long' })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      onClick={e => e.stopPropagation()}
      style={{
        position: 'absolute', bottom: '44px', right: 0, width: '240px',
        backgroundColor: '#1E2D45', border: '1px solid #2A3F5F', borderRadius: '12px',
        padding: '16px', boxShadow: '0 25px 50px rgba(0,0,0,0.6)', zIndex: 9999,
        fontFamily: 'Ubuntu, sans-serif',
      }}
    >
      <div style={{ color: '#E8F4F8', fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>
        London, UK
      </div>

      {loading && (
        <div style={{ color: '#8899AA', fontSize: '12px', padding: '8px 0' }}>Fetching weather…</div>
      )}

      {error && (
        <div style={{ color: '#FF4444', fontSize: '12px', padding: '8px 0' }}>
          Could not load weather data.
        </div>
      )}

      {data && !loading && (
        <>
          {/* Current conditions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '36px', lineHeight: 1 }}>
              {describeCode(data.current.code).emoji}
            </span>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#E8F4F8', lineHeight: 1 }}>
                {data.current.temp}°C
              </div>
              <div style={{ fontSize: '12px', color: '#8899AA', marginTop: '2px' }}>
                {describeCode(data.current.code).label}
              </div>
            </div>
          </div>

          {/* Humidity + wind */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
            <div style={{ fontSize: '11px', color: '#8899AA' }}>
              <span style={{ color: '#00D4FF' }}>💧</span> {data.current.humidity}%
            </div>
            <div style={{ fontSize: '11px', color: '#8899AA' }}>
              <span style={{ color: '#00D4FF' }}>💨</span> {data.current.windSpeed} km/h
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #2A3F5F', marginBottom: '12px' }} />

          {/* 3-day forecast */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.forecast.map((day, i) => (
              <div key={day.date} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '12px', color: i === 0 ? '#E8F4F8' : '#8899AA', width: 72 }}>
                  {dayLabel(day.date, i)}
                </span>
                <span style={{ fontSize: '16px' }}>{describeCode(day.code).emoji}</span>
                <span style={{ fontSize: '12px', color: '#8899AA', textAlign: 'right' }}>
                  <span style={{ color: '#E8F4F8', fontWeight: 600 }}>{day.high}°</span>
                  {' / '}
                  <span>{day.low}°</span>
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  )
}

export function WeatherWidget({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const [hovered, setHovered] = useState(false)
  const { data, loading } = useWeather()

  const label = loading
    ? '…'
    : data
      ? `${describeCode(data.current.code).emoji} ${data.current.temp}°C`
      : '—'

  return (
    <div
      style={{ position: 'relative' }}
      onMouseDown={e => e.stopPropagation()}
      onClick={e => { e.stopPropagation(); onToggle() }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', padding: '3px 8px', borderRadius: '5px',
          cursor: 'pointer', height: '30px', gap: '4px',
          backgroundColor: open || hovered ? '#1E2D45' : 'transparent',
          transition: 'background-color 0.12s',
          fontFamily: 'Ubuntu, sans-serif', fontSize: '12px', color: '#C8D8E8',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
      <AnimatePresence>
        {open && <WeatherPopover onClose={onToggle} />}
      </AnimatePresence>
    </div>
  )
}
