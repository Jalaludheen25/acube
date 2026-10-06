/** Contact form schema shared by the client form and the /api/contact route. */

export type ContactInput = {
  name: string
  email: string
  phone: string
  message: string
  /** Honeypot — real visitors never see or fill this field. */
  website?: string
}

export type ContactErrors = Partial<Record<'name' | 'email' | 'phone' | 'message', string>>

const MESSAGE_MIN = 10
export const MESSAGE_MAX = 2000

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {}
  const name = input.name.trim()
  const email = input.email.trim()
  const phone = input.phone.trim()
  const message = input.message.trim()

  if (name.length < 2 || name.length > 100) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(email) || email.length > 200) errors.email = 'Please enter a valid email address.'
  if (phone && !PHONE_RE.test(phone)) errors.phone = 'Please enter a valid phone number.'
  if (message.length < MESSAGE_MIN) errors.message = 'Please tell us a little more.'
  else if (message.length > MESSAGE_MAX) errors.message = 'That message is a little long.'

  return errors
}

export function normaliseContact(raw: unknown): ContactInput {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  const str = (v: unknown) => (typeof v === 'string' ? v : '')
  return {
    name: str(r.name),
    email: str(r.email),
    phone: str(r.phone),
    message: str(r.message),
    website: str(r.website),
  }
}
