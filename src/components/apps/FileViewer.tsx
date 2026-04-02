import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { FILE_CONTENTS } from '../../data/fileContents'
import { useSystemStore } from '../../store/systemStore'

interface FileViewerProps {
  filename: string
}

type FontSize = 'small' | 'medium' | 'large'

const fontSizeMap: Record<FontSize, string> = {
  small:  '12px',
  medium: '14px',
  large:  '16px',
}

const fontSizeLabel: Record<FontSize, string> = {
  small:  'A−',
  medium: 'A',
  large:  'A+',
}

const SIZES: FontSize[] = ['small', 'medium', 'large']

export default function FileViewer({ filename }: FileViewerProps) {
  const addNotification = useSystemStore(s => s.addNotification)
  const [fontSize, setFontSize] = useState<FontSize>('medium')

  const content = FILE_CONTENTS[filename]
  const isMd = filename.endsWith('.md')
  const fs = fontSizeMap[fontSize]

  const shrink = () => {
    const idx = SIZES.indexOf(fontSize)
    if (idx > 0) setFontSize(SIZES[idx - 1])
  }
  const grow = () => {
    const idx = SIZES.indexOf(fontSize)
    if (idx < SIZES.length - 1) setFontSize(SIZES[idx + 1])
  }

  const handleCopy = async () => {
    if (!content) return
    try {
      await navigator.clipboard.writeText(content)
      addNotification({ type: 'success', title: 'Copied to clipboard', message: filename })
    } catch {
      addNotification({ type: 'error', title: 'Copy failed', message: 'Clipboard access denied.' })
    }
  }

  const toolbarBtn = (label: string, onClick: () => void, title?: string): React.ReactNode => (
    <button
      key={label}
      onClick={onClick}
      title={title}
      style={{
        background: 'none', border: '1px solid #2A3F5F', borderRadius: '5px',
        color: '#8899AA', fontSize: '12px', fontFamily: '"JetBrains Mono", monospace',
        padding: '3px 9px', cursor: 'pointer', transition: 'color 0.1s, border-color 0.1s',
        lineHeight: 1.5,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#E8F4F8'
        e.currentTarget.style.borderColor = '#00D4FF'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = '#8899AA'
        e.currentTarget.style.borderColor = '#2A3F5F'
      }}
    >
      {label}
    </button>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: '#0D1828', fontFamily: 'Ubuntu, sans-serif' }}>
      {/* Toolbar */}
      <div style={{
        height: 40, flexShrink: 0,
        backgroundColor: '#1E2D45', borderBottom: '1px solid #2A3F5F',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 14px', gap: '8px',
      }}>
        {/* Filename breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', minWidth: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#2A3F5F" stroke="#4A6080" strokeWidth="1.5"/>
            <polyline points="14 2 14 8 20 8" stroke="#4A6080" strokeWidth="1.5"/>
          </svg>
          <span style={{
            fontSize: '13px', fontFamily: '"JetBrains Mono", monospace',
            color: '#E8F4F8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {filename}
          </span>
          {isMd && (
            <span style={{
              fontSize: '10px', backgroundColor: 'rgba(0,212,255,0.12)',
              color: '#00D4FF', padding: '1px 7px', borderRadius: '10px',
              fontFamily: 'Ubuntu, sans-serif', flexShrink: 0,
            }}>
              Markdown
            </span>
          )}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          {toolbarBtn('A−', shrink, 'Decrease font size')}
          <span style={{ fontSize: '11px', color: '#3A5070', fontFamily: '"JetBrains Mono", monospace', width: 16, textAlign: 'center' }}>
            {fontSizeLabel[fontSize]}
          </span>
          {toolbarBtn('A+', grow, 'Increase font size')}
          <div style={{ width: 1, height: 16, backgroundColor: '#2A3F5F', margin: '0 2px' }} />
          {toolbarBtn('Copy', handleCopy, 'Copy file contents')}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
        {content === undefined ? (
          <div style={{ textAlign: 'center', paddingTop: '60px' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>📄</div>
            <div style={{ color: '#E8F4F8', fontSize: '15px', marginBottom: '8px' }}>File not found</div>
            <div style={{ color: '#8899AA', fontSize: '13px', fontFamily: '"JetBrains Mono", monospace' }}>
              {filename}
            </div>
          </div>
        ) : isMd ? (
          <div style={{ fontSize: fs, lineHeight: 1.7, maxWidth: 680 }}>
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 style={{ fontSize: '1.6em', fontWeight: 700, color: '#00D4FF', marginBottom: '0.6em', marginTop: 0 }}>{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 style={{ fontSize: '1.2em', fontWeight: 700, color: '#E8F4F8', marginBottom: '0.5em', marginTop: '1.6em', paddingBottom: '0.3em', borderBottom: '1px solid #1E2D45' }}>{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 style={{ fontSize: '1em', fontWeight: 600, color: '#C0D4E8', marginBottom: '0.4em', marginTop: '1.2em' }}>{children}</h3>
                ),
                p: ({ children }) => (
                  <p style={{ color: '#8899AA', lineHeight: 1.75, marginBottom: '0.8em' }}>{children}</p>
                ),
                ul: ({ children }) => (
                  <ul style={{ margin: '0.4em 0 0.8em 1.4em', padding: 0 }}>{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol style={{ margin: '0.4em 0 0.8em 1.6em', padding: 0 }}>{children}</ol>
                ),
                li: ({ children }) => (
                  <li style={{ color: '#8899AA', marginBottom: '0.3em', lineHeight: 1.7 }}>{children}</li>
                ),
                code: ({ children, className }) => {
                  const isBlock = !!className
                  if (isBlock) {
                    return (
                      <code style={{
                        display: 'block', backgroundColor: '#0A0F1E', color: '#00FF88',
                        padding: '14px 18px', borderRadius: '8px', fontSize: '0.88em',
                        fontFamily: '"JetBrains Mono", monospace', lineHeight: 1.6,
                        overflowX: 'auto', margin: '0.6em 0', border: '1px solid #1E2D45',
                      }}>{children}</code>
                    )
                  }
                  return (
                    <code style={{
                      backgroundColor: '#0A0F1E', color: '#00FF88',
                      padding: '1px 6px', borderRadius: '4px',
                      fontFamily: '"JetBrains Mono", monospace', fontSize: '0.9em',
                    }}>{children}</code>
                  )
                },
                pre: ({ children }) => <>{children}</>,
                strong: ({ children }) => (
                  <strong style={{ color: '#C0D4E8', fontWeight: 600 }}>{children}</strong>
                ),
                blockquote: ({ children }) => (
                  <blockquote style={{
                    borderLeft: '3px solid #00D4FF', paddingLeft: '16px',
                    margin: '0.8em 0', color: '#8899AA',
                  }}>{children}</blockquote>
                ),
                hr: () => <hr style={{ border: 'none', borderTop: '1px solid #1E2D45', margin: '1.4em 0' }} />,
                a: ({ children, href }) => (
                  <a href={href} style={{ color: '#00D4FF', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                  >{children}</a>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        ) : (
          <pre style={{
            fontSize: fs, fontFamily: '"JetBrains Mono", monospace',
            color: '#E8F4F8', lineHeight: 1.7, whiteSpace: 'pre-wrap',
            wordBreak: 'break-word', margin: 0,
          }}>
            {content}
          </pre>
        )}
      </div>
    </div>
  )
}
