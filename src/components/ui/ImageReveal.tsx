'use client'

import { motion, useInView, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef, type CSSProperties, type ReactNode } from 'react'

import { usePageTransition } from '@/components/transition/PageTransition'
import type { SiteImage } from '@/content/images'
import { EASE_IN_OUT, EASE_OUT } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/hooks'

type Props = {
  image: SiteImage
  sizes: string
  /** Sizing/positioning of the frame. Pass `absolute …` to position it; otherwise it is `relative`. */
  className?: string
  imageClassName?: string
  /** Fraction of the frame height the image drifts while scrolling (0 disables parallax). */
  parallax?: number
  priority?: boolean
  /** Reveal direction of the clip-path mask. */
  from?: 'bottom' | 'top' | 'left' | 'right'
  delay?: number
  /** Above the fold: reveal with CSS on first paint instead of waiting for hydration and scroll. */
  immediate?: boolean
  /** Wide bands: scale up from 90% to full size as the frame scrolls toward the centre. */
  grow?: boolean
  children?: ReactNode
}

const hidden = {
  bottom: 'inset(100% 0% 0% 0%)',
  top: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
}

const POSITIONED = /(^|\s)(absolute|fixed|sticky)(\s|$)/

/** Clip-path image reveal with a slow settle-in scale and optional scroll parallax. */
export function ImageReveal({ image, sizes, className, imageClassName, parallax = 0.1, priority, from = 'bottom', delay = 0, immediate = false, grow = false, children }: Props) {
  // The observed frame is never clipped: Chromium's IntersectionObserver honours the target's own clip-path.
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const { ready } = usePageTransition()
  const reduced = usePrefersReducedMotion()
  const show = inView && ready

  const p = reduced ? 0 : parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // The inner layer is (1 + 2p) times taller than the frame; express ±p of the frame in its own units.
  const shift = (p / (1 + 2 * p)) * 100
  const y = useTransform(scrollYProgress, [0, 1], [`-${shift}%`, `${shift}%`])
  const { scrollYProgress: approach } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const growScale = useTransform(approach, [0, 1], [0.9, 1])
  const frameStyle = grow && !reduced ? { scale: growScale } : undefined

  if (immediate)
    return (
      <motion.div ref={ref} className={cn(!POSITIONED.test(className ?? '') && 'relative', className)} style={frameStyle}>
        <div className="enter-clip absolute inset-0 overflow-hidden rounded-[inherit] bg-sand" style={{ '--d': `${delay}s` } as CSSProperties}>
          <motion.div className="absolute inset-x-0" style={{ top: `-${p * 100}%`, bottom: `-${p * 100}%`, y: p ? y : 0 }}>
            <div className="enter-scale relative h-full w-full" style={{ '--d': `${delay}s` } as CSSProperties}>
              <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} placeholder="blur" className={cn('object-cover', imageClassName)} />
            </div>
          </motion.div>
          {children}
        </div>
      </motion.div>
    )

  return (
    <motion.div ref={ref} className={cn(!POSITIONED.test(className ?? '') && 'relative', className)} style={frameStyle}>
      <motion.div
        data-reveal=""
        className="absolute inset-0 overflow-hidden rounded-[inherit] bg-sand"
        initial={{ clipPath: reduced ? 'inset(0% 0% 0% 0%)' : hidden[from], opacity: reduced ? 0 : 1 }}
        animate={show ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 } : undefined}
        transition={{ duration: reduced ? 0.5 : 1.4, ease: EASE_IN_OUT, delay }}
      >
        <motion.div className="absolute inset-x-0" style={{ top: `-${p * 100}%`, bottom: `-${p * 100}%`, y: p ? y : 0 }}>
          <motion.div
            className="relative h-full w-full"
            initial={{ scale: reduced ? 1 : 1.22 }}
            animate={show ? { scale: 1 } : undefined}
            transition={{ duration: 1.9, ease: EASE_OUT, delay }}
          >
            <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} placeholder="blur" className={cn('object-cover', imageClassName)} />
          </motion.div>
        </motion.div>
        {children}
      </motion.div>
    </motion.div>
  )
}
