'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import Image from 'next/image'
import { useRef, useState, type PointerEvent } from 'react'

import { Button } from '@/components/ui/MagneticButton'
import { Marquee } from '@/components/ui/Marquee'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { images } from '@/content/images'
import { industries, industriesIntro } from '@/content/industries'
import { cn, pad2 } from '@/lib/utils'

export function IndustriesShowcase() {
  const areaRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 })

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !areaRef.current) return
    const r = areaRef.current.getBoundingClientRect()
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  return (
    <section aria-labelledby="industries-title" className="bg-ocean relative isolate overflow-hidden text-white">
      <div className="border-y border-white/15 py-6">
        <Marquee
          duration={55}
          items={industries.map((i) => (
            <span key={i.name} className="font-accent text-3xl text-white/75 sm:text-4xl">
              {i.name}
            </span>
          ))}
          separator={<span aria-hidden="true" className="mx-8 text-cyan">✦</span>}
        />
      </div>

      <div className="container-x py-24 sm:py-32 lg:py-40">
        <SectionHeading
          id="industries-title"
          eyebrow="Industries"
          index="06"
          tone="dark"
          title={industriesIntro.homeTitle}
          size="lg"
          aside={
            <Button href="/industries" variant="inverse-outline">
              Explore industries
            </Button>
          }
        />

        <div ref={areaRef} onPointerMove={onMove} onPointerLeave={() => setActive(null)} className="relative mt-16 lg:mt-24">
          <ul className="grid md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
            {industries.map((ind, i) => (
              <li
                key={ind.name}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
                className={cn(
                  'group relative flex items-baseline gap-5 border-b border-white/15 py-5 transition-opacity duration-500 sm:py-6',
                  active !== null && active !== i ? 'lg:opacity-35' : 'opacity-100',
                )}
              >
                <span className="text-eyebrow w-7 shrink-0 text-blue-100">{pad2(i + 1)}</span>
                <span className="flex-1 font-display text-[clamp(1.35rem,1.9vw,1.95rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white transition-transform duration-700 ease-out-expo lg:group-hover:translate-x-3">
                  {ind.name}
                </span>
                <span className="text-eyebrow hidden text-blue-100 sm:block">{ind.licence}</span>
              </li>
            ))}
          </ul>

          {/* Cursor-following preview (desktop, mouse only) */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[22rem] w-[17rem] lg:block"
            style={{ x: sx, y: sy, translateX: '-50%', translateY: '-55%' }}
          >
            <motion.div
              className="relative h-full w-full overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgba(8,15,50,0.8)] ring-1 ring-white/40"
              animate={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.85 : 1, rotate: active === null ? -6 : -3 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {industries.map((ind, i) => (
                <div key={ind.name} className={cn('absolute inset-0 transition-opacity duration-500', active === i ? 'opacity-100' : 'opacity-0')}>
                  <Image src={images[ind.image].src} alt="" fill sizes="272px" className="object-cover" />
                </div>
              ))}
              {active !== null && (
                <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur">
                  <span className="text-eyebrow text-accent-strong">{industries[active].licence}</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        <Reveal className="mt-12 text-sm text-blue-100">{industriesIntro.footnote}</Reveal>
      </div>
    </section>
  )
}
