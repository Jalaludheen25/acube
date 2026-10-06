import { CTASection } from '@/components/sections/CTASection'
import { PageHero } from '@/components/sections/PageHero'
import { PrinciplesGrid } from '@/components/sections/PrinciplesGrid'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { VisitUs } from '@/components/sections/VisitUs'
import { ExpandBackground } from '@/components/ui/ExpandBackground'
import { Counter } from '@/components/ui/Counter'
import { ImageReveal } from '@/components/ui/ImageReveal'
import { Button } from '@/components/ui/MagneticButton'
import { Reveal, RevealLines, RevealWords } from '@/components/ui/Reveal'
import { Eyebrow, SectionHeading } from '@/components/ui/SectionHeading'
import { howWeWork, mission, principles, story, values, vision } from '@/content/company'
import { images } from '@/content/images'
import { primaryCta, site } from '@/content/site'
import { pageMetadata } from '@/lib/seo'
import { pad2 } from '@/lib/utils'

export const metadata = pageMetadata({
  title: 'About Us',
  description:
    'ACUBE Documents Services is a business setup partner in Bur Dubai with 20+ years of experience — helping businesses establish themselves confidently across the UAE.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={['About ACUBE.']}
        titleClassName="!text-display-2xl"
        lede="Premium Business Setup Partner in Dubai."
        aside={
          <div className="flex items-end gap-4">
            <Counter value={site.yearsOfExperience} suffix="+" className="font-display text-[5rem] font-light leading-[0.85] tracking-[-0.04em] text-gradient" />
            <span className="text-eyebrow max-w-[7rem] pb-1 text-stone">Years of experience</span>
          </div>
        }
      />

      <section aria-label="Dubai Creek" className="bg-[linear-gradient(180deg,#f4f7fd_0%,#ffffff_100%)] pb-6">
        <div className="container-x">
          <ImageReveal image={images.creekDhowDay} priority immediate delay={0.4} sizes="100vw" className="aspect-[4/3] rounded-[1.75rem] sm:aspect-[21/9]" parallax={0.14} grow />
        </div>
      </section>

      {/* Mission & vision */}
      <section aria-label="Mission and vision" className="bg-white text-ink">
        <div className="container-x grid gap-16 py-24 sm:py-32 lg:grid-cols-2 lg:gap-20 lg:py-40">
          {[
            { label: 'Mission', ...mission },
            { label: 'Vision', ...vision },
          ].map((block, i) => (
            <div key={block.label} className="flex flex-col gap-7 border-t border-ink/15 pt-8">
              <Reveal y={12} blur={false}>
                <Eyebrow tone="light" index={pad2(i + 1)}>
                  {block.label}
                </Eyebrow>
              </Reveal>
              <RevealWords text={block.title} className="text-display-md text-balance" />
              <Reveal delay={0.15} as="p" className="text-lede max-w-lg text-stone">
                {block.body}
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section aria-labelledby="story-title" className="bg-tint">
        <div className="container-x grid gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-40">
          <div className="lg:col-span-6">
            <ImageReveal image={images.creekAbra} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] rounded-[1.75rem]" parallax={0.1} />
          </div>
          <div className="flex flex-col gap-7 lg:col-span-5 lg:col-start-8">
            <Reveal y={12} blur={false}>
              <Eyebrow>Our story</Eyebrow>
            </Reveal>
            <RevealLines id="story-title" lines={['Built to make', 'UAE setup simple.']} accent={[1]} className="text-display-lg" />
            {story.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.12 + i * 0.08} as="p" className="text-lede text-stone">
                {p}
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <Button href={primaryCta.href}>{primaryCta.label}</Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="relative isolate text-white">
        <ExpandBackground className="bg-ocean" />
        <div className="container-x py-24 sm:py-32 lg:py-40">
          <SectionHeading id="values-title" tone="dark" eyebrow="Values" title={['What we', 'stand for.']} accent={[1]} />
          <ol className="mt-14 border-t border-white/15 lg:mt-20">
            {values.map((v, i) => (
              <Reveal key={v.title} as="li" delay={i * 0.06} className="group grid gap-4 border-b border-white/15 py-8 sm:grid-cols-12 sm:items-baseline sm:gap-8 sm:py-10">
                <span className="text-eyebrow text-blue-100 sm:col-span-2">Value {pad2(i + 1)}</span>
                <h3 className="font-display text-[clamp(1.75rem,3.4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.04em] transition-transform duration-700 ease-out-expo group-hover:translate-x-2 sm:col-span-6">
                  {v.title}
                </h3>
                <p className="max-w-sm text-[0.9375rem] leading-relaxed text-blue-100 sm:col-span-4">{v.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <ProcessTimeline id="how-we-work-title" surface="white" eyebrow="How we work" title={['From first question', 'to fully operational.']} steps={howWeWork} />

      {/* Principles */}
      <section aria-labelledby="guides-title" className="bg-tint text-ink">
        <div className="container-x py-24 sm:py-32 lg:py-40">
          <SectionHeading id="guides-title" tone="light" eyebrow="What guides us" title="A few principles guide everything we do." />
          <div className="mt-14 lg:mt-20">
            <PrinciplesGrid items={principles} />
          </div>
        </div>
      </section>

      <VisitUs />
      <CTASection eyebrow="Let's talk" title={["Let's talk."]} />
    </>
  )
}
