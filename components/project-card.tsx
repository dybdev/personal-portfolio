"use client";

import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { type PointerEvent, type MouseEvent } from "react";
import type { Project } from "@/content/portfolio";

type ProjectCardProps = {
  project: Project;
  isActive?: boolean;
  onActivate?: () => void;
  onSelect: (project: Project) => void;
};

const spring = { stiffness: 220, damping: 26, mass: 0.6 };
const maxTilt = 7;

export function ProjectCard({
  project,
  isActive = true,
  onActivate,
  onSelect,
}: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const glareX = useSpring(50, spring);
  const glareY = useSpring(50, spring);
  const glareOpacity = useSpring(0, { stiffness: 300, damping: 30 });

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  }

  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
    rotateX.set(-y * maxTilt);
    rotateY.set(x * maxTilt);

    const pctX = ((event.clientX - bounds.left) / bounds.width) * 100;
    const pctY = ((event.clientY - bounds.top) / bounds.height) * 100;
    glareX.set(pctX);
    glareY.set(pctY);
    glareOpacity.set(0.3);
  }

  function handleClick(event: MouseEvent) {
    if (event.metaKey || event.ctrlKey) return;
    event.preventDefault();
    if (!isActive) {
      onActivate?.();
    } else {
      onSelect(project);
    }
  }

  return (
    <div
      style={{
        flexGrow: isActive ? 1 : 0,
      }}
      className={`relative h-[490px] min-w-0 select-none [perspective:1000px] transition-[flex-grow,width,opacity] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] md:h-[530px] ${
        isActive
          ? "w-[84vw] opacity-100 sm:w-auto"
          : "w-[130px] opacity-75 hover:opacity-100 sm:w-auto"
      } shrink-0 sm:basis-[180px] md:basis-[220px] lg:basis-[240px] xl:basis-[260px]`}
      onPointerMove={followPointer}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
    >
      <motion.figure
        onClick={handleClick}
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-xl border bg-background p-4 shadow-sm transition-[border-color,box-shadow] duration-300 motion-reduce:transform-none cursor-pointer ${
          isActive
            ? "border-foreground/30 shadow-2xl hover:border-foreground/60"
            : "border-foreground/15 shadow-md hover:border-foreground/45 hover:shadow-xl"
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!isActive) onActivate?.();
            else onSelect(project);
          }
        }}
        aria-label={
          isActive
            ? `View ${project.title} project`
            : `Select ${project.title} showcase`
        }
      >
        {/* Top meta strip with pill-shape liquid glass badge */}
        <div className="relative z-10 flex h-8 shrink-0 items-center justify-between gap-2 px-0.5">
          <span className="liquid-glass inline-flex max-w-[130px] items-center truncate rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight text-foreground shadow-xs md:max-w-none">
            {project.category.split(" / ")[0]}
          </span>
          <div className="flex items-center gap-1.5 font-mono text-xs text-foreground/50">
            <span>#{project.number}</span>
            {isActive && (
              <Plus
                aria-hidden="true"
                className="size-3.5 text-foreground/70 transition-transform duration-300 group-hover:rotate-90 group-hover:text-foreground"
                strokeWidth={1.5}
              />
            )}
          </div>
        </div>

        {/* Project visual artwork - smooth morphing between wide landscape & portrait */}
        <div className="relative my-3 min-h-0 w-full flex-1 overflow-hidden rounded-lg bg-surface/50">
          <Image
            src={project.thumbnail}
            alt={`${project.title} thumbnail`}
            fill
            sizes="(min-width: 1280px) 820px, (min-width: 1024px) 740px, 90vw"
            className="object-cover transition-opacity duration-300"
            priority={isActive}
          />
        </div>

        {/* Paper texture overlay matching PortraitCard */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/images/card-texture.svg')] bg-[length:280px_360px] opacity-40 mix-blend-soft-light"
        />

        {/* Dynamic interactive glare reflection catching cursor position */}
        <motion.div
          aria-hidden="true"
          style={{
            opacity: reducedMotion ? 0 : glareOpacity,
            background: `radial-gradient(600px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22), transparent 50%)`,
          }}
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-200"
        />

        {/* Card caption */}
        <figcaption className="relative z-10 shrink-0 px-0.5 pt-1 pb-0.5">
          {isActive ? (
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-medium tracking-[-0.04em] text-foreground transition-colors duration-200 md:text-2xl">
                  {project.title}
                  <span className="text-secondary">.</span>
                </h3>
                <p className="mt-1 line-clamp-1 text-xs text-foreground/70">
                  {project.summary}
                </p>
              </div>
              {/* Rounded arrow right-pointed-up button */}
              <span className="liquid-glass glass-hover relative flex size-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:border-foreground/40">
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-1">
              <h3 className="truncate text-xs font-medium tracking-tight text-foreground/90">
                {project.title}
              </h3>
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 shrink-0 text-foreground/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          )}
        </figcaption>
      </motion.figure>
    </div>
  );
}
