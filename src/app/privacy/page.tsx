import { LegalPage } from '@/components/sections/LegalPage'
import { site } from '@/content/site'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Privacy Notice',
  description: 'How ACUBE handles the personal information you share through this website.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy notice." updated="5 October 2026">
      <h2>Who we are</h2>
      <p>
        This website is operated by {site.legalName} (&ldquo;ACUBE&rdquo;), {site.address.formatted}. You can reach us at{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>What we collect</h2>
      <p>When you send an enquiry through our contact form, we receive:</p>
      <ul>
        <li>your name and email address;</li>
        <li>your phone number, if you choose to provide it;</li>
        <li>the message you write to us.</li>
      </ul>
      <p>If you contact us by email, phone or WhatsApp, we receive the details you choose to share in that conversation.</p>

      <h2>How we use it</h2>
      <p>
        We use these details only to respond to your enquiry and to provide the services you ask us about. We do not sell your personal
        information or use it for advertising.
      </p>

      <h2>Service providers</h2>
      <p>
        Our website is hosted by a third-party hosting provider, and contact-form messages are delivered to our inbox through an email delivery
        service. Conversations on WhatsApp are also subject to WhatsApp&rsquo;s own terms and privacy policy.
      </p>

      <h2>Cookies</h2>
      <p>This website does not use advertising or analytics cookies. Fonts and images are served from our own website.</p>

      <h2>Keeping your information</h2>
      <p>We keep enquiry details for as long as needed to respond to you and to meet any legal obligations that apply to us.</p>

      <h2>Your choices</h2>
      <p>
        You can ask us to access, correct or delete the personal information you have shared with us by emailing{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Changes</h2>
      <p>We may update this notice from time to time. The date at the top of this page shows when it was last changed.</p>
    </LegalPage>
  )
}
