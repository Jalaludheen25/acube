'use client'

import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useId, useState } from 'react'

import { TransitionLink } from '@/components/transition/TransitionLink'
import { ArrowUpRight, Minus, Plus } from '@/components/ui/Icons'
import { TextLink } from '@/components/ui/MagneticButton'
import { images } from '@/content/images'
import { getCategory, serviceNumber, type Service } from '@/content/services'
import { EASE_OUT } from '@/lib/motion'
import { cn } from '@/lib/utils'

function Inclusions({ items, limit = 6 }: { items: string[]; limit?: number }) {
  if (!items.length) return null
  const shown = items.slice(0, limit)
  const more = items.length - shown.length
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Includes">
      {shown.map((item) => (
        <li key={item} className="rounded-full border border-blue-100 bg-accent-soft px-3 py-1.5 text-xs text-blue-900">
          {item}
        </li>
      ))}
      {more > 0 && <li className="rounded-full px-2 py-1.5 text-xs text-stone">+ {more} more</li>}
    </ul>
  )
}

export function InteractiveServices({ items }: { items: Service[] }) {
  const [active, setActive] = useState(0)
  const [openMobile, setOpenMobile] = useState<number | null>(0)
  const baseId = useId()
  const current = items[active]

  return (
    <div>
      {/* ── Desktop: list + sticky presentation panel ── */}
      <div className="hidden gap-12 lg:grid lg:grid-cols-12">
        <ul className="flex flex-col lg:col-span-5">
          {items.map((s, i) => {
            const isActive = i === active
            return (
              <li key={s.slug} className="border-b border-ink/10 first:border-t">
                <TransitionLink
                  href={`/services/${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative flex items-center gap-6 py-7"
                  data-cursor="view"
                  data-cursor-label="Open"
                >
                  <span className={cn('text-eyebrow w-8 shrink-0 transition-colors duration-500', isActive ? 'text-accent-strong' : 'text-stone')}>
                    {serviceNumber(s.slug)}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <span
                      className={cn(
                        'font-display text-[clamp(1.35rem,1.8vw,1.9rem)] font-medium leading-[1.12] tracking-[-0.03em] transition-[color,transform] duration-700 ease-out-expo',
                        isActive ? 'translate-x-3 text-ink' : 'text-ink/55 group-hover:text-ink/80',
                      )}
                    >
                      {s.title}
                    </span>
                    <span className={cn('text-xs text-stone transition-transform duration-700 ease-out-expo', isActive && 'translate-x-3')}>
                      {getCategory(s.category)?.title}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-700 ease-out-expo',
                      isActive ? 'rotate-45 border-accent bg-accent text-white shadow-[0_10px_24px_-10px_rgba(35,80,240,0.8)]' : 'border-ink/15 text-ink/60',
                    )}
                  >
                    <ArrowUpRight size={16} strokeWidth={1.5} />
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -bottom-px left-0 h-px w-full origin-left bg-[linear-gradient(90deg,var(--color-accent),var(--color-cyan))] transition-transform duration-700 ease-out-expo',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </TransitionLink>
              </li>
            )
          })}
        </ul>

        <div className="lg:col-span-7">
          <div id={`${baseId}-panel`} className="sticky top-28 h-[min(76vh,760px)] overflow-hidden rounded-[1.75rem] bg-sand">
            {items.map((s, i) => (
              <div
                key={s.slug}
                aria-hidden={i !== active}
                className={cn(
                  'absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-out-expo',
                  i === active ? 'scale-100 opacity-100' : 'scale-[1.08] opacity-0',
                )}
              >
                <Image src={images[s.image].src} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" placeholder="blur" className="object-cover" />
              </div>
            ))}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/10 via-transparent to-transparent" />

            <div className="absolute inset-x-4 bottom-4 rounded-[1.35rem] border border-white/60 bg-white/85 p-7 shadow-[0_30px_60px_-30px_rgba(11,21,48,0.45)] backdrop-blur-xl xl:inset-x-6 xl:bottom-6 xl:p-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="text-eyebrow text-accent-strong">{getCategory(current.category)?.shortTitle}</span>
                    {current.idealFor && (
                      <>
                        <span aria-hidden="true" className="h-px w-6 bg-ink/20" />
                        <span className="text-eyebrow text-stone">Ideal for · {current.idealFor}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-display-md max-w-xl text-ink">{current.title}</h3>
                  <p className="max-w-lg text-lede text-ink/75">{current.description}</p>
                  <Inclusions items={current.includes} limit={4} />
                  <TextLink href={`/services/${current.slug}`} className="mt-2">
                    View full details
                  </TextLink>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile & tablet: accordion ── */}
      <ul className="flex flex-col lg:hidden">
        {items.map((s, i) => {
          const open = openMobile === i
          const panelId = `${baseId}-m-${i}`
          return (
            <li key={s.slug} className="border-b border-ink/10 first:border-t">
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenMobile(open ? null : i)}
                  className="flex w-full items-center gap-4 py-6 text-left"
                >
                  <span className={cn('text-eyebrow w-7 shrink-0', open ? 'text-accent-strong' : 'text-stone')}>{serviceNumber(s.slug)}</span>
                  <span className={cn('flex-1 font-display text-[1.4rem] font-medium leading-tight tracking-[-0.03em] transition-colors', open ? 'text-ink' : 'text-ink/70')}>
                    {s.title}
                  </span>
                  <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors', open ? 'border-accent bg-accent text-white' : 'border-ink/15')}>
                    {open ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-5 pb-8">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                        <Image src={images[s.image].src} alt={images[s.image].alt} fill sizes="100vw" placeholder="blur" className="object-cover" />
                      </div>
                      <p className="text-ink/75">{s.description}</p>
                      {s.idealFor && <p className="text-eyebrow text-stone">Ideal for · {s.idealFor}</p>}
                      <Inclusions items={s.includes} limit={5} />
                      <TextLink href={`/services/${s.slug}`}>View full details</TextLink>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
