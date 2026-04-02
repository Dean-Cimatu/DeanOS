import { useState, useEffect, useRef } from 'react'

interface HomePageProps {
  onNavigate: (path: string) => void
}

const FULL_HEADING = "Hi, I'm Dean Cimatu."

const TICKER_TEXT =
  'DeanOS v2.0  ·  BSc CS @ Middlesex University  ·  Formula Student AI  ·  Open to placement  ·  '

const cards = [
  {
    title: 'About Me',
    desc: 'Background, skills & what drives me',
    path: '/about',
    accent: '#4dba8c',
  },
  {
    title: 'My Projects',
    desc: "Things I've built and shipped",
    path: '/projects',
    accent: '#00D4FF',
  },
  {
    title: 'View CV',
    desc: 'Education, experience & skills',
    path: '/cv',
    accent: '#8a78e8',
  },
]

export const HomePage = ({ onNavigate }: HomePageProps) => {
  const [displayed, setDisplayed] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const [showSub, setShowSub] = useState(false)
  const [showCards, setShowCards] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    let index = 0
    const delay = 1100 / FULL_HEADING.length
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
    const t1 = setTimeout(() => setShowSub(true), 300)
    const t2 = setTimeout(() => setShowCards(true), 700)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [typingDone])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', backgroundColor: '#0f1520' }}>
      <div style={{ flex: 1 }}>
        {/* Hero */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          paddingTop: '88px', paddingBottom: '48px', textAlign: 'center',
          padding: '88px 32px 48px',
        }}>
          <h1 style={{
            color: '#dce8f6',
            fontSize: '2.75rem',
            fontWeight: 700,
            fontFamily: 'Ubuntu, sans-serif',
            lineHeight: 1.15,
            minHeight: '1.2em',
            letterSpacing: '-0.02em',
          }}>
            {displayed}
            <span style={{
              display: 'inline-block', width: '2px', height: '0.85em',
              backgroundColor: '#00D4FF', marginLeft: '3px', verticalAlign: 'middle',
              animation: typingDone ? 'blink 1s step-end infinite' : 'none',
              opacity: typingDone ? undefined : 1,
            }} />
          </h1>

          <p style={{
            color: '#7d95af',
            fontSize: '1.1rem',
            fontFamily: 'Ubuntu, sans-serif',
            marginTop: '14px',
            fontWeight: 400,
            opacity: showSub ? 1 : 0,
            transform: showSub ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}>
            CS Student&nbsp;&nbsp;·&nbsp;&nbsp;Software Developer&nbsp;&nbsp;·&nbsp;&nbsp;Builder of things
          </p>

          {/* CTA Cards */}
          <div style={{
            display: 'flex', flexDirection: 'row', gap: '14px',
            marginTop: '56px', maxWidth: '660px', width: '100%', justifyContent: 'center',
            opacity: showCards ? 1 : 0,
            transform: showCards ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.45s ease, transform 0.45s ease',
          }}>
            {cards.map((card) => (
              <CtaCard key={card.path} {...card} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div style={{
        position: 'sticky', bottom: 0, height: '30px',
        backgroundColor: '#0a0f1a',
        borderTop: '1px solid #1e2d40',
        overflow: 'hidden', display: 'flex', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'ticker 32s linear infinite' }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              color: '#4d6580', fontSize: '0.72rem',
              fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.04em',
            }}>
              {TICKER_TEXT}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
      `}</style>
    </div>
  )
}

interface CtaCardProps {
  title: string
  desc: string
  path: string
  accent: string
  onNavigate: (path: string) => void
}

function CtaCard({ title, desc, path, accent, onNavigate }: CtaCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      onClick={() => onNavigate(path)}
      onMouseEnter={() => {
        if (!ref.current) return
        ref.current.style.transform = 'translateY(-3px)'
        ref.current.style.borderColor = accent
        ref.current.style.boxShadow = `0 8px 28px rgba(0,0,0,0.3)`
      }}
      onMouseLeave={() => {
        if (!ref.current) return
        ref.current.style.transform = 'translateY(0)'
        ref.current.style.borderColor = '#253a55'
        ref.current.style.boxShadow = 'none'
      }}
      style={{
        flex: 1, backgroundColor: '#18243a',
        border: '1px solid #253a55',
        borderRadius: '10px', padding: '22px 20px',
        cursor: 'pointer',
        transition: 'transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
        textAlign: 'left',
      }}
    >
      <div style={{
        width: 28, height: 3, borderRadius: '2px',
        backgroundColor: accent, marginBottom: '14px', opacity: 0.85,
      }} />
      <div style={{
        color: '#d8e8f5', fontWeight: 600,
        fontFamily: 'Ubuntu, sans-serif', fontSize: '0.95rem', marginBottom: '6px',
      }}>
        {title}
      </div>
      <div style={{
        color: '#7d95af', fontFamily: 'Ubuntu, sans-serif',
        fontSize: '0.78rem', lineHeight: 1.5,
      }}>
        {desc}
      </div>
    </div>
  )
}
