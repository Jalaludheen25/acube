import { FaqAccordion } from '@/components/faq/FaqAccordion'
import { CTASection } from '@/components/sections/CTASection'
import { PageHero } from '@/components/sections/PageHero'
import { JsonLd } from '@/components/seo/JsonLd'
import { faqs } from '@/content/faqs'
import { faqJsonLd, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'FAQ',
  description:
    'Answers on UAE business setup with ACUBE — structures, costs, timelines, documentation, visas and Emirates ID, and where we are based in Bur Dubai.',
  path: '/faq',
})

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero eyebrow="FAQ" title={['Questions,', 'answered.']} accent={[1]} lede="Clear answers on setup, licensing, and documentation." />
      <section aria-label="Frequently asked questions" className="bg-tint pt-16 sm:pt-20">
        <div className="container-x pb-24 sm:pb-32 lg:pb-40">
          <div className="lg:ml-[16.666%]">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>
      <CTASection eyebrow="Still have questions?" title={["Let's talk."]} />
    </>
  )
}
