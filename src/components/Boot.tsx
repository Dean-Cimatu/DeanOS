import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useSystemStore } from '../store/systemStore'
import { playPostBeep } from '../lib/sounds'

// ── ASCII art header ──────────────────────────────────────────────────────────

const ASCII_ART = `\
██████╗ ███████╗ █████╗ ███╗   ██╗ ██████╗ ███████╗
██╔══██╗██╔════╝██╔══██╗████╗  ██║██╔═══██╗██╔════╝
██║  ██║█████╗  ███████║██╔██╗ ██║██║   ██║███████╗
██║  ██║██╔══╝  ██╔══██║██║╚██╗██║██║   ██║╚════██║
██████╔╝███████╗██║  ██║██║ ╚████║╚██████╔╝███████║
╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝`

// ── POST scroll lines ─────────────────────────────────────────────────────────

interface PostEntry {
  text: string
  gap: number // ms before this line appears
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

// ── Status token colouring ────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  OK: '#00FF88', PASS: '#00FF88', FAIL: '#FF4444', WARN: '#FFD700',
}

function renderPostLine(text: string) {
  if (!text) return null

  if (/\[(OK|PASS|FAIL|WARN)\]/.test(text)) {
    const parts = text.split(/(\[(?:OK|PASS|FAIL|WARN)\])/)
    const isDimmed = text.trimStart() !== text
    return (
      <>
        {parts.map((part, i) => {
          const m = part.match(/^\[(OK|PASS|FAIL|WARN)\]$/)
          if (m) return <span key={i} style={{ color: STATUS_COLORS[m[1]] }}>{part}</span>
          return <span key={i} style={{ color: isDimmed ? '#7A8FA8' : '#C8D8E8' }}>{part}</span>
        })}
      </>
    )
  }

  const suffix = text.match(/^(.*\S)(\s+)(OK|PASS|FAIL|WARN)$/)
  if (suffix) {
    return (
      <>
        <span style={{ color: '#C8D8E8' }}>{suffix[1]}{suffix[2]}</span>
        <span style={{ color: STATUS_COLORS[suffix[3]] }}>{suffix[3]}</span>
      </>
    )
  }

  return <span style={{ color: '#C8D8E8' }}>{text}</span>
}

// ── Constants ─────────────────────────────────────────────────────────────────

const LINE_H = 20 // px per line
const HEADER_H = 140 // approx height of ASCII art + subtitle + divider
const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

// ── Component ─────────────────────────────────────────────────────────────────

export default function Boot() {
  const { bootPhase, setBootPhase, setBootComplete } = useSystemStore()
  const [visibleLines, setVisibleLines] = useState(0)
  const cancelledRef = useRef(false)

  const MAX_LINES = Math.floor((window.innerHeight - HEADER_H - 40) / LINE_H)

  // Phase sequencer: 1 = POST running, 5 = fade out, 6 = done
  useEffect(() => {
    cancelledRef.current = false
    const advance = async () => {
      await delay(150)
      if (cancelledRef.current) return
      playPostBeep()
      setBootPhase(1)
      await delay(3400)
      if (cancelledRef.current) return
      setBootPhase(5)
      await delay(700)
      if (cancelledRef.current) return
      setBootPhase(6)
      setBootComplete(true)
    }
    advance()
    return () => { cancelledRef.current = true }
  }, [])

  // Sequential line ticker
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

  if (bootPhase === 6) return null

  const scrolledOff = Math.max(0, visibleLines - MAX_LINES)
  const translateY = -(scrolledOff * LINE_H)

  return (
    <motion.div
      animate={{ opacity: bootPhase === 5 ? 0 : 1 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: '#000',
        zIndex: 9999,
        fontFamily: '"JetBrains Mono", monospace',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 5%',
      }}
    >
      {/* ── ASCII art header ── */}
      <div style={{ flexShrink: 0 }}>
        <pre style={{
          color: '#00D4FF',
          fontSize: '11px',
          lineHeight: '15px',
          margin: 0,
          letterSpacing: '0.01em',
        }}>
          {ASCII_ART}
        </pre>
        <div style={{
          color: '#3a5070',
          fontSize: '11px',
          marginTop: '8px',
          letterSpacing: '0.04em',
        }}>
          version 2.1.0 &nbsp;·&nbsp; kernel 6.1.0-deanos &nbsp;·&nbsp; x86_64
        </div>
        <div style={{
          borderBottom: '1px solid #1a2535',
          marginTop: '12px',
          marginBottom: '14px',
        }} />
      </div>

      {/* ── Scrolling POST area ── */}
      {bootPhase >= 1 && bootPhase <= 4 && (
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: 0, overflow: 'hidden',
          }}>
            <div style={{
              transform: `translateY(${translateY}px)`,
              transition: 'transform 100ms linear',
            }}>
              {POST_LINES.slice(0, visibleLines).map((entry, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.05 }}
                  style={{
                    fontSize: '11px',
                    lineHeight: `${LINE_H}px`,
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {renderPostLine(entry.text) ?? <>&nbsp;</>}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
