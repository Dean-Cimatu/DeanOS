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
        <button style={{ display: 'block' }}>Terminal</button>
        <button style={{ display: 'block' }}>Contact</button>
    </div>
}