import { CTASection } from '@/components/sections/CTASection'
import { PageHero } from '@/components/sections/PageHero'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { ExpandBackground } from '@/components/ui/ExpandBackground'
import { Counter } from '@/components/ui/Counter'
import { Check, principleIcons } from '@/components/ui/Icons'
import { Button } from '@/components/ui/MagneticButton'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { expectations, handledForYou, howWeWorkQualities, principles } from '@/content/company'
import { images } from '@/content/images'
import { primaryCta, site } from '@/content/site'
import { pageMetadata } from '@/lib/seo'
import { pad2 } from '@/lib/utils'

export const metadata = pageMetadata({
  title: 'Why ACUBE',
  description:
    'End-to-end support, personal guidance, local & government knowledge, transparency and a long-term partnership — the principles behind every ACUBE business setup.',
  path: '/why-acube',
})

export default function WhyAcubePage() {
  return (
    <>
      <PageHero
        variant="split"
        image={images.burjSkyDay}
        eyebrow="Why ACUBE"
        title={['Your business deserves', 'the right foundation.']}
        accent={[1]}
        lede="A few principles guide everything we do."
        actions={
          <Button href={primaryCta.href} size="lg">
            {primaryCta.label}
          </Button>
        }
      />

      {/* Principles — editorial rows */}
      <section aria-labelledby="principles-title" className="relative isolate text-ink">
        <ExpandBackground className="bg-tint" />
        <div className="container-x py-24 sm:py-32 lg:py-40">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="flex flex-col gap-7 lg:col-span-8">
              <Reveal y={12} blur={false}>
                <Eyebrow tone="light">Principles</Eyebrow>
              </Reveal>
              <RevealLines id="principles-title" lines={['Five principles,', 'every engagement.']} accent={[1]} accentClassName="font-accent w-fit text-gradient" className="text-display-lg" />
            </div>
            <Reveal delay={0.15} className="flex items-end gap-4 lg:col-span-4 lg:justify-self-end">
              <Counter value={site.yearsOfExperience} suffix="+" className="font-display text-[4.75rem] font-light leading-[0.85] tracking-[-0.04em] text-gradient" />
              <span className="text-eyebrow max-w-[7rem] pb-1 text-stone">Years of experience</span>
            </Reveal>
          </div>

          <ol className="mt-16 border-t border-ink/15 lg:mt-24">
            {principles.map((p, i) => {
              const Icon = principleIcons[i]
              return (
                <Reveal
                  key={p.title}
                  as="li"
                  delay={i * 0.05}
                  className="group relative isolate grid grid-cols-[auto_1fr] gap-x-6 gap-y-4 overflow-hidden border-b border-ink/15 py-9 sm:grid-cols-12 sm:items-center sm:gap-8 lg:py-12"
                >
                  <span aria-hidden="true" className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[linear-gradient(100deg,var(--color-blue-700),var(--color-blue-600)_55%,var(--color-blue-500))] transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
                  <span className="text-eyebrow pt-2 text-accent-strong transition-colors duration-500 group-hover:text-blue-100 sm:col-span-1 sm:pt-0 sm:pl-2">{pad2(i + 1)}</span>
                  <h3 className="font-display text-[clamp(1.6rem,3vw,2.9rem)] font-medium leading-[1.05] tracking-[-0.04em] transition-[color,transform] duration-700 ease-out-expo group-hover:translate-x-2 group-hover:text-white sm:col-span-6">
                    {p.title}
                  </h3>
                  <p className="col-start-2 max-w-md text-[0.9375rem] leading-relaxed text-stone transition-colors duration-500 group-hover:text-blue-100 sm:col-span-4 sm:col-start-auto">
                    {p.description}
                  </p>
                  <span className="hidden justify-self-end pr-2 transition-[color,transform] duration-700 ease-out-expo text-accent group-hover:rotate-12 group-hover:text-white sm:col-span-1 sm:block">
                    <Icon size={28} />
                  </span>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      <ProcessTimeline id="expect-title" surface="white" eyebrow="What to expect" title={['How working', 'with us goes.']} steps={expectations} />

      {/* What we handle */}
      <section aria-labelledby="handle-title" className="relative isolate text-white">
        <ExpandBackground className="bg-ocean" />
        <div className="container-x grid gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:gap-12 lg:py-40">
          <div className="flex flex-col gap-7 lg:col-span-5">
            <Reveal y={12} blur={false}>
              <Eyebrow tone="dark">What we handle for you</Eyebrow>
            </Reveal>
            <RevealLines id="handle-title" lines={['You focus on the business.', 'We handle the rest.']} accent={[1]} accentClassName="font-accent w-fit text-gradient-ice" className="text-display-lg text-balance" />
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            <Reveal as="ul" className="flex flex-col border-t border-white/15">
              {handledForYou.map((item) => (
                <li key={item} className="flex items-center gap-4 border-b border-white/15 py-4 text-[0.9375rem]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-accent">
                    <Check size={12} strokeWidth={2} />
                  </span>
                  {item}
                </li>
              ))}
            </Reveal>
            <Reveal as="ul" delay={0.12} className="flex flex-col border-t border-white/15">
              {howWeWorkQualities.map((item) => (
                <li key={item} className="border-b border-white/15 py-4 font-accent text-2xl text-blue-100">
                  {item}
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection eyebrow="Let's talk" title={["Let's talk."]} />
    </>
  )
}
