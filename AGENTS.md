# AGENTS.md

## Project Mission

Build and maintain a premium monochrome personal portfolio website.

The visual authority for this repository is:

- `Portfolio-SKILL.md`

Read that file before making design, layout, typography, styling, animation, or responsive decisions.

The supplied portfolio reference should be interpreted as a design-language reference, not as content to copy. Do not reproduce names, logos, photography, project titles, or written copy from the reference.

---

## Required Stack

Use the following unless the repository already establishes a compatible equivalent or the user explicitly requests a change:

- Next.js 15+
- App Router
- React
- TypeScript
- Tailwind CSS
- Motion for React for restrained animation
- Lucide React for icons
- `next/image` for images
- Local typed content first
- MDX for long-form content when needed
- Resend for a working contact form when email delivery is required
- Vercel as the default deployment target
- pnpm for a new repository

Do not add a CMS, database, authentication layer, global state library, or component framework unless a concrete requirement needs it.

If non-developer content management becomes a requirement, prefer Sanity.

---

## Design Authority

Use these exact base colors:

```css
:root {
  --color-primary: #222222;
  --color-secondary: #7B7B7B;
  --color-tertiary: #F8F8F8;
  --color-white: #FFFFFF;
}
```

No additional accent colors unless explicitly requested.

The intended visual character is:

- minimal
- editorial
- monochrome
- spacious
- typographically driven
- grid-conscious
- image-led
- restrained

Avoid gradients, heavy shadows, glass effects, excessive rounded cards, decorative UI, and visually noisy motion.

When uncertain, choose the simpler and more spacious solution.

---

## Working Method

Before editing code:

1. Inspect the repository structure.
2. Read `Portfolio-SKILL.md`.
3. Read `package.json`.
4. Identify the existing package manager.
5. Identify the current Next.js and Tailwind setup.
6. Reuse existing components and utilities where practical.
7. Determine whether the task affects responsive behavior, accessibility, SEO, or performance.

Do not replace working project infrastructure merely to make the code look cleaner.

---

## Implementation Priorities

Work in this order:

1. Correct structure and semantics.
2. Accurate layout and hierarchy.
3. Responsive behavior.
4. Typography.
5. Imagery.
6. Interaction states.
7. Motion.
8. Polish.

Do not spend time on decorative animation while core layout or responsiveness is incomplete.

---

## Recommended App Structure

Use a structure similar to this when creating a new portfolio:

```text
app/
├── layout.tsx
├── page.tsx
├── about/
├── work/
│   └── [slug]/
└── blog/
    └── [slug]/

components/
├── layout/
├── sections/
└── ui/

content/
├── projects.ts
├── experience.ts
└── articles.ts

public/
└── images/

lib/
```

Treat this as guidance, not a requirement to create empty directories.

---

## Component Strategy

Prefer small, purposeful components.

Typical components:

- `SiteHeader`
- `Hero`
- `SectionLabel`
- `AboutGrid`
- `MetricCard`
- `ProjectCard`
- `ProjectGrid`
- `ExperienceList`
- `PromoBanner`
- `ArticleCard`
- `ContactCTA`
- `SiteFooter`

Do not fragment simple markup into unnecessary components.

Prefer composition over large configuration-heavy components.

---

## Server and Client Components

Default to Server Components.

Use `"use client"` only when the component genuinely requires:

- browser state
- event handlers
- browser APIs
- client-side Motion behavior

Keep client boundaries as low in the component tree as possible.

Do not convert an entire page to a Client Component only to support one animated child.

---

## Content Model

Keep portfolio content separate from presentational components.

Example:

```ts
export type Project = {
  slug: string
  title: string
  category: string
  year: string
  image: string
  summary?: string
  href?: string
}
```

Avoid hard-coding repeated project data directly into card markup.

Use MDX for rich case studies or writing when plain typed objects become insufficient.

---

## Tailwind and CSS

Tailwind is the primary styling mechanism.

Use CSS variables for the shared portfolio design tokens.

Global CSS should be limited to concerns such as:

- design tokens
- font setup
- resets/base behavior
- selection styles
- reduced-motion behavior
- global focus conventions

Avoid creating a parallel CSS architecture beside Tailwind.

Avoid arbitrary values when a recurring token should exist instead.

---

## Typography

Use a clean modern sans-serif, with this fallback direction:

```css
font-family:
  Inter,
  "Helvetica Neue",
  Helvetica,
  Arial,
  sans-serif;
```

Prefer responsive `clamp()` sizing for major headings.

Headings should be large but not excessively bold.

Use tight tracking for display text and comfortable line-height for body copy.

Do not shrink mobile body copy below a comfortable reading size.

---

## Layout

Use a disciplined grid.

Desktop:
- 12-column logic where useful.
- Asymmetric compositions are encouraged.
- Project imagery should carry visual weight.
- Section spacing should feel generous.

