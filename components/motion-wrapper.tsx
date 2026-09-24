'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts. Default: 0 */
  delay?: number;
  /** Direction from which the element enters. Default: 'up' */
  direction?: Direction;
  /** Fraction of the element that must be visible before triggering. Default: 0.15 */
  amount?: number;
  /** Whether the animation fires only once on first enter. Default: true */
  once?: boolean;
}

function getInitialOffset(direction: Direction): { x?: number; y?: number } {
  switch (direction) {
    case 'up':
      return { y: 24 };
    case 'down':
      return { y: -24 };
    case 'right':
      return { x: 32 };
    case 'left':
      return { x: -32 };
    case 'none':
    default:
      return {};
  }
}

const easing = [0.22, 1, 0.36, 1] as const;

export default function MotionWrapper({
  children,
  className,
  delay = 0,
  direction = 'up',
  amount = 0.15,
  once = true,
}: MotionWrapperProps) {
  const offset = getInitialOffset(direction);

  const variants = {
    hidden: {
      opacity: 0,
      ...offset,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={{
        duration: 0.8,
        ease: easing,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
