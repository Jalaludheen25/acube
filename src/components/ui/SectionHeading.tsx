import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { DrawLine } from './DrawLine'
import { CubeGlyph } from './Icons'
import { Reveal, RevealLines, RevealWords } from './Reveal'

type Tone = 'dark' | 'light'

/** Small uppercase label with the brand cube marker. `tone` is the background it sits on. */
export function Eyebrow({
  children,
  index,
  tone = 'light',
  as: Comp = 'p',
  className,
}: {
  children: ReactNode
  index?: string
  tone?: Tone
  as?: 'p' | 'h2' | 'h3' | 'span'
  className?: string
}) {
  return (
    <Comp className={cn('text-eyebrow flex items-center gap-3', tone === 'dark' ? 'text-blue-100' : 'text-stone', className)}>
      <CubeGlyph size={11} className={tone === 'dark' ? 'text-bone' : 'text-ink'} />
      {index && <span className={tone === 'dark' ? 'text-white' : 'text-accent-strong'}>{index}</span>}
      {index && <DrawLine className={cn('w-8', tone === 'dark' ? 'bg-[linear-gradient(90deg,#ffffff,var(--color-cyan))]' : 'bg-[linear-gradient(90deg,var(--color-accent),var(--color-cyan))]')} />}
      <span>{children}</span>
    </Comp>
  )
}

type SectionHeadingProps = {
  eyebrow?: ReactNode
  index?: string
  /** A string reveals word-by-word; an array reveals line-by-line. */
  title: string | string[]
  accent?: number[]
  lede?: ReactNode
  tone?: Tone
  as?: 'h1' | 'h2' | 'h3'
  size?: 'xl' | 'lg' | 'md'
  className?: string
  titleClassName?: string
  aside?: ReactNode
  id?: string
}

const sizeClass = { xl: 'text-display-xl', lg: 'text-display-lg', md: 'text-display-md' }

export function SectionHeading({
  eyebrow,
  index,
  title,
  accent,
  lede,
  tone = 'light',
  as = 'h2',
  size = 'lg',
  className,
  titleClassName,
  aside,
  id,
}: SectionHeadingProps) {
  const titleClasses = cn(sizeClass[size], 'text-balance', titleClassName)
  return (
    <div className={cn('grid gap-8 lg:grid-cols-12 lg:items-end', className)}>
      <div className={cn('flex flex-col gap-7', aside ? 'lg:col-span-8' : 'lg:col-span-10')}>
        {eyebrow && (
          <Reveal y={12} blur={false}>
            <Eyebrow tone={tone} index={index}>
              {eyebrow}
            </Eyebrow>
          </Reveal>
        )}
        {Array.isArray(title) ? (
          <RevealLines
            as={as}
            id={id}
            lines={title}
            accent={accent}
            accentClassName={cn('font-accent w-fit', tone === 'dark' ? 'text-gradient-ice' : 'text-gradient')}
            className={titleClasses}
          />
        ) : (
          <RevealWords as={as} id={id} text={title} className={titleClasses} />
        )}
        {lede && (
          <Reveal delay={0.15} as="div" className={cn('text-lede max-w-2xl text-pretty', tone === 'dark' ? 'text-blue-100' : 'text-stone')}>
            {lede}
          </Reveal>
        )}
      </div>
      {aside && (
        <Reveal delay={0.2} className="lg:col-span-4 lg:justify-self-end">
          {aside}
        </Reveal>
      )}
    </div>
  )
}
