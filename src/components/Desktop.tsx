export default function Desktop() {
  return <div>
    <div style={{
        width: '100vw',
        height: '100vh',
        backgroundColor:'black',
        display: 'flex',
        flexDirection: 'column',
    }}>
    <div style={{ flex : 1 }}>
        </div>
        <div style = {{
            height : '40px',
            backgroundColor: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: ' 0 12px',
        }}>
            <button>Start</button>
            <p style={{ color: 'white'}}>22:00</p>
            </div>
        </div>
    </div>
}