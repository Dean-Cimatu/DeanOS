import { useState } from 'react'

interface Photo {
  id: string
  title: string
  subtitle: string
  date: string
  gradient: string
  tags: string[]
}

const PHOTOS: Photo[] = [
  {
    id: 'fs-trackday',
    title: 'Formula Student Track Day',
    subtitle: 'MDX Racing — out on track testing the car',
    date: 'Jul 2025',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #f39c12 100%)',
    tags: ['Motorsport', 'MDX Racing', 'Testing'],
  },
  {
    id: 'fs-workshop',
    title: 'Formula Student Workshop',
    subtitle: 'Computer vision sprint — YOLO cone detection integration',
    date: 'May 2025',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #4a1270 40%, #c0392b 100%)',
    tags: ['Engineering', 'Motorsport', 'AI'],
  },
  {
    id: 'mdx-hackathon',
    title: 'MDX Hackathon',
    subtitle: '24-hour build at Middlesex — StudyBuddy built here',
    date: 'Mar 2026',
    gradient: 'linear-gradient(135deg, #0d1117 0%, #1f6feb 50%, #58a6ff 100%)',
    tags: ['Hackathon', 'React', 'Claude API'],
  },
  {
    id: 'carhire',
    title: 'Car Hire System Launch',
    subtitle: 'Shipped the full-stack car hire platform — C#, ASP.NET, Azure',
    date: 'Apr 2026',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    tags: ['Full-stack', 'Solo', 'Live'],
  },
  {
    id: 'cs-soc',
    title: 'CS Society',
    subtitle: 'Founded and running workshops for the Middlesex CS cohort',
    date: 'Feb 2025',
    gradient: 'linear-gradient(135deg, #1a2e1a 0%, #2ecc71 60%, #f1c40f 100%)',
    tags: ['Society', 'Founder', 'Community'],
  },
  {
    id: 'freshers',
    title: 'Freshers Week',
    subtitle: 'First week at Middlesex — start of everything',
    date: 'Jan 2025',
    gradient: 'linear-gradient(135deg, #12100e 0%, #2c1654 50%, #a044ff 100%)',
    tags: ['University', 'Middlesex'],
  },
]

export default function PhotoViewer() {
  const [selected, setSelected] = useState<Photo | null>(null)

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      width: '100%', height: '100%',
      backgroundColor: '#0A0F1E', fontFamily: 'Ubuntu, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 20px', borderBottom: '1px solid #1E2D45',
        backgroundColor: '#0D1828', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ color: '#E8F4F8', fontSize: '14px', fontWeight: 600 }}>Photos</span>
        <span style={{ color: '#4A6080', fontSize: '12px' }}>{PHOTOS.length} photos</span>
      </div>

      {selected ? (
        /* ── Light box ── */
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '24px', gap: '20px',
        }}>
          <div style={{
            width: '100%', maxWidth: '520px',
            aspectRatio: '16/9',
            background: selected.gradient,
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'flex-end',
            padding: '20px',
          }}>
            <div style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              borderRadius: '8px',
              padding: '10px 14px',
            }}>
              <div style={{ color: '#E8F4F8', fontSize: '16px', fontWeight: 700 }}>{selected.title}</div>
              <div style={{ color: '#A0B4C8', fontSize: '12px', marginTop: '2px' }}>{selected.date}</div>
            </div>
          </div>

          <div style={{ maxWidth: '520px', width: '100%' }}>
            <p style={{ color: '#C8D8E8', fontSize: '14px', margin: '0 0 12px', lineHeight: 1.6 }}>
              {selected.subtitle}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {selected.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '11px', padding: '3px 10px', borderRadius: '20px',
                  backgroundColor: '#111E30', border: '1px solid #1E3045', color: '#8298b0',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setSelected(null)}
            style={{
              padding: '8px 20px', borderRadius: '8px', border: '1px solid #2A3F5F',
              background: '#111E30', color: '#C0CEDC', fontSize: '13px',
              cursor: 'pointer', fontFamily: 'Ubuntu, sans-serif',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#00D4FF')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A3F5F')}
          >
            ← Back to gallery
          </button>
        </div>
      ) : (
        /* ── Grid ── */
        <div style={{
          flex: 1, overflowY: 'auto',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
          alignContent: 'start',
        }}>
          {PHOTOS.map(photo => (
            <div
              key={photo.id}
              onClick={() => setSelected(photo)}
              style={{
                borderRadius: '10px', overflow: 'hidden', cursor: 'pointer',
                border: '1px solid #1E2D45',
                transition: 'transform 0.15s, box-shadow 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 12px 32px rgba(0,0,0,0.5)'
                el.style.borderColor = '#2A3F5F'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'none'
                el.style.boxShadow = 'none'
                el.style.borderColor = '#1E2D45'
              }}
            >
              {/* Thumbnail */}
              <div style={{
                height: '130px',
                background: photo.gradient,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', bottom: '8px', left: '10px',
                  fontSize: '10px', color: 'rgba(255,255,255,0.6)',
                  background: 'rgba(0,0,0,0.45)', borderRadius: '4px',
                  padding: '2px 6px',
                }}>
                  {photo.date}
                </div>
              </div>
              {/* Caption */}
              <div style={{ backgroundColor: '#111E30', padding: '10px 12px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#dce8f5', marginBottom: '3px' }}>
                  {photo.title}
                </div>
                <div style={{ fontSize: '11px', color: '#5A6F88', lineHeight: 1.4 }}>
                  {photo.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
