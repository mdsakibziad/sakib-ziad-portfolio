import type { Metadata } from 'next';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';
import { generateBreadcrumbSchema } from '@/lib/seo-schemas';

export const metadata: Metadata = {
  title: 'Terms of Service | Sakib Ziad',
  description: 'Terms of service and advisory engagement terms for sakibziad.my.',
  alternates: {
    canonical: 'https://sakibziad.my/terms',
  },
};

export default function TermsPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Terms of Service', url: '/terms' },
  ]);

  return (
    <main className="section-pad bg-background">
      <StructuredData data={breadcrumbs} />
      <div className="container-luxury max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-fraunces text-ivory leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Terms of Service
          </h1>
          <p className="font-inter text-sm text-ivory/40">
            Last updated: September 2026
          </p>
        </div>

        <hr className="hr-glass mb-12" />

        {/* Content */}
        <div className="space-y-12 font-inter text-ivory/75 leading-relaxed">

          {/* 1. Acceptance of Terms */}
          <section>
            <h2 className="font-fraunces text-ivory text-xl mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using sakibziad.my (the "Site"), purchasing any digital product, enrolling in any membership tier, or engaging Sakib Ziad for consulting services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms in their entirety, you must not use this Site or its associated services.
            </p>
          </section>

          {/* 2. Services */}
          <section>
            <h2 className="font-fraunces text-ivory text-xl mb-4">
              2. Services
            </h2>
            <p className="mb-3">
              The Site offers the following categories of services:
            </p>
            <ul className="list-none space-y-4 pl-0">
              {[
                {
                  label: 'Consulting',
                  detail:
                    'Strategic advisory engagements for creative brands and founders. The scope, deliverables, and fees for consulting work are defined individually in a separate Statement of Work or engagement letter, which supplements but does not replace these Terms.',
                },
                {
                  label: 'Digital Products',
                  detail:
                    'Downloadable playbooks, templates, and strategy frameworks sold as standalone purchases. All digital products are delivered electronically and access is granted upon confirmed payment.',
                },
                {
                  label: 'Membership',
                  detail:
                    'A recurring subscription providing access to proprietary content, community resources, and member benefits as described on the membership page. Membership is personal and non-transferable.',
                },
              ].map(({ label, detail }) => (
                <li key={label} className="flex gap-3">
                  <span className="text-white/60 flex-shrink-0 mt-1">—</span>
                  <span>
                    <span className="text-ivory font-medium">{label}:</span>{' '}
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* 3. Intellectual Property */}
          <section>
            <h2 className="font-fraunces text-ivory text-xl mb-4">
              3. Intellectual Property
            </h2>
            <p className="mb-3">
              All content published on this Site — including but not limited to written copy, strategic frameworks, visual design, digital products, course materials, and brand assets — is the sole intellectual property of Sakib Ziad and is protected by applicable copyright and intellectual property laws.
            </p>
            <p className="mb-3">
              Upon purchasing a digital product or membership, you are granted a limited, non-exclusive, non-transferable licence to use the materials for your own personal or business purposes. You may not:
            </p>
            <ul className="list-none space-y-2 pl-0">
              {[
                'Reproduce, redistribute, or resell any content or materials.',
                'Share access credentials or purchased materials with third parties.',
                'Use any content to create derivative works without written permission.',
                'Remove or obscure any copyright notices or attributions.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-white/60 flex-shrink-0 mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Payment and Refunds */}
          <section>
            <h2 className="font-fraunces text-ivory text-xl mb-4">
              4. Payment and Refunds
            </h2>
            <p className="mb-3">
              All prices are displayed in USD unless stated otherwise. Payment is processed through third-party providers; by completing a purchase you also agree to that provider's terms and conditions.
            </p>
            <p className="mb-3">
              Digital products and downloadable blueprints are non-refundable once accessed or downloaded due to their proprietary nature. Syndicate memberships may be cancelled at any time prior to the next billing cycle. Advisory and custom system builds are governed by their respective individual Statements of Work.
            </p>
            <p>
              For any payment disputes or billing questions, contact{' '}
              <a
                href="mailto:Sakib@witlyn.com"
                className="text-white underline underline-offset-4 hover:text-white/80 transition-colors duration-200"
              >
                Sakib@witlyn.com
              </a>
              .
            </p>
          </section>

          {/* 5. Limitation of Liability */}
          <section>
            <h2 className="font-fraunces text-ivory text-xl mb-4">
              5. Limitation of Liability
            </h2>
            <p className="mb-3">
              The information and services provided through this Site are offered in good faith but are not a guarantee of specific business results. You acknowledge that any outcomes arising from implementing strategic advice are dependent on factors beyond our control, including but not limited to market conditions, execution quality, and third-party variables.
            </p>
            <p>
              To the maximum extent permitted by applicable law, Sakib Ziad shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits or business opportunities, arising out of or related to your use of this Site or its services — even if advised of the possibility of such damages. Our total aggregate liability shall not exceed the amount paid by you for the applicable service in the three months preceding the claim.
            </p>
          </section>

          {/* 6. Governing Law */}
          <section>
            <h2 className="font-fraunces text-ivory text-xl mb-4">
              6. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any dispute arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of competent courts.
            </p>
          </section>

          {/* 7. Changes to Terms */}
          <section>
            <h2 className="font-fraunces text-ivory text-xl mb-4">
              7. Changes to Terms
            </h2>
            <p>
              We reserve the right to update or revise these Terms at any time. When we do, the "Last updated" date at the top of this page will be revised. Continued use of the Site or its services following any update constitutes your acceptance of the revised Terms. If a change materially affects your rights, we will make reasonable efforts to notify active subscribers by email.
            </p>
          </section>

          {/* 8. Contact */}
          <section>
            <h2 className="font-fraunces text-ivory text-xl mb-4">
              8. Contact
            </h2>
            <p>
              Questions about these Terms should be directed to:{' '}
              <a
                href="mailto:Sakib@witlyn.com"
                className="text-white underline underline-offset-4 hover:text-white/80 transition-colors duration-200"
              >
                Sakib@witlyn.com
              </a>
            </p>
          </section>
        </div>

        {/* Legal Review Notice */}
        <div className="mt-16 p-6 border border-white/15 bg-white/[0.02] backdrop-blur-md rounded-xl">
          <p className="font-inter text-sm text-ivory/60 leading-relaxed">
            <span className="text-white font-medium">Notice:</span> These terms are provided for structural reference. Please review with your legal counsel for specific jurisdictional compliance prior to commercial operation.
          </p>
        </div>

        {/* Back Link */}
        <div className="mt-12">
          <Link
            href="/"
            className="font-inter text-sm text-ivory/50 hover:text-white transition-colors duration-200 inline-flex items-center gap-2"
          >
            <span aria-hidden>←</span>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
