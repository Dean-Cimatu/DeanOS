import {useState, useEffect} from "react"
import { useWindowStore } from "../store/windowStore"
import { WindowState } from '../store/windowStore'
import Window from './Window'
import  StartMenu from './StartMenu'
import { desktopFiles } from '../data/desktopFiles'
import FileIcon from './FileIcon'

export default function Desktop() {

    const windows = useWindowStore((state) => state.windows)

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    useEffect(()=> {
       const interval =setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
    return() => clearInterval(interval)
},[])
    const [menuOpen, setMenuOpen] = useState(false)

     return <div>
  <div style={{
    width: '100vw',
    height: '100vh',
    backgroundColor:'black',
    display: 'flex',
    flexDirection: 'column',
  }}>
    {/* Desktop Icons */}
   <div style={{ 
  display: 'flex', 
  gap: '20px', 
  padding: '20px', 
  flexWrap: 'wrap', 
  alignItems: 'flex-start',
  zIndex: 10,
  position: 'relative'
}}>
 {desktopFiles.map((file) => (
  <FileIcon key={file.id} file={file} />
))}
</div>

    {/* Gradient background with windows */}
    <div style={{ 
      flex: 1,
      background: 'linear-gradient(115deg, #0f0c29, #302b63, #24243e)',
      position: 'relative',
    }}>
      {Object.entries(windows).map(([id, windowData]) => (
        <Window key={id} id={id} windowData={windowData} />
      ))}
    </div>

    {menuOpen && <StartMenu />}
    
    {/* Taskbar */}
    <div style={{
      height: '40px',
      backgroundColor: '#1a1a1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 12px',
    }}>
      <button onClick={() => setMenuOpen(!menuOpen)}>Start</button>
      <p style={{ color: 'white' }}>{currentTime}</p>
    </div>
  </div>
</div>
}