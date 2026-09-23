"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal, flushSync } from "react-dom";
import { animate } from "motion";
import { motion, useReducedMotion } from "motion/react";
import { Moon, Sun } from "lucide-react";

const storageKey = "dybdev-theme";
const themeEvent = "dybdev-theme-change";
const subscribeHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
type Theme = "light" | "dark";

function subscribe(callback: () => void) {
  window.addEventListener(themeEvent, callback);
  return () => window.removeEventListener(themeEvent, callback);
}
function snapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}
function serverSnapshot(): Theme {
  return "light";
}
function applyTheme(theme: Theme, persist = false) {
  document.documentElement.dataset.theme = theme;
  if (persist) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      /* Session-only when storage is blocked. */
    }
  }
  window.dispatchEvent(new Event(themeEvent));
}

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribeHydration,
    clientReady,
    serverReady,
  );
  const reduced = useReducedMotion();
  const theme = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [busy, setBusy] = useState(false);
  const locked = useRef(false);
  const overlay = useRef<HTMLDivElement>(null);
  const cancelTransition = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    const system = matchMedia("(prefers-color-scheme: dark)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(storageKey);
      } catch {
        /* Use system theme. */
      }
      applyTheme(
        saved === "dark" || saved === "light"
          ? saved
          : system.matches
            ? "dark"
            : "light",
      );
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) sync();
    };
    const cancel = () => cancelTransition.current?.();
    system.addEventListener("change", sync);
    window.addEventListener("storage", onStorage);
    reduced.addEventListener("change", cancel);
    return () => {
      cancel();
      system.removeEventListener("change", sync);
      window.removeEventListener("storage", onStorage);
      reduced.removeEventListener("change", cancel);
    };
  }, []);

  async function toggle() {
    if (locked.current) return;
    locked.current = true;
    setBusy(true);
    const next: Theme = snapshot() === "dark" ? "light" : "dark";
    const commit = () => flushSync(() => applyTheme(next, true));
    const root = document.documentElement;
    const radius = Math.hypot(window.innerWidth, window.innerHeight);
    const clips = ["circle(0px at 0% 100%)", `circle(${radius}px at 0% 100%)`];
    try {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        commit();
        return;
      }
      if (document.startViewTransition) {
        root.dataset.themeTransition = "active";
        const transition = document.startViewTransition(commit);
        cancelTransition.current = () => transition.skipTransition();
        await transition.ready;
        const animation = root.animate(
          { clipPath: clips },
          {
            duration: 700,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
            pseudoElement: "::view-transition-new(root)",
          },
        );
        cancelTransition.current = () => {
          animation.finish();
          transition.skipTransition();
        };
        await animation.finished;
        await transition.finished;
      } else if (overlay.current) {
        // A circular color wipe for browsers without snapshot transitions.
        const element = overlay.current;
        element.style.backgroundColor = next === "dark" ? "#222222" : "#FFFFFF";
        element.style.opacity = "1";
        const controls = animate(
          element,
          { clipPath: clips },
          { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        );
        cancelTransition.current = () => controls.complete();
        await controls;
        commit();
        const fade = animate(element, { opacity: 0 }, { duration: 0.15 });
        cancelTransition.current = () => fade.complete();
        await fade;
      } else {
        commit();
      }
    } catch {
      // Skipped snapshots (for example, tab changes) must never block switching.
      commit();
    } finally {
      delete root.dataset.themeTransition;
      if (overlay.current) {
        overlay.current.style.opacity = "0";
        overlay.current.style.clipPath = clips[0];
      }
      cancelTransition.current = undefined;
      locked.current = false;
      setBusy(false);
    }
  }

  return (
    <>
      {mounted &&
        createPortal(
          <div
            ref={overlay}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[100] opacity-0"
            style={{ clipPath: "circle(0px at 0% 100%)" }}
          />,
          document.body,
        )}
      <motion.button
        type="button"
        role="switch"
        aria-checked={theme === "dark"}
        onClick={toggle}
        disabled={busy}
        aria-label="Dark theme"
        title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        whileHover={reduced || busy ? undefined : { scale: 1.06 }}
        whileTap={reduced || busy ? undefined : { scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className="group relative h-11 w-[72px] shrink-0 cursor-pointer rounded-full text-foreground disabled:cursor-wait"
      >
        <span
          aria-hidden="true"
          className="liquid-glass absolute inset-x-0 inset-y-1.5 rounded-full"
        />
        <Sun
          aria-hidden="true"
          className="absolute top-3.5 left-2 size-4 opacity-60"
        />
        <Moon
          aria-hidden="true"
          className="absolute top-3.5 right-2 size-4 opacity-60"
        />
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ x: theme === "dark" ? 40 : 0 }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 450, damping: 30 }
          }
          className="absolute top-2 left-0.5 flex size-7 items-center justify-center rounded-full border border-white/80 bg-white text-primary shadow-[0_2px_8px_rgba(34,34,34,0.22),inset_0_1.5px_0.5px_#FFFFFF,inset_0_-1px_1px_rgba(0,0,0,0.08)] dark:border-white/30 dark:bg-[#f5f5f5] dark:shadow-[0_2px_10px_rgba(0,0,0,0.6),inset_0_1.5px_0.5px_#FFFFFF]"
        >
          {theme === "dark" ? (
            <Moon className="size-4" />
          ) : (
            <Sun className="size-4" />
          )}
        </motion.span>
      </motion.button>
      <span className="sr-only" role="status">
        {theme === "dark" ? "Dark" : "Light"} theme
      </span>
    </>
  );
}
