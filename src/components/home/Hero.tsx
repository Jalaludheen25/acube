'use client'

import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useRef, useState, type CSSProperties } from 'react'

import { ThreeDScene } from '@/components/three/ThreeDScene'
import { usePageTransition } from '@/components/transition/PageTransition'
import { ArrowDown, CubeGlyph } from '@/components/ui/Icons'
import { Button } from '@/components/ui/MagneticButton'
import { RevealLines } from '@/components/ui/Reveal'
import { hero } from '@/content/company'
import { primaryCta, site } from '@/content/site'

const GRID_LINES = [8.333, 33.333, 58.333, 83.333]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { ready } = usePageTransition()
  const [covered, setCovered] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25])
  useMotionValueEvent(scrollYProgress, 'change', (v) => setCovered(v > 0.97))

  // Entrance choreography runs in CSS (paints before hydration); --d sets each step's delay.
  const d = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties

  return (
    <section ref={ref} aria-labelledby="hero-title" data-paused={ready ? undefined : ''} className="relative isolate overflow-hidden bg-sky lg:sticky lg:top-0 lg:h-[100svh] lg:min-h-[720px]">
      {/* 1 — Background */}
      <div aria-hidden="true" className="enter-fade absolute inset-0 -z-10">
        <div className="bg-sky absolute inset-0" />
        {/* A deeper blue pool behind the 3D object */}
        <div className="absolute right-[-10%] top-[8%] h-[80%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(35,80,240,0.28),transparent)] blur-2xl" />
        <div className="bg-blueprint absolute inset-0 opacity-70" />
        {/* Architectural grid lines draw in */}
        {GRID_LINES.map((left, i) => (
          <span
            key={left}
            className="enter-draw-y absolute top-0 hidden h-full w-px bg-gradient-to-b from-blue-600/[0.12] via-blue-600/[0.05] to-transparent md:block"
            style={{ left: `${left}%`, ...d(0.2 + i * 0.12) }}
          />
        ))}
        <span
          className="enter-draw-x absolute inset-x-0 top-[62%] hidden h-px bg-gradient-to-r from-transparent via-blue-600/[0.12] to-transparent lg:block"
          style={d(0.9)}
        />
      </div>

      <motion.div style={{ scale: contentScale, opacity: contentOpacity }} className="relative flex min-h-[100svh] flex-col lg:h-full lg:min-h-0">
        <div className="container-x relative grid flex-1 grid-cols-1 content-center gap-y-2 pb-10 pt-20 lg:grid-cols-12 lg:gap-y-4 lg:pb-6 lg:pt-28">
          {/* 7 — 3D object */}
          <div className="relative order-1 h-[30svh] min-h-[220px] lg:order-2 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:h-full lg:min-h-0">
            {/* Soft ground shadow so the lattice sits on the light canvas */}
            <div
              aria-hidden="true"
              className="enter-fade absolute left-1/2 top-[84%] h-10 w-[58%] -translate-x-1/2 rounded-[50%] bg-blue-900/30 blur-2xl lg:left-[48%] lg:top-[88%] lg:w-[70%]"
              style={d(1.6)}
            />
            {/* Floating facts — desktop only */}
            <div aria-hidden="true" className="enter-up absolute left-[-6%] top-[20%] z-10 hidden xl:block" style={d(2)}>
              <div className="flex animate-[float-y_6s_ease-in-out_infinite] items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-[0_20px_50px_-24px_rgba(35,80,240,0.55)] backdrop-blur-xl motion-reduce:animate-none">
                <span className="font-display text-2xl font-light leading-none text-gradient">{site.yearsOfExperience}+</span>
                <span className="text-eyebrow leading-tight text-stone">
                  Years of
                  <br />
                  experience
                </span>
              </div>
            </div>
            <div aria-hidden="true" className="enter-up absolute bottom-[14%] right-[2%] z-10 hidden xl:block" style={d(2.2)}>
              <div className="flex animate-[float-y_7s_ease-in-out_-2s_infinite] items-center gap-3 rounded-full border border-white/70 bg-white/80 py-2.5 pl-3 pr-4 shadow-[0_20px_50px_-24px_rgba(35,80,240,0.55)] backdrop-blur-xl motion-reduce:animate-none">
                <span className="relative grid h-2.5 w-2.5 place-items-center">
                  <span className="absolute inset-0 rounded-full bg-accent/60 animate-[pulse-ring_2.4s_ease-out_infinite] motion-reduce:animate-none" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-accent" />
                </span>
                <span className="text-xs font-medium text-ink">Bur Dubai · UAE</span>
              </div>
            </div>
            <ThreeDScene className="absolute inset-0 -mx-8 lg:-inset-y-16 lg:-left-[12%] lg:-right-[18%] lg:mx-0 xl:-left-[38%]" paused={covered} />
          </div>

          <div className="relative z-10 order-2 flex flex-col gap-6 lg:order-1 lg:col-span-8 lg:col-start-1 lg:row-start-1 lg:gap-9 lg:self-center">
            {/* 3 — Eyebrow */}
            <p style={d(0.55)} className="enter-up text-eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-stone">
              <span className="flex items-center gap-3">
                <CubeGlyph size={11} className="text-ink" />
                {site.positioning}
              </span>
              <span className="flex items-center gap-3 text-accent-strong">
                <span aria-hidden="true" className="h-px w-6 bg-accent/40" />
                Bur Dubai · UAE
              </span>
            </p>

            {/* 4 — Heading, line by line */}
            <RevealLines
              as="h1"
              id="hero-title"
              immediate
              lines={hero.lines}
              accent={[1]}
              accentClassName="font-accent w-fit text-gradient"
              delay={0.7}
              stagger={0.13}
              className="font-display text-[clamp(2.15rem,4.6vw,5.5rem)] font-medium leading-[1.04] tracking-[-0.045em] text-ink"
            />

            {/* 5 — Description */}
            <p style={d(1.25)} className="enter-up text-lede max-w-xl text-pretty text-stone">
              {hero.lede}
            </p>

            {/* 6 — CTAs */}
            <div style={d(1.45)} className="enter-up flex flex-wrap items-center gap-3">
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
              </Button>
              <Button href="/services" size="lg" variant="secondary">
                Explore Services
              </Button>
            </div>
          </div>
        </div>

        {/* Facts strip */}
        <div className="enter-fade container-x relative z-10 pb-6 lg:pb-8" style={d(1.8)}>
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-5">
            <dl className="grid grid-cols-2 gap-x-10 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-14">
              <div>
                <dt className="text-eyebrow text-stone">Experience</dt>
                <dd className="mt-1.5 text-sm text-ink">{site.yearsOfExperience}+ Years</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-stone">Approach</dt>
                <dd className="mt-1.5 text-sm text-ink">Professional Guidance</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-stone">Focus</dt>
                <dd className="mt-1.5 text-sm text-ink">Business Setup</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-stone">Based in</dt>
                <dd className="mt-1.5 text-sm text-ink">Bur Dubai · UAE</dd>
              </div>
            </dl>
            <div className="hidden items-center gap-3 text-eyebrow text-stone sm:flex" aria-hidden="true">
              Scroll
              <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-blue-200 text-accent">
                <motion.span animate={{ y: ['-120%', '0%', '120%'] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
                  <ArrowDown size={14} />
                </motion.span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
