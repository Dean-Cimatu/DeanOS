import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useClickOutside } from '../../../hooks/useClickOutside'

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

interface CalendarPopoverProps {
  date: Date
  onClose: () => void
}

export function CalendarPopover({ date, onClose }: CalendarPopoverProps) {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref as React.RefObject<HTMLElement>, onClose)

  const year = date.getFullYear()
  const month = date.getMonth()
  const today = date.getDate()

  const monthName = date.toLocaleString('default', { month: 'long' })

  // First weekday of the month (0 = Sun)
  const firstDow = new Date(year, month, 1).getDay()
  // Days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Build flat array: leading nulls + day numbers
  const cells: (number | null)[] = [
    ...Array<null>(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  // Pad to full rows of 7
  while (cells.length % 7 !== 0) cells.push(null)

  const rows: (number | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7))

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'absolute',
        bottom: '44px',
        right: 0,
        width: '256px',
        backgroundColor: '#1E2D45',
        border: '1px solid #2A3F5F',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
        zIndex: 9999,
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <button
          style={{ background: 'none', border: 'none', color: '#8899AA', cursor: 'pointer', fontSize: '14px', padding: '2px 6px', borderRadius: '4px' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#E8F4F8')}
          onMouseLeave={e => (e.currentTarget.style.color = '#8899AA')}
        >
          ‹
        </button>
        <span style={{ color: '#E8F4F8', fontSize: '13px', fontWeight: 700 }}>
          {monthName} {year}
        </span>
        <button
          style={{ background: 'none', border: 'none', color: '#8899AA', cursor: 'pointer', fontSize: '14px', padding: '2px 6px', borderRadius: '4px' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#E8F4F8')}
          onMouseLeave={e => (e.currentTarget.style.color = '#8899AA')}
        >
          ›
        </button>
      </div>

      {/* Day labels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '4px' }}>
        {DAY_LABELS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '10px', color: '#8899AA', padding: '2px 0' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {row.map((day, ci) => {
            const isToday = day === today
            return (
              <div
                key={ci}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '28px',
                }}
              >
                {day !== null && (
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      fontSize: '11px',
                      backgroundColor: isToday ? '#00D4FF' : 'transparent',
                      color: isToday ? '#0A0F1E' : '#C8D8E8',
                      fontWeight: isToday ? 700 : 400,
                    }}
                  >
                    {day}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </motion.div>
  )
}
