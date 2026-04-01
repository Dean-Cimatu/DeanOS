import { useState, useRef, useEffect, useCallback } from 'react'
import { useWindowStore } from '../store/windowStore'

// ── Types ──────────────────────────────────────────────────────────────────

type Seg = { text: string; color?: string }
type Line = Seg[]

// ── Segment helpers ────────────────────────────────────────────────────────

const s = (text: string, color?: string): Seg => ({ text, color })
const plain = (text: string): Line => [s(text)]
const col = (text: string, c: string): Line => [s(text, c)]
const err = (text: string): Line => [s(text, RED)]
const dim = (text: string): Line => [s(text, DIM)]
const EMPTY: Line = [s('')]

const CYAN   = '#00D4FF'
const GREEN  = '#00FF88'
const WHITE  = '#E8F4F8'
const DIM    = '#8899AA'
const RED    = '#FF4444'
const YELLOW = '#FFD700'

// ── Virtual filesystem ─────────────────────────────────────────────────────

type Dir = '/home' | '/home/projects' | '/home/about'

const FS: Record<Dir, string[]> = {
  '/home':          ['about/', 'projects/', 'DeanOS.md', 'resume.txt'],
  '/home/projects': ['DeanOS/', 'carhire/', 'portfolio/'],
  '/home/about':    ['bio.txt', 'skills.txt'],
}

const dirAlias = (d: string) => d === '/home' ? '~' : d.replace('/home', '~')

// ── Static content ─────────────────────────────────────────────────────────

const WELCOME: Line[] = [
  [s('DeanOS Terminal', CYAN), s(' v2.1.0')],
  plain("Type 'help' for available commands."),
  EMPTY,
]

const GRASS = '#4ADE80'
const DIRT  = '#92400E'

const NEOFETCH_LINES: Line[] = [
  // Grass — solid top row
  [s('  ███████████████████████', GRASS)],
  // Grass — texture row (▓ spots for patchy variation)
  [s('  ██▓████▓███▓████▓██▓███', GRASS)],
  // Grass — drooping uneven bottom edge
  [s('  ▀██▀▀ ▀▀▀██▀ ▀▀ ▀ ▀██▀', GRASS)],
  // Dirt body
  [s('  ▒░▒░▒░░▒░▒▒░░▒░▒░▒▒░░▒░', DIRT)],
  [s('  ░▒░ ▒░▒ ░', DIRT), s('DeanOS', WHITE), s('▒ ░▒░ ▒░', DIRT)],
  [s('  ░▒▒░░▒░▒░▒░▒▒░░▒░░▒▒░▒░', DIRT)],
  // Dirt base (replaced stone)
  [s('  ▒▒░░▒░▒▒░░▒░▒░▒░▒▒░░▒░▒', DIRT)],
  EMPTY,
  // System info
  [s('  '), s('dean', GREEN), s('@', WHITE), s('deanos', GREEN)],
  [s('  ─────────────────────────', DIM)],
  [s('  OS:     ', CYAN), s('DeanOS Linux x86_64')],
  [s('  Kernel: ', CYAN), s('6.1.0-deanos')],
  [s('  CPU:    ', CYAN), s('DCPU @ 4.20 GHz (8C/16T)')],
  [s('  RAM:    ', CYAN), s('16384 MB DDR5-6000')],
  [s('  Shell:  ', CYAN), s('deanos-terminal')],
  [s('  WM:     ', CYAN), s('dean-compositor')],
  [s('  Uptime: ', CYAN), s('2h 14m')],
  [s('  Theme:  ', CYAN), s('Aurora Dark')],
  EMPTY,
]

const PROJECTS_LINES: Line[] = [
  col('Portfolio Projects', CYAN),
  col('─────────────────────────────────────────────────────', DIM),
  EMPTY,
  [s('DeanOS          ', GREEN), s('Browser-based desktop environment (React/TS)')],
  [s('Car Hire System ', GREEN), s('Rental management web app — live at carhire.deancimatu.com')],
  [s('Portfolio       ', GREEN), s('Personal portfolio site with project showcase')],
  EMPTY,
  [s('  Run ', DIM), s('open browser', CYAN), s(' to browse all projects', DIM)],
  EMPTY,
]

