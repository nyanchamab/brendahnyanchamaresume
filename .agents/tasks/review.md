# Rebuilt portfolio UI layer — design + engineering review (iteration 1)

The `dev` branch rebuilds the static-exported Next.js 16 portfolio into a designed two-column shell: a scrolling content column on the LEFT with six monospace-numbered sections (01.–06.) and a sticky intro sidebar on the RIGHT at `lg+`, collapsing to a single column with a mobile header below `lg`. It adds a markdown-backed projects system (`lib/projects.ts` + `/projects` index + `/projects/[slug]` detail), a navy+teal design system in `app/globals.css`, and four motion flourishes (reveal-on-scroll, scroll-spy nav, animated skill bars, availability pulse) each with a reduced-motion fallback. Content is rendered from `data/site.ts` and `content/projects/*.md` — not invented.

Watch for: nothing blocking. I spot-checked emitted HTML/CSS, source guards, and config against every acceptance criterion. All passed.

**Verdict**: APPROVED

## High-level view

The verification note (`.agents/tasks/verification.md`) records a clean default build, a passing negative frontmatter test, and a passing basePath build. I did not re-run the build; I confirmed the emitted artifacts and source independently instead, and the evidence corroborates the note.

Engineering is sound. The dynamic route awaits the Promise `params`, uses `generateStaticParams` with `dynamicParams = false`, and the committed `out/` is a default root build (17 `/_next/` refs at root, zero basePath-prefixed). `lib/projects.ts` validates `title`/`description`/`date` and throws naming the file and field, matching the exact negative-test error reported. Client components (`SectionNav`, `Reveal`, `SkillBar`) guard `IntersectionObserver`/`matchMedia`/`window` inside `useEffect`; the rest of the tree is Server Components.

Content is real and correct. `out/index.html` carries the name, role, availability line, all five cert names, the three experience orgs, Kenyatta University, and HelpEdge. The MGCI experience entry (empty start/end) renders with no date paragraph. No honours/"Second Class" text anywhere. All six eyebrows 01.–06. render in order. The stats row is absent (stats empty).

Design is intentional, not scaffold. Emitted CSS contains the navy (`0b1221`) and teal (`5eead4`) tokens plus a `prefers-reduced-motion` block and a `pulse-ring` keyframe. Project/cert cards use a bordered dark surface with hover elevation + accent glow and mono tag pills. Cert provider badges are original abstract monograms (cloud-lift arc, signal bars) built from design tokens — not trademarked logos — marked `aria-hidden` with the issuer shown as visible text. Skip link, `<main>` landmark, accent focus ring, and `text-accent-contrast` on accent fills are all present.

Guardrails respected: no `next/font/google`, no Turbopack CSS rule, standard `@tailwindcss/postcss` path with `@import "tailwindcss"` + `@plugin "@tailwindcss/typography"`, `public/.nojekyll` present, AGENTS.md nextjs-agent-rules block untouched, and `data/site.ts` / `next.config.ts` / `content/projects/helpedge.md` / `deploy.yml` are not in the diff.

<details>
<summary>Issues (0)</summary>

No blocking or non-blocking issues surfaced.

</details>

<details>
<summary>Details</summary>

## Markdown projects system and build output (confirmed)

`out/` on disk contains home, `/projects`, and `/projects/helpedge` (plus 404/not-found). The detail page renders the markdown body: `out/projects/helpedge/index.html` wraps the content in `class="prose prose-sm mt-10 max-w-none sm:prose-base"` and carries rehype-slug heading ids (`<h2 id="problem">`, `#approach`, `#outcome`) with body text ("IT service desk") present. The projects index lists the HelpEdge card.

