import type { Metadata } from 'next'

import { Button } from '@/components/ui/MagneticButton'
import { RevealLines } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden bg-sky pb-20 pt-36">
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-16 right-0 select-none font-display text-[42vw] leading-none text-ink/[0.04]">
        404
      </span>
      <div className="container-x relative flex flex-col gap-8">
        <Eyebrow>Error 404</Eyebrow>
        <RevealLines as="h1" immediate lines={['This page', "doesn't exist."]} accent={[1]} className="text-display-xl" />
        <p className="text-lede max-w-lg text-stone">The page you were looking for may have moved. Let&apos;s get you back on track.</p>
        <div className="flex flex-wrap gap-3">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button href="/services" size="lg" variant="secondary">
            Explore services
          </Button>
        </div>
      </div>
    </section>
  )
}
