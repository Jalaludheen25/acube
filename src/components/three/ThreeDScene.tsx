'use client'

import { motion } from 'motion/react'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

import { usePageTransition } from '@/components/transition/PageTransition'
import { EASE_OUT } from '@/lib/motion'
import { cn } from '@/lib/utils'

import { CubeFallback } from './CubeFallback'

const CubeLattice = dynamic(() => import('./CubeLattice'), { ssr: false })

type Mode = 'pending' | '3d' | 'fallback'

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function prefersLightweight() {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number }
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    // Phones get the static lattice: no WebGL on small screens.
    window.matchMedia('(max-width: 767px)').matches ||
    !!nav.connection?.saveData ||
    (nav.hardwareConcurrency ?? 8) <= 2 ||
    (nav.deviceMemory ?? 8) < 2
  )
}

/**
 * Hero 3D object. The WebGL scene is code-split and loaded after the load event once the page is idle,
 * renders only while on screen, and falls back to an SVG lattice where WebGL is unavailable
 * or unsuitable.
 */
export function ThreeDScene({ className, paused = false }: { className?: string; paused?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<Mode>('pending')
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(true)
  const { ready: pageReady } = usePageTransition()

  useEffect(() => {
    if (prefersLightweight() || !supportsWebGL()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- capability detection must run on the client
      setMode('fallback')
      return
    }
    // Keep WebGL out of the critical path: wait for the load event, then an idle moment.
    let idleId: number | undefined
    let timer: number | undefined
    const start = () => {
      timer = window.setTimeout(() => {
        if (window.requestIdleCallback) idleId = window.requestIdleCallback(() => setMode('3d'), { timeout: 1200 })
        else setMode('3d')
      }, 400)
    }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => {
      window.removeEventListener('load', start)
      window.clearTimeout(timer)
      if (idleId !== undefined) window.cancelIdleCallback(idleId)
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '80px' })
    io.observe(el)
    const onVis = () => setVisible(document.visibilityState === 'visible' && el.getBoundingClientRect().bottom > 0)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <div ref={ref} className={cn('isolate', className)}>
      {mode === 'fallback' && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-[8%]"
          initial={{ opacity: 0, y: 40, scale: 0.94 }}
          animate={pageReady ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 2, ease: EASE_OUT, delay: 0.6 }}
        >
          <CubeFallback className="max-h-full" />
        </motion.div>
      )}
      {mode === '3d' && (
        <CubeLattice
          active={visible && pageReady && !paused}
          onReady={() => setReady(true)}
          onFail={() => setMode('fallback')}
          className={cn('!absolute inset-0 transition-opacity duration-[1600ms] ease-out', ready ? 'opacity-100' : 'opacity-0')}
        />
      )}
    </div>
  )
}
