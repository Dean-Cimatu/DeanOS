import { useReducer, useEffect } from 'react'

type Op = '+' | '−' | '×' | '÷'

const MAX_LEN = 12

// ── State ─────────────────────────────────────────────────────────────────────

interface State {
  display: string         // number shown on main line
  expression: string      // dimmed top line, e.g. "12 +"
  accumulator: number | null  // stored left-hand operand
  pendingOp: Op | null    // operator waiting to be applied
  resetOnNext: boolean    // next digit press starts a fresh number
  repeatRhs: number | null   // rhs of last completed = (for repeated = presses)
  repeatOp: Op | null        // op of last completed =
}

const INITIAL: State = {
  display: '0',
  expression: '',
  accumulator: null,
  pendingOp: null,
  resetOnNext: false,
  repeatRhs: null,
  repeatOp: null,
}

// ── Pure helpers ──────────────────────────────────────────────────────────────

function applyOp(a: number, op: Op, b: number): number {
  switch (op) {
    case '+': return a + b
    case '−': return a - b
    case '×': return a * b
    case '÷': return b === 0 ? NaN : a / b
  }
}

function fmt(n: number): string {
  if (!isFinite(n)) return 'Error'
  const s = String(n)
  if (s.length <= MAX_LEN) return s
  const e4 = n.toExponential(4)
  return e4.length <= MAX_LEN ? e4 : n.toExponential(2)
}

// ── Reducer ───────────────────────────────────────────────────────────────────

type Action =
  | { type: 'DIGIT'; digit: string }
  | { type: 'DECIMAL' }
  | { type: 'OPERATOR'; op: Op }
  | { type: 'EQUALS' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'PERCENTAGE' }
  | { type: 'BACKSPACE' }
  | { type: 'CLEAR' }

function reducer(s: State, action: Action): State {
  const isError = s.display === 'Error'

  switch (action.type) {

    case 'DIGIT': {
      if (isError) return { ...INITIAL, display: action.digit }
      if (s.resetOnNext) {
        return { ...s, display: action.digit === '0' ? '0' : action.digit, resetOnNext: false }
      }
      if (s.display === '0' && action.digit !== '0') {
        return { ...s, display: action.digit }
      }
      if (s.display.length >= MAX_LEN) return s
      return { ...s, display: s.display + action.digit }
    }

    case 'DECIMAL': {
      if (isError) return { ...INITIAL, display: '0.' }
      if (s.resetOnNext) return { ...s, display: '0.', resetOnNext: false }
      if (s.display.includes('.')) return s
      return { ...s, display: s.display + '.' }
    }

    case 'OPERATOR': {
      if (isError) return s
      const { op } = action
      const current = parseFloat(s.display)

      // Operator pressed immediately after another operator — just swap it
      if (s.resetOnNext && s.accumulator !== null) {
        return { ...s, pendingOp: op, expression: `${s.display} ${op}` }
      }

      // Operator pressed after a result or at start — use display as left operand
      if (s.accumulator === null) {
        return {
          ...s,
          accumulator: current,
          pendingOp: op,
          expression: `${s.display} ${op}`,
          resetOnNext: true,
          repeatRhs: null,
          repeatOp: null,
        }
      }

      // Operator pressed after typing a right operand — chain: compute first, then queue new op
      const result = applyOp(s.accumulator, s.pendingOp!, current)
      const displayed = fmt(result)
      return {
        ...s,
        display: displayed,
        expression: `${displayed} ${op}`,
        accumulator: isFinite(result) ? result : null,
        pendingOp: op,
        resetOnNext: true,
        repeatRhs: null,
        repeatOp: null,
      }
    }

    case 'EQUALS': {
      if (isError) return s
      const current = parseFloat(s.display)

      // Normal calculation: there's a pending operator and left operand
      if (s.accumulator !== null && s.pendingOp !== null) {
        const rhs = current
        const result = applyOp(s.accumulator, s.pendingOp, rhs)
        const displayed = fmt(result)
        return {
          ...s,
          display: displayed,
          expression: `${s.accumulator} ${s.pendingOp} ${rhs} =`,
          accumulator: null,
          pendingOp: null,
          resetOnNext: true,
          repeatRhs: rhs,
          repeatOp: s.pendingOp,
        }
      }

      // Repeated = press: replay last op+rhs against current display
      if (s.repeatOp !== null && s.repeatRhs !== null) {
        const result = applyOp(current, s.repeatOp, s.repeatRhs)
        const displayed = fmt(result)
        return {
          ...s,
          display: displayed,
          expression: `${current} ${s.repeatOp} ${s.repeatRhs} =`,
          accumulator: null,
          pendingOp: null,
          resetOnNext: true,
          // repeatRhs and repeatOp stay the same for further repeats
        }
      }

      // Nothing to compute
      return { ...s, expression: `${s.display} =`, resetOnNext: true }
    }

    case 'TOGGLE_SIGN': {
      if (isError) return s
      const n = parseFloat(s.display)
      return { ...s, display: fmt(-n) }
    }

    case 'PERCENTAGE': {
      if (isError) return s
      const n = parseFloat(s.display)
      return { ...s, display: fmt(n / 100) }
    }

    case 'BACKSPACE': {
      if (isError || s.resetOnNext) return s
      const next = s.display.length > 1 ? s.display.slice(0, -1) : '0'
      return { ...s, display: next }
    }

    case 'CLEAR':
      return { ...INITIAL }
  }
}

// ── Button grid spec ──────────────────────────────────────────────────────────

type Variant = 'number' | 'operator' | 'function'

interface Btn {
  label: string
  variant: Variant
  colSpan?: number
  action: Action
}

