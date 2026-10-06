'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

import { usePrefersReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils'

/**
 * Section-transition background: a tinted band that starts slightly inset with rounded corners
 * and widens to full bleed as the section scrolls in. Place it as the first child of a
 * `relative isolate` section and pass the background colour in `className`.
 * Only the band's transform and radius animate — the section content is untouched.
 */
export function ExpandBackground({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.25'] })
  const scaleX = useTransform(scrollYProgress, [0, 1], [0.95, 1])
  const radius = useTransform(scrollYProgress, [0, 1], [48, 0])

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 -z-10', className)}
      style={reduced ? undefined : { scaleX, borderTopLeftRadius: radius, borderTopRightRadius: radius }}
    />
  )
}
