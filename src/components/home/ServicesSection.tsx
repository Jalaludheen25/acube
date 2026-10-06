import { InteractiveServices } from '@/components/services/InteractiveServices'
import { Button } from '@/components/ui/MagneticButton'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { featuredServiceSlugs, getService, services, type Service } from '@/content/services'

export function ServicesSection() {
  const featured = featuredServiceSlugs.map((slug) => getService(slug)).filter((s): s is Service => Boolean(s))

  return (
    <section aria-labelledby="services-title" className="relative bg-tint">
      <div className="container-x py-24 sm:py-32 lg:py-40">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          index="02"
          title="Everything you need to establish and run your business."
          lede="From company formation to everyday documentation — explore how ACUBE can help."
          aside={
            <Button href="/services" variant="secondary">
              All {services.length} services
            </Button>
          }
        />
        <Reveal className="mt-16 lg:mt-24" blur={false}>
          <InteractiveServices items={featured} />
        </Reveal>
      </div>
    </section>
  )
}
