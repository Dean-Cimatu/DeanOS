import { useState, useRef, useEffect } from 'react'

const INITIAL_CODE = `// hello_world.js — DeanOS v2.1.0
// A simple greeting from the OS kernel.

function greet(name) {
  const hour = new Date().getHours()
  const period =
    hour < 12 ? 'Good morning' :
    hour < 18 ? 'Good afternoon' :
                'Good evening'
  return \`\${period}, \${name}! Welcome to DeanOS.\`
}

const user = 'dean'
console.log(greet(user))
console.log('DeanOS v2.1.0 — all systems nominal.')
console.log(\`Loaded at: \${new Date().toLocaleTimeString()}\`)
`

interface LogLine {
  text: string
  type: 'log' | 'error' | 'info'
}

const KEYWORDS = ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'new', 'class', 'import', 'export', 'from', 'of', 'in']
const BUILTINS = ['console', 'Date', 'Math', 'JSON', 'Array', 'Object', 'String', 'Number', 'Boolean', 'undefined', 'null', 'true', 'false']

function highlight(code: string): React.ReactNode {
  const lines = code.split('\n')
  return lines.map((line, li) => {
    // Simple tokenizer: comments, strings, keywords, builtins, numbers
    const parts: { text: string; color: string }[] = []
    let i = 0

    while (i < line.length) {
      // Single-line comment
      if (line[i] === '/' && line[i + 1] === '/') {
        parts.push({ text: line.slice(i), color: '#4A6080' })
        i = line.length
        continue
      }
      // Template literal or regular string
      if (line[i] === '`' || line[i] === '"' || line[i] === "'") {
        const q = line[i]
        let j = i + 1
        while (j < line.length && line[j] !== q) {
          if (line[j] === '\\') j++
          j++
        }
        parts.push({ text: line.slice(i, j + 1), color: '#4dba8c' })
        i = j + 1
        continue
      }
      // Number
      if (/\d/.test(line[i])) {
        let j = i
        while (j < line.length && /[\d.]/.test(line[j])) j++
        parts.push({ text: line.slice(i, j), color: '#c8894a' })
        i = j
        continue
      }
      // Identifier / keyword
      if (/[a-zA-Z_$]/.test(line[i])) {
        let j = i
        while (j < line.length && /[\w$]/.test(line[j])) j++
        const word = line.slice(i, j)
        const color =
          KEYWORDS.includes(word) ? '#8a78e8' :
          BUILTINS.includes(word) ? '#00D4FF' :
          '#C8D8E8'
        parts.push({ text: word, color })
        i = j
        continue
      }
      // Punctuation / whitespace
      parts.push({ text: line[i], color: '#7d95af' })
      i++
    }

    return (
      <div key={li} style={{ lineHeight: '20px', minHeight: '20px' }}>
        {parts.map((p, pi) => (
          <span key={pi} style={{ color: p.color }}>{p.text}</span>
        ))}
      </div>
    )
  })
}

