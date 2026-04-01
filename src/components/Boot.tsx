import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useSystemStore } from '../store/systemStore'
import { playPostBeep } from '../lib/sounds'

interface PostEntry {
  text: string
  gap: number // ms to wait before showing this line
}

const POST_LINES: PostEntry[] = [
  // ── UEFI header ──────────────────────────────────────────────────────────
  { text: 'DeanOS UEFI Firmware v2.1.0  Copyright (C) 2026 Dean Cimatu', gap: 0 },
  { text: 'Build: x86_64  ACPI 6.4  SMBIOS 3.3  Secure Boot: OFF', gap: 42 },
  { text: '', gap: 53 },
  // ── CPU ──────────────────────────────────────────────────────────────────
  { text: 'CPU: Dean Cimatu Processing Unit @ 4.20 GHz', gap: 42 },
  { text: 'Cores: 8C / 16T   L3 Cache: 32 MB   TDP: 125 W', gap: 42 },
  { text: 'Microcode: 0x2c   Features: SSE4.2  AVX2  AES-NI  VMX', gap: 42 },
  { text: '', gap: 42 },
  // ── Memory test ──────────────────────────────────────────────────────────
  { text: 'Memory: 16384 MB DDR5-6000 @ 3000 MHz (Dual Channel)', gap: 53 },
  { text: 'Memory Test: Initialising...', gap: 42 },
  { text: 'Memory Test:  4096 MB', gap: 33 },
  { text: 'Memory Test:  8192 MB', gap: 36 },
  { text: 'Memory Test: 12288 MB', gap: 36 },
  { text: 'Memory Test: 16384 MB  PASS', gap: 39 },
  { text: '', gap: 42 },
  // ── PCI bus scan ─────────────────────────────────────────────────────────
  { text: 'Scanning PCI Express bus...', gap: 63 },
  { text: '  [00:00.0] Host Bridge      — Intel 12th Gen Memory Controller  [OK]', gap: 42 },
  { text: '  [00:02.0] VGA Controller   — NVIDIA RTX Projects 4070 [16 GB VRAM]  [OK]', gap: 42 },
  { text: '  [00:08.0] Co-Processor     — Creativity Engine v3.1  [OK]', gap: 42 },
  { text: '  [00:1f.2] SATA Controller  — Creative Drive AHCI  [OK]', gap: 42 },
  { text: '  [00:1f.6] Network          — Portfolio Network Interface  [OK]', gap: 42 },
  { text: '  [01:00.0] NVMe Controller  — SAMSUNG DeanOS SSD 256 GB  [OK]', gap: 42 },
  { text: '', gap: 42 },
  // ── Storage ──────────────────────────────────────────────────────────────
  { text: 'SATA: Enabling AHCI native mode ... [OK]', gap: 95 },
  { text: 'NVMe: SAMSUNG DeanOS 256 GB — SMART status ... [OK]', gap: 105 },
  { text: 'Filesystem: Checking integrity ... PASS', gap: 147 },
  { text: '', gap: 42 },
  // ── Kernel ───────────────────────────────────────────────────────────────
  { text: 'Loading kernel image: vmlinuz-6.1.0-deanos ... [OK]', gap: 105 },
  { text: 'Unpacking initramfs: 42 MB ... [OK]', gap: 147 },
  { text: 'Kernel parameters: quiet splash loglevel=3 resume=/dev/nvme0n1p2', gap: 53 },
  { text: '', gap: 42 },
  // ── Modules ──────────────────────────────────────────────────────────────
  { text: 'Initialising device manager...', gap: 63 },
  { text: '  [OK] dm-crypt   [OK] ext4      [OK] xfs       [OK] btrfs', gap: 42 },
  { text: '  [OK] virtio     [OK] i915      [OK] nvidia    [OK] drm', gap: 42 },
  { text: '  [OK] snd-hda    [OK] usbhid    [OK] bluetooth [OK] iwlwifi', gap: 42 },
  { text: 'Mounting root filesystem (ext4, rw, relatime) ... [OK]', gap: 105 },
  { text: '', gap: 42 },
  // ── Init system ──────────────────────────────────────────────────────────
  { text: 'Starting DeanOS init system (PID 1)...', gap: 53 },
  { text: '  [OK] Reached target: Local File Systems', gap: 53 },
  { text: '  [OK] Started: systemd-journald.service', gap: 42 },
  { text: '  [OK] Started: systemd-udevd.service', gap: 42 },
  { text: '  [OK] Started: NetworkManager.service', gap: 42 },
  { text: '  [OK] Started: creativity-engine.service', gap: 42 },
  { text: '  [OK] Started: portfolio-daemon.service', gap: 42 },
  { text: '  [OK] Started: window-compositor.service', gap: 42 },
  { text: '  [OK] Reached target: Graphical Interface', gap: 53 },
  { text: '', gap: 42 },
  { text: 'DeanOS v2.1.0 — Kernel 6.1.0-deanos — All systems nominal.', gap: 105 },
]

// ── Line renderer ─────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  OK: '#00FF88', PASS: '#00FF88', FAIL: '#FF4444', WARN: '#FFD700',
}

