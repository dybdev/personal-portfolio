import Image from "next/image";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { PortraitCard } from "@/components/portrait-card";
import { ProjectGallery } from "@/components/project-gallery";
import { portfolio, projects } from "@/content/portfolio";

export default function Home() {
  return (
    <main id="main">
      <section
        aria-labelledby="hero-title"
        className="mx-auto max-w-[1600px] px-gutter pt-12 pb-12 md:pt-20 md:pb-16"
      >
        <Reveal delay={0.08}>
          <div className="flex items-center justify-between gap-5 text-xs uppercase tracking-[0.14em]">
            <p className="flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-foreground" />
              Personal portfolio
            </p>
            <p className="text-foreground/70">Edition / {portfolio.year}</p>
          </div>
        </Reveal>
        <Reveal delay={0.24}>
          <h1
            id="hero-title"
            className="mt-10 max-w-6xl text-display leading-[0.99] font-medium tracking-[-0.075em] md:mt-14"
          >
            Thoughtful design.
            <br />
            <span className="text-secondary">Purposeful code.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.42}>
          <div className="mt-10 grid gap-9 md:mt-14 md:grid-cols-12 md:items-end">
            <a
              href="#work"
              className="group inline-flex min-h-12 w-fit items-center gap-6 text-sm md:col-span-5"
            >
              <span className="liquid-glass glass-hover relative flex size-12 items-center justify-center rounded-full">
                <ArrowDown aria-hidden="true" className="size-5" />
              </span>
              Explore the work
            </a>
            <p className="max-w-md text-base leading-7 md:col-span-5">
              A space for considered digital experiences.
              <br className="hidden lg:block" /> Simple in form. Intentional in
              every detail.
            </p>
            <span className="hidden justify-self-end text-xs text-foreground/70 md:col-span-2 md:block">
              SCROLL TO DISCOVER
            </span>
          </div>
        </Reveal>
        <Reveal
          delay={0.6}
          className="relative mt-12 overflow-hidden rounded-lg bg-surface md:mt-16"
        >
          <Image
            src="/images/cover.svg"
            alt=""
            width={1440}
            height={550}
            priority
            sizes="(max-width: 1600px) 90vw, 1440px"
            className="h-64 w-full object-cover md:h-auto"
          />
          <div className="absolute inset-x-6 bottom-5 flex justify-between text-primary text-xs uppercase tracking-[0.12em] md:inset-x-9 md:bottom-7">
            <span>Less, but considered.</span>
            <span>Form / Function</span>
          </div>
        </Reveal>
      </section>

      <section
        id="work"
        aria-labelledby="work-title"
        className="py-16 md:py-28"
      >
        <div className="mx-auto max-w-[1600px] px-gutter">
        <Reveal delay={0.06}>
          <SectionLabel number="01">Selected work</SectionLabel>
        </Reveal>
        <Reveal delay={0.2} className="mt-7 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            id="work-title"
            className="text-section leading-[1.05] font-medium tracking-[-0.06em]"
          >
            A few things,
            <br />
            made with intention<span className="text-secondary">.</span>
          </h2>
          <p className="max-w-64 text-sm leading-6 text-foreground/70">
            A collection in progress.
            <br />
            Selected work shown below.
          </p>
        </Reveal>
        </div>
        <ProjectGallery projects={projects} />
      </section>

      <section id="about" aria-labelledby="about-title" className="bg-surface">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-gutter py-20 md:grid-cols-12 md:gap-12 md:py-28">
          <div className="flex flex-col justify-between md:col-span-4">
            <div>
              <Reveal delay={0.06}>
                <SectionLabel number="02">Behind the work</SectionLabel>
              </Reveal>
            </div>
            <Reveal delay={0.22} className="mt-8 md:mt-12">
              <PortraitCard
                name={portfolio.name}
                image={portfolio.avatar}
                year={portfolio.year}
              />
            </Reveal>
          </div>
          <div className="flex flex-col justify-between md:col-span-8">
            <Reveal delay={0.18}>
              <h2
                id="about-title"
                className="max-w-3xl text-section leading-[1.08] font-medium tracking-[-0.06em]"
              >
                Good work starts
                <br />
                with a little curiosity<span className="text-secondary">.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.34}>
              <div className="mt-10 grid gap-7 text-base leading-8 lg:grid-cols-2">
                <p>{portfolio.introduction}</p>
                <p>{portfolio.approach}</p>
              </div>
              <p className="mt-5 text-xs text-foreground/70">
                Profile copy · placeholder
              </p>
            </Reveal>
            <Reveal delay={0.48}>
              <div className="mt-12 border-t border-foreground/15 pt-6">
                <p className="mb-4 text-xs uppercase tracking-[0.14em] text-foreground/70">
                  Areas to make your own
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Design", "Development", "Creative exploration"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-foreground/20 px-4 py-2.5 text-sm"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="note-title"
        className="mx-auto grid max-w-[1600px] gap-10 px-gutter py-20 md:grid-cols-12 md:py-28"
      >
        <div className="md:col-span-4">
          <Reveal delay={0.06}>
            <SectionLabel number="03">A work in progress</SectionLabel>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <Reveal delay={0.18}>
            <h2
              id="note-title"
              className="text-3xl leading-tight font-medium tracking-[-0.045em] md:text-5xl"
            >
              Always room for
              <br />
              the next good idea.
            </h2>
          </Reveal>
          <Reveal delay={0.34}>
            <p className="mt-6 max-w-lg text-base leading-8">
              This collection will grow with new projects, experiments, and
              perspectives. There’s more to come.
            </p>
          </Reveal>
          <Reveal delay={0.48}>
            <a
              href="#contact"
              className="liquid-glass glass-hover relative mt-7 inline-flex min-h-12 items-center gap-5 rounded-full px-6 py-3 text-sm"
            >
              Let’s connect
              <ArrowUpRight aria-hidden="true" className="size-5" />
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.56} className="hidden self-end justify-self-end md:col-span-1 md:block">
          <ArrowDownRight
            aria-hidden="true"
            strokeWidth={1}
            className="size-16"
          />
        </Reveal>
      </section>
    </main>
  );
}