`lib/projects.ts` enforces required frontmatter via `requireString`, throwing `Invalid project frontmatter in "<file>": field "<field>" is required and must be a non-empty string.` for `title`, `description`, `date`. This matches the exact error the verification note reports when `title` was removed from `helpedge.md` and the build failed, then went green on restore. (A date-typed `date:` value is coerced to an ISO day string, so YAML auto-dating won't spuriously fail the guard.)

## basePath discipline (confirmed)

The committed `out/index.html` references `/_next/` at root 17 times with zero `/brendahnyanchamaresume/_next/` occurrences — i.e. the final committed artifact is a default root build, as required. The verification note separately reports the `NEXT_PUBLIC_BASE_PATH=/brendahnyanchamaresume` build produced 17 prefixed refs and zero bare `/_next/`; `next.config.ts` wiring of basePath/assetPrefix was left unmodified (not in the diff), so I trust that result.

## Content fidelity (confirmed)

Grep of `out/index.html`: "Brendah Nyanchama" (14), "Cloud Support Engineer" (10), "Open to cloud support roles" (4), "AWS Certified AI Practitioner" (3), "Cisco Certified Support Technician (CCST) Cybersecurity" (3), "Amazon Web Services" (5), "Kenya Airways" (11), "Microsoft Global Community" (3), "Kenyatta University" (4), "HelpEdge" (4). Honours/"Second Class" grep count: 0.

The MGCI entry is guarded in `app/page.tsx` by `const hasDates = entry.start !== "" || entry.end !== ""`; with empty start/end the date paragraph is omitted — no invented dates. All six eyebrows render as `aria-hidden="true">0N<!-- -->.</` for N=1..6 in source order (About, Projects, Skills, Experience, Certifications, Contact). The stats row is absent because `stats` is empty. 21 `role="progressbar"` skill bars render in the SSR HTML.

## Design system applied (confirmed)

`out/_next/static/chunks/31ca4jeit53sd.css` contains both `0b1221` and `5eead4`, a `prefers-reduced-motion` block, and (per the note) `04231f` + the `pulse-ring` keyframe. `app/globals.css` begins with `@import "tailwindcss";` + `@plugin "@tailwindcss/typography";`, defines a `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px }` ring, and the `pulse-ring` keyframe. Project and cert cards use `rounded-xl border border-border bg-surface` with `hover:-translate-y-1 hover:border-accent/60 hover:shadow-[...accent-strong]` and mono tag pills — a deliberately styled surface, not a default-Tailwind stack.

## Motion flourishes + reduced-motion fallbacks (confirmed)

`Reveal`, `SectionNav`, and `SkillBar` are the client components; each guards its browser API. `SkillBar` checks `window`/`matchMedia`/`IntersectionObserver` inside `useEffect`, sets the bar to its final width under reduced motion or when the observer is unavailable, and exposes `role="progressbar"` + `aria-valuenow/min/max` + a visible `NN%`. `Reveal` SSR-renders the final visible state and only engages the hidden-first transition after mount in motion-friendly browsers. `SectionNav` sets `aria-current="true"` on the active section via an IntersectionObserver created in `useEffect`. `AvailabilityChip` is CSS-only with the ping ring gated behind `motion-safe:`, leaving a static dot under reduced motion. Card hover and arrow nudges carry `motion-reduce:` resets.

## Cert badge originality + a11y (confirmed)

`ProviderBadge` draws abstract in-theme monograms from design tokens: an AWS "cloud-lift" arc and a Cisco "signal bars" set, each on a token-filled rounded rect. They are `role="img"` + `aria-hidden="true"`; the issuer is shown as real visible text in `CertCard` (`{cert.issuer} · {cert.year}`) outside the SVG. The mono "AWS"/"CISCO" letterforms are plain monospace text, not reproductions of the trademarked logotypes.

## Accessibility shell (confirmed)

`app/layout.tsx` provides a skip link to `#main-content`, a `<main id="main-content">` landmark, `lang="en"`, and the Next 16 Metadata API (metadataBase, title default/template, description, openGraph). The Contact CTA uses `bg-accent ... text-accent-contrast` (never white on teal). System fonts only.

## Config + guardrails (confirmed)

`postcss.config.mjs` uses `@tailwindcss/postcss` only. No `next/font/google` in `app`/`components`. No `turbopack` reference in `package.json`/`next.config.ts`/`postcss.config.mjs`/`globals.css`. `public/.nojekyll` exists (empty). AGENTS.md diff vs base is empty (nextjs-agent-rules block untouched, 2 markers intact). `data/site.ts`, `next.config.ts`, `content/projects/helpedge.md`, and `deploy.yml` are not in the diff — not overwritten.

</details>

<details>
<summary>File map</summary>

- `app/page.tsx` — two-column home with six numbered sections, MGCI date guard
- `app/layout.tsx` — skip link, `<main>` landmark, Next 16 Metadata API, system fonts
- `app/globals.css` — navy+teal @theme tokens, focus ring, pulse-ring keyframe, reduced-motion reset
- `app/projects/page.tsx` — projects index
- `app/projects/[slug]/page.tsx` — detail page; awaits Promise params, generateStaticParams, dynamicParams=false
- `lib/projects.ts` — markdown pipeline + build-time frontmatter validation (throws file+field)
- `components/SectionNav.tsx` — scroll-spy nav (aria-current), IO in useEffect
- `components/Reveal.tsx` — reveal-on-scroll, SSR final state, reduced-motion fallback
- `components/SkillBar.tsx` — animated progressbar, final width under reduced motion
- `components/AvailabilityChip.tsx` — CSS pulse gated by motion-safe
- `components/ProviderBadge.tsx` — original abstract cert monograms (aria-hidden)
- `components/CertCard.tsx` / `ProjectCard.tsx` / `Sidebar.tsx` / `MobileHeader.tsx` / `Section.tsx` / `SocialLinks.tsx` / `CountUp.tsx` / `icons.tsx` — supporting styled components
- `postcss.config.mjs` — standard @tailwindcss/postcss path
- `public/.nojekyll` — GitHub Pages _next/ serving
- `README.md` / `SETUP.md` / `.kiro/steering/portfolio.md` / `.agents/tasks/verification.md` — docs/notes

Full diff: `git diff 57635db` (base `origin/dev`).

</details>
