'use client'

import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'

import { Reveal } from '@/components/ui/Reveal'
import { images } from '@/content/images'
import { industries } from '@/content/industries'
import { EASE_OUT } from '@/lib/motion'
import { cn, pad2 } from '@/lib/utils'

export function IndustriesExplorer() {
  const [active, setActive] = useState(0)
  const current = industries[active]

  return (
    <>
      {/* Desktop: list drives a sticky visual panel */}
      <div className="hidden gap-12 lg:grid lg:grid-cols-12">
        <ul className="lg:col-span-6" aria-label="Sectors">
          {industries.map((ind, i) => {
            const selected = i === active
            return (
              <li key={ind.name} className="border-b border-ink/10 first:border-t">
                <button
                  type="button"
                  aria-pressed={selected}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-baseline gap-6 py-5 text-left"
                >
                  <span className={cn('text-eyebrow w-8 shrink-0 transition-colors', selected ? 'text-accent-strong' : 'text-stone')}>{pad2(i + 1)}</span>
                  <span
                    className={cn(
                      'flex-1 font-display text-[clamp(1.45rem,2.2vw,2.3rem)] font-medium leading-[1.1] tracking-[-0.035em] transition-[color,transform] duration-700 ease-out-expo',
                      selected ? 'translate-x-3 text-accent-strong' : 'text-ink/55 group-hover:text-ink/80',
                    )}
                  >
                    {ind.name}
                  </span>
                  <span className={cn('text-eyebrow transition-opacity duration-500', selected ? 'text-accent-strong opacity-100' : 'text-stone opacity-0')}>{ind.licence}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <div className="lg:col-span-6">
          <div className="sticky top-28 aspect-[4/5] max-h-[78vh] w-full overflow-hidden rounded-[1.75rem] bg-sand">
            {industries.map((ind, i) => (
              <div
                key={ind.name}
                aria-hidden={i !== active}
                className={cn('absolute inset-0 transition-[opacity,transform] duration-[1100ms] ease-out-expo', i === active ? 'scale-100 opacity-100' : 'scale-110 opacity-0')}
              >
                <Image src={images[ind.image].src} alt={images[ind.image].alt} fill sizes="(min-width: 1024px) 45vw, 100vw" placeholder="blur" className="object-cover" />
              </div>
            ))}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
            <div className="absolute inset-x-4 bottom-4 rounded-[1.35rem] border border-white/60 bg-white/85 p-6 shadow-[0_30px_60px_-30px_rgba(11,21,48,0.45)] backdrop-blur-xl xl:inset-x-6 xl:bottom-6 xl:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                  transition={{ duration: 0.55, ease: EASE_OUT }}
                  className="flex items-end justify-between gap-6"
                >
                  <div className="flex flex-col gap-3">
                    <span className="text-eyebrow text-accent-strong">{current.licence}</span>
                    <p className="text-display-md text-ink">{current.name}</p>
                  </div>
                  <span className="font-display text-5xl font-light leading-none text-stone">{pad2(active + 1)}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & tablet: card grid */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:hidden">
        {industries.map((ind, i) => (
          <Reveal key={ind.name} as="li" delay={(i % 2) * 0.06} className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] sm:aspect-[3/4]">
            <Image src={images[ind.image].src} alt={images[ind.image].alt} fill sizes="(min-width: 640px) 50vw, 100vw" placeholder="blur" className="object-cover" />
            <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-4 rounded-2xl bg-white/90 p-5 backdrop-blur">
              <div className="flex flex-col gap-2">
                <span className="text-eyebrow text-accent-strong">{ind.licence}</span>
                <h3 className="font-display text-2xl font-medium leading-tight tracking-[-0.03em] text-ink">{ind.name}</h3>
              </div>
              <span className="text-eyebrow text-stone">{pad2(i + 1)}</span>
            </div>
          </Reveal>
        ))}
      </ul>
    </>
  )
}
