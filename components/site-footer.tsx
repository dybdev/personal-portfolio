import Link from "next/link";
import { ArrowUpRight, ArrowUp, Plus } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { FooterSocials } from "@/components/footer-socials";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="border-t border-foreground/15 bg-surface text-foreground"
    >
      <div className="mx-auto max-w-[1600px] px-gutter pb-7 pt-20 md:pt-28">
        <Reveal delay={0.06}>
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em]">
            <span className="size-1.5 rounded-full bg-foreground" />
            Have something in mind?
          </div>
        </Reveal>
        <div className="mt-10 grid gap-12 border-b border-foreground/20 pb-14 lg:grid-cols-2 lg:gap-20 md:pb-20">
        <Reveal delay={0.22}>
          <h2 className="text-section leading-[1.05] font-medium tracking-[-0.065em]">
            Let’s make
            <br />
            something matter<span className="text-secondary">.</span>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-8 text-foreground/70">
            A project, a question, or an idea worth exploring. Tell me what you have in mind.
          </p>
          {portfolio.email ? (
            <a
              href={`mailto:${portfolio.email}`}
              className="group mt-8 inline-flex min-h-12 max-w-full items-center gap-6 border-b border-foreground/60 pb-2 text-base break-all"
            >
              {portfolio.email}
              <ArrowUpRight
                aria-hidden="true"
                className="size-6 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          ) : null}
        </Reveal>
        <div className="pt-2"><ContactForm /></div>
        </div>
        <Reveal delay={0.36}>
          <div className="flex flex-wrap items-center justify-between gap-6 pt-8 text-xs">
            <Link
              href="/"
              className="flex min-h-11 items-center gap-2 text-xl font-semibold tracking-[-0.05em]"
            >
              <Plus aria-hidden="true" className="size-5" />
              {portfolio.name}.
            </Link>
            <FooterSocials />
            <a href="#top" className="inline-flex min-h-11 items-center gap-3">
              Back to top
              <ArrowUp aria-hidden="true" className="size-4" />
            </a>
          </div>
          <p className="mt-6 text-xs text-foreground/70">© {portfolio.year} {portfolio.name}. Personal portfolio.</p>
        </Reveal>
      </div>
    </footer>
  );
}
