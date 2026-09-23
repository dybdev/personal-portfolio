---
name: portfolio-design
description: Build and refine a premium monochrome personal portfolio website using the supplied visual reference and the exact color system below.
---

# Portfolio Design Skill

Use this skill whenever you create, edit, or review the personal portfolio website.

## Objective

Create a refined, editorial personal portfolio with a premium monochrome visual language. The design should feel minimal, spacious, structured, and presentation-led rather than template-heavy.

The supplied reference establishes the visual direction:
- Large typography and generous whitespace.
- Black, gray, off-white, and white only.
- Strong hierarchy with oversized section headings.
- Editorial grid layouts with asymmetric composition.
- Image-led portfolio cards.
- Thin borders, subtle dividers, and restrained rounded corners.
- Dense information is broken into calm, readable modules.
- Calls to action are small and understated.
- The page should feel like a designer's presentation board, not a conventional SaaS landing page.

Do not copy names, photos, text, logos, or project content from the reference. Recreate the design language, rhythm, and composition.

---

## Color System

These colors are authoritative.

```css
:root {
  --color-primary: #222222;
  --color-secondary: #7B7B7B;
  --color-tertiary: #F8F8F8;
  --color-white: #FFFFFF;
}
```

## Font 
Use montserrat font

### Usage

**Primary — `#222222`**
- Main text.
- Dark footer.
- Dark CTA surfaces.
- Icon strokes/fills.
- High-emphasis borders when required.

**Secondary — `#7B7B7B`**
- Metadata.
- Supporting copy.
- Dates.
- Labels.
- De-emphasized navigation or captions.

**Tertiary — `#F8F8F8`**
- Alternate section backgrounds.
- Card surfaces.
- Soft page bands.
- Subtle visual separation.

**White — `#FFFFFF`**
- Primary page background.
- Cards on gray sections.
- Text on dark surfaces.

Avoid introducing accent colors unless the user explicitly requests one.

---

## Required Tech Stack

Use this stack for the portfolio unless the user explicitly requests a change.

### Core

- **Next.js 15+**
- **App Router**
- **React**
- **TypeScript**
- **Tailwind CSS**

### Interaction

- **Motion for React** (`motion` / the current Framer Motion package) for restrained transitions, scroll reveals, and small interaction details.
- Prefer CSS transitions when animation does not require JavaScript.
- Do not introduce animation libraries beyond Motion without a clear requirement.

### Images

- Use `next/image` for local and supported remote images.
- Keep project imagery in `public/images/` when practical.
- Set useful `sizes` values for responsive images.
- Avoid unnecessary `priority`; reserve it for true above-the-fold imagery.

### Icons

- **Lucide React**
- Keep icons small, simple, and visually subordinate to typography.
- Do not mix icon libraries unless required.

### Content

Start with local, typed content:

```text
content/
├── projects.ts
├── experience.ts
└── articles.ts
```

Use **MDX** when long-form articles or case studies require rich content.

Do not add a CMS by default.

If the user needs non-developer content editing, prefer **Sanity** as the first CMS option.

### Forms / Email

When a working contact form is required:

- Use a **Next.js Server Action** or Route Handler.
- Use **Resend** for transactional email.
- Validate input server-side.
- Add spam protection appropriate to the deployment.
- Never expose API keys to the client.

### Deployment

Default deployment target:

- **Vercel**

The project must remain deployable with standard Next.js/Vercel conventions.

### Package Manager

Prefer **pnpm** for new projects.

If an existing repository already uses npm, yarn, or Bun, preserve the existing package manager rather than migrating without reason.

### Suggested Baseline Dependencies

```text
next
react
react-dom
typescript
tailwindcss
motion
lucide-react
```

Only add dependencies that materially reduce implementation complexity or provide required functionality.

### Architecture

Recommended structure:

```text
app/
├── layout.tsx
├── page.tsx
├── about/
├── work/
│   └── [slug]/
├── blog/
│   └── [slug]/
└── api/                 # only when Route Handlers are actually needed

components/
├── layout/
│   ├── SiteHeader.tsx
│   └── SiteFooter.tsx
├── sections/
│   ├── Hero.tsx
│   ├── AboutGrid.tsx
│   ├── ProjectGrid.tsx
│   ├── ExperienceList.tsx
│   ├── Insights.tsx
│   └── ContactCTA.tsx
└── ui/
    ├── SectionLabel.tsx
    └── ProjectCard.tsx

content/
├── projects.ts
├── experience.ts
└── articles.ts

public/
└── images/

lib/
└── utils.ts
```

Do not create folders merely to satisfy this example. Keep the actual repository as simple as the project permits.

