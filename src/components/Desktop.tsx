import {useState, useEffect} from "react"
import  StartMenu from './StartMenu'

export default function Desktop() {

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
            
        <div style={{ 
            flex : 1,
            background: 'linear-gradient(115deg, #0f0c29, #302b63, #24243e)',
            }}>
            </div>
            {menuOpen && <StartMenu />}
            <div style = {{
                height : '40px',
                backgroundColor: '#1a1a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: ' 0 12px',
            }}>
                <button onClick={() => {
                    setMenuOpen(!menuOpen)
                }}>Start</button>
                <p style={{ color: 'white'}}>{currentTime}</p>
                </div>
            </div>
        </div>
    }