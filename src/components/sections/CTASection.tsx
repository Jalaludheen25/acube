'use client'

import { motion, useScroll, useTransform, type MotionStyle } from 'motion/react'
import { useRef, type CSSProperties, type PointerEvent } from 'react'

import { Check } from '@/components/ui/Icons'
import { Button } from '@/components/ui/MagneticButton'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { WhatsAppLogo } from '@/components/ui/WhatsAppLogo'
import { ctaCopy } from '@/content/company'
import { primaryCta, whatsappUrl } from '@/content/site'
import { usePrefersReducedMotion } from '@/lib/hooks'

const FACES = ['rotateY(0deg)', 'rotateY(90deg)', 'rotateY(180deg)', 'rotateY(-90deg)', 'rotateX(90deg)', 'rotateX(-90deg)']

/** Pure-CSS 3D wireframe cube. */
function WireCube({ size, duration, reverse = false, opacity }: { size: number; duration: number; reverse?: boolean; opacity: number }) {
  return (
    <div className="absolute left-1/2 top-1/2 [perspective:1800px]" style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}>
      <div
        className="relative h-full w-full [transform-style:preserve-3d] motion-reduce:!animate-none"
        style={{ animation: `${reverse ? 'cube-spin-reverse' : 'cube-spin'} ${duration}s linear infinite` }}
      >
        {FACES.map((f) => (
          <div
            key={f}
            className="absolute inset-0 border border-white"
            style={{ transform: `${f} translateZ(${size / 2}px)`, opacity, background: 'linear-gradient(135deg, rgba(58,107,255,0.05), transparent 60%)' }}
          />
        ))}
      </div>
    </div>
  )
}

type Props = {
  eyebrow?: string
  title?: string[]
  body?: string
  points?: string[]
  ctaLabel?: string
  ctaHref?: string
}

export function CTASection({
  eyebrow = 'Free Consultation',
  title = ['Ready to build your', 'business in the UAE?'],
  body = ctaCopy.body,
  points = ctaCopy.points,
  ctaLabel = primaryCta.label,
  ctaHref = primaryCta.href,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.4'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <section aria-labelledby="cta-title" className="relative bg-paper py-6 sm:py-10">
      <div className="container-x">
        <motion.div
          ref={ref}
          onPointerMove={onMove}
          className="bg-ocean relative isolate overflow-hidden rounded-[2rem] border border-white/10 px-6 py-24 text-white shadow-[0_50px_120px_-50px_rgba(13,29,94,0.8)] sm:rounded-[2.75rem] sm:px-12 sm:py-32 lg:py-40"
          style={{ '--mx': '70%', '--my': '40%', scale: reduced ? 1 : scale, y: reduced ? 0 : y } as CSSProperties & MotionStyle}
        >
          {/* Moving light */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 transition-[background] duration-300"
            style={{
              background:
                'radial-gradient(34rem circle at var(--mx) var(--my), rgba(126,223,255,0.2), transparent 60%), radial-gradient(40rem circle at 100% 0%, rgba(34,195,255,0.18), transparent 60%)',
            }}
          />
          {/* Geometry */}
          <div aria-hidden="true" className="absolute inset-y-0 right-[-20%] -z-10 hidden w-[70%] md:block lg:right-[-8%] lg:w-[55%]">
            <WireCube size={420} duration={60} opacity={0.22} />
            <WireCube size={260} duration={42} reverse opacity={0.3} />
            <WireCube size={120} duration={30} opacity={0.5} />
          </div>

          <div className="relative flex max-w-3xl flex-col gap-8">
            <Reveal y={12} blur={false}>
              <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            </Reveal>
            <RevealLines
              id="cta-title"
              lines={title}
              accent={[title.length - 1]}
              accentClassName="font-accent w-fit text-gradient-ice"
              className="text-display-xl text-balance"
            />
            <Reveal delay={0.15} as="p" className="text-lede max-w-xl text-blue-100">
              {body}
            </Reveal>
            <Reveal delay={0.2} as="ul" className="flex flex-wrap gap-x-7 gap-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm text-white">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-accent">
                    <Check size={12} strokeWidth={2} />
                  </span>
                  {p}
                </li>
              ))}
            </Reveal>
            <Reveal delay={0.3} className="mt-2 flex flex-wrap gap-3">
              <Button href={ctaHref} size="lg" variant="inverse">
                {ctaLabel}
              </Button>
              <Button href={whatsappUrl()} target="_blank" variant="inverse-outline" size="lg" brandIcon icon={<WhatsAppLogo size={40} />}>
                Chat on WhatsApp
              </Button>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
