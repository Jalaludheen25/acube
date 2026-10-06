'use client'

import { useRef, type PointerEvent, type ReactNode } from 'react'

import { usePrefersReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils'

/**
 * Interactive card shell: a blue spotlight and hairline follow the pointer, and the card tilts
 * a few degrees toward it. Pure CSS variables — no re-renders. Mouse only; off for reduced motion.
 * Pass the card's corner radius in `className` so the glow matches its shape.
 */
export function CardFX({ children, className, tilt = 4 }: { children: ReactNode; className?: string; tilt?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    if (!reduced) {
      el.style.setProperty('--rx', `${(0.5 - py) * tilt}deg`)
      el.style.setProperty('--ry', `${(px - 0.5) * tilt}deg`)
    }
    el.dataset.active = ''
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    delete el.dataset.active
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={cn('card-fx', className)}>
      {children}
      <span aria-hidden="true" className="card-fx-glow" />
    </div>
  )
}
