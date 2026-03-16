import { useState } from "react";

export default function Login({ onComplete }: { onComplete: () => void }) {
  const [username, setUsername] = useState("");

  return (
    <div style={{ color: 'white' }}>
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
  );
}