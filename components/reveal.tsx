"use client";

import { useState, useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  y = 38,
}: RevealProps) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Before hydration on client or if reduced motion is requested, render standard content
  if (!mounted || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: "0px 0px -70px 0px",
        amount: 0.12,
      }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      onFocusCapture={(e) => {
        // Accessibility: instantly show content when focused via keyboard navigation
        const target = e.currentTarget;
        target.style.opacity = "1";
        target.style.transform = "none";
      }}
    >
      {children}
    </motion.div>
  );
}
