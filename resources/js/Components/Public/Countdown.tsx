import { useEffect, useState } from 'react'

function getTimeRemaining(target: Date) {
  const offset = Date.now() - performance.now()
  const now = offset + performance.now()
  const total = target.getTime() - now
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, ms: 0 }
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor(total / 1000) % 60,
    ms: Math.floor(total % 1000),
  }
}

export default function Countdown({ targetDate }: { targetDate: Date }) {
  const [time, setTime] = useState(() => getTimeRemaining(targetDate))

  useEffect(() => {
    let frameId: number
    function tick() {
      setTime(getTimeRemaining(targetDate))
      frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [targetDate])

  const pad = (n: number, width = 2) => String(n).padStart(width, '0')

  return (
    <span className="font-mono text-2xl tracking-widest text-white tabular-nums">
      {time.days}d {pad(time.hours)}h {pad(time.minutes)}m {time.seconds}.{pad(time.ms, 3)}s
    </span>
  )
}
