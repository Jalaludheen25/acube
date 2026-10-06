import type { ReactNode } from 'react'

import { ContactForm } from '@/components/contact/ContactForm'
import { PageHero } from '@/components/sections/PageHero'
import { VisitUs } from '@/components/sections/VisitUs'
import { Mail, MapPin, Phone, WhatsApp } from '@/components/ui/Icons'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { images } from '@/content/images'
import { site, whatsappUrl } from '@/content/site'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Contact',
  description: `Book a free business setup consultation with ACUBE in Bur Dubai. Email ${site.email}, call ${site.phones[0].display} or message us on WhatsApp.`,
  path: '/contact',
})

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-ink/10 py-6">
      <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/12 bg-white text-accent-strong">{icon}</span>
      <div className="flex flex-col gap-1.5">
        <span className="text-eyebrow text-stone">{label}</span>
        <div className="flex flex-col gap-1 text-[0.9375rem] text-ink">{children}</div>
      </div>
    </div>
  )
}

const linkClass = 'link-underline w-fit transition-colors hover:text-accent-strong'

export default function ContactPage() {
  return (
    <>
      <PageHero
        variant="split"
        image={images.abraStationDay}
        eyebrow="Contact"
        title={["Let's build", 'your business.']}
        accent={[1]}
        lede="Tell us where you are, and we'll take it from there — no pressure, no obligation."
      />

      <section id="enquiry" aria-labelledby="enquiry-title" className="bg-tint scroll-mt-20">
        <div className="container-x grid gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-7 lg:col-span-5">
            <Reveal y={12} blur={false}>
              <Eyebrow>Start the conversation</Eyebrow>
            </Reveal>
            <RevealLines id="enquiry-title" lines={['Every business', 'begins with hello.']} accent={[1]} className="text-display-lg" />
            <Reveal delay={0.15} as="p" className="text-lede text-stone">
              Reach us directly, or send a message — we reply personally.
            </Reveal>

            <Reveal delay={0.2} className="mt-4 border-t border-ink/10">
              <Detail icon={<Mail size={18} />} label="Email">
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
              </Detail>
              <Detail icon={<Phone size={18} />} label="Phone">
                {site.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className={linkClass}>
                    {p.display}
                  </a>
                ))}
              </Detail>
              <Detail icon={<WhatsApp size={18} />} label="WhatsApp">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {site.whatsapp.display}
                </a>
              </Detail>
              <Detail icon={<MapPin size={18} />} label="Office">
                <address className="not-italic leading-relaxed">{site.address.formatted}</address>
              </Detail>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <VisitUs />
    </>
  )
}
