import { Hero } from '@/components/home/Hero'
import { IndustriesShowcase } from '@/components/home/IndustriesShowcase'
import { Intro } from '@/components/home/Intro'
import { ServicesSection } from '@/components/home/ServicesSection'
import { Testimonials } from '@/components/home/Testimonials'
import { Trust } from '@/components/home/Trust'
import { UAEGateway } from '@/components/home/UAEGateway'
import { WhyAcube } from '@/components/home/WhyAcube'
import { CTASection } from '@/components/sections/CTASection'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { Button } from '@/components/ui/MagneticButton'
import { journey } from '@/content/company'
import { primaryCta } from '@/content/site'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ path: '/' })

export default function HomePage() {
  return (
    <>
      {/* The hero stays pinned on desktop while the introduction slides over it. */}
      <div className="relative">
        <Hero />
        <Intro />
      </div>
      <ServicesSection />
      <WhyAcube />
      <UAEGateway />
      <ProcessTimeline
        id="journey-title"
        eyebrow="The Journey"
        index="05"
        title={['From your first message', 'to your first day in business.']}
        lede="One guided path — we handle each step so you don't have to."
        steps={journey}
        surface="tint"
        footer={
          <div className="flex flex-col items-start gap-6 border-t border-ink/15 pt-7">
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-stone">
              One guided path. We handle the process, so you can focus on your business.
            </p>
            <Button href={primaryCta.href} variant="primary">
              {primaryCta.label}
            </Button>
          </div>
        }
      />
      <IndustriesShowcase />
      <Trust />
      <Testimonials />
      <CTASection />
    </>
  )
}
