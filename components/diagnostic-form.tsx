'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  brandName: string;
  websiteUrl: string;
  instagramHandle: string;
  primaryChallenge: string;
}

interface DiagnosticFormProps {
  className?: string;
}

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

function FieldLabel({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-inter text-xs font-medium tracking-widest uppercase text-ivory/40 mb-2"
    >
      {children}
      {optional && (
        <span className="ml-2 normal-case tracking-normal text-ivory/25 font-normal">
          (optional)
        </span>
      )}
    </label>
  );
}

const sharedInputClass = `
  w-full bg-transparent border border-ivory/10
  font-inter text-sm text-ivory placeholder:text-ivory/20
  px-4 py-3.5 rounded-none
  outline-none
  transition-colors duration-200
  focus:border-gold focus:ring-0
  hover:border-ivory/20
`.trim();

/* ─────────────────────────────────────────────
   Loading dots
───────────────────────────────────────────── */

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1 ml-2" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1 h-1 rounded-full bg-current animate-pulse"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

const EMPTY_FORM: FormData = {
  brandName: '',
  websiteUrl: '',
  instagramHandle: '',
  primaryChallenge: '',
};

export default function DiagnosticForm({ className }: DiagnosticFormProps) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [status, setStatus] = useState<FormStatus>('idle');

  /* Controlled input handler */
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  /* Submit */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  /* Reset to idle/retry */
  function handleReset() {
    setStatus('idle');
  }

  /* ── Success state ── */
  if (status === 'success') {
    return (
      <div
        className={cn(
          'card-surface p-8 sm:p-12 flex flex-col items-start gap-6',
          className,
        )}
      >
        {/* Gold rule */}
        <div className="w-10 hr-gold" />

        <div className="space-y-3">
          <p className="font-fraunces text-ivory text-2xl sm:text-3xl leading-snug">
            Your Gap Report is on its way.
          </p>
          <p className="font-inter text-ivory/50 text-sm sm:text-base leading-relaxed max-w-md">
            Check your email in the next few minutes. This is your first look at
            what AI-native strategy can surface.
          </p>
        </div>

        <Link
          href="/contact"
          className="
            inline-flex items-center justify-center
            px-8 py-3.5
            font-inter text-sm font-medium tracking-wide
            bg-gold text-background
            transition-opacity duration-300 hover:opacity-80
          "
        >
          Book a Strategy Call
        </Link>
      </div>
    );
  }

  /* ── Error state ── */
  if (status === 'error') {
    return (
      <div
        className={cn(
          'card-surface p-8 sm:p-12 flex flex-col items-start gap-6',
          className,
        )}
      >
        <div className="w-10 hr-gold" />

        <div className="space-y-3">
          <p className="font-fraunces text-ivory text-2xl sm:text-3xl leading-snug">
            Something went wrong.
          </p>
          <p className="font-inter text-ivory/50 text-sm leading-relaxed">
            Please try again — your submission was not received.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="
            inline-flex items-center justify-center
            px-8 py-3.5
            font-inter text-sm font-medium tracking-wide
            border border-ivory/20 text-ivory/70
            transition-colors duration-300 hover:border-gold hover:text-gold
          "
        >
          Try Again
        </button>
      </div>
    );
  }

  /* ── Idle / Loading state (the form) ── */
  const isLoading = status === 'loading';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn('card-surface p-8 sm:p-12 space-y-8', className)}
    >
      {/* Row 1: Brand name + Website URL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Brand Name */}
        <div>
          <FieldLabel htmlFor="brandName">Brand Name</FieldLabel>
          <input
            id="brandName"
            name="brandName"
            type="text"
            required
            autoComplete="organization"
            placeholder="Acme Studio"
            value={form.brandName}
            onChange={handleChange}
            disabled={isLoading}
            className={cn(sharedInputClass, isLoading && 'opacity-50 cursor-not-allowed')}
          />
        </div>

        {/* Website URL */}
        <div>
          <FieldLabel htmlFor="websiteUrl">Website URL</FieldLabel>
          <input
            id="websiteUrl"
            name="websiteUrl"
            type="text"
            required
            autoComplete="url"
            placeholder="https://acmestudio.com"
            value={form.websiteUrl}
            onChange={handleChange}
            disabled={isLoading}
            className={cn(sharedInputClass, isLoading && 'opacity-50 cursor-not-allowed')}
          />
        </div>
      </div>

      {/* Row 2: Instagram handle */}
      <div>
        <FieldLabel htmlFor="instagramHandle" optional>
          Instagram Handle
        </FieldLabel>
        <input
          id="instagramHandle"
          name="instagramHandle"
          type="text"
          autoComplete="off"
          placeholder="@acmestudio"
          value={form.instagramHandle}
          onChange={handleChange}
          disabled={isLoading}
          className={cn(sharedInputClass, isLoading && 'opacity-50 cursor-not-allowed')}
        />
      </div>

      {/* Row 3: Primary challenge */}
      <div>
        <FieldLabel htmlFor="primaryChallenge">
          What is your biggest creative challenge right now?
        </FieldLabel>
        <textarea
          id="primaryChallenge"
          name="primaryChallenge"
          required
          rows={3}
          placeholder="Describe the friction, the gap, or the goal you haven't been able to crack…"
          value={form.primaryChallenge}
          onChange={handleChange}
          disabled={isLoading}
          className={cn(
            sharedInputClass,
            'resize-none leading-relaxed',
            isLoading && 'opacity-50 cursor-not-allowed',
          )}
        />
      </div>

      {/* Gold divider */}
      <div className="hr-gold" />

      {/* Submit */}
      <div className="flex items-center justify-between gap-6 flex-wrap">
        <button
          type="submit"
          disabled={isLoading}
          className="
            inline-flex items-center justify-center
            px-10 py-4
            font-inter text-sm font-medium tracking-wide
            bg-gold text-background
            transition-opacity duration-300
            hover:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {isLoading ? (
            <>
              Analyzing your brand
              <LoadingDots />
            </>
          ) : (
            'Get My Free Gap Report'
          )}
        </button>

        <p className="font-inter text-xs text-ivory/25 leading-relaxed max-w-xs">
          No spam. Your data is used only to generate your report and will never
          be sold.
        </p>
      </div>
    </form>
  );
}
