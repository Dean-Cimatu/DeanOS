import { useWindowStore } from "../store/windowStore"


export default function StartMenu(){
    const { openWindow } = useWindowStore()

    const handleAboutMe= ()=> {
        openWindow({
            id: "about-me",
            title: "About Me",
            x: 50,
            y: 50,
            width: 400,
            height: 300,
            zIndex: 1,
            minimised: false,
            maximised:false,
            preMaxX: 50,
            preMaxY: 50,
            preMaxWidth: 400,
            preMaxHeight: 300,
        })
    }
    const handleTerminal = () => {
        openWindow({
            id: "terminal",
            title: "Terminal",
            x: 100,
            y: 100,
            width: 800,
            height: 500,
            zIndex: 1,
            minimised: false,
            maximised: false,
            preMaxX: 100,
            preMaxY: 100,
            preMaxWidth: 800,
            preMaxHeight: 500,
        })
    }

    return<div style ={{
        width: '25vw',
        height: '50vh',
        alignContent: 'left',
        justifyContent: 'left',
        backgroundColor: '#1a1a1a',
        position: 'absolute',
        bottom: '40px',
        left: '0',
    }}>
        <button 
        onClick={handleAboutMe}
        
        style={{ display: 'block' }}>About Me!</button>

        <button style={{ display: 'block' }}>Projects</button>

        <button 
        onClick={handleTerminal} 
        style={{ display: 'block' }}>Terminal</button>
        
        <button style={{ display: 'block' }}>Contact</button>
    </div>
}