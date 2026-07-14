'use client'

import { useCallback, useRef, useState } from 'react'
import { DEFAULT_TEXT } from './swirl/default-text'
import { DEFAULT_STAGE, useSwirlStage, type StageConfig } from './swirl/use-swirl-stage'

const SHOW_CRT = false

const AUTH_CONFIG: StageConfig = {
  ...DEFAULT_STAGE,
  rows: undefined,
  word: 'lo.dev',
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

export default function AuthSwirl() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cfg = useRef<StageConfig>(AUTH_CONFIG)
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
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-blue-600">
      {!failed ? (
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointer}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
          className="absolute inset-0 h-full w-full cursor-default"
          style={{ transform: 'scale(1.15)' }}
        />
      ) : (
        <div className="absolute inset-0 bg-blue-600" />
      )}
    </div>
  )
}
