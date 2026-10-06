import { Counter } from '@/components/ui/Counter'
import { ImageReveal } from '@/components/ui/ImageReveal'
import { TextLink } from '@/components/ui/MagneticButton'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { trust } from '@/content/company'
import { images } from '@/content/images'
import { site } from '@/content/site'

export function Trust() {
  return (
    <section aria-labelledby="trust-title" className="relative overflow-hidden bg-white text-ink">
      <div className="container-x grid gap-16 py-24 sm:py-32 lg:grid-cols-12 lg:gap-12 lg:py-44">
        <div className="relative lg:col-span-5">
          <ImageReveal image={images.alFahidiAlley} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] rounded-[1.75rem] lg:aspect-[3/4]" parallax={0.12} />
          <ImageReveal
            image={images.windTower}
            sizes="(min-width: 1024px) 18vw, 45vw"
            from="left"
            delay={0.3}
            className="absolute -bottom-10 -right-4 hidden aspect-[3/4] w-[38%] rounded-2xl border-[6px] border-paper shadow-2xl sm:block lg:-right-16"
            parallax={0}
          />
        </div>

        <div className="flex flex-col justify-center gap-8 lg:col-span-6 lg:col-start-7">
          <Reveal y={12} blur={false}>
            <Eyebrow tone="light" index="07">
              {trust.eyebrow}
            </Eyebrow>
          </Reveal>
          <RevealLines id="trust-title" lines={['Built on guidance.', 'Made to last.']} accent={[1]} accentClassName="font-accent w-fit text-gradient" className="text-display-xl" />
          <Reveal delay={0.15} as="p" className="text-lede max-w-xl text-pretty text-stone">
            {trust.body}
          </Reveal>
          <Reveal delay={0.2} as="p" className="font-accent text-2xl text-ink">
            {trust.signature}
          </Reveal>

          <Reveal delay={0.25} className="mt-4 flex flex-wrap items-end gap-x-12 gap-y-8 border-t border-ink/15 pt-8">
            <div className="flex items-end gap-4">
              <Counter value={site.yearsOfExperience} suffix="+" className="font-display text-[4.75rem] font-light leading-[0.85] tracking-[-0.04em] text-gradient" />
              <span className="text-eyebrow max-w-[7rem] pb-1 text-stone">Years of experience</span>
            </div>
            <TextLink href="/about" tone="light" className="pb-1">
              About ACUBE
            </TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
