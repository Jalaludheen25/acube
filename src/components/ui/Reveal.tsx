'use client'

import { motion, useInView, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef, type CSSProperties, type ReactNode } from 'react'

import { usePageTransition } from '@/components/transition/PageTransition'
import { EASE_OUT } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/hooks'

/** Loose element type for polymorphic tags; props are validated at the call sites. */
type Polymorphic = (props: Record<string, unknown> & { children?: ReactNode }) => ReactNode

type Tag = 'div' | 'p' | 'span' | 'li' | 'ul' | 'ol' | 'section' | 'article' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote' | 'figure' | 'dl'

/** Plays once when the element scrolls into view, after any page transition has finished. */
function useRevealTrigger(amount: number | 'some' | 'all' = 0.2) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount, margin: '0px 0px -6% 0px' })
  const { ready } = usePageTransition()
  return { ref, show: inView && ready }
}

type RevealProps = {
  children: ReactNode
  as?: Tag
  className?: string
  delay?: number
  y?: number
  blur?: boolean
  duration?: number
  amount?: number
  id?: string
}

/** Fade + rise + de-blur entrance for any block. */
export function Reveal({ children, as = 'div', className, delay = 0, y = 28, blur = true, duration = 1.1, amount = 0.15, id }: RevealProps) {
  const { ref, show } = useRevealTrigger(amount)
  const reduced = usePrefersReducedMotion()
  const Comp = motion[as] as unknown as Polymorphic
  return (
    <Comp
      ref={ref}
      id={id}
      data-reveal=""
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y, filter: blur ? 'blur(10px)' : 'blur(0px)' }}
      animate={show ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
      transition={{ duration: reduced ? 0.4 : duration, ease: EASE_OUT, delay }}
    >
      {children}
    </Comp>
  )
}

type LinesProps = {
  lines: string[]
  as?: Tag
  className?: string
  lineClassName?: string
  /** Indexes of lines rendered in the accent style (italic serif). */
  accent?: number[]
  accentClassName?: string
  delay?: number
  stagger?: number
  amount?: number
  /** Animate on first paint (CSS) instead of on scroll — for above-the-fold headings. */
  immediate?: boolean
  id?: string
}

/** Line-by-line masked reveal. Lines are authored explicitly so they never depend on layout measurement. */
export function RevealLines({
  lines,
  as = 'h2',
  className,
  lineClassName,
  accent = [],
  accentClassName = 'font-accent w-fit text-gradient',
  delay = 0,
  stagger = 0.11,
  amount = 0.3,
  immediate = false,
  id,
}: LinesProps) {
  const { ref, show } = useRevealTrigger(amount)
  const Comp = as as unknown as Polymorphic

  // Above the fold: CSS keyframes, so the heading paints without waiting for hydration.
  if (immediate)
    return (
      <Comp id={id} className={className}>
        <span className="block">
          {lines.map((line, i) => (
            <span key={i} className="mask-line">
              <span
                className={cn('enter-line block', lineClassName)}
                style={{ '--d': `${delay + i * stagger}s` } as CSSProperties}
              >
                {/* Accent styling sits on an inner span so its own animation never merges with the entrance */}
                <span className={cn('block', accent.includes(i) && cn('text-[1.1em] leading-[0.98]', accentClassName))}>{line}</span>
                {i < lines.length - 1 ? ' ' : null}
              </span>
            </span>
          ))}
        </span>
      </Comp>
    )

  return (
    <Comp ref={ref} id={id} className={className}>
      <span className="block">
        {lines.map((line, i) => (
          <span key={i} className="mask-line">
            <motion.span
              data-reveal=""
              className={cn('block will-change-transform', lineClassName)}
              initial={{ y: '112%' }}
              animate={show ? { y: '0%' } : undefined}
              transition={{ duration: 1.25, ease: EASE_OUT, delay: delay + i * stagger }}
            >
              <span className={cn('block', accent.includes(i) && cn('text-[1.1em] leading-[0.98]', accentClassName))}>{line}</span>
              {i < lines.length - 1 ? ' ' : null}
            </motion.span>
          </span>
        ))}
      </span>
    </Comp>
  )
}

type WordsProps = {
  text: string
  as?: Tag
  className?: string
  delay?: number
  stagger?: number
  amount?: number
  immediate?: boolean
  id?: string
}

/** Word-by-word masked reveal for headings that wrap naturally. */
export function RevealWords({ text, as = 'h2', className, delay = 0, stagger = 0.035, amount = 0.3, immediate = false, id }: WordsProps) {
  const { ref, show } = useRevealTrigger(amount)
  const Comp = as as unknown as Polymorphic
  const words = text.split(' ')

  if (immediate)
    return (
      <Comp id={id} className={className}>
        <span>
          {words.map((word, i) => (
            <span key={i}>
              <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top">
                <span className="enter-line inline-block" style={{ '--d': `${delay + i * stagger}s` } as CSSProperties}>
                  {word}
                </span>
              </span>
              {i < words.length - 1 ? ' ' : null}
            </span>
          ))}
        </span>
      </Comp>
    )

  return (
    <Comp ref={ref} id={id} className={className}>
      <span>
        {words.map((word, i) => (
          <span key={i}>
            <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top">
              <motion.span
                data-reveal=""
                className="inline-block will-change-transform"
                initial={{ y: '110%' }}
                animate={show ? { y: '0%' } : undefined}
                transition={{ duration: 1.1, ease: EASE_OUT, delay: delay + i * stagger }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </Comp>
  )
}

function HighlightWord({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: string }) {
  const opacity = useTransform(progress, range, [0.48, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

/** Scroll-linked statement: each word brightens as the reader scrolls through it. */
export function ScrollHighlight({ text, as = 'p', className }: { text: string; as?: Tag; className?: string }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.5'] })
  const Comp = as as unknown as Polymorphic
  const words = text.split(' ')

  // The ref stays attached in both modes so useScroll always has a hydrated target.
  if (reduced)
    return (
      <Comp ref={ref} className={className}>
        {text}
      </Comp>
    )

  return (
    <Comp ref={ref} className={className}>
      <span>
        {words.map((word, i) => (
          <span key={i}>
            <HighlightWord progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {word}
            </HighlightWord>
            {i < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </Comp>
  )
}
