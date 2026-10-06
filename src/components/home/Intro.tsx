'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

import { Counter } from '@/components/ui/Counter'
import { ImageReveal } from '@/components/ui/ImageReveal'
import { Reveal, ScrollHighlight } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { intro } from '@/content/company'
import { images } from '@/content/images'
import { site } from '@/content/site'
import { pad2 } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/hooks'

function Pillar({ word, caption, index }: { word: string; caption: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.45'] })
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(14px)', 'blur(0px)'])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])
  const tracking = useTransform(scrollYProgress, [0, 1], ['0.04em', '-0.03em'])

  return (
    <div ref={ref} className="flex flex-col gap-5 border-t border-ink/15 pt-6">
      <span className="text-eyebrow text-accent-strong">{pad2(index + 1)}</span>
      <motion.p
        style={reduced ? undefined : { filter: blur, opacity, y, letterSpacing: tracking }}
        className="font-display text-[clamp(2.4rem,4.4vw,5rem)] font-medium leading-[1] tracking-[-0.045em] text-ink"
      >
        {word}
      </motion.p>
      <p className="max-w-xs text-[0.9375rem] leading-relaxed text-stone">{caption}</p>
    </div>
  )
}

export function Intro() {
  return (
    <section
      aria-labelledby="intro-heading"
      className="relative z-10 -mt-8 rounded-t-[2rem] bg-white text-ink shadow-[0_-30px_80px_-40px_rgba(11,21,48,0.35)] sm:rounded-t-[2.75rem] lg:mt-0"
    >
      <div className="container-x py-24 sm:py-32 lg:py-44">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-10 lg:col-span-3">
            <Reveal y={12} blur={false}>
              <Eyebrow tone="light" index="01" as="h2" className="!text-stone">
                <span id="intro-heading">Who we are</span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.1} className="hidden flex-col gap-2 lg:flex">
              <Counter value={site.yearsOfExperience} suffix="+" className="w-fit font-display text-[4.25rem] font-light leading-none tracking-[-0.04em] text-gradient" />
              <span className="text-eyebrow text-stone">Years of experience</span>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
            <ScrollHighlight text={intro.statement} className="text-display-md text-balance text-ink" />
            <Reveal delay={0.1} className="mt-10 flex items-center gap-4 lg:hidden">
              <Counter value={site.yearsOfExperience} suffix="+" className="font-display text-5xl font-light leading-none tracking-[-0.04em] text-gradient" />
              <span className="text-eyebrow max-w-[8rem] text-stone">Years of experience</span>
            </Reveal>
          </div>
        </div>

        <ImageReveal
          image={images.skylineDay}
          sizes="(min-width: 1680px) 1560px, 100vw"
          className="mt-20 aspect-[4/3] rounded-[1.75rem] sm:mt-28 sm:aspect-[21/9]"
          parallax={0.12}
          grow
        />

        <div className="mt-24 grid gap-12 sm:mt-32 md:grid-cols-3 md:gap-8 lg:mt-40">
          {intro.pillars.map((p, i) => (
            <Pillar key={p.word} word={p.word} caption={p.caption} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
