// Sound asset registry
// Drop audio files into this directory, then replace the synthesised calls in
// src/lib/sounds.ts with `new Audio(importedPath).play()`.
//
// src/assets/sounds/
//   boot.mp3 / boot.ogg       — BIOS POST beep played when the logo appears
//   startup.mp3 / startup.ogg — OS startup chime played after successful login
//   error.mp3 / error.ogg     — wrong-password ping
//   notify.mp3 / notify.ogg   — notification bell (NotificationCentre)
//   click.mp3 / click.ogg     — generic UI click / key tick
//
// Recommended formats: .mp3 (broad support) + .ogg (Firefox fallback)
//
// Example usage once a file is added:
//   import bootSrc from './boot.mp3'
//   const audio = new Audio(bootSrc)
//   audio.volume = 0.4
//   audio.play()