const SKILLS_LINES: Line[] = [
  col('Technical Skills', CYAN),
  col('─────────────────────────────────', DIM),
  EMPTY,
  [s('Languages   ', YELLOW), s('TypeScript  JavaScript  HTML  CSS  Python')],
  [s('Frameworks  ', YELLOW), s('React  Tailwind CSS  Node.js  Vite')],
  [s('Tools       ', YELLOW), s('Git  GitHub  VS Code  Figma')],
  [s('Concepts    ', YELLOW), s('Component architecture  REST APIs  Responsive design')],
  [s('Databases   ', YELLOW), s('PostgreSQL  MySQL  SQLite')],
  EMPTY,
]

const CONTACT_LINES: Line[] = [
  col('Contact', CYAN),
  col('─────────────────────────────────', DIM),
  EMPTY,
  [s('GitHub    ', YELLOW), s('github.com/Dean-Cimatu',     CYAN)],
  [s('Email     ', YELLOW), s('dean@deancimatu.com',        CYAN)],
  [s('Website   ', YELLOW), s('deancimatu.com',             CYAN)],
  [s('LinkedIn  ', YELLOW), s('linkedin.com/in/deancimatu', CYAN)],
  EMPTY,
]

const BIO_LINES: Line[] = [
  plain('Dean Cimatu — Software Engineer'),
  EMPTY,
  plain('Passionate about building clean, interactive web experiences.'),
  plain('Focused on React, TypeScript, and modern UI/UX patterns.'),
  plain('Currently working on DeanOS as a portfolio showcase project.'),
  EMPTY,
]

const RESUME_LINES: Line[] = [
  col('Dean Cimatu — Software Engineer', CYAN),
  col('────────────────────────────────────────────────────────────', DIM),
  EMPTY,
  col('EXPERIENCE', YELLOW),
  EMPTY,
  [s('Software Engineer — Personal Projects                ', WHITE), s('2023 - Present', DIM)],
  dim('  Built DeanOS: browser-based OS environment in React/TypeScript'),
  dim('  Developed interactive web apps focused on UX & component architecture'),
  EMPTY,
  [s('Junior Frontend Developer — Freelance               ', WHITE), s('2022 - 2023', DIM)],
  dim('  Delivered responsive interfaces for clients using React + Tailwind'),
  dim('  Maintained Git workflows, worked with REST APIs'),
  EMPTY,
  [s('Web Development Intern                              ', WHITE), s('2021 - 2022', DIM)],
  dim('  Built internal tools with HTML, CSS, vanilla JavaScript'),
  EMPTY,
  col('EDUCATION', YELLOW),
  EMPTY,
  plain('  BSc Computer Science  (2018 – 2022)'),
  EMPTY,
  col('SKILLS', YELLOW),
  EMPTY,
  plain('  TypeScript · JavaScript · React · Tailwind · Node.js · Git'),
  EMPTY,
]

const DEANOS_LINES: Line[] = [
  col('DeanOS', CYAN),
  col('─────────────────────────────────', DIM),
  EMPTY,
  plain('Browser-based desktop environment built as a portfolio project.'),
  plain('Simulates a full OS experience — boot, login, desktop, apps.'),
  EMPTY,
  col('Stack:', YELLOW),
  plain('  React 18 + TypeScript · Tailwind CSS · Vite · Zustand · Framer Motion'),
  EMPTY,
  col('Features:', YELLOW),
  [s('  • '), s('Cinematic boot sequence',    GREEN), s(' with POST scrolling and progress bar')],
  [s('  • '), s('Login screen',               GREEN), s(' with password auth and shake animation')],
  [s('  • '), s('Draggable + resizable windows', GREEN), s(' with minimise/maximise')],
  [s('  • '), s('System tray',                GREEN), s(' — clock, calendar, battery, wifi, volume, notifications')],
  [s('  • '), s('Terminal',                   GREEN), s(' with 22 commands and matrix animation')],
  [s('  • '), s('Browser app',                GREEN), s(' with portfolio project pages')],
  [s('  • '), s('Toast notifications',        GREEN), s(' with auto-dismiss')],
  EMPTY,
]

