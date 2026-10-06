'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import { ArrowLeft, ArrowRight, Pause, Play } from '@/components/ui/Icons'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { testimonials } from '@/content/testimonials'
import { EASE_OUT } from '@/lib/motion'
import { cn, pad2 } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/hooks'

const INTERVAL = 9000

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [stopped, setStopped] = useState(false)
  const reduced = usePrefersReducedMotion()
  const autoplay = !reduced && !stopped && !hovering
  const t = testimonials[index]
  const total = testimonials.length

  useEffect(() => {
    if (!autoplay) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % total), INTERVAL)
    return () => window.clearTimeout(id)
  }, [autoplay, index, total])

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total)

  return (
    <section
      aria-labelledby="testimonials-title"
      aria-roledescription="carousel"
      className="relative overflow-hidden bg-tint"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
    >
      <span aria-hidden="true" className="pointer-events-none absolute -left-6 top-10 select-none font-serif text-[22rem] leading-none text-blue-100/80 sm:text-[32rem] lg:left-[6%]">
        &ldquo;
      </span>

      <div className="container-x relative py-24 sm:py-32 lg:py-40">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex flex-col gap-7">
            <Reveal y={12} blur={false}>
              <Eyebrow index="08">Client Testimonials</Eyebrow>
            </Reveal>
            <RevealLines id="testimonials-title" lines={['In their words.']} className="text-display-lg" />
          </div>
          <Reveal delay={0.2} className="flex items-center gap-3">
            <span className="text-eyebrow mr-3 tabular-nums text-stone" aria-hidden="true">
              <span className="text-ink">{pad2(index + 1)}</span> / {pad2(total)}
            </span>
            <button
              type="button"
              onClick={() => setStopped((s) => !s)}
              aria-label={stopped ? 'Start automatic rotation' : 'Stop automatic rotation'}
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5"
              hidden={!!reduced}
            >
              {stopped ? <Play size={14} /> : <Pause size={14} />}
            </button>
            <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5">
              <ArrowLeft size={18} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5">
              <ArrowRight size={18} />
            </button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12">
          <div
            className="min-h-[24rem] sm:min-h-[22rem] lg:col-span-10 lg:min-h-[26rem]"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${total}`}
            aria-live={autoplay ? 'off' : 'polite'}
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
                className="flex flex-col gap-10"
              >
                <blockquote className="font-display text-[clamp(1.25rem,2vw,2.1rem)] font-light leading-[1.4] tracking-[-0.025em] text-ink text-pretty">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-blue-700),var(--color-blue-500))] font-display text-xl text-white shadow-[0_10px_24px_-10px_rgba(35,80,240,0.7)]">
                    {t.name.charAt(0)}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[0.9375rem] font-medium text-ink">{t.name}</span>
                    <span className="text-sm text-stone">
                      {t.role}, {t.company}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        {/* Index of voices — doubles as navigation and autoplay progress */}
        <div className="no-scrollbar -mx-5 mt-16 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <ul className="flex min-w-max gap-2 border-t border-ink/10 pt-6 lg:grid lg:min-w-0 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-5">
            {testimonials.map((item, i) => (
              <li key={item.name}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={i === index ? 'true' : undefined}
                  aria-label={`Show testimonial from ${item.name}`}
                  className={cn('group flex w-full flex-col gap-3 pr-4 text-left transition-colors', i === index ? 'text-ink' : 'text-stone hover:text-ink')}
                >
                  <span className="relative block h-px w-full overflow-hidden bg-ink/10">
                    {i === index && (
                      <span
                        key={`${index}-${autoplay}`}
                        className={cn('absolute inset-y-0 left-0 bg-accent', autoplay ? 'animate-[grow_9s_linear_forwards]' : 'w-full')}
                      />
                    )}
                  </span>
                  <span className="whitespace-nowrap text-sm">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
