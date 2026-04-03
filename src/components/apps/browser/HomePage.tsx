import { useState, useEffect, useRef } from 'react'

interface HomePageProps {
  onNavigate: (path: string) => void
}

const FULL_HEADING = "Dean Cimatu."

const TICKER_TEXT =
  'Open to placement 2025/26  ·  BSc CS @ Middlesex  ·  Formula Student AI  ·  Building in public  ·  London  ·  '

const NAV_ITEMS = [
  {
    num: '01',
    title: 'Projects',
    sub: "Real things I've shipped",
    path: '/projects',
  },
  {
    num: '02',
    title: 'About',
    sub: 'The story behind the work',
    path: '/about',
  },
  {
    num: '03',
    title: 'CV',
    sub: 'The formal version',
    path: '/cv',
  },
  {
    num: '04',
    title: 'Contact',
    sub: "Let's talk",
    path: '/contact',
  },
]

export const HomePage = ({ onNavigate }: HomePageProps) => {
  const [displayed, setDisplayed] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const [showBody, setShowBody] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    let index = 0
    const delay = 900 / FULL_HEADING.length
    intervalRef.current = setInterval(() => {
      index += 1
      setDisplayed(FULL_HEADING.slice(0, index))
      if (index >= FULL_HEADING.length) {
        clearInterval(intervalRef.current!)
        setTypingDone(true)
      }
    }, delay)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  useEffect(() => {
    if (!typingDone) return
    const t = setTimeout(() => setShowBody(true), 400)
    return () => clearTimeout(t)
  }, [typingDone])

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', minHeight: '100%',
      background: `
        radial-gradient(ellipse 70% 50% at 5% 10%, rgba(34,197,94,0.1) 0%, transparent 60%),
        radial-gradient(ellipse 50% 40% at 95% 90%, rgba(74,222,128,0.07) 0%, transparent 55%),
        #040d06
      `,
    }}>
      <div style={{ flex: 1, padding: '72px 56px 40px' }}>

        {/* Name */}
        <div style={{ marginBottom: '6px' }}>
          <span style={{
            fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#4ade80', fontFamily: '"JetBrains Mono", monospace', fontWeight: 600,
          }}>
            &mdash; Portfolio
          </span>
        </div>

        <h1 style={{
          fontSize: '4.2rem', fontWeight: 800, lineHeight: 1.0,
          fontFamily: 'Ubuntu, sans-serif', margin: '0 0 4px',
          letterSpacing: '-0.04em', color: '#f0fdf4',
          minHeight: '1.1em',
        }}>
          {(() => {
            const split = displayed.indexOf(' ')
            if (split === -1) return <span style={{ color: '#f0fdf4' }}>{displayed}</span>
            const first = displayed.slice(0, split)
            const rest = displayed.slice(split)
            return (
              <>
                <span style={{ color: '#f0fdf4' }}>{first}</span>
                <span style={{
                  background: 'linear-gradient(95deg, #4ade80 0%, #22c55e 60%, #86efac 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>{rest}</span>
              </>
            )
          })()}
          <span style={{
            display: 'inline-block', width: '3px', height: '0.75em',
            backgroundColor: '#4ade80', marginLeft: '4px', verticalAlign: 'middle',
            animation: typingDone ? 'blink 1s step-end infinite' : 'none',
          }} />
        </h1>

        {/* One-liner */}
        <p style={{
          fontSize: '1.15rem', color: '#6b9470',
          fontFamily: 'Ubuntu, sans-serif', fontWeight: 400,
          marginTop: '16px', marginBottom: 0,
          opacity: showBody ? 1 : 0,
          transform: showBody ? 'none' : 'translateY(6px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>
          Software developer. CS student. Builder of things that actually work.
        </p>

        {/* Divider */}
        <div style={{
          width: '48px', height: '2px', backgroundColor: '#1c3a22',
          margin: '36px 0',
          opacity: showBody ? 1 : 0,
          transition: 'opacity 0.5s ease 0.1s',
        }} />

        {/* Nav list */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '2px',
          opacity: showBody ? 1 : 0,
          transform: showBody ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s',
        }}>
          {NAV_ITEMS.map(item => (
            <NavRow key={item.path} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div style={{
        height: '28px', backgroundColor: '#030905',
        borderTop: '1px solid #0f2212',
        overflow: 'hidden', display: 'flex', alignItems: 'center', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'ticker 36s linear infinite' }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              color: '#2d5e34', fontSize: '0.68rem',
              fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.05em',
            }}>
              {TICKER_TEXT}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-33.333%)} }
      `}</style>
    </div>
  )
}

function NavRow({ item, onNavigate }: { item: typeof NAV_ITEMS[0]; onNavigate: (p: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={ref}
      onClick={() => onNavigate(item.path)}
      onMouseEnter={() => {
        if (!ref.current) return
        ref.current.style.backgroundColor = '#0c1f10'
        ref.current.style.borderColor = '#1c3a22'
        ref.current.style.paddingLeft = '20px'
      }}
      onMouseLeave={() => {
        if (!ref.current) return
        ref.current.style.backgroundColor = 'transparent'
        ref.current.style.borderColor = 'transparent'
        ref.current.style.paddingLeft = '12px'
      }}
      style={{
        display: 'flex', alignItems: 'center', gap: '24px',
        padding: '14px 12px', borderRadius: '8px',
        border: '1px solid transparent',
        cursor: 'pointer',
        transition: 'background-color 0.18s ease, border-color 0.18s ease, padding-left 0.18s ease',
      }}
    >
      <span style={{
        fontSize: '0.65rem', color: '#2d5e34',
        fontFamily: '"JetBrains Mono", monospace',
        fontWeight: 600, letterSpacing: '0.05em', flexShrink: 0, width: '20px',
      }}>
        {item.num}
      </span>
      <span style={{
        fontSize: '1.1rem', fontWeight: 700,
        color: '#f0fdf4', fontFamily: 'Ubuntu, sans-serif', flex: 1,
      }}>
        {item.title}
      </span>
      <span style={{
        fontSize: '0.8rem', color: '#3a5a3e',
        fontFamily: 'Ubuntu, sans-serif',
      }}>
        {item.sub}
      </span>
      <span style={{ color: '#22c55e', fontSize: '1rem' }}>›</span>
    </div>
  )
}
