# ACUBE — Business Setup & Corporate Consultancy

Marketing website for **ACUBE Documents Services**, Bur Dubai, Dubai, UAE.

All copy, services, contact details and testimonials come from the previous ACUBE website. Nothing has been added beyond that content. See [Content rules](#content-rules).

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript |
| Styling | Tailwind CSS 4. Design tokens in `src/app/globals.css`: a light, cool-neutral palette (`paper`, `bone`, `sand`) with blue section surfaces (`bg-sky` for page tops, `bg-tint` light blue, `bg-ocean` deep-blue feature bands) with deep-navy ink type and a blue accent (`accent`, `accent-strong`, `accent-soft`, plus a full `blue-50…950` scale). `text-gradient` is reserved for large display type. The footer is deep navy. |
| Motion | Motion (`motion/react`) for scroll-triggered and interactive animation; CSS keyframes for above-the-fold entrances. Shared building blocks in `src/components/ui`: `Reveal*` (text and block reveals), `ImageReveal` (clip, parallax, grow), `CardFX` (pointer spotlight and tilt), `ExpandBackground` (section transitions), `DrawLine`, `Counter`, `Marquee`. |
| Smooth scroll | Lenis (disabled for reduced motion) |
| 3D | three.js + React Three Fiber, hero only, code-split and lazy-loaded |
| Fonts | Sora (headlines), Plus Jakarta Sans (body and UI), Instrument Serif italic (accent words only, via `font-accent`), Geist Mono (labels), all self-hosted through `next/font` |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (all pages are statically pre-rendered) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (flat config, `eslint-config-next`) |
| `npm run typecheck` | TypeScript, no emit |

Requires Node.js 20.9 or later.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Production** | Canonical origin, e.g. `https://www.acube.ae`. Used for canonical URLs, Open Graph, `sitemap.xml` and `robots.txt`. On Vercel it falls back to the production domain automatically. |
| `RESEND_API_KEY` | For the contact form | API key from [Resend](https://resend.com). |
| `CONTACT_FROM_EMAIL` | For the contact form | A sender on a domain verified in Resend, e.g. `ACUBE Website <website@acube.ae>`. |
| `CONTACT_TO_EMAIL` | Optional | Inbox for enquiries. Defaults to `acubedubai@gmail.com`. |

**Contact form behaviour.** `POST /api/contact` validates input (the same rules as the form), ignores bot submissions caught by a honeypot field, and rate-limits each IP. If email delivery isn't configured, development logs the enquiry to the terminal. Production returns an error instead, and the form then shows visitors the direct email address. Configure Resend before launch.

## Project structure

```
src/
  app/                    Routes (one folder per page), metadata, sitemap, robots, manifest, icons
    api/contact/          Contact form endpoint
    services/[slug]/      17 statically generated service pages
  components/
    home/                 Homepage sections (Hero, Intro, WhyAcube, UAEGateway, …)
    sections/             Shared page sections (PageHero, ProcessTimeline, CTASection, …)
    services/             Service cards, interactive presentation, finder, differentiators
    layout/               Navbar, MobileMenu, Footer, CustomCursor, WhatsApp button
    transition/           Page-transition curtain + TransitionLink
    three/                WebGL hero (CubeLattice) and SVG fallback
    ui/                   Primitives: Button/Magnetic, Reveal*, ImageReveal, Counter, Icons, …
  content/                All copy and data. Edit text here, not in components.
  lib/                    SEO helpers, contact validation, hooks, utilities
  assets/images/          Photography, mostly Dubai by day (optimised to AVIF/WebP at request time by next/image)
public/
  brand/                  Vector logo (light/dark) and cube mark
  og.jpg                  Social share image
```

## Editing content

| To change… | Edit |
| --- | --- |
| Phone numbers, email, address, WhatsApp, navigation | `src/content/site.ts` |
| Services, categories, inclusions, "Ideal for" | `src/content/services.ts` |
| Hero, mission, story, principles, process steps, structures | `src/content/company.ts` |
| Packages and the comparison table | `src/content/packages.ts` |
| Industries | `src/content/industries.ts` |
| Testimonials | `src/content/testimonials.ts` |
| FAQ (also feeds the FAQPage structured data) | `src/content/faqs.ts` |
| Photography | `src/assets/images/` + `src/content/images.ts` (alt text lives there). Each service and industry points at an image key in its content file. |

A new service needs only an entry in `services.ts`. Its page, sitemap entry, metadata and structured data are generated automatically.

## Content rules

- Don't add statistics, awards, clients, certifications, offices or claims that ACUBE hasn't confirmed. The only figure on the site is **20+ years of experience**, which comes from the previous website.
- The previous site's statistic blocks ("Businesses helped", "Free zones covered", and so on) and its team section were unfilled placeholders, so they have been left out. Add them to the content files once ACUBE provides real figures and bios.

## Before launch

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the live domain.
- [ ] Configure Resend (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`) and send a test enquiry.
- [ ] Have ACUBE confirm the testimonials are genuine and approved for publication. They are carried over from the previous site.
- [ ] Have ACUBE's adviser review `/privacy` and `/terms`. These pages are new (the previous site had none) and describe only what this website does.
- [ ] Add social profile links to `src/content/site.ts` if ACUBE has any (none existed on the previous site).

## Accessibility & performance notes

- **Reduced motion is respected everywhere.** Lenis, the custom cursor, parallax, pinned scrolling and the WebGL scene all switch off, and entrances become simple fades.
- **The WebGL hero is skipped on phones and low-power devices** (an SVG lattice is shown instead). It loads after the page's `load` event and pauses when off-screen. Its materials are procedural matcaps, so there's no environment pre-filtering or large shader compiles.
- **Above-the-fold entrances run in CSS**, so heroes paint without waiting for hydration. Everything else animates on scroll via Motion.
- **Lighthouse on the production build:** home scores 99 / 100 / 100 / 100 on desktop and 88 / 100 / 100 / 100 on mobile (Performance / Accessibility / Best Practices / SEO). Inner pages score 100 for accessibility, best practices and SEO, and 85–92 for mobile performance.

Photography credits: see [CREDITS.md](CREDITS.md).
