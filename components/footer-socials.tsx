import { socials } from "@/content/portfolio";
import { SocialIcon } from "@/components/social-icon";

export function FooterSocials() {
  return (
    <nav aria-label="Social profiles" className="flex flex-wrap items-center gap-3">
      {socials.map((social) => {
        const className = "group inline-flex min-h-14 items-center rounded-full border border-foreground/15 bg-background text-foreground transition-colors duration-200 hover:border-foreground/40 focus-visible:border-foreground/40";
        const content = <>
          <span className="flex size-14 shrink-0 items-center justify-center [&_svg]:size-5"><SocialIcon label={social.label} /></span>
          <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] [@media(hover:none)]:grid-cols-[1fr]">
            <span className="min-w-0 overflow-hidden">
              <span className="flex -translate-x-3 items-center whitespace-nowrap pr-5 text-sm font-medium opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-x-0 [@media(hover:none)]:opacity-100">
                {social.label}{!social.href && <span className="ml-2 text-[10px] font-normal text-foreground/60">Coming soon</span>}
              </span>
            </span>
          </span>
        </>;
        return social.href ? (
          <a key={social.label} href={social.href} aria-label={`${social.label} (opens in a new tab)`} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
        ) : (
          <span key={social.label} role="link" aria-disabled="true" aria-label={`${social.label}: coming soon`} tabIndex={0} className={className}>{content}</span>
        );
      })}
    </nav>
  );
}
