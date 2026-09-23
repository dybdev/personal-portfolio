"use client";

import { useEffect } from "react";
import { animate } from "motion";

export function SmoothScroll() {
  useEffect(() => {
    let stop: (() => void) | undefined;
    const cancel = () => {
      stop?.();
      stop = undefined;
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
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
        !url.hash ||
        url.hash === "#main"
      )
        return;
      let id: string;
      try {
        id = decodeURIComponent(url.hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      event.stopPropagation();
      cancel();
      link.closest("details")?.removeAttribute("open");
      const padding =
        parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop,
        ) || 0;
      const top = Math.max(
        0,
        Math.min(
          target.getBoundingClientRect().top + window.scrollY - padding,
          document.documentElement.scrollHeight - window.innerHeight,
        ),
      );
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
      if (reduced.matches) {
        window.scrollTo({ top, behavior: "instant" });
        finish();
        return;
      }
      const controls = animate(window.scrollY, top, {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (value) =>
          window.scrollTo({ top: value, behavior: "instant" }),
        onComplete: finish,
      });
      stop = () => controls.stop();
    };
    document.addEventListener("click", handleClick, true);
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    window.addEventListener("popstate", cancel);
    reduced.addEventListener("change", cancel);
    return () => {
      cancel();
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
      window.removeEventListener("popstate", cancel);
      reduced.removeEventListener("change", cancel);
    };
  }, []);
  return null;
}
