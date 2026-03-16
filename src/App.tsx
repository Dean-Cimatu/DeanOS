import { useState } from "react";
import Boot from "./components/Boot";
import Login from "./components/Login";
import Desktop from "./components/Desktop";

export default function App() {
  const [stage, setStage] = useState('boot')
  return (
    <div>
      {stage == 'boot' && <Boot onComplete={() => setStage('login')} />}
      {stage == 'login' && <Login onComplete={() => setStage('desktop')} />}
      {stage == 'desktop' && <Desktop />}
    </div>
  )
}
