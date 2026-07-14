import { useEffect, useRef } from 'react'

const snippets = [
  'class CSClub {',
  '  constructor() {',
  '    this.room = 100',
  "    this.day = 'Tuesday'",
  "    this.time = '18:00'",
  '  }',
  '}',
  '// Room 100 — where the magic happens',
  'while (!graduated) { code(); }',
  "console.log('Hello, CS Club!')",
  "git commit -m 'build something great'",
  'function build(ideas) { return software }',
  "import { knowledge } from 'cs-club'",
  '$ npm install cs-club-experience',
  'const future = await joinClub()',
  '// #100DaysOfCode',
  'if (curious) { join(CSClub) }',
  'try { learn() } catch (e) { askMentor() }',
  'class CSClub extends Club { }',
  '// Collaborators wanted',
  "{ room: 100, time: '18:00' }",
  '// From hello world to shipping',
  'const skills = await levelUp()',
  '// No experience required',
  'for (let sem = 0; ; sem++) { grow() }',
  "fetch('/join').then(join)",
  '// Est. 2024',
  '// Tuesdays in Room 100',
  "meetups.every('Tuesday').at('18:00')",
  '// Build things. Learn together.',
  'while (true) { learn().then(share) }',
  "// printf('Hello, World!')",
  '// Club motto: ship it',
  '// All skill levels welcome',
  'while (true) { knowledge++ }',
  "meetups.every('Tuesday')",
  '  .in(room(100))',
  'while (idea) { prototype(); ship(); }',
  '// Tuesdays after school',
  'export default function App() {',
  '  return <CSClub experience />',
  '}',
  '// Build things. Together.',
  'function levelUp() { return skills++ }',
  '// Everyone is welcome.',
  'python -c "import this"',
  '// Est. 2024 — LOHS CS Club',
  '<StudentBuilder />',
  '// Room 100 hackerspace',
  '// LOHS CS Club',
  "import { curiosity } from 'everyone'",
  '// First PR? We will help',
  '// zero to hero',
  'git push origin main',
  '#include <friendship.h>',
]

interface Particle {
  el: HTMLParagraphElement
}

interface Ring {
  particles: Particle[]
  radius: number
  angle: number
  speed: number
}

const GAP = 20

export default function CodeParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current!

    let rings: Ring[] = []
    let scale = 1
    let lastTime = performance.now()

    function build() {
      for (const ring of rings) {
        for (const p of ring.particles) {
          container.removeChild(p.el)
        }
      }
      rings = []

      const w = container.offsetWidth
      const h = container.offsetHeight
      if (!w || !h) return
      const maxR = Math.ceil(Math.sqrt(w * w + h * h) / 2)

      const temp = document.createElement('p')
      temp.style.position = 'absolute'
      temp.style.whiteSpace = 'nowrap'
      temp.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace'
      temp.style.fontSize = '9px'
      temp.style.lineHeight = '1'
      temp.style.visibility = 'hidden'
      container.appendChild(temp)

      let maxW = 0
      let textH = 9

      for (const snippet of snippets) {
        temp.textContent = snippet
        maxW = Math.max(maxW, temp.offsetWidth)
        textH = temp.offsetHeight
      }

      const radialStep = maxW + GAP
      let ringIndex = 0
      let si = 0

      while (true) {
        const r = radialStep / 2 + ringIndex * radialStep
        if (r + maxW / 2 > maxR || si >= snippets.length) break

        const count = Math.max(3, Math.floor(2 * Math.PI / Math.acos(1 - Math.min(1, (textH + GAP) / r))))
        const particles: Particle[] = []

        for (let i = 0; i < count && si < snippets.length; i++) {
          const el = document.createElement('p')
          el.textContent = snippets[si]
          el.style.position = 'absolute'
          el.style.whiteSpace = 'nowrap'
          el.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace'
          el.style.fontSize = '9px'
          el.style.color = 'white'
          el.style.pointerEvents = 'none'
          el.style.userSelect = 'none'
          el.style.willChange = 'transform'
          el.style.left = '0'
          el.style.top = '0'
          el.style.lineHeight = '1'
          container.appendChild(el)
          particles.push({ el })
          si++
        }

        if (particles.length > 0) {
          rings.push({
            particles,
            radius: r,
            angle: (ringIndex % 2) * (Math.PI / count),
            speed: 8 / Math.sqrt(r),
          })
          ringIndex++
        }
      }

      container.removeChild(temp)
    }

    build()

    function animate(time: number) {
      const dt = Math.min((time - lastTime) / 16, 3)
      lastTime = time

      const w = container.offsetWidth
      const h = container.offsetHeight
      const cx = w / 2
      const cy = h / 2

      scale -= dt * 0.002

      if (scale < 0.05) {
        scale = 1
        for (const ring of rings) {
          ring.angle = Math.random() * Math.PI * 2
          for (const p of ring.particles) {
            p.el.textContent = snippets[Math.floor(Math.random() * snippets.length)]
          }
        }
      }

      for (const ring of rings) {
        ring.angle += ring.speed * dt * 0.02

        const r = ring.radius * scale
        const count = ring.particles.length

        for (let i = 0; i < count; i++) {
          const a = ring.angle + (i / count) * Math.PI * 2
          const x = cx + Math.cos(a) * r
          const y = cy + Math.sin(a) * r
          ring.particles[i].el.style.transform = `translate(${x}px, ${y}px)`
        }
      }

      requestAnimationFrame(animate)
    }

    const raf = requestAnimationFrame(animate)
    const resizeHandler = () => {
      build()
      scale = 1
    }
    window.addEventListener('resize', resizeHandler)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resizeHandler)
      for (const ring of rings) {
        for (const p of ring.particles) {
          container.removeChild(p.el)
        }
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_60%)] select-none"
    />
  )
}
