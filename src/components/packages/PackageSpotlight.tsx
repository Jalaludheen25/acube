'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import { TransitionLink } from '@/components/transition/TransitionLink'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@/components/ui/Icons'
import { packages, type PackageTier } from '@/content/packages'
import { usePrefersReducedMotion } from '@/lib/hooks'
import { EASE_OUT } from '@/lib/motion'
import { pad2 } from '@/lib/utils'

const INTERVAL = 6000

function Slide({ pkg }: { pkg: PackageTier }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-eyebrow text-accent-strong">Package {pkg.number}</span>
        {pkg.recommended && <span className="text-eyebrow rounded-full bg-accent px-2.5 py-1 text-white">Recommended</span>}
      </div>
      <p className="font-display text-[2.4rem] font-medium leading-none tracking-[-0.045em] text-ink">{pkg.name}</p>
      <p className="text-[0.9375rem] font-medium text-ink/85">{pkg.tagline}</p>
      {pkg.description && <p className="text-sm leading-relaxed text-stone">{pkg.description}</p>}
      <p className="text-eyebrow mt-1 text-stone">For · {pkg.audience}</p>
    </div>
  )
}

/** Rotating package spotlight for the Packages hero (mirrors the original site's hero slider). */
export function PackageSpotlight() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = usePrefersReducedMotion()
  const total = packages.length
  const p = packages[index]

  useEffect(() => {
    if (paused || reduced) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % total), INTERVAL)
    return () => window.clearTimeout(id)
  }, [index, paused, reduced, total])

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total)

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Business setup packages"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="w-full rounded-[1.75rem] border border-white/70 bg-white/85 p-6 shadow-[0_40px_90px_-40px_rgba(13,29,94,0.55)] backdrop-blur-xl sm:w-[27rem] sm:p-7"
    >
      {/* Every slide is laid out invisibly in the same grid cell, so the card always takes the
          height of the tallest package and never jumps between slides. */}
      <div className="grid" aria-live={paused || reduced ? 'polite' : 'off'}>
        {packages.map((pkg) => (
          <div key={pkg.slug} aria-hidden="true" className="invisible [grid-area:1/1]">
            <Slide pkg={pkg} />
          </div>
        ))}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={p.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${total}`}
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="[grid-area:1/1]"
          >
            <Slide pkg={p} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-ink/10 pt-4">
        <div className="flex items-center gap-2.5">
          <span className="text-eyebrow mr-1 whitespace-nowrap tabular-nums text-stone">
            <span className="text-ink">{pad2(index + 1)}</span> / {pad2(total)}
          </span>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous package"
            className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-blue-300 hover:text-accent"
          >
            <ArrowLeft size={15} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next package"
            className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-blue-300 hover:text-accent"
          >
            <ArrowRight size={15} />
          </button>
        </div>
        <TransitionLink href="#compare" className="group inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-ink transition-colors hover:text-accent-strong">
          <span className="link-underline">Compare all packages</span>
          <ArrowUpRight size={14} className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </TransitionLink>
      </div>

      {/* Autoplay progress */}
      {!reduced && (
        <div aria-hidden="true" className="mt-4 h-px w-full overflow-hidden bg-ink/10">
          <span
            key={`${index}-${paused}`}
            className={paused ? 'block h-full w-full bg-accent/40' : 'block h-full bg-[linear-gradient(90deg,var(--color-accent),var(--color-cyan))]'}
            style={paused ? undefined : { animation: `grow ${INTERVAL}ms linear forwards` }}
          />
        </div>
      )}
    </div>
  )
}
