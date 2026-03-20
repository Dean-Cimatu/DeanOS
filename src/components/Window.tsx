import { useWindowStore } from "../store/windowStore"
import type { WindowState } from "../store/windowStore"
import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { useEffect } from 'react'

interface WindowProps{
    id: string
    windowData: WindowState
}

export default function Window({id, windowData}: WindowProps){
    const { closeWindow, focusWindow, moveWindow, minimiseWindow, openWindow } = useWindowStore()

    const isDragging = useRef<boolean>(false)
    const dragStart= useRef<({mouseX: number, mouseY: number, winX: number, winY:number})>({mouseX:0,mouseY:0,winX:0, winY:0})

    const handleMouseDown =(e: React.MouseEvent) => {
        
        isDragging.current = true
        dragStart.current = {mouseX:e.clientX, mouseY: e.clientY, winX: windowData.x, winY: windowData.y}
    }
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return

        const newX = dragStart.current.winX + (e.clientX - dragStart.current.mouseX)
        const newY = dragStart.current.winY + (e.clientY - dragStart.current.mouseY)

        moveWindow(id, newX, newY)
    
    }
    const handleMouseUp =() =>{
        isDragging.current = false
    }
    
    useEffect(()=> {
        const handleDocumentMouseUp = () => {
            isDragging.current = false
        }

        document.addEventListener('mouseup', handleDocumentMouseUp)

        return ()=> document.removeEventListener('mouseup', handleDocumentMouseUp)
    },[])

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