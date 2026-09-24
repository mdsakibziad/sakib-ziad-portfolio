'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Gold decorative line */}
      <div className="w-16 hr-gold mb-12" />

      {/* Content */}
      <div className="text-center max-w-lg">
        {/* Eyebrow / error code */}
        <p className="eyebrow text-gold mb-6 tracking-[0.2em]">404</p>

        {/* Headline */}
        <h1
          className="font-fraunces text-ivory mb-5 leading-tight"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}
        >
          This page doesn&rsquo;t exist.
        </h1>

        {/* Sub */}
        <p className="font-inter text-ivory/40 text-lg mb-12 leading-relaxed">
          But the work does.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="
              inline-flex items-center justify-center
              px-8 py-3.5 min-w-[168px]
              font-inter text-sm font-medium tracking-wide
              bg-gold text-background
              transition-opacity duration-300 hover:opacity-80
            "
          >
            Back to Home
          </Link>

          <Link
            href="/work"
            className="
              inline-flex items-center justify-center
              px-8 py-3.5 min-w-[168px]
              font-inter text-sm font-medium tracking-wide
              border border-ivory/20 text-ivory/70
              transition-colors duration-300 hover:border-gold hover:text-gold
            "
          >
            View the Work
          </Link>
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="w-16 hr-gold mt-12" />
    </main>
  );
}
