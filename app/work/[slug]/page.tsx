import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects, portfolio } from "@/content/portfolio";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project?.title ?? "Project not found",
    description: project?.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return (
    <main
      id="main"
      className="mx-auto max-w-[1600px] px-gutter pt-12 pb-20 md:pt-20 md:pb-28"
    >
      <Reveal delay={0.06}>
        <Link
          href="/#work"
          className="inline-flex min-h-11 items-center gap-3 text-sm"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to selected work
        </Link>
      </Reveal>
      <Reveal delay={0.18}>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.14em] text-foreground/70">
            Case study / {project.number}
          </p>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass glass-hover inline-flex min-h-10 items-center gap-2 rounded-full px-5 py-2 text-xs font-medium"
            >
              Visit live site
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          ) : null}
        </div>
      </Reveal>
      <Reveal delay={0.3}>
        <h1 className="mt-5 text-display leading-[1.05] font-medium tracking-[-0.07em]">
          {project.title}
        </h1>
      </Reveal>
      <Reveal delay={0.42}>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm">
          <span>{project.category}</span>
          {project.tags ? (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <span>{portfolio.year}</span>
          )}
        </div>
      </Reveal>
      <Reveal delay={0.56}>
        <Image
          src={project.image}
          alt={`${project.title} platform screenshot`}
          width={1200}
          height={900}
          priority
          sizes="(max-width: 1600px) 90vw, 1440px"
          className="mt-10 aspect-[4/3] w-full rounded-lg object-cover shadow-sm md:aspect-[16/9]"
        />
      </Reveal>
      <section className="grid gap-8 border-b border-foreground/15 py-16 md:grid-cols-12 md:py-24">
        <h2 className="text-sm md:col-span-4">01 — Overview</h2>
        <Reveal delay={0.18} className="md:col-span-8">
          <p className="max-w-3xl text-2xl leading-relaxed tracking-[-0.03em] md:text-3xl">
            {project.summary}
          </p>
          {project.overview ? (
            <p className="mt-6 text-base leading-8 text-foreground/80">
              {project.overview}
            </p>
          ) : (
            <p className="mt-6 text-sm leading-7 text-foreground/70">
              This is a case study template. Project imagery, scope, process, and
              outcomes will be added with the completed work.
            </p>
          )}
        </Reveal>
      </section>
      <section className="grid gap-8 py-16 md:grid-cols-12">
        <h2 className="text-sm md:col-span-4">02 — The process</h2>
        <Reveal delay={0.18} className="grid gap-8 md:col-span-8 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-medium">The challenge</h3>
            <p className="mt-4 text-base leading-8 text-foreground/80">
              {project.challenge ??
                "Add the original brief, the constraints you worked within, and the questions you set out to answer."}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium">The outcome</h3>
            <p className="mt-4 text-base leading-8 text-foreground/80">
              {project.outcome ??
                "Describe what you delivered and what you learned. Include only real, verified project results."}
            </p>
          </div>
        </Reveal>
      </section>
      <Reveal delay={0.15}>
        <Link
          href={`/work/${next.slug}`}
          className="group mt-6 flex min-h-24 items-center justify-between gap-6 border-t border-foreground/15 pt-8"
        >
          <span>
            <span className="text-xs uppercase tracking-[0.12em] text-foreground/70">
              Next project
            </span>
            <span className="mt-3 block text-2xl font-medium tracking-[-0.04em] md:text-4xl">
              {next.title}
            </span>
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-8 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </Reveal>
    </main>
  );
}
