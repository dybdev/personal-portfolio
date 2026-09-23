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
      <Link
        href="/#work"
        className="inline-flex min-h-11 items-center gap-3 text-sm"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to selected work
      </Link>
      <p className="mt-10 text-xs uppercase tracking-[0.14em] text-foreground/70">
        Sample case study / {project.number}
      </p>
      <Reveal>
        <h1 className="mt-5 text-display leading-[1.05] font-medium tracking-[-0.07em]">
          {project.title}
        </h1>
      </Reveal>
      <div className="mt-8 flex flex-wrap justify-between gap-4 text-sm">
        <span>{project.category}</span>
        <span>{portfolio.year}</span>
      </div>
      <Image
        src={project.image}
        alt={`Neutral graphic placeholder for ${project.title}`}
        width={1200}
        height={900}
        priority
        sizes="(max-width: 1600px) 90vw, 1440px"
        className="mt-10 aspect-[4/3] w-full rounded-lg object-cover md:aspect-[16/9]"
      />
      <section className="grid gap-8 border-b border-foreground/15 py-16 md:grid-cols-12 md:py-24">
        <h2 className="text-sm md:col-span-4">01 — Overview</h2>
        <Reveal className="md:col-span-8">
          <p className="max-w-3xl text-2xl leading-relaxed tracking-[-0.03em] md:text-3xl">
            {project.summary}
          </p>
          <p className="mt-6 text-sm leading-7 text-foreground/70">
            This is a case study template. Project imagery, scope, process, and
            outcomes will be added with the completed work.
          </p>
        </Reveal>
      </section>
      <section className="grid gap-8 py-16 md:grid-cols-12">
        <h2 className="text-sm md:col-span-4">02 — The process</h2>
        <Reveal className="grid gap-8 md:col-span-8 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-medium">The challenge</h3>
            <p className="mt-4 text-base leading-8">
              Add the original brief, the constraints you worked within, and the
              questions you set out to answer.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium">The outcome</h3>
            <p className="mt-4 text-base leading-8">
              Describe what you delivered and what you learned. Include only
              real, verified project results.
            </p>
          </div>
        </Reveal>
      </section>
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
    </main>
  );
}
