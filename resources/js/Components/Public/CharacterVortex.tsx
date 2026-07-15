import { useEffect, useRef } from 'react'

const CELL = 28
const COUNT = 350
const STREAMS = 7
const ANGULAR_VEL = 0.025
const RADIAL_VEL = 0.5
const JITTER = 0.12

const SYMBOLS = [
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '-',
  '_',
  '=',
  '+',
  '[',
  ']',
  '{',
  '}',
  '\\',
  '|',
  ';',
  ':',
  "'",
  '"',
  ',',
  '.',
  '/',
  '<',
  '>',
  '?',
  '~',
  '`',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '-',
  '_',
  '=',
  '+',
  '[',
  ']',
  '{',
  '}',
  '\\',
  '|',
  ';',
  ':',
  "'",
  '"',
  ',',
  '.',
  '/',
  '<',
  '>',
  '?',
  '~',
  '`',
  '->',
  '=>',
  '<-',
  '::',
  '!=',
  '==',
  '>=',
  '<=',
  '++',
  '--',
  '/*',
  '//',
  '*/',
  '#{',
  '&&',
  '||',
  '..',
  '...',
  '??',
  '?.',
  '{{{',
  '}}}',
  '((',
  '))',
  '[[',
  ']]',
  '<<',
  '>>',
  '→',
  '←',
  '⇒',
  '⇐',
  '↔',
  '↕',
  '⌈',
  '⌉',
  '⌊',
  '⌋',
  '⟨',
  '⟩',
  '⟦',
  '⟧',
  '⟪',
  '⟫',
  '⟬',
  '⟭',
  '⟮',
  '⟯',
  '⎛',
  '⎜',
  '⎝',
  '⎞',
  '⎟',
  '⎠',
  '⎡',
  '⎢',
  '⎣',
  '⎤',
  '⎥',
  '⎦',
  '░',
  '▒',
  '▓',
  '█',
  '▌',
  '▐',
  '▀',
  '▄',
  '▔',
  '▁',
  '━',
  '┃',
  '┏',
  '┓',
  '┗',
  '┛',
  '┣',
  '┫',
  '┳',
  '┻',
  '╋',
  '╱',
  '╲',
  '╳',
  '·',
  '•',
  '∙',
  '∘',
  '∗',
  '⋆',
  '⋅',
  '↑',
  '↓',
  '↗',
  '↘',
  '↙',
  '↖',
  '↻',
  '↺',
  '↵',
  '↩',
  '↪',
  '⇧',
  '⇩',
  '⌃',
  '⌥',
  '⌘',
  '⎈',
  '✕',
  '✗',
  '✘',
  '✓',
  '✔',
  '†',
  '‡',
  '§',
  '¶',
  '…',
  '‧',
  '‥',
  '◆',
  '◇',
  '□',
  '■',
  '△',
  '▲',
  '▽',
  '▼',
  '○',
  '●',
  '◉',
  '◊',
  '◈',
  '★',
  '☆',
  '✦',
  '✧',
  '‹',
  '›',
  '«',
  '»',
  '∞',
  '≠',
  '≈',
  '∅',
  '¬',
  '∧',
  '∨',
  '⊂',
  '⊃',
  '⊆',
  '⊇',
  '∈',
  '∉',
  '∩',
  '∪',
  '∠',
  '∡',
  '∵',
  '∴',
  '≅',
  '≡',
  '∝',
  '⊕',
  '⊗',
  '⊙',
  'λ',
  'μ',
  'π',
  'σ',
  'τ',
  'φ',
  'ψ',
  'ω',
  'Δ',
  'Ω',
  '∑',
  '∏',
  '∫',
  '∂',
  '∇',
  '√',
  '∀',
  '∃',
  '⊢',
  '⊣',
  '⊤',
  '⊥',
  '←',
  '→',
  '↑',
  '↓',
  '↔',
  '↕',
  '↗',
  '↘',
  '↙',
  '↖',
  '⟵',
  '⟶',
  '⟷',
  '⟹',
  '⟺',
  '✶',
  '✷',
  '✸',
  '✹',
  '✺',
  '⬩',
  '⬨',
  '❖',
  '➤',
]

interface Char {
  el: HTMLSpanElement
  col: number
  row: number
  angle: number
  radius: number
}

function rand() {
  return SYMBOLS[(Math.random() * SYMBOLS.length) | 0]
}

export default function CharacterVortex() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current!
    const chars: Char[] = []

    function build() {
      for (const c of chars) container.removeChild(c.el)
      chars.length = 0

      const w = container.offsetWidth
      const h = container.offsetHeight
      if (!w || !h) return

      const cx = w / 2
      const cy = h / 2
      const maxR = Math.sqrt(cx * cx + cy * cy) + CELL * 3

      for (let i = 0; i < COUNT; i++) {
        const el = document.createElement('span')
        el.textContent = rand()
        el.style.cssText = [
          'position:absolute',
          `font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,monospace`,
          'font-size:14px',
          'color:white',
          'pointer-events:none',
          'user-select:none',
          `width:${CELL}px`,
          `height:${CELL}px`,
          'display:flex',
          'align-items:center',
          'justify-content:center',
          'will-change:transform',
          'line-height:1',
        ].join(';')
        container.appendChild(el)

        const stream = i % STREAMS
        const angle = (stream / STREAMS) * Math.PI * 2 + (Math.random() - 0.5) * JITTER
        const radius = maxR * (0.7 + Math.random() * 0.3)

        chars.push({
          el,
          col: Math.round(cx / CELL + (Math.cos(angle) * radius) / CELL),
          row: Math.round(cy / CELL + (Math.sin(angle) * radius) / CELL),
          angle,
          radius,
        })
      }
    }

    build()

    let last = performance.now()

    function animate(now: number) {
      const dt = Math.min((now - last) / 16, 3)
      last = now

      const w = container.offsetWidth
      const h = container.offsetHeight
      if (!w || !h) return

      const cx = w / 2
      const cy = h / 2
      const maxR = Math.sqrt(cx * cx + cy * cy) + CELL * 3

      const scale = 1 - 0.3 / (0.1 + w / 800)

      for (const c of chars) {
        c.angle += ((ANGULAR_VEL * dt) / (c.radius / (maxR * 0.3) + 0.05)) * scale
        c.radius -= RADIAL_VEL * dt * (0.3 + 0.7 * (1 - c.radius / maxR))

        if (c.radius <= CELL) {
          c.radius = maxR * (0.88 + Math.random() * 0.12)
          const stream = (Math.random() * STREAMS) | 0
          c.angle = (stream / STREAMS) * Math.PI * 2 + (Math.random() - 0.5) * JITTER
          c.el.textContent = rand()
        }

        const nc = Math.round(cx / CELL + (Math.cos(c.angle) * c.radius) / CELL)
        const nr = Math.round(cy / CELL + (Math.sin(c.angle) * c.radius) / CELL)

        if (nc !== c.col || nr !== c.row) {
          c.col = nc
          c.row = nr
        }

        c.el.style.transform = `translate(${c.col * CELL}px,${c.row * CELL}px)`

        const t = Math.max(0, Math.min(1, c.radius / maxR))
        c.el.style.opacity = String(0.04 + (1 - t) * 0.46)
      }

      requestAnimationFrame(animate)
    }

    const raf = requestAnimationFrame(animate)
    const onResize = () => build()
    addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', onResize)
      for (const c of chars) container.removeChild(c.el)
    }
  }, [])

  return <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden select-none" />
}
