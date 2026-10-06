'use client'

import { animate, useInView } from 'motion/react'
import { useEffect, useRef } from 'react'

import { usePageTransition } from '@/components/transition/PageTransition'
import { usePrefersReducedMotion } from '@/lib/hooks'
import { EASE_OUT } from '@/lib/motion'

/**
 * Counts up to `value` when scrolled into view. The final figure is server-rendered
 * so crawlers and no-JS visitors always see the real number.
 */
export function Counter({ value, suffix = '', className, duration = 2.2 }: { value: number; suffix?: string; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const { ready } = usePageTransition()
  const reduced = usePrefersReducedMotion()
  const primed = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const write = (n: number) => {
      node.textContent = `${n}${suffix}`
    }
    // Reduced motion (which may only be known after hydration): show the final figure.
    if (reduced) {
      write(value)
      return
    }
    if (!inView || !ready) {
      if (!primed.current) write(0)
      primed.current = true
      return
    }
    primed.current = true
    const controls = animate(0, value, { duration, ease: EASE_OUT, onUpdate: (v) => write(Math.round(v)) })
    return () => controls.stop()
  }, [inView, ready, reduced, value, suffix, duration])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
