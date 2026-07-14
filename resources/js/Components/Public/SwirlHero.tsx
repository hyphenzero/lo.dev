'use client'

import { about, register } from '@/routes'
import { useCallback, useRef, useState } from 'react'
import Button from './Button'
import Container from './Container'
import { DEFAULT_TEXT } from './swirl/default-text'
import { DEFAULT_STAGE, useSwirlStage, type StageConfig } from './swirl/use-swirl-stage'

const SHOW_CRT = false

const HERO_CONFIG: StageConfig = {
  ...DEFAULT_STAGE,
  rows: undefined,
  word: '',
  style: 'slant',
  inkStops: ['#60a5fa'],
  logoColor: '#ffffff',
  bg: '#2563eb',
  text: DEFAULT_TEXT,
  zoom: 0.85,
  scanlines: SHOW_CRT ? 0.3 : 0,
  aberration: SHOW_CRT ? 0.8 : 0,
  curvature: 0.6,
  tonemapExposure: SHOW_CRT ? 2.2 : 0,
  trail: true,
  trailStrength: 0.8,
  trailFlare: '#ffffff',
}

export default function SwirlHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cfg = useRef<StageConfig>(HERO_CONFIG)
  const [failed, setFailed] = useState(false)

  const stageRef = useSwirlStage(canvasRef, cfg, () => setFailed(true))

  const handlePointer = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || !stageRef.current) return
    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    stageRef.current.setPointer({ x, y })
  }, [stageRef, canvasRef])

  const handlePointerLeave = useCallback(() => {
    stageRef.current?.setPointer(null)
  }, [stageRef])

  const handleClick = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || !stageRef.current) return
    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    stageRef.current.burst(x, y)
  }, [stageRef, canvasRef])

  return (
    <section className="relative inset-2 flex min-h-[90vh] w-[calc(100%-(--spacing(4)))] items-center justify-center overflow-hidden rounded-lg bg-blue-600">
      {!failed ? (
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointer}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
          className="absolute inset-0 h-full w-full mask-t-from-80% mask-radial-from-transparent mask-radial-from-15% mask-radial-to-white mask-radial-at-center cursor-default"
          style={{ transform: 'scale(1.15)' }}
        />
      ) : (
        <div className="absolute inset-0 bg-blue-600" />
      )}

      <Container className="relative z-10 text-center pointer-events-none">
        <h1 className="relative mx-auto mt-10 text-4xl font-normal tracking-tighter text-balance text-white before:text-blue-400 before:inline-block before:w-0 before:overflow-visible before:relative before:left-[-1.25ch] before:content-['<'] after:text-blue-400 after:inline-block after:w-0 after:overflow-visible after:text-left after:relative after:left-[0.5ch] after:content-['/>'] pointer-events-auto sm:text-5xl md:text-6xl lg:text-7xl">
          Computer Science Club at Lake Oswego High School
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-200 sm:text-xl">
          A community where students learn computer science, build projects, explore new technologies, and collaborate
          with others who love creating things.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 pointer-events-auto sm:flex-row">
          <Button href={register()}>Join the Club</Button>
          <Button href={about()} outline>
            Explore projects
          </Button>
        </div>
      </Container>
    </section>
  )
}
