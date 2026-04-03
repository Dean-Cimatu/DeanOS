import GameWindow from './GameWindow'

// When ready: change status to "live" and add iframeSrc="YOUR_GODOT_EXPORT_URL"
export default function RogueSurvivor() {
  return (
    <GameWindow
      title="Rogue Survivor"
      description="A top-down auto-attacking roguelike survivor. Built in Godot."
      status="coming-soon"
      tags={['Godot 4', 'GDScript', 'Roguelike']}
    />
  )
}
