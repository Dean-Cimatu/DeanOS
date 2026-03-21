import { useWindowStore } from "../store/windowStore"
import type { WindowState } from "../store/windowStore"
import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { useEffect } from 'react'
import Terminal from './Terminal'

const AboutMe = () => <div style={{ padding: '20px' }}>About Me - Coming soon</div>
const Projects = () => <div style={{ padding: '20px' }}>Projects - Coming soon</div>
const Contact = () => <div style={{ padding: '20px' }}>Contact - Coming soon</div>

interface WindowProps{
    id: string
    windowData: WindowState
}

export default function Window({id, windowData}: WindowProps){
    const { closeWindow, focusWindow, moveWindow, minimiseWindow, openWindow,maximiseWindow } = useWindowStore()

    const isDragging = useRef<boolean>(false)
    const dragStart= useRef<({mouseX: number, mouseY: number, winX: number, winY:number})>({mouseX:0,mouseY:0,winX:0, winY:0})
    
    const handleMouseDown =(e: React.MouseEvent) => {
        
        isDragging.current = true
        dragStart.current = {mouseX:e.clientX, mouseY: e.clientY, winX: windowData.x, winY: windowData.y}
    }

    
   useEffect(() => {
    const handleDocumentMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return
        
        const newX = dragStart.current.winX + (e.clientX - dragStart.current.mouseX)
        const newY = dragStart.current.winY + (e.clientY - dragStart.current.mouseY)
        
        moveWindow(id, newX, newY)
    }
    
    const handleDocumentMouseUp = () => {
        isDragging.current = false
    }

    document.addEventListener('mousemove', handleDocumentMouseMove)
    document.addEventListener('mouseup', handleDocumentMouseUp)

    return () => {
        document.removeEventListener('mousemove', handleDocumentMouseMove)
        document.removeEventListener('mouseup', handleDocumentMouseUp)
    }
}, [])

    return(<div style={{
    position: 'absolute',
    left: windowData.x,
    top: windowData.y,
    width: windowData.width,
    height: windowData.height,
    zIndex: windowData.zIndex,
}}
    >
    <div style={{
        flex: 1,
        width: "100%",
        height: "40px",
        backgroundColor: "gray",
        display: "flex",
        userSelect: 'none',
        alignItems: 'center',
        justifyContent: "space-between",
        
        
    }}
    
    onMouseDown={handleMouseDown}
    >
        <div style={{ display: 'flex', gap: '5px' }}>
            <button onClick={() => minimiseWindow(id)} onMouseDown={(e) => e.stopPropagation()}>_</button>
            <button onClick={() => maximiseWindow(id)} onMouseDown={(e) => e.stopPropagation()}>+</button>
            <button onClick={() => closeWindow(id)} onMouseDown={(e) => e.stopPropagation()}>×</button>
        </div>
    </div>
    <div style={{
        
        width: "100%",
        height: "calc(100% - 40px)",
        backgroundColor: "white",
        display: "flex",
    }}>
        {id === "terminal" && <Terminal />}
        {id === "about-me" && <AboutMe />}
        {id === "projects" && <Projects />}
        {id === "contact" && <Contact />}
        </div>
    </div>)
}