const COFFEE_LINES: Line[] = [
  col('      )  (         ', YELLOW),
  col('     (   ) )       ', YELLOW),
  col('      ) ( (        ', YELLOW),
  col('    _______)_      ', YELLOW),
  col('   |       |]      ', YELLOW),
  col('   \\       /       ', YELLOW),
  col("    `-----'        ", YELLOW),
  EMPTY,
  plain('  Coffee compiled. No errors.'),
  EMPTY,
]

const PS_LINES: Line[] = [
  [s('USER       PID  %CPU  %MEM  COMMAND', DIM)],
  plain('dean         1   0.0   0.1  /sbin/init'),
  plain('dean       142   0.2   1.4  window-compositor'),
  plain('dean       201   0.1   0.8  portfolio-daemon'),
  plain('dean       338   0.0   0.4  creativity-engine'),
  plain('dean      1042   0.4   2.1  browser-renderer'),
  plain('dean      2047   0.0   0.1  deanos-terminal'),
  EMPTY,
]

// ── Command list ───────────────────────────────────────────────────────────

const ALL_CMDS = [
  'help','clear','whoami','date','pwd','ls','cd','echo',
  'neofetch','history','cat','open','projects','skills','contact',
  'uname','uptime','ps','sudo','man','matrix','coffee',
]

function getCmdDesc(cmd: string): string {
  const m: Record<string, string> = {
    help:     'show available commands',
    clear:    'clear the terminal',
    whoami:   'current user',
    date:     'current date and time',
    pwd:      'print working directory',
    ls:       'list directory contents',
    cd:       'change directory',
    echo:     'echo arguments to output',
    cat:      'read a file',
    open:     'open an application  (browser, terminal)',
    neofetch: 'system information',
    projects: 'list portfolio projects',
    skills:   'list technical skills',
    contact:  'contact information',
    uname:    'print system information',
    uptime:   'system uptime',
    ps:       'list processes  (try: ps aux)',
    sudo:     'superuser command',
    man:      'show command manual',
    history:  'command history',
    matrix:   'enter the matrix',
    coffee:   'make coffee',
  }
  return m[cmd] ?? ''
}

// ── Command processor ──────────────────────────────────────────────────────

function processCmd(
  cmd: string,
  args: string[],
  dir: Dir,
  historyList: string[],
): { output: Line[]; newDir?: Dir; action?: string } {
  switch (cmd) {
    case 'help':
      return { output: [
        col('Available commands:', CYAN),
        EMPTY,
        ...ALL_CMDS.map(c => [s(`  ${c.padEnd(10)}`, CYAN), s(getCmdDesc(c))]),
        EMPTY,
      ]}

    case 'whoami':
      return { output: [plain('dean')] }

    case 'date':
      return { output: [plain(new Date().toString())] }

    case 'pwd':
      return { output: [plain(dir)] }

    case 'ls': {
      const files = FS[dir] ?? []
      if (!files.length) return { output: [dim('(empty)')] }
      return { output: files.map(f => [s(f, f.endsWith('/') ? CYAN : WHITE)]) }
    }

    case 'cd': {
      const target = args[0]
      if (!target || target === '~' || target === '/home') return { output: [], newDir: '/home' }
      const raw = target.startsWith('/') ? target : `${dir}/${target}`
      const norm = raw.replace(/\/+/g, '/').replace(/\/$/, '') as Dir
      if (FS[norm]) return { output: [], newDir: norm }
      return { output: [err(`cd: ${target}: No such file or directory`)] }
    }

    case 'echo':
      return { output: args.length ? [plain(args.join(' '))] : [EMPTY] }

    case 'cat': {
      if (!args[0]) return { output: [err('cat: missing operand')] }
      const f = args[0]
      if (f === 'resume.txt') return { output: RESUME_LINES }
      if (f === 'DeanOS.md')  return { output: DEANOS_LINES }
      if (f === 'bio.txt')    return { output: BIO_LINES }
      if (f === 'skills.txt') return { output: SKILLS_LINES }
      return { output: [err(`cat: ${f}: No such file or directory`)] }
    }

    case 'neofetch':
      return { output: NEOFETCH_LINES }

    case 'projects':
      return { output: PROJECTS_LINES }

    case 'skills':
      return { output: SKILLS_LINES }

    case 'contact':
      return { output: CONTACT_LINES }

    case 'uname':
      return { output: [plain('DeanOS Linux deanos 6.1.0-deanos #1 SMP x86_64 GNU/Linux')] }

    case 'uptime':
      return { output: [plain('up 2 hours, 14 minutes,  1 user,  load average: 0.42, 0.31, 0.28')] }

    case 'ps':
      return args[0] === 'aux'
        ? { output: PS_LINES }
        : { output: [err('usage: ps aux')] }

    case 'sudo':
      return { output: [
        col('dean is not in the sudoers file.', RED),
        col('This incident will be reported.', DIM),
      ]}

    case 'man': {
      const c = args[0]
      if (!c) return { output: [err('What manual page do you want?')] }
      if (!ALL_CMDS.includes(c)) return { output: [err(`No manual entry for ${c}`)] }
      return { output: [
        [s('NAME', YELLOW)],
        [s(`  ${c}`, CYAN), s(` — ${getCmdDesc(c)}`)],
        EMPTY,
        [s('SYNOPSIS', YELLOW)],
        [s(`  ${c}`, CYAN), s(' [arguments]')],
        EMPTY,
        [s('DESCRIPTION', YELLOW)],
        plain(`  Type '${c}' to execute. See 'help' for all commands.`),
        EMPTY,
      ]}
    }

    case 'history':
      return { output: historyList.length
        ? historyList.map((h, i) => [s(`  ${String(i + 1).padStart(3)}  `, DIM), s(h)])
        : [dim('  (no history)')] }

    case 'matrix':
      return { output: [col('Entering the matrix...', GREEN)], action: 'matrix' }

    case 'coffee':
      return { output: COFFEE_LINES }

    case 'open':
      return { output: [], action: `open:${args[0] ?? ''}` }

    case 'clear':
      return { output: [], action: 'clear' }

    default:
      return { output: [
        err(`${cmd}: command not found`),
        [s("Type 'help' for available commands.", DIM)],
      ]}
  }
}

