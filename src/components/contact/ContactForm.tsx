'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react'

import { TransitionLink } from '@/components/transition/TransitionLink'
import { Button } from '@/components/ui/MagneticButton'
import { startingPoint, structures } from '@/content/company'
import { packages } from '@/content/packages'
import { getService } from '@/content/services'
import { site } from '@/content/site'
import { MESSAGE_MAX, validateContact, type ContactErrors, type ContactInput } from '@/lib/contact'
import { EASE_OUT } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'submitting' | 'success' | 'error'
type FieldName = 'name' | 'email' | 'phone' | 'message'

const EMPTY: ContactInput = { name: '', email: '', phone: '', message: '', website: '' }

/** Turns query parameters from CTAs across the site into a helpful opening message. */
function messageFromQuery(params: URLSearchParams) {
  const lines: string[] = []
  const pkg = packages.find((p) => p.slug === params.get('package'))
  if (pkg) lines.push(`I'm interested in the ${pkg.name} package.`)
  const structure = structures.find((s) => s.slug === params.get('structure'))
  if (structure) lines.push(`I'd like to discuss a ${structure.title} setup.`)
  const service = getService(params.get('service') ?? '')
  if (service) lines.push(`I'd like to know more about ${service.title}.`)
  for (const q of startingPoint.questions) {
    const option = q.options.find((o) => o.id === params.get(q.id))
    if (option) lines.push(`${q.legend} ${option.label}.`)
  }
  return lines.join('\n')
}

function Field({
  id,
  name,
  label,
  hint,
  error,
  value,
  onChange,
  onBlur,
  type = 'text',
  autoComplete,
  optional,
  textarea,
}: {
  id: string
  name: FieldName
  label: string
  hint?: string
  error?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  autoComplete?: string
  optional?: boolean
  textarea?: boolean
}) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined
  const common = {
    id,
    name,
    value,
    onChange,
    onBlur,
    placeholder: ' ',
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    required: !optional,
    className: cn(
      'peer w-full rounded-2xl border bg-white px-5 pb-3 pt-7 text-[0.9375rem] text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-transparent focus:shadow-[0_0_0_4px_rgba(58,107,255,0.25)]',
      error ? 'border-brand-red/70 focus:border-brand-red' : 'border-ink/15 hover:border-blue-300 focus:border-blue-600',
    ),
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        {textarea ? (
          <textarea {...common} rows={6} maxLength={MESSAGE_MAX + 200} className={cn(common.className, 'min-h-40 resize-y')} />
        ) : (
          <input {...common} type={type} autoComplete={autoComplete} />
        )}
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-5 top-[1.15rem] origin-left text-[0.9375rem] text-stone transition-all duration-300 ease-out-expo peer-focus:top-2.5 peer-focus:text-[0.6875rem] peer-focus:tracking-[0.08em] peer-focus:text-accent-strong peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[0.6875rem] peer-[:not(:placeholder-shown)]:tracking-[0.08em]"
        >
          {label}
        </label>
      </div>
      {hint && (
        <p id={hintId} className="px-1 text-xs text-stone">
          {hint}
        </p>
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="px-1 text-xs text-[#b4232a]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function SuccessMark() {
  return (
    <svg viewBox="0 0 52 52" className="h-16 w-16" aria-hidden="true">
      <motion.circle cx="26" cy="26" r="24" fill="none" stroke="var(--color-blue-600)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease: EASE_OUT }} />
      <motion.path d="M15 27 L23 34 L37 19" fill="none" stroke="var(--color-blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.5, ease: EASE_OUT }} />
    </svg>
  )
}

export function ContactForm() {
  const baseId = useId()
  const [values, setValues] = useState<ContactInput>(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')

  // Pre-fill the message from the CTA that brought the visitor here.
  useEffect(() => {
    const message = messageFromQuery(new URLSearchParams(window.location.search))
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the URL once on mount (keeps the page statically rendered)
    if (message) setValues((v) => (v.message ? v : { ...v, message }))
  }, [])

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    if (touched[e.target.name as FieldName]) setErrors(validateContact(next))
  }

  const onBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }))
    setErrors(validateContact(values))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'submitting') return
    const found = validateContact(values)
    setErrors(found)
    setTouched({ name: true, email: true, phone: true, message: true })
    const firstInvalid = (['name', 'email', 'phone', 'message'] as FieldName[]).find((f) => found[f])
    if (firstInvalid) {
      document.getElementById(`${baseId}-${firstInvalid}`)?.focus()
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success')
      setValues(EMPTY)
      setTouched({})
    } catch {
      setStatus('error')
    }
  }

  const shown = (f: FieldName) => (touched[f] ? errors[f] : undefined)

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-white bg-white p-6 shadow-[0_40px_80px_-55px_rgba(11,21,48,0.45)] sm:p-10">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-200/60 blur-3xl" />
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="relative flex min-h-[28rem] flex-col items-start justify-center gap-6"
          >
            <SuccessMark />
            <h3 className="text-display-md">Thank you.</h3>
            <p className="max-w-md text-lede text-stone">We&apos;ve received your message and will get back to you as soon as possible.</p>
            <button type="button" onClick={() => setStatus('idle')} className="link-underline text-sm text-ink">
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-col gap-5"
            aria-describedby={`${baseId}-privacy`}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={`${baseId}-name`} name="name" label="Name" autoComplete="name" value={values.name} error={shown('name')} onChange={onChange} onBlur={onBlur} />
              <Field
                id={`${baseId}-email`}
                name="email"
                type="email"
                label="Email"
                hint="So we can reply."
                autoComplete="email"
                value={values.email}
                error={shown('email')}
                onChange={onChange}
                onBlur={onBlur}
              />
            </div>
            <Field
              id={`${baseId}-phone`}
              name="phone"
              type="tel"
              label="Phone"
              hint="Optional — if you'd prefer a call."
              autoComplete="tel"
              optional
              value={values.phone}
              error={shown('phone')}
              onChange={onChange}
              onBlur={onBlur}
            />
            <Field
              id={`${baseId}-message`}
              name="message"
              label="Message"
              hint="Tell us a little about your plans."
              textarea
              value={values.message}
              error={shown('message')}
              onChange={onChange}
              onBlur={onBlur}
            />

            {/* Honeypot — hidden from people and assistive technology */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor={`${baseId}-website`}>Website</label>
              <input id={`${baseId}-website`} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.p role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl border border-brand-red/30 bg-brand-red/5 px-4 py-3 text-sm text-ink">
                  Something went wrong sending your message. Please email us directly:{' '}
                  <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                    {site.email}
                  </a>
                </motion.p>
              )}
            </AnimatePresence>

            <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p id={`${baseId}-privacy`} className="max-w-xs text-xs leading-relaxed text-stone">
                We use your details only to reply to your enquiry. See our{' '}
                <TransitionLink href="/privacy" className="underline underline-offset-4 hover:text-ink">
                  privacy notice
                </TransitionLink>
                .
              </p>
              <Button type="submit" size="lg" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
