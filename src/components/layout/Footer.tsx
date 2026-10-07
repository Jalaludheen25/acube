import { TransitionLink } from '@/components/transition/TransitionLink'
import { MapPin } from '@/components/ui/Icons'
import { Button, TextLink } from '@/components/ui/MagneticButton'
import { Reveal, RevealWords } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { WhatsAppLogo } from '@/components/ui/WhatsAppLogo'
import { serviceCategories } from '@/content/services'
import { legalNav, mainNav, mapsUrl, primaryCta, site, whatsappUrl } from '@/content/site'

import { BackToTop } from './BackToTop'
import { Logo } from './Logo'

function Column({ title, children, index = 0 }: { title: string; children: React.ReactNode; index?: number }) {
  return (
    <Reveal delay={index * 0.08} className="flex flex-col gap-5">
      <h2 className="text-eyebrow text-mist">{title}</h2>
      {children}
    </Reveal>
  )
}

const linkClass = 'link-underline w-fit text-[0.9375rem] text-bone/80 transition-colors duration-300 hover:text-bone'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-ink)_0%,#0d1a44_100%)] text-bone">
      {/* Blue light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, var(--color-blue-600), transparent)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-[-10%] h-[36rem] w-[36rem] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, var(--color-cyan), transparent)' }}
      />

      <div className="container-x relative pt-24 sm:pt-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col gap-8 lg:col-span-8">
            <Reveal y={12} blur={false}>
              <Eyebrow tone="dark">Ready to begin?</Eyebrow>
            </Reveal>
            <RevealWords as="p" text={site.tagline} className="text-display-lg max-w-4xl text-balance" />
          </div>
          <Reveal delay={0.2} className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Button href={primaryCta.href} size="lg" variant="inverse">
              {primaryCta.label}
            </Button>
            <Button href={whatsappUrl()} target="_blank" variant="inverse-outline" size="lg" brandIcon icon={<WhatsAppLogo size={40} />}>
              WhatsApp
            </Button>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-12 border-t border-white/10 pt-14 sm:grid-cols-2 lg:mt-28 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Column title="Explore">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-1">
                <li>
                  <TransitionLink href="/" className={linkClass}>
                    Home
                  </TransitionLink>
                </li>
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <TransitionLink href={item.href} className={linkClass}>
                      {item.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </Column>
          </div>

          <div className="lg:col-span-3">
            <Column title="Services" index={1}>
              <ul className="flex flex-col gap-3">
                {serviceCategories.map((c) => (
                  <li key={c.slug}>
                    <TransitionLink href={`/services#${c.slug}`} className={linkClass}>
                      {c.title}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </Column>
          </div>

          <div className="lg:col-span-3">
            <Column title="Contact" index={2}>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href={`mailto:${site.email}`} className={linkClass}>
                    {site.email}
                  </a>
                </li>
                {site.phones.map((p) => (
                  <li key={p.tel}>
                    <a href={`tel:${p.tel}`} className={linkClass}>
                      {p.display}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={`${linkClass} group inline-flex items-center gap-2.5`}>
                    <WhatsAppLogo size={20} className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-px group-hover:-rotate-[10deg] group-hover:scale-110" /> WhatsApp
                  </a>
                </li>
              </ul>
            </Column>
          </div>

          <div className="lg:col-span-3">
            <Column title="Visit" index={3}>
              <address className="flex gap-3 text-[0.9375rem] not-italic leading-relaxed text-bone/80">
                <MapPin size={18} className="mt-0.5 shrink-0 text-blue-300" />
                <span>
                  {site.address.shop}, {site.address.building}
                  <br />
                  {site.address.landmark}
                  <br />
                  {site.address.area}, {site.address.city}
                  <br />
                  {site.address.country}
                </span>
              </address>
              <TextLink href={mapsUrl} tone="dark" className="mt-1">
                Open in Google Maps
              </TextLink>
            </Column>
          </div>
        </div>

        {/* Monumental wordmark */}
        <div
          aria-hidden="true"
          className="mt-24 select-none sm:mt-32"
          style={{ maskImage: 'linear-gradient(to bottom, #000 40%, transparent 96%)', WebkitMaskImage: 'linear-gradient(to bottom, #000 40%, transparent 96%)' }}
        >
          <Logo tone="dark" className="w-full opacity-[0.92]" />
        </div>

        <div className="relative flex flex-col gap-5 border-t border-white/10 py-8 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex items-center gap-6">
            {legalNav.map((item) => (
              <TransitionLink key={item.href} href={item.href} className="link-underline hover:text-bone">
                {item.label}
              </TransitionLink>
            ))}
            <span className="hidden h-3 w-px rotate-[20deg] bg-white/20 sm:inline-block" aria-hidden="true" />
            <span className="hidden sm:inline">Designed &amp; Developed by TwoMonk Technologies</span>
          </nav>
          <span className="sm:hidden">Designed &amp; Developed by TwoMonk Technologies</span>
          <BackToTop />
        </div>
      </div>
    </footer>
  )
}