export default function CodeRunner() {
  const [code, setCode]     = useState(INITIAL_CODE)
  const [output, setOutput] = useState<LogLine[]>([])
  const [hasRun, setHasRun] = useState(false)
  const textareaRef         = useRef<HTMLTextAreaElement>(null)
  const outputRef           = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight
  }, [output])

  function runCode() {
    const lines: LogLine[] = []
    const fakeConsole = {
      log:   (...args: unknown[]) => lines.push({ text: args.map(String).join(' '), type: 'log' }),
      error: (...args: unknown[]) => lines.push({ text: args.map(String).join(' '), type: 'error' }),
      info:  (...args: unknown[]) => lines.push({ text: args.map(String).join(' '), type: 'info' }),
      warn:  (...args: unknown[]) => lines.push({ text: args.map(String).join(' '), type: 'info' }),
    }
    try {
      // Safe-ish eval within a sandboxed scope
      const fn = new Function('console', code)
      fn(fakeConsole)
    } catch (e) {
      lines.push({ text: `Error: ${e instanceof Error ? e.message : String(e)}`, type: 'error' })
    }
    setOutput(lines)
    setHasRun(true)
  }

  function clearOutput() {
    setOutput([])
    setHasRun(false)
  }

  const lineCount = code.split('\n').length

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      width: '100%', height: '100%',
      backgroundColor: '#0A0F1E', fontFamily: '"JetBrains Mono", monospace',
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '8px 14px', borderBottom: '1px solid #1E2D45',
        backgroundColor: '#0D1828', flexShrink: 0,
      }}>
        <span style={{ color: '#4A6080', fontSize: '12px', flex: 1 }}>hello_world.js</span>
        <button
          onClick={clearOutput}
          style={{
            padding: '5px 12px', borderRadius: '6px', border: '1px solid #2A3F5F',
            background: 'transparent', color: '#8899AA', fontSize: '11px',
            cursor: 'pointer', fontFamily: '"JetBrains Mono", monospace',
            transition: 'color 0.1s, border-color 0.1s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#E8F4F8'; e.currentTarget.style.borderColor = '#4A6080' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#8899AA'; e.currentTarget.style.borderColor = '#2A3F5F' }}
        >
          Clear
        </button>
        <button
          onClick={runCode}
          style={{
            padding: '5px 14px', borderRadius: '6px', border: '1px solid #00D4FF',
            background: 'rgba(0,212,255,0.1)', color: '#00D4FF', fontSize: '11px',
            cursor: 'pointer', fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 600, transition: 'background 0.1s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.2)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.1)')}
        >
          ▶ Run
        </button>
      </div>

      {/* Editor + output split */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Editor */}
        <div style={{
          flex: 1, position: 'relative', overflow: 'hidden',
          borderRight: '1px solid #1E2D45',
        }}>
          {/* Line numbers */}
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '36px',
            backgroundColor: '#0D1828', borderRight: '1px solid #1A2535',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
            padding: '14px 6px 14px 0', userSelect: 'none', overflowY: 'hidden',
            zIndex: 1,
          }}>
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i} style={{ fontSize: '12px', lineHeight: '20px', color: '#2A3F5F', minHeight: '20px' }}>
                {i + 1}
              </div>
            ))}
          </div>

          {/* Highlighted code overlay */}
          <div style={{
            position: 'absolute', top: 0, left: '36px', right: 0, bottom: 0,
            padding: '14px 14px 14px 10px',
            fontSize: '12px', lineHeight: '20px',
            whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            pointerEvents: 'none', userSelect: 'none', zIndex: 1,
            overflowY: 'auto',
          }}>
            {highlight(code)}
          </div>

          {/* Invisible textarea for editing */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
            style={{
              position: 'absolute', top: 0, left: '36px', right: 0, bottom: 0,
              padding: '14px 14px 14px 10px',
              fontSize: '12px', lineHeight: '20px',
              fontFamily: '"JetBrains Mono", monospace',
              background: 'transparent',
              border: 'none', outline: 'none', resize: 'none',
              color: 'transparent', caretColor: '#00D4FF',
              zIndex: 2, overflowY: 'auto',
            }}
          />
        </div>

        {/* Output panel */}
        <div style={{
          width: '240px', flexShrink: 0,
          display: 'flex', flexDirection: 'column',
          backgroundColor: '#080D18',
        }}>
          <div style={{
            padding: '8px 12px', borderBottom: '1px solid #1E2D45',
            fontSize: '10px', color: '#4A6080',
            textTransform: 'uppercase', letterSpacing: '0.1em',
            fontWeight: 600,
          }}>
            Output
          </div>
          <div
            ref={outputRef}
            style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}
          >
            {!hasRun && (
              <div style={{ color: '#2A3F5F', fontSize: '11px' }}>Press ▶ Run to execute</div>
            )}
            {output.map((line, i) => (
              <div key={i} style={{
                fontSize: '11px', lineHeight: '18px',
                color: line.type === 'error' ? '#FF4444' : line.type === 'info' ? '#FFD700' : '#00FF88',
                marginBottom: '2px', wordBreak: 'break-all',
              }}>
                {line.type !== 'log' && (
                  <span style={{ marginRight: '4px', opacity: 0.7 }}>
                    {line.type === 'error' ? '✖' : 'ℹ'}
                  </span>
                )}
                {line.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