Tablet:
- Simplify complex compositions.
- Prefer two-column layouts where appropriate.

Mobile:
- Primary content should become one column.
- Maintain at least ~20px side gutters.
- Avoid horizontal scrolling.
- Preserve visual hierarchy rather than merely shrinking desktop.

---

## Images

Use `next/image` where appropriate.

For portfolio media:

- choose deliberate aspect ratios
- use `object-cover`
- provide meaningful alt text for informative imagery
- use empty alt text for decorative imagery
- set responsive `sizes`
- reserve `priority` for genuine above-the-fold media

Prefer real project assets when they exist.

Do not use random stock imagery when a neutral placeholder or actual project media is more appropriate.

---

## Motion

Motion must remain subtle.

Appropriate:
- small reveal transitions
- small image scaling on hover
- arrow movement
- opacity transitions
- short vertical translations

Typical duration:
- about 180–300ms for interaction states

Always respect `prefers-reduced-motion`.

Do not add:
- scroll hijacking
- heavy parallax
- long intro sequences
- constant looping decorative animations
- large cursor-follow effects

---

## Accessibility Requirements

Every implementation must include:

- semantic landmarks
- logical heading hierarchy
- keyboard-accessible navigation
- visible `:focus-visible` states
- adequate contrast
- descriptive link text
- correct image alt behavior
- reduced-motion support
- no color-only communication
- usable 200% zoom behavior
- sensible touch target sizes

Accessibility fixes take precedence over purely decorative fidelity.

---

## Performance Rules

Keep the portfolio mostly static and light.

- Minimize Client Components.
- Minimize third-party scripts.
- Optimize images.
- Lazy-load below-the-fold media.
- Avoid unnecessary dependencies.
- Prevent layout shift.
- Avoid shipping animation code to sections that do not animate.
- Do not add autoplay video unless requested.

---

## SEO Rules

Use the Next.js Metadata API.

For public pages:

- provide a unique title
- provide a useful description
- maintain semantic heading order
- define Open Graph metadata when assets exist
- add canonical metadata when the production domain is known

Do not invent business claims, awards, testimonials, employers, or project outcomes for SEO copy.

---

## Forms

If a contact form is required:

- use a Server Action or Route Handler
- validate on the server
- use Resend when email delivery is requested
- keep API keys server-only
- provide success and error feedback
- include basic anti-spam protection suitable for the deployment

Do not add a database solely for a contact form unless storing submissions is explicitly required.

---

## Dependency Policy

Before installing a package, ask:

1. Is this functionality already available in Next.js, React, Tailwind, or the browser?
2. Is the dependency worth its bundle/maintenance cost?
3. Does the repository already use another package for the same purpose?

Avoid duplicate libraries.

Do not add by default:

- Redux
- Zustand for trivial state
- shadcn/ui
- Material UI
- Chakra UI
- styled-components
- Emotion
- GraphQL
- Prisma
- a database
- authentication
- multiple icon libraries
- multiple animation libraries

---

## Verification

After meaningful implementation work, run the checks provided by the repository.

Typical commands for a pnpm project:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Not every repository will define every command. Run only scripts that exist.

At minimum, verify:

- no TypeScript errors
- no lint regressions
- production build succeeds
- no obvious console errors
- no horizontal overflow
- navigation works
- responsive layouts work
- focus states are visible

If a command fails because of a pre-existing issue, distinguish that from a regression introduced by the current work.

---

## Visual QA

Compare the result against `Portfolio-SKILL.md`.

Check:

- palette is limited to the approved monochrome tokens
- hero hierarchy is strong
- whitespace is generous
- project imagery is prominent
- grids align consistently
- radii are restrained
- shadows are absent or nearly invisible
- typography feels editorial rather than app-like
- mobile layout feels designed, not collapsed
- dark footer provides a strong closing anchor
- motion remains quiet
- no section feels unnecessarily boxed in

---

## Content Integrity

Never invent factual personal portfolio content.

If real content has not been supplied, use clearly generic placeholders such as:

- `Project Name`
- `Design Studio`
- `2026`
- `Short project description`

Do not fabricate:
- client names
- awards
- revenue metrics
- employers
- testimonials
- credentials
- contact details

Placeholder copy should be easy to identify and replace.

---

## Change Discipline

When modifying an existing page:

- preserve working routes unless the task requires route changes
- preserve existing data contracts where practical
- avoid unrelated refactors
- remove dead code created by your own changes
- keep diffs focused
- do not silently change the tech stack

If implementation requires a significant architectural deviation from this file or `Portfolio-SKILL.md`, document the reason in the final summary.

---

## Completion Standard

A task is complete when:

- the requested functionality exists
- the implementation follows `Portfolio-SKILL.md`
- the layout is responsive
- accessibility basics are satisfied
- relevant validation commands pass
- no unnecessary dependency or architecture was introduced
- the final result is visually coherent with the supplied portfolio reference
