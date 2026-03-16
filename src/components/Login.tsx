import { useState } from "react";

export default function Login({ onComplete }: { onComplete: () => void }) {
  const [username, setUsername] = useState("");

      return(
    <div style = {{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }}>
        <div style = {{
            width: '45vw',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            padding: '24px',
        }}>
            <div style={{ color: 'white' }}>
                <h2> Welcome to DeanOS! </h2>
                <p>Enter your username to log in</p>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <br />
                <button onClick={() => onComplete()}>
                    Login
                </button>
            </div>
        </div>
    </div>
    )
}