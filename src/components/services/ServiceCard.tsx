import Image from 'next/image'

import { TransitionLink } from '@/components/transition/TransitionLink'
import { CardFX } from '@/components/ui/CardFX'
import { ArrowUpRight } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'
import { images } from '@/content/images'
import { serviceNumber, type Service } from '@/content/services'

/** Editorial service card — number, title, description, arrow and a photographic hover state. */
export function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  const img = images[service.image]
  return (
    <Reveal delay={delay} className="h-full">
      <CardFX className="h-full rounded-[1.5rem]">
        <TransitionLink
          href={`/services/${service.slug}`}
          className="group relative isolate flex h-full min-h-[21rem] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-ink/10 bg-paper p-7 transition-[border-color,transform,box-shadow,background-color] duration-700 ease-out-expo hover:border-blue-300 hover:bg-white hover:shadow-[0_40px_80px_-45px_rgba(35,80,240,0.55)] sm:p-8"
          data-cursor="view"
          data-cursor-label="Open"
        >
          <div aria-hidden="true" className="absolute inset-0 -z-10 hidden scale-[1.12] [@media(hover:hover)]:block opacity-0 transition-[opacity,transform] duration-[1200ms] ease-out-expo group-hover:scale-100 group-hover:opacity-100">
            <Image src={img.src} alt="" fill sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw" placeholder="blur" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/30" />
          </div>

          <div className="flex items-start justify-between gap-6">
            <span className="text-eyebrow text-accent-strong">{serviceNumber(service.slug)}</span>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-700 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </span>
          </div>

          <div className="mt-14 flex flex-col gap-4">
            <h3 className="font-display text-[clamp(1.4rem,1.8vw,1.75rem)] font-medium leading-[1.12] tracking-[-0.03em] text-ink transition-transform duration-700 ease-out-expo group-hover:translate-x-1">
              {service.title}
            </h3>
            <p className="text-[0.9375rem] leading-relaxed text-ink/70">{service.description}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/10 pt-4 text-xs text-stone">
              {service.idealFor && <span>Ideal for · {service.idealFor}</span>}
              {service.includes.length > 0 && (
                <span className="text-accent-strong">
                  {service.includes.length} inclusions
                </span>
              )}
            </div>
          </div>
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
        </TransitionLink>
      </CardFX>
    </Reveal>
  )
}
