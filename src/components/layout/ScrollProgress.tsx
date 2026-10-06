'use client'

import { motion, useScroll, useSpring } from 'motion/react'

/** Thin blue reading-progress line along the top edge of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-[linear-gradient(90deg,var(--color-blue-700),var(--color-blue-500)_60%,var(--color-cyan))]"
      style={{ scaleX }}
    />
  )
}