### Rendering Strategy

- Prefer **Server Components**.
- Add `"use client"` only where browser state, event handlers, or Motion require it.
- Keep client component boundaries narrow.
- Prefer static generation for portfolio content.
- Use dynamic rendering only when the feature genuinely requires request-time data.

### TypeScript Rules

- Use strict TypeScript.
- Define shared content types explicitly.
- Avoid `any`.
- Prefer discriminated or narrow types over broad objects.
- Keep component props small and intentional.

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

### Tailwind Rules

- Use Tailwind for the majority of page styling.
- Encode the portfolio palette and recurring design values as theme tokens or CSS variables.
- Avoid long collections of arbitrary values when a reusable token makes sense.
- Use global CSS for root variables, font setup, selection styling, and truly global behavior.
- Do not create a second parallel styling system.

Recommended variables:

```css
:root {
  --color-primary: #222222;
  --color-secondary: #7B7B7B;
  --color-tertiary: #F8F8F8;
  --color-white: #FFFFFF;

  --page-max: 1440px;
  --content-max: 1240px;
  --gutter: clamp(20px, 4vw, 64px);
}
```

### Performance

Target a fast, mostly static portfolio.

- Minimize client JavaScript.
- Optimize images.
- Avoid autoplay video unless explicitly required.
- Lazy-load below-the-fold media.
- Avoid large animation bundles.
- Avoid third-party scripts unless necessary.
- Keep layout shift minimal.
- Preserve good Core Web Vitals.

### SEO

At minimum:

- Use Next.js Metadata APIs.
- Add a meaningful title and description.
- Provide canonical metadata when deployment/domain information is known.
- Add Open Graph metadata when assets are available.
- Use semantic headings and landmarks.
- Give every project page a unique title and description.
- Add structured data only when it represents real content.

### Do Not Add by Default

Do not introduce these unless the project requirements justify them:

- Redux or another global state library.
- A database.
- Authentication.
- A CMS.
- shadcn/ui or another full component system.
- Multiple animation libraries.
- A CSS-in-JS library.
- GraphQL.
- A separate backend service.
- Analytics or trackers.

This portfolio should remain deliberately lean.


## Visual Character

Aim for:
- Minimal.
- Editorial.
- Modernist.
- Quiet luxury.
- Swiss/grid-informed.
- High-contrast typography.
- Monochrome imagery.
- Generous negative space.
- Precise alignment.

Avoid:
- Gradients.
- Bright accent colors.
- Heavy drop shadows.
- Glassmorphism.
- Excessive pills.
- Over-rounded cards.
- Cartoonish icons.
- Dense dashboard-style layouts.
- Decorative animations that distract from the work.

---

## Typography

Use a clean neo-grotesk or modern sans-serif.

Preferred stack:

```css
font-family:
  Inter,
  "Helvetica Neue",
  Helvetica,
  Arial,
  sans-serif;
```

If the project already has a quality sans-serif, preserve it.

### Hierarchy

Use responsive `clamp()` values rather than hard-coded desktop-only sizing.

```css
--text-display: clamp(4rem, 10vw, 9rem);
--text-h1: clamp(3rem, 7vw, 6.5rem);
--text-h2: clamp(2.25rem, 5vw, 4.5rem);
--text-h3: clamp(1.4rem, 2.5vw, 2rem);
--text-body-lg: clamp(1rem, 1.5vw, 1.25rem);
--text-body: 1rem;
--text-small: 0.8125rem;
--text-micro: 0.6875rem;
```

### Typography rules

- Use tight display tracking: approximately `-0.03em` to `-0.05em`.
- Use normal or slightly tight body tracking.
- Default body line-height: `1.5–1.65`.
- Headlines should generally be regular/medium, not extra-bold.
- Use weight contrast sparingly.
- Section labels may use small text with a bullet/dot marker.
- Keep metadata compact and neutral.

---

## Layout System

### Page container

```css
--page-max: 1440px;
--content-max: 1240px;
--gutter: clamp(20px, 4vw, 64px);
```

Typical structure:

```css
.page {
  max-width: var(--page-max);
  margin-inline: auto;
}

.section-inner {
  width: min(calc(100% - (var(--gutter) * 2)), var(--content-max));
  margin-inline: auto;
}
```

### Grid

Use a 12-column desktop grid.

- Hero: asymmetric 5/7 or 6/6 split.
- About: 4/8, 5/7, or modular card collage.
- Project collections: 3-column or asymmetric masonry-like grid.
- Experience: structured rows with 3–4 information columns.
- Blog/cards: 3-column desktop, 1-column mobile.

