import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Sakib Ziad',
  description: 'Privacy policy for sakibziad.com',
};

export default function PrivacyPage() {
  return (
    <main className="section-pad bg-background">
      <div className="container-luxury max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-fraunces text-ivory leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Privacy Policy
          </h1>
          <p className="font-inter text-sm text-ivory/40">
            Last updated: [PLACEHOLDER: Date]
          </p>
        </div>

        <hr className="hr-gold mb-12" />

        {/* Content */}
        <div className="space-y-12 font-inter text-ivory/75 leading-relaxed">

          {/* 1. Information We Collect */}
          <section>
            <h2 className="font-fraunces text-ivory text-xl mb-4">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              We collect information you provide directly when you interact with this site. This includes:
            </p>
            <ul className="list-none space-y-2 pl-0">
              {[
                'Form submissions — name, email address, brand name, website URL, and any details you share through our diagnostic or contact forms.',
                'Email address — when you subscribe to newsletters or request reports via email opt-in.',
                'Analytics data — anonymised page-view data, referral source, and device type collected through Vercel Analytics or a similar privacy-respecting tool.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-gold flex-shrink-0 mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              We do not collect sensitive personal data such as payment card numbers directly; any purchases are handled through third-party processors with their own privacy standards.
            </p>
          </section>

          {/* 2. How We Use Information */}
          <section>
            <h2 className="font-fraunces text-ivory text-xl mb-4">
              2. How We Use Information
            </h2>
            <p className="mb-3">
              Information you provide is used solely for the purpose for which it was submitted:
            </p>
            <ul className="list-none space-y-2 pl-0">
              {[
                'Responding to inquiries and diagnostic form submissions.',
                'Sending your requested Gap Report or other digital deliverables.',
                'Delivering newsletters and strategic content you have opted into.',
                'Understanding how visitors engage with the site so we can improve it.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-gold flex-shrink-0 mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 3. Information Sharing */}
          <section>
            <h2 className="font-fraunces text-ivory text-xl mb-4">
              3. Information Sharing
            </h2>
            <p className="mb-3">
              We do not sell, trade, or rent your personal information to third parties. Your data may pass through the following trusted service providers solely as required to operate this site:
            </p>
            <ul className="list-none space-y-2 pl-0">
              {[
                'Resend — transactional email delivery for form confirmations and report delivery.',
                'Vercel — site hosting and serverless infrastructure. Vercel may log request metadata per their own privacy policy.',
                'Cal.com — calendar scheduling for strategy calls. Any data you enter on a booking page is subject to Cal.com\'s privacy policy.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-gold flex-shrink-0 mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              Each of these providers is contractually obligated to handle your data securely and only as instructed.
            </p>
          </section>

          {/* 4. Cookies */}
          <section>
            <h2 className="font-fraunces text-ivory text-xl mb-4">
              4. Cookies
            </h2>
            <p>
              This site uses minimal cookies for basic analytics purposes — such as understanding which pages are visited and where traffic originates. These cookies do not track you across other websites and are not used for advertising or remarketing. You may disable cookies in your browser settings; however, some functionality may be affected.
            </p>
          </section>

          {/* 5. Data Retention */}
          <section>
            <h2 className="font-fraunces text-ivory text-xl mb-4">
              5. Data Retention
            </h2>
            <p>
              We retain form submission data and email addresses for as long as reasonably necessary to fulfil the purpose for which they were collected — typically the duration of an active business relationship plus a reasonable period thereafter. You may request deletion of your data at any time by contacting us at the address below.
            </p>
          </section>

          {/* 6. Your Rights */}
          <section>
            <h2 className="font-fraunces text-ivory text-xl mb-4">
              6. Your Rights
            </h2>
            <p className="mb-3">
              Depending on your jurisdiction, you may have certain rights regarding your personal data, including:
            </p>
            <ul className="list-none space-y-2 pl-0">
              {[
                'The right to access the personal data we hold about you (GDPR Art. 15; CCPA).',
                'The right to correct inaccurate data (GDPR Art. 16).',
                'The right to erasure ("right to be forgotten") (GDPR Art. 17; CCPA).',
                'The right to object to or restrict processing (GDPR Art. 18–21).',
                'The right to data portability (GDPR Art. 20).',
                'The right to opt out of the sale of personal information (CCPA). Note: we do not sell personal information.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-gold flex-shrink-0 mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us using the details below.
            </p>
          </section>

          {/* 7. Contact */}
          <section>
            <h2 className="font-fraunces text-ivory text-xl mb-4">
              7. Contact
            </h2>
            <p>
              For any privacy-related questions, requests, or concerns, please reach out to:{' '}
              <a
                href="mailto:Sakib@witlyn.com"
                className="text-gold underline underline-offset-4 hover:text-gold/80 transition-colors duration-200"
              >
                Sakib@witlyn.com
              </a>
            </p>
          </section>
        </div>

        {/* Legal Review Notice */}
        <div className="mt-16 p-6 border border-gold/30 bg-surface rounded-sm">
          <p className="font-inter text-sm text-ivory/60 leading-relaxed">
            <span className="text-gold font-medium">Note:</span> This policy is a placeholder. Please review with a qualified legal professional before launch.
          </p>
        </div>

        {/* Back Link */}
        <div className="mt-12">
          <Link
            href="/"
            className="font-inter text-sm text-ivory/50 hover:text-gold transition-colors duration-200 inline-flex items-center gap-2"
          >
            <span aria-hidden>←</span>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
