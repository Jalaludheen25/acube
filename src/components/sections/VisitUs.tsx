import { MapPin } from '@/components/ui/Icons'
import { Button } from '@/components/ui/MagneticButton'
import { Reveal, RevealWords } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { WhatsAppLogo } from '@/components/ui/WhatsAppLogo'
import { mapsUrl, site, whatsappUrl } from '@/content/site'

/** Stylised map of the creek-side neighbourhood — decorative, not geographic. */
function AbstractMap() {
  return (
    <svg viewBox="0 0 600 420" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="vu-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" fill="none" stroke="rgba(11,21,48,0.06)" strokeWidth="1" />
        </pattern>
        <radialGradient id="vu-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3a6bff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#3a6bff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="420" fill="url(#vu-grid)" />
      {/* Creek */}
      <path d="M-20 120 C 120 140, 180 210, 300 220 S 470 300, 640 290" fill="none" stroke="#93b7ff" strokeWidth="26" strokeLinecap="round" />
      <path d="M-20 120 C 120 140, 180 210, 300 220 S 470 300, 640 290" fill="none" stroke="#dce8ff" strokeWidth="22" strokeLinecap="round" />
      {/* Streets */}
      <g stroke="rgba(11,21,48,0.14)" strokeWidth="1.5" fill="none">
        <path d="M60 420 L200 250 L330 90 L400 -10" />
        <path d="M0 330 L250 300 L600 360" />
        <path d="M130 0 L260 170" />
        <path d="M420 420 L380 260" />
      </g>
      <circle cx="270" cy="285" r="90" fill="url(#vu-glow)" />
      <circle
        cx="270"
        cy="285"
        r="12"
        fill="none"
        stroke="#2350f0"
        strokeWidth="1.5"
        className="origin-center animate-[pulse-ring_2.4s_ease-out_infinite] [transform-box:fill-box] motion-reduce:animate-none"
      />
      <circle cx="270" cy="285" r="7" fill="#2350f0" />
      <text x="292" y="290" fill="#0b1530" fontSize="13" fontFamily="var(--font-geist-mono), monospace" letterSpacing="2">
        BUR DUBAI
      </text>
      <text x="40" y="112" fill="rgba(28,63,208,0.7)" fontSize="11" fontFamily="var(--font-geist-mono), monospace" letterSpacing="2">
        DUBAI CREEK
      </text>
    </svg>
  )
}

export function VisitUs() {
  return (
    <section aria-labelledby="visit-title" className="bg-white">
      <div className="container-x grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-7 lg:col-span-5">
          <Reveal y={12} blur={false}>
            <Eyebrow>Visit us</Eyebrow>
          </Reveal>
          <RevealWords id="visit-title" text="Find us in Bur Dubai." className="text-display-lg" />
          <Reveal delay={0.15}>
            <address className="flex gap-4 not-italic text-lede text-ink/80">
              <MapPin size={22} className="mt-1 shrink-0 text-accent-strong" />
              <span>
                {site.address.shop}, {site.address.building}
                <br />
                {site.address.landmark}
                <br />
                {site.address.area}, {site.address.city}, {site.address.country}
              </span>
            </address>
          </Reveal>
          <Reveal delay={0.25} className="flex flex-wrap gap-3">
            <Button href={mapsUrl} target="_blank" variant="secondary">
              Open in Google Maps
            </Button>
            <Button href={whatsappUrl()} target="_blank" variant="secondary" brandIcon icon={<WhatsAppLogo size={36} />}>
              WhatsApp
            </Button>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="relative aspect-[10/7] overflow-hidden rounded-[1.75rem] border border-blue-100 bg-[linear-gradient(160deg,#f3f7ff,#e3edff)] lg:col-span-7">
          <AbstractMap />
        </Reveal>
      </div>
    </section>
  )
}
