import { notFound } from 'next/navigation'

import { CTASection } from '@/components/sections/CTASection'
import { PageHero } from '@/components/sections/PageHero'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { JsonLd } from '@/components/seo/JsonLd'
import { ServiceCard } from '@/components/services/ServiceCard'
import { ExpandBackground } from '@/components/ui/ExpandBackground'
import { Check } from '@/components/ui/Icons'
import { Button } from '@/components/ui/MagneticButton'
import { Reveal, RevealWords } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { WhatsAppLogo } from '@/components/ui/WhatsAppLogo'
import { journey } from '@/content/company'
import { images } from '@/content/images'
import { getCategory, getService, services, servicesInCategory } from '@/content/services'
import { whatsappUrl } from '@/content/site'
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from '@/lib/seo'
import { pad2 } from '@/lib/utils'

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(props: PageProps<'/services/[slug]'>) {
  const { slug } = await props.params
  const service = getService(slug)
  if (!service) return {}
  const category = getCategory(service.category)
  const extra = service.includes.length ? ` Includes ${service.includes.slice(0, 3).join(', ').toLowerCase()} and more.` : ''
  return pageMetadata({
    title: `${service.title} in Dubai`,
    description: `${service.description}${extra} ${category?.title ?? ''} by ACUBE, Bur Dubai.`.replace(/\s+/g, ' ').trim(),
    path: `/services/${service.slug}`,
  })
}

export default async function ServicePage(props: PageProps<'/services/[slug]'>) {
  const { slug } = await props.params
  const service = getService(slug)
  if (!service) notFound()
  const category = getCategory(service.category)!
  const related = servicesInCategory(category.slug).filter((s) => s.slug !== service.slug)
  const path = `/services/${service.slug}`

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path },
        ])}
      />
      <JsonLd data={serviceJsonLd({ title: service.title, description: service.description, path, category: category.title })} />

      <PageHero
        variant="split"
        image={images[service.image]}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: service.title }]}
        eyebrow={category.title}
        title={service.title}
        lede={
          <div className="flex flex-col gap-5">
            <p>{service.description}</p>
            {service.idealFor && (
              <p className="text-eyebrow flex items-center gap-3 text-accent-strong">
                <span className="text-stone">Ideal for</span> {service.idealFor}
              </p>
            )}
          </div>
        }
        actions={
          <>
            <Button href={`/contact?service=${service.slug}#enquiry`} size="lg">
              Book Free Consultation
            </Button>
            <Button href={whatsappUrl(`Hello ACUBE, I'd like to ask about ${service.title}.`)} target="_blank" size="lg" variant="secondary" brandIcon icon={<WhatsAppLogo size={40} />}>
              Ask on WhatsApp
            </Button>
          </>
        }
      />

      {service.includes.length > 0 && (
        <section aria-labelledby="includes-title" className="relative isolate text-white">
          <ExpandBackground className="bg-ocean" />
          <div className="container-x py-24 sm:py-32 lg:py-40">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="flex flex-col gap-6 lg:col-span-7">
                <Reveal y={12} blur={false}>
                  <Eyebrow tone="dark" index={pad2(service.includes.length)}>
                    Inclusions
                  </Eyebrow>
                </Reveal>
                <RevealWords id="includes-title" text="What this includes." className="text-display-lg" />
              </div>
              <Reveal delay={0.15} as="p" className="text-lede text-blue-100 lg:col-span-4 lg:col-start-9">
                Every engagement is scoped on your free consultation — to your activity, jurisdiction and requirements.
              </Reveal>
            </div>
            <ol className="mt-14 grid border-t border-white/15 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
              {service.includes.map((item, i) => (
                <Reveal
                  key={item}
                  as="li"
                  delay={(i % 3) * 0.06}
                  className="group flex items-start gap-5 border-b border-white/15 py-6 sm:pr-8"
                >
                  <span className="text-eyebrow pt-1.5 text-blue-100">{pad2(i + 1)}</span>
                  <span className="flex flex-1 items-start justify-between gap-4">
                    <span className="font-display text-[1.2rem] font-medium leading-snug tracking-[-0.02em]">{item}</span>
                    <Check size={18} className="mt-1.5 shrink-0 text-cyan opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      <ProcessTimeline
        id="how-title"
        surface={service.includes.length > 0 ? 'white' : 'tint'}
        eyebrow="How it works"
        title={['One guided path,', 'start to finish.']}
        lede="We handle each step so you don't have to."
        steps={journey}
      />

      {related.length > 0 && (
        <section aria-labelledby="related-title" className={service.includes.length > 0 ? 'bg-tint' : 'bg-white'}>
          <div className="container-x py-24 sm:py-32">
            <div className="flex flex-col gap-6">
              <Reveal y={12} blur={false}>
                <Eyebrow index={category.number}>{category.title}</Eyebrow>
              </Reveal>
              <RevealWords id="related-title" text={`More in ${category.shortTitle}`} className="text-display-md" />
            </div>
            <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {related.slice(0, 3).map((s, i) => (
                <li key={s.slug}>
                  <ServiceCard service={s} delay={i * 0.08} />
                </li>
              ))}
            </ul>
            {related.length > 3 && (
              <Reveal className="mt-10">
                <Button href={`/services#${category.slug}`} variant="secondary">
                  All {category.shortTitle} services
                </Button>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <CTASection eyebrow="Let's talk" title={["Let's talk."]} ctaHref={`/contact?service=${service.slug}#enquiry`} />
    </>
  )
}
