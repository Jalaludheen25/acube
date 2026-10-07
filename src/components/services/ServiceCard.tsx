import Image from 'next/image'

import { TransitionLink } from '@/components/transition/TransitionLink'
import { CardFX } from '@/components/ui/CardFX'
import { ArrowUpRight, Check } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'
import { images } from '@/content/images'
import { serviceNumber, type Service } from '@/content/services'

/** How many inclusions a card lists before summarising the rest as "+ N more" (as on the original site). */
const PREVIEW = 5

/**
 * Service card — number, title, description, "What this involves" preview, audience and a link to the
 * full service page. A photograph washes in on hover (mouse devices only).
 */
export function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  const img = images[service.image]
  const preview = service.includes.slice(0, PREVIEW)
  const more = service.includes.length - preview.length

  return (
    <Reveal delay={delay} className="h-full">
      <CardFX className="h-full rounded-[1.5rem]">
        <TransitionLink
          href={`/services/${service.slug}`}
          className="group relative isolate flex h-full min-h-[21rem] flex-col overflow-hidden rounded-[1.5rem] border border-ink/10 bg-paper p-7 transition-[border-color,transform,box-shadow,background-color] duration-700 ease-out-expo hover:border-blue-300 hover:bg-white hover:shadow-[0_40px_80px_-45px_rgba(35,80,240,0.55)] sm:p-8"
          data-cursor="view"
          data-cursor-label="Open"
        >
          <div aria-hidden="true" className="absolute inset-0 -z-10 hidden scale-[1.12] opacity-0 transition-[opacity,transform] duration-[1200ms] ease-out-expo group-hover:scale-100 group-hover:opacity-100 [@media(hover:hover)]:block">
            <Image src={img.src} alt="" fill sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw" placeholder="blur" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/25" />
          </div>

          <div className="flex items-start justify-between gap-6">
            <span className="text-eyebrow text-accent-strong">{serviceNumber(service.slug)}</span>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-700 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </span>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <h3 className="font-display text-[clamp(1.4rem,1.8vw,1.75rem)] font-medium leading-[1.12] tracking-[-0.03em] text-ink transition-transform duration-700 ease-out-expo group-hover:translate-x-1">
              {service.title}
            </h3>
            <p className="text-[0.9375rem] leading-relaxed text-ink/70">{service.description}</p>
          </div>

          {preview.length > 0 && (
            <div className="mt-6 flex flex-col gap-3">
              <p className="text-eyebrow text-stone">What this involves</p>
              <ul className="flex flex-col gap-2">
                {preview.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-ink/85">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                      <Check size={10} strokeWidth={2.25} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              {more > 0 && <p className="pl-[1.625rem] text-sm font-medium text-accent-strong">+ {more} more</p>}
            </div>
          )}

          {/* Pushes the footer to the bottom while keeping at least a little air above it */}
          <div aria-hidden="true" className="min-h-6 flex-1" />

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-ink/10 pt-4 text-xs text-stone">
            <span>{service.idealFor && `Ideal for · ${service.idealFor}`}</span>
            <span className="text-sm font-medium text-ink">
              <span className="link-underline">View full details</span>
            </span>
          </div>
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
        </TransitionLink>
      </CardFX>
    </Reveal>
  )
}
