"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent } from "react";

type PortraitCardProps = {
  name: string;
  image: string;
  year: string;
};

const spring = { stiffness: 220, damping: 26, mass: 0.6 };
const maxTilt = 7;

export function PortraitCard({ name, image, year }: PortraitCardProps) {
  const reducedMotion = useReducedMotion();
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (
      reducedMotion ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) return;

    // Measure the stationary wrapper so rotation never feeds back into the bounds.
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
    rotateX.set(-y * maxTilt);
    rotateY.set(x * maxTilt);
  }

  return (
    <div
      className="mx-auto w-full max-w-md [perspective:1000px]"
      onPointerMove={followPointer}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
    >
      <motion.figure
        style={{ rotateX: reducedMotion ? 0 : rotateX, rotateY: reducedMotion ? 0 : rotateY }}
        className="relative isolate overflow-hidden rounded-lg border border-foreground/20 bg-background p-3 motion-reduce:transform-none"
      >
        <div className="relative z-10 flex items-center justify-between gap-3 px-1 pt-1 pb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/70">
          <span>Personal profile</span>
          <Plus aria-hidden="true" className="size-4 text-foreground" strokeWidth={1.5} />
        </div>

        <div className="relative aspect-[4/4.3] overflow-hidden rounded-sm bg-surface">
          <Image
            src={image}
            alt={`Monochrome portrait of ${name}`}
            fill
            sizes="(max-width: 767px) min(90vw, 424px), (max-width: 1599px) 28vw, 424px"
            className="object-cover object-top grayscale"
          />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/images/card-texture.svg')] bg-[length:280px_360px] opacity-60 mix-blend-soft-light"
        />

        <figcaption className="relative z-10 px-2 pt-5 pb-2">
          <div className="flex items-end justify-between gap-3">
            <p className="min-w-0 break-words text-[clamp(1.5rem,3vw,2.5rem)] leading-none font-medium tracking-[-0.06em]">
              {name}<span className="text-secondary">.</span>
            </p>
            <span className="pb-0.5 text-[10px] uppercase tracking-[0.16em] text-foreground/70">{year}</span>
          </div>
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-foreground/15 pt-3 text-[9px] font-medium uppercase tracking-[0.16em] text-foreground/70">
            <span>Behind the work</span>
            <span>Portfolio</span>
          </div>
        </figcaption>
      </motion.figure>
    </div>
  );
}
