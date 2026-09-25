"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Reset scroll on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    // lerp: 0.075 gives that buttery smooth momentum sliding delay when scrolling
    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      smoothWheel: true,
      infinite: false,
      autoRaf: false,
      respectReducedMotion: true,
    });

    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;

      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;

      if (
        !link ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      )
        return;

      const url = new URL(link.href, location.href);
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search ||
        !url.hash
      )
        return;

      let id: string;
      try {
        id = decodeURIComponent(url.hash.slice(1));
      } catch {
        return;
      }

      if (id === "top") {
        event.preventDefault();
        event.stopPropagation();
        lenis.scrollTo(0, {
          duration: 1.3,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        if (location.hash !== url.hash) history.pushState(null, "", url.hash);
        return;
      }

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      event.stopPropagation();
      link.closest("details")?.removeAttribute("open");

      const padding =
        parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop,
        ) || 96;

      if (location.hash !== url.hash) history.pushState(null, "", url.hash);

      const finish = () => {
        const addedTabIndex = !target.hasAttribute("tabindex");
        if (addedTabIndex) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        if (addedTabIndex)
          target.addEventListener(
            "blur",
            () => target.removeAttribute("tabindex"),
            { once: true },
          );
      };

      lenis.scrollTo(target, {
        offset: -padding,
        duration: 1.3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: finish,
      });
    };

    document.addEventListener("click", handleClick, true);

    const handleReducedChange = () => {
      if (reduced.matches) {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        lenisRef.current = null;
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
    };
    reduced.addEventListener("change", handleReducedChange);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleClick, true);
      reduced.removeEventListener("change", handleReducedChange);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
