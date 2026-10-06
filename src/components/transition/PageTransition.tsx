'use client'

import { AnimatePresence, motion } from 'motion/react'
import { usePathname, useRouter } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

import { scrollToTarget, useLenis } from '@/components/providers/SmoothScroll'
import { EASE_IN_OUT } from '@/lib/motion'

type Phase = 'idle' | 'cover' | 'reveal'

type TransitionContextValue = {
  /** Navigate with the curtain transition. */
  navigate: (href: string) => void
  /** False while the curtain is covering the screen — entrance animations wait for it. */
  ready: boolean
}

const TransitionContext = createContext<TransitionContextValue>({ navigate: () => {}, ready: true })

export function usePageTransition() {
  return useContext(TransitionContext)
}

const COVER_MS = 650
const LAYER_GAP = 0.12 // seconds between the blue and light curtain layers
const FAILSAFE_MS = 5000

function scrollToHashOrTop(hash: string, lenis: ReturnType<typeof useLenis>) {
  const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
  if (target) scrollToTarget(lenis, target, true)
  else scrollToTarget(lenis, 0, true)
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const lenis = useLenis()
  const [phase, setPhase] = useState<Phase>('idle')
  const pendingHref = useRef<string | null>(null)
  const coverPathname = useRef<string | null>(null)
  const failsafe = useRef<number | undefined>(undefined)

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href)
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Same page: only the hash or query changes — scroll instead of transitioning.
      if (url.pathname === window.location.pathname) {
        if (url.search !== window.location.search) router.push(url.pathname + url.search + url.hash, { scroll: false })
        if (url.hash) scrollToTarget(lenis, url.hash)
        else if (url.search === window.location.search) scrollToTarget(lenis, 0)
        return
      }

      if (reduced) {
        router.push(url.pathname + url.search + url.hash)
        return
      }
      if (phase !== 'idle') return

      pendingHref.current = url.pathname + url.search + url.hash
      coverPathname.current = window.location.pathname
      router.prefetch(url.pathname + url.search)
      lenis?.stop()
      setPhase('cover')

      window.clearTimeout(failsafe.current)
      failsafe.current = window.setTimeout(() => setPhase('reveal'), FAILSAFE_MS)
    },
    [lenis, phase, router],
  )

  // Once the curtain has fully covered the page, perform the navigation.
  const onCovered = useCallback(() => {
    if (pendingHref.current) router.push(pendingHref.current, { scroll: false })
  }, [router])

  // The new route has rendered underneath the curtain: reset scroll, then reveal.
  useEffect(() => {
    if (phase !== 'cover' || pathname === coverPathname.current) return
    const hash = pendingHref.current ? new URL(pendingHref.current, window.location.href).hash : ''
    lenis?.start()
    scrollToHashOrTop(hash, lenis)
    window.clearTimeout(failsafe.current)
    setPhase('reveal')
  }, [pathname, phase, lenis])

  useEffect(() => () => window.clearTimeout(failsafe.current), [])

  const onRevealed = useCallback(() => {
    lenis?.start()
    pendingHref.current = null
    setPhase('idle')
  }, [lenis])

  return (
    <TransitionContext.Provider value={{ navigate, ready: phase !== 'cover' }}>
      {children}
      <AnimatePresence>
        {phase !== 'idle' && (
          // Two-layer wipe: a blue leading edge, then the light panel. They leave in reverse order.
          <div key="curtain" data-curtain="" aria-hidden="true" className="fixed inset-0 z-[70]">
            <motion.div
              className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-blue-800),var(--color-blue-600)_55%,var(--color-cyan))]"
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={phase === 'cover' ? { clipPath: 'inset(0% 0% 0% 0%)' } : { clipPath: 'inset(0% 0% 100% 0%)' }}
              transition={{ duration: COVER_MS / 1000, ease: EASE_IN_OUT, delay: phase === 'cover' ? 0 : LAYER_GAP }}
              onAnimationComplete={() => phase === 'reveal' && onRevealed()}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-paper"
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={phase === 'cover' ? { clipPath: 'inset(0% 0% 0% 0%)' } : { clipPath: 'inset(0% 0% 100% 0%)' }}
              transition={{ duration: COVER_MS / 1000, ease: EASE_IN_OUT, delay: phase === 'cover' ? LAYER_GAP : 0 }}
              onAnimationComplete={() => phase === 'cover' && onCovered()}
            >
              <motion.div
                className="flex flex-col items-center gap-5"
                initial={{ opacity: 0, y: 16 }}
                animate={phase === 'cover' ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EASE_IN_OUT, delay: phase === 'cover' ? 0.3 : 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG mark */}
                <img src="/brand/acube-mark.svg" alt="" width={44} height={44} className="h-11 w-11" />
                <span className="relative h-px w-24 overflow-hidden bg-blue-100">
                  <motion.span
                    className="absolute inset-y-0 left-0 w-full origin-left bg-[linear-gradient(90deg,var(--color-accent),var(--color-cyan))]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, ease: EASE_IN_OUT, delay: 0.25 }}
                  />
                </span>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  )
}
