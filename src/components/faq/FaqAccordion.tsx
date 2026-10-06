'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'

import { Plus } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'
import type { Faq } from '@/content/faqs'
import { EASE_OUT } from '@/lib/motion'
import { cn, pad2 } from '@/lib/utils'

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <ul className="border-t border-ink/10">
      {items.map((f, i) => {
        const isOpen = open === i
        const panelId = `${baseId}-panel-${i}`
        const buttonId = `${baseId}-button-${i}`
        return (
          <Reveal key={f.question} as="li" delay={i * 0.05} className="border-b border-ink/10">
            <h2>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-start gap-4 py-7 text-left sm:grid-cols-[4rem_1fr_auto] sm:gap-6 sm:py-9"
              >
                <span className={cn('text-eyebrow pt-3 transition-colors', isOpen ? 'text-accent-strong' : 'text-stone')}>{pad2(i + 1)}</span>
                <span className={cn('font-display text-[clamp(1.2rem,1.9vw,1.75rem)] font-medium leading-[1.25] tracking-[-0.025em] transition-colors duration-500', isOpen ? 'text-ink' : 'text-ink/75 group-hover:text-accent-strong')}>
                  {f.question}
                </span>
                <span
                  className={cn(
                    'mt-1 grid h-11 w-11 place-items-center rounded-full border transition-all duration-500 ease-out-expo',
                    isOpen ? 'rotate-45 border-accent bg-accent text-white shadow-[0_10px_24px_-10px_rgba(35,80,240,0.8)]' : 'border-ink/15 text-ink group-hover:border-blue-300 group-hover:text-accent',
                  )}
                >
                  <Plus size={16} />
                </span>
              </button>
            </h2>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <p className="text-lede max-w-2xl pb-9 pl-[3.5rem] text-stone sm:pl-[5.5rem]">{f.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        )
      })}
    </ul>
  )
}
