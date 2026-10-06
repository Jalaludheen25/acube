import { Check, Minus } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'
import { packageFeatures, packages, packagesIntro } from '@/content/packages'
import { cn } from '@/lib/utils'

function Mark({ included, label }: { included: boolean; label: string }) {
  return included ? (
    <span className="inline-grid h-7 w-7 place-items-center rounded-full bg-accent text-white">
      <Check size={14} strokeWidth={2} />
      <span className="sr-only">Included in {label}</span>
    </span>
  ) : (
    <span className="inline-grid h-7 w-7 place-items-center rounded-full text-ink/30">
      <Minus size={14} />
      <span className="sr-only">Not included in {label}</span>
    </span>
  )
}

/** Feature comparison. A real table on larger screens; reflows to stacked rows on phones. */
export function CompareTable() {
  return (
    <Reveal className="mt-14 lg:mt-20">
      <table role="table" className="block w-full border-collapse text-left sm:table">
        <caption className="sr-only">Package comparison</caption>
        <thead role="rowgroup" className="sticky top-20 z-10 block bg-white/90 backdrop-blur-md sm:table-header-group">
          <tr role="row" className="grid grid-cols-3 border-b border-blue-600 sm:table-row">
            <th role="columnheader" scope="col" className="hidden py-5 pr-6 text-eyebrow font-normal text-stone sm:table-cell">
              Included
            </th>
            {packages.map((p) => (
              <th key={p.slug} role="columnheader" scope="col" className="py-5 text-center font-normal sm:w-[18%]">
                <span className="text-eyebrow block text-accent-strong">{p.number}</span>
                <span className={cn('mt-1 block font-display text-lg font-medium tracking-[-0.03em] sm:text-2xl', p.recommended && 'mx-auto w-fit font-accent text-gradient')}>{p.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup" className="block sm:table-row-group">
          {packageFeatures.map((f) => (
            <tr key={f.label} role="row" className="grid grid-cols-3 border-b border-ink/15 sm:table-row">
              <th role="rowheader" scope="row" className="col-span-3 pb-1 pt-5 pr-6 text-[0.9375rem] font-normal text-ink sm:py-5">
                {f.label}
              </th>
              {packages.map((p) => (
                <td key={p.slug} role="cell" className="pb-5 pt-2 text-center sm:py-5">
                  <Mark included={f.tiers.includes(p.slug)} label={p.name} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-stone">
        <span className="font-accent text-lg text-ink">{packagesIntro.pricing}</span> — {packagesIntro.compareNote}
      </p>
    </Reveal>
  )
}
