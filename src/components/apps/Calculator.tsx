import { useState, useEffect, useCallback } from 'react'

type Operator = '+' | '−' | '×' | '÷' | null

const MAX_LEN = 12

function formatResult(n: number): string {
  if (!isFinite(n)) return 'Error'
  const s = String(n)
  if (s.length <= MAX_LEN) return s
  // Try toPrecision to fit
  const exp = n.toExponential(4)
  return exp.length <= MAX_LEN ? exp : n.toExponential(2)
}

export default function Calculator() {
  const [display, setDisplay]                     = useState('0')
  const [expression, setExpression]               = useState('')
  const [prevValue, setPrevValue]                 = useState<number | null>(null)
  const [operator, setOperator]                   = useState<Operator>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  // For repeated = presses
  const [lastOperand, setLastOperand]             = useState<number | null>(null)
  const [lastOperator, setLastOperator]           = useState<Operator>(null)

  const isError = display === 'Error'

  const clear = useCallback(() => {
    setDisplay('0')
    setExpression('')
    setPrevValue(null)
    setOperator(null)
    setWaitingForOperand(false)
    setLastOperand(null)
    setLastOperator(null)
  }, [])

  const inputDigit = useCallback((digit: string) => {
    if (isError) { setDisplay(digit); setExpression(''); return }
    setDisplay(prev => {
      if (waitingForOperand) {
        setWaitingForOperand(false)
        return digit
      }
      if (prev === '0' && digit !== '.') return digit
      if (prev.length >= MAX_LEN) return prev
      return prev + digit
    })
  }, [isError, waitingForOperand])

  const inputDecimal = useCallback(() => {
    if (isError) { setDisplay('0.'); setExpression(''); return }
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
      return
    }
    setDisplay(prev => prev.includes('.') ? prev : prev + '.')
  }, [isError, waitingForOperand])

  const backspace = useCallback(() => {
    if (isError || waitingForOperand) return
    setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0')
  }, [isError, waitingForOperand])

  const applyOp = (a: number, op: Operator, b: number): number => {
    switch (op) {
      case '+': return a + b
      case '−': return a - b
      case '×': return a * b
      case '÷': return b === 0 ? NaN : a / b
      default:  return b
    }
  }

  const handleOperator = useCallback((op: Operator) => {
    if (isError) return
    const current = parseFloat(display)
    if (prevValue !== null && !waitingForOperand) {
      const result = applyOp(prevValue, operator, current)
      const formatted = formatResult(result)
      setDisplay(formatted)
      setExpression(`${formatted} ${op}`)
      setPrevValue(isFinite(result) ? result : null)
    } else {
      setExpression(`${display} ${op}`)
      setPrevValue(current)
    }
    setOperator(op)
    setWaitingForOperand(true)
    setLastOperand(null)
    setLastOperator(null)
  }, [isError, display, prevValue, operator, waitingForOperand])

  const calculate = useCallback(() => {
    if (isError) return
    const current = parseFloat(display)

    // Repeated = : replay last operation
    if (waitingForOperand && lastOperand !== null && lastOperator !== null) {
      const result = applyOp(parseFloat(display), lastOperator, lastOperand)
      const formatted = formatResult(result)
      setDisplay(formatted)
      setExpression(`${display} ${lastOperator} ${lastOperand} =`)
      setPrevValue(null)
      setOperator(null)
      setWaitingForOperand(false)
      return
    }

    if (prevValue === null || operator === null) {
      setExpression(`${display} =`)
      setWaitingForOperand(false)
      return
    }

    const result = applyOp(prevValue, operator, current)
    const formatted = formatResult(result)
    setExpression(`${prevValue} ${operator} ${current} =`)
    setDisplay(formatted)
    setLastOperand(current)
    setLastOperator(operator)
    setPrevValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }, [isError, display, prevValue, operator, waitingForOperand, lastOperand, lastOperator])

  const toggleSign = useCallback(() => {
    if (isError) return
    setDisplay(prev => {
      const n = parseFloat(prev)
      return formatResult(-n)
    })
  }, [isError])

  const percentage = useCallback(() => {
    if (isError) return
    setDisplay(prev => formatResult(parseFloat(prev) / 100))
  }, [isError])

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if ('0123456789'.includes(e.key))  { e.preventDefault(); inputDigit(e.key); return }
      if (e.key === '.')                  { e.preventDefault(); inputDecimal(); return }
      if (e.key === '+')                  { e.preventDefault(); handleOperator('+'); return }
      if (e.key === '-')                  { e.preventDefault(); handleOperator('−'); return }
      if (e.key === '*')                  { e.preventDefault(); handleOperator('×'); return }
      if (e.key === '/')                  { e.preventDefault(); handleOperator('÷'); return }
      if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); calculate(); return }
      if (e.key === 'Backspace')          { e.preventDefault(); backspace(); return }
      if (e.key === 'Escape')             { e.preventDefault(); clear(); return }
      if (e.key === '%')                  { e.preventDefault(); percentage(); return }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [inputDigit, inputDecimal, handleOperator, calculate, backspace, clear, percentage])

  // ── Button definitions ─────────────────────────────────────────────────────

  type BtnVariant = 'number' | 'operator' | 'function'

  interface Btn {
    label: string
    variant: BtnVariant
    colSpan?: number
    action: () => void
  }

  const buttons: Btn[] = [
    { label: 'AC',  variant: 'function',  action: clear },
    { label: '+/−', variant: 'function',  action: toggleSign },
    { label: '%',   variant: 'function',  action: percentage },
    { label: '÷',   variant: 'operator',  action: () => handleOperator('÷') },

    { label: '7',   variant: 'number',    action: () => inputDigit('7') },
    { label: '8',   variant: 'number',    action: () => inputDigit('8') },
    { label: '9',   variant: 'number',    action: () => inputDigit('9') },
    { label: '×',   variant: 'operator',  action: () => handleOperator('×') },

    { label: '4',   variant: 'number',    action: () => inputDigit('4') },
    { label: '5',   variant: 'number',    action: () => inputDigit('5') },
    { label: '6',   variant: 'number',    action: () => inputDigit('6') },
    { label: '−',   variant: 'operator',  action: () => handleOperator('−') },

    { label: '1',   variant: 'number',    action: () => inputDigit('1') },
    { label: '2',   variant: 'number',    action: () => inputDigit('2') },
    { label: '3',   variant: 'number',    action: () => inputDigit('3') },
    { label: '+',   variant: 'operator',  action: () => handleOperator('+') },

    { label: '0',   variant: 'number',    colSpan: 2, action: () => inputDigit('0') },
    { label: '.',   variant: 'number',    action: inputDecimal },
    { label: '=',   variant: 'operator',  action: calculate },
  ]

  const bgMap: Record<BtnVariant, string> = {
    number:   '#1E2D45',
    operator: '#00D4FF',
    function: '#2A3F5F',
  }
  const bgHoverMap: Record<BtnVariant, string> = {
    number:   '#243355',
    operator: '#00BBEE',
    function: '#344F73',
  }
  const colorMap: Record<BtnVariant, string> = {
    number:   '#E8F4F8',
    operator: '#0A0F1E',
    function: '#E8F4F8',
  }

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
        {/* Expression line */}
        <div style={{
          textAlign: 'right', color: '#8899AA', fontSize: '13px',
          minHeight: '20px', overflow: 'hidden', whiteSpace: 'nowrap',
          direction: 'rtl', textOverflow: 'ellipsis',
        }}>
          {expression || '\u00A0'}
        </div>
        {/* Main display */}
        <div style={{
          textAlign: 'right',
          fontSize: display.length > 9 ? '28px' : '40px',
          fontWeight: 300, lineHeight: 1.1, marginTop: '4px',
          overflow: 'hidden', whiteSpace: 'nowrap',
          direction: 'rtl', textOverflow: 'ellipsis',
          color: isError ? '#FF4444' : '#E8F4F8',
          transition: 'font-size 0.1s',
        }}>
          {display}
        </div>
      </div>

      {/* Button grid */}
      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
        gap: '6px', padding: '8px 10px 10px',
      }}>
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            style={{
              gridColumn: btn.colSpan ? `span ${btn.colSpan}` : undefined,
              backgroundColor: bgMap[btn.variant],
              color: colorMap[btn.variant],
              border: 'none', borderRadius: '12px',
              fontSize: '20px', fontWeight: btn.variant === 'number' ? 500 : 600,
              fontFamily: '"JetBrains Mono", monospace',
              cursor: 'pointer',
              transition: 'background-color 80ms, transform 80ms',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = bgHoverMap[btn.variant])}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = bgMap[btn.variant])}
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
