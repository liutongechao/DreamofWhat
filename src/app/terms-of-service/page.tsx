import { Metadata } from 'next'
import { Container } from '@/components/Container'
import Link from 'next/link'
import { FadeIn } from '@/components/FadeIn'

export const metadata: Metadata = {
  title: 'Terms of Service - DreamofWhat',
  description:
    'These Terms of Service govern your use of DreamofWhat. Please read these terms carefully before using dreamofwhat.com.',
}

const TermsOfService = () => {
  return (
    <Container className="mt-24 rounded-4xl py-20 sm:mt-14 sm:py-32 lg:mt-24">
      <FadeIn>
        <div className="px-4 py-16">
          <h1 className="mb-8 font-display text-4xl font-semibold">
            Terms of Service
          </h1>
          <p className="mb-4">Effective date: October 20, 2024</p>

          <p className="mb-4">
            Welcome to <span className="font-display">DreamofWhat</span> ("we",
            "our", or "us"). These Terms of Service ("Terms") govern your use of
            our website{' '}
            <Link href="https://dreamofwhat.com" className="underline">
              dreamofwhat.com
            </Link>{' '}
            (the "Site"). By accessing or using the Site, you agree to be bound
            by these Terms. If you do not agree with these Terms, please do not
            use the Site.
          </p>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            1. Use of the Site
          </h2>
          <p className="mb-4">
            You may use the Site for lawful purposes only. You agree not to:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li>Violate any applicable laws or regulations.</li>
            <li>
              Infringe on the rights of others, including intellectual property
              rights.
            </li>
            <li>Submit false or misleading information.</li>
            <li>
              Interfere with the operation of the Site or its associated
              networks.
            </li>
            <li>
              Attempt to gain unauthorized access to the Site or any related
              systems or networks.
            </li>
          </ul>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            2. Intellectual Property
          </h2>
          <p className="mb-4">
            All content on the Site, including text, graphics, logos, images,
            and software, is the property of{' '}
            <span className="font-display">DreamofWhat</span> or its content
            suppliers and is protected by applicable intellectual property laws.
            You may not use, reproduce, distribute, or create derivative works
            based on the content without our prior written consent.
          </p>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            3. User-Generated Content
          </h2>
          <p className="mb-4">
            If you submit or post content on the Site, you grant us a
            non-exclusive, worldwide, royalty-free license to use, reproduce,
            modify, publish, and display such content in connection with the
            operation of the Site. You represent and warrant that you have the
            right to submit the content and that it does not violate the rights
            of any third party.
          </p>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            4. Termination
          </h2>
          <p className="mb-4">
            We reserve the right to terminate or suspend your access to the Site
            at any time, without notice, for conduct that we believe violates
            these Terms or is harmful to other users of the Site, us, or third
            parties.
          </p>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            5. Disclaimers
          </h2>
          <p className="mb-4">
            The Site and its content are provided "as is" without warranties of
            any kind, either express or implied. We do not warrant that the Site
            will be uninterrupted or error-free, or that any defects will be
            corrected. Your use of the Site is at your own risk.
          </p>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            6. Limitation of Liability
          </h2>
          <p className="mb-4">
            To the fullest extent permitted by law, we will not be liable for
            any damages, including direct, indirect, incidental, consequential,
            or punitive damages, arising out of or related to your use of or
            inability to use the Site.
          </p>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            7. Indemnification
          </h2>
          <p className="mb-4">
            You agree to indemnify and hold us harmless from any claims,
            damages, liabilities, costs, or expenses (including reasonable legal
            fees) arising out of or related to your use of the Site or your
            violation of these Terms.
          </p>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            8. Changes to These Terms
          </h2>
          <p className="mb-4">
            We reserve the right to modify these Terms at any time. Any changes
            will be effective immediately upon posting the updated Terms on the
            Site. Your continued use of the Site after such changes constitutes
            your acceptance of the new Terms.
          </p>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            9. Governing Law
          </h2>
          <p className="mb-4">
            These Terms will be governed by and construed in accordance with
            applicable laws, without regard to conflict of law principles.{' '}
          </p>

          <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">
            10. Contact Us
          </h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at{' '}
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

export default TermsOfService
