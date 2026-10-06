import { principleIcons } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'
import type { Principle } from '@/content/company'
import { cn, pad2 } from '@/lib/utils'

/** Principles as a hairline grid with line icons. `tone` is the section background. */
export function PrinciplesGrid({ items, tone = 'light' }: { items: Principle[]; tone?: 'light' | 'dark' }) {
  const light = tone === 'light'
  return (
    <ul className={cn('grid border-t sm:grid-cols-2 lg:grid-cols-5', light ? 'border-ink/15' : 'border-white/10')}>
      {items.map((p, i) => {
        const Icon = principleIcons[i % principleIcons.length]
        return (
          <Reveal
            key={p.title}
            as="li"
            delay={i * 0.07}
            className={cn(
              'group flex flex-col gap-10 border-b py-8 sm:pr-8 lg:border-b-0 lg:border-r lg:px-6 lg:py-10 lg:first:pl-0 lg:last:border-r-0',
              light ? 'border-ink/15' : 'border-white/10',
            )}
          >
            <div className="flex items-center justify-between">
              <span className={cn('text-eyebrow', light ? 'text-accent-strong' : 'text-blue-100')}>/ {pad2(i + 1)}</span>
              <Icon size={26} className="text-accent transition-transform duration-700 ease-out-expo group-hover:-translate-y-1 group-hover:rotate-6" />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-display-sm text-balance">{p.title}</h3>
              <p className={cn('text-[0.9375rem] leading-relaxed', light ? 'text-stone' : 'text-blue-100')}>{p.description}</p>
            </div>
          </Reveal>
        )
      })}
    </ul>
  )
}
