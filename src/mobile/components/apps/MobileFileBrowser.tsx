import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import { FILE_CONTENTS } from '../../../data/fileContents'

// ── Data ─────────────────────────────────────────────────────────────────────

interface FileEntry  { name: string; key: string; icon: string }
interface FolderEntry { name: string; icon: string; files: FileEntry[] }

const fileFolders: FolderEntry[] = [
  {
    name: 'DeanOS', icon: '🖥️',
    files: [{ name: 'DeanOS.md', key: 'DeanOS.md', icon: '📄' }],
  },
  {
    name: 'StudyBuddy', icon: '📚',
    files: [{ name: 'StudyBuddy.md', key: 'StudyBuddy.md', icon: '📄' }],
  },
  {
    name: 'DesignPatternCLI', icon: '⚙️',
    files: [{ name: 'DesignPatternCLI.md', key: 'DesignPatternCLI.md', icon: '📄' }],
  },
  {
    name: 'Resume', icon: '📋',
    files: [{ name: 'resume.txt', key: 'resume.txt', icon: '📝' }],
  },
]

// ── View type ─────────────────────────────────────────────────────────────────

type View =
  | { type: 'folders' }
  | { type: 'files'; folder: FolderEntry }
  | { type: 'reader'; file: FileEntry; folder: FolderEntry }

// ── Font sizes ────────────────────────────────────────────────────────────────

const FONT_SIZES = { sm: 13, base: 15, lg: 17 } as const
type FontSize = keyof typeof FONT_SIZES

// ── Markdown component map ────────────────────────────────────────────────────

function makeComponents(fontSize: FontSize): Components {
  const base = FONT_SIZES[fontSize]
  return {
    h1: ({ children }) => (
      <h1 style={{ color: '#00D4FF', fontSize: base + 9, fontWeight: 700, margin: '8px 0 16px', lineHeight: 1.25 }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ color: '#E8F4F8', fontSize: base + 5, fontWeight: 700, margin: '24px 0 10px', lineHeight: 1.3 }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ color: '#E8F4F8', fontSize: base + 2, fontWeight: 600, margin: '16px 0 6px' }}>
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p style={{ color: '#8899AA', fontSize: base, lineHeight: 1.7, margin: '0 0 12px' }}>
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul style={{ color: '#8899AA', paddingLeft: 20, margin: '0 0 12px' }}>{children}</ul>
    ),
    ol: ({ children }) => (
      <ol style={{ color: '#8899AA', paddingLeft: 20, margin: '0 0 12px' }}>{children}</ol>
    ),
    li: ({ children }) => (
      <li style={{ color: '#8899AA', fontSize: base, lineHeight: 1.6, marginBottom: 4 }}>
        {children}
      </li>
    ),
    code: ({ children, className }) => {
      const isBlock = className?.startsWith('language-')
      if (isBlock) {
        return (
          <code style={{
            display: 'block',
            background: '#1E2D45', color: '#00FF88',
            fontSize: base - 1, fontFamily: '"JetBrains Mono", monospace',
            padding: '12px 14px', borderRadius: 10,
            overflowX: 'auto', lineHeight: 1.6,
          }}>
            {children}
          </code>
        )
      }
      return (
        <code style={{
          background: '#1E2D45', color: '#00FF88',
          fontSize: base - 2, fontFamily: '"JetBrains Mono", monospace',
          padding: '2px 6px', borderRadius: 5,
        }}>
          {children}
        </code>
      )
    },
    pre: ({ children }) => (
      <pre style={{
        background: '#1E2D45', borderRadius: 10,
        padding: '12px 14px', overflowX: 'auto',
        margin: '0 0 16px',
        border: '1px solid #2A3F5F',
      }}>
        {children}
      </pre>
    ),
    strong: ({ children }) => (
      <strong style={{ color: '#E8F4F8', fontWeight: 600 }}>{children}</strong>
    ),
    em: ({ children }) => (
      <em style={{ color: '#A0B4C8', fontStyle: 'italic' }}>{children}</em>
    ),
    hr: () => (
      <hr style={{ border: 'none', borderTop: '1px solid #2A3F5F', margin: '20px 0' }} />
    ),
    a: ({ children, href }) => (
      <a href={href} target="_blank" rel="noopener noreferrer"
        style={{ color: '#00D4FF', textDecoration: 'underline' }}>
        {children}
      </a>
    ),
  }
}

// ── Row components ────────────────────────────────────────────────────────────

