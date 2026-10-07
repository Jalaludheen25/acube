import { CTASection } from '@/components/sections/CTASection'
import { PageHero } from '@/components/sections/PageHero'
import { Differentiators } from '@/components/services/Differentiators'
import { ServiceCard } from '@/components/services/ServiceCard'
import { StartingPointFinder } from '@/components/services/StartingPointFinder'
import { TransitionLink } from '@/components/transition/TransitionLink'
import { Button } from '@/components/ui/MagneticButton'
import { Reveal, RevealWords } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { images } from '@/content/images'
import { serviceCategories, servicesInCategory } from '@/content/services'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Business Setup Services in Dubai',
  description:
    'Business setup, company formation, corporate & legal, and government document services in Dubai — the full scope ACUBE handles, delivered end-to-end.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <PageHero
        variant="background"
        image={images.skylineWaterDay}
        eyebrow="Services"
        title={['Business setup', 'services in Dubai.']}
        accent={[1]}
        lede="End-to-end business setup solutions tailored for entrepreneurs, startups and global investors."
        actions={
          <>
            <Button href="/contact" size="lg">
              Start Your Business
            </Button>
            <Button href="#categories" size="lg" variant="secondary">
              Explore Services
            </Button>
          </>
        }
        aside={
          <nav aria-label="Service categories" className="w-full min-w-[18rem] rounded-[1.5rem] border border-ink/10 bg-white/80 p-6 shadow-[0_30px_60px_-40px_rgba(11,21,48,0.4)] backdrop-blur-xl">
            <ul className="flex flex-col">
              {serviceCategories.map((c) => (
                <li key={c.slug} className="border-b border-ink/10 last:border-0">
                  <TransitionLink href={`#${c.slug}`} className="group flex items-baseline gap-4 py-3.5">
                    <span className="text-eyebrow text-accent-strong">{c.number}</span>
                    <span className="flex-1 text-sm text-ink/80 transition-colors group-hover:text-ink">{c.title}</span>
                    <span className="text-xs text-stone">{servicesInCategory(c.slug).length}</span>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      <div id="categories" className="bg-white">
        {serviceCategories.map((category, ci) => {
          const items = servicesInCategory(category.slug)
          return (
            <section key={category.slug} id={category.slug} aria-labelledby={`${category.slug}-title`} className={ci % 2 ? 'bg-tint scroll-mt-24' : 'scroll-mt-24 bg-white'}>
              <div className="container-x py-20 sm:py-28">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                  <div className="flex flex-col gap-6 lg:col-span-8">
                    <Reveal y={12} blur={false}>
                      <Eyebrow index={category.number}>{items.length} services</Eyebrow>
                    </Reveal>
                    <RevealWords id={`${category.slug}-title`} text={category.title} className="text-display-lg text-balance" />
                  </div>
                  <Reveal delay={0.15} as="p" className="text-lede text-stone lg:col-span-4">
                    {category.summary}
                  </Reveal>
                </div>
                <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 xl:grid-cols-3">
                  {items.map((s, i) => (
                    <li key={s.slug}>
                      <ServiceCard service={s} delay={(i % 3) * 0.08} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )
        })}
      </div>

      <Differentiators />
      <StartingPointFinder />
      <CTASection eyebrow="Let's talk" title={["Let's talk."]} body="Tell us where you are — we'll take it from there. No pressure, no obligation." />
    </>
  )
}
