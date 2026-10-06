import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'

/** CSS-only infinite marquee. The duplicate track is hidden from assistive technology. */
export function Marquee({
  items,
  className,
  itemClassName,
  duration = 45,
  separator,
}: {
  items: ReactNode[]
  className?: string
  itemClassName?: string
  duration?: number
  separator?: ReactNode
}) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i} className={cn('flex shrink-0 items-center', itemClassName)}>
          {item}
          {separator}
        </li>
      ))}
    </ul>
  )
  return (
    <div className={cn('group flex overflow-hidden', className)}>
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
