'use client'

import { LayoutGroup, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useLenis } from '@/components/providers/SmoothScroll'
import { TransitionLink } from '@/components/transition/TransitionLink'
import { Button } from '@/components/ui/MagneticButton'
import { mainNav, primaryCta } from '@/content/site'
import { EASE_OUT } from '@/lib/motion'
import { cn } from '@/lib/utils'

import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

let introPlayed = false

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Navbar() {
  const pathname = usePathname()
  const lenis = useLenis()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [playIntro] = useState(() => !introPlayed)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const trapRoots = useMemo(() => [headerRef, toggleRef], [])

  useEffect(() => {
    introPlayed = true
  }, [])

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    if (open) return
    setHidden(y > 520 && y > prev + 2)
    if (y < prev - 2) setHidden(false)
  })

  const close = useCallback(() => setOpen(false), [])

  // Close the menu whenever the route changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing UI to navigation
    setOpen(false)
  }, [pathname])

  // Lock scrolling while the menu is open.
  useEffect(() => {
    const root = document.documentElement
    if (open) {
      lenis?.stop()
      root.style.overflow = 'hidden'
    } else {
      lenis?.start()
      root.style.overflow = ''
    }
    return () => {
      root.style.overflow = ''
    }
  }, [open, lenis])

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={playIntro ? { opacity: 0, y: -16 } : false}
        animate={{ opacity: 1, y: hidden ? '-110%' : 0 }}
        transition={{ duration: playIntro && !scrolled ? 1.2 : 0.6, ease: EASE_OUT, delay: playIntro && !scrolled ? 0.35 : 0 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
      >
        <div
          className={cn(
            'container-x relative flex h-16 items-center justify-between rounded-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-700 ease-out-expo lg:h-[4.5rem]',
            'border',
            scrolled || open
              ? 'border-blue-100 bg-white/75 shadow-[0_12px_40px_-24px_rgba(35,80,240,0.35)] backdrop-blur-xl'
              : 'border-transparent bg-transparent',
          )}
        >
          <TransitionLink href="/" aria-label="ACUBE — Home" className="relative z-10 -ml-1 shrink-0 rounded-sm py-2 pl-1 sm:pl-2">
            <Logo className="w-[104px] lg:w-[118px]" />
          </TransitionLink>

          <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 xl:block">
            <LayoutGroup id="main-nav">
              <ul className="flex items-center" onMouseLeave={() => setHovered(null)}>
                {mainNav.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <li key={item.href} className="relative">
                      <TransitionLink
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        onMouseEnter={() => setHovered(item.href)}
                        onFocus={() => setHovered(item.href)}
                        className={cn(
                          'relative block rounded-full px-4 py-2 text-[0.8125rem] tracking-[-0.003em] transition-colors duration-300',
                          active ? 'text-accent-strong' : hovered === item.href ? 'text-ink' : 'text-ink/65',
                        )}
                      >
                        {hovered === item.href && (
                          <motion.span
                            layoutId="nav-hover"
                            className="absolute inset-0 -z-10 rounded-full bg-accent-soft"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                        {item.label}
                        {active && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </TransitionLink>
                    </li>
                  )
                })}
              </ul>
            </LayoutGroup>
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <div className="hidden sm:block">
              <Button href={primaryCta.href} size="sm">
                {primaryCta.label}
              </Button>
            </div>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="group relative grid h-11 w-11 place-items-center rounded-full border border-blue-200 bg-white/70 transition-colors duration-300 hover:border-blue-300 hover:bg-white xl:hidden"
              data-cursor="link"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={cn(
                    'absolute left-0 top-0 h-px w-5 bg-ink transition-transform duration-500 ease-out-expo',
                    open && 'translate-y-[5.5px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'absolute bottom-0 left-0 h-px bg-ink transition-all duration-500 ease-out-expo',
                    open ? 'w-5 -translate-y-[5.5px] -rotate-45' : 'w-3.5 group-hover:w-5',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={close} pathname={pathname} trapRoots={trapRoots} />
    </>
  )
}