function renderPostLine(text: string) {
  if (!text) return null

  // One or more [OK] / [PASS] / [FAIL] / [WARN] tokens anywhere in the line
  if (/\[(OK|PASS|FAIL|WARN)\]/.test(text)) {
    const parts = text.split(/(\[(?:OK|PASS|FAIL|WARN)\])/)
    const isDimmed = text.trimStart() !== text // indented line
    return (
      <>
        {parts.map((part, i) => {
          const m = part.match(/^\[(OK|PASS|FAIL|WARN)\]$/)
          if (m) return <span key={i} style={{ color: STATUS_COLORS[m[1]] }}>{part}</span>
          return <span key={i} style={{ color: isDimmed ? '#7A8FA8' : '#E8F4F8' }}>{part}</span>
        })}
      </>
    )
  }

  // Bare suffix: "... PASS", "  PASS", "... OK" etc.
  const suffix = text.match(/^(.*\S)(\s+)(OK|PASS|FAIL|WARN)$/)
  if (suffix) {
    return (
      <>
        <span style={{ color: '#E8F4F8' }}>{suffix[1]}{suffix[2]}</span>
        <span style={{ color: STATUS_COLORS[suffix[3]] }}>{suffix[3]}</span>
      </>
    )
  }

  // Header lines (no leading space, no status token) — slightly brighter
  return <span style={{ color: '#E8F4F8' }}>{text}</span>
}

// ── Scroll constants ──────────────────────────────────────────────────────

const LINE_H = 22       // px per line (12px font × 1.5 lh + margin)
const MAX_LINES = 30    // lines visible at once in the scrolling viewport

const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

// ── Component ─────────────────────────────────────────────────────────────

export default function Boot() {
  const { bootPhase, bootProgress, setBootPhase, setBootComplete, setBootProgress } = useSystemStore()
  const [visibleLines, setVisibleLines] = useState(0)
  const cancelledRef = useRef(false)

  // Main phase sequencer
  useEffect(() => {
    cancelledRef.current = false
    const advance = async () => {
      await delay(200)
      if (cancelledRef.current) return
      setBootPhase(1); await delay(2800)
      if (cancelledRef.current) return
      playPostBeep()
      setBootPhase(2); await delay(400)
      if (cancelledRef.current) return
      setBootPhase(3); await delay(800)
      if (cancelledRef.current) return
      setBootPhase(4); await delay(200)
      if (cancelledRef.current) return
      setBootPhase(5); await delay(350)
      if (cancelledRef.current) return
      setBootPhase(6); setBootComplete(true)
    }
    advance()
    return () => { cancelledRef.current = true }
  }, [])

  // Sequential POST line ticker — each line has its own gap
  useEffect(() => {
    if (bootPhase !== 1) return
    setVisibleLines(0)
    let stopped = false
    const show = async () => {
      for (let i = 0; i < POST_LINES.length; i++) {
        if (stopped) break
        await delay(POST_LINES[i].gap)
        if (stopped) break
        setVisibleLines(i + 1)
      }
    }
    show()
    return () => { stopped = true }
  }, [bootPhase])

  // Progress bar ticker
  useEffect(() => {
    if (bootPhase !== 3) return
    setBootProgress(0)
    let progress = 0
    const interval = setInterval(() => {
      progress += 1
      setBootProgress(progress)
      if (progress >= 100) clearInterval(interval)
    }, 8)
    return () => clearInterval(interval)
  }, [bootPhase])

  if (bootPhase === 6) return null

  // How many lines have scrolled off the top
  const scrolledOff = Math.max(0, visibleLines - MAX_LINES)
  const translateY = -(scrolledOff * LINE_H)

  return (
    <motion.div
      animate={{ opacity: bootPhase === 5 ? 0 : 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: '#000',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      {/* ── Phase 1: POST text ── */}
      {bootPhase === 1 && (
        <div style={{
          position: 'absolute',
          top: '4%', left: '5%', right: '5%',
          height: `${MAX_LINES * LINE_H}px`,
          overflow: 'hidden',
        }}>
          <div style={{
            transform: `translateY(${translateY}px)`,
            transition: 'transform 120ms linear',
          }}>
            {POST_LINES.slice(0, visibleLines).map((entry, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.06 }}
                style={{
                  fontSize: '12px',
                  lineHeight: `${LINE_H}px`,
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: '#E8F4F8',
                }}
              >
                {renderPostLine(entry.text) ?? <>&nbsp;</>}
              </motion.p>
            ))}
          </div>
        </div>
      )}

      {/* ── Phase 2+: Logo, progress bar, loading text ── */}
      {bootPhase >= 2 && bootPhase <= 5 && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          width: '100%', padding: '0 10%',
        }}>
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              color: '#00D4FF',
              fontSize: 'clamp(48px, 10vw, 96px)',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
            }}
          >
            DeanOS
          </motion.div>

          {/* Phase 3+: Progress bar */}
          {bootPhase >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ width: '100%', maxWidth: '500px', marginTop: '36px' }}
            >
              <div style={{
                width: '100%', height: '4px', borderRadius: '2px',
                backgroundColor: '#1A2035', overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${bootProgress}%`,
                  backgroundColor: '#00D4FF',
                  borderRadius: '2px',
                  transition: 'width 20ms linear',
                }} />
              </div>
              <p style={{
                color: '#8899AA', fontSize: '12px', marginTop: '12px', textAlign: 'center',
              }}>
                {bootProgress}%
              </p>
            </motion.div>
          )}

          {/* Phase 4+: Loading text with staggered dots */}
          {bootPhase >= 4 && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '2px',
              marginTop: '20px',
              color: '#8899AA', fontSize: '12px',
            }}>
              <span>Loading desktop</span>
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.2 }}
                >
                  .
                </motion.span>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