const Row = ({
  icon, title, sub, onTap, index,
}: { icon: string; title: string; sub?: string; onTap: () => void; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.06, type: 'spring', stiffness: 360, damping: 28 }}
    onPointerUp={onTap}
    style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px',
      background: '#1E2D45',
      borderRadius: 16, border: '1px solid #2A3F5F',
      cursor: 'pointer',
      marginBottom: 10,
      WebkitTapHighlightColor: 'transparent',
    }}
  >
    <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
    <div style={{ flex: 1, minWidth: 0 }}>
      <p style={{
        color: '#E8F4F8', fontSize: 14, fontWeight: 600,
        fontFamily: 'Inter, -apple-system, sans-serif',
        margin: 0,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {title}
      </p>
      {sub && (
        <p style={{
          color: '#8899AA', fontSize: 12,
          fontFamily: 'Inter, -apple-system, sans-serif',
          margin: '2px 0 0',
        }}>
          {sub}
        </p>
      )}
    </div>
    <span style={{ color: '#556677', fontSize: 20, flexShrink: 0 }}>›</span>
  </motion.div>
)

// ── Main component ────────────────────────────────────────────────────────────

export const MobileFileBrowser = () => {
  const [view, setView]     = useState<View>({ type: 'folders' })
  const [fontSize, setFontSize] = useState<FontSize>('sm')

  const goFolders = () => setView({ type: 'folders' })
  const goFiles   = (folder: FolderEntry) => setView({ type: 'files', folder })

  // Determine slide direction
  const xDir = view.type === 'folders' ? -16 : 16

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0A0F1E' }}>

      {/* Breadcrumb header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '10px 16px',
        borderBottom: '1px solid #2A3F5F',
        background: '#121929',
        flexShrink: 0,
        minHeight: 44,
      }}>
        <button
          onPointerUp={goFolders}
          disabled={view.type === 'folders'}
          style={{
            background: 'none', border: 'none', cursor: view.type === 'folders' ? 'default' : 'pointer',
            color: '#00D4FF', fontSize: 13,
            fontFamily: '"JetBrains Mono", monospace',
            opacity: view.type === 'folders' ? 0.4 : 1,
            padding: 0,
          }}
        >
          Files
        </button>

        {view.type !== 'folders' && (
          <>
            <span style={{ color: '#556677', fontSize: 13 }}>/</span>
            <button
              onPointerUp={() => view.type === 'reader' && goFiles(view.folder)}
              disabled={view.type === 'files'}
              style={{
                background: 'none', border: 'none',
                cursor: view.type === 'files' ? 'default' : 'pointer',
                color: '#00D4FF', fontSize: 13,
                fontFamily: '"JetBrains Mono", monospace',
                opacity: view.type === 'files' ? 0.4 : 1,
                padding: 0,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                maxWidth: view.type === 'reader' ? '30%' : '60%',
              }}
            >
              {view.type === 'files' ? view.folder.name : view.folder.name}
            </button>
          </>
        )}

        {view.type === 'reader' && (
          <>
            <span style={{ color: '#556677', fontSize: 13 }}>/</span>
            <span style={{
              color: '#8899AA', fontSize: 12,
              fontFamily: '"JetBrains Mono", monospace',
              flex: 1, minWidth: 0,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {view.file.name}
            </span>

            {/* Font size controls */}
            <div style={{ display: 'flex', gap: 4, flexShrink: 0, marginLeft: 6 }}>
              {(['sm', 'base', 'lg'] as const).map((s, i) => (
                <button
                  key={s}
                  onPointerUp={() => setFontSize(s)}
                  style={{
                    background: fontSize === s ? '#00D4FF' : 'rgba(255,255,255,0.06)',
                    border: '1px solid',
                    borderColor: fontSize === s ? '#00D4FF' : '#2A3F5F',
                    borderRadius: 6,
                    color: fontSize === s ? '#000' : '#8899AA',
                    fontSize: 9 + i * 1.5,
                    fontFamily: '"JetBrains Mono", monospace',
                    fontWeight: 600,
                    padding: '2px 6px',
                    cursor: 'pointer',
                    lineHeight: 1.5,
                  }}
                >
                  A
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content panels */}
      <AnimatePresence mode="wait">

        {view.type === 'folders' && (
          <motion.div
            key="folders"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18 }}
            style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 32px', touchAction: 'pan-y' }}
          >
            {fileFolders.map((folder, i) => (
              <Row
                key={folder.name}
                icon={folder.icon}
                title={folder.name}
                sub={`${folder.files.length} file${folder.files.length !== 1 ? 's' : ''}`}
                onTap={() => goFiles(folder)}
                index={i}
              />
            ))}
          </motion.div>
        )}

        {view.type === 'files' && (
          <motion.div
            key="files"
            initial={{ opacity: 0, x: xDir }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: xDir }}
            transition={{ duration: 0.18 }}
            style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 32px', touchAction: 'pan-y' }}
          >
            {view.folder.files.map((file, i) => (
              <Row
                key={file.key}
                icon={file.icon}
                title={file.name}
                onTap={() => setView({ type: 'reader', file, folder: view.folder })}
                index={i}
              />
            ))}
          </motion.div>
        )}

        {view.type === 'reader' && (
          <motion.div
            key={`reader-${view.file.key}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.18 }}
            style={{ flex: 1, overflowY: 'auto', padding: '20px 18px 48px', touchAction: 'pan-y' }}
          >
            {view.file.key.endsWith('.md') ? (
              <ReactMarkdown components={makeComponents(fontSize)}>
                {FILE_CONTENTS[view.file.key] ?? '# File not found'}
              </ReactMarkdown>
            ) : (
              <pre style={{
                color: '#E8F4F8',
                fontSize: FONT_SIZES[fontSize],
                fontFamily: '"JetBrains Mono", monospace',
                lineHeight: 1.7,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                margin: 0,
              }}>
                {FILE_CONTENTS[view.file.key] ?? 'File not found'}
              </pre>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
