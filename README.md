# dybdev portfolio

Next.js App Router, TypeScript, Tailwind CSS, locally hosted Montserrat, and Lucide icons. The project root is this directory.

## Development

```sh
pnpm install
pnpm dev
```

If pnpm is not installed globally, use `npx pnpm@10` in place of `pnpm`.

## Checks

```sh
pnpm lint
pnpm typecheck
pnpm build
```

## Personalize

- Edit `content/portfolio.ts` for profile copy, project information, and your real contact email. The contact link appears when an email is provided.
- Replace the deliberately neutral SVG project placeholders in `public/images/` with your own assets and update image paths and alt text.
- Replace the case study placeholder sections in `app/work/[slug]/page.tsx` with actual project content.
- Enable indexing in `app/layout.tsx` after replacing sample content. Set canonical metadata when your production domain is known.

No email delivery service or credentials are needed for the email link. No contact submission form is included.

Deploy with standard Next.js settings on Vercel, using this directory as the root. The local `SKILL.md` is the portfolio design authority referred to as `Portfolio-SKILL.md` by `AGENTS.md`.

## Motion and themes

The header contracts into a compact floating glass bar after scrolling and expands near the top. Buttons and navigation use monochrome glass surfaces and hover highlights in both themes. This is an explicit user-requested exception to the original no-glass design guidance. Reduced motion skips the header transition; reduced transparency and browsers without blur support receive opaque surfaces.

Motion for React (formerly Framer Motion, imported from `motion/react`) provides gentle scroll reveals. Anchor links use an eased Motion scroll that stops immediately when the visitor scrolls or presses a key; normal wheel and touch scrolling stay native.

The navbar sun/moon switch changes themes with a circular reveal from the bottom-left toward the top-right. The switch thumb and compact navbar use spring transitions; glass hover states have a small elastic lift and brighter rim highlights inspired by the supplied reference. View Transitions animate the actual page where supported; other browsers use a circular color wipe. The initial theme follows the system, then remembers an explicit choice in local storage. Reduced-motion mode disables reveals, animated scrolling, and the theme wipe. The original four base colors remain unchanged, with semantic tokens adapting page surfaces and text.
