'use client'

import Lenis from 'lenis'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const LenisContext = createContext<Lenis | null>(null)

/** Lenis instance, or null when smooth scrolling is disabled (reduced motion / touch-only). */
export function useLenis() {
  return useContext(LenisContext)
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.095,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      anchors: false,
    })
    // eslint-disable-next-line react-hooks/set-state-in-effect -- exposing an external instance created on mount
    setLenis(instance)
    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

/** Scroll to a target using Lenis when available, falling back to native scrolling. */
export function scrollToTarget(lenis: Lenis | null, target: string | number | HTMLElement, immediate = false) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, offset: typeof target === 'number' ? 0 : -96, duration: 1.4 })
    return
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: immediate ? 'instant' : 'smooth' })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (el instanceof HTMLElement) {
    const top = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' })
  }
}
