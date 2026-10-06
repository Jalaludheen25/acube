'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'

import { StructureCard } from '@/components/services/StructureCard'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { structures } from '@/content/company'
import { images } from '@/content/images'
import { usePrefersReducedMotion } from '@/lib/hooks'
import { EASE_IN_OUT } from '@/lib/motion'

/** Architectural skyline line-drawing that traces itself as the section enters. */
function SkylineLines() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.35'] })
  const length = useTransform(scrollYProgress, [0, 1], [0, 1])
  const path =
    'M0 180 H90 V120 H120 V150 H170 V90 L182 78 L194 90 V150 H240 V110 H275 V60 H285 V30 L292 4 L299 30 V60 H309 V150 H360 V100 H395 V140 H440 V70 L470 40 L500 70 V150 H560 V115 H600 V150 H660 V95 H690 V150 H760 V125 H800 V180 H1000'
  return (
    <div ref={ref}>
      <svg viewBox="0 0 1000 190" preserveAspectRatio="none" className="h-20 w-full sm:h-28" aria-hidden="true">
        <motion.path d={path} fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" style={{ pathLength: reduced ? 1 : length }} />
      </svg>
    </div>
  )
}

export function UAEGateway() {
  const frameRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-8%', '8%'])
  const scale = useTransform(scrollYProgress, [0, 0.5], reduced ? [1, 1] : [1.14, 1.02])
  const frameScale = useTransform(scrollYProgress, [0, 0.45], reduced ? [1, 1] : [0.9, 1])

  return (
    <section aria-labelledby="uae-title" className="relative overflow-hidden bg-white">
      <div className="container-x pt-24 sm:pt-32 lg:pt-40">
        <div className="flex flex-col items-start gap-7">
          <Reveal y={12} blur={false}>
            <Eyebrow index="04">Business Setup Types</Eyebrow>
          </Reveal>
          <RevealLines id="uae-title" lines={['Your gateway', 'to the UAE.']} accent={[1]} className="text-display-2xl text-ink" />
          <div className="mt-2 grid w-full gap-8 lg:grid-cols-12">
            <Reveal delay={0.15} className="lg:col-span-5">
              <p className="text-display-sm text-ink">Three ways to establish your company.</p>
            </Reveal>
            <Reveal delay={0.25} className="lg:col-span-5 lg:col-start-8">
              <p className="text-lede text-stone">
                Mainland, free zone, or offshore — we&apos;ll help you choose the structure that fits how you plan to operate.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 text-ink/15 sm:mt-16">
          <SkylineLines />
        </div>
      </div>

      {/* Daytime Dubai, full width within the grid */}
      <div className="container-x">
        <Reveal blur={false} y={40}>
          <motion.div ref={frameRef} style={{ scale: frameScale }} className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-sand sm:aspect-[16/8] lg:aspect-[21/9]">
            <motion.div className="absolute inset-x-0 -inset-y-[10%]" style={{ y, scale }}>
              <Image
                src={images.downtownDay.src}
                alt={images.downtownDay.alt}
                fill
                sizes="(min-width: 1680px) 1560px, 100vw"
                placeholder="blur"
                className="object-cover object-[50%_45%]"
              />
            </motion.div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-paper/40" />
            {/* Slow travelling light */}
            <motion.div
              aria-hidden="true"
              className="absolute top-[28%] h-px w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
              animate={reduced ? undefined : { left: ['-35%', '110%'] }}
              transition={{ duration: 9, repeat: Infinity, ease: EASE_IN_OUT, repeatDelay: 3 }}
            />
          </motion.div>
        </Reveal>
      </div>

      {/* Structure cards layered over the photograph's lower edge */}
      <div className="container-x relative -mt-16 pb-24 sm:-mt-24 sm:pb-32 lg:-mt-36 lg:pb-40">
        <ul className="grid gap-4 px-2 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:gap-5 lg:px-10">
          {structures.map((s, i) => (
            <li key={s.slug} className="sm:last:col-span-2 lg:last:col-span-1">
              <StructureCard structure={s} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
