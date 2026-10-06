'use client'

import NextLink from 'next/link'
import type { ComponentProps, MouseEvent } from 'react'

import { usePageTransition } from './PageTransition'

type Props = Omit<ComponentProps<typeof NextLink>, 'href'> & { href: string }

function isPlainLeftClick(e: MouseEvent<HTMLAnchorElement>) {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey
}

/** Internal link that plays the page transition. Falls back to normal behaviour for new tabs and external URLs. */
export function TransitionLink({ href, onClick, target, ...props }: Props) {
  const { navigate } = usePageTransition()

  return (
    <NextLink
      href={href}
      target={target}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || !isPlainLeftClick(e) || (target && target !== '_self')) return
        const url = new URL(href, window.location.href)
        if (url.origin !== window.location.origin) return
        e.preventDefault()
        navigate(url.pathname + url.search + url.hash)
      }}
      {...props}
    />
  )
}
