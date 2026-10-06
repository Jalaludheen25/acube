'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useId, useRef, useState, type KeyboardEvent } from 'react'

import { ExpandBackground } from '@/components/ui/ExpandBackground'
import { Check } from '@/components/ui/Icons'
import { Button } from '@/components/ui/MagneticButton'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { differentiators } from '@/content/company'
import { primaryCta } from '@/content/site'
import { EASE_OUT } from '@/lib/motion'
import { cn, pad2 } from '@/lib/utils'

/** "The complexity is ours. The business is yours." — accessible tabs (arrow-key navigation). */
export function Differentiators() {
  const [active, setActive] = useState(0)
  const id = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const current = differentiators[active]

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = differentiators.length - 1
    let next = active
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    else return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section aria-labelledby={`${id}-title`} className="relative isolate text-white">
      <ExpandBackground className="bg-ocean" />
      <div className="container-x py-24 sm:py-32 lg:py-40">
        <div className="flex flex-col gap-7">
          <Reveal y={12} blur={false}>
            <Eyebrow tone="dark">Why our setup is different</Eyebrow>
          </Reveal>
          <RevealLines
            id={`${id}-title`}
            lines={['The complexity is ours.', 'The business is yours.']}
            accent={[1]}
            accentClassName="font-accent w-fit text-gradient-ice"
            className="text-display-lg"
          />
        </div>

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <div role="tablist" aria-orientation="vertical" aria-label="What sets ACUBE apart" className="flex flex-col lg:col-span-5">
            {differentiators.map((d, i) => {
              const selected = i === active
              return (
                <button
                  key={d.label}
                  ref={(el) => {
                    tabs.current[i] = el
                  }}
                  role="tab"
                  id={`${id}-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`${id}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={onKey}
                  className="group relative flex items-start gap-5 border-b border-white/15 py-6 text-left first:border-t"
                >
                  <span className={cn('text-eyebrow pt-2 transition-colors', selected ? 'text-white' : 'text-blue-100')}>{pad2(i + 1)}</span>
                  <span className="flex flex-col gap-2">
                    <span className={cn('font-display text-2xl font-medium leading-tight tracking-[-0.03em] transition-colors duration-500', selected ? 'text-white' : 'text-blue-100 group-hover:text-white')}>
                      {d.label}
                    </span>
                    <span className="max-w-sm text-sm leading-relaxed text-blue-100">{d.summary}</span>
                  </span>
                  <span aria-hidden="true" className={cn('absolute -bottom-px left-0 h-px w-full origin-left bg-[linear-gradient(90deg,#ffffff,var(--color-cyan))] transition-transform duration-700 ease-out-expo', selected ? 'scale-x-100' : 'scale-x-0')} />
                </button>
              )
            })}
          </div>

          <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white p-8 text-ink shadow-[0_40px_80px_-50px_rgba(11,21,48,0.45)] sm:p-12 lg:col-span-7">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-200/60 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
                className="relative flex min-h-[20rem] flex-col justify-between gap-10"
              >
                <div className="flex flex-col gap-8">
                  <span className="text-eyebrow text-accent-strong">{current.label}</span>
                  <h3 className="text-display-md">{current.title}</h3>
                  <ul className="flex flex-col gap-4">
                    {current.points.map((p) => (
                      <li key={p} className="flex items-center gap-4 text-lede text-ink/85">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-white">
                          <Check size={14} strokeWidth={1.75} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Button href={primaryCta.href}>{primaryCta.label}</Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
