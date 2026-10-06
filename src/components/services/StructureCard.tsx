import Image from 'next/image'

import { TransitionLink } from '@/components/transition/TransitionLink'
import { CardFX } from '@/components/ui/CardFX'
import { ArrowUpRight } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'
import type { Structure } from '@/content/company'
import { images } from '@/content/images'
import { pad2 } from '@/lib/utils'

/** White card for a company structure. Hovering washes in the photograph and rotates the arrow. */
export function StructureCard({
  structure,
  index,
  href,
  short = false,
}: {
  structure: Structure
  index: number
  href?: string
  /** Use the brief summary instead of the full description. */
  short?: boolean
}) {
  const img = images[structure.image]
  return (
    <Reveal delay={index * 0.1} className="h-full">
      <CardFX className="h-full rounded-[1.75rem]">
        <TransitionLink
          href={href ?? `/contact?structure=${structure.slug}`}
          className="group relative isolate flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white p-7 shadow-[0_30px_70px_-45px_rgba(11,21,48,0.45)] transition-[border-color,transform,box-shadow] duration-700 ease-out-expo hover:border-blue-300 hover:shadow-[0_40px_80px_-40px_rgba(35,80,240,0.55)] sm:p-9 lg:min-h-[27rem]"
          data-cursor="view"
          data-cursor-label="Discuss"
        >
          {/* Hover-only photography (not rendered on touch devices) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 hidden scale-110 opacity-0 transition-[opacity,transform] duration-[1200ms] ease-out-expo group-hover:scale-100 group-hover:opacity-100 [@media(hover:hover)]:block"
          >
            <Image src={img.src} alt="" fill sizes="(min-width: 1024px) 33vw, 50vw" placeholder="blur" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-blue-50/40" />
          </div>

          <div className="flex items-start justify-between">
            <span className="text-eyebrow text-accent-strong">{pad2(index + 1)}</span>
            <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-700 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-eyebrow text-stone">{structure.tagline}</p>
            <h3 className="font-display text-[clamp(1.9rem,2.5vw,2.6rem)] font-medium leading-none tracking-[-0.045em] text-ink transition-transform duration-700 ease-out-expo group-hover:translate-x-1">
              {structure.title}
            </h3>
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-ink/70">{short ? structure.summary : structure.description}</p>
            <span className="mt-2 text-sm font-medium text-ink">
              <span className="link-underline">Discuss this structure</span>
            </span>
          </div>
        </TransitionLink>
      </CardFX>
    </Reveal>
  )
}
