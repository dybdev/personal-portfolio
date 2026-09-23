"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { ArrowUpRight, Menu, Plus } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const [compact, setCompact] = useState(false);
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();
  const menu = useRef<HTMLDetailsElement>(null);

  useMotionValueEvent(scrollY, "change", (position) => {
    // Separate thresholds prevent flickering near the transition.
    setCompact((current) =>
      position > 88 ? true : position < 32 ? false : current,
    );
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => setCompact(window.scrollY > 88));
    const dismiss = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !menu.current?.contains(event.target)
      ) {
        menu.current?.removeAttribute("open");
      }
    };
    document.addEventListener("pointerdown", dismiss);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", dismiss);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="h-[100px] md:h-[116px]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-gutter">
        <motion.header
          initial={false}
          animate={{
            maxWidth: compact ? 720 : 1440,
            marginTop: compact ? 12 : 24,
            paddingInline: compact ? 14 : 8,
          }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 210, damping: 22, mass: 0.85 }
          }
          data-compact={compact}
          className="pointer-events-auto relative flex min-h-16 w-full items-center justify-between gap-2 rounded-full py-2 text-foreground md:gap-4"
        >
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{ opacity: compact ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
            className="liquid-glass pointer-events-none absolute inset-0 rounded-full"
          />
          <Link
            href="/"
            aria-label={`${portfolio.name} home`}
            className="relative inline-flex min-h-11 shrink-0 items-center gap-1 rounded-full px-1 text-lg font-semibold tracking-[-0.06em] md:gap-2 md:px-2 md:text-2xl"
          >
            <Plus aria-hidden="true" className="size-6" strokeWidth={2.5} />
            {portfolio.name}
            <span className="-ml-1 text-secondary">.</span>
          </Link>
          <nav
            aria-label="Main navigation"
            className="relative hidden items-center gap-1 text-sm md:flex"
          >
            {links.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="glass-hover group relative inline-flex min-h-11 items-center gap-2 rounded-full px-5"
              >
                {label}
                {label === "Contact" && (
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                )}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-2 pr-1 md:ml-0 md:pr-4">
            <ThemeToggle />
            <details
              ref={menu}
              className="md:hidden"
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  menu.current?.removeAttribute("open");
                  menu.current?.querySelector("summary")?.focus();
                }
              }}
            >
              <summary
                aria-label="Toggle navigation"
                className="glass-hover relative flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-full"
              >
                <Menu aria-hidden="true" className="size-5" />
              </summary>
              <nav
                aria-label="Mobile navigation"
                onClick={() => menu.current?.removeAttribute("open")}
                className="liquid-glass absolute inset-x-0 top-[calc(100%+0.75rem)] max-h-[60dvh] overflow-y-auto rounded-3xl p-3"
              >
                {links.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="glass-hover relative flex min-h-14 items-center justify-between rounded-2xl px-4 text-base"
                  >
                    {label}
                    <ArrowUpRight aria-hidden="true" className="size-5" />
                  </Link>
                ))}
              </nav>
            </details>
          </div>
        </motion.header>
      </div>
    </>
  );
}
