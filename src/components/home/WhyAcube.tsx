'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { CardFX } from '@/components/ui/CardFX'
import { Counter } from '@/components/ui/Counter'
import { ExpandBackground } from '@/components/ui/ExpandBackground'
import { principleIcons } from '@/components/ui/Icons'
import { Button } from '@/components/ui/MagneticButton'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { principles } from '@/content/company'
import { images } from '@/content/images'
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
                  className="group relative flex w-[min(82vw,24rem)] flex-col overflow-hidden rounded-[1.75rem] border border-white/60 bg-white p-2.5 text-ink shadow-[0_30px_70px_-40px_rgba(8,15,50,0.7)] transition-[border-color,box-shadow] duration-700 ease-out-expo hover:border-white hover:shadow-[0_40px_90px_-35px_rgba(8,15,50,0.85)] lg:h-[min(60vh,31rem)] lg:min-h-[26rem]"
                >
                  {/* Framed photograph — fills the card's free height on desktop */}
                  {p.image && (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem] bg-sand lg:aspect-auto lg:min-h-[10rem] lg:flex-1">
                      <Image
                        src={images[p.image].src}
                        alt={images[p.image].alt}
                        fill
                        sizes="(min-width: 1024px) 24rem, 82vw"
                        placeholder="blur"
                        className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.06]"
                      />
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent to-transparent" />
                      <span className="text-eyebrow absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-accent-strong backdrop-blur">
                        {pad2(i + 1)}
                      </span>
                    </div>
                  )}

                  <div className="relative px-4 pb-5 pt-0 sm:px-5 sm:pb-6">
                    {/* Icon badge overlapping the photograph */}
                    <span className="relative -mt-7 grid h-14 w-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--color-blue-700),var(--color-blue-500))] text-white shadow-[0_14px_30px_-12px_rgba(35,80,240,0.85)] ring-4 ring-white transition-transform duration-700 ease-out-expo group-hover:-rotate-6 group-hover:scale-105">
                      <Icon size={24} strokeWidth={1.5} />
                    </span>
                    <h3 className="text-display-sm mt-4 text-balance">{p.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-stone">{p.description}</p>
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
