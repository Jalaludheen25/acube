'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'

import { WhatsApp } from '@/components/ui/Icons'
import { whatsappUrl } from '@/content/site'
import { EASE_OUT } from '@/lib/motion'

/** Floating "Chat with us" shortcut, shown once the visitor has scrolled past the hero. */
export function WhatsAppFab() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  // Hide again at the very bottom so it never covers the footer's legal bar.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 140
    setVisible(y > 640 && !nearEnd)
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-0 overflow-hidden rounded-full bg-[linear-gradient(100deg,var(--color-blue-700),var(--color-blue-600)_55%,#2f6bff)] pl-[1.1rem] pr-[1.1rem] text-white shadow-[0_20px_44px_-16px_rgba(35,80,240,0.8)] transition-[gap,padding] duration-500 ease-out-expo hover:gap-3 hover:pr-6 sm:bottom-7 sm:right-7"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          data-cursor="link"
        >
          <WhatsApp size={20} className="shrink-0 text-white" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-[max-width] duration-500 ease-out-expo group-hover:max-w-40">
            Chat with us
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
