"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";

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
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    // Keep server-rendered content visible and never replace the DOM wrapper.
    if (reduced || element.getBoundingClientRect().top < window.innerHeight) {
      controls.set({ opacity: 1, y: 0 });
      return;
    }
    controls.set({ opacity: 0, y });
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        void controls.start({ opacity: 1, y: 0 });
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px -40px 0px", threshold: 0.05 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      controls.stop();
    };
  }, [controls, reduced, y]);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={controls}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      onFocusCapture={() => {
        // Accessibility: instantly show content when focused via keyboard navigation
        controls.stop();
        controls.set({ opacity: 1, y: 0 });
      }}
    >
      {children}
    </motion.div>
  );
}
