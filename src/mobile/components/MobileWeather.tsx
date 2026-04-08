import { useWeather, describeCode } from '../../hooks/useWeather'

const DAY_LABELS = ['Today', 'Tomorrow', 'Day 3']

export const MobileWeather = () => {
  const { data, loading, error } = useWeather()

  if (loading) return (
    <div style={{
      height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 12,
      background: 'linear-gradient(160deg, #0a1628 0%, #0d1f3c 100%)',
    }}>
      <div style={{
        width: 120, height: 20, borderRadius: 10,
        background: 'rgba(255,255,255,0.08)',
        animation: 'pulse 1.5s ease-in-out infinite',
      }} />
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </div>
  )

  if (error || !data) return (
    <div style={{
      height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(160deg, #0a1628 0%, #0d1f3c 100%)',
      color: '#8899AA', fontSize: 14, fontFamily: 'Inter, -apple-system, sans-serif',
    }}>
      Unable to load weather
    </div>
  )

  const { label, emoji } = describeCode(data.current.code)

  return (
    <div style={{
      height: '100%', overflowY: 'auto',
      background: 'linear-gradient(160deg, #0a1628 0%, #0d1f3c 60%, #0a0f1e 100%)',
      fontFamily: 'Inter, -apple-system, sans-serif',
      display: 'flex', flexDirection: 'column',
    }}>

      {/* Current conditions hero */}
      <div style={{
        padding: '40px 24px 32px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center',
      }}>
        <span style={{ fontSize: 72, lineHeight: 1 }}>{emoji}</span>

        <div style={{
          fontSize: 72, fontWeight: 200, color: 'white',
          letterSpacing: '-0.04em', lineHeight: 1.1, marginTop: 16,
        }}>
          {data.current.temp}°
        </div>

        <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
          {label}
        </div>

        <div style={{
          fontSize: 13, color: 'rgba(255,255,255,0.4)',
          marginTop: 8, letterSpacing: '0.05em',
        }}>
          📍 London, UK
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'flex', justifyContent: 'space-around',
        margin: '0 16px',
        background: 'rgba(255,255,255,0.07)',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '16px 8px',
      }}>
        {[
          { label: 'Humidity', value: `${data.current.humidity}%`, icon: '💧' },
          { label: 'Wind', value: `${data.current.windSpeed} km/h`, icon: '💨' },
        ].map(({ label, value, icon }) => (
          <div key={label} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>{value}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* 3-day forecast */}
      <div style={{
        margin: '16px 16px 24px',
        background: 'rgba(255,255,255,0.07)',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden',
      }}>
        {data.forecast.map((day, i) => {
          const { emoji: fe, label: fl } = describeCode(day.code)
          return (
            <div key={day.date} style={{
              display: 'flex', alignItems: 'center',
              padding: '14px 20px',
              borderBottom: i < data.forecast.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', width: 72 }}>
                {DAY_LABELS[i]}
              </span>
              <span style={{ fontSize: 20, marginRight: 10 }}>{fe}</span>
              <span style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{fl}</span>
              <span style={{ fontSize: 13, color: 'white', fontWeight: 600 }}>{day.high}°</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginLeft: 8 }}>{day.low}°</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
