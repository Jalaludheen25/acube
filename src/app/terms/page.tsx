import { LegalPage } from '@/components/sections/LegalPage'
import { site } from '@/content/site'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Terms of Use',
  description: 'Terms that apply to your use of the ACUBE website.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use." updated="5 October 2026">
      <h2>About these terms</h2>
      <p>
        These terms apply to your use of this website, operated by {site.legalName} (&ldquo;ACUBE&rdquo;). By using the website you agree to
        them.
      </p>

      <h2>Information on this website</h2>
      <p>
        The content on this website is general information about our services. It is not legal, tax or financial advice. Requirements, fees
        and timelines for business setup, licensing, visas and other government services depend on your circumstances and on the relevant
        authorities, and are confirmed during your consultation.
      </p>

      <h2>Enquiries</h2>
      <p>
        Sending an enquiry does not by itself create a client relationship. The scope and terms of any engagement are agreed with you
        directly.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The ACUBE name, logo and the content of this website belong to ACUBE or are used with permission. Photography is used under the
        Unsplash License. Please do not reuse our content without permission.
      </p>

      <h2>Links to other websites</h2>
      <p>This website links to third-party services such as Google Maps and WhatsApp. We are not responsible for their content or practices.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  )
}
