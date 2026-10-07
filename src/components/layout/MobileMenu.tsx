'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, type RefObject } from 'react'

import { TransitionLink } from '@/components/transition/TransitionLink'
import { Mail, Phone } from '@/components/ui/Icons'
import { Button } from '@/components/ui/MagneticButton'
import { WhatsAppLogo } from '@/components/ui/WhatsAppLogo'
import { mainNav, primaryCta, site, whatsappUrl } from '@/content/site'
import { EASE_IN_OUT, EASE_OUT } from '@/lib/motion'
import { cn, pad2 } from '@/lib/utils'

const ORIGIN = 'calc(100% - 3rem) 2.6rem'

type Props = {
  open: boolean
  onClose: () => void
  pathname: string
  /** Elements outside the dialog that stay in the tab order (the header's toggle). */
  trapRoots: RefObject<HTMLElement | null>[]
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function MobileMenu({ open, onClose, pathname, trapRoots }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Move focus into the menu once per opening.
  useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus({ preventScroll: true })
    }, 350)
    return () => window.clearTimeout(id)
  }, [open])

  useEffect(() => {
    if (!open) return
    const toggle = trapRoots[1]?.current

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        toggle?.focus()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const header = trapRoots[0]?.current
      const items = [
        ...(header ? Array.from(header.querySelectorAll<HTMLElement>(FOCUSABLE)) : []),
        ...Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)),
      ].filter((el) => el.offsetParent !== null)
      if (!items.length) return
      const idx = items.indexOf(document.activeElement as HTMLElement)
      e.preventDefault()
      const next = e.shiftKey ? (idx <= 0 ? items.length - 1 : idx - 1) : idx === items.length - 1 ? 0 : idx + 1
      items[next].focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose, trapRoots])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-sky xl:hidden"
          initial={{ clipPath: `circle(0% at ${ORIGIN})` }}
          animate={{ clipPath: `circle(150% at ${ORIGIN})` }}
          exit={{ clipPath: `circle(0% at ${ORIGIN})` }}
          transition={{ duration: 0.85, ease: EASE_IN_OUT }}
          data-lenis-prevent
        >
          {/* Faint architectural grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #2350f0 1px, transparent 1px), linear-gradient(to bottom, #2350f0 1px, transparent 1px)',
              backgroundSize: '25% 25%',
            }}
          />
          <div className="container-x relative flex min-h-full flex-1 flex-col pb-10 pt-28">
            <nav aria-label="Mobile" className="flex-1">
              <ul className="flex flex-col">
                {[{ label: 'Home', href: '/' }, ...mainNav].map((item, i) => {
                  const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                  return (
                    <li key={item.href} className="mask-line border-b border-blue-100">
                      <motion.div
                        initial={{ y: '110%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '110%', transition: { duration: 0.4, ease: EASE_IN_OUT } }}
                        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.28 + i * 0.05 }}
                      >
                        <TransitionLink
                          href={item.href}
                          onClick={onClose}
                          aria-current={active ? 'page' : undefined}
                          className="group flex items-baseline justify-between gap-6 py-3 sm:py-4"
                        >
                          <span
                            className={cn(
                              'font-display text-[2rem] font-medium leading-none tracking-[-0.04em] transition-colors duration-300 sm:text-5xl',
                              active ? 'font-accent text-gradient' : 'text-ink transition-colors group-hover:text-accent-strong',
                            )}
                          >
                            {item.label}
                          </span>
                          <span className="text-eyebrow text-accent-strong">{pad2(i + 1)}</span>
                        </TransitionLink>
                      </motion.div>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <motion.div
              className="mt-10 grid gap-8 sm:grid-cols-2 sm:items-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.7 }}
            >
              <div className="flex flex-col gap-3 text-sm text-stone">
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 hover:text-ink">
                  <Mail size={16} /> {site.email}
                </a>
                <a href={`tel:${site.phones[0].tel}`} className="inline-flex items-center gap-3 hover:text-ink">
                  <Phone size={16} /> {site.phones[0].display}
                </a>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 hover:text-ink">
                  <WhatsAppLogo size={20} className="-ml-0.5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-px group-hover:-rotate-[10deg] group-hover:scale-110" /> WhatsApp {site.whatsapp.display}
                </a>
              </div>
              <div className="sm:justify-self-end">
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
