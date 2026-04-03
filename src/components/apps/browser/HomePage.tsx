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
    accent: '#a78bfa',
    gradientFrom: '#a78bfa',
    gradientTo: '#8a78e8',
  },
  {
    title: 'My Projects',
    desc: "Things I've built and shipped",
    path: '/projects',
    accent: '#00D4FF',
    gradientFrom: '#00D4FF',
    gradientTo: '#0099cc',
  },
  {
    title: 'View CV',
    desc: 'Education, experience & skills',
    path: '/cv',
    accent: '#00FF88',
    gradientFrom: '#00FF88',
    gradientTo: '#00cc6a',
  },
]

const TAG_PILLS = [
  { label: 'CS Student', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.3)' },
  { label: 'Software Developer', color: '#00D4FF', bg: 'rgba(0,212,255,0.1)', border: 'rgba(0,212,255,0.28)' },
  { label: 'Builder', color: '#00FF88', bg: 'rgba(0,255,136,0.1)', border: 'rgba(0,255,136,0.28)' },
]

const STATS = [
  { value: '4', label: 'Projects', color: '#00D4FF' },
  { value: '2+', label: 'Years Coding', color: '#a78bfa' },
  { value: '1st', label: 'Formula Student', color: '#00FF88' },
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
    <div style={{
      display: 'flex', flexDirection: 'column', minHeight: '100%',
      backgroundColor: '#080d18',
      background: `
        radial-gradient(ellipse 600px 400px at 0% 0%, rgba(0,212,255,0.08) 0%, transparent 70%),
        radial-gradient(ellipse 500px 400px at 100% 100%, rgba(138,120,232,0.1) 0%, transparent 70%),
        radial-gradient(ellipse 400px 300px at 100% 0%, rgba(0,255,136,0.04) 0%, transparent 60%),
        #080d18
      `,
    }}>
      <div style={{ flex: 1 }}>
        {/* Hero */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '88px 32px 48px',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontSize: '3.6rem',
            fontWeight: 700,
            fontFamily: 'Ubuntu, sans-serif',
            lineHeight: 1.1,
            minHeight: '1.2em',
            letterSpacing: '-0.03em',
            margin: 0,
            color: '#E8F4F8',
          }}>
            {(() => {
              const prefix = "Hi, I'm "
              const displayedPrefix = displayed.slice(0, Math.min(displayed.length, prefix.length))
              const displayedName = displayed.slice(prefix.length)
              const nameDone = displayed.length > prefix.length

              return (
                <>
                  <span style={{ color: '#E8F4F8' }}>{displayedPrefix}</span>
                  {nameDone && (
                    <span style={{
                      background: 'linear-gradient(90deg, #00D4FF, #a78bfa)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      {displayedName}
                    </span>
                  )}
                  <span style={{
                    display: 'inline-block', width: '3px', height: '0.8em',
                    backgroundColor: '#00D4FF', marginLeft: '4px', verticalAlign: 'middle',
                    animation: typingDone ? 'blink 1s step-end infinite' : 'none',
                    opacity: typingDone ? undefined : 1,
                  }} />
                </>
              )
            })()}
          </h1>

          {/* Tag pills */}
          <div style={{
            display: 'flex', gap: '10px', marginTop: '28px', flexWrap: 'wrap', justifyContent: 'center',
            opacity: showSub ? 1 : 0,
            transform: showSub ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}>
            {TAG_PILLS.map(pill => (
              <span key={pill.label} style={{
                color: pill.color,
                backgroundColor: pill.bg,
                border: `1px solid ${pill.border}`,
                fontSize: '0.82rem',
                fontFamily: 'Ubuntu, sans-serif',
                fontWeight: 600,
                padding: '5px 14px',
                borderRadius: '20px',
                letterSpacing: '0.01em',
              }}>
                {pill.label}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: '48px', marginTop: '52px',
            opacity: showSub ? 1 : 0,
            transform: showSub ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
          }}>
            {STATS.map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem', fontWeight: 800,
                  fontFamily: 'Ubuntu, sans-serif',
                  color: stat.color,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.72rem', color: '#8899AA',
                  fontFamily: 'Ubuntu, sans-serif',
                  marginTop: '6px', textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Cards */}
          <div style={{
            display: 'flex', flexDirection: 'row', gap: '14px',
            marginTop: '52px', maxWidth: '660px', width: '100%', justifyContent: 'center',
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
        backgroundColor: '#060b14',
        borderTop: '1px solid #1a2535',
        overflow: 'hidden', display: 'flex', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'ticker 32s linear infinite' }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              color: 'rgba(0,212,255,0.6)', fontSize: '0.72rem',
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
  gradientFrom: string
  gradientTo: string
  onNavigate: (path: string) => void
}

function CtaCard({ title, desc, path, accent, gradientFrom, gradientTo, onNavigate }: CtaCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)

  return (
    <div
      ref={ref}
      onClick={() => onNavigate(path)}
      onMouseEnter={() => {
        if (!ref.current) return
        ref.current.style.transform = 'translateY(-4px)'
        ref.current.style.borderColor = `${accent}66`
        ref.current.style.boxShadow = `0 12px 36px rgba(0,0,0,0.4), 0 0 20px ${accent}18`
        if (arrowRef.current) arrowRef.current.style.opacity = '1'
        if (arrowRef.current) arrowRef.current.style.transform = 'translateX(3px)'
      }}
      onMouseLeave={() => {
        if (!ref.current) return
        ref.current.style.transform = 'translateY(0)'
        ref.current.style.borderColor = `${accent}22`
        ref.current.style.boxShadow = 'none'
        if (arrowRef.current) arrowRef.current.style.opacity = '0'
        if (arrowRef.current) arrowRef.current.style.transform = 'translateX(0)'
      }}
      style={{
        flex: 1,
        backgroundColor: '#111c30',
        border: `1px solid ${accent}22`,
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
        textAlign: 'left',
      }}
    >
      {/* Gradient top strip */}
      <div style={{
        height: '4px',
        background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
        width: '100%',
      }} />

      <div style={{ padding: '20px 20px 22px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '8px',
        }}>
          <div style={{
            color: '#E8F4F8', fontWeight: 700,
            fontFamily: 'Ubuntu, sans-serif', fontSize: '0.97rem',
          }}>
            {title}
          </div>
          <span ref={arrowRef} style={{
            color: accent, fontSize: '1rem', fontWeight: 700,
            opacity: 0,
            transition: 'opacity 0.15s ease, transform 0.15s ease',
          }}>→</span>
        </div>
        <div style={{
          color: '#6a8090', fontFamily: 'Ubuntu, sans-serif',
          fontSize: '0.78rem', lineHeight: 1.6,
        }}>
          {desc}
        </div>
      </div>
    </div>
  )
}
