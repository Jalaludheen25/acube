'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { Fragment, useRef, type CSSProperties, type ReactNode } from 'react'

import { usePageTransition } from '@/components/transition/PageTransition'
import { TransitionLink } from '@/components/transition/TransitionLink'
import { CubeGlyph } from '@/components/ui/Icons'
import { RevealLines, RevealWords } from '@/components/ui/Reveal'
import type { SiteImage } from '@/content/images'
import { usePrefersReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils'

type Crumb = { label: string; href?: string }

type Props = {
  eyebrow: string
  /** Array → line-by-line reveal (one line per entry). String → word reveal that wraps naturally. */
  title: string | string[]
  accent?: number[]
  lede?: ReactNode
  actions?: ReactNode
  aside?: ReactNode
  image?: SiteImage
  variant?: 'background' | 'split' | 'type'
  breadcrumbs?: Crumb[]
  titleClassName?: string
}

/** CSS entrance delay (the hero paints before hydration — see `.enter-*` in globals.css). */
const d = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties

function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone">
        {items.map((c, i) => (
          <Fragment key={c.label}>
            <li>
              {c.href ? (
                <TransitionLink href={c.href} className="link-underline transition-colors hover:text-accent-strong">
                  {c.label}
                </TransitionLink>
              ) : (
                <span aria-current="page" className="text-ink/80">
                  {c.label}
                </span>
              )}
            </li>
            {i < items.length - 1 && (
              <li aria-hidden="true" className="h-3 w-px rotate-[20deg] bg-blue-300" />
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}

export function PageHero({ eyebrow, title, accent, lede, actions, aside, image, variant = 'type', breadcrumbs, titleClassName }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { ready } = usePageTransition()
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '18%'])
  const paused = ready ? undefined : ''

  const headingClass = cn(variant === 'background' ? 'text-display-2xl' : 'text-display-xl', 'text-balance text-ink', titleClassName)

  const heading = Array.isArray(title) ? (
    <RevealLines as="h1" immediate lines={title} accent={accent} delay={0.25} className={headingClass} />
  ) : (
    <RevealWords as="h1" immediate text={title} delay={0.25} className={headingClass} />
  )

  const text = (
    <div className="flex flex-col gap-7 sm:gap-8">
      {breadcrumbs && (
        <div className="enter-up" style={d(0.1)}>
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}
      <p className="enter-up text-eyebrow flex items-center gap-3 text-stone" style={d(0.15)}>
        <CubeGlyph size={11} className="text-ink" />
        {eyebrow}
      </p>
      {heading}
      {lede && (
        <div className="enter-up text-lede max-w-2xl text-pretty text-stone" style={d(0.7)}>
          {lede}
        </div>
      )}
      {actions && (
        <div className="enter-up flex flex-wrap gap-3" style={d(0.85)}>
          {actions}
        </div>
      )}
    </div>
  )

  if (variant === 'background' && image) {
    return (
      <section ref={ref} data-paused={paused} className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-sky pb-14 pt-36 sm:pb-20 lg:min-h-[92svh]">
        <div className="enter-fade absolute inset-0 -z-10">
          <motion.div className="absolute inset-0" style={{ y: bgY }}>
            <div className="enter-scale absolute inset-0" style={{ '--dur': '2.6s' } as CSSProperties}>
              <Image src={image.src} alt="" fill priority sizes="100vw" placeholder="blur" className="object-cover" />
            </div>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#e3edff] via-[#e3edff]/80 to-transparent lg:via-[#e3edff]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#eaf1ff] via-transparent to-[#e3edff]/40" />
        </div>
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">{text}</div>
          {aside && (
            <div className="enter-up lg:col-span-4 lg:justify-self-end" style={d(1)}>
              {aside}
            </div>
          )}
        </div>
      </section>
    )
  }

  if (variant === 'split' && image) {
    return (
      <section ref={ref} data-paused={paused} className="relative overflow-hidden bg-sky pb-16 pt-32 sm:pb-24 lg:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_80%_30%,rgba(58,107,255,0.16),transparent_70%),radial-gradient(35%_40%_at_0%_100%,rgba(34,195,255,0.12),transparent_70%)]" />
        <div aria-hidden="true" className="bg-blueprint pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">{text}</div>
          <div className="lg:col-span-5">
            <div className="enter-clip relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-sand sm:aspect-[5/4] lg:aspect-[4/5]" style={d(0.3)}>
              <div className="enter-scale absolute inset-0" style={d(0.3)}>
                <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 38vw, 100vw" placeholder="blur" className="object-cover" />
              </div>
            </div>
            {aside && (
              <div className="enter-up mt-6" style={d(1)}>
                {aside}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} data-paused={paused} className="relative overflow-hidden bg-sky pb-16 pt-36 sm:pb-24 lg:pb-28 lg:pt-48">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(45%_60%_at_85%_10%,rgba(58,107,255,0.16),transparent_70%),radial-gradient(30%_40%_at_100%_60%,rgba(34,195,255,0.12),transparent_70%)]" />
        <div className="bg-blueprint absolute inset-0 opacity-70" />
        {[25, 50, 75].map((left, i) => (
          <span
            key={left}
            className="enter-draw-y absolute top-0 hidden h-full w-px bg-gradient-to-b from-blue-600/[0.1] to-transparent md:block"
            style={{ left: `${left}%`, ...d(0.1 + i * 0.12) }}
          />
        ))}
      </div>
      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className={aside ? 'lg:col-span-8' : 'lg:col-span-10'}>{text}</div>
        {aside && (
          <div className="enter-up lg:col-span-4 lg:justify-self-end" style={d(0.9)}>
            {aside}
          </div>
        )}
      </div>
    </section>
  )
}
