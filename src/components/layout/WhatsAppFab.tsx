'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'

import { WhatsAppLogo } from '@/components/ui/WhatsAppLogo'
import { whatsappUrl } from '@/content/site'
import { usePrefersReducedMotion } from '@/lib/hooks'
import { EASE_OUT } from '@/lib/motion'
import { cn } from '@/lib/utils'

const PEEK_KEY = 'acube:wa-peeked'
const PEEK_MS = 2800

/**
 * Floating WhatsApp shortcut.
 * - Positioning: bottom-right, inset from the device's safe area (notch / home bar); stacked below the
 *   mobile menu, header and page transition. Appears after the hero, steps aside at the footer's legal bar.
 * - Hover / keyboard focus: a "Chat with us" label slides out and the logo lifts and tilts.
 * - On first appearance per visit the label peeks briefly, so touch users learn what the button does.
 */
export function WhatsAppFab() {
  const { scrollY } = useScroll()
  const reduced = usePrefersReducedMotion()
  const [visible, setVisible] = useState(false)
  const [peek, setPeek] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 140
    setVisible(y > 640 && !nearEnd)
  })

  // One-time peek of the label (per browser session).
  useEffect(() => {
    if (!visible) return
    let seen = false
    try {
      seen = sessionStorage.getItem(PEEK_KEY) === '1'
      sessionStorage.setItem(PEEK_KEY, '1')
    } catch {
      // Storage unavailable (private mode): peek every visit — harmless.
    }
    if (seen) return
    const show = window.setTimeout(() => setPeek(true), 700)
    const hide = window.setTimeout(() => setPeek(false), 700 + PEEK_MS)
    return () => {
      window.clearTimeout(show)
      window.clearTimeout(hide)
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with ACUBE on WhatsApp"
          data-cursor="link"
          data-peek={peek ? '' : undefined}
          className="group fixed z-30 block rounded-full outline-offset-4"
          style={{
            right: 'max(1.25rem, calc(env(safe-area-inset-right) + 0.75rem))',
            bottom: 'max(1.25rem, calc(env(safe-area-inset-bottom) + 0.75rem))',
          }}
          initial={{ opacity: 0, scale: 0.6, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 24 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {/* Label — anchored to the logo's left edge so the hover area is just the logo until it opens */}
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute right-full top-1/2 mr-3 flex -translate-y-1/2 translate-x-3 items-center gap-2 whitespace-nowrap rounded-full border border-ink/[0.06] bg-white py-2.5 pl-3.5 pr-4 text-sm font-medium text-ink opacity-0 shadow-[0_18px_40px_-18px_rgba(11,21,48,0.45)] transition-[opacity,transform] duration-500 ease-out-expo',
              'group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100',
              'group-focus-visible:translate-x-0 group-focus-visible:opacity-100',
              'group-data-[peek]:translate-x-0 group-data-[peek]:opacity-100',
            )}
          >
            <span className="h-2 w-2 rounded-full bg-[#25D366]" />
            Chat with us
            {/* little pointer toward the logo */}
            <span className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 rounded-[2px] border-r border-t border-ink/[0.06] bg-white" />
          </span>

          <span className="relative grid h-14 w-14 place-items-center sm:h-[3.75rem] sm:w-[3.75rem]">
            {/* idle pulse */}
            {!reduced && (
              <span
                aria-hidden="true"
                className="absolute inset-1 rounded-full bg-[#25D366]/45 animate-[pulse-ring_2.6s_ease-out_infinite] group-hover:hidden"
              />
            )}
            <span className="relative block rounded-full transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:-rotate-[10deg] group-hover:scale-105 group-active:scale-95">
              <WhatsAppLogo size={56} className="sm:!h-[3.75rem] sm:!w-[3.75rem]" />
            </span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