const BUTTONS: Btn[] = [
  { label: 'AC',  variant: 'function',  action: { type: 'CLEAR' } },
  { label: '+/−', variant: 'function',  action: { type: 'TOGGLE_SIGN' } },
  { label: '%',   variant: 'function',  action: { type: 'PERCENTAGE' } },
  { label: '÷',   variant: 'operator',  action: { type: 'OPERATOR', op: '÷' } },

  { label: '7',   variant: 'number',    action: { type: 'DIGIT', digit: '7' } },
  { label: '8',   variant: 'number',    action: { type: 'DIGIT', digit: '8' } },
  { label: '9',   variant: 'number',    action: { type: 'DIGIT', digit: '9' } },
  { label: '×',   variant: 'operator',  action: { type: 'OPERATOR', op: '×' } },

  { label: '4',   variant: 'number',    action: { type: 'DIGIT', digit: '4' } },
  { label: '5',   variant: 'number',    action: { type: 'DIGIT', digit: '5' } },
  { label: '6',   variant: 'number',    action: { type: 'DIGIT', digit: '6' } },
  { label: '−',   variant: 'operator',  action: { type: 'OPERATOR', op: '−' } },

  { label: '1',   variant: 'number',    action: { type: 'DIGIT', digit: '1' } },
  { label: '2',   variant: 'number',    action: { type: 'DIGIT', digit: '2' } },
  { label: '3',   variant: 'number',    action: { type: 'DIGIT', digit: '3' } },
  { label: '+',   variant: 'operator',  action: { type: 'OPERATOR', op: '+' } },

  { label: '0',   variant: 'number',    colSpan: 2, action: { type: 'DIGIT', digit: '0' } },
  { label: '.',   variant: 'number',    action: { type: 'DECIMAL' } },
  { label: '=',   variant: 'operator',  action: { type: 'EQUALS' } },
]

const BG: Record<Variant, string>       = { number: '#1E2D45', operator: '#00D4FF', function: '#2A3F5F' }
const BG_HOVER: Record<Variant, string> = { number: '#243355', operator: '#00BBEE', function: '#344F73' }
const FG: Record<Variant, string>       = { number: '#E8F4F8', operator: '#0A0F1E', function: '#E8F4F8' }

// ── Component ─────────────────────────────────────────────────────────────────

export default function Calculator() {
  const [s, dispatch] = useReducer(reducer, INITIAL)
  const isError = s.display === 'Error'

  // Keyboard handler — dispatch directly, no stale closures possible
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if ('0123456789'.includes(e.key)) { e.preventDefault(); dispatch({ type: 'DIGIT', digit: e.key }); return }
      if (e.key === '.')                 { e.preventDefault(); dispatch({ type: 'DECIMAL' }); return }
      if (e.key === '+')                 { e.preventDefault(); dispatch({ type: 'OPERATOR', op: '+' }); return }
      if (e.key === '-')                 { e.preventDefault(); dispatch({ type: 'OPERATOR', op: '−' }); return }
      if (e.key === '*')                 { e.preventDefault(); dispatch({ type: 'OPERATOR', op: '×' }); return }
      if (e.key === '/')                 { e.preventDefault(); dispatch({ type: 'OPERATOR', op: '÷' }); return }
      if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); dispatch({ type: 'EQUALS' }); return }
      if (e.key === 'Backspace')         { e.preventDefault(); dispatch({ type: 'BACKSPACE' }); return }
      if (e.key === 'Escape')            { e.preventDefault(); dispatch({ type: 'CLEAR' }); return }
      if (e.key === '%')                 { e.preventDefault(); dispatch({ type: 'PERCENTAGE' }); return }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, []) // no deps — dispatch is stable, reducer always sees fresh state

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      width: '100%', height: '100%',
      backgroundColor: '#0A0F1E',
      fontFamily: '"JetBrains Mono", monospace',
      userSelect: 'none',
    }}>
      {/* Display */}
      <div style={{ flexShrink: 0, padding: '16px 16px 8px' }}>
        {/* Expression line — muted, right-aligned, truncates on left if long */}
        <div style={{
          textAlign: 'right', color: '#8899AA', fontSize: '13px',
          minHeight: '20px', overflow: 'hidden', whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}>
          {s.expression || '\u00A0'}
        </div>
        {/* Main display — left-to-right, right-aligned, shrinks font for long numbers */}
        <div style={{
          textAlign: 'right',
          fontSize: s.display.length > 9 ? '26px' : s.display.length > 6 ? '32px' : '40px',
          fontWeight: 300, lineHeight: 1.15, marginTop: '4px',
          overflow: 'hidden', whiteSpace: 'nowrap',
          textOverflow: 'clip',
          color: isError ? '#FF4444' : '#E8F4F8',
          transition: 'font-size 0.08s',
        }}>
          {s.display}
        </div>
      </div>

      {/* Button grid */}
      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
        gap: '6px', padding: '8px 10px 10px',
      }}>
        {BUTTONS.map(btn => (
          <button
            key={btn.label}
            onClick={() => dispatch(btn.action)}
            style={{
              gridColumn: btn.colSpan ? `span ${btn.colSpan}` : undefined,
              backgroundColor: BG[btn.variant],
              color: FG[btn.variant],
              border: 'none', borderRadius: '12px',
              fontSize: '20px',
              fontWeight: btn.variant === 'number' ? 500 : 600,
              fontFamily: '"JetBrains Mono", monospace',
              cursor: 'pointer',
              transition: 'background-color 80ms, transform 80ms',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = BG_HOVER[btn.variant])}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = BG[btn.variant])}
            onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.95)' }}
            onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}
