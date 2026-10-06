'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

import { usePageTransition } from '@/components/transition/PageTransition'
import { EASE_OUT } from '@/lib/motion'
import { cn } from '@/lib/utils'

/** Short hairline that draws in from the left when scrolled into view. */
export function DrawLine({ className, delay = 0.1 }: { className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 1 })
  const { ready } = usePageTransition()
  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      data-reveal=""
      className={cn('block h-px origin-left', className)}
      initial={{ scaleX: 0 }}
      animate={inView && ready ? { scaleX: 1 } : undefined}
      transition={{ duration: 1, ease: EASE_OUT, delay }}
    />
  )
}
