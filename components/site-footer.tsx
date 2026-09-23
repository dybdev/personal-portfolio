import Link from "next/link";
import { ArrowUpRight, ArrowUp, Plus } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { Reveal } from "@/components/reveal";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="border-t border-white/15 bg-primary text-white"
    >
      <div className="mx-auto max-w-[1600px] px-gutter pb-7 pt-20 md:pt-28">
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em]">
          <span className="size-1.5 rounded-full bg-white" />
          Have something in mind?
        </div>
        <Reveal className="mt-10 flex flex-col justify-between gap-8 border-b border-white/20 pb-14 md:flex-row md:items-end md:pb-20">
          <h2 className="text-section leading-[1.05] font-medium tracking-[-0.065em]">
            Let’s make
            <br />
            something matter<span className="text-secondary">.</span>
          </h2>
          {portfolio.email ? (
            <a
              href={`mailto:${portfolio.email}`}
              className="group inline-flex min-h-12 items-center gap-6 self-start border-b border-white/60 pb-2 text-base md:self-end"
            >
              {portfolio.email}
              <ArrowUpRight
                aria-hidden="true"
                className="size-6 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          ) : (
            <p className="max-w-64 text-sm leading-7 text-white/70">
              Contact details coming soon.
              <br />
              <span className="text-white/50">
                This portfolio is taking shape.
              </span>
            </p>
          )}
        </Reveal>
        <div className="flex flex-wrap items-center justify-between gap-6 pt-8 text-xs">
          <Link
            href="/"
            className="flex min-h-11 items-center gap-2 text-xl font-semibold tracking-[-0.05em]"
          >
            <Plus aria-hidden="true" className="size-5" />
            {portfolio.name}.
          </Link>
          <p className="text-white/60">
            © {portfolio.year} {portfolio.name}. Personal portfolio.
          </p>
          <a href="#top" className="inline-flex min-h-11 items-center gap-3">
            Back to top
            <ArrowUp aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
