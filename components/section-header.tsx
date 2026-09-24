'use client';

import { cn } from '@/lib/utils';
import MotionWrapper from './motion-wrapper';

interface SectionHeaderProps {
  eyebrow: string;
  headline: string;
  sub?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  headline,
  sub,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        centered && 'items-center text-center',
        className,
      )}
    >
      {/* Eyebrow */}
      <MotionWrapper delay={0} direction="up" amount={0.2}>
        <p className="eyebrow">{eyebrow}</p>
      </MotionWrapper>

      {/* Headline */}
      <MotionWrapper delay={0.1} direction="up" amount={0.2}>
        <h2
          className="font-fraunces text-ivory leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          {headline}
        </h2>
      </MotionWrapper>

      {/* Optional sub */}
      {sub && (
        <MotionWrapper delay={0.2} direction="up" amount={0.2}>
          <p
            className={cn(
              'font-inter text-ivory/50 leading-relaxed',
              'text-base sm:text-lg',
              centered ? 'max-w-2xl' : 'max-w-xl',
            )}
          >
            {sub}
          </p>
        </MotionWrapper>
      )}
    </div>
  );
}
