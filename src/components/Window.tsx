import { useWindowStore } from "../store/windowStore"
import type { WindowState } from "../store/windowStore"
import { useRef } from 'react'
import type { MouseEvent } from 'react'

interface WindowProps{
    id: string
    windowData: WindowState
}

export default function Window({id, windowData}: WindowProps){
    const { closeWindow, focusWindow, moveWindow, minimiseWindow, openWindow } = useWindowStore()

    const isDragging = useRef<boolean>(false)
    const dragStart= useRef<({x: number, y: number})>({x:0,y:0})

    const handleMouseDown =(e: React.MouseEvent) => {
        isDragging.current = true
        dragStart.current = {x:e.clientX, y: e.clientY}
    }
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return

        const deltaX= e.clientX-dragStart.current.x
        const deltaY= e.clientY-dragStart.current.y

        moveWindow(id, windowData.x + deltaX, windowData.y + deltaY)
    }
    const handleMouseUp =() =>{
        isDragging.current = false
    }
    
    return(<div style={{
        position: 'absolute',
        left: windowData.x,
        top: windowData.y,
    zIndex: windowData.zIndex,
    }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
    >
    <div style={{
        flex: 1,
        width: "40vw",
        height: "40px",
        backgroundColor: "gray",
        display: "flex",
        alignItems: 'center',
        justifyContent: "space-between",
        
        
    }}
    
    onMouseDown={handleMouseDown}
    >
        <span>{windowData.title}</span>
        <button onClick={() => closeWindow(id)}>×</button>
    </div>
    <div style={{
        width: "40vw",
        height: "60vh",
        backgroundColor: "white",
        display: "flex",
    }}
    
    >
        </div>
    </div>)
}