// ── Matrix animation ───────────────────────────────────────────────────────

const MATRIX_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>/\\|'

function MatrixCanvas({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const cols = Math.floor(canvas.width / 14)
    const drops = Array<number>(cols).fill(0).map(() => Math.random() * -50)

    let frameId: number
    const timeout = setTimeout(() => {
      cancelAnimationFrame(frameId)
      onDone()
    }, 5000)

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.06)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = '13px "JetBrains Mono", monospace'

      for (let i = 0; i < drops.length; i++) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        const y = drops[i] * 14
        ctx.fillStyle = drops[i] < 1 ? '#FFFFFF' : '#00FF88'
        ctx.fillText(char, i * 14, y)
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i] += 1
      }
      frameId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(frameId); clearTimeout(timeout) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 10 }}
      onClick={onDone}
    />
  )
}

// ── Tab completion ─────────────────────────────────────────────────────────

function tabComplete(input: string, dir: Dir): string {
  const parts = input.split(' ')
  if (parts.length === 1) {
    const prefix = parts[0]
    const matches = ALL_CMDS.filter(c => c.startsWith(prefix))
    return matches.length === 1 ? matches[0] : input
  }
  const cmd = parts[0]
  const argPrefix = parts[parts.length - 1]
  let candidates: string[] = []
  if (cmd === 'cd')          candidates = (FS[dir] ?? []).filter(f => f.endsWith('/'))
  else if (cmd === 'cat')    candidates = (FS[dir] ?? []).filter(f => !f.endsWith('/'))
  else if (cmd === 'man')    candidates = ALL_CMDS
  else if (cmd === 'open')   candidates = ['browser', 'terminal']
  const match = candidates.find(c => c.startsWith(argPrefix))
  if (match) return [...parts.slice(0, -1), match.replace('/', '')].join(' ')
  return input
}

// ── Prompt ─────────────────────────────────────────────────────────────────

function promptSegs(dir: string): Line {
  return [
    s('dean', GREEN), s('@deanos', GREEN), s(':', WHITE),
    s(dirAlias(dir), CYAN), s('$ ', WHITE),
  ]
}

function promptLine(dir: string, cmd: string): Line {
  return [...promptSegs(dir), s(cmd)]
}

