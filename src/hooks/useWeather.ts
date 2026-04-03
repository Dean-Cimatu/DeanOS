import { useState, useEffect } from 'react'

export interface WeatherCurrent {
  temp: number
  code: number
  windSpeed: number
  humidity: number
}

export interface WeatherDay {
  date: string
  code: number
  high: number
  low: number
}

export interface WeatherData {
  current: WeatherCurrent
  forecast: WeatherDay[]
}

// WMO weather interpretation codes → { label, emoji }
export function describeCode(code: number): { label: string; emoji: string } {
  if (code === 0)                return { label: 'Clear sky',        emoji: '☀️' }
  if (code === 1)                return { label: 'Mostly clear',     emoji: '🌤️' }
  if (code === 2)                return { label: 'Partly cloudy',    emoji: '⛅' }
  if (code === 3)                return { label: 'Overcast',         emoji: '☁️' }
  if (code >= 45 && code <= 48)  return { label: 'Foggy',            emoji: '🌫️' }
  if (code >= 51 && code <= 55)  return { label: 'Drizzle',          emoji: '🌦️' }
  if (code >= 56 && code <= 57)  return { label: 'Freezing drizzle', emoji: '🌨️' }
  if (code >= 61 && code <= 65)  return { label: 'Rain',             emoji: '🌧️' }
  if (code >= 66 && code <= 67)  return { label: 'Freezing rain',    emoji: '🌨️' }
  if (code >= 71 && code <= 75)  return { label: 'Snow',             emoji: '❄️' }
  if (code === 77)               return { label: 'Snow grains',       emoji: '🌨️' }
  if (code >= 80 && code <= 82)  return { label: 'Rain showers',     emoji: '🌦️' }
  if (code >= 85 && code <= 86)  return { label: 'Snow showers',     emoji: '🌨️' }
  if (code === 95)               return { label: 'Thunderstorm',     emoji: '⛈️' }
  if (code >= 96 && code <= 99)  return { label: 'Thunderstorm + hail', emoji: '⛈️' }
  return { label: 'Unknown', emoji: '🌡️' }
}

export function useWeather() {
  const [data, setData]       = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetch_() {
      try {
        setLoading(true)
        setError(null)
        const url =
          'https://api.open-meteo.com/v1/forecast' +
          '?latitude=51.5085&longitude=-0.1257' +
          '&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m' +
          '&daily=temperature_2m_max,temperature_2m_min,weather_code' +
          '&timezone=Europe%2FLondon&forecast_days=3'
        const res = await window.fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (cancelled) return

        const current: WeatherCurrent = {
          temp:      Math.round(json.current.temperature_2m),
          code:      json.current.weather_code,
          windSpeed: Math.round(json.current.wind_speed_10m),
          humidity:  json.current.relative_humidity_2m,
        }

        const forecast: WeatherDay[] = (json.daily.time as string[]).map((date: string, i: number) => ({
          date,
          code: json.daily.weather_code[i],
          high: Math.round(json.daily.temperature_2m_max[i]),
          low:  Math.round(json.daily.temperature_2m_min[i]),
        }))

        setData({ current, forecast })
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Network error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetch_()
    const interval = setInterval(fetch_, 10 * 60 * 1000) // refresh every 10 min
    return () => { cancelled = true; clearInterval(interval) }
  }, [])

  return { data, loading, error }
}
