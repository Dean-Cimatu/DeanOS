import { useWindowStore } from "../store/windowStore"
import type { WindowState } from "../store/windowStore"

interface WindowProps{
    id: string
    windowData: WindowState
}

export default function Window({id, windowData}: WindowProps){
    const { closeWindow, focusWindow, moveWindow, minimiseWindow, openWindow } = useWindowStore()
    return(<div>
    <div style={{
        width: "40vw",
        height: "60vh",
        backgroundColor: "white",
        display: "flex",

    }}
    >
    </div>
    <div style={{
        flex: 1,
        width: "40vw",
        height: "40px",
        backgroundColor: "gray",
        display: "flex",
        alignContent: "top",
        justifyContent: "top",
    }}
    >
    </div>
    </div>)
}