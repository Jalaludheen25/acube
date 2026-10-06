'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { CardFX } from '@/components/ui/CardFX'
import { Counter } from '@/components/ui/Counter'
import { ExpandBackground } from '@/components/ui/ExpandBackground'
import { principleIcons } from '@/components/ui/Icons'
import { Button } from '@/components/ui/MagneticButton'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { principles } from '@/content/company'
import { primaryCta, site } from '@/content/site'
import { useMediaQuery, usePrefersReducedMotion } from '@/lib/hooks'
import { cn, pad2 } from '@/lib/utils'

export function WhyAcube() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const desktop = useMediaQuery('(min-width: 1024px)')
  const pinned = desktop && !reduced
  const [distance, setDistance] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track || !pinned) return
    const measure = () => setDistance(Math.max(0, track.scrollWidth - track.clientWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    return () => ro.disconnect()
  }, [pinned])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (v) => -v * distance)
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-title"
      className="relative isolate text-white"
      style={pinned && distance ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <ExpandBackground className="bg-ocean" />
      <div className={cn(pinned ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16' : 'py-24 sm:py-32')}>
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="flex flex-col gap-7 lg:col-span-7">
              <Reveal y={12} blur={false}>
                <Eyebrow tone="dark" index="03">
                  Why ACUBE
                </Eyebrow>
              </Reveal>
              <RevealLines
                id="why-title"
                lines={['Your business deserves', 'the right foundation.']}
                accent={[1]}
                accentClassName="font-accent w-fit text-gradient-ice"
                className="text-display-lg text-balance"
              />
              <Reveal delay={0.15} as="p" className="text-lede max-w-md text-blue-100">
                A few principles guide everything we do.
              </Reveal>
            </div>
            <Reveal delay={0.2} className="flex flex-wrap items-end gap-8 lg:col-span-5 lg:justify-end">
              <div className="flex items-end gap-4">
                <Counter value={site.yearsOfExperience} suffix="+" className="font-display text-[4.25rem] font-light leading-[0.85] tracking-[-0.04em] text-gradient-ice" />
                <span className="text-eyebrow max-w-[7rem] pb-1 text-blue-100">Years of experience</span>
              </div>
              <Button href={primaryCta.href} variant="inverse" size="md">
                {primaryCta.label}
              </Button>
            </Reveal>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={cn(
            'mt-12 flex gap-4 lg:mt-16 lg:gap-5',
            pinned ? 'w-full will-change-transform' : 'no-scrollbar snap-x snap-mandatory overflow-x-auto pb-2',
          )}
        >
          {/* Leading inset aligned to the container */}
          <div aria-hidden="true" className="w-[max(0px,calc((100vw-1680px)/2))] shrink-0 pl-1 sm:pl-4 lg:pl-8 2xl:pl-12" />
          {principles.map((p, i) => {
            const Icon = principleIcons[i]
            return (
              <CardFX key={p.title} tilt={5} className="shrink-0 snap-start rounded-[1.75rem]">
                <Reveal
                  as="article"
                  delay={pinned ? 0 : i * 0.06}
                  className="group relative flex min-h-[19rem] w-[min(82vw,25rem)] lg:h-[min(58vh,30rem)] lg:min-h-[22rem] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/60 bg-white p-7 text-ink shadow-[0_30px_70px_-40px_rgba(8,15,50,0.7)] transition-[border-color,box-shadow] duration-700 ease-out-expo hover:border-white hover:shadow-[0_40px_90px_-35px_rgba(8,15,50,0.85)] sm:p-9"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-eyebrow text-accent-strong">{pad2(i + 1)}</span>
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-blue-100 bg-accent-soft text-accent transition-all duration-700 ease-out-expo group-hover:rotate-[20deg] group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                      <Icon size={24} />
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-display-sm text-balance">{p.title}</h3>
                    <p className="text-[0.9375rem] leading-relaxed text-stone">{p.description}</p>
                  </div>
                </Reveal>
              </CardFX>
            )
          })}
          <div aria-hidden="true" className="w-1 shrink-0 sm:w-4 lg:w-[max(2rem,calc((100vw-1680px)/2+2rem))]" />
        </motion.div>

        {pinned && (
          <div className="container-x mt-12" aria-hidden="true">
            <div className="relative h-px w-full bg-white/20">
              <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-[linear-gradient(90deg,#ffffff,var(--color-cyan))]" style={{ scaleX: progress }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
