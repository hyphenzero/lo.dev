import { useEffect, useState } from 'react'

function getTimeRemaining(target: Date) {
  const total = target.getTime() - Date.now()
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  }
}

export default function Countdown({ targetDate }: { targetDate: Date }) {
  const [time, setTime] = useState(() => getTimeRemaining(targetDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(targetDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <span className="font-mono text-2xl tracking-widest text-white tabular-nums">
      {time.days}d {pad(time.hours)}h {pad(time.minutes)}m
    </span>
  )
}
