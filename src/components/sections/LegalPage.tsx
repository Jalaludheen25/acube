import type { ReactNode } from 'react'

import { Reveal } from '@/components/ui/Reveal'

import { PageHero } from './PageHero'

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={[title]} lede={`Last updated ${updated}`} />
      <section className="bg-white pt-16">
        <div className="container-x pb-24 sm:pb-32">
          <Reveal className="max-w-3xl border-t border-ink/10 pt-12 lg:ml-[16.666%] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-accent-strong [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-[-0.03em] [&_h2]:text-ink first:[&_h2]:mt-0 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 text-[1.0625rem] leading-relaxed text-stone">
            {children}
          </Reveal>
        </div>
      </section>
    </>
  )
}
