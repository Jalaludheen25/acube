'use client'

import { scrollToTarget, useLenis } from '@/components/providers/SmoothScroll'
import { ArrowUpRight } from '@/components/ui/Icons'

export function BackToTop() {
  const lenis = useLenis()
  return (
    <button
      type="button"
      onClick={() => {
        scrollToTarget(lenis, 0)
        document.getElementById('main')?.focus({ preventScroll: true })
      }}
      className="group inline-flex items-center gap-2 text-xs text-mist transition-colors hover:text-bone"
      data-cursor="link"
    >
      Back to top
      <ArrowUpRight size={14} className="-rotate-45 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" />
    </button>
  )
}
