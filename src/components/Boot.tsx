import { useState, useEffect } from "react";

const BOOT_LINES =[
    '[OK] Loading kernel Modules',
    '[OK] Starting Display',
    '[OK] Starting display driver',
    '[OK] Intialising DeanOS ',
    '[OK] Launching Drivers',
    '[OK] Having fun',
]



export default function Boot({onComplete}:{onComplete: () => void}) {
    const [lines, setLines] = useState<string[]>([])
    
    useEffect(() => {
  let index = 0
  const interval = setInterval(() => {
    if (index < BOOT_LINES.length) {
      setLines(prev => [...prev, BOOT_LINES[index]])
      index++
    } else {
      clearInterval(interval)
      setTimeout(() => onComplete(), 500)
    }
  }, 300)

  return () => clearInterval(interval)
}, [])
  return (
  <div style={{ 
    background: 'black', 
    width: '100vw', 
    height: '100vh', 
    padding: '20px',
    fontFamily: 'monospace'
  }}>
    {lines.map((line, index) => (
      <p key={index} style={{ color: '#00ff00', margin: '4px 0' }}>
        {line}
      </p>
    ))}
  </div>
)
}
