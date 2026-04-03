import GameWindow from './GameWindow'

// When ready: change status to "live" and add iframeSrc="YOUR_PICO8_EXPORT_URL"
export default function PicoRacer() {
  return (
    <GameWindow
      title="Pico Racer"
      description="A pseudo-3D outrun-style racing game. Built in Pico-8."
      status="coming-soon"
      tags={['Pico-8', 'Lua', 'Pseudo-3D']}
    />
  )
}
