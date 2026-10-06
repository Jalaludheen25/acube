'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

type Mode = 'default' | 'link' | 'view' | 'hidden'

/**
 * Desktop-only cursor: a precise dot plus a trailing ring that grows over interactive
 * elements. Disabled on touch devices and for users who prefer reduced motion.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<Mode>('hidden')
  const [label, setLabel] = useState('')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 })
  const pathname = usePathname()

  // A new page replaces whatever was under the pointer — drop any hover state until it moves.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing cursor state to navigation
    setMode((m) => (m === 'hidden' ? m : 'default'))
  }, [pathname])

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target as Element | null
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) {
        setMode('hidden')
        return
      }
      const view = target?.closest<HTMLElement>('[data-cursor="view"]')
      if (view) {
        setMode('view')
        setLabel(view.dataset.cursorLabel ?? 'View')
        return
      }
      setMode(target?.closest('a, button, [role="button"], [data-cursor="link"], label, summary') ? 'link' : 'default')
    }
    const onLeave = () => setMode('hidden')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const ringSize = mode === 'view' ? 92 : mode === 'link' ? 56 : 34

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80]">
      <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className={cn(
            'grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-blue-500/70',
            mode === 'view' && 'border-transparent bg-[linear-gradient(135deg,var(--color-blue-700),var(--color-blue-500))] shadow-[0_12px_30px_-10px_rgba(35,80,240,0.7)]',
            mode === 'link' && 'bg-blue-500/10',
          )}
          animate={{ width: ringSize, height: ringSize, opacity: mode === 'hidden' ? 0 : mode === 'default' ? 0.5 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        >
          <motion.span
            className="text-[0.625rem] font-medium uppercase tracking-[0.16em] text-white"
            animate={{ opacity: mode === 'view' ? 1 : 0, scale: mode === 'view' ? 1 : 0.6 }}
          >
            {label}
          </motion.span>
        </motion.div>
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.div
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          animate={{ opacity: mode === 'hidden' || mode === 'view' ? 0 : 1, scale: mode === 'link' ? 0.6 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  )
}
