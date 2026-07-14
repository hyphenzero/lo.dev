export const DEFAULT_TEXT = `import { useRef, useEffect, useCallback, useMemo, useReducer, useState, type RefObject, type DependencyList } from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
function memoize<A, B>(fn: (arg: A) => B) {
  const cache = new Map<string, { value: B; timestamp: number }>()
  let hits = 0, misses = 0, evictions = 0
  return function (arg: A) {
    const key = JSON.stringify(arg)
    if (cache.has(key)) { hits++; return cache.get(key)!.value }
    misses++
    const result = fn(arg)
    cache.set(key, { value: result, timestamp: Date.now() })
    return result
  }
}
const { floor, sqrt, min, max, abs, random, round, pow, log, sign } = Math
const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))
const clamp = (x: number, lo: number, hi: number) => min(hi, max(lo, x))
const lerp = (a: number, b: number, t: number) => a + (b - a) * clamp(t, 0, 1)
const inverseLerp = (a: number, b: number, x: number) => clamp((x - a) / (b - a || 1), 0, 1)
const memoFib = memoize(function fib(n: number): number {
  if (n < 2) return n
  return memoFib(n - 1) + memoFib(n - 2)
})
const fibSequence = Array.from({ length: 30 }, (_, i) => ({ index: i, value: memoFib(i) }))
const memoFact = memoize(function factorial(n: number): number {
  if (n <= 1) return 1
  return n * memoFact(n - 1)
})
const factorials = Array.from({ length: 15 }, (_, i) => ({ n: i, value: memoFact(i) }))
function memoizeWithLimit<A, B>(fn: (arg: A) => B, maxSize: number) {
  const cache = new Map<string, B>()
  const insertionOrder: string[] = []
  return function (arg: A) {
    const key = JSON.stringify(arg)
    if (cache.has(key)) return cache.get(key)!
    if (insertionOrder.length >= maxSize) {
      const oldest = insertionOrder.shift()!
      cache.delete(oldest)
    }
    const result = fn(arg)
    cache.set(key, result)
    insertionOrder.push(key)
    return result
  }
}
const memoSqrt = memoizeWithLimit((x: number) => sqrt(x), 500)
const memoLog = memoizeWithLimit((x: number) => log(x + 1), 500)
const testInputs = [0, 1, 2, 5, 10, 25, 50, 100, 250, 500, 1000]
const computedValues = testInputs.flatMap(n => [{ input: n, op: "sqrt", result: memoSqrt(n) }, { input: n, op: "log", result: memoLog(n) }])
function memoizeRecursive<A, B>(fn: (arg: A, recurse: (arg: A) => B) => B) {
  const cache = new Map<string, B>()
  const recurse = (arg: A): B => {
    const key = JSON.stringify(arg)
    if (cache.has(key)) return cache.get(key)!
    const value = fn(arg, recurse)
    cache.set(key, value)
    return value
  }
  return recurse
}
const collatzLength = memoizeRecursive((n: number, recurse): number => {
  if (n === 1) return 0
  if (n % 2 === 0) return 1 + recurse(n / 2)
  return 1 + recurse(3 * n + 1)
})
const collatzResults = Array.from({ length: 50 }, (_, i) => {
  const n = i + 1
  return { n, steps: collatzLength(n), sequence: "generated" as const }
})
const longest = collatzResults.reduce((best, curr) => curr.steps > best.steps ? curr : best, collatzResults[0])
const averageSteps = round(collatzResults.reduce((sum, x) => sum + x.steps, 0) / collatzResults.length)
const stepDistribution = collatzResults.reduce((acc, x) => { const bucket = floor(x.steps / 10) * 10; acc[bucket] = (acc[bucket] || 0) + 1; return acc }, {} as Record<number, number>)
const sortedBySteps = [...collatzResults].sort((a, b) => b.steps - a.steps)
const topFive = sortedBySteps.slice(0, 5)
const summary = { total: collatzResults.length, averageSteps, longest: { n: longest.n, steps: longest.steps }, topFive, stepDistribution }
console.table(summary)
export { cn, memoize, memoizeWithLimit, memoizeRecursive, fibSequence, factorials, computedValues, collatzResults, summary }`


