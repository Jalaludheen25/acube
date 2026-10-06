'use client'

import { motion, useInView, useScroll } from 'motion/react'
import { useRef, type ReactNode } from 'react'

import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import type { Step } from '@/content/company'
import { cn, pad2 } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/hooks'

type Tone = 'light' | 'dark'
type Surface = 'bone' | 'white' | 'paper' | 'tint'

const surfaceClass: Record<Surface, string> = { bone: 'bg-bone', white: 'bg-white', paper: 'bg-paper', tint: 'bg-tint' }

function StepRow({ step, index, tone }: { step: Step; index: number; tone: Tone }) {
  const ref = useRef<HTMLLIElement>(null)
  const reached = useInView(ref, { once: true, margin: '-42% 0px -42% 0px' })

  const light = tone === 'light'
  return (
    <li ref={ref} className="relative grid grid-cols-[3.25rem_1fr] gap-x-5 pb-14 last:pb-0 sm:grid-cols-[6.5rem_1fr] sm:gap-x-10 sm:pb-20">
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-[1.625rem] top-2 h-3 w-3 -translate-x-1/2 rounded-full border transition-colors duration-700 sm:hidden',
          reached ? (light ? 'border-accent bg-accent shadow-[0_0_0_4px_rgba(35,80,240,0.15)]' : 'border-blue-300 bg-blue-300') : light ? 'border-ink/30 bg-white' : 'border-white/30 bg-ink',
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          'hidden font-display text-[4.25rem] font-light leading-[0.85] tracking-[-0.04em] transition-[color,-webkit-text-stroke-color] duration-700 sm:block',
          light ? '[-webkit-text-stroke:1px_var(--color-blue-300)]' : '[-webkit-text-stroke:1px_var(--color-blue-300)]',
          reached ? (light ? 'text-accent [-webkit-text-stroke-color:var(--color-accent)]' : 'text-white [-webkit-text-stroke-color:#ffffff]') : 'text-transparent',
        )}
      >
        {pad2(index + 1)}
      </span>
      <Reveal className="col-start-2 flex flex-col gap-3 pt-1 sm:pt-3">
        <span className={cn('text-eyebrow sm:hidden', light ? 'text-accent-strong' : 'text-blue-100')}>Step {pad2(index + 1)}</span>
        <h3 className="text-display-sm">{step.title}</h3>
        <p className={cn('max-w-md text-[0.9375rem] leading-relaxed', light ? 'text-stone' : 'text-blue-100')}>{step.description}</p>
      </Reveal>
    </li>
  )
}

type Props = {
  id: string
  eyebrow: string
  index?: string
  title: string[]
  lede?: string
  steps: Step[]
  tone?: Tone
  footer?: ReactNode
  /** Background for the light tone. */
  surface?: Surface
  className?: string
}

export function ProcessTimeline({ id, eyebrow, index, title, lede, steps, tone = 'light', surface = 'bone', footer, className }: Props) {
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.55', 'end 0.55'] })
  const light = tone === 'light'

  return (
    <section
      aria-labelledby={id}
      data-theme={light ? 'light' : undefined}
      className={cn('relative', light ? cn(surfaceClass[surface], 'text-ink') : 'bg-ocean text-white', className)}
    >
      <div className="container-x grid gap-16 py-24 sm:py-32 lg:grid-cols-12 lg:gap-12 lg:py-40">
        <div className="lg:col-span-5">
          <div className="flex flex-col gap-7 lg:sticky lg:top-32">
            <Reveal y={12} blur={false}>
              <Eyebrow tone={light ? 'light' : 'dark'} index={index}>
                {eyebrow}
              </Eyebrow>
            </Reveal>
            <RevealLines
              id={id}
              lines={title}
              accent={[title.length - 1]}
              accentClassName={cn('font-accent w-fit', light ? 'text-gradient' : 'text-gradient-ice')}
              className="text-display-lg text-balance"
            />
            {lede && (
              <Reveal delay={0.15} as="p" className={cn('text-lede max-w-md', light ? 'text-stone' : 'text-blue-100')}>
                {lede}
              </Reveal>
            )}
            {footer && <Reveal delay={0.25}>{footer}</Reveal>}
          </div>
        </div>

        <div className="relative lg:col-span-7">
          {/* progress rail */}
          <div aria-hidden="true" className={cn('absolute bottom-0 left-[1.625rem] top-2 w-px sm:left-[2.4rem]', light ? 'bg-ink/10' : 'bg-white/10')}>
            <motion.div
              className={cn('absolute inset-0 origin-top', light ? 'bg-[linear-gradient(180deg,var(--color-blue-600),var(--color-cyan))]' : 'bg-blue-300')}
              style={{ scaleY: reduced ? 1 : scrollYProgress }}
            />
          </div>
          <ol ref={listRef} className="relative">
            {steps.map((step, i) => (
              <StepRow key={step.title} step={step} index={i} tone={tone} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
