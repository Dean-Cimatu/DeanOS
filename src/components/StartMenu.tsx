export default function StartMenu(){
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
        <button style={{ display: 'block' }}>About Me!</button>
        <button style={{ display: 'block' }}>Projects</button>
        <button style={{ display: 'block' }}>Terminal</button>
        <button style={{ display: 'block' }}>Contact</button>
    </div>
}