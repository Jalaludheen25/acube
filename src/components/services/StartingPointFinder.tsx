'use client'

import { useState, type FormEvent } from 'react'

import { usePageTransition } from '@/components/transition/PageTransition'
import { Button } from '@/components/ui/MagneticButton'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { startingPoint } from '@/content/company'
import { cn, pad2 } from '@/lib/utils'

type Answers = Partial<Record<(typeof startingPoint.questions)[number]['id'], string>>

export function StartingPointFinder() {
  const { navigate } = usePageTransition()
  const [answers, setAnswers] = useState<Answers>({})

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(Object.entries(answers).filter(([, v]) => Boolean(v)) as [string, string][])
    const qs = params.toString()
    navigate(`/contact${qs ? `?${qs}` : ''}#enquiry`)
  }

  return (
    <section aria-labelledby="finder-title" className="relative overflow-hidden bg-tint">
      <div className="container-x grid gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:gap-12 lg:py-40">
        <div className="flex flex-col gap-7 lg:col-span-4">
          <Reveal y={12} blur={false}>
            <Eyebrow>{startingPoint.eyebrow}</Eyebrow>
          </Reveal>
          <RevealLines id="finder-title" lines={["Let's find your", 'starting point.']} accent={[1]} className="text-display-lg" />
          <Reveal delay={0.15} as="p" className="text-lede text-stone">
            {startingPoint.lede}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <form onSubmit={onSubmit} className="flex flex-col gap-10">
            {startingPoint.questions.map((q, qi) => (
              <fieldset key={q.id} className="flex flex-col gap-5 border-t border-ink/10 pt-6">
                <legend className="float-left mb-5 flex w-full items-baseline gap-4">
                  <span className="text-eyebrow text-accent-strong">{pad2(qi + 1)}</span>
                  <span className="font-display text-[1.35rem] font-medium leading-tight tracking-[-0.03em] text-ink">{q.legend}</span>
                </legend>
                <div className="clear-both flex flex-wrap gap-2.5">
                  {q.options.map((o) => {
                    const checked = answers[q.id] === o.id
                    return (
                      <label
                        key={o.id}
                        className={cn(
                          'relative cursor-pointer rounded-full border px-5 py-3 text-sm transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent',
                          checked ? 'border-accent bg-accent text-white shadow-[0_10px_24px_-12px_rgba(35,80,240,0.8)]' : 'border-ink/15 bg-white text-ink/80 hover:border-blue-300 hover:text-accent-strong',
                        )}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={o.id}
                          checked={checked}
                          onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))}
                          className="sr-only"
                        />
                        {o.label}
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            ))}
            <div>
              <Button type="submit" size="lg">
                Book Free Consultation
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