// ── Component ──────────────────────────────────────────────────────────────

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(WELCOME)
  const [input, setInput] = useState('')
  const [dir, setDir] = useState<Dir>('/home')
  const [historyList, setHistoryList] = useState<string[]>([])
  const [, setHistIdx] = useState(-1)
  const [matrixActive, setMatrixActive] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines, matrixActive])

  const appendLines = useCallback((newLines: Line[]) => {
    setLines(prev => [...prev, ...newLines])
  }, [])

  const handleSubmit = useCallback(() => {
    const raw = input.trim()
    setInput('')
    setHistIdx(-1)

    if (!raw) {
      appendLines([promptLine(dir, '')])
      return
    }

    const [cmd, ...args] = raw.split(/\s+/)
    if (raw) setHistoryList(h => [...h, raw])

    const result = processCmd(cmd, args, dir, historyList)

    if (result.action === 'clear') {
      setLines([...WELCOME])
      return
    }

    if (result.action === 'matrix') {
      appendLines([promptLine(dir, raw), ...result.output])
      setMatrixActive(true)
      return
    }

    if (result.action?.startsWith('open:')) {
      const app = result.action.slice(5)
      appendLines([promptLine(dir, raw)])
      if (app === 'browser') {
        useWindowStore.getState().openWindow({
          id: `browser-${Date.now()}`, title: 'Browser',
          x: 80, y: 60, width: 960, height: 620,
          zIndex: 1, minimised: false, maximised: false,
          preMaxX: 80, preMaxY: 60, preMaxWidth: 960, preMaxHeight: 620,
        })
      } else if (app === 'terminal') {
        useWindowStore.getState().openWindow({
          id: `terminal-${Date.now()}`, title: 'Terminal',
          x: 120, y: 100, width: 700, height: 480,
          zIndex: 1, minimised: false, maximised: false,
          preMaxX: 120, preMaxY: 100, preMaxWidth: 700, preMaxHeight: 480,
        })
      } else if (!app) {
        appendLines([err('open: specify an app  (browser, terminal)')])
      } else {
        appendLines([err(`open: unknown application '${app}'`), [s('Available: browser, terminal', DIM)]])
      }
      return
    }

    if (result.newDir) setDir(result.newDir)
    appendLines([promptLine(dir, raw), ...result.output])
  }, [input, dir, historyList, appendLines])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Tab') {
      e.preventDefault()
      setInput(prev => tabComplete(prev, dir))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistIdx(prev => {
        const next = prev === -1 ? historyList.length - 1 : Math.max(0, prev - 1)
        if (historyList[next] !== undefined) setInput(historyList[next])
        return next
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistIdx(prev => {
        const next = prev + 1
        if (next >= historyList.length) { setInput(''); return -1 }
        setInput(historyList[next])
        return next
      })
    }
  }, [handleSubmit, dir, historyList])

  return (
    <div
      style={{
        position: 'relative', width: '100%', height: '100%',
        backgroundColor: '#0A0F1E', fontFamily: '"JetBrains Mono", monospace',
        fontSize: '13px', display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output + input area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
        {lines.map((line, i) => (
          <div key={i} style={{ lineHeight: '1.6', whiteSpace: 'pre' }}>
            {line.map((seg, j) => (
              <span key={j} style={{ color: seg.color ?? WHITE }}>{seg.text}</span>
            ))}
          </div>
        ))}

        {/* Active input line */}
        <div style={{ display: 'flex', alignItems: 'center', lineHeight: '1.6', whiteSpace: 'pre' }}>
          {promptSegs(dir).map((seg, i) => (
            <span key={i} style={{ color: seg.color ?? WHITE }}>{seg.text}</span>
          ))}
          <span style={{ color: WHITE }}>{input}</span>
          <span style={{ animation: 'blink 1s step-end infinite', color: GREEN }}>█</span>
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Hidden capture input */}
      <input
        ref={inputRef}
        value={input}
        autoFocus
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          position: 'absolute', opacity: 0, pointerEvents: 'none',
          width: 1, height: 1, top: 0, left: 0,
        }}
      />

      {/* Matrix canvas overlay */}
      {matrixActive && <MatrixCanvas onDone={() => setMatrixActive(false)} />}

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  )
}
