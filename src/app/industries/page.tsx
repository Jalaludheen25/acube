import { IndustriesExplorer } from '@/components/industries/IndustriesExplorer'
import { CTASection } from '@/components/sections/CTASection'
import { PageHero } from '@/components/sections/PageHero'
import { Counter } from '@/components/ui/Counter'
import { Marquee } from '@/components/ui/Marquee'
import { Reveal } from '@/components/ui/Reveal'
import { industries, industriesIntro } from '@/content/industries'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Industries We Serve',
  description:
    "ACUBE helps businesses establish themselves across the UAE's key sectors — trading, real estate, construction, hospitality, retail, professional services, technology, healthcare, manufacturing, import & export, education and media.",
  path: '/industries',
})

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow={industriesIntro.eyebrow}
        title={industriesIntro.title}
        aside={
          <div className="flex items-end gap-4">
            <Counter value={industries.length} className="font-display text-[5rem] font-light leading-[0.85] tracking-[-0.04em] text-gradient" />
            <span className="text-eyebrow max-w-[6rem] pb-1 text-stone">Key sectors</span>
          </div>
        }
      />

      <div className="bg-ocean py-6">
        <Marquee
          duration={60}
          items={industries.map((i) => (
            <span key={i.name} className="text-eyebrow text-blue-100">
              {i.licence}
            </span>
          ))}
          separator={<span aria-hidden="true" className="mx-6 text-cyan">✦</span>}
        />
      </div>

      <section aria-label="Sectors" className="bg-tint">
        <div className="container-x py-20 sm:py-28 lg:py-36">
          <IndustriesExplorer />
          <Reveal className="mt-14 max-w-xl text-lede text-stone">{industriesIntro.footnote}</Reveal>
        </div>
      </section>

      <CTASection eyebrow="Let's talk" title={["Let's talk."]} />
    </>
  )
}