Do not force every section into identical card grids. Preserve editorial variation.

### Spacing

Use a disciplined 8px-derived spacing system.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;
--space-9: 96px;
--space-10: 128px;
--space-11: 160px;
```

Section vertical padding should usually fall between `96px` and `160px` on desktop and scale down on mobile.

---

## Shape Language

Use restrained radii.

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-pill: 999px;
```

Guidance:
- Large portfolio images: `8–12px`.
- Small cards: `8–12px`.
- Pills only for tags/status metadata.
- Do not make every container rounded.

Borders:

```css
--border-subtle: 1px solid rgba(34, 34, 34, 0.10);
--border-medium: 1px solid rgba(34, 34, 34, 0.20);
```

Shadows should be absent or nearly invisible.

---

## Image Treatment

Images are a primary visual element.

Use:
- Art-directed crops.
- Large image planes.
- Neutral architectural/product/editorial imagery.
- Monochrome or desaturated portraits where appropriate.
- `object-fit: cover`.
- Thoughtful `object-position`.

Recommended aspect ratios:
- Hero portrait: `4 / 5` or taller.
- Wide featured project: `16 / 9`.
- Portfolio cards: `4 / 3`.
- Blog thumbnails: `4 / 3` or `3 / 2`.

Avoid:
- Random stock imagery.
- Inconsistent image ratios within a repeated component.
- Excessive overlays.
- Text baked into images.

When real project assets are available, prefer them over placeholders.

---

## Page Architecture

A strong default portfolio flow is:

1. Header / navigation.
2. Hero.
3. About / profile metrics.
4. Selected work / featured projects.
5. Experience / career journey.
6. Promotional or availability banner.
7. Latest work / archive teaser.
8. Insights / writing.
9. Contact call-to-action.
10. Footer.

Sections may be removed or reordered based on actual content.

---

## Header

Keep navigation light and compact.

Desktop behavior:
- Logo/mark at left.
- Primary links near the left or center.
- Compact CTA at right.
- No oversized navbar shell.
- White or transparent surface.
- Optional hairline divider.

Mobile behavior:
- Logo + menu trigger.
- Full-screen or clean stacked menu.
- Avoid crowded horizontal navigation.

Links should have subtle underline, opacity, or arrow movement on hover.

---

## Hero

The hero should feel like a portfolio cover spread.

Recommended ingredients:
- Small eyebrow or role label.
- Oversized statement, name, or greeting.
- Short supporting sentence.
- One dominant portrait or project image.
- Small numerical stats or credentials.
- Optional vertical label or year.
- Minimal CTA.

Do not center everything by default. Prefer asymmetric balance.

The hero should occupy most of the first viewport on desktop.

---

## About Section

Use a modular editorial composition rather than one long paragraph.

Possible modules:
- Intro paragraph.
- Portrait.
- Metric card.
- Short capability statements.
- Personal working philosophy.
- Compact service list.

Example metric style:

```text
120%
Average increase in client engagement in the first six months
```

Use numbers as visual anchors, not marketing clutter.

---

## Project Cards

A project card typically contains:
- Image.
- Project title.
- Category/discipline.
- Year.
- Optional arrow action.

Do not overload cards with long descriptions.

Hover behavior:
- Small image scale (`1.01–1.04`).
- Arrow translation.
- Subtle opacity shift.
- 180–300ms easing.

Featured cards may span 2 columns.

---

## Experience Section

Use horizontal rows with disciplined alignment.

Each row can contain:
- Studio/company.
- Time range.
- Role.
- Location.
- Capabilities/tags.

Desktop:
- Use 3–4 aligned columns.
- Thin dividers between rows.

Mobile:
- Stack each role cleanly.
- Preserve hierarchy.
- Do not shrink columns until they become unreadable.

Tags should use quiet outlined or tertiary pills.

---

## Promotional Banner

A dark monochrome banner may be used to punctuate the page.

Style:
- Dark image or dark surface.
- White headline.
- Small supporting text.
- Compact CTA.
- High contrast.
- Keep it editorial rather than advertising-heavy.

---

## Blog / Insights

Use simple editorial cards:
- Thumbnail.
- Category.
- Read time.
- Title.
- Optional date.

Cards should remain lightweight and mostly image + type.

---

## Contact CTA

Use a spacious closing section before the footer.

Recommended:
- Large question or invitation.
- One sentence of context.
- Understated text link or button.
- Plenty of surrounding whitespace.

Example direction:
`Got a vision? Let's bring it to life.`

Do not reuse this exact phrase if original copy is required.

---

## Footer

The footer should provide a strong closing contrast.

