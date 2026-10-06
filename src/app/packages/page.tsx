import { CompareTable } from '@/components/packages/CompareTable'
import { PackageCards } from '@/components/packages/PackageCards'
import { CTASection } from '@/components/sections/CTASection'
import { PageHero } from '@/components/sections/PageHero'
import { StructureCard } from '@/components/services/StructureCard'
import { ExpandBackground } from '@/components/ui/ExpandBackground'
import { Button } from '@/components/ui/MagneticButton'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { Eyebrow, SectionHeading } from '@/components/ui/SectionHeading'
import { structures } from '@/content/company'
import { images } from '@/content/images'
import { packagesIntro } from '@/content/packages'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Business Setup Packages',
  description:
    'Starter, Professional and Enterprise business setup packages in Dubai — from your first trade licence to a full corporate partnership, tailored on a free consultation.',
  path: '/packages',
})

export default function PackagesPage() {
  return (
    <>
      <PageHero
        variant="split"
        image={images.marinaDay}
        eyebrow="Packages"
        title={['Business setup', 'packages.']}
        accent={[1]}
        lede={packagesIntro.lede}
        actions={
          <>
            <Button href="#packages" size="lg">
              Compare packages
            </Button>
            <Button href="/contact" size="lg" variant="secondary">
              Book Free Consultation
            </Button>
          </>
        }
      />

      <section id="packages" aria-labelledby="packages-title" className="relative isolate scroll-mt-24">
        <ExpandBackground className="bg-tint" />
        <div className="container-x py-24 sm:py-32">
          <SectionHeading id="packages-title" eyebrow="Packages" index="01" title={['Three ways', 'to start.']} accent={[1]} lede={packagesIntro.lede} />
          <div className="mt-16 lg:mt-24">
            <PackageCards />
          </div>
        </div>
      </section>

      <section aria-labelledby="compare-title" className="bg-white text-ink">
        <div className="container-x py-24 sm:py-32 lg:py-40">
          <div className="flex flex-col gap-7">
            <Reveal y={12} blur={false}>
              <Eyebrow tone="light">Compare</Eyebrow>
            </Reveal>
            <RevealLines id="compare-title" lines={['Every package,', 'side by side.']} accent={[1]} accentClassName="font-accent w-fit text-gradient" className="text-display-lg" />
          </div>
          <CompareTable />
        </div>
      </section>

      <section aria-labelledby="structures-title" className="relative isolate text-white">
        <ExpandBackground className="bg-ocean" />
        <div className="container-x py-24 sm:py-32 lg:py-40">
          <SectionHeading
            id="structures-title"
            tone="dark"
            eyebrow="Business Structures"
            title="Find the structure that fits your business."
            lede="There are a few ways to establish a business in the UAE."
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:mt-20 lg:gap-5">
            {structures.map((s, i) => (
              <li key={s.slug} className="sm:last:col-span-2 lg:last:col-span-1">
                <StructureCard structure={s} index={i} short />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        eyebrow="Let's talk"
        title={["Let's talk."]}
        body="Tell us where you are, and we'll recommend the right package — no pressure, no obligation."
      />
    </>
  )
}
