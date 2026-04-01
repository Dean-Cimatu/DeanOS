// Web Audio API sound synthesiser — no audio files needed.
// Sounds are generated programmatically using oscillators.
//
// Call unlockAudio() on the first user gesture (click / keydown) so the
// AudioContext is allowed to run. Sounds called before unlocking will be
// silently skipped by the browser.

let ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext()
  return ctx
}

export function unlockAudio() {
  try {
    const c = getCtx()
    if (c.state === 'suspended') c.resume()
  } catch {}
}

function tone(
  freq: number,
  duration: number,
  volume: number,
  type: OscillatorType = 'sine',
  delayMs = 0,
) {
  try {
    const c = getCtx()
    if (c.state === 'suspended') return
    const t = c.currentTime + delayMs / 1000
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.connect(gain)
    gain.connect(c.destination)
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(volume, t + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration / 1000)
    osc.start(t)
    osc.stop(t + duration / 1000 + 0.05)
  } catch {}
}

// ── Individual sounds ──────────────────────────────────────────────────────

/** Classic BIOS POST beep — played when POST completes and logo appears. */
export function playPostBeep() {
  tone(880, 120, 0.18, 'square')
}

/** Short descending error ping — wrong password. */
export function playErrorPing() {
  tone(440, 120, 0.2, 'sine', 0)
  tone(330, 180, 0.15, 'sine', 110)
}

/** Ascending three-note chime — login success / OS startup. */
export function playStartupChime() {
  tone(523, 140, 0.22, 'sine', 0)    // C5
  tone(659, 140, 0.22, 'sine', 130)  // E5
  tone(784, 260, 0.25, 'sine', 260)  // G5
}

/** Subtle single tick — optional UI feedback. */
export function playTick() {
  tone(1200, 30, 0.08, 'square')
}
