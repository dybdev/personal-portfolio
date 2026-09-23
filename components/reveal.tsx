"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useAnimate, useInView, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.12 });
  const reduced = useReducedMotion();
  const played = useRef(false);

  useEffect(() => {
    if (!inView || reduced || played.current) return;
    played.current = true;
    const element = scope.current;
    const animation = animate(
      element,
      { opacity: [0, 1], y: [18, 0] },
      {
        duration: 0.45,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    );
    const finish = () => animation.complete();
    element.addEventListener("focusin", finish);
    return () => {
      animation.complete();
      element.removeEventListener("focusin", finish);
    };
  }, [inView, reduced, animate, scope, delay]);

  // Server-rendered content stays readable even before JavaScript loads.
  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
