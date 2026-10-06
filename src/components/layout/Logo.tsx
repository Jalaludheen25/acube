import { cn } from '@/lib/utils'

/**
 * ACUBE wordmark (vector, traced from the original brand artwork).
 * `tone` is the surface it sits on: dark lettering for light surfaces, light lettering for dark ones.
 */
export function Logo({ className, tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static vector logo; no optimisation needed
    <img
      src={tone === 'light' ? '/brand/acube-logo.svg' : '/brand/acube-logo-light.svg'}
      alt="ACUBE"
      width={979}
      height={245}
      className={cn('h-auto select-none', className)}
      draggable={false}
    />
  )
}
