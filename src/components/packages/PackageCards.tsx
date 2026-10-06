import { CardFX } from '@/components/ui/CardFX'
import { Check } from '@/components/ui/Icons'
import { Button } from '@/components/ui/MagneticButton'
import { Reveal } from '@/components/ui/Reveal'
import { packages, packagesIntro } from '@/content/packages'
import { cn } from '@/lib/utils'

export function PackageCards() {
  return (
    <ul className="grid gap-4 lg:grid-cols-3 lg:gap-5">
      {packages.map((p, i) => {
        const featured = Boolean(p.recommended)
        return (
          <li key={p.slug}>
            <CardFX tilt={3} className={cn('h-full rounded-[1.75rem]', featured && 'lg:-my-4')}>
              <Reveal
                as="article"
                delay={i * 0.1}
                className={cn(
                  'relative flex h-full flex-col gap-10 overflow-hidden rounded-[1.75rem] border p-8 sm:p-10',
                  featured
                    ? 'border-blue-600 bg-[linear-gradient(160deg,var(--color-blue-800)_0%,var(--color-blue-600)_60%,#2f6bff_100%)] text-white shadow-[0_50px_100px_-40px_rgba(35,80,240,0.65)] lg:py-14'
                    : 'border-ink/10 bg-white text-ink transition-[border-color,box-shadow] duration-700 hover:border-blue-300 hover:shadow-[0_40px_80px_-45px_rgba(35,80,240,0.5)]',
                )}
              >
                {featured && <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan/30 blur-3xl" />}
                <div className="relative flex flex-col gap-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className={cn('text-eyebrow', featured ? 'text-blue-100' : 'text-accent-strong')}>Package {p.number}</span>
                    {featured && <span className="text-eyebrow rounded-full bg-white px-3 py-1.5 text-accent-strong">Recommended</span>}
                  </div>
                  <h3 className="font-display text-[clamp(2.2rem,3.1vw,3.2rem)] font-medium leading-none tracking-[-0.045em]">{p.name}</h3>
                  <p className={cn('text-lede', featured ? 'text-white/90' : 'text-ink/75')}>{p.tagline}</p>
                  {p.description && <p className={cn('text-sm leading-relaxed', featured ? 'text-blue-100' : 'text-stone')}>{p.description}</p>}
                </div>

                <div className={cn('relative flex items-baseline gap-3 border-y py-5', featured ? 'border-white/20' : 'border-ink/10')}>
                  <span className={cn('font-accent text-4xl', !featured && 'w-fit text-gradient')}>{packagesIntro.pricing}</span>
                  <span className={cn('text-xs', featured ? 'text-blue-100' : 'text-stone')}>{packagesIntro.pricingNote}</span>
                </div>

                <ul className="relative flex flex-1 flex-col gap-3.5">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[0.9375rem] leading-snug">
                      <span
                        className={cn(
                          'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full',
                          featured ? 'bg-white text-accent' : 'bg-accent text-white',
                        )}
                      >
                        <Check size={12} strokeWidth={2} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="relative flex flex-col gap-4">
                  <p className={cn('text-eyebrow', featured ? 'text-blue-100' : 'text-stone')}>For · {p.audience}</p>
                  <Button href={`/contact?package=${p.slug}#enquiry`} variant={featured ? 'inverse' : 'primary'} className="w-full">
                    {`Start with ${p.name}`}
                  </Button>
                </div>
              </Reveal>
            </CardFX>
          </li>
        )
      })}
    </ul>
  )
}