Recommended:
- `#222222` background.
- White text.
- Compact navigation.
- Large email address or contact line.
- Thin low-contrast grid/divider lines if useful.

Avoid a large multi-column corporate footer unless the content genuinely needs it.

---

## Buttons and Links

Primary CTA:
- Prefer text links with directional arrow for most actions.
- Use filled buttons sparingly.

Text action pattern:

```text
View Project ↗
Book a Call ↗
See All Work →
```

Interactive elements must have clear keyboard focus states.

Example:

```css
:focus-visible {
  outline: 2px solid #222222;
  outline-offset: 4px;
}
```

On dark surfaces, invert the focus treatment.

---

## Motion

Motion must be subtle and purposeful.

Good:
- 180–300ms hover transitions.
- Small translate/scale.
- Reveal-on-scroll with low travel distance.
- Gentle image clipping/reveal.
- Respect `prefers-reduced-motion`.

Avoid:
- Parallax-heavy pages.
- Large cursor-follow effects.
- Long intro animations.
- Scroll hijacking.
- Constant looping motion.

---

## Responsive Behavior

### Desktop: `>= 1024px`
- Full 12-column grid.
- Large hero typography.
- Multi-column work grids.
- Horizontal experience rows.

### Tablet: `768–1023px`
- Reduce gutters and section spacing.
- Collapse complex grids to 2 columns.
- Maintain generous type scale.
- Avoid tiny metadata columns.

### Mobile: `< 768px`
- Single-column primary flow.
- Preserve large headings, but clamp them.
- Full-width media.
- Stack experience information.
- Keep minimum body text at ~16px.
- Maintain at least `20px` horizontal gutter.
- Touch targets should be at least `44px` where appropriate.

Never produce horizontal overflow.

---

## Accessibility

Minimum requirements:
- Semantic HTML landmarks.
- Logical heading order.
- Meaningful link text.
- Alt text for informative images.
- Empty alt for decorative images.
- Keyboard-accessible navigation.
- Visible focus styles.
- WCAG-conscious contrast.
- Do not encode meaning with color alone.
- Respect reduced motion.
- Support zoom to at least 200% without layout failure.

The supplied monochrome palette has sufficient options for strong contrast, but always verify the final combinations.

---

## Implementation Guidance

When implementing with React/Next.js:

Prefer components such as:

```text
SiteHeader
Hero
SectionLabel
AboutGrid
MetricCard
ProjectCard
ProjectGrid
ExperienceList
PromoBanner
ArticleCard
ContactCTA
SiteFooter
```

Keep data separate from presentation where practical:

```ts
type Project = {
  title: string
  category: string
  year: string
  image: string
  href: string
}
```

Use CSS variables or design tokens rather than repeating raw values.

Use `next/image` or equivalent optimized image tooling when available.

Keep DOM structure simple. Do not wrap every text node in unnecessary containers.

---

## Code Quality Rules

When modifying an existing codebase:

1. Inspect the current architecture before changing it.
2. Reuse established components and utilities where they fit.
3. Do not replace working infrastructure without a clear reason.
4. Preserve route and data contracts unless the task requires changes.
5. Keep styling consistent with the design tokens in this skill.
6. Remove dead styles after refactors.
7. Avoid one-off magic numbers when a token can be used.
8. Ensure responsive behavior at common breakpoints.
9. Run lint/typecheck/tests/build when the project provides them.
10. Report any unresolved warnings or assumptions clearly.

---

## Visual QA Checklist

Before considering the page finished, verify:

- [ ] Only the approved monochrome palette is used.
- [ ] The hero has strong visual hierarchy.
- [ ] Headings have ample scale and whitespace.
- [ ] Section alignment follows a consistent grid.
- [ ] Project imagery dominates over decorative UI.
- [ ] Card radius and border usage is restrained.
- [ ] Supporting text uses secondary gray appropriately.
- [ ] Alternate sections can use tertiary `#F8F8F8`.
- [ ] Footer provides a strong dark visual anchor.
- [ ] No unnecessary gradients or shadows were introduced.
- [ ] Desktop, tablet, and mobile layouts all feel intentionally designed.
- [ ] Navigation and controls are keyboard accessible.
- [ ] Hover states are subtle.
- [ ] Reduced motion is respected.
- [ ] No horizontal overflow exists.
- [ ] Content remains readable at 200% zoom.

---

## Design Decision Rule

When uncertain, choose the option that is:
1. Simpler.
2. More spacious.
3. Better aligned.
4. More typographically driven.
5. Less decorative.
6. More consistent with the monochrome editorial reference.

The portfolio should feel curated, calm, and deliberate.
