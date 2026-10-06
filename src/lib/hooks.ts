'use client'

import { useSyncExternalStore } from 'react'

/** SSR-safe media query subscription. Returns `false` on the server. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/**
 * Hydration-safe "prefers reduced motion". Reports `false` while hydrating (matching the
 * server HTML), then the real preference — unlike Motion's hook, which reads it synchronously.
 */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
