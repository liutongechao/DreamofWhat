import { Metadata } from 'next'
import { Container } from '@/components/Container'
import Link from 'next/link'
import { FadeIn } from '@/components/FadeIn'

export const metadata: Metadata = {
  title: 'Privacy Policy - DreamofWhat',
  description:
    'At DreamofWhat, we value your privacy and are committed to protecting your personal data. Learn how we collect, use, and safeguard your information on dreamofwhat.com.',
}

export default function PrivacyPolicy() {
  return (
    <Container className="mt-24 rounded-4xl py-20 sm:mt-14 sm:py-32 lg:mt-24">
      <FadeIn>
        <div className="px-4 py-16">
          <h1 className="mb-8 font-display text-4xl font-semibold">
            Privacy Policy
          </h1>
          <p className="mb-4">Effective date: October 20, 2024</p>

          <p className="mb-4">
            Welcome to <span className="font-display">DreamofWhat</span>(“we”,
            “our”, or “us”). We value your privacy and are committed to
            protecting your personal data. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you
            visit our website{' '}
            <Link href="https://dreamofwhat.com" className="underline">
              dreamofwhat.com
            </Link>{' '}
            (the "Site").
          </p>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            1. Information We Collect
          </h2>
          <p className="mb-4">
            We may collect information about you in various ways. The
            information we may collect includes:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li>
              Personal Data: Such as your name, email address, and other details
              that you voluntarily provide when registering on our site or
              subscribing to newsletters.
            </li>
            <li>
              Usage Data: Information about how you access and use our website,
              such as your IP address, browser type, and referring URLs.
            </li>
            <li>
              Cookies: We may use cookies and similar tracking technologies to
              monitor site traffic and enhance your browsing experience.
            </li>
          </ul>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            2. How We Use Your Information
          </h2>
          <p className="mb-4">
            We may use the information we collect from you for purposes
            including, but not limited to:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li>To operate and maintain our website.</li>
            <li>To personalize your experience on our site.</li>
            <li>To respond to your inquiries and provide customer support.</li>
            <li>
              To send periodic emails and updates, if you have subscribed to our
              newsletter.
            </li>
            <li>To analyze site traffic and improve our services.</li>
          </ul>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            3. Sharing Your Information
          </h2>
          <p className="mb-4">
            We do not sell or rent your personal information to third parties.
            However, we may share your data with trusted third-party service
            providers that help us operate the website, perform statistical
            analysis, or provide customer support, as long as they agree to keep
            this information confidential.
          </p>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            4. Security of Your Information
          </h2>
          <p className="mb-4">
            We implement security measures designed to protect your personal
            information from unauthorized access, use, or disclosure. However,
            no security measures are perfect, and we cannot guarantee the
            absolute security of your information.
          </p>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            5. Your Data Rights
          </h2>
          <p className="mb-4">
            Depending on your location, you may have the right to request access
            to the personal information we hold about you, request corrections
            or deletion of your data, or opt out of data processing in certain
            circumstances. Please contact us at{' '}
            <a href="mailto:info@dreamofwhat.com" className="underline">
              info@dreamofwhat.com
            </a>{' '}
            to exercise your data rights.
          </p>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            6. Cookies and Tracking Technologies
          </h2>
          <p className="mb-4">
            Our website may use cookies and similar tracking technologies to
            enhance your experience. You can manage your cookie preferences
            through your browser settings. Disabling cookies may limit some
            features of the website.
          </p>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            7. Third-Party Links
          </h2>
          <p className="mb-4">
            Our site may contain links to third-party websites. We are not
            responsible for the privacy practices or content of such websites.
            We encourage you to review the privacy policies of these third-party
            sites before providing any personal information.
          </p>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            8. Changes to This Privacy Policy
          </h2>
          <p className="mb-4">
            We reserve the right to update this Privacy Policy from time to
            time. Any changes will be posted on this page, and we encourage you
            to review this Privacy Policy periodically. Your continued use of
            the Site following the posting of changes constitutes your
            acceptance of such changes.
          </p>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            9. Contact Us
          </h2>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at{' '}
            <a href="mailto:info@dreamofwhat.com" className="underline">
              info@dreamofwhat.com
            </a>
            .
          </p>

          <p className="mt-8">
            Return to{' '}
            <Link href="/" className="hover:underline">
              Home
            </Link>
            .
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
