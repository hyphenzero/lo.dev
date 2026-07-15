export const TRAIL_W = 72
export const TRAIL_H = 40

const DEPOSIT_RADIUS = 0.12
const DEPOSIT_AMOUNT = 30
const HEAT_MAX = 1.0
const DECAY_PER_SEC = 0.8
const DIFFUSE_SPEED = 0.04

export interface TrailField {
  heat: Float32Array
  flowX: Float32Array
  flowY: Float32Array
  tmp: Float32Array
}

export function makeTrailField(): TrailField {
  const n = TRAIL_W * TRAIL_H
  return {
    heat: new Float32Array(n),
    flowX: new Float32Array(n),
    flowY: new Float32Array(n),
    tmp: new Float32Array(n),
  }
}

export function clearTrail(t: TrailField) {
  t.heat.fill(0)
  t.flowX.fill(0)
  t.flowY.fill(0)
  t.tmp.fill(0)
}

const toGX = (nx: number) => ((nx + 1) / 2) * (TRAIL_W - 1)
const toGY = (ny: number) => ((ny + 1) / 2) * (TRAIL_H - 1)

export function depositTrail(t: TrailField, nx: number, ny: number, vx: number, vy: number, dt: number) {
  const speed = Math.min(4, Math.hypot(vx, vy))
  const radius = DEPOSIT_RADIUS * (1 + speed * 0.15)
  const amount = DEPOSIT_AMOUNT * dt * (1 + speed * 0.3)

  const gx = toGX(nx)
  const gy = toGY(ny)
  const rx = radius * (TRAIL_W / 2)
  const ry = radius * (TRAIL_H / 2)
  const x0 = Math.max(0, Math.floor(gx - rx * 2.5))
  const x1 = Math.min(TRAIL_W - 1, Math.ceil(gx + rx * 2.5))
  const y0 = Math.max(0, Math.floor(gy - ry * 2.5))
  const y1 = Math.min(TRAIL_H - 1, Math.ceil(gy + ry * 2.5))
  const dirLen = Math.hypot(vx, vy) || 1
  const dirX = vx / dirLen
  const dirY = vy / dirLen

  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const ddx = (x - gx) / rx
      const ddy = (y - gy) / ry
      const fall = Math.exp(-(ddx * ddx + ddy * ddy))
      if (fall < 0.01) continue
      const i = y * TRAIL_W + x
      t.heat[i] = Math.min(HEAT_MAX, t.heat[i] + amount * fall)
      t.flowX[i] += (dirX - t.flowX[i]) * 0.15 * fall
      t.flowY[i] += (dirY - t.flowY[i]) * 0.15 * fall
    }
  }
}

export function stepTrail(t: TrailField, dt: number) {
  const { heat, flowX, flowY, tmp } = t
  const keep = Math.exp(-DECAY_PER_SEC * dt)
  const dStep = DIFFUSE_SPEED * dt

  for (let y = 0; y < TRAIL_H; y++) {
    for (let x = 0; x < TRAIL_W; x++) {
      const i = y * TRAIL_W + x
      const l = x > 0 ? heat[i - 1] : heat[i]
      const rr = x < TRAIL_W - 1 ? heat[i + 1] : heat[i]
      const u = y > 0 ? heat[i - TRAIL_W] : heat[i]
      const d = y < TRAIL_H - 1 ? heat[i + TRAIL_W] : heat[i]
      tmp[i] = (l + rr + u + d) * 0.25
    }
  }
  for (let i = 0; i < heat.length; i++) {
    heat[i] = (heat[i] + (tmp[i] - heat[i]) * dStep) * keep
  }

  for (let i = 0; i < flowX.length; i++) {
    flowX[i] *= 1 - dt * 0.5
    flowY[i] *= 1 - dt * 0.5
  }
}

export function sampleTrail(t: TrailField, nx: number, ny: number, out: { heat: number; fx: number; fy: number }) {
  const gx = toGX(nx)
  const gy = toGY(ny)
  const x0 = Math.max(0, Math.min(TRAIL_W - 1, Math.floor(gx)))
  const y0 = Math.max(0, Math.min(TRAIL_H - 1, Math.floor(gy)))
  const x1 = Math.min(TRAIL_W - 1, x0 + 1)
  const y1 = Math.min(TRAIL_H - 1, y0 + 1)
  const tx = gx - x0
  const ty = gy - y0
  const i00 = y0 * TRAIL_W + x0
  const i10 = y0 * TRAIL_W + x1
  const i01 = y1 * TRAIL_W + x0
  const i11 = y1 * TRAIL_W + x1
  const lerp = (a: number, b: number, f: number) => a + (b - a) * f
  const bi = (arr: Float32Array) => lerp(lerp(arr[i00], arr[i10], tx), lerp(arr[i01], arr[i11], tx), ty)
  out.heat = bi(t.heat)
  out.fx = bi(t.flowX)
  out.fy = bi(t.flowY)
}
