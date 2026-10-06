import { site } from '@/content/site'
import { normaliseContact, validateContact, type ContactInput } from '@/lib/contact'

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const MAX_BODY_BYTES = 10_000

/** Best-effort, per-instance rate limit. Use an edge/KV limiter for strict guarantees. */
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
}

async function deliver(input: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL ?? site.email
  const from = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[contact] Email delivery not configured — submission logged instead:', { ...input, website: undefined })
      return true
    }
    console.error('[contact] RESEND_API_KEY / CONTACT_FROM_EMAIL are not set; cannot deliver enquiry.')
    return false
  }

  const rows: [string, string][] = [
    ['Name', input.name],
    ['Email', input.email],
    ['Phone', input.phone || '—'],
    ['Message', input.message],
  ]
  const html = `<h2 style="font-family:Georgia,serif">New website enquiry</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td valign="top"><strong>${k}</strong></td><td>${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`)
    .join('')}</table>`
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: input.email,
      subject: `Website enquiry — ${input.name}`,
      html,
      text,
    }),
  })
  if (!res.ok) console.error('[contact] Resend responded with', res.status, await res.text().catch(() => ''))
  return res.ok
}

export async function POST(request: Request) {
  const length = Number(request.headers.get('content-length') ?? 0)
  if (length > MAX_BODY_BYTES) return Response.json({ ok: false, error: 'too_large' }, { status: 413 })

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
  if (rateLimited(ip)) return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 })

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const input = normaliseContact(raw)
  // Honeypot filled — pretend success so bots learn nothing.
  if (input.website) return Response.json({ ok: true })

  const errors = validateContact(input)
  if (Object.keys(errors).length) return Response.json({ ok: false, error: 'validation', fields: errors }, { status: 400 })

  const clean: ContactInput = {
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    message: input.message.trim(),
  }

  try {
    const sent = await deliver(clean)
    if (!sent) return Response.json({ ok: false, error: 'delivery_failed' }, { status: 502 })
  } catch (err) {
    console.error('[contact] delivery error', err)
    return Response.json({ ok: false, error: 'delivery_failed' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
