"use client";

import {
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";

type ProjectShowcaseProps = {
  children: ReactNode;
  totalCount?: number;
  activeIndex: number;
  onChangeIndex: (index: number) => void;
  projects?: Array<{ slug: string; title: string }>;
};

export function ProjectShowcase({
  children,
  totalCount = 3,
  activeIndex,
  onChangeIndex,
  projects,
}: ProjectShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // On compact/mobile screens where cards overflow the track, scroll to active card
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (track.scrollWidth <= track.clientWidth) {
      track.scrollTo({ left: 0 });
      return;
    }

    const cards = Array.from(track.children) as HTMLElement[];
    const activeCard = cards[activeIndex];
    if (!activeCard) return;

    if (activeIndex === 0) {
      track.scrollTo({ left: 0, behavior: reducedMotion ? "auto" : "smooth" });
    } else if (activeIndex === totalCount - 1) {
      track.scrollTo({
        left: track.scrollWidth - track.clientWidth,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    } else {
      const target =
        activeCard.offsetLeft - (track.clientWidth - activeCard.clientWidth) / 2;
      track.scrollTo({
        left: Math.max(0, target),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }
  }, [activeIndex, totalCount, reducedMotion]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (activeIndex > 0) onChangeIndex(activeIndex - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (activeIndex < totalCount - 1) onChangeIndex(activeIndex + 1);
    }
  };

  const currentNum = String(activeIndex + 1).padStart(2, "0");
  const totalNum = String(totalCount).padStart(2, "0");

  return (
    <div
      className="mt-8 w-full md:mt-12"
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Featured projects carousel"
      tabIndex={0}
    >
      {/* Top Carousel Navigation Toolbar - perfectly aligned with bars and cards */}
      <div className="mx-auto mb-6 flex max-w-[1600px] items-center justify-between px-gutter">
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-foreground/70 uppercase">
          <span className="size-1.5 rounded-full bg-foreground" />
          <span>
            {currentNum} <span className="text-foreground/40">/</span> {totalNum}
          </span>
          <span className="hidden text-[10px] tracking-widest text-foreground/40 sm:inline">
            • Click card or bar to expand
          </span>
        </div>
      </div>

      {/* Carousel Track: Left edge aligns with the first bar, right edge with the last bar */}
      <div
        ref={containerRef}
        className="mx-auto max-w-[1600px] px-gutter overflow-hidden"
      >
        <div
          ref={trackRef}
          className="no-scrollbar flex w-full gap-6 overflow-x-auto scroll-smooth py-4 md:gap-7"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {children}
        </div>
      </div>

      {/* Separate Segmented Bars: Exactly aligned with the carousel track above */}
      <div className="mx-auto mt-6 flex max-w-[1600px] items-center gap-3 px-gutter">
        {Array.from({ length: totalCount }).map((_, idx) => {
          const projectTitle = projects?.[idx]?.title ?? `Showcase ${idx + 1}`;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onChangeIndex(idx)}
              aria-label={`Jump to ${projectTitle} (${idx + 1} of ${totalCount})`}
              className="group relative flex h-7 flex-1 cursor-pointer items-center py-2 focus:outline-none"
            >
              <div
                className={`h-[3px] w-full rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  idx === activeIndex
                    ? "bg-foreground shadow-xs"
                    : "bg-foreground/15 group-hover:bg-foreground/35"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
