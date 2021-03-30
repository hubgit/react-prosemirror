import { useEffect, useRef, useState } from 'react'

export const useDebounce = <T extends any>(value: T, delay = 100): T => {
  const [state, setState] = useState(value)

  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (timer.current) {
      window.clearInterval(timer.current)
    }

    timer.current = window.setTimeout(() => {
      setState(value)
    }, delay)
  }, [delay, timer, value])

  return state
}
