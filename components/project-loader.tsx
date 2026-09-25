"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/content/portfolio";

type ProjectLoaderProps = {
  project: Project | null;
  isOpen: boolean;
  onFinish?: () => void;
  onCancel?: () => void;
};

const DURATION_MS = 3800; // 3.8s within 3-5 seconds range

function LoaderContent({
  project,
  onFinish,
  onCancel,
}: {
  project: Project;
  onFinish?: () => void;
  onCancel?: () => void;
}) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Prefetch target page immediately so Next.js caches assets in background
    router.prefetch(`/work/${project.slug}`);

    // Prevent background scrolling while loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Handle ESC key to cancel
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onCancel) {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    startTimeRef.current = performance.now();

    const updateProgress = (currentTime: number) => {
      if (!startTimeRef.current) return;
      const elapsed = currentTime - startTimeRef.current;
      const raw = Math.min(1, elapsed / DURATION_MS);

      // Smooth custom easing: brisk start, steady optimization, punchy finish
      const eased =
        raw < 0.6
          ? (raw / 0.6) * 0.72 // 0% to 72% in first 60%
          : 0.72 + Math.pow((raw - 0.6) / 0.4, 1.4) * 0.28; // remaining to 100%

      const currentPct = Math.min(100, eased * 100);
      setProgress(currentPct);

      if (raw < 1) {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setIsFinishing(true);

        // Allow user to see 100% completion briefly before route transition
        setTimeout(() => {
          router.push(`/work/${project.slug}`);
          setTimeout(() => {
            onFinish?.();
          }, 300);
        }, 220);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [project, router, onFinish, onCancel]);

  const phrase = `OPTIMIZING ${project.title.toUpperCase()} // FETCHING ASSETS // PRODUCTION PREVIEW // `;
  const tickerText = phrase.repeat(4);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Loading project case study"
      className={`fixed inset-0 z-[200] flex flex-col justify-center items-center bg-background/96 backdrop-blur-xl transition-opacity duration-300 ${
        isFinishing ? "opacity-90" : "opacity-100"
      }`}
    >
      {/* Top status info */}
      <div className="w-full max-w-[1600px] px-gutter pb-6 flex items-end justify-between text-xs font-mono tracking-widest uppercase text-foreground/80">
        <div className="flex items-center gap-3">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-foreground opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-foreground" />
          </span>
          <span className="font-semibold text-foreground">
            FETCHING {project.number} — {project.title}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-foreground/60">OPTIMIZING PAGE VIEW</span>
          <span className="font-bold text-foreground tabular-nums">
            [{Math.min(100, Math.floor(progress)).toString().padStart(3, "0")}%]
          </span>
        </div>
      </div>

      {/* Full width screen line at the center of the screen */}
      <div className="relative w-full h-24 sm:h-28 md:h-36 border-y border-foreground/30 bg-foreground/[0.03] overflow-hidden flex items-center select-none shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        {/* Layer 1: Base Layer (Visible ahead of the progress line / when not loaded yet) */}
        <div className="w-full h-full flex items-center overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center">
            <span className="text-foreground/20 font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.05em] uppercase whitespace-nowrap pr-8">
              {tickerText}
            </span>
            <span className="text-foreground/20 font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.05em] uppercase whitespace-nowrap pr-8">
              {tickerText}
            </span>
          </div>
        </div>

        {/* Layer 2: Loaded Line (High-contrast progress wipe horizontally revealing continuous scrolling text) */}
        <div
          style={{ width: `${progress}%` }}
          className="absolute inset-y-0 left-0 overflow-hidden bg-foreground text-background shadow-[0_0_24px_rgba(0,0,0,0.25)]"
        >
          <div className="w-screen h-full flex items-center overflow-hidden">
            <div className="animate-marquee flex shrink-0 items-center">
              <span className="text-background font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.05em] uppercase whitespace-nowrap pr-8">
                {tickerText}
              </span>
              <span className="text-background font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.05em] uppercase whitespace-nowrap pr-8">
                {tickerText}
              </span>
            </div>
          </div>

          {/* Leading edge divider and progress marker */}
          <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-background">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 z-30 flex items-center justify-center min-w-10 rounded-sm bg-foreground text-background px-2 py-0.5 border border-background shadow-lg whitespace-nowrap">
              <span className="font-mono text-[10px] font-bold tracking-widest tabular-nums">
                {Math.min(100, Math.floor(progress))}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom status & cancel prompt */}
      <div className="w-full max-w-[1600px] px-gutter pt-6 flex items-start justify-between text-[11px] font-mono tracking-widest uppercase text-foreground/60">
        <div className="flex items-center gap-4">
          <span>STATUS: STREAMING HIGH-FIDELITY CASE STUDY</span>
          <span className="hidden md:inline text-foreground/40">
            • INITIALIZING 3D ASSETS & METRICS
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-foreground/40">PRESS ESC TO SKIP</span>
          <button
            type="button"
            onClick={onCancel}
            className="hover:text-foreground text-foreground/70 underline underline-offset-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProjectLoader({ project, isOpen, onFinish, onCancel }: ProjectLoaderProps) {
  if (!isOpen || !project) return null;
  return <LoaderContent project={project} onFinish={onFinish} onCancel={onCancel} />;
}
