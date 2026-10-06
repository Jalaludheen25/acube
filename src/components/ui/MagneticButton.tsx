'use client'

import { motion, useSpring } from 'motion/react'
import { useRef, type ButtonHTMLAttributes, type PointerEvent, type ReactNode } from 'react'

import { TransitionLink } from '@/components/transition/TransitionLink'
import { cn } from '@/lib/utils'

import { ArrowUpRight } from './Icons'
import { usePrefersReducedMotion } from '@/lib/hooks'

/** Subtle cursor attraction for primary actions (mouse only, disabled for reduced motion). */
function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const spring = { stiffness: 200, damping: 16, mass: 0.5 }
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className={cn('inline-flex', className)}>
      {children}
    </motion.div>
  )
}

/** `primary`/`secondary` sit on light surfaces; `inverse`/`inverse-outline` on dark ones (the footer). */
type Variant = 'primary' | 'secondary' | 'inverse' | 'inverse-outline'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, { base: string; fill: string; icon: string }> = {
  primary: {
    base: 'bg-[linear-gradient(100deg,var(--color-blue-700),var(--color-blue-600)_55%,#2f6bff)] text-white shadow-[0_14px_34px_-14px_rgba(35,80,240,0.75)] transition-shadow duration-500 hover:shadow-[0_18px_44px_-14px_rgba(35,80,240,0.9)]',
    fill: 'bg-blue-900',
    icon: 'bg-white text-accent',
  },
  secondary: {
    base: 'border border-blue-200 bg-white/80 text-ink backdrop-blur-sm',
    fill: 'bg-accent',
    icon: 'bg-accent-soft text-accent group-hover:bg-white group-hover:text-accent',
  },
  inverse: { base: 'bg-white text-ink', fill: 'bg-blue-100', icon: 'bg-accent text-white' },
  'inverse-outline': { base: 'border border-white/25 text-bone', fill: 'bg-white', icon: 'bg-white/10 text-bone group-hover:bg-accent group-hover:text-white' },
}

const hoverText: Record<Variant, string> = {
  primary: 'group-hover:text-white',
  secondary: 'group-hover:text-white',
  inverse: 'group-hover:text-ink',
  'inverse-outline': 'group-hover:text-ink',
}

const sizes: Record<Size, { root: string; icon: string }> = {
  sm: { root: 'h-10 pl-4 pr-1.5 text-[0.8125rem] gap-3', icon: 'h-7 w-7' },
  md: { root: 'h-12 pl-5 pr-1.5 text-sm gap-4', icon: 'h-9 w-9' },
  lg: { root: 'h-14 pl-7 pr-2 text-[0.9375rem] gap-5', icon: 'h-10 w-10' },
}

type ButtonOwnProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  magnetic?: boolean
  icon?: ReactNode | null
  className?: string
}

type AsLink = ButtonOwnProps & { href: string; target?: string; rel?: string; 'aria-label'?: string }
type AsButton = ButtonOwnProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href)

export function Button(props: AsLink | AsButton) {
  const { children, variant = 'primary', size = 'md', magnetic = true, icon, className, ...rest } = props
  const v = variants[variant]
  const s = sizes[size]

  const inner = (
    <>
      <span aria-hidden="true" className={cn('absolute inset-0 translate-y-[101%] rounded-[inherit] transition-transform duration-700 ease-out-expo group-hover:translate-y-0', v.fill)} />
      <span className={cn('relative block overflow-hidden font-medium tracking-[-0.005em] transition-colors duration-500', hoverText[variant])}>
        <span className="block transition-transform duration-700 ease-out-expo group-hover:-translate-y-full">{children}</span>
        <span aria-hidden="true" className="absolute inset-0 translate-y-full transition-transform duration-700 ease-out-expo group-hover:translate-y-0">
          {children}
        </span>
      </span>
      {icon !== null && (
        <span className={cn('relative grid shrink-0 place-items-center rounded-full transition-colors duration-500', s.icon, v.icon)}>
          <span className="transition-transform duration-700 ease-out-expo group-hover:rotate-45">{icon ?? <ArrowUpRight size={16} strokeWidth={1.5} />}</span>
        </span>
      )}
    </>
  )

  const classes = cn(
    'group relative inline-flex select-none items-center justify-between overflow-hidden rounded-full whitespace-nowrap isolate',
    v.base,
    s.root,
    icon === null && 'pr-5',
    className,
  )

  let el: ReactNode
  if (typeof rest.href === 'string') {
    const { href, target, rel, 'aria-label': ariaLabel } = rest as Omit<AsLink, keyof ButtonOwnProps>
    el = isExternal(href) ? (
      <a href={href} target={target} rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)} aria-label={ariaLabel} className={classes} data-cursor="link">
        {inner}
      </a>
    ) : (
      <TransitionLink href={href} aria-label={ariaLabel} className={classes} data-cursor="link">
        {inner}
      </TransitionLink>
    )
  } else {
    const buttonProps = rest as Omit<AsButton, keyof ButtonOwnProps>
    el = (
      <button {...buttonProps} className={classes} data-cursor="link">
        {inner}
      </button>
    )
  }

  return magnetic ? <Magnetic>{el}</Magnetic> : el
}

/** Understated text link with an animated underline and arrow. */
export function TextLink({ href, children, className, tone = 'light' }: { href: string; children: ReactNode; className?: string; tone?: 'dark' | 'light' }) {
  const classes = cn(
    'group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-500',
    tone === 'dark' ? 'text-bone hover:text-blue-300' : 'text-ink hover:text-accent-strong',
    className,
  )
  const content = (
    <>
      <span className="link-underline pb-0.5">{children}</span>
      <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  )
  return isExternal(href) ? (
    <a href={href} className={classes} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
      {content}
    </a>
  ) : (
    <TransitionLink href={href} className={classes}>
      {content}
    </TransitionLink>
  )
